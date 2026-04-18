use std::sync::Arc;

use crate::core::router::builder::Router;
use crate::core::router::utils::Path;
use crate::core::router::handlers::ErasedApiHandler;
use crate::core::router::registry::RouteNode;
use crate::core::router::logic::{Middleware};
use crate::collections::LinearMap;

pub struct ApiDefinition {
    pub path: Path,
    pub controllers: LinearMap<http::Method, Arc<dyn ErasedApiHandler>>,
    pub children: Vec<RouteNode>,
    pub middlewares: Vec<Arc<dyn Middleware>>,
    pub extensions: crate::core::router::registry::Extensions,
    
}

impl ApiDefinition {
    // Utility

    // Custom Methods
    // Usage: .method("FARHAN", handler)
    pub fn method<H: ErasedApiHandler + 'static>(mut self, verb: &str, handler: H) -> Self {
        let m = http::Method::from_bytes(verb.to_uppercase().as_bytes())
            .expect("Invalid HTTP method string");
            
        self.controllers.insert(m, Arc::new(handler));
        self
    }

    pub fn extension<T: Send + Sync + Clone + 'static>(mut self, value: T) -> Self {
        self.extensions.insert(value);
        self
    }

    pub fn middleware<M: Middleware + Send + Sync + 'static>(mut self, middleware: M) -> Self {
        self.middlewares.push(Arc::new(middleware));
        self
    }

    pub fn children<F>(mut self, f: F) -> Self 
    where 
        F: FnOnce(Router) -> Router 
    {
        let final_router = f(Router::new());

        self.children.extend(final_router.root_nodes);
        self
    }

    // Router
    pub fn nest_router(mut self, router: Router) -> Self {
        self.children.extend(router.root_nodes);
        self
    }

    pub fn into_route_node(self) -> RouteNode {
        RouteNode::Api {
            path: self.path,
            controllers: self.controllers,
            children: self.children,
            middlewares: self.middlewares,
            extensions: self.extensions,
        }
    }
}