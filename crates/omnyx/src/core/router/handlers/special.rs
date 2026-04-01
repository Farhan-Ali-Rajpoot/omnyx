use std::future::Future;
use std::marker::PhantomData;
use async_trait::async_trait;

use crate::core::router::io::{Request, Response, IntoResponse};

#[async_trait]
pub trait ErasedSpecialComponent: Send + Sync + 'static {
    async fn call_erased(&self, request: Request) -> Response;
}

#[async_trait]
pub trait SpecialComponent<Args>: Clone + Send + Sync + 'static {
    async fn call(self, request: Request) -> Response;
}

pub struct SpecialHandlerWrapper<H, Args> {
    pub handler: H,
    pub _marker: PhantomData<Args>,
}

#[async_trait]
impl<H, Args> ErasedSpecialComponent for SpecialHandlerWrapper<H, Args>
where
    H: SpecialComponent<Args> + Clone + Send + Sync + 'static,
    Args: Send + Sync + 'static,
{
    async fn call_erased(&self, request: Request) -> Response {
        self.handler.clone().call(request).await
    }
}

impl_handler!(SpecialComponent, call; );
impl_handler!(SpecialComponent, call; T1);