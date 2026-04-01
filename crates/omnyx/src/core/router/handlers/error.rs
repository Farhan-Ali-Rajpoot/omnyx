use std::future::Future;
use std::marker::PhantomData;
use async_trait::async_trait;
use crate::core::router::io::{Response, IntoResponse, Request};

#[async_trait]
pub trait ErasedErrorComponent: Send + Sync + 'static {
    async fn call_erased(&self, request: Request) -> Response;
}

#[async_trait]
pub trait ErrorComponent<Args>: Clone + Send + Sync + 'static {
    async fn call(self, request: Request) -> Response;
}

pub struct ErrorComponentWrapper<H, Args> {
    pub handler: H,
    pub _marker: PhantomData<Args>,
}

#[async_trait]
impl<H, Args> ErasedErrorComponent for ErrorComponentWrapper<H, Args>
where
    H: ErrorComponent<Args> + Clone + Send + Sync + 'static,
    Args: Send + Sync + 'static,
{
    async fn call_erased(&self, request: Request) -> Response {
        self.handler.clone().call(request).await
    }
}

impl_handler!(ErrorComponent, call; );
impl_handler!(ErrorComponent, call; T1);