use std::collections::HashMap;
use std::sync::Arc;
use axum::http::Method;
use serde_json::Value;

use crate::core::router::{PathSegment, ApiHandler};
use crate::core::router::RouteNode;
use crate::middleware::RidgeMiddleware;
use crate::builder::CodeRouteBuilder;

pub struct ApiDefinition {
    pub segment: PathSegment,
    pub handlers: HashMap<Method, Arc<dyn ApiHandler>>,
    pub children: Vec<RouteNode>,
    pub middlewares: Vec<Arc<dyn RidgeMiddleware + Send + Sync>>,
    pub extensions: HashMap<String, Value>,
}

impl ApiDefinition {

    // Standard Methods
    // Usage: .get(handler), .post(handler) ...etc
    apply_shortcut_method_function!(ApiHandler {
        get     => "GET",
        post    => "POST",
        put     => "PUT",
        delete  => "DELETE",
        patch   => "PATCH",
        head    => "HEAD",
        options => "OPTIONS",
        connect => "CONNECT",
        trace   => "TRACE", 
    });

    // Custom Methods
    // Usage: .method("FARHAN", handler)
    pub fn method<H: ApiHandler + 'static>(mut self, verb: &str, handler: H) -> Self {
        let m = Method::from_bytes(verb.to_uppercase().as_bytes())
            .expect("Invalid HTTP method string");
            
        self.handlers.insert(m, Arc::new(handler));
        self
    }

    pub fn  extension(mut self, key: impl Into<String>, value: Value) -> Self {
        self.extensions.insert(key.into(), value);
        self
    }

    pub fn middleware<M: RidgeMiddleware + Send + Sync + 'static>(mut self, middleware: M) -> Self {
        self.middlewares.push(Arc::new(middleware));
        self
    }

    pub fn finish(mut self, builder: &mut CodeRouteBuilder) {
        let node = RouteNode::Api {
            segment: self.segment,
            handlers: self.handlers,
            children: self.children,
            middlewares: self.middlewares,
            extensions: self.extensions,
        };
        builder.roots.push(node);
    }
}