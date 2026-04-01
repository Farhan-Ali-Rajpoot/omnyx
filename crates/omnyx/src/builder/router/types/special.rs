use std::sync::Arc;
use std::collections::HashMap;
use serde_json::Value;

use crate::builder::router::RouterBuilder;
use crate::core::router::registry::{RouteNode, SpecialNodeKind};
use crate::core::router::handlers::{ErasedSpecialComponent};
use crate::core::router::logic::{DataLoader, Middleware};


pub struct SpecialDefinition {
    pub kind: SpecialNodeKind,
    pub component: Option<Arc<dyn ErasedSpecialComponent>>,
    pub children: Vec<RouteNode>,
    pub middlewares: Vec<Arc<dyn Middleware + Send + Sync>>,
    pub extensions: http::Extensions,
}

impl SpecialDefinition {
    pub fn component<C: ErasedSpecialComponent + 'static>(mut self, c: C) -> Self {
        self.component = Some(Arc::new(c));
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
        let node = RouteNode::Special {
            kind: self.kind,
            component: self.component,
            children: self.children,
            middlewares: self.middlewares,
            extensions: self.extensions,
        };
        builder.root_nodes.push(node);
    }
}