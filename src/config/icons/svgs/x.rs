use rscx::{component, html};
use super::{
    CustomIconProps,
};


type XProps = CustomIconProps;


#[component]
pub fn X (
    props: XProps
) -> String {
    html! {
        <svg 
            height="1em"
            width="auto"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" 
            stroke-width="2.75" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            class={props.class.unwrap_or("")}
            >
                <line class={props.path_class.unwrap_or("")} x1="18" y1="6" x2="6" y2="18"></line>
                <line class={props.path_class.unwrap_or("")} x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
    }
}