use async_trait::async_trait;
use pingora::proxy::{ProxyHttp, Session};
use pingora::upstreams::peer::HttpPeer;
use std::sync::Arc;

use crate::core::pingora::handle_route::render_pipeline::templates::{NOT_FOUND_PAGE, ERROR_PAGE};
use crate::core::router::handlers::{ErasedLayoutComponent, LayoutComponentWrapper, LayoutProps};
use crate::core::router::io::Request;
use crate::core::AppState;

pub struct PingoraAdapter<T = ()> {
    pub state: Arc<AppState<T>>,
    pub fallbacks: FrameworkFallbacks,
    pub root_layout: Arc<dyn ErasedLayoutComponent>,
}

pub struct FrameworkFallbacks {
    pub error_html: &'static str,
    pub not_found_html: &'static str,
}

impl<T> PingoraAdapter<T>
where
    T: Send + Sync + 'static,
{
    pub(crate) fn from_state_and_root_layout(
        state: Arc<AppState<T>>,
        maybe_root: Option<Arc<dyn ErasedLayoutComponent>>,
    ) -> Self {
        // Default root layout (if none provided)
        let default_root = Arc::new(LayoutComponentWrapper {
            handler: async move |req: Request, props: LayoutProps| {
                rscx::html! {
                    <!DOCTYPE html>
                    <html lang="en">
                        <head>
                            { &req.metadata().render_html() }
                            <meta charset="utf-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        </head>
                        <body>
                            { props.children }
                        </body>
                    </html>
                }
            },
            _marker: std::marker::PhantomData,
        });

        let root_layout = maybe_root.unwrap_or(default_root);

        Self {
            state,
            fallbacks: FrameworkFallbacks {
                error_html: ERROR_PAGE,
                not_found_html: NOT_FOUND_PAGE,
            },
            root_layout,
        }
    }
}

#[async_trait]
impl<T> ProxyHttp for PingoraAdapter<T>
where
    T: Send + Sync + 'static,
{
    type CTX = ();

    fn new_ctx(&self) -> Self::CTX {
        ()
    }

    async fn request_filter(
        &self,
        session: &mut Session,
        _ctx: &mut Self::CTX,
    ) -> pingora::Result<bool> {
        self.handle_route(session).await
    }

    async fn upstream_peer(
        &self,
        _s: &mut Session,
        _c: &mut Self::CTX,
    ) -> pingora::Result<Box<HttpPeer>> {
        Err(pingora::Error::new_str("Omnyx: No upstream configured."))
    }
}