use std::marker::PhantomData;

use crate::core::router::io::{Request, Response};
use crate::types::BoxFuture;

pub trait ErasedLoaderComponent: std::fmt::Debug + Send + Sync + 'static {
    fn call_erased(&self, request: Request) -> BoxFuture<Response>;
}


pub trait LoaderComponent<Args>: std::fmt::Debug + Clone + Send + Sync + 'static {
    fn call(self, request: Request) -> impl Future<Output = Response> + Send;
}

#[derive(Debug)]
pub struct LoaderHandlerWrapper<H, Args> {
    pub handler: H,
    pub _marker: PhantomData<Args>,
}


impl<H, Args> ErasedLoaderComponent for LoaderHandlerWrapper<H, Args>
where
    H: LoaderComponent<Args> + std::fmt::Debug + Clone + Send + Sync + 'static,
    Args: std::fmt::Debug + Send + Sync + 'static,
{
    fn call_erased(&self, request: Request) -> BoxFuture<Response> {
        Box::pin(self.handler.clone().call(request))
    }
}

impl_handler!(LoaderComponent, call; );
impl_handler!(LoaderComponent, call; T1);