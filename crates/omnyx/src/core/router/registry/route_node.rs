use std::sync::Arc;

use crate::core::router::registry::Extensions;
use crate::core::router::logic::metadata::RouteMetadata;
use crate::core::router::logic::Middleware;
use crate::core::router::utils::Path;
use crate::core::router::handlers::{
    ErasedApiHandler, ErasedPageComponent, ErasedLayoutComponent, 
    ErasedErrorComponent, ErasedLoaderComponent
};
use crate::collections::LinearMap;

use super::ParallelRouteNode;


#[derive(Clone)]
pub enum RouteNode {
    Page {
        path: Path,
        controllers: LinearMap<http::Method, Arc<dyn ErasedPageComponent>>,
        error_controller: Option<Arc<dyn ErasedErrorComponent>>,
        loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
        metadata: Option<RouteMetadata>,
        children: Vec<RouteNode>,
        middlewares: Vec<Arc<dyn Middleware>>,
        extensions: Extensions,
    },
    
    Api {
        path: Path,
        controllers: LinearMap<http::Method, Arc<dyn ErasedApiHandler>>,
        children: Vec<RouteNode>,
        middlewares: Vec<Arc<dyn Middleware>>,
        extensions: Extensions,
    },

    Layout {
        id: String,
        controller: Option<Arc<dyn ErasedLayoutComponent>>,
        error_controller: Option<Arc<dyn ErasedErrorComponent>>,
        loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
        metadata: Option<RouteMetadata>,
        children: Vec<RouteNode>,
        parallel_routes: LinearMap<String, Vec<ParallelRouteNode>>, 
        extensions: Extensions,
        middlewares: Vec<Arc<dyn Middleware>>,
    },

    Group {
        id: String,
        children: Vec<RouteNode>,
        metadata: Option<RouteMetadata>,
        extensions: Extensions,
        middlewares: Vec<Arc<dyn Middleware>>,
    },
}


impl std::fmt::Debug for RouteNode {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            RouteNode::Page { path, metadata, children, .. } => {
                f.debug_struct("RouteNode::Page")
                    .field("path", path)
                    .field("metadata", metadata)
                    // .field("methods", &controllers.keys().collect::<Vec<_>>())
                    .field("children", children)
                    .finish()
            }
            RouteNode::Api { path, children, .. } => {
                f.debug_struct("RouteNode::Api")
                    .field("path", path)
                    // .field("methods", &controllers.keys().collect::<Vec<_>>())
                    .field("children", children)
                    .finish()
            }
            RouteNode::Layout { id, metadata, children, .. } => {
                f.debug_struct("RouteNode::Layout")
                    .field("id", id)
                    .field("metadata", metadata)
                    .field("children", children)
                    .finish()
            }
            RouteNode::Group { id, children, .. } => {
                f.debug_struct("RouteNode::Group")
                    .field("id", id)
                    .field("children", children)
                    .finish()
            }
        }
    }
}