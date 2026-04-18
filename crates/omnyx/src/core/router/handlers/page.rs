use std::marker::PhantomData;

use crate::core::router::io::{Request, Response};
use crate::types::BoxFuture;


pub trait ErasedPageComponent: std::fmt::Debug + Send + Sync + 'static {
    fn call_erased(&self, request: Request) -> BoxFuture<Response>;
}

pub trait PageComponent<Args>: Clone + Send + Sync + 'static {
    fn call(self, request: Request) -> impl Future<Output = Response> + Send;
}

#[derive(Debug)]

pub struct PageComponentWrapper<H, Args> {
    pub handler: H,
    pub _marker: PhantomData<Args>,
}

impl<H, Args> ErasedPageComponent for PageComponentWrapper<H, Args>
where
    H: PageComponent<Args> + std::fmt::Debug + Clone + Send + Sync + 'static,
    Args: std::fmt::Debug + Send + Sync + 'static,
{
    fn call_erased(&self, request: Request) -> BoxFuture<Response> {
        Box::pin(self.handler.clone().call(request))
    }
}

impl_handler!(PageComponent, call; );
impl_handler!(PageComponent, call; T1);