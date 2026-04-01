use async_trait::async_trait;
use std::marker::PhantomData;

use crate::core::router::io::{Request, Response};

#[async_trait]
pub trait ErasedLoaderComponent: Send + Sync + 'static {
    async fn call_erased(&self, request: Request) -> Response;
}

#[async_trait]
pub trait LoaderComponent<Args>: Clone + Send + Sync + 'static {
    async fn call(self, request: Request) -> Response;
}

pub struct LoaderHandlerWrapper<H, Args> {
    pub handler: H,
    pub _marker: PhantomData<Args>,
}

#[async_trait]
impl<H, Args> ErasedLoaderComponent for LoaderHandlerWrapper<H, Args>
where
    H: LoaderComponent<Args> + Clone + Send + Sync + 'static,
    Args: Send + Sync + 'static,
{
    async fn call_erased(&self, request: Request) -> Response {
        self.handler.clone().call(request).await
    }
}

impl_handler!(LoaderComponent, call; );
impl_handler!(LoaderComponent, call; T1);