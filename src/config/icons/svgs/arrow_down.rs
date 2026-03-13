use rscx::{component, html};
use super::{
    CustomIconProps,
};


type ArrowDownProps = CustomIconProps;

#[component]
pub fn ArrowDown (
    props: ArrowDownProps
) -> String {
    html! {
        <svg 
            stroke="currentColor" 
            fill="none" 
            stroke-width="1.5" 
            viewBox="0 0 24 24" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            height="1em" 
            width="1em" 
            xmlns="http://www.w3.org/2000/svg"
            class={props.class.unwrap_or("")}
        >    
            <line 
                x1="12" 
                y1="5" 
                x2="12" 
                y2="19"
                class={props.path_class.unwrap_or("")}
                ></line>
            <polyline 
                points="19 12 12 19 5 12"
                class={props.path_class.unwrap_or("")}
                ></polyline>
        </svg>
    }
}