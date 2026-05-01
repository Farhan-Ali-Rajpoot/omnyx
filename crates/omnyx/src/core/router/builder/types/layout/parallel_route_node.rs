use std::collections::HashMap;

use crate::collections::LinearMap;
use crate::core::router::registry::{ParallelRouteNode};
use crate::core::router::utils::Path;
use crate::core::router::builder::types::layout::{ParallelRoutePageDefination, ParallelRouteLayoutDefination};

pub struct ParallelRouteBuilder {
    pub root_nodes: Vec<ParallelRouteNode>
}

impl ParallelRouteBuilder {

    pub fn new() -> Self {
        Self {
            root_nodes: Vec::new()
        }
    }

    pub fn page<F>(mut self, path: impl Into<String>, f: F) -> Self
    where
        F: FnOnce(ParallelRoutePageDefination) -> ParallelRoutePageDefination
    {
        let page = ParallelRoutePageDefination {
            path: Path::from_str(&path.into()),
            controller: None,
            error_controller: None,
            loader_controller: None,
            children: Vec::new(),
        };

        let s = f(page);
        self.root_nodes.push(s.into_parallel_route_node());
        self
    }

    pub fn layout<F>(mut self, id: impl Into<String>, f: F) -> Self
    where
        F: FnOnce(ParallelRouteLayoutDefination) -> ParallelRouteLayoutDefination 
    {
        let layout = ParallelRouteLayoutDefination {
            id: id.into(),
            controller: None,
            loader_controller: None,
            error_controller: None,
            parallel_routes: LinearMap::new(),
            children: Vec::new(), 
        };

        let s = f(layout);
        self.root_nodes.push(s.into_parallel_route_node());
        self
    }

}
