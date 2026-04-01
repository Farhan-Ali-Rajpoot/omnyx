use std::collections::HashMap;
use std::sync::Arc;

use crate::core::router::registry::{ParallelRouteNode};
use crate::builder::router::types::layout::{ParallelRouteBuilder, ParallelRouteCollection, ParallelRouteRoot};
use crate::core::router::handlers::{ErasedLayoutComponent, ErasedLoaderComponent, ErasedErrorComponent};




pub struct ParallelRouteLayoutDefination {
    id: String,
    controller: Option<Arc<dyn ErasedLayoutComponent>>,
    error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
    parallel_routes: HashMap<String, ParallelRouteNode>, 
    children: Vec<ParallelRouteNode>,
}

impl ParallelRouteLayoutDefination {
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
    
    pub fn parallel_route<F>(mut self, id: impl Into<String>, f: F) -> Self 
    where 
        F: FnOnce(&mut ParallelRootBuilder<ParallelRouteRoot>) 
    {
        let root_builder = ParallelRootBuilder { context: ParallelRouteRoot { node: None } };
        f(&mut root_builder);

        if let Some(node) = root_builder.context.node {
            self.parallel_routes.insert(id.into(), node);
        }
        self
    }

    pub fn children<F>(mut self, f: F) -> Self 
    where 
        F: FnOnce(&mut ParallelRouteBuilder<ParallelRouteCollection>) 
    {
        let mut nested_router = ParallelRouteBuilder { context: ParallelRouteCollection { root_nodes: Vec::new() } };
        f(&mut nested_router);

        self.children = nested_router.context.root_nodes;
        self
    }

    pub fn finish(&self, builder: &mut ParallelRouteBuilder) {
        let node = ParallelRouteNode::Layout {
            id: self.id,
            controller: self.controller,
            loader_controller: self.loader_controller,
            error_controller: self.loader_controller,
            parallel_routes: self.parallel_routes,
            children: self.children,
        };

        builder.context.collect(node);
    }

}