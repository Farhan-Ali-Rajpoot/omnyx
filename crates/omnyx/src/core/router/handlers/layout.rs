use std::borrow::Cow;
use std::collections::HashMap;
use std::future::Future;
use std::pin::Pin;
use std::sync::Arc;
use async_trait::async_trait;
use serde::{Deserialize, Serialize};

use crate::core::router::logic::RouteMetadata;
use crate::core::router::io::{Response, Request, IntoResponse};
use crate::error::RouteError;

#[derive(Clone, Debug, Serialize, Deserialize)]
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

#[async_trait]
pub trait ErasedLayoutComponent: Send + Sync + 'static {
    async fn call_erased(&self, request: &mut Request) -> Response;
}

#[async_trait]
pub trait LayoutComponent<Args>: Clone + Send + Sync + 'static {
    async fn call(self, request: Request) -> Response;
}

#[async_trait]
impl<H, Args> ErasedLayoutComponent for LayoutComponent<H, Args>
where
    H: LayoutComponent<Args> + Clone + Send + Sync + 'static,
    Args: Send + Sync + 'static,
{
    async fn call_erased(&self, request: &mut Request) -> Response {
        let owned_req = request.clone();
        self.clone().call(request).await
    }
}

impl_handler!(LayoutComponent, call; );
impl_handler!(LayoutComponent, call; T1);
impl_handler!(LayoutComponent, call; T1, T2);