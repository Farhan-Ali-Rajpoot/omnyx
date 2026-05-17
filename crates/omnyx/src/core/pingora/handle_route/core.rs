use pingora::proxy::Session;
use std::sync::atomic::{AtomicUsize, Ordering};

use crate::core::pingora::PingoraAdapter;
use crate::core::router::handlers::{
    ErasedErrorComponent, ErasedLayoutComponent, ErasedLoaderComponent, ErasedPageComponent,
};
use crate::core::router::io::{Body, Request, Response};
use crate::core::{PageEndpoint, RouteKind, RouteMetadata};



impl<T> PingoraAdapter<T>
where 
    T: Send + Sync + 'static
{
    pub(crate) async fn handle_route(&self, session: &mut Session) -> pingora::Result<bool> {
        let req_header = session.req_header();
        let path = if req_header.uri.path().len() > 1 {
            req_header.uri.path().trim_end_matches("/").to_string()
        } else {
            req_header.uri.path().to_string()
        };

        if path.starts_with("/public") {
            return self.serve_public_directory(session, &path).await;
        }

        let matched = if let Ok(m) = self.state.router.lookup(&path) {
            m
        } else {
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

        println!("{} {}", req.method(), path);

        if let Err(_) = self.run_middlewares(&mut req).await {
            return self.return_error_page(session).await;
        }

        match &matched.entry.kind {
            RouteKind::Page(page) => {
                if req.method() != http::Method::GET {
                    let page_ctr = page
                        .controllers
                        .get(req.method())
                        .ok_or_else(|| pingora::Error::new_str("405"))?;
                    let res = page_ctr.call_erased(req.clone()).await;
                    return self
                        .finalize_streaming_response(session, &req, Some(res), None)
                        .await;
                }
                // Navigation handling (commented for now)
                // if let Some(_) = req.header("X-OMNYX-NAVIGATION") {
                //     return self.render_page_navigation(session, &mut req, page).await;
                // } else {
                    return self.render_page(session, &mut req, page).await;
                // }
            }
            RouteKind::Api(api) => {
                let ctr = api
                    .controllers
                    .get(req.method())
                    .ok_or_else(|| pingora::Error::new_str("405"))?;
                let res = ctr.call_erased(req.clone()).await;
                return self
                    .finalize_streaming_response(session, &req, Some(res), None)
                    .await;
            }
        }
    }
}