use rscx::{component, html};
use super::{CustomIconProps};



type CheckProps = CustomIconProps;


#[component]
pub fn Check (
    props: CheckProps
) -> String {
    html!(
        <svg 
            height="1rem" stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" 
            class={props.class.unwrap_or("")}
        >
            <path class={props.path_class.unwrap_or("")} stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
        </svg>
    )
}
 
