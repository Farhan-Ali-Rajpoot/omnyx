use std::collections::HashMap;

use crate::core::router::io::{Response, Request};
use crate::types::BoxFuture;

#[derive(Debug, Clone)]
pub struct LayoutProps {
    pub children: String,                  
    pub slots: HashMap<String, String>,      
}

impl Default for LayoutProps {
    fn default() -> Self {
        Self {
            children: "".into(),
            slots: HashMap::new(),
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


pub trait ErasedLayoutComponent: std::fmt::Debug + Send + Sync + 'static {
    fn call_erased(&self, request: Request) -> BoxFuture<Response>;
}

pub trait LayoutComponent<Args>: Send + Sync + 'static {
    fn call(self, request: Request) -> impl Future<Output = Response> + Send;
}

#[derive(Debug)]
pub struct LayoutComponentWrapper<H, Args> {
    pub handler: H,
    pub _marker: std::marker::PhantomData<Args>
}

impl<H, Args> LayoutComponent<Args> for LayoutComponentWrapper<H, Args>
where
    H: LayoutComponent<Args> + Clone + Send + Sync + 'static,
    Args: Send + Sync + 'static,
{
    fn call(self, request: Request) -> impl Future<Output = Response> + Send {
        self.handler.call(request)
    }
}

impl_handler!(LayoutComponent, call; );
impl_handler!(LayoutComponent, call; T1);
impl_handler!(LayoutComponent, call; T1, T2);