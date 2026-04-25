use std::marker::PhantomData;

use crate::collections::LinearMap;
use crate::core::router::io::{Response, Request};
use crate::types::BoxFuture;

#[derive(Debug, Clone)]
pub struct LayoutProps {
    pub children: String,                  
    pub parallel_routes: LinearMap<String, String>,      
}

impl Default for LayoutProps {
    fn default() -> Self {
        Self {
            children: "".into(),
            parallel_routes: LinearMap::new(),
        }
    }
}

impl LayoutProps {
    pub fn new(children: impl Into<String>) -> Self {
        Self {
            children: children.into(),
            ..Default::default()
        }
    }
}
pub trait ErasedLayoutComponent: Send + Sync + 'static {
    fn call_erased(&self, request: Request) -> BoxFuture<Response>;
}

pub trait LayoutComponent<Args>: Clone + Send + Sync + 'static {
    fn call(self, request: Request) -> BoxFuture<Response>;
}

pub struct LayoutComponentWrapper<H, Args> {
    pub handler: H,
    pub _marker: PhantomData<Args>,
}

impl<H, Args> ErasedLayoutComponent for LayoutComponentWrapper<H, Args>
where
    H: LayoutComponent<Args> + Clone + Send + Sync + 'static,
    Args: Send + Sync + Clone + 'static,
{
    fn call_erased(&self, request: Request) -> BoxFuture<Response> {
        self.handler.clone().call(request)
    }
}

impl_handler!(LayoutComponent, call; );
impl_handler!(LayoutComponent, call; T1);
impl_handler!(LayoutComponent, call; T1, T2);