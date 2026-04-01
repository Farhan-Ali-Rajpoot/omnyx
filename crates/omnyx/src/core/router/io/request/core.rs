use std::collections::HashMap;
use std::sync::{Arc, RwLock};
use percent_encoding::percent_decode_str;
use axum::body::Body;
use axum::http::{header, HeaderMap, HeaderName, HeaderValue, request::Parts, Uri};
use axum_extra::extract::cookie::{Cookie, CookieJar};
use bytes::Bytes;
use serde_json::Value;
use http::Method;

use crate::core::router::handlers::LayoutProps;
use crate::core::router::logic::RouteMetadata;

#[derive(Debug, Clone)]
pub struct Request {
    pub id: Arc<str>,
    pub method: Method,
    pub uri: Uri,
    pub path: String,
    pub url: String,
    
    pub params: HashMap<String, String>,
    pub query: HashMap<String, String>,
    pub headers: HeaderMap,
    pub cookies: CookieJar,             
    pub body: Option<Bytes>,

    pub extensions: Arc<RwLock<http::Extensions>>,
    pub metadata: Arc<RouteMetadata>,
    
    pub layout_props: Arc<RwLock<LayoutProps>>,
}

impl Request {
   pub fn new(
        http_req: axum::http::Request<axum::body::Body>,
        params: HashMap<String, String>,
        request_id: Arc<str>,
        metadata: Arc<RouteMetadata>,
    ) -> Self {
        let (parts, _body) = http_req.into_parts();  

        let uri = parts.uri.clone();
        let url = uri.to_string();
        let path = uri.path().to_string();

        // Parse cookies once at the start
        let cookies = CookieJar::from_headers(&parts.headers);

        // Query parsing
        let mut query = HashMap::new();
        if let Some(q) = uri.query() {
            for pair in q.split('&') {
                let (k, v) = pair.split_once('=').unwrap_or((pair, ""));
                let k_decoded = percent_decode_str(k).decode_utf8_lossy().into_owned();
                let v_decoded = percent_decode_str(v).decode_utf8_lossy().into_owned();
                query.insert(k_decoded, v_decoded);
            }
        }

        Self {
            id: request_id,
            method: parts.method,
            uri: parts.uri.clone(),
            url: parts.uri.to_string(),
            path: parts.uri.path().to_string(),
            params,
            query, 
            cookies: CookieJar::from_headers(&parts.headers),
            headers: parts.headers,
            body: None,
            extensions: Arc::new(RwLock::new(parts.extensions)),
            metadata,
            // Initialize with default props
            layout_props: Arc::new(RwLock::new(LayoutProps::default())),
        }
    }

    #[inline]
    pub fn get_param(&self, key: &str) -> Option<&str> {
        self.params.get(key).map(|v| v.as_str())
    }

    #[inline]
    pub fn get_query(&self, key: &str) -> Option<&str> {
        self.query.get(key).map(|v| v.as_str())
    }

    pub fn insert<T: Send + Clone + Sync + 'static>(&self, val: T) {
        if let Ok(mut ext) = self.extensions.write() {
            ext.insert(val);
        }
    }

    pub fn get<T: Send + Sync + Clone + 'static>(&self) -> Option<T> 
    where T: Clone {
        self.extensions.read().ok()?.get::<T>().cloned()
    }

    pub fn get_cookie(&self, name: &str) -> Option<Cookie<'static>> {
        self.cookies.get(name).cloned()
    }

    pub fn get_header_str(&self, name: impl AsRef<str>) -> Option<&str> {
        self.headers.get(name.as_ref()).and_then(|v| v.to_str().ok())
    }

    pub fn bearer_token(&self) -> Option<&str> {
        self.get_header_str(header::AUTHORIZATION)
            .and_then(|auth| auth.strip_prefix("Bearer ").map(str::trim))
    }

    pub fn set_body(&mut self, body: Bytes) {
        self.body = Some(body);
    }
}
