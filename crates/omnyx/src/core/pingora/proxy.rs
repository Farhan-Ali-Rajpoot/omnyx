use async_trait::async_trait;
use pingora::proxy::{ProxyHttp, Session};
use pingora::upstreams::peer::HttpPeer;

use crate::core::pingora::PingoraAdapter;



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