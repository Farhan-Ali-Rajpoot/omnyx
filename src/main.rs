pub mod components;
pub mod config;

use axum::response::{Html};

use ridge_core::{
    RidgeBuilder,
    metadata::RouteMetadata,
    handler, handler_with_context,
};
use rscx::{component, props, html};

use crate::components::{
    layout::{RootLayout},
    pages::{
        landing::{Hero},
    },
};






fn main() {
    let app = RidgeBuilder::new()
        .code(|router| {
            router.layout("root")
                .component(RootLayout)
                .finish(router);

            router.route("/")
                .get(handler! async |ctx| { Html(html! { <Hero class=None />}) })
                .finish(router)
                .metadata(RouteMetadata {
                    title: "Omnyx".to_string().into(),
                    ..Default::default()
                });
            
        });

}