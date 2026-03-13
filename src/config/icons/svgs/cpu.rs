use rscx::{component, html};
use super::{
    CustomIconProps,
};


type CpuProps = CustomIconProps;

#[component]
pub fn Cpu (
    props: CpuProps
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
            <rect 
                x="4" 
                y="4" 
                width="16" 
                height="16" 
                rx="2" 
                ry="2"
                class={props.path_class.unwrap_or("")}
            ></rect>
            <rect 
                x="9" 
                y="9" 
                width="6" 
                height="6"
                class={props.path_class.unwrap_or("")}
            ></rect>
            <line 
                x1="9" 
                y1="1" 
                x2="9" 
                y2="4"
                class={props.path_class.unwrap_or("")}
            ></line>
            <line 
                x1="15" 
                y1="1" 
                x2="15" 
                y2="4"
            ></line>
            <line 
                x1="9" 
                y1="20" 
                x2="9" 
                y2="23"
                class={props.path_class.unwrap_or("")}
            ></line>
            <line 
                x1="15" 
                y1="20" 
                x2="15" 
                y2="23"
                class={props.path_class.unwrap_or("")}
            ></line>
            <line 
                x1="20" 
                y1="9" 
                x2="23" 
                y2="9"
                class={props.path_class.unwrap_or("")}
            ></line>
            <line 
                x1="20" 
                y1="14" 
                x2="23" 
                y2="14"
                class={props.path_class.unwrap_or("")}
            ></line><line 
                x1="1" 
                y1="9" 
                x2="4" 
                y2="9"
                class={props.path_class.unwrap_or("")}
            ></line>
            <line 
                x1="1" 
                y1="14" 
                x2="4" 
                y2="14"
                class={props.path_class.unwrap_or("")}
            ></line>
        </svg>
    }
}