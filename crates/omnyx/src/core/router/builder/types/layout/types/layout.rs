use std::collections::HashMap;
use std::sync::Arc;

use crate::core::router::registry::{ParallelRouteNode};
use crate::core::router::builder::types::layout::{ParallelRouteBuilder, ParallelRouteCollection, ParallelRouteRoot};
use crate::core::router::handlers::{ErasedLayoutComponent, ErasedLoaderComponent, ErasedErrorComponent};



pub struct ParallelRouteLayoutDefination {
    pub id: String,
    pub controller: Option<Arc<dyn ErasedLayoutComponent>>,
    pub error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    pub loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
    pub parallel_routes: HashMap<String, ParallelRouteNode>, 
    pub children: Vec<ParallelRouteNode>,
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
        self.loader_controller = Some(Arc::new(f));
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

    pub fn children<F>(mut self, f: F) -> Self 
    where 
        F: FnOnce(ParallelRouteBuilder<ParallelRouteCollection>) -> ParallelRouteBuilder<ParallelRouteCollection> 
    {
        let final_router = f(ParallelRouteBuilder { context: ParallelRouteCollection { root_nodes: Vec::new() } });

        self.children.extend(final_router.context.root_nodes);
        self
    }

}