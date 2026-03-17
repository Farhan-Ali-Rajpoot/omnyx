use std::future::Future;
use axum::response::{IntoResponse, Response as AxumResponse};
use async_trait::async_trait;

use crate::error::RouteError;
use crate::render::components::{LayoutComponent, LayoutProps, PageComponent, PageResponse};
use crate::core::router::RequestContext;
use crate::core::router::{Response};


#[async_trait]
pub trait ApiHandler: Send + Sync + 'static {
    async fn handle(&self, ctx: &RequestContext) -> Response;
}


#[async_trait]
pub trait PageAction: Send + Sync + 'static {
    async fn execute(&self, ctx: &RequestContext) -> Response;
}


pub trait SpecialComponent: Send + Sync + 'static {
    fn render(&self, ctx: &RequestContext) -> Response;
}

// // ========== Page Handler Factory ==========
// pub fn make_page_handler<F, Fut>(f: F) -> impl PageComponent
// where
//     F: Fn(&RequestContext) -> Fut + Send + Sync + 'static,
//     Fut: Future<Output = PageResponse> + Send,
// {
//     #[derive(Clone)]
//     struct PageComponentClosure<F>(F);

//     #[async_trait]
//     impl<F, Fut> PageComponent for PageComponentClosure<F>
//     where
//         F: Fn(&RequestContext) -> Fut + Send + Sync + 'static,
//         Fut: Future<Output = PageResponse> + Send,
//     {
//         async fn render(&self, ctx: &RequestContext) -> Result<String, RouteError> {
//             (self.0)(ctx).await
//         }
//     }

//     PageComponentClosure(f)
// }

// #[macro_export]
// macro_rules! page {
//     ($closure:expr) => {
//         $crate::router::handler::make_page_handler($closure)
//     };
// }

// pub fn make_api_handler<F, Fut, Res>(f: F) -> impl ApiHandler
// where
//     F: Fn(&RequestContext) -> Fut + Send + Sync + 'static,
//     Fut: Future<Output = Result<Res, RouteError>> + Send,
//     Res: IntoResponse,
// {
//     #[derive(Clone)]
//     struct ApiHandlerClosure<F>(F);

//     #[async_trait]
//     impl<F, Fut, Res> ApiHandler for ApiHandlerClosure<F>
//     where
//         F: Fn(&RequestContext) -> Fut + Send + Sync + 'static,
//         Fut: Future<Output = Result<Res, RouteError>> + Send,
//         Res: IntoResponse,
//     {
//         async fn handle(&self, ctx: &RequestContext) -> Response {
//             (self.0)(ctx).await.map(|res| res.into_response())
//         }
//     }

//     ApiHandlerClosure(f)
// }

// #[macro_export]
// macro_rules! api {
//     ($closure:expr) => {
//         $crate::router::handler::make_api_handler($closure)
//     };
// }

// pub fn make_full_layout<F, Fut>(f: F) -> impl LayoutComponent + Clone + Send + Sync + 'static
// where
//     F: Fn(&RequestContext, LayoutProps) -> Fut + Send + Sync + 'static,
//     Fut: Future<Output = String> + Send,
// {
//     #[derive(Clone)]
//     struct FullLayout<F>(F);

//     #[async_trait]
//     impl<F, Fut> LayoutComponent for FullLayout<F>
//     where
//         F: Fn(&RequestContext, LayoutProps) -> Fut + Send + Sync + 'static,
//         Fut: Future<Output = String> + Send,
//     {
//         async fn render(&self, props: LayoutProps, ctx: &RequestContext) -> String {
//             (self.0)(ctx, props).await
//         }
//     }

//     FullLayout(f)
// }

// #[macro_export]
// macro_rules! layout_full {
//     ($closure:expr) => {
//         $crate::router::handler::make_full_layout($closure)
//     };
// }

// pub fn make_simple_layout<F>(f: F) -> impl LayoutComponent + Clone + Send + Sync + 'static
// where
//     F: Fn(LayoutProps) -> String + Send + Sync + 'static,
// {
//     #[derive(Clone)]
//     struct SimpleLayout<F>(F);

//     #[async_trait]
//     impl<F> LayoutComponent for SimpleLayout<F>
//     where
//         F: Fn(LayoutProps) -> String + Send + Sync + 'static,
//     {
//         async fn render(&self, props: LayoutProps, _ctx: &RequestContext) -> String {
//             (self.0)(props)
//         }
//     }

//     SimpleLayout(f)
// }

// #[macro_export]
// macro_rules! layout {
//     ($closure:expr) => {
//         $crate::router::handler::make_simple_layout($closure)
//     };
// }