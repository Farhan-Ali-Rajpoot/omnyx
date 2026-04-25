use std::collections::HashMap;
use std::marker::PhantomData;
use std::sync::Arc;

use crate::core::{ErasedNotFoundComponent, ErrorComponent, ErrorComponentWrapper, LayoutComponent, LayoutComponentWrapper, LoaderComponent, LoaderComponentWrapper, NotFoundComponent, NotFoundComponentWrapper};
use crate::core::router::registry::{ParallelRouteNode};
use crate::core::router::builder::types::layout::{ParallelRouteBuilder, ParallelRouteCollection, ParallelRouteRoot};
use crate::core::router::handlers::{ErasedLayoutComponent, ErasedLoaderComponent, ErasedErrorComponent};



pub struct ParallelRouteLayoutDefination {
    pub(crate) id: String,
    pub(crate) controller: Option<Arc<dyn ErasedLayoutComponent>>,
    pub(crate) error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    pub(crate) loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
    pub(crate) not_found_controller: Option<Arc<dyn ErasedNotFoundComponent>>,
    pub(crate) parallel_routes: HashMap<String, ParallelRouteNode>, 
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

    pub fn not_found_handler<H, Args>(mut self, handler: H) -> Self 
    where
        H: NotFoundComponent<Args> + Clone + Send + Sync + 'static,
        Args: 'static + Clone + Send + Sync,
    {
        let wrapper = NotFoundComponentWrapper {
            handler,
            _marker: PhantomData,
        };

        self.not_found_controller = Some(Arc::new(wrapper));
        self
    }
    
    pub fn parallel_route<F>(mut self, id: impl Into<String>, f: F) -> Self 
    where 
        F: FnOnce(ParallelRouteBuilder<ParallelRouteRoot>) -> ParallelRouteBuilder<ParallelRouteRoot> 
    {
        let final_builder = f(ParallelRouteBuilder { context: ParallelRouteRoot { node: None } });

        if let Some(node) = final_builder.context.node {
            self.parallel_routes.insert(id.into(), node);
        }
        self
    }

    pub(crate) fn children<F>(mut self, f: F) -> Self 
    where 
        F: FnOnce(ParallelRouteBuilder<ParallelRouteCollection>) -> ParallelRouteBuilder<ParallelRouteCollection> 
    {
        let final_router = f(ParallelRouteBuilder { context: ParallelRouteCollection { root_nodes: Vec::new() } });

        self.children.extend(final_router.context.root_nodes);
        self
    }

}