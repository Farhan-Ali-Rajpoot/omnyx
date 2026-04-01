use std::sync::Arc;
use std::collections::HashMap;
use async_trait::async_trait;
use serde_json::Value;

use crate::builder::router::RouterBuilder;
use crate::core::router::registry::{RouteNode};
use crate::core::router::tree::Path;
use crate::core::router::handlers::{ErasedPageComponent, ErasedErrorComponent, ErasedLoaderComponent};
use crate::core::router::logic::{DataLoader, Middleware, RouteMetadata};


pub struct PageDefinition {
    pub path: Path,
    pub controllers: HashMap<http::Method, Arc<dyn ErasedPageComponent>>,
    pub error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    pub loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
    pub metadata: RouteMetadata,
    pub children: Vec<RouteNode>,
    pub extensions: http::Extensions,
    pub middlewares: Vec<Arc<dyn Middleware + Send + Sync>>,
}

impl PageDefinition {
    // Custom Methods
    // Usage: .method("GET", handler)
    pub fn method<H: ErasedPageComponent + 'static>(mut self, verb: &str, handler: H) -> Self {
        let m = http::Method::from_bytes(verb.to_uppercase().as_bytes())
            .expect("Invalid HTTP method string");
            
        self.controllers.insert(m, Arc::new(handler));
        self
    }

    pub fn metadata(mut self, metadata: RouteMetadata) -> Self {
        self.metadata = self.metadata.inherit_from(metadata);
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
        F: FnOnce(&mut RouterBuilder) 
    {
        let mut nested_router = RouterBuilder::new();
        f(&mut nested_router);

        self.children = nested_router.root_nodes;
        self
    }

    pub fn finish(mut self, builder: &mut RouterBuilder) {
        let node = RouteNode::Page {
            path: self.path,
            controllers: self.controllers,
            error_controller: self.error_controller,
            loader_controller: self.loader_controller,
            metadata: self.metadata,
            children: self.children,
            extensions: self.extensions,
            middlewares: self.middlewares,
        };
        builder.root_nodes.push(node);
    }
}
