use std::marker::PhantomData;
use std::sync::Arc;

use crate::core::{ErasedNotFoundComponent, ErrorComponent, ErrorComponentWrapper, LoaderComponent, LoaderComponentWrapper, NotFoundComponent, NotFoundComponentWrapper, PageComponent, PageComponentWrapper};
use crate::core::router::handlers::{ErasedErrorComponent, ErasedPageComponent, ErasedLoaderComponent};
use crate::core::router::builder::types::layout::{ParallelRouteBuilder, ParallelRouteCollection};
use crate::core::router::registry::ParallelRouteNode;
use crate::core::router::utils::Path;



pub struct ParallelRoutePageDefination {
    pub path: Path,
    pub controller: Option<Arc<dyn ErasedPageComponent>>,
    pub error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    pub loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
    pub(crate) not_found_controller: Option<Arc<dyn ErasedNotFoundComponent>>,
    pub children: Vec<ParallelRouteNode>,
}

impl ParallelRoutePageDefination {

    pub fn handler<H, Args>(mut self, handler: H) -> Self
    where
        H: PageComponent<Args> + Clone + Send + Sync + 'static,
        Args: 'static + Clone + Send + Sync,
    {

        // Wrap it!
        let wrapper = PageComponentWrapper {
            handler,
            _marker: PhantomData,
        };

        self.controller =  Some(Arc::new(wrapper));
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

    pub fn children<F>(mut self, f: F) -> Self 
    where 
        F: FnOnce(ParallelRouteBuilder<ParallelRouteCollection>) -> ParallelRouteBuilder<ParallelRouteCollection>
    {
        let final_router = f(ParallelRouteBuilder { context: ParallelRouteCollection { root_nodes: Vec::new() }});

        self.children.extend(final_router.context.root_nodes);
        self
    }
}

