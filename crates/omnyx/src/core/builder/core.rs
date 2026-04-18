use std::sync::Arc;

use crate::core::router::RouterService;
use crate::core::router::builder::Router;
use crate::error::OmnyxError;
use crate::core::{OmnyxCore, OmnyxState};
use crate::core::router::registry::RouteNode;
use crate::core::PingoraAdapter;

#[derive(Default)]
pub struct OmnyxBuilder {
    routers: Vec<Router>,
}

impl OmnyxBuilder {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn router(mut self, router: Router) -> Self {
        self.routers.push(router);
        self
    }


    pub fn prepare_router(&mut self) -> Result<RouterService, OmnyxError> {
        let mut all_nodes: Vec<RouteNode> = Vec::new();

        all_nodes.extend(
        std::mem::take(&mut self.routers)
            .into_iter()
            .map(|builder| builder.root_nodes) 
            .flatten()
        );

        let router: RouterService = RouterService::from_nodes(all_nodes)?;
        Ok(router) 
    }

    pub fn prepare_server(&self) -> Result<pingora::server::Server, OmnyxError> {
        let opt: Option<pingora::server::configuration::Opt> = Some(pingora::server::configuration::Opt::default());

        let mut server: pingora::server::Server = pingora::server::Server::new(opt)
            .map_err(|_| { OmnyxError::Build("Faileind to prepare server".into()) })?;

        // let adapter: PingoraAdapter = PingoraAdapter {
        //     state: 
        // };

        server.bootstrap();

        Ok(server)
    }

    pub fn build(mut self) -> Result<OmnyxCore, OmnyxError> {
        let router: RouterService = self.prepare_router()?;
        
        let state: OmnyxState = OmnyxState { router };

        let server: pingora::server::Server = self.prepare_server()?;

        let core: OmnyxCore = OmnyxCore { state: Arc::new(state), server };
        
        Ok(core)
    }

    
}