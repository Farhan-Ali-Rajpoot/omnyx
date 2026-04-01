use std::collections::HashMap;
use std::sync::Arc;
use serde_json::Value;

use crate::builder::router::RouterBuilder;
use crate::core::router::registry::RouteNode;
use crate::core::router::logic::{DataLoader, Middleware, RouteMetadata};





pub struct GroupDefinition {
    pub id: String,
    pub children: Vec<RouteNode>,
    pub extensions: http::Extensions,
    pub metadata: RouteMetadata,
    pub middlewares: Vec<Arc<dyn Middleware + Send + Sync>>,
}

impl GroupDefinition {
    pub fn extension<T: Send + Clone + Sync + 'static>(mut self, value: T) -> Self {
        self.extensions.insert(value);
        self
    }

    pub fn middleware<M: Middleware + Send + Sync + 'static>(mut self, middleware: M) -> Self {
        self.middlewares.push(Arc::new(middleware));
        self
    }

    pub fn metadata<T: RouteMetadata>(mut self, metadata: T) -> Self {
        self.metadata = self.metadata.inherit_from(metadata);
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
        let node = RouteNode::Group {
            id: self.id,
            children: self.children,
            extensions: self.extensions,
            middlewares: self.middlewares,
            metadata: self.metadata,
        };
        builder.root_nodes.push(node);
    }
}





