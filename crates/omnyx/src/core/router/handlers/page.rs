use async_trait::async_trait;
use std::marker::PhantomData;

use crate::core::router::io::{Request, Response};

#[async_trait]
pub trait ErasedPageComponent: Send + Sync + 'static {
    async fn call_erased(&self, request: Request) -> Response;
}

#[async_trait]
pub trait PageComponent<Args>: Clone + Send + Sync + 'static {
    async fn call(self, request: Request) -> Response;
}

pub struct PageHandlerWrapper<H, Args> {
    pub handler: H,
    pub _marker: PhantomData<Args>,
}

#[async_trait]
impl<H, Args> ErasedPageComponent for PageHandlerWrapper<H, Args>
where
    H: PageComponent<Args> + Clone + Send + Sync + 'static,
    Args: Send + Sync + 'static,
{
    async fn call_erased(&self, request: Request) -> Response {
        self.handler.clone().call(request).await
    }
}

impl_handler!(PageComponent, call; );
impl_handler!(PageComponent, call; T1);