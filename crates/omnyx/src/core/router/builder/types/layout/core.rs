use std::marker::PhantomData;
use std::sync::Arc;

use crate::collections::LinearMap;
use crate::core::{ErrorComponent, ErrorComponentWrapper, LayoutComponent, LayoutComponentWrapper, LoaderComponent, LoaderComponentWrapper};
use crate::core::router::registry::{RouteNode, ParallelRouteNode};
use crate::core::router::handlers::{ErasedLayoutComponent, ErasedErrorComponent, ErasedLoaderComponent};
use crate::core::router::logic::{RouteMetadata, Middleware};
use crate::core::router::builder::Router;
use crate::core::router::builder::types::layout::{ParallelRouteBuilder};


pub struct LayoutDefinition {
    pub(crate) id: String,
    pub(crate) controller: Option<Arc<dyn ErasedLayoutComponent>>,
    pub(crate) error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    pub(crate) loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
    pub(crate) parallel_routes: LinearMap<String, Vec<ParallelRouteNode>>,
    pub(crate) metadata: Option<RouteMetadata>,
    pub(crate) children: Vec<RouteNode>,
    pub(crate) middlewares: Vec<Arc<dyn Middleware>>,
}

impl LayoutDefinition {
    // Utility
    pub fn handler<F, Args>(mut self, f: F) -> Self 
    where
        F: LayoutComponent<Args> + Clone + Send + Sync + 'static,
        Args: Send + Sync + Clone + 'static,
    {
        let wrapped = LayoutComponentWrapper {
            handler: f,
            _marker: PhantomData,
        };

        // Erase the type into the Arc'd trait object
        self.controller = Some(Arc::new(wrapped));
        self
    }

    
    pub fn error_handler<H, Args>(mut self, handler: H) -> Self 
    where
        H: ErrorComponent<Args> + Clone + Send + Sync + 'static,
        Args: 'static + Clone + Send + Sync,
    {
        let wrapper = ErrorComponentWrapper {
            handler,
            _marker: PhantomData,
        };

        self.error_controller = Some(Arc::new(wrapper));
        self
    }

    pub fn loader_handler<H, Args>(mut self, handler: H) -> Self 
    where
        H: LoaderComponent<Args> + Clone + Send + Sync + 'static,
        Args: 'static + Clone + Send + Sync,
    {
        let wrapper = LoaderComponentWrapper {
            handler,
            _marker: PhantomData,
        };

        self.loader_controller = Some(Arc::new(wrapper));
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

    pub fn parallel_route<F>(mut self, name: impl Into<String>, f: F) -> Self 
    where
        F: FnOnce(ParallelRouteBuilder) -> ParallelRouteBuilder
    {
        let root_builder = f(ParallelRouteBuilder::new());
        self.parallel_routes.insert(name.into(), root_builder.root_nodes);
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
            middlewares: self.middlewares,
        }
    }
}


