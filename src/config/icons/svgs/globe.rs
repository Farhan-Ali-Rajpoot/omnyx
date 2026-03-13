use rscx::{component, html};
use super::{
    CustomIconProps,
};

type GlobeProps = CustomIconProps;

#[component]
pub fn Globe (
    props: GlobeProps
) -> String {
    html! {
        <svg 
            class={props.class.unwrap_or(" ")}
            stroke="currentColor" 
            fill="none" 
            stroke-width="2" 
            viewBox="0 0 24 24" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            height="1em" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle class={props.path_class.unwrap_or(" ")} cx="12" cy="12" r="10"></circle>
            <line   class={props.path_class.unwrap_or(" ")} x1="2" y1="12" x2="22" y2="12"></line>
            <path class={props.path_class.unwrap_or("")} d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
    }
}