use std::marker::PhantomData;

use crate::core::router::io::{Request, Response};
use crate::types::BoxFuture;

pub trait ErasedLoaderComponent: Send + Sync + 'static {
    fn call_erased(&self, request: Request) -> BoxFuture<Response>;
}


pub trait LoaderComponent<Args>: Clone + Send + Sync + 'static {
    fn call(self, request: Request) -> impl Future<Output = Response> + Send;
}

pub struct LoaderComponentWrapper<H, Args> {
    pub handler: H,
    pub _marker: PhantomData<Args>,
}


impl<H, Args> ErasedLoaderComponent for LoaderComponentWrapper<H, Args>
where
    H: LoaderComponent<Args> + Clone + Send + Sync + 'static,
    Args: Send + Sync + 'static,
{
    fn call_erased(&self, request: Request) -> BoxFuture<Response> {
        Box::pin(self.handler.clone().call(request))
    }
}

impl_handler!(LoaderComponent, call; );
impl_handler!(LoaderComponent, call; t1);