use std::sync::Arc;

use crate::core::router::builder::Router;
use crate::core::router::registry::RouteNode;
use crate::core::router::logic::{Middleware, RouteMetadata};





pub struct GroupDefinition {
    pub id: String,
    pub children: Vec<RouteNode>,
    pub extensions: crate::core::router::registry::Extensions,
    pub metadata: Option<RouteMetadata>,
    pub middlewares: Vec<Arc<dyn Middleware>>,
}

impl GroupDefinition {
    // Utility
    pub fn extension<T: Send + Clone + Sync + 'static>(mut self, value: T) -> Self {
        self.extensions.insert(value);
        self
    }

    pub fn middleware<M: Middleware + Send + Sync + 'static>(mut self, middleware: M) -> Self {
        self.middlewares.push(Arc::new(middleware));
        self
    }

    pub fn metadata(mut self, metadata: RouteMetadata) -> Self {
        self.metadata = Some(metadata);
        self
    }

    pub fn children<F>(mut self, f: F) -> Self 
    where 
        F: FnOnce(Router) -> Router 
    {
        let final_router = f(Router::new());

        self.children.extend(final_router.root_nodes);
        self
    }
    // Router
    pub fn nest_router(mut self, router: Router) -> Self {
        self.children.extend(router.root_nodes);
        self
    }

    pub fn into_route_node(self,) -> RouteNode {
        RouteNode::Group {
            id: self.id,
            children: self.children,
            extensions: self.extensions,
            middlewares: self.middlewares,
            metadata: self.metadata,
        }
    }
}





