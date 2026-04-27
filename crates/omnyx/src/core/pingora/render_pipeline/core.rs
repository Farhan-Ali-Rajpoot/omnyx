use std::pin::Pin;
use std::future::Future;
use std::sync::Arc;
use std::sync::atomic::{AtomicUsize, Ordering};
use futures::FutureExt;
use pingora::http::ResponseHeader;
use pingora::proxy::Session;

use crate::collections::LinearMap;
use crate::core::router::io::{Body, Request, Response};
use crate::core::router::handlers::{
    ErasedPageComponent, ErasedLayoutComponent, ErasedLoaderComponent, 
    ErasedErrorComponent, LayoutProps
};
use crate::core::{PageEndpoint, RouteKind, RouteMetadata};
use crate::core::pingora::PingoraAdapter;
use crate::error::RouteError;

/// A type alias for the boxed future that will be streamed later.
pub type ControllerTask = Pin<Box<dyn Future<Output = Response> + Send>>;

/// Unifies different component types so the pipeline can treat them as one.
pub enum MainComponent {
    Page(Arc<dyn ErasedPageComponent>),
    Layout(Arc<dyn ErasedLayoutComponent>),
}

impl MainComponent {
    pub async fn call(&self, req: Request) -> Response {
        // We wrap the future in AssertUnwindSafe to catch panics inside the async block
        if let Ok(res) = std::panic::AssertUnwindSafe(async {
            match self {
                Self::Page(p) => p.call_erased(req).await,
                Self::Layout(l) => l.call_erased(req).await,
            }
        })
        .catch_unwind().await {
            res
        } else {
            Response::from_body(Body::Err("Controller Panic".into()))
        }
    }
}

/// Represents a background render task waiting to be streamed to the client.
pub struct DeferredTask {
    pub id: String,
    pub task: ControllerTask,
}

/// The possible states of any specific UI slot.
#[derive(PartialEq)]
pub enum SlotOutcome {
    Ready(String),
    Pending { id: String, shell: String },
    FragmentError(String),
    NotFound(String),
    /// Signal to tell the parent layout that this slot failed and needs a boundary.
    BubbleUpError, 
    BubbleUpNotFound,
}

static SLOT_COUNTER: AtomicUsize = AtomicUsize::new(1);

impl<T> PingoraAdapter<T> where T: Send + Sync + 'static {
    
    /// The entry point for the Pingora request filter.
    pub(crate) async fn render_route(&self, session: &mut Session) -> pingora::Result<bool> {
        let req_header = session.req_header();
        
        let matched = if let Ok(matched_route) = self.state.router.lookup(req_header.uri.path().trim_end_matches("/")) { 
            matched_route
        } else {
            // Route Not Found
            return self.handle_not_found_response(session).await;
        };

        let metadata = if let RouteKind::Page(page) =  &matched.entry.kind {
            page.metadata.clone()
        } else {
            RouteMetadata::default()
        };

        // Initialize the Omnyx Request context
        let mut req = Request::new(
            self.state.user_state.clone(),
            req_header, 
            matched.params, 
            "XXX-XXX-XXX", 
            metadata,
        );

        // Run Middlewares
        if let Err(_) = self.run_middlewares(&mut req).await {
            return self.handle_error_response(session).await
        }

        // Branching between API and Page rendering
        let (response, tasks) = match &matched.entry.kind {
            RouteKind::Page(page) => self.handle_page_request(&mut req, page).await?,
            RouteKind::Api(api) => {
                let ctr = api.controllers.get(&req.method())
                    .ok_or_else(|| pingora::Error::new_str("405"))?;
                (ctr.call_erased(req.clone()).await, vec![])
            },
        };

        self.finalize_streaming_response(session, &req, response, tasks).await
    }

    /// Handles the recursive layout logic and children wrapping.
    async fn handle_page_request(
        &self, 
        req: &mut Request, 
        page: &PageEndpoint
    ) -> pingora::Result<(Response, Vec<DeferredTask>)> {
        let mut tasks = Vec::new();
        let page_ctr = page.controllers.get(req.method())
            .ok_or_else(|| pingora::Error::new_str("Method Not Allowed"))?;

        // 1. Initial Inner Content (The Page leaf)
        let mut current_outcome = self.execute_slot(
            req,
            &Some(MainComponent::Page(Arc::clone(page_ctr))),
            &page.loader_controller,
            &page.error_controller,
            &mut tasks
        ).await;

        // 2. Wrap through the Layout Tree (Climbing from inner to outer)
        for layout in &page.layouts {
            // Error Handling: If child bubbled up an error, use this layout's boundary
            if current_outcome == SlotOutcome::BubbleUpError {
                current_outcome = self.try_error_boundary(req, &layout.error_controller).await;
                continue;
            }

            let children_html = self.unwrap_outcome(&current_outcome);

            // 3. Parallel Routes Execution
            let mut parallel_map = LinearMap::new();
            for (name, pr) in &layout.parallel_routes {
                let pr_outcome = self.execute_slot(
                    req,
                    &pr.controller.as_ref().map(|c| MainComponent::Page(Arc::clone(c))),
                    &pr.loader_controller,
                    &pr.error_controller,
                    &mut tasks
                ).await;
                parallel_map.insert(name.clone(), self.unwrap_outcome(&pr_outcome));
            }

            // Set the props for the current layout layer
            req.set_layout_props(LayoutProps { 
                children: children_html, 
                parallel_routes: parallel_map 
            });

            // Render the Layout itself
            current_outcome = self.execute_slot(
                req,
                &layout.controller.as_ref().map(|c| MainComponent::Layout(Arc::clone(c))),
                &layout.loader_controller,
                &layout.error_controller,
                &mut tasks
            ).await;
        }

        if current_outcome == SlotOutcome::BubbleUpError {
            let res = Response::from_body(Body::Html(self.fallbacks.error_html.into()));
            return Ok((res, tasks));
        }

        // Finalize the response object
        let final_html = self.unwrap_outcome(&current_outcome);
        let res = Response::from_body(Body::Html(final_html));
        Ok((res, tasks))
    }
    
    /// The Universal Executor for any Slot (Page, Layout, or Parallel Route).
    async fn execute_slot(
        &self,
        req: &Request,
        main: &Option<MainComponent>,
        loader: &Option<Arc<dyn ErasedLoaderComponent>>,
        error: &Option<Arc<dyn ErasedErrorComponent>>,
        tasks: &mut Vec<DeferredTask>,
    ) -> SlotOutcome {
        
        // --- 1. THE LOADER PHASE (With Panic Protection) ---
        if let Some(l_ctr) = loader {
            // Safely execute the loader
            let l_res = std::panic::AssertUnwindSafe(l_ctr.call_erased(req.clone()))
                .catch_unwind()
                .await
                .unwrap_or_else(|_| Response::error("Loader Panicked"));

            // If loader has a Body::Err OR it panicked
            if matches!(l_res.body, Body::Err(_)) {
                return self.try_error_boundary(req, error).await;
            }

            // Loader succeeded: Setup streaming for Main
            if let Some(m_ctr) = main {
                let id = format!("omnyx-{}", SLOT_COUNTER.fetch_add(1, Ordering::Relaxed));
                let shell = format!("<div id='{id}'>{}</div>", l_res.body.to_string());
                
                let m_clone = match m_ctr { 
                    MainComponent::Page(p) => MainComponent::Page(Arc::clone(p)),
                    MainComponent::Layout(l) => MainComponent::Layout(Arc::clone(l)),
                };
                let r_clone = req.clone();
                
                tasks.push(DeferredTask {
                    id: id.clone(),
                    task: Box::pin(async move { 
                        // Note: We also wrap the background task in catch_unwind elsewhere 
                        // to handle panics during the streaming phase!
                        m_clone.call(r_clone).await 
                    })
                });

                return SlotOutcome::Pending { id, shell };
            }
        }

        // --- 2. THE MAIN PHASE (Direct Render if no Loader) ---
        if let Some(m_ctr) = main {
            let m_res = std::panic::AssertUnwindSafe(m_ctr.call(req.clone()))
                .catch_unwind()
                .await
                .unwrap_or_else(|_| Response::error("Main Panicked"));

            if !matches!(m_res.body, Body::Err(_)) {
                return SlotOutcome::Ready(m_res.body.to_string());
            }
        }

        // --- 3. FINAL FALLBACK: ERROR BOUNDARY ---
        self.try_error_boundary(req, error).await
    }

    /// Tries to resolve an error handler; if it fails, signals to climb the tree.
    async fn try_error_boundary(
        &self, 
        req: &Request, 
        error: &Option<Arc<dyn ErasedErrorComponent>>
    ) -> SlotOutcome {
        if let Some(e_ctr) = error {
            let res = e_ctr.call_erased(req.clone()).await;
            if !matches!(res.body, Body::Err(_)) {
                return SlotOutcome::FragmentError(res.body.to_string());
            }
        }
        SlotOutcome::BubbleUpError
    }

    /// Helper to convert outcomes to strings for the parent wrapper.
    fn unwrap_outcome(&self, outcome: &SlotOutcome) -> String {
        match outcome {
            SlotOutcome::Ready(h) | SlotOutcome::Pending { shell: h, .. } | SlotOutcome::FragmentError(h) => h.clone(),
            SlotOutcome::BubbleUpError => "".to_string(),
            SlotOutcome::NotFound(h) => h.clone(),
            SlotOutcome::BubbleUpNotFound => "".to_string(),
        }
    }

    /// Handles the physical I/O streaming to Pingora.
    async fn finalize_streaming_response(
        &self,
        session: &mut Session,
        req: &Request,
        response: Response,
        mut tasks: Vec<DeferredTask>,
    ) -> pingora::Result<bool> {
        let (body_bytes, content_type) = response.body.into_bytes_and_content_type();
        let mut header = ResponseHeader::build(req.status().as_u16(), None).unwrap();
        
        header.insert_header("Content-Type", content_type).unwrap();
        // Crucial: No Content-Length to enable Chunked Transfer Encoding
        header.remove_header("Content-Length"); 

        // 1. Send the Response Header and Initial Shell HTML
        session.write_response_header(Box::new(header), false).await?;
        session.write_response_body(Some(body_bytes), tasks.is_empty()).await?;

        // 2. Await and Stream background updates
        for task in tasks.drain(..) {
            let res = task.task.await;
            let html = res.body.to_string();
            
            // The magic: Send a self-executing script to replace the DOM node
            let chunk = format!(
                r#"<template id="tpl-{id}">{html}</template>
                   <script>(function(){{
                     var s=document.getElementById("{id}-"),t=document.getElementById("tpl-{id}-");
                     if(s&&t){{s.outerHTML=t.innerHTML;}}
                   }})()</script>"#,
                id = task.id,
                html = html
            );
            
            session.write_response_body(Some(bytes::Bytes::from(chunk)), false).await?;
        }

        // 3. Finalize the stream
        session.write_response_body(None, true).await?;
        Ok(true)
    }

    async fn run_middlewares(&self, req: &mut Request) -> Result<(), RouteError> {
        Ok(())
    }

    async fn handle_not_found_response(&self, session: &mut Session) -> pingora::Result<bool> {

        let mut header = ResponseHeader::build(404, None).unwrap();
        header.insert_header("Content-Type", "text/html").unwrap();
        
        session.write_response_header(Box::new(header), false).await?;
        session.write_response_body(Some(bytes::Bytes::from(self.fallbacks.not_found_html)), true).await?;
        
        Ok(true)
    }

    async fn handle_error_response(&self, session: &mut Session) -> pingora::Result<bool> {

        let mut header = ResponseHeader::build(404, None).unwrap();
        header.insert_header("Content-Type", "text/html").unwrap();
        
        session.write_response_header(Box::new(header), false).await?;
        session.write_response_body(Some(bytes::Bytes::from(self.fallbacks.error_html)), true).await?;
        Ok(true)
    }
}