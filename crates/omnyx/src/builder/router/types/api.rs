use std::collections::HashMap;
use std::sync::Arc;
use serde_json::Value;

use crate::builder::router::RouterBuilder;
use crate::core::router::tree::Path;
use crate::core::router::handlers::ErasedApiHandler;
use crate::core::router::registry::RouteNode;
use crate::core::router::logic::{DataLoader, Middleware};


pub struct ApiDefinition {
    pub path: Path,
    pub controllers: HashMap<http::Method, Arc<dyn ErasedApiHandler>>,
    pub children: Vec<RouteNode>,
    pub middlewares: Vec<Arc<dyn Middleware + Send + Sync>>,
    pub extensions: http::Extensions,
    
}

impl ApiDefinition {
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
        F: FnOnce(&mut RouterBuilder) 
    {
        let mut nested_router = RouterBuilder::new();
        f(&mut nested_router);

        self.children = nested_router.root_nodes;
        self
    }

    pub fn finish(mut self, builder: &mut RouterBuilder) {
        let node = RouteNode::Api {
            path: self.path,
            controllers: self.controllers,
            children: self.children,
            middlewares: self.middlewares,
            extensions: self.extensions,
        };
        builder.root_nodes.push(node);
    }
}