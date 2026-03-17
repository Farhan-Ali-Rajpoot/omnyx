use axum::http::{header, HeaderMap, HeaderName, HeaderValue, Request, request::Parts};
use axum_extra::extract::cookie::{Cookie, CookieJar};
use serde_json::Value;
use std::collections::HashMap;
use std::sync::Arc;

use crate::core::router::RouteNode;

// #[derive(Debug)]
pub struct RequestContext {
    pub req: Request<axum::body::Body>,

    pub params: HashMap<String, String>,
    pub query: HashMap<String, String>,

    pub cookies: CookieJar,                      

    pub extensions: axum::http::Extensions,
    pub data: HashMap<String, Value>,

    pub matched_node: Option<Arc<RouteNode>>,

    pub response_headers: HeaderMap,             
    pub response_extensions: axum::http::Extensions,

    pub loader_cache: HashMap<String, Value>,
}

impl RequestContext {
    pub fn new(
        req: Request<axum::body::Body>,
        params: HashMap<String, String>,
        matched_node: Option<Arc<RouteNode>>,
    ) -> Self {
        let (parts, body) = req.into_parts();

        let cookies = CookieJar::from_headers(&parts.headers);

        let mut query = HashMap::new();
        if let Some(q) = parts.uri.query() {
            for (k, v) in q.split('&').filter_map(|s| s.split_once('=')) {
                query.insert(k.into(), v.into());
            }
        }

        Self {
            req: Request::from_parts(parts, body),
            params,
            query,
            cookies,                                
            extensions: axum::http::Extensions::new(),
            data: HashMap::new(),
            matched_node,
            response_headers: HeaderMap::new(),
            response_extensions: axum::http::Extensions::new(),
            loader_cache: HashMap::new(),
        }
    }

    // Cookies
    pub fn get_cookie(&self, name: &str) -> Option<&Cookie> {
        self.cookies.get(name)
    }

    pub fn cookies(&self) -> &CookieJar {
        &self.cookies
    }

    pub fn add_cookie(&mut self, cookie: Cookie) {
        if let Ok(value) = HeaderValue::try_from(cookie.encoded().to_string()) {
            self.response_headers.append(header::SET_COOKIE, value);
        }
    }

    pub fn remove_cookie(&mut self, name: impl Into<String>) {
        let removal = Cookie::build(name.into())
            .path("/")                    
            .removal()
            .build();
        self.add_cookie(removal);
    }

    // Headers
    pub fn headers(&self) -> &HeaderMap {
        self.req.headers()
    }

    pub fn get_header(&self, name: impl axum::http::header::AsHeaderName) -> Option<&HeaderValue> {
        self.req.headers().get(name)
    }

    pub fn get_header_str(&self, name: impl axum::http::header::AsHeaderName) -> Option<&str> {
        self.get_header(name).and_then(|v| v.to_str().ok())
    }

    pub fn set_response_header(&mut self, key: HeaderName, value: HeaderValue) {
        self.response_headers.insert(key, value); 
    }

    // Extensions
    pub fn get<T: Send + Sync + 'static>(&self) -> Option<&T> {
        self.extensions.get::<T>()
    }
    pub fn insert<T: Clone + Send + Sync + 'static>(&mut self, value: T) {
        self.extensions.insert(value);
    }

    // Loader cache
    pub fn set_loader_data(&mut self, loader_id: impl Into<String>, data: Value) {
        self.loader_cache.insert(loader_id.into(), data);
    }
 
}