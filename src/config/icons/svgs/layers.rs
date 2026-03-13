use rscx::{component, html};
use super::{
    CustomIconProps,
};


type LayersProps = CustomIconProps;

#[component]
pub fn Layers (
    props: LayersProps
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
            <polygon 
                points="12 2 2 7 12 12 22 7 12 2"
                class={props.path_class.unwrap_or("")}
            >
            </polygon>
            <polyline 
                points="2 17 12 22 22 17"
                class={props.path_class.unwrap_or("")}
            >
            </polyline>
            <polyline 
                points="2 12 12 17 22 12"
                class={props.path_class.unwrap_or("")}
            >
            </polyline>
        </svg>
    }
}