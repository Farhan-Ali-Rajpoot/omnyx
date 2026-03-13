use rscx::{component, html};
use super::{
    CustomIconProps,
};


type UserCheckProps = CustomIconProps;

#[component]
pub fn UserCheck (
    props: UserCheckProps
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
                d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                class={props.path_class.unwrap_or("")}    
            >
            </path>
            <circle 
                cx="8.5" 
                cy="7" 
                r="4"
                class={props.path_class.unwrap_or("")}    
            ></circle>
            <polyline 
                points="17 11 19 13 23 9"
                class={props.path_class.unwrap_or("")}    
            ></polyline>
        </svg>
    }
}