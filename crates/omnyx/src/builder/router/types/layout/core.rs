use std::sync::Arc;
use std::collections::HashMap;
use async_trait::async_trait;
use axum::http::Method;
use serde_json::Value;

use crate::core::router::registry::{RouteNode, ParallelRouteNode};
use crate::core::router::handlers::{ErasedLayoutComponent, ErasedErrorComponent, ErasedLoaderComponent};
use crate::core::router::logic::{RouteMetadata, Middleware, DataLoader};
use crate::builder::router::RouterBuilder;
use crate::builder::router::types::layout::{ParallelRouteBuilder, ParallelRouteRoot};


pub struct LayoutDefinition {
    pub id: String,
    pub controller: Option<Arc<dyn ErasedLayoutComponent>>,
    pub error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    pub loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
    pub parallel_routes: HashMap<String, ParallelRouteNode>,
    pub metadata: RouteMetadata,
    pub children: Vec<RouteNode>,
    pub extensions: http::Extensions,
    pub middlewares: Vec<Arc<dyn Middleware + Send + Sync>>,
}

impl LayoutDefinition {
    pub fn handler<F: ErasedLayoutComponent + 'static>(mut self, f: F) -> Self {
        self.controller = Some(Arc::new(f));
        self
    }

    pub fn error_handler<H: ErasedErrorComponent + 'static>(mut self, f: H) -> Self {
        self.error_controller = Some(Arc::new(f));
        self
    }

    pub fn loader_handler<H: ErasedLoaderComponent + 'static>(mut self, f: H) -> Self {
        self.loader_handler = Some(Arc::new(f));
        self
    }

    pub fn metadata<T: RouteMetadata>(mut self, metadata: T) -> Self {
        self.metadata = self.metadata.inherit_from(metadata);
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

    pub fn parallel_route<F>(mut self, name: impl Into<String>, f: F) -> Self 
    where
        F: FnOnce(&mut ParallelRouteBuilder<ParallelRouteRoot>)
    {
        let root_builder = ParallelRouteBuilder { context: ParallelRouteRoot { node: None } };
        f(&mut root_builder);

        if let Some(node) = root_builder.context.node {
            self.parallel_routes.insert(name.into(), node);
        }
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
        let node = RouteNode::Layout {
            id: self.id,
            controller: self.controller,
            error_controller: self.error_controller,
            loader_controller: self.loader_controller,
            parallel_routes: self.parallel_routes,
            metadata: self.metadata,
            children: self.children,
            extensions: self.extensions,
            middlewares: self.middlewares,
        };
        builder.root_nodes.push(node);
    }
}


