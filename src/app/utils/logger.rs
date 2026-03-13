use tracing_subscriber::{fmt, prelude::*, EnvFilter};

pub fn init() {
    tracing_subscriber::registry()
    .with(EnvFilter::from_default_env())
    .with(fmt::layer())
    .init();
}