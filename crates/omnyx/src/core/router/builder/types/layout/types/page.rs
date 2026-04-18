use std::sync::Arc;

use crate::core::router::handlers::{ErasedErrorComponent, ErasedPageComponent, ErasedLoaderComponent};
use crate::core::router::builder::types::layout::{ParallelRouteBuilder, ParallelRouteCollection};
use crate::core::router::registry::ParallelRouteNode;
use crate::core::router::utils::Path;



pub struct ParallelRoutePageDefination {
    pub path: Path,
    pub controller: Option<Arc<dyn ErasedPageComponent>>,
    pub error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    pub loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
    pub children: Vec<ParallelRouteNode>,
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
        F: FnOnce(ParallelRouteBuilder<ParallelRouteCollection>) -> ParallelRouteBuilder<ParallelRouteCollection>
    {
        let final_router = f(ParallelRouteBuilder { context: ParallelRouteCollection { root_nodes: Vec::new() }});

        self.children.extend(final_router.context.root_nodes);
        self
    }
}

