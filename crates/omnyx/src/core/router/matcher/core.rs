use std::sync::Arc;

use crate::error::RouteError;
use crate::core::router::logic::{RouteMetadata, Middleware};
use crate::core::router::handlers::{ErasedLayoutComponent, ErasedApiHandler, ErasedPageComponent, ErasedErrorComponent, ErasedLoaderComponent};
use crate::collections::LinearMap;

#[derive(Clone)]
pub struct RouteMatcher {
    pub(crate) router: matchit::Router<Arc<RouteEntry>>,
}

pub struct ParallelRouteMatcher {
    pub(crate) router: matchit::Router<Arc<ParallelRoute>>,
}

pub struct MatchedRoute {
    pub(crate) pattern: String,
    pub(crate) entry: Arc<RouteEntry>,
    pub(crate) params: LinearMap<String, Vec<String>>,
}


#[derive(Clone)]
pub struct MatchedParallelRoute {
    pub(crate) pattern: String,
    pub(crate) entry: Arc<ParallelRoute>,
    pub(crate) params: LinearMap<String, Vec<String>>,
}


#[derive(Clone)]
pub struct ApiEndpoint {
    pub(crate) controllers: LinearMap<http::Method, Arc<dyn ErasedApiHandler>>,
}

#[derive(Clone)]
pub struct PageEndpoint {
    pub(crate) controllers: LinearMap<http::Method, Arc<dyn ErasedPageComponent>>,
    
    pub(crate) loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
    pub(crate) error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    pub(crate) layouts: Vec<Arc<Layout>>,
    
    pub(crate) metadata: RouteMetadata,
}

#[derive(Clone)]
pub struct Layout {
    pub(crate) base_path: String,
    pub(crate) controller: Option<Arc<dyn ErasedLayoutComponent>>,
    pub(crate) error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    pub(crate) loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
    pub(crate) parallel_routers: LinearMap<String, Arc<ParallelRouteMatcher>>,
}

#[derive(Clone)]
pub struct ParallelRoute {
    pub(crate) matched_pattern: String,
    pub(crate) controller: Option<Arc<dyn ErasedPageComponent>>,
    pub(crate) error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    pub(crate) loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
    pub(crate) layouts: Vec<Arc<Layout>>,
}

#[derive(Clone)]
pub enum RouteKind {
    Api(ApiEndpoint),
    Page(PageEndpoint),
}

#[derive(Clone)]
pub struct RouteEntry {
    pub(crate) matched_pattern: String,
    
    pub(crate) middlewares: Vec<Arc<dyn Middleware>>,
    pub(crate) extensions: crate::core::router::registry::Extensions, 
    
    pub(crate) kind: RouteKind,
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
            .map_err(|e| RouteError::RegistrationFailed(format!("{}", e).into()))
    }

    pub fn lookup(&self, path: &str) -> Result<MatchedRoute, matchit::MatchError> {
        let matched = self.router.at(path)?;
        let mut params = LinearMap::with_capacity(matched.params.len());
        for (key, value) in matched.params.iter() {
            let segments: Vec<String> = value
                .split('/')
                .filter(|s| !s.is_empty()) 
                .map(|s| s.to_string())
                .collect();
        
            params.insert(key.to_string(), segments);
        }

        Ok(MatchedRoute {
            pattern: matched.value.matched_pattern.clone(), 
            entry: Arc::clone(matched.value),
            params,
        })
    }
}



impl ParallelRouteMatcher {
    pub fn new() -> Self {
        Self {
            router: matchit::Router::new(),
        }
    }

    pub fn resolve(&mut self, path: impl Into<String>, value: ParallelRoute) -> Result<(), RouteError> {
        let path_str = path.into();
        self.router.insert(path_str, Arc::new(value))
            .map_err(|e| RouteError::RegistrationFailed(format!("{}", e).into()))
    }

    pub fn lookup(&self, path: &str) -> Result<MatchedParallelRoute, matchit::MatchError> {
        let matched = self.router.at(path)?;
        let mut params = LinearMap::with_capacity(matched.params.len());
        for (key, value) in matched.params.iter() {
            let segments: Vec<String> = value
                .split('/')
                .filter(|s| !s.is_empty()) 
                .map(|s| s.to_string())
                .collect();
        
            params.insert(key.to_string(), segments);
        }

        Ok(MatchedParallelRoute {
            pattern: matched.value.matched_pattern.clone(), 
            entry: Arc::clone(matched.value),
            params,
        })
    }
}