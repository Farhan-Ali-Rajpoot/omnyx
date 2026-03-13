use rscx::{component, html};
use super::{
    CustomIconProps,
};

pub type AppIconProps = CustomIconProps;

#[component]
pub fn AppIcon (
    props: AppIconProps
) -> String {
    html! {
    <svg
      height="1em"
      width="1em"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class={props.class.unwrap_or("")}
    >
      <circle cx="32" cy="32" r="30" fill="currentColor"/>

      <rect
        class={props.path_class.unwrap_or("")}
        x="17.25" 
        y="17.25" 
        width="29.5"
        height="29.5" 
        rx="4"
        fill="#fff"
        transform="rotate(45 32 32)"
      />

      <rect
        class={props.path_class.unwrap_or("")}
        x="23" y="23" width="18" height="18" rx="4" fill="currentColor" />
    </svg>
  }
}