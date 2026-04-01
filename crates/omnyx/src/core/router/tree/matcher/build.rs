use std::sync::Arc;
use std::collections::{HashMap, HashSet};
use async_trait::async_trait;
use axum::http::Method;
use matchit::{Match, Router as MatchitRouter, InsertError};

use crate::core::router::registry::{RouteNode, SpecialNodeKind};
use crate::error::RouteError;
use crate::core::router::logic::{DataLoader, RouteMetadata, Middleware};
use crate::core::router::handlers::{ErasedLayoutComponent, ErasedApiHandler, ErasedPageComponent, ErasedErrorComponent};

use super::{MatchitMatcher, RouteEntry, BakeExtensions};

#[derive(Clone)]
pub struct BakeContext {
    pub path: String,
    pub layouts: Vec<Arc<dyn ErasedLayoutComponent>>,
    pub middlewares: Vec<Arc<dyn Middleware>>,
    pub metadata: RouteMetadata,
    pub extensions: BakeExtensions,
}

impl Default for BakeContext {
    fn default() -> Self {
        Self {
            path: "/".into(),
            layouts: Vec::new(),
            middlewares: Vec::new(),
            metadata: RouteMetadata::default(),
            extensions: BakeExtensions::default(),
        }
    }
} 


impl MatchitMatcher {

    pub fn build(root_nodes: Vec<RouteNode>) -> Result<Self, RouteError> {
        let mut router = MatchitRouter::new();

        for node in &root_nodes {
            let mut ctx = BakeContext::default();
            Self::bake_recursive(node, &mut router, ctx)?;
        }

        Ok(Self {
            router: Arc::new(router),
        })
    }

    fn bake_recursive(
        node: &RouteNode,
        router: &mut MatchitRouter<Arc<RouteEntry>>,
        mut ctx: BakeContext,
    ) -> Result<(), RouteError> {
        match node {
            RouteNode::Page {path, handlers, metadata, extensions, children} => {

            }
        }
    }
}



impl MatchitMatcher {
    /// Safely joins two paths, ensuring there are no double slashes `//`
    /// and converting Omnyx syntax `[id]` to matchit syntax `{id}`.
    fn join_paths(parent: &str, child: &str) -> String {
        let p = parent.trim_end_matches('/');
        
        let c_normalized = child
            .replace("[[", "{")
            .replace("]]", "}")
            .replace("[", "{")
            .replace("]", "}")
            .replace("...", "*");
            
        let c = c_normalized.trim_start_matches('/');

        if p.is_empty() {
            if c.is_empty() { String::from("/") } else { format!("/{}", c) }
        } else if c.is_empty() {
            p.to_string()
        } else {
            format!("{}/{}", p, c)
        }
    }
}