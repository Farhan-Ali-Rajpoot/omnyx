mod routes;
mod components;
mod config;

use omnyx::{
    builder::{AppBuilder, Config}, 
    include_dir::{self, Dir, include_dir},
};
use routes::base_router;

static PUBLIC_DIR: Dir<'static> = include_dir!("$CARGO_MANIFEST_DIR/public");

fn main() {

    let router = base_router();

    let config = Config {
        address: "127.0.0.1:3000".into(),
        embedded_public_dir: Some(&PUBLIC_DIR)
    };

    let app = AppBuilder::with_opt(config)
        .with_router(router)
        .build()
        .unwrap();

    app.run();
}   