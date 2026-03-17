use std::sync::Arc;


use crate::core::router::RouteNode ;
use crate::core::router::SpecialNodeKind;
use crate::core::router::SpecialComponent;
use crate::builder::code::CodeRouteBuilder;
use crate::middleware::RidgeMiddleware;



pub struct SpecialDefinition {
    pub kind: SpecialNodeKind,
    pub component: Option<Arc<dyn SpecialComponent>>,
    pub children: Vec<RouteNode>,
    pub middlewares: Vec<Arc<dyn RidgeMiddleware + Send + Sync>>,
}

impl SpecialDefinition {
    pub fn component<C: SpecialComponent + 'static>(mut self, c: C) -> Self {
        self.component = Some(Arc::new(c));
        self
    }

    pub fn middleware<M: RidgeMiddleware + Send + Sync + 'static>(mut self, middleware: M) -> Self {
        self.middlewares.push(Arc::new(middleware));
        self
    }
    
    pub fn finish(mut self, builder: &mut CodeRouteBuilder) {
        let node = RouteNode::Special {
            kind: self.kind,
            component: self.component,
            children: self.children,
            middlewares: self.middlewares,
        };
        builder.roots.push(node);
    }
}