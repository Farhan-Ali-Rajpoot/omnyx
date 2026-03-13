use super::{
    LayoutProps,
};
use rscx::{component, html, props}; 
use std::borrow::Cow;

pub type RootLayoutProps = LayoutProps;

#[component]
pub fn RootLayout(props: RootLayoutProps) -> String {
    html! {
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                // Styles 
                <link rel="stylesheet" href="/public/dist/styles/styles.css" />
                // Fonts
                <link rel="preload" href="/public/fonts/HafferMonoRegular.woff2" as_="font" type="font/woff2" crossorigin="anonymous" />
                // Scripts
                <script type="module" src="/public/dist/js/bundle.js"/>
            </head>
        
            <body class="min-h-screen w-full bg-[var(--color-bg-base)] text-[var(--color-text-base)] font-haffer-montreal antialiased">
                { props.children.unwrap_or_default() }
            </body>
        </html>
    }
}