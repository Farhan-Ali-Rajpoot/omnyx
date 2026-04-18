use std::sync::Arc;
use async_trait::async_trait;
use pingora::proxy::{ProxyHttp, Session};
use pingora::upstreams::peer::HttpPeer;

use crate::core::OmnyxState;

pub struct PingoraAdapter {
    state: Arc<OmnyxState>, 
}

#[async_trait]
impl ProxyHttp for PingoraAdapter 
{
    type CTX = ();
    fn new_ctx(&self) -> Self::CTX {}

    async fn request_filter(&self, session: &mut Session, _ctx: &mut Self::CTX) -> pingora::Result<bool> {        
        Ok(true)
    }

    async fn upstream_peer(&self, _s: &mut Session, _c: &mut Self::CTX) -> pingora::Result<Box<HttpPeer>> {
        Err(pingora::Error::new_str("Omnyx: No route found and no upstream configured."))
    }
}