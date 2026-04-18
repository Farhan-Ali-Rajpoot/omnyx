use std::sync::Arc;
use std::collections::HashMap;

use crate::core::router::registry::{RouteNode, ParallelRouteNode};
use crate::core::router::handlers::{ErasedLayoutComponent, ErasedErrorComponent, ErasedLoaderComponent};
use crate::core::router::logic::{RouteMetadata, Middleware};
use crate::core::router::builder::Router;
use crate::core::router::builder::types::layout::{ParallelRouteBuilder, ParallelRouteRoot};


pub struct LayoutDefinition {
    pub id: String,
    pub controller: Option<Arc<dyn ErasedLayoutComponent>>,
    pub error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    pub loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
    pub parallel_routes: HashMap<String, ParallelRouteNode>,
    pub metadata: Option<RouteMetadata>,
    pub children: Vec<RouteNode>,
    pub extensions: crate::core::router::registry::Extensions,
    pub middlewares: Vec<Arc<dyn Middleware>>,
}

impl LayoutDefinition {
    // Utility
    pub fn handler<F: ErasedLayoutComponent + 'static>(mut self, f: F) -> Self {
        self.controller = Some(Arc::new(f));
        self
    }

    pub fn error_handler<H: ErasedErrorComponent + 'static>(mut self, f: H) -> Self {
        self.error_controller = Some(Arc::new(f));
        self
    }

    pub fn loader_handler<H: ErasedLoaderComponent + 'static>(mut self, f: H) -> Self {
        self.loader_controller = Some(Arc::new(f));
        self
    }

    pub fn metadata(mut self, metadata: RouteMetadata) -> Self {
        self.metadata = Some(metadata);
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
        F: FnOnce(ParallelRouteBuilder<ParallelRouteRoot>) -> ParallelRouteBuilder<ParallelRouteRoot>
    {
        let root_builder = f(ParallelRouteBuilder { context: ParallelRouteRoot { node: None } });

        if let Some(node) = root_builder.context.node {
            self.parallel_routes.insert(name.into(), node);
        }
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
        RouteNode::Layout {
            id: self.id,
            controller: self.controller,
            error_controller: self.error_controller,
            loader_controller: self.loader_controller,
            parallel_routes: self.parallel_routes,
            metadata: self.metadata,
            children: self.children,
            extensions: self.extensions,
            middlewares: self.middlewares,
        }
    }
}


