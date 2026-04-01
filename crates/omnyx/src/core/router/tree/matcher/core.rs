use std::sync::Arc;
use std::collections::{HashMap, HashSet};
use async_trait::async_trait;
use axum::http::Method;
use matchit::{Match, Router as MatchitRouter, InsertError};

use crate::core::router::registry::{RouteNode, SpecialNodeKind};
use crate::error::RouteError;
use crate::core::router::logic::{DataLoader, RouteMetadata, Middleware};
use crate::core::router::handlers::{ErasedLayoutComponent, ErasedApiHandler, ErasedPageComponent, ErasedErrorComponent};

use super::Params;

#[async_trait]
pub trait RouteMatcher: Send + Sync + 'static {
    fn r#match(&self, path: &str, method: http::Method) -> Option<MatchedRoute>;
}

#[derive(Clone, Debug)]
pub struct MatchedRoute {
    pub defination: Arc<RouteEntry>,

    pub params: Params,
    pub matched_pattern: String,
}

#[derive(Clone, Debug)]
pub struct MatchitMatcher {
    router: Arc<MatchitRouter<Arc<RouteEntry>>>,
}

#[derive(Clone, Debug)]
pub enum RouteHandlers {
    Page(HashMap<http::Method, Arc<dyn ErasedPageComponent>>),
    Api(HashMap<http::Method, Arc<dyn ErasedApiHandler>>),
}

#[derive(Clone, Debug)]
pub struct SlotEntry {
    pub layout_stack: Vec<Arc<dyn ErasedLayoutComponent>>,
    pub handler: Arc<dyn ErasedPageComponent>,
    pub error_handler: Option<Arc<dyn ErasedErrorComponent>>,
}

#[derive(Clone, Debug)]
pub struct RouteEntry {
    // Route specific
    pub matched_pattern: String,
    pub handlers: RouteHandlers,
    pub error_handler: Option<Arc<dyn ErasedErrorComponent>>,
    pub slots: HashMap<String, SlotEntry>,
    // Inherited 
    pub middlewares: Vec<Arc<dyn Middleware>>,
    pub layouts: Vec<Arc<dyn ErasedLayoutComponent>>,
    pub metadata: RouteMetadata,
    pub extensions: http::Extensions,
}

impl MatchitMatcher {
    pub fn new() -> Self {
        Self {
            router: Arc::new(MatchitRouter::new()),
        }
    }
}

#[async_trait]
impl RouteMatcher for MatchitMatcher {
    fn r#match(&self, path: &str, method: http::Method) -> Option<MatchedRoute> {

        let normalized_path = if path.starts_with("/") {
            path
        }else {
            &format!("/{}", path)
        };

        let matched = self.router.at(normalized_path).ok()?;

        let params_vec: Vec<(String, String)> = matched.params
            .iter()
            .map(|(k, v)| (k.to_string(), v.to_string()))
            .collect();

        Some(MatchedRoute {
            defination: matched.value.defination,
            params: Params(params_vec.into()),
            matched_pattern: matched.value.matched_pattern.clone(),
        })
    }
}