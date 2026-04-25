use std::sync::Arc;
use pingora::services::listening::Service;
use pingora::proxy::http_proxy_service;

use crate::core::router::RouterService;
use crate::core::router::builder::Router;
use crate::error::OmnyxError;
use crate::core::{App, AppState};
use crate::core::router::registry::RouteNode;
use crate::core::PingoraAdapter;

pub struct Config {
    pub address: String,
    pub public_dir: Option<String>,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            address: "127.0.0.1:8080".to_string(),
            public_dir: None,
        }
    }
}

pub struct AppBuilder<T = ()> {
    pub(crate) routers: Vec<Router>,
    pub(crate) state: Arc<T>, 
    pub(crate) config: Config,
}

impl AppBuilder<()> {
    pub fn new() -> Self {
        Self {
            routers: Vec::new(),
            state: Arc::new(()),
            config: Config::default(),
        }
    }

    pub fn with_opt(config: Config) -> Self {
        Self {
            routers: Vec::new(),
            state: Arc::new(()), 
            config,
        }
    }
}

impl<T> AppBuilder<T> {
    pub fn with_state<S>(self, new_state: S) -> AppBuilder<S> {
        AppBuilder {
            state: Arc::new(new_state), 
            routers: self.routers, 
            config: self.config,     
        }
    }

    pub fn with_router(mut self, router: Router) -> Self {
        self.routers.push(router);
        self
    }

}

impl<T> AppBuilder<T>
where 
    T: Send + Sync + 'static
{
    pub fn build(mut self) -> Result<App<T>, OmnyxError> {

        let router = self.prepare_router()?;
        let mut server = self.prepare_server()?;
    
        let state = Arc::new(AppState { 
            router,
            user_state: self.state, 
            config: self.config, 
        });

        let adapter = PingoraAdapter::from_state(Arc::clone(&state));

        let mut proxy_service = http_proxy_service(&server.configuration, adapter);
        proxy_service.add_tcp(&state.config.address);
        server.add_service(proxy_service);

        let app = App { 
            state, 
            server,
        };
        
        Ok(app)
    }

        pub(crate) fn prepare_router(&mut self) -> Result<RouterService, OmnyxError> {
        let mut all_nodes: Vec<RouteNode> = Vec::new();

        all_nodes.extend(
            std::mem::take(&mut self.routers)
                .into_iter()
                .flat_map(|builder| builder.root_nodes) 
        );

        match RouterService::from_nodes(all_nodes) {
            Ok(router) => Ok(router),
            Err(e) => Err(OmnyxError::Build(e.to_string().into()))
        }
    }

    pub(crate) fn prepare_server(&self) -> Result<pingora::server::Server, OmnyxError> {
        let opt = pingora::server::configuration::Opt::default();
        let mut server = pingora::server::Server::new(Some(opt))
            .map_err(|_| OmnyxError::Build("Failed to prepare server".into()))?;

        server.bootstrap();
        Ok(server)
    }
}