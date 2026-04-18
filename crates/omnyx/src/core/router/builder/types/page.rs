use std::sync::Arc;

use crate::core::router::builder::Router;
use crate::core::router::registry::{RouteNode};
use crate::core::router::utils::Path;
use crate::core::router::handlers::{ErasedPageComponent, ErasedErrorComponent, ErasedLoaderComponent};
use crate::core::router::logic::{Middleware, RouteMetadata};
use crate::collections::LinearMap;

pub struct PageDefinition {
    pub path: Path,
    pub controllers: LinearMap<http::Method, Arc<dyn ErasedPageComponent>>,
    pub error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    pub loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
    pub metadata: Option<RouteMetadata>,
    pub children: Vec<RouteNode>,
    pub extensions: crate::core::router::registry::Extensions,
    pub middlewares: Vec<Arc<dyn Middleware>>,
}

impl PageDefinition {
    // Utility

    // Custom Methods
    // Usage: .method("GET", handler)
    pub fn method<H: ErasedPageComponent + 'static>(mut self, verb: &str, handler: H) -> Self {
        let m = http::Method::from_bytes(verb.to_uppercase().as_bytes())
            .expect("Invalid HTTP method string");
            
        self.controllers.insert(m, Arc::new(handler));
        self
    }

    pub fn metadata(mut self, metadata: RouteMetadata) -> Self {
        self.metadata = Some(metadata);
        self
    }

    pub fn error_handler<H: ErasedErrorComponent + 'static>(mut self, handler: H) -> Self {
        self.error_controller = Some(Arc::new(handler));
        self
    }

    pub fn loader_handler<H: ErasedLoaderComponent + 'static>(mut self, handler: H) -> Self {
        self.loader_controller = Some(Arc::new(handler));
        self
    }

    pub fn middleware<M: Middleware + Send + Sync + 'static>(mut self, middleware: M) -> Self {
        self.middlewares.push(Arc::new(middleware));
        self
    }

    pub fn extension<T: Send + Clone + Sync + 'static>(mut self, value: T) -> Self {
        self.extensions.insert(value);
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
        RouteNode::Page {
            path: self.path,
            controllers: self.controllers,
            error_controller: self.error_controller,
            loader_controller: self.loader_controller,
            metadata: self.metadata,
            children: self.children,
            extensions: self.extensions,
            middlewares: self.middlewares,
        }
    }
}
