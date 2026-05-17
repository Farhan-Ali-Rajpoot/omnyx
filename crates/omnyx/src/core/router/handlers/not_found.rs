use std::marker::PhantomData;

use crate::core::router::io::{Request, Response};
use crate::types::BoxFuture;


pub trait ErasedNotFoundComponent: Send + Sync + 'static {
    fn call_erased(&self, request: Request) -> BoxFuture<Response>;
}

pub trait NotFoundComponent<Args>: Clone + Send + Sync + 'static {
    fn call(self, request: Request) -> BoxFuture<Response>;
}


pub struct NotFoundComponentWrapper<H, Args> {
    pub handler: H,
    pub _marker: PhantomData<Args>,
}

impl<H, Args> ErasedNotFoundComponent for NotFoundComponentWrapper<H, Args>
where
    H: NotFoundComponent<Args> + Clone + Send + Sync + 'static,
    Args: 'static + Send + Sync + Clone,
{
    fn call_erased(&self, request: Request) -> BoxFuture<Response> {
        self.handler.clone().call(request)
    }
}

impl_handler!(NotFoundComponent, call; );
impl_handler!(NotFoundComponent, call; t1);