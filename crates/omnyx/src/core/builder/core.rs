use std::sync::Arc;
use include_dir::Dir;
use pingora::proxy::http_proxy_service;

use crate::core::router::RouterService;
use crate::core::router::builder::Router;
use crate::error::OmnyxError;
use crate::core::{App, AppState};
use crate::core::pingora::handle_route::Renderer;
use crate::core::router::registry::RouteNode;
use crate::core::PingoraAdapter;

pub struct Config {
    pub address: std::borrow::Cow<'static, str>,
    pub embedded_public_dir: Option<&'static Dir<'static>>,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            address: "127.0.0.1:3000".into(),
            embedded_public_dir: None,
        }
    }
}

#[derive(Default)]
pub struct AppBuilder<T = ()> {
    pub(crate) routers: Vec<Router>,
    pub(crate) user_state: Arc<T>, 
    pub(crate) config: Config,
    pub(crate) renderer: Renderer,
}

impl AppBuilder<()> {
    pub fn new() -> Self {
        Self::default()
    }
}

impl<T> AppBuilder<T> {
    pub fn with_config(mut self, config: Config) -> Self {
        self.config = config;
        self
    }

    pub fn with_state<S>(self, new_state: S) -> AppBuilder<S> {
        AppBuilder {
            user_state: Arc::new(new_state), 
            routers: self.routers, 
            config: self.config,
            renderer: self.renderer,
        }
    }

    pub fn with_router(mut self, router: Router) -> Self {
        self.routers.push(router);
        self
    }

    pub fn with_renderer(mut self, renderer: Renderer) -> Self {
        self.renderer = renderer;
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
            user_state: self.user_state, 
            config: self.config, 
        });

        let adapter = PingoraAdapter { 
            state: Arc::clone(&state),
            renderer: self.renderer,
        };

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