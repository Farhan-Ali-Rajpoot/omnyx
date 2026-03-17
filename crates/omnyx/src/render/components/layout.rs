use std::borrow::Cow;
use std::collections::HashMap;
use std::future::Future;
use std::pin::Pin;
use std::sync::Arc;
use async_trait::async_trait;
use serde::{Deserialize, Serialize};

use crate::core::router::metadata::RouteMetadata;
use crate::core::router::Response;
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

pub type LayoutResponse = Result<Response, RouteError>;

#[async_trait]
pub trait LayoutComponent: Send + Sync + 'static {
    async fn render(&self, props: LayoutProps) -> LayoutResponse;
}

#[async_trait]
impl<F, Fut> LayoutComponent for F
where
    F: Fn(LayoutProps) -> Fut + Send + Sync + 'static,
    Fut: Future<Output = LayoutResponse> + Send + 'static,
{
    async fn render(&self, props: LayoutProps) -> LayoutResponse {
        (self)(props).await
    }
}