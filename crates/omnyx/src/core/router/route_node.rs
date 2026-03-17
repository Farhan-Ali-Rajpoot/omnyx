use std::sync::Arc;
use std::collections::HashMap;
use serde_json::Value;
use axum::http::{self, Method};

use crate::core::router::metadata::RouteMetadata;
use crate::render::layout::LayoutComponent;
use crate::middleware::RidgeMiddleware;
use crate::loader::DataLoader;
use crate::render::mode::RenderMode;
use crate::core::router::{PageAction, ApiHandler, SpecialComponent};
use crate::render::page::PageComponent;
use crate::core::router::PathSegment;


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
        segment: PathSegment,
        handlers: HashMap<Method, Arc<dyn PageComponent>>,
        metadata: RouteMetadata,
        children: Vec<RouteNode>,
        loaders: Vec<Arc<dyn DataLoader>>,
        middlewares: Vec<Arc<dyn RidgeMiddleware + Send + Sync>>,
        extensions: HashMap<String, Value>,
    },
    
    Api {
        segment: PathSegment,
        handlers: HashMap<Method, Arc<dyn ApiHandler>>,
        children: Vec<RouteNode>,
        middlewares: Vec<Arc<dyn RidgeMiddleware + Send + Sync>>,
        extensions: HashMap<String, Value>,
    },

    Layout {
        id: String,
        component: Option<Arc<dyn LayoutComponent>>,
        metadata: RouteMetadata,
        children: Vec<RouteNode>,
        slots: HashMap<String, Vec<RouteNode>>, 
        extensions: HashMap<String, Value>,
        middlewares: Vec<Arc<dyn RidgeMiddleware + Send + Sync>>,
    },

    Group {
        id: String,
        children: Vec<RouteNode>,
        extensions: HashMap<String, Value>,
        middlewares: Vec<Arc<dyn RidgeMiddleware + Send + Sync>>,
    },

    MiddlewareBoundary {
        middlewares: Vec<Arc<dyn RidgeMiddleware + Send + Sync>>,
        children: Vec<RouteNode>,
    },

    Special {
        kind: SpecialNodeKind,
        component: Option<Arc<dyn SpecialComponent>>,
        children: Vec<RouteNode>,
        middlewares: Vec<Arc<dyn RidgeMiddleware + Send + Sync>>,
    },

    Extension {
        node_type: String, // "trpc-procedure", "liveview-channel", "graphql-endpoint"...
        data: Value,
        children: Vec<RouteNode>,
        middlewares: Vec<Arc<dyn RidgeMiddleware + Send + Sync>>,
    },
}
