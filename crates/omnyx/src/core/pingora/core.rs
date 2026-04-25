use async_trait::async_trait;
use pingora::proxy::{ProxyHttp, Session};
use pingora::upstreams::peer::HttpPeer;
use std::sync::Arc;

use crate::core::{AppState, ERROR_PAGE, ErasedPageComponent, NOT_FOUND_PAGE};

pub struct PingoraAdapter<T = ()> {
    pub state: Arc<AppState<T>>,
    /// Static HTML fallbacks if custom handlers fail or aren't provided
    pub fallbacks: FrameworkFallbacks,
}

pub struct FrameworkFallbacks {
    pub error_html: &'static str,
    pub not_found_html: &'static str,
}

impl<T> PingoraAdapter<T>
where
    T: Send + Sync + 'static
{
    pub(crate) fn from_state(state: Arc<AppState<T>>) -> Self {
        Self {
            state,
            fallbacks: FrameworkFallbacks {
                error_html: ERROR_PAGE,
                not_found_html: NOT_FOUND_PAGE,
            }
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
        self.render_route(session).await
    }

    async fn upstream_peer(
        &self,
        _s: &mut Session,
        _c: &mut Self::CTX,
    ) -> pingora::Result<Box<HttpPeer>> {
        Err(pingora::Error::new_str("Omnyx: No upstream configured."))
    }
}
