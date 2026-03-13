use std::sync::Arc;

use axum::{Router, routing::get};
use tokio::net::TcpListener;
use tower::Layer;
use tower_http::services::ServeDir;
use tower_http::trace::TraceLayer;

use super::config::Config;


pub struct AppContext {
    pub config: Config,
}

pub type State = Arc<AppContext>;

#[derive(Clone)]
pub struct App {
    pub state: State,
    pub blueprint: Router<State>,
}

impl App {
    pub fn new(config: Config) -> Self {
        let state = Arc::new(AppContext { config });

        Self {
            state,
            blueprint: Router::new(),
        }
    }

    pub async fn run(self) -> Result<(), Box<dyn std::error::Error>> {
        let addr = self.state.config.addr.full_addr();
        let listener = TcpListener::bind(&addr).await?;

        println!("🚀 Server initialized");
        println!("📡 Listening on: http://{}", addr);

        axum::serve(listener, self.build_router())
            .with_graceful_shutdown(shutdown_signal())
            .await?;

        Ok(())
    }
}


async fn shutdown_signal() {
    let ctrl_c = async {
        tokio::signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        tokio::signal::unix::signal(
            tokio::signal::unix::SignalKind::terminate(),
        )
        .expect("failed to install signal handler")
        .recv()
        .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => println!("Shutdown signal received (Ctrl+C)"),
        _ = terminate => println!("Shutdown signal received (terminate)"),
    }

    println!("🧹 Cleaning up and shutting down gracefully...");
}