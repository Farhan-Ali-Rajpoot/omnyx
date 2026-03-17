use serde_json::Value;
use std::sync::Arc;

use crate::core::router::RouteNode;
use crate::builder::code::CodeRouteBuilder;
use crate::middleware::RidgeMiddleware;



pub struct ExtensionDefinition {
    pub node_type: String,
    pub data: Value,
    pub children: Vec<RouteNode>,
    pub middlewares: Vec<Arc<dyn RidgeMiddleware + Send + Sync>>,
}

impl ExtensionDefinition {
    pub fn data(mut self, data: Value) -> Self {
        self.data = data;
        self
    }

    pub fn middleware<M: RidgeMiddleware + Send + Sync + 'static>(mut self, middleware: M) -> Self {
        self.middlewares.push(Arc::new(middleware));
        self
    }

    pub fn finish(mut self, builder: &mut CodeRouteBuilder) {
        let node = RouteNode::Extension {
            node_type: self.node_type,
            data: self.data,
            children: self.children,
            middlewares: self.middlewares,
        };
        builder.roots.push(node);
    }
}