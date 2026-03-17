use std::future::Future;
use async_trait::async_trait;

use crate::core::router::RequestContext;
use crate::core::router::Response;
use crate::error::RouteError;




pub type PageResponse = Result<Response, RouteError>;

#[async_trait]
pub trait PageComponent: Send + Sync + 'static {
    async fn render(&self, ctx: RequestContext) -> PageResponse;
}

#[async_trait]
impl<F, Fut> PageComponent for F 
where
    F: Fn(RequestContext) -> Fut + Sync + Send + 'static,
    Fut: Future<Output = PageResponse> + Send + 'static,
{
    async fn render(&self, ctx: RequestContext) -> PageResponse {
        (self)(ctx).await
    }
}


