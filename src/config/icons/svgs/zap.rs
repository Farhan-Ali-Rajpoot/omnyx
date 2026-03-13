use rscx::{component, html};
use super::{
    CustomIconProps,
};


type ZapProps = CustomIconProps;

#[component]
pub fn Zap (
    props: ZapProps
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
            xmlns="http://www.w3.org/2000/svg">
            class={props.class.unwrap_or("")}
        <polygon 
            points="13 2 3 14 12 14 11 22 21 10 12 10 13 2">
            class={props.path_class.unwrap_or("")}
            </polygon>
        </svg>
    }
}