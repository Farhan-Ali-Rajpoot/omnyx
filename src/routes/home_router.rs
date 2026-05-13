use omnyx::{
    collections::LinearMap, request::Request, router::{LayoutProps, RenderedParallelRoute, Router}
};
use rscx::html;

use crate::components::layout::{Navbar, Footer};

pub fn home_router() -> Router {
    Router::new()
        .layout("home", |layout| {
            layout
                .loader_handler(|| async move {
                    "Loading..."
                })
                .handler(|props: LayoutProps| async move {
                    let d = RenderedParallelRoute {
                        html: "None".into(),
                        params: LinearMap::new()
                    };          
                    let sidebar = props.parallel_routes.get("@sidebar").unwrap_or(&d);         

                    html! {
                        <div>
                            <Navbar class=None user=None />
                            { props.children }
                            { &sidebar.html }
                            <Footer class=None />
                        </div>
                    };

                    tokio::time::sleep(std::time::Duration::from_secs(3)).await;

                    Err::<&str, &str>("Layout-Error")
                })
                .error_handler(async move || {
                    "Error occured in layout"
                })
                .parallel_route("@sidebar", |r| {
                    r
                    .page("/[[...slug]]", |page| {
                        page
                        .handler(|| async move { Err::<&str, &str>("z") })
                        .loader_handler(|| async move { html!{ "Loading Sidebar"} })
                        .error_handler(|| async move { Err::<&str, &str>("z") })
                        .children(|r| {
                            r
                            .page("/user", |page| {
                                page
                                .handler(|| async move {  tokio::time::sleep(std::time::Duration::from_secs(3)).await;   html! { User_Sidebar }  })
                                .loader_handler(|| async move { html! { "Loading User_Sidebar "}})
                                .error_handler(|| async move { html! { "Error User_Sidebar"}})
                            })
                        })
                    })
                })
                .children(|router| {
                    router
                        .page("/", |page| {
                            page
                            .method("GET", || async move {
                                html! { "Page" }
                            })
                            .children(|r| {
                                r
                                .page("/user", |page|  {
                                    page
                                    .method("GET", || async move {
                                        tokio::time::sleep(std::time::Duration::from_secs(3)).await; Err::<&str, &str>("E")
                                    })
                                    .loader_handler(|| async move {
                                        "Loading User"
                                    })
                                    .error_handler(|| async move {
                                        "ErroredUser----"
                                    })
                                })
                                .page("/admin", |page| {
                                    page
                                    .method("GET", || async move {
                                        html! { Admin }
                                    })
                                })
                            })
                        })
                })
        })
}