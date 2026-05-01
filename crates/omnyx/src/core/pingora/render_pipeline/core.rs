use std::pin::Pin;
use std::future::Future;
use std::sync::Arc;
use std::sync::atomic::{AtomicUsize, Ordering};
use futures::FutureExt;
use pingora::proxy::Session;

use crate::collections::LinearMap;
use crate::core::router::io::{Body, Request, Response};
use crate::core::router::handlers::{
    ErasedPageComponent, ErasedLayoutComponent, ErasedLoaderComponent,
    ErasedErrorComponent, LayoutProps
};
use crate::core::{PageEndpoint, RenderedParallelRoute, RouteKind, RouteMetadata};
use crate::core::pingora::PingoraAdapter;
use crate::core::ParallelRouteMatcher;

pub type ControllerTask = Pin<Box<dyn Future<Output = Response> + Send>>;

pub enum MainComponent {
    Page(Arc<dyn ErasedPageComponent>),
    Layout(Arc<dyn ErasedLayoutComponent>),
}

impl MainComponent {
    pub async fn call(&self, req: Request) -> Response {
        if let Ok(res) = std::panic::AssertUnwindSafe(async {
            match self {
                Self::Page(p) => p.call_erased(req).await,
                Self::Layout(l) => l.call_erased(req).await,
            }
        })
        .catch_unwind().await {
            res
        } else {
            Response::error("Controller Panic")
        }
    }
}

pub struct DeferredTask {
    pub id: String,
    pub task: ControllerTask,
    pub error_controller: Option<Arc<dyn ErasedErrorComponent>>,
}

#[derive(PartialEq, Clone)]
pub enum SlotOutcome {
    Ready(String),
    Pending { id: String, shell: String },
    FragmentError(String),
    BubbleUpError,
}

static SLOT_COUNTER: AtomicUsize = AtomicUsize::new(1);

impl<T> PingoraAdapter<T> where T: Send + Sync + 'static {

    pub(crate) async fn render_route(&self, session: &mut Session) -> pingora::Result<bool> {
        let req_header = session.req_header();
        let path = if req_header.uri.path().len() > 1 {
            req_header.uri.path().trim_end_matches("/").to_string()
        } else {
            req_header.uri.path().to_string()
        };

        if path.starts_with("/public") {
            return self.handle_public_response(session, &path).await;
        }

        let matched = if let Ok(m) = self.state.router.lookup(&path) { m } else {
            return self.handle_not_found_response(session).await;
        };

        let metadata = if let RouteKind::Page(page) = &matched.entry.kind {
            page.metadata.clone()
        } else {
            RouteMetadata::default()
        };

        let mut req = Request::new(
            self.state.user_state.clone(),
            req_header,
            matched.params,
            "req-id",
            metadata,
        );

        if let Err(_) = self.run_middlewares(&mut req).await {
            return self.handle_error_response(session).await;
        }

        match &matched.entry.kind {
            RouteKind::Page(page) => {
                self.handle_page_request(session, &mut req, page, "/").await
            }
            RouteKind::Api(api) => {
                let ctr = api.controllers.get(req.method())
                    .ok_or_else(|| pingora::Error::new_str("405"))?;
                let resp = ctr.call_erased(req.clone()).await;
                self.finalize_streaming_response(session, &req, resp, vec![]).await
            }
        }
    }

    async fn handle_page_request(
        &self,
        session: &mut Session,
        req: &mut Request,
        page: &PageEndpoint,
        base_path: &str,
    ) -> pingora::Result<bool> {
        let mut tasks = Vec::new();
        let page_ctr = page.controllers.get(req.method())
            .ok_or_else(|| pingora::Error::new_str("405"))?;

        let mut current_outcome = self.execute_slot(
            req,
            &Some(MainComponent::Page(Arc::clone(page_ctr))),
            &page.loader_controller,
            &page.error_controller,
            &mut tasks,
        ).await;

        for layout in &page.layouts {
            if current_outcome == SlotOutcome::BubbleUpError {
                current_outcome = self.try_error_boundary(req, &layout.error_controller).await;
                continue;
            }

            let children_html = self.unwrap_outcome(&current_outcome);

            let full_path = req.uri().path().to_string();
            let remaining = full_path
                .strip_prefix(&layout.base_path)
                .unwrap_or(&full_path)
                .to_string();
            let remaining = if remaining.is_empty() { "/".to_string() } else { remaining };

            let mut parallel_map = LinearMap::new();
            for (slot_name, slot_matcher_arc) in &layout.parallel_routers {
                let (slot_outcome, params) = self.render_parallel_slot(
                    req, slot_matcher_arc.as_ref(), slot_name, &remaining, &mut tasks
                ).await;
                parallel_map.insert(slot_name.clone(), RenderedParallelRoute {
                    html: self.unwrap_outcome(&slot_outcome),
                    params,
                });
            }

            req.set_layout_props(LayoutProps {
                children: children_html,
                parallel_routes: parallel_map,
            });

            current_outcome = self.execute_slot(
                req,
                &layout.controller.as_ref().map(|c| MainComponent::Layout(Arc::clone(c))),
                &layout.loader_controller,
                &layout.error_controller,
                &mut tasks,
            ).await;
        }

        if current_outcome == SlotOutcome::BubbleUpError {
            let res = Response::html(self.fallbacks.error_html.clone());
            return self.finalize_streaming_response(session, req, res, tasks).await;
        }

        let final_html = self.unwrap_outcome(&current_outcome);
        let res = Response::html(final_html);
        self.finalize_streaming_response(session, req, res, tasks).await
    }

    async fn render_parallel_slot(
        &self,
        req: &mut Request,
        matcher: &ParallelRouteMatcher,
        slot_name: &str,
        relative_path: &str,
        tasks: &mut Vec<DeferredTask>,
    ) -> (SlotOutcome, LinearMap<String, Vec<String>>) {
        let lookup_path = if relative_path.is_empty() {
            "/".to_string()
        } else {
            format!("/{}", relative_path.trim_start_matches('/'))
        };
        let matched = match matcher.lookup(&lookup_path) {
            Ok(m) => m,
            Err(_) => return (SlotOutcome::BubbleUpError, LinearMap::new()),
        };
        let parallel_route = matched.entry;

        let page_ctr = match &parallel_route.controller {
            Some(ctrl) => ctrl.clone(),
            None => return (SlotOutcome::BubbleUpError, LinearMap::new()),
        };

        let mut current_outcome = self.execute_slot(
            req,
            &Some(MainComponent::Page(page_ctr)),
            &parallel_route.loader_controller,
            &parallel_route.error_controller,
            tasks,
        ).await;

        for layout in &parallel_route.layouts {
            if current_outcome == SlotOutcome::BubbleUpError {
                current_outcome = self.try_error_boundary(req, &layout.error_controller).await;
                continue;
            }

            let children_html = self.unwrap_outcome(&current_outcome);

            let mut nested_map = LinearMap::new();
            for (nested_name, nested_matcher_arc) in &layout.parallel_routers {
                let (nested_outcome, nested_params) = Box::pin(self.render_parallel_slot(
                    req, nested_matcher_arc.as_ref(), nested_name, relative_path, tasks
                )).await;
                nested_map.insert(nested_name.clone(), RenderedParallelRoute {
                    html: self.unwrap_outcome(&nested_outcome),
                    params: nested_params,
                });
            }

            req.set_layout_props(LayoutProps {
                children: children_html,
                parallel_routes: nested_map,
            });

            current_outcome = self.execute_slot(
                req,
                &layout.controller.as_ref().map(|c| MainComponent::Layout(Arc::clone(c))),
                &layout.loader_controller,
                &layout.error_controller,
                tasks,
            ).await;
        }

        (current_outcome, matched.params)
    }

    async fn execute_slot(
        &self,
        req: &mut Request,
        main: &Option<MainComponent>,
        loader: &Option<Arc<dyn ErasedLoaderComponent>>,
        error: &Option<Arc<dyn ErasedErrorComponent>>,
        tasks: &mut Vec<DeferredTask>,
    ) -> SlotOutcome {
        if let Some(l_ctr) = loader {
            let l_res = std::panic::AssertUnwindSafe(l_ctr.call_erased(req.clone()))
                .catch_unwind()
                .await
                .unwrap_or_else(|_| Response::error("Loader panicked"));

            if matches!(l_res.body, Body::Err(_)) {
                return self.try_error_boundary(req, error).await;
            }

            if let Some(m_ctr) = main {
                let id = format!("omnyx-{}", SLOT_COUNTER.fetch_add(1, Ordering::Relaxed));
                let shell = format!("<div id='omnyx-{id}'>{}</div>", l_res.body.to_string());
                let m_clone = match m_ctr {
                    MainComponent::Page(p) => MainComponent::Page(Arc::clone(p)),
                    MainComponent::Layout(l) => MainComponent::Layout(Arc::clone(l)),
                };
                let r_clone = req.clone();
                tasks.push(DeferredTask {
                    id: id.clone(),
                    task: Box::pin(async move { m_clone.call(r_clone).await }),
                    error_controller: error.clone(),
                });
                return SlotOutcome::Pending { id, shell };
            }
        }

        if let Some(m_ctr) = main {
            let m_res = std::panic::AssertUnwindSafe(m_ctr.call(req.clone()))
                .catch_unwind()
                .await
                .unwrap_or_else(|_| Response::error("Main component panicked"));
            if !matches!(m_res.body, Body::Err(_)) {
                return SlotOutcome::Ready(m_res.body.to_string());
            }
        }

        self.try_error_boundary(req, error).await
    }

    async fn try_error_boundary(
        &self,
        req: &Request,
        error: &Option<Arc<dyn ErasedErrorComponent>>,
    ) -> SlotOutcome {
        if let Some(e_ctr) = error {
            let res = e_ctr.call_erased(req.clone()).await;
            if !matches!(res.body, Body::Err(_)) {
                return SlotOutcome::FragmentError(res.body.to_string());
            }
        }
        SlotOutcome::BubbleUpError
    }

    pub fn unwrap_outcome(&self, outcome: &SlotOutcome) -> String {
        match outcome {
            SlotOutcome::Ready(h) => h.clone(),
            SlotOutcome::Pending { shell, .. } => shell.clone(),
            SlotOutcome::FragmentError(h) => h.clone(),
            SlotOutcome::BubbleUpError => String::new(),
        }
    }

    // The rest (handle_public_response, handle_not_found_response,
    // handle_error_response, finalize_streaming_response, etc.) remain unchanged.
}