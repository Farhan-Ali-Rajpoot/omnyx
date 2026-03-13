use rscx::{html, component, props};
use super::{
    LayoutProps,
};
use crate::components::{
    layout::{Navbar, Footer},
};


pub type HomeLayoutProps = LayoutProps;

#[component]
pub fn HomeLayout (
    props: HomeLayoutProps
) -> String {
    html! {
        <div class={props.class.as_deref().unwrap_or("")} >
            <Navbar class=None user=None />
            {props.children.as_deref().unwrap_or("")}
            <Footer class=None />
        </div>

    }
}