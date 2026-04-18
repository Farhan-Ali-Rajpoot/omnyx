use std::marker::PhantomData;

use crate::core::router::io::{Request, Response};
use crate::types::BoxFuture;

pub trait ErasedSpecialComponent: std::fmt::Debug + Send + Sync + 'static {
    fn call_erased(&self, request: Request) -> BoxFuture<Response>;
}


pub trait SpecialComponent<Args>: Clone + Send + Sync + 'static {
    fn call(self, request: Request) -> BoxFuture<Response>;
}

#[derive(Debug)]
pub struct SpecialHandlerWrapper<H, Args> {
    pub handler: H,
    pub _marker: PhantomData<Args>,
}


impl<H, Args> ErasedSpecialComponent for SpecialHandlerWrapper<H, Args>
where
    H: SpecialComponent<Args> + std::fmt::Debug + Clone + Send + Sync + 'static,
    Args: std::fmt::Debug + Send + Sync + 'static,
{
    fn call_erased(&self, request: Request) -> BoxFuture<Response> {
        Box::pin(self.handler.clone().call(request))
    }
}

impl_handler!(SpecialComponent, call; );
impl_handler!(SpecialComponent, call; T1);