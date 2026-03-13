use rscx::{component, html};
use super::{
    CustomIconProps,
};


type MoonProps = CustomIconProps;

#[component]
pub fn Moon (
    props: MoonProps
) -> String {
    html! {
        <svg 
            stroke="currentColor" 
            fill="none" 
            stroke-width="2" 
            viewBox="0 0 24 24" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            height="1em" 
            width="1em" 
            xmlns="http://www.w3.org/2000/svg"
            class={props.class.unwrap_or("")}
        >
            <path 
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            class={props.path_class.unwrap_or("")}
            >
            </path>
        </svg>
    }
}