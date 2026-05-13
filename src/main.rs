mod components;
mod config;
mod routes;

use omnyx::{
    builder::{AppBuilder, Config},
    include_dir::{self, Dir, include_dir},
    request::Request,
    router::LayoutProps,
};
use routes::base_router;

static PUBLIC_DIR: Dir<'static> = include_dir!("$CARGO_MANIFEST_DIR/public");

fn main() {
    let router = base_router();

    let config = Config {
        address: "127.0.0.1:3000".into(),
        embedded_public_dir: Some(&PUBLIC_DIR),
    };

    let root_layout = async move |req: Request, props: LayoutProps| {
        omnyx::rscx::html! {
            <!DOCTYPE html>
                <html lang="en">
                    <head>
                        { &req.metadata().render_html() }
                        <meta charset="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <link rel="stylesheet" href="/public/dist/styles/styles.css" />
                        <script type="module" src="/public/dist/js/bundle.js" defer=true></script>
                    </head>
                    <body class="min-h-screen w-full bg-[var(--color-bg-base)] text-[var(--color-text-base)] font-haffer-montreal antialiased">
                        { props.children }
                    </body>
                </html>
        } 
    };

    let app = AppBuilder::new()
        .with_config(config)
        .with_router(router)
        .with_root_layout(root_layout)
        .build()
        .unwrap();

    app.run();
}
