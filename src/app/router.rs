use super::{
    App,
    config::{Config},
    app::{State},
};

use axum::{
    routing::{get},
    Router,
 };
use tower_http::{
    services::ServeDir,
    trace::TraceLayer
};
use tower::Layer;


impl App {
    pub fn with_router(mut self, router: Router<State>) -> Self {
        self.blueprint = self.blueprint.merge(router);
        self
    }

    pub fn with_layer<L>(mut self, layer: L) -> Self
    where
        L: Layer<axum::routing::Route> + Clone + Send + Sync + 'static,
        L::Service: tower::Service<axum::extract::Request> + Clone + Send + Sync + 'static,
        <L::Service as tower::Service<axum::extract::Request>>::Response:
            axum::response::IntoResponse + 'static,
        <L::Service as tower::Service<axum::extract::Request>>::Error:
            Into<std::convert::Infallible> + 'static,
        <L::Service as tower::Service<axum::extract::Request>>::Future:
            Send + 'static,
    {
        self.blueprint = self.blueprint.layer(layer);
        self
    }

    pub fn build_router(self) -> Router {
        self.blueprint
            .route("/health", get(|| async { "OK" }))
            .nest_service("/public", ServeDir::new("public"))
            .layer(TraceLayer::new_for_http())
            .with_state(self.state)
    }
}


