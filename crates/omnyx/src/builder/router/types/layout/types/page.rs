use std::sync::Arc;

use crate::core::router::handlers::{ErasedErrorComponent, ErasedPageComponent, ErasedLoaderComponent};
use crate::builder::router::types::layout::{ParallelRouteBuilder, ParallelRouteContainer};
use crate::core::router::registry::ParallelRouteNode;
use crate::core::router::tree::Path;



pub struct ParallelRoutePageDefination {
    path: Path,
    controller: Option<Arc<dyn ErasedPageComponent>>,
    error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
    children: Vec<ParallelRouteNode>,
}

impl ParallelRoutePageDefination {

    pub fn handler<H: ErasedErrorComponent + 'static>(mut self, handler: H) -> Self {
        self.error_controller = Some(Arc::new(handler));
        self
    }

    pub fn error_handler<H: ErasedErrorComponent + 'static>(mut self, handler: H) -> Self {
        self.error_controller = Some(Arc::new(handler));
        self
    }

    pub fn loader_handler<H: ErasedLoaderComponent + 'static>(mut self, handler: H) -> Self {
        self.loader_controller = Some(Arc::new(handler));
        self
    }

    pub fn children<F>(mut self, f: F) -> Self 
    where 
        F: FnOnce(&mut ParallelRouteBuilder<ParallelRouteCollection>) 
    {
        let mut nested_router = ParallelRouteBuilder { context: ParallelRouteCollection { root_nodes: Vec::new() }};
        f(&mut nested_router);

        self.children = nested_router.context.root_nodes;
        self
    }

    pub fn finish<C: ParallelRouteContainer>(mut self, builder: &mut ParallelRouteBuilder) {
        let node = ParallelRouteNode::Page {
            path: self.path,
            controller: self.controller,
            error_controller: self.error_controller,
            loader_controller: self.loader_controller,
            children: self.children,
        };
        builder.context.collect(node);
    }
}

