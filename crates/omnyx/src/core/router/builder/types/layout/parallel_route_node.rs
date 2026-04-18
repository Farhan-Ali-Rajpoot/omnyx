use std::collections::HashMap;

use crate::core::router::registry::{ParallelRouteNode};
use crate::core::router::utils::Path;
use crate::core::router::builder::types::layout::{ParallelRoutePageDefination, ParallelRouteLayoutDefination};

pub trait ParallelRouteContainer {
    type Output;
    fn collect(&mut self, node: ParallelRouteNode);
}

pub struct ParallelRouteRoot {
    pub node: Option<ParallelRouteNode>
}

impl ParallelRouteContainer for ParallelRouteRoot {
    type Output = ParallelRouteNode;
    fn collect(&mut self, node: ParallelRouteNode) {
        self.node = Some(node);
    }
}

pub struct ParallelRouteCollection {
    pub root_nodes: Vec<ParallelRouteNode>
}

impl ParallelRouteContainer for ParallelRouteCollection {
    type Output = Vec<ParallelRouteNode>;
    fn collect(&mut self, node: ParallelRouteNode) {
        self.root_nodes.push(node);
    }
}

pub struct ParallelRouteBuilder<C: ParallelRouteContainer> {
    pub context: C
}

impl<C: ParallelRouteContainer> ParallelRouteBuilder<C> {

    pub fn page(&self, path: impl Into<String>) -> ParallelRoutePageDefination {
        ParallelRoutePageDefination {
            path: Path::from_str(&path.into()),
            controller: None,
            error_controller: None,
            loader_controller: None,
            children: Vec::new(),
        }
    }

    pub fn layout(&self, id: impl Into<String>) -> ParallelRouteLayoutDefination {
        ParallelRouteLayoutDefination {
            id: id.into(),
            controller: None,
            loader_controller: None,
            error_controller: None,
            parallel_routes: HashMap::new(),
            children: Vec::new(), 
        }
    }

}
