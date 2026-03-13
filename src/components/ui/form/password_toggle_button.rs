use rscx::{component, html, props};
use crate::{
    config::icons::{
        OutlineEye,
        OutlineEyeInvisible,
        CustomIconProps,
    },
};

#[props]
pub struct PasswordToggleButtonProps {}


#[component]
pub fn PasswordToggleButton (_props: PasswordToggleButtonProps) -> String {
    html! {
        <div
        data-password-toggle
        data-state="show"
        class="group w-full flex items-center justify-end"
      >
        <div
          class="
            flex items-center justify-center cursor-pointer \
            text-neutral-500 dark:text-neutral-300 \
            text-[calc(var(--sfu)*0.85)] \
            leading-[calc(var(--sfu)*1.1)] \
          "
        >
          <span class="group-data-[state='show']:hidden">Show Password</span>
          <span class="hidden group-data-[state='show']:inline">Hide Password</span>
          
          {
            OutlineEye (CustomIconProps {
                class: Some("inline group-data-[state='show']:hidden eye ml-[calc(var(--sfu)*0.35)]"),
                path_class: None,
            }).await
          }
          {
            OutlineEyeInvisible(CustomIconProps{
                class: Some("hidden group-data-[state='show']:inline eye-hidden /
                  ml-[calc(var(--sfu)*0.35)]"),
                path_class: None,
            }).await
          }
        </div>
      </div>
    }
}