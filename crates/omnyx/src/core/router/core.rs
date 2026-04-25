use std::sync::Arc;

use crate::core::router::matcher::{RouteMatcher, MatchedRoute};
use crate::core::router::registry::RouteNode;
use crate::error::RouteError;

#[derive(Clone)]
pub(crate) struct RouterService {
    pub matcher: Arc<RouteMatcher>,       
}

impl RouterService {
    // Direct Build to prevent temporary memory allocation for RouteNodes
    pub(crate) fn  from_nodes(root_nodes: Vec<RouteNode>) -> Result<Self, RouteError> {
        let matcher: RouteMatcher = RouteMatcher::build_with_nodes(root_nodes)?;

        Ok(Self {
            matcher: Arc::new(matcher),
        })
    }

    pub(crate) fn lookup(&self, path: &str) -> Result<MatchedRoute, matchit::MatchError> {
        self.matcher.lookup(path)
    }

}