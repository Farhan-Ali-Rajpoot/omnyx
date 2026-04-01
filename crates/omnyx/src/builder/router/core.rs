use std::collections::HashMap;
use serde_json::Value;

use crate::core::router::Path;
use crate::core::router::RouteNode;
use crate::core::router::SpecialNodeKind;
use crate::core::router::metadata::RouteMetadata;
use crate::builder::router::types::{LayoutDefinition, ApiDefinition, PageDefinition, SpecialDefinition, GroupDefinition};




pub struct RouterBuilder {
    pub root_nodes: Vec<RouteNode>,
}

impl RouterBuilder {
    pub fn new() -> Self {
        Self { root_nodes: vec![] }
    }

    pub fn page(&mut self, path: impl Into<String>) -> PageDefinition {
        PageDefinition {
            path: Path::from_str(&path.into()),
            controllers: HashMap::new(),
            error_controller: None,
            loader_controller: None,
            middlewares: vec![],
            metadata: RouteMetadata::default(),
            children: vec![],
            extensions: http::Extensions::new(),
        }
    }

    pub fn api(&mut self, path: impl Into<String>) -> ApiDefinition {
        ApiDefinition {
            path: Path::from_str(&path.into()),
            handlers: HashMap::new(),
            children: vec![],
            middlewares: vec![],
            extensions: http::Extensions::new(),
        }
    }

    pub fn layout(&mut self, id: impl Into<String>) -> LayoutDefinition {
        LayoutDefinition {
            id: id.into(),
            controller: None,
            error_controller: None,
            loader_controller: None,
            parallel_routes: HashMap::new(),
            metadata: RouteMetadata::default(),
            children: vec![],
            extensions: http::Extensions::new(),
            middlewares: vec![],
        }
    }

    pub fn group(&mut self, id: impl Into<String>) -> GroupDefinition {
        GroupDefinition {
            id: id.into(),
            children: vec![],
            extensions: http::Extensions::new(),
            middlewares: vec![],
            metadata: RouteMetadata::default(),
        }
    }

    pub fn special(&mut self, kind: SpecialNodeKind) -> SpecialDefinition {
        SpecialDefinition {
            kind,
            component: None,
            children: vec![],
            middlewares: vec![],
            extensions: http::Extensions::new(),
        }
    }
}

