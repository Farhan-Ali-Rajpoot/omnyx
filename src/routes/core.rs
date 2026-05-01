use omnyx::{request::Request, router::{LayoutProps, RouteMetadata, Router}};
use rscx::html;

use super::home_router;

pub fn base_router () -> Router {
    Router::new()
    .layout("root", |layout| {
        layout
        .handler(|props: LayoutProps, req: Request| async move {
            html!(
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        { &req.metadata().render_html() }
                        <meta charset="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                        <link rel="preload" href="/public/dist/styles/styles.css" r#as="style" />
                        <link rel="stylesheet" href="/public/dist/styles/styles.css" />

                        <link rel="preload" href="/public/fonts/HafferMonoRegular.woff2" r#as="font" type="font/woff2" crossorigin="anonymous" />

                        <script type="module" src="/public/dist/js/bundle.js" defer=true></script>
                    </head>

                    <body class="min-h-screen w-full bg-[var(--color-bg-base)] text-[var(--color-text-base)] font-haffer-montreal antialiased">
                        { props.children }
                    </body>
                </html>
            )

        })
        .metadata(
            RouteMetadata::new()
            .title("Millat Higher Secondary College")
            .description("Millat College is Higher Secondary college at CHowk Sarwar Shaheed")
            .creator("Farhan Ali")
        )
        .nest_router(home_router())
    })
}