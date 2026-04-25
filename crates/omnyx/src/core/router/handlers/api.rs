use std::future::Future;
use std::marker::PhantomData;

use crate::core::router::io::{Response, Request};
use crate::types::BoxFuture;

pub trait ErasedApiHandler: Send + Sync + 'static {
    fn call_erased(&self, request: Request) -> BoxFuture<Response>;
}

pub trait ApiHandler<Args>: Clone + Send + Sync + 'static {
    fn call(self, request: Request) -> impl Future<Output = Response> + Send ;
}

#[derive(Debug)]
pub struct ApiHandlerWrapper<H, Args> {
    pub handler: H,
    pub _marker: PhantomData<Args>,
}

impl<H, Args> ErasedApiHandler for ApiHandlerWrapper<H, Args>
where
    H: ApiHandler<Args> + Clone + Send + Sync + 'static,
    Args: Send + Sync + 'static,
{
    fn call_erased(&self, request: Request) -> BoxFuture<Response> {
        Box::pin(self.handler.clone().call(request))
    }
}

impl_handler!(ApiHandler, call; );
impl_handler!(ApiHandler, call; T1);