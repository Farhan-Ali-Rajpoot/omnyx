use std::collections::HashMap;
use std::sync::Arc;
use serde_json::Value;

use crate::builder::code::CodeRouteBuilder;
use crate::core::router::RouteNode;
use crate::middleware::RidgeMiddleware;





pub struct GroupDefinition {
    pub id: String,
    pub children: Vec<RouteNode>,
    pub extensions: HashMap<String, Value>,
    pub middlewares: Vec<Arc<dyn RidgeMiddleware + Send + Sync>>,
}

impl GroupDefinition {
    pub fn extension(mut self, key: impl Into<String>, value: Value) -> Self {
        self.extensions.insert(key.into(), value);
        self
    }

    pub fn middleware<M: RidgeMiddleware + Send + Sync + 'static>(mut self, middleware: M) -> Self {
        self.middlewares.push(Arc::new(middleware));
        self
    }

    pub fn finish(mut self, builder: &mut CodeRouteBuilder) {
        let node = RouteNode::Group {
            id: self.id,
            children: self.children,
            extensions: self.extensions,
            middlewares: self.middlewares,
        };
        builder.roots.push(node);
    }
}





