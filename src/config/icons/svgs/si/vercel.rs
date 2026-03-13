use rscx::{component, html};
use super::super::{
    CustomIconProps,
};


type VercelProps = CustomIconProps;

#[component]
pub fn Vercel (
    props: VercelProps
) -> String {
    html! {
     <svg 
        stroke="currentColor" 
        fill="currentColor" 
        stroke-width="0" 
        role="img" 
        viewBox="0 0 24 24" 
        height="1em" 
        width="1em" 
        xmlns="http://www.w3.org/2000/svg"
        class={props.class.unwrap_or("")}
    >
        <path 
        d="M24 22.525H0l12-21.05 12 21.05z"
        class={props.path_class.unwrap_or("")}
        >
        </path>
    </svg>
    }
}