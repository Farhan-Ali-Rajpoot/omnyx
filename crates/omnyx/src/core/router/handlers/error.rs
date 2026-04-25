use std::marker::PhantomData;

use crate::core::router::io::{Response, Request};
use crate::types::BoxFuture;


pub trait ErasedErrorComponent: Send + Sync + 'static {
    fn call_erased(&self, request: Request) -> BoxFuture<Response>;
}

pub trait ErrorComponent<Args>: Clone + Send + Sync + 'static {
    fn call(self, request: Request) -> impl Future<Output = Response> + Send;
}

#[derive(Debug)]
pub struct ErrorComponentWrapper<H, Args> {
    pub handler: H,
    pub _marker: PhantomData<Args>,
}

impl<H, Args> ErasedErrorComponent for ErrorComponentWrapper<H, Args>
where
    H: ErrorComponent<Args> + Clone + Send + Sync + 'static,
    Args: Send + Sync + 'static,
{
    fn call_erased(&self, request: Request) -> BoxFuture<Response> {
        Box::pin(self.handler.clone().call(request))
    }
}

impl_handler!(ErrorComponent, call; );
impl_handler!(ErrorComponent, call; T1);