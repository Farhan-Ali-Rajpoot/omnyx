use std::sync::Arc;
use std::collections::HashMap;
use async_trait::async_trait;
use axum::http::Method;
use serde_json::Value;

use crate::core::router::{RouteNode};
use crate::render::layout::LayoutComponent;
use crate::core::router::metadata::RouteMetadata;
use crate::builder::code::CodeRouteBuilder;
use crate::middleware::RidgeMiddleware;



pub struct LayoutDefinition {
    pub id: String,
    pub component: Option<Arc<dyn LayoutComponent>>,
    pub metadata: RouteMetadata,
    pub children: Vec<RouteNode>,
    pub slots: HashMap<String, Vec<RouteNode>>,
    pub extensions: HashMap<String, Value>,
    pub middlewares: Vec<Arc<dyn RidgeMiddleware + Send + Sync>>,
}

impl LayoutDefinition {
    pub fn component<F: LayoutComponent + 'static>(mut self, f: F) -> Self {
        self.component = Some(Arc::new(f));
        self
    }

    pub fn middleware<M: RidgeMiddleware + Send + Sync + 'static>(mut self, middleware: M) -> Self {
        self.middlewares.push(Arc::new(middleware));
        self
    }

    pub fn parallel_slot(mut self, name: impl Into<String>, node: RouteNode) -> Self {
        self.slots
            .entry(name.into())
            .or_default()
            .push(node);
        self
    }

    pub fn finish(mut self, builder: &mut CodeRouteBuilder) {
        let node = RouteNode::Layout {
            id: self.id,
            component: self.component,
            metadata: self.metadata,
            children: self.children,
            slots: self.slots,
            extensions: self.extensions,
            middlewares: self.middlewares,
        };
        builder.roots.push(node);
    }
}

