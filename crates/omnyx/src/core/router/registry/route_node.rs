use std::sync::Arc;
use std::collections::HashMap;
use serde_json::Value;
use axum::http::{self, Method};

use crate::core::router::logic::metadata::RouteMetadata;
use crate::core::router::logic::Middleware;
use crate::core::router::logic::DataLoader;
use crate::core::router::tree::Path;
use crate::core::router::handlers::{
    ErasedApiHandler, ErasedPageComponent, ErasedSpecialComponent, ErasedLayoutComponent, 
    ErasedErrorComponent, ErasedLoaderComponent
};

use super::ParallelRouteNode;

#[derive(Clone, Debug)]
pub enum SpecialNodeKind {
    Loading,
    Error,
    NotFound,
    Redirect,
    Forbidden,
}

#[derive(Clone)]
pub enum RouteNode {
    Page {
        path: Path,
        controllers: HashMap<Method, Arc<dyn ErasedPageComponent>>,
        error_controller: Option<Arc<dyn ErasedErrorComponent>>,
        loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
        metadata: RouteMetadata,
        children: Vec<RouteNode>,
        middlewares: Vec<Arc<dyn Middleware + Send + Sync>>,
        extensions: http::Extensions,
    },
    
    Api {
        path: Path,
        controllers: HashMap<Method, Arc<dyn ErasedApiHandler>>,
        children: Vec<RouteNode>,
        middlewares: Vec<Arc<dyn Middleware + Send + Sync>>,
        extensions: http::Extensions,
    },

    Layout {
        id: String,
        controller: Option<Arc<dyn ErasedLayoutComponent>>,
        error_controller: Option<Arc<dyn ErasedErrorComponent>>,
        loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
        metadata: RouteMetadata,
        children: Vec<RouteNode>,
        parallel_routes: HashMap<String, ParallelRouteNode>, 
        extensions: http::Extensions,
        middlewares: Vec<Arc<dyn Middleware + Send + Sync>>,
    },

    Group {
        id: String,
        children: Vec<RouteNode>,
        metadata: RouteMetadata,
        extensions: http::Extensions,
        middlewares: Vec<Arc<dyn Middleware + Send + Sync>>,
    },

    Special {
        kind: SpecialNodeKind,
        component: Option<Arc<dyn ErasedSpecialComponent>>,
        children: Vec<RouteNode>,
        middlewares: Vec<Arc<dyn Middleware + Send + Sync>>,
        extensions: http::Extensions,
    },
}


impl std::fmt::Debug for RouteNode {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            RouteNode::Page { path, metadata, children, handlers, .. } => {
                f.debug_struct("RouteNode::Page")
                    .field("path", path)
                    .field("metadata", metadata)
                    .field("methods", &handlers.keys().collect::<Vec<_>>())
                    .field("children", children)
                    .finish()
            }
            RouteNode::Api { path, handlers, children, .. } => {
                f.debug_struct("RouteNode::Api")
                    .field("path", path)
                    .field("methods", &handlers.keys().collect::<Vec<_>>())
                    .field("children", children)
                    .finish()
            }
            RouteNode::Layout { id, metadata, children, slots, .. } => {
                f.debug_struct("RouteNode::Layout")
                    .field("id", id)
                    .field("metadata", metadata)
                    .field("slots", &slots.keys().collect::<Vec<_>>())
                    .field("children", children)
                    .finish()
            }
            RouteNode::Group { id, children, .. } => {
                f.debug_struct("RouteNode::Group")
                    .field("id", id)
                    .field("children", children)
                    .finish()
            }
            RouteNode::Special { kind, children, .. } => {
                f.debug_struct("RouteNode::Special")
                    .field("kind", kind)
                    .field("children", children)
                    .finish()
            }
        }
    }
}