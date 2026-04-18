use std::sync::Arc;

use crate::core::router::io::{Request};

pub trait Middleware: std::fmt::Debug + Send + Sync + 'static {
    fn handle(
        &self,
        request: Request,
        next: Next,
    );
}

impl<F> Middleware for F 
where 
    F: Fn(Request, Next) + std::fmt::Debug + Send + Sync + 'static
{
    fn handle(&self, request: Request, next: Next) {
        (self)(request, next);
    }
}

pub struct MiddlewareService<S> {
    pub(crate) middleware: Arc<dyn Middleware>,
    pub(crate) next: S, 
}

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
    pub fn run(mut self, request: &Request)  {
        (self.inner)(request);
    }
}