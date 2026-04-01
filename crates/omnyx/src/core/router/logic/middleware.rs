use std::sync::Arc;
use std::pin::Pin;
use std::task::{Context, Poll};
use async_trait::async_trait;
use axum::http::{Response as AxumResponse, StatusCode};
use axum::response::IntoResponse;
use tower::Layer;

use crate::core::router::io::{Request, Response};

#[async_trait]
pub trait Middleware: Send + Sync + 'static {
    async fn handle(
        &self,
        request: Request,
        next: Next,
    );
}

#[async_trait]
impl<F> Middleware for F 
where 
    F: Fn(Request, Next) 
{
    fn handle(&self, request: Request, next: Next) {
        (self)(request, next);
    }
}

pub struct MiddlewareService<S> {
    pub(crate) middleware: Arc<dyn Middleware>,
    pub(crate) next: S, // This is the inner doll (the next service)
}

// Implement Clone so Tower can scale this across threads
impl<S: Clone> Clone for MiddlewareService<S> {
    fn clone(&self) -> Self {
        Self {
            middleware: self.middleware.clone(),
            next: self.next.clone(),
        }
    }
}


pub struct Next {
    pub(crate) inner: Box<dyn FnOnce(&Request)>
}

impl Next {
    pub async fn run(mut self, request: &Request)  {
        (self.inner)(request).await;
    }
}