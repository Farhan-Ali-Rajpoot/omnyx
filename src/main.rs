use omnyx::{
    builder::{AppBuilder, Config}, 
    request::Request, 
    router::{LayoutProps, Router, RouteMetadata}
};
use rscx::{html};


fn main() {

    let router = Router::new()
    .layout("root", |layout| {
        layout
        .metadata(RouteMetadata {
            title: Some("Omnyx Test".into()),
            ..Default::default()
        })
        .handler(|req: Request, props: LayoutProps| async move {
                    let none = "None".to_string();
                    let html = format!(r##"
                    <!DOCTYPE html>
                        <html lang="en">
                            <head>
                                {0}
                                <meta charset="utf-8" />
                                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                <style>
                                    body {{
                                        margin: 0;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        min-height: 100vh;
                                        background-color: #f4f4f9;
                                        gap: 30px; 
                                    }}
                                    .container {{
                                        width: 300px;
                                        height: 400px;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        border-radius: 15px;
                                        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                                        color: white;
                                        font-family: Arial, sans-serif;
                                        padding: 20px;
                                        text-align: center;
                                    }}
                                    .blue {{ background-color: #3498db; }}
                                    .red {{ background-color: #e74c3c; }}
                                    .green {{ background-color: #2ecc71; }}
                                </style>
                            </head>
                            <body>
                                <div class="container blue">
                                    {1}
                                </div>
                                
                                <div class="container red">{2}</div>
                                <div class="container green">{3}</div>
                            </body>
                        </html>"##, 
                        &req.metadata().render_html(),
                        &props.children,
                        &props.parallel_routes.get("@navbar").unwrap_or(&none),
                        &props.parallel_routes.get("@sidebar").unwrap_or(&none)
                    );

                    println!("{:#?}", &props.parallel_routes);

            html

        })
        .parallel_route("@sidebar", |route| {
            route
            .page("/user")
            .handler(|| async move {
                "Sidebar"
            });
            
            route
        })
        .parallel_route("@navbar", |route| {
            route
            .page("/user")
            .handler(|| async move {
                "Navbar"
            });
            
            route
        })
        .children(|router| {
            router
            .page("/user", |page| {
                page
               
                .method("GET", |req: Request| async move {
                    html! { 
                        <h1>Hey there! My name is OMNYX</h1>
                    }
                })
               
            })
        })
    });


    let config = Config {
        address: "127.0.0.1:8080".into(),
        public_dir: Some("/public".into()),
    };

    let app = AppBuilder::with_opt(config)
        .with_router(router)
        .build()
        .unwrap();

    app.run();
}   