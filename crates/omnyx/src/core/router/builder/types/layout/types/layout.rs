use std::collections::HashMap;
use std::marker::PhantomData;
use std::sync::Arc;

use crate::collections::LinearMap;
use crate::core::{ErrorComponent, ErrorComponentWrapper, LayoutComponent, LayoutComponentWrapper, LoaderComponent, LoaderComponentWrapper};
use crate::core::router::registry::{ParallelRouteNode};
use crate::core::router::builder::types::layout::{ParallelRouteBuilder};
use crate::core::router::handlers::{ErasedLayoutComponent, ErasedLoaderComponent, ErasedErrorComponent};



pub struct ParallelRouteLayoutDefination {
    pub(crate) id: String,
    pub(crate) controller: Option<Arc<dyn ErasedLayoutComponent>>,
    pub(crate) error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    pub(crate) loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
    pub(crate) parallel_routes: LinearMap<String, Vec<ParallelRouteNode>>, 
    pub(crate) children: Vec<ParallelRouteNode>,
}

impl ParallelRouteLayoutDefination {
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
    
    pub fn parallel_route<F>(mut self, id: impl Into<String>, f: F) -> Self 
    where 
        F: FnOnce(ParallelRouteBuilder) -> ParallelRouteBuilder 
    {
        let final_builder = f(ParallelRouteBuilder::new());

        self.parallel_routes.insert(id.into(), final_builder.root_nodes);
        self
    }

    pub(crate) fn children<F>(mut self, f: F) -> Self 
    where 
        F: FnOnce(ParallelRouteBuilder) -> ParallelRouteBuilder 
    {
        let final_router = f(ParallelRouteBuilder::new());

        self.children.extend(final_router.root_nodes);
        self
    }

    pub fn into_parallel_route_node(self) -> ParallelRouteNode {
        ParallelRouteNode::Layout {
            children: self.children,
            controller: self.controller,
            error_controller: self.error_controller,
            loader_controller: self.loader_controller,
            id: self.id,
            parallel_routes: self.parallel_routes,
        }
    }
}