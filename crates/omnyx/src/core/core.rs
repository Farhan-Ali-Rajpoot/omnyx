use std::sync::Arc;

use crate::core::router::RouterService;

#[derive(Clone)]
pub struct OmnyxState {
    pub router: RouterService,
}

pub struct OmnyxCore {
    pub state: Arc<OmnyxState>,
    pub server: pingora::server::Server,
}