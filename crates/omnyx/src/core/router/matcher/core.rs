use std::sync::Arc;
use std::any::{TypeId, Any};

use crate::core::ErasedLoaderComponent;
use crate::error::RouteError;
use crate::core::router::logic::{RouteMetadata, Middleware};
use crate::core::router::handlers::{ErasedLayoutComponent, ErasedApiHandler, ErasedPageComponent, ErasedErrorComponent};
use crate::collections::LinearMap;

#[derive(Clone, Debug)]
pub struct RouteMatcher {
    router: matchit::Router<Arc<RouteEntry>>,
}

#[derive(Clone, Debug)]
pub struct MatchedRoute {
    pub pattern: String,
    pub entry: Arc<RouteEntry>,
    pub params: LinearMap<String, String>,
}

#[derive(Clone, Debug)]
pub struct ApiEndpoint {
    pub controllers: LinearMap<http::Method, Arc<dyn ErasedApiHandler>>,
}

#[derive(Clone, Debug)]
pub struct PageEndpoint {
    pub controllers: LinearMap<http::Method, Arc<dyn ErasedPageComponent>>,
    
    pub loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
    pub error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    pub layouts: Vec<Arc<dyn ErasedLayoutComponent>>,
    pub slots: LinearMap<String, ParallelRoute>,
    
    pub metadata: RouteMetadata,
}

#[derive(Clone, Debug)]
pub enum RouteKind {
    Api(ApiEndpoint),
    Page(PageEndpoint),
}

#[derive(Clone, Debug)]
pub struct RouteEntry {
    pub matched_pattern: String,
    
    pub middlewares: Vec<Arc<dyn Middleware>>,
    pub extensions: crate::core::router::registry::Extensions, 
    
    pub kind: RouteKind,
}

#[derive(Clone, Debug)]
pub struct ParallelRoute {
    pub layout_stack: Vec<Arc<dyn ErasedLayoutComponent>>,
    pub controller: Arc<dyn ErasedPageComponent>,
    pub error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    pub loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
}

impl RouteMatcher {
    pub fn new() -> Self {
        Self {
            router: matchit::Router::new(),
        }
    }

    pub fn resolve(&mut self, path: impl Into<String>, value: RouteEntry) -> Result<(), RouteError> {
        let path_str = path.into();
        self.router.insert(path_str, Arc::new(value))
            .map_err(|_| RouteError::RegistrationFailed("Route registration failed".into()))
    }

    pub fn lookup(&self, path: &str) -> Result<MatchedRoute, matchit::MatchError> {
        let matched = self.router.at(path)?;
        
        let mut params = LinearMap::with_capacity(matched.params.len());
        for (key, value) in matched.params.iter() {
            params.insert(key.to_string(), value.to_string());
        }

        Ok(MatchedRoute {
            pattern: matched.value.matched_pattern.clone(), 
            entry: Arc::clone(matched.value),
            params,
        })
    }
}