use std::sync::Arc;

use crate::core::{Config, router::RouterService};


pub struct AppState<T = ()> {
    pub(crate) router: RouterService,
    pub(crate) config: Config,
    pub(crate) user_state: Arc<T>,
}

pub struct App<T = ()> {
    pub(crate) state: Arc<AppState<T>>,
    pub(crate) server: pingora::server::Server,
}

impl<T> App<T> 
where
    T: Send + Sync + 'static 
{
    pub fn run(self) {
        self.server.run_forever();
    }
}