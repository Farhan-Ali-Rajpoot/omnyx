use std::collections::HashMap;
use serde_json::Value;

use crate::core::router::PathSegment;
use crate::core::router::RouteNode;
use crate::core::router::SpecialNodeKind;
use crate::core::router::metadata::RouteMetadata;
use crate::builder::code::types::{
    layout::LayoutDefinition,
    api::ApiDefinition,
    page::PageDefinition,
    middleware::MiddlewareDefinition,
    extension::ExtensionDefinition,
    special::SpecialDefinition,
    group::GroupDefinition,
};




pub struct CodeRouteBuilder {
    pub roots: Vec<RouteNode>,
}

impl CodeRouteBuilder {
    pub fn new() -> Self {
        Self { roots: vec![] }
    }

    pub fn page(&mut self, path: impl Into<String>) -> PageDefinition {
        PageDefinition {
            segment: PathSegment::parse_segment(&path.into()),
            handlers: HashMap::new(),
            loaders: vec![],
            metadata: RouteMetadata::default(),
            children: vec![],
            extensions: HashMap::new(),
            middlewares: vec![]
        }
    }

    pub fn api(&mut self, path: impl Into<String>) -> ApiDefinition {
        ApiDefinition {
            segment: PathSegment::parse_segment(&path.into()),
            handlers: HashMap::new(),
            children: vec![],
            middlewares: vec![],
            extensions: HashMap::new(),
        }
    }

    pub fn layout(&mut self, id: impl Into<String>) -> LayoutDefinition {
        LayoutDefinition {
            id: id.into(),
            component: None,
            metadata: RouteMetadata::default(),
            children: vec![],
            slots: HashMap::new(),
            extensions: HashMap::new(),
            middlewares: vec![]
        }
    }

    pub fn group(&mut self, id: impl Into<String>) -> GroupDefinition {
        GroupDefinition {
            id: id.into(),
            children: vec![],
            extensions: HashMap::new(),
            middlewares: vec![]
        }
    }

    pub fn middleware(&mut self) -> MiddlewareDefinition {
        MiddlewareDefinition {
            middlewares: vec![],
            children: vec![],
        }
    }

    pub fn special(&mut self, kind: SpecialNodeKind) -> SpecialDefinition {
        SpecialDefinition {
            kind,
            component: None,
            children: vec![],
            middlewares: vec![]
        }
    }

    pub fn extension(&mut self, node_type: impl Into<String>) -> ExtensionDefinition {
        ExtensionDefinition {
            node_type: node_type.into(),
            data: Value::Null,
            children: vec![],
            middlewares: vec![]
        }
    }


    // pub fn build(self) -> Vec<RouteNode> {
    //     self.roots
    // }
}

