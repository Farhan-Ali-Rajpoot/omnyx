use rscx::{component, html};
use super::{CustomIconProps};

type TwitterProps = CustomIconProps;

#[component]
pub fn Twitter(props: TwitterProps) -> String {
    html! {
        <svg 
           class={props.class.unwrap_or("")}
           stroke="currentColor" 
           fill="currentColor" 
           stroke-width="0" 
           viewBox="0 0 24 24" 
           height="1em" 
           xmlns="http://www.w3.org/2000/svg"
        >
           <path 
                class={props.path_class.unwrap_or("")} 
                d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z"
            />
        </svg>
    }
}