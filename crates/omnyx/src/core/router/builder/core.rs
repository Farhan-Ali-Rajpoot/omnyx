use crate::collections::LinearMap;
use crate::core::router::Path;
use crate::core::router::RouteNode;
use crate::core::router::builder::types::{LayoutDefinition, ApiDefinition, PageDefinition, GroupDefinition};

#[derive(Clone, Debug)]
pub struct Router {
    pub root_nodes: Vec<RouteNode>,
}

impl Router {
    pub fn new() -> Self {
        Self { root_nodes: Vec::new() }
    }

    pub fn page<P, F>(mut self, path: P, f: F) -> Self
    where 
        P: Into<String>,
        F: FnOnce(PageDefinition) -> PageDefinition 
    {
        let page = PageDefinition {
            path: Path::from_str(&path.into()),
            controllers: LinearMap::new(),
            error_controller: None,
            loader_controller: None,
            middlewares: Vec::new(),
            metadata: None,
            children: Vec::new(),
            extensions: crate::core::router::registry::Extensions::new(),
        };

        let final_page = f(page);
        self.root_nodes.push(final_page.into_route_node());
        self
    }

    pub fn api<P, F>(mut self, path: P, f: F) -> Self 
    where
        P: Into<String>,
        F: FnOnce(ApiDefinition) -> ApiDefinition
    {
        let api = ApiDefinition {
            path: Path::from_str(&path.into()),
            controllers: LinearMap::new(),
            children: Vec::new(),
            middlewares: Vec::new(),
            extensions: crate::core::router::registry::Extensions::new(),
        };

        let final_api = f(api);
        self.root_nodes.push(final_api.into_route_node());
        self
    }

    pub fn layout<I, F>(mut self, id: I, f: F) -> Self
    where
        I: Into<String>,
        F: FnOnce(LayoutDefinition) -> LayoutDefinition
    {
        let layout = LayoutDefinition {
            id: id.into(),
            controller: None,
            error_controller: None,
            loader_controller: None,
            parallel_routes: LinearMap::new(),
            metadata: None,
            children: Vec::new(),
            extensions: crate::core::router::registry::Extensions::new(),
            middlewares: Vec::new(),
        };

        let final_layout = f(layout);
        self.root_nodes.push(final_layout.into_route_node());
        self
    }

    pub fn group<I, F>(mut self, id: I, f: F) -> Self
    where
        I: Into<String>,
        F: FnOnce(GroupDefinition) -> GroupDefinition
    {
        let group = GroupDefinition {
            id: id.into(),
            children: Vec::new(),
            extensions: crate::core::router::registry::Extensions::new(),
            middlewares: Vec::new(),
            metadata: None,
        };

        let final_group = f(group);
        self.root_nodes.push(final_group.into_route_node());
        self
    }

    pub fn nest(mut self, router: Router) -> Self {
        self.root_nodes.extend(router.root_nodes);
        self
    }

    pub fn children<F>(mut self, f: F) -> Self 
    where 
        F: FnOnce(Router) -> Router 
    {
        let final_router = f(Router::new());

        self.root_nodes.extend(final_router.root_nodes);
        self
    }
}