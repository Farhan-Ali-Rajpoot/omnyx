use std::pin::Pin;
use std::boxed::Box;
use std::future::Future;
use async_trait::async_trait;
use http::Extensions;

use crate::core::router::io::{Request};
use crate::core::router::handlers::{LayoutProps};


#[async_trait]
pub trait FromContext: Sized {
    async fn from_context(request: Request) -> Self;
}

#[async_trait]
impl FromContext for Request {
    async fn from_context(request: Request) -> Self {
        request.clone()
    }
}

#[async_trait]
impl FromContext for LayoutProps {
    async fn from_context(ctx: Request) -> Self {
        ctx.layout_props.read()
            .map(|props| props.clone())
            .unwrap_or_default()
    }
}