use axum::http::{HeaderMap, StatusCode};
use axum_extra::extract::cookie::{CookieJar};
use serde_json::Value;

use crate::core::router::logic::RouteMetadata;

#[derive(Debug, Clone)]
pub enum Body {
    Html(String),
    Fragment(String),
    Json(Value),
    Bytes(Vec<u8>),
    Redirect(String),
    Empty,
}

#[derive(Debug, Clone)]
pub struct Response {
    pub status: StatusCode,
    pub metadata: Option<RouteMetadata>,
    pub headers: HeaderMap,
    pub cookies: CookieJar,
    pub body: Body,
}

impl Response {
    pub fn new(body: Body) -> Self {
        Self {
            status: StatusCode::OK,
            headers: HeaderMap::new(),
            metadata: None,
            cookies: CookieJar::new(),
            body,
        }
    }
}