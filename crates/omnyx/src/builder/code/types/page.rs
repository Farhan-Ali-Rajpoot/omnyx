use std::sync::Arc;
use std::collections::HashMap;
use async_trait::async_trait;
use axum::http::Method;
use serde_json::Value;

use crate::core::router::{RouteNode, PathSegment, PageAction};
use crate::render::page::PageComponent;
use crate::render::{RenderMode};
use crate::core::router::metadata::RouteMetadata;
use crate::loader::DataLoader;
use crate::builder::code::CodeRouteBuilder;
use crate::middleware::RidgeMiddleware;


pub struct PageDefinition {
    pub segment: PathSegment,
    pub handlers: HashMap<Method, Arc<dyn PageComponent>>,
    pub metadata: RouteMetadata,
    pub children: Vec<RouteNode>,
    pub loaders: Vec<Arc<dyn DataLoader>>,
    pub extensions: HashMap<String, Value>,
    pub middlewares: Vec<Arc<dyn RidgeMiddleware + Send + Sync>>,
}

impl PageDefinition {
     // Standard Methods
    // Usage: .get(handler), .post(handler) ...etc
    apply_shortcut_method_function!(PageComponent {
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
    pub fn method<H: PageComponent + 'static>(mut self, verb: &str, handler: H) -> Self {
        let m = Method::from_bytes(verb.to_uppercase().as_bytes())
            .expect("Invalid HTTP method string");
            
        self.handlers.insert(m, Arc::new(handler));
        self
    }

    pub fn middleware<M: RidgeMiddleware + Send + Sync + 'static>(mut self, middleware: M) -> Self {
        self.middlewares.push(Arc::new(middleware));
        self
    }

    pub fn loader<L: DataLoader + 'static>(mut self, loader: L) -> Self {
        self.loaders.push(Arc::new(loader));
        self
    }


    pub fn extension(mut self, key: impl Into<String>, value: Value) -> Self {
        self.extensions.insert(key.into(), value);
        self
    }

    pub fn finish(mut self, builder: &mut CodeRouteBuilder) {
        let node = RouteNode::Page {
            segment: self.segment,
            handlers: self.handlers,
            metadata: self.metadata,
            children: self.children,
            loaders: self.loaders,
            extensions: self.extensions,
            middlewares: self.middlewares,
        };
        builder.roots.push(node);
    }
}
