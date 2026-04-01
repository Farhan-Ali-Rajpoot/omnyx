use std::sync::Arc;
use std::collections::HashMap;

use crate::core::router::handlers::{ErasedLayoutComponent, ErasedPageComponent, ErasedErrorComponent, ErasedLoaderComponent};
use crate::core::router::tree::{Path};

pub enum ParallelRouteNode {
    Page {
        path: Path,
        controller: Option<Arc<dyn ErasedPageComponent>>,
        error_controller: Option<Arc<dyn ErasedErrorComponent>>,
        loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
        children: Vec<ParallelRouteNode>,
    },

    Layout {
        id: String,
        controller: Option<Arc<dyn ErasedLayoutComponent>>,
        error_controller: Option<Arc<dyn ErasedErrorComponent>>,
        loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
        parallel_routes: HashMap<String, ParallelRouteNode>, 
        children: Vec<ParallelRouteNode>,
    }
}