use std::sync::Arc;
use crate::error::RouteError;
use crate::core::router::logic::{RouteMetadata, Middleware};
use crate::core::router::handlers::{ErasedLayoutComponent, ErasedApiHandler, ErasedPageComponent, ErasedErrorComponent, ErasedLoaderComponent};
use crate::collections::LinearMap;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct RouteId(pub usize);

#[derive(Clone)]
pub struct RouteMatcher {
    pub(crate) router: matchit::Router<RouteId>,
    pub(crate) entries: Vec<Arc<RouteEntry>>,
}

pub struct ParallelRouteMatcher {
    pub(crate) router: matchit::Router<RouteId>,
    pub(crate) entries: Vec<Arc<ParallelRoute>>,
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
    pub(crate) node_id: String,
}

#[derive(Clone)]
pub struct Layout {
    pub(crate) base_path: String,
    pub(crate) controller: Option<Arc<dyn ErasedLayoutComponent>>,
    pub(crate) error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    pub(crate) loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
    pub(crate) parallel_routers: LinearMap<String, Arc<ParallelRouteMatcher>>,
    pub(crate) node_id: String,
}

#[derive(Clone)]
pub struct ParallelRoute {
    pub(crate) matched_pattern: String,
    pub(crate) controller: Option<Arc<dyn ErasedPageComponent>>,
    pub(crate) error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    pub(crate) loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
    pub(crate) layouts: Vec<Arc<Layout>>,
    pub(crate) node_id: String,
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
    pub(crate) kind: RouteKind,
    pub(crate) node_ids: Vec<String>,   // NEW: list of all node IDs in this route
}

impl RouteMatcher {
    pub fn new() -> Self {
        Self {
            router: matchit::Router::new(),
            entries: Vec::new(),
        }
    }

    pub fn resolve(&mut self, path: impl Into<String>, value: RouteEntry) -> Result<RouteId, RouteError> {
        let path_str = path.into();
        let id = RouteId(self.entries.len());
        self.entries.push(Arc::new(value));
        self.router
            .insert(path_str, id)
            .map_err(|e| RouteError::RegistrationFailed(format!("{}", e).into()))?;
        Ok(id)
    }

    pub fn lookup(&self, path: &str) -> Result<MatchedRoute, matchit::MatchError> {
        let matched = self.router.at(path)?;
        let entry = self.entries[matched.value.0].clone();
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
            pattern: entry.matched_pattern.clone(),
            entry,
            params,
        })
    }
}

impl ParallelRouteMatcher {
    pub fn new() -> Self {
        Self {
            router: matchit::Router::new(),
            entries: Vec::new(),
        }
    }

    pub fn resolve(&mut self, path: impl Into<String>, value: ParallelRoute) -> Result<(), RouteError> {
        let path_str = path.into();
        let idx = self.entries.len();
        self.entries.push(Arc::new(value));
        self.router
            .insert(path_str, RouteId(idx))
            .map_err(|e| RouteError::RegistrationFailed(format!("{}", e).into()))?;
        Ok(())
    }

    pub fn lookup(&self, path: &str) -> Result<MatchedParallelRoute, matchit::MatchError> {
        let matched = self.router.at(path)?;
        let entry = self.entries[matched.value.0].clone();
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
            pattern: entry.matched_pattern.clone(),
            entry,
            params,
        })
    }
}