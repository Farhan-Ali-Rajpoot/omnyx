use std::marker::PhantomData;

use crate::core::router::io::{Request, Response};
use crate::types::BoxFuture;

pub trait ErasedNotFoundComponent: Send + Sync + 'static {
    fn call_erased(&self, request: Request) -> BoxFuture<Response>;
}


pub trait NotFoundComponent<Args>: Clone + Send + Sync + 'static {
    fn call(self, request: Request) -> impl Future<Output = Response> + Send;
}

pub struct NotFoundComponentWrapper<H, Args> {
    pub handler: H,
    pub _marker: PhantomData<Args>,
}


impl<H, Args> ErasedNotFoundComponent for NotFoundComponentWrapper<H, Args>
where
    H: NotFoundComponent<Args> + Clone + Send + Sync + 'static,
    Args: Send + Sync + 'static,
{
    fn call_erased(&self, request: Request) -> BoxFuture<Response> {
        Box::pin(self.handler.clone().call(request))
    }
}

impl_handler!(NotFoundComponent, call; );
impl_handler!(NotFoundComponent, call; T1);