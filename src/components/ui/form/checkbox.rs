use rscx::{component, html, props};
use crate::{
    config::icons::{
        Check,
        CustomIconProps,
    },
};

pub enum CheckboxSize {
    Small,
    Medium,
}

#[props]
pub struct CheckboxProps {
    pub size: CheckboxSize,
    pub border: Option<bool>,
    pub checked: Option<bool>,
}

#[component]
pub fn Checkbox(props: CheckboxProps) -> String {
    // 1. Centralized Decision Logic
    // We determine the container size and the icon properties in one match arm.
    let (div_size, icon_props) = match props.size {
        CheckboxSize::Medium => (
            "w-[calc(var(--sfu)*1.75)] h-[calc(var(--sfu)*1.75)]",
            CustomIconProps {
                class: Some("hidden group-peer-checked:block text-[var(--color-text-contrast)] text-[calc(var(--sfu)*1)]"),
                path_class: None, 
            },
        ),
        CheckboxSize::Small => (
            "w-[calc(var(--sfu)*1.25)] h-[calc(var(--sfu)*1.25)]",
            CustomIconProps {
                class: Some("hidden group-peer-checked:block text-[var(--color-text-contrast)] text-[calc(var(--sfu)*0.7)]"),
                path_class: None,
            },
        ),
    };

    html! {
        <label class="relative inline-flex items-center cursor-pointer rounded-full">
            <input 
                type="checkbox" 
                checked={props.checked.unwrap_or(false)}
                class="sr-only peer" 
            />

            <div
                class={
                    [
                        "group rounded-full bg-[var(--color-bg-app)] \
                        peer-checked:bg-[var(--color-electric-indigo)] \
                        flex items-center justify-center flex-shrink-0 relative \
                        border-[calc(var(--sfu)*0.0625)]",
                        
                        if props.border.unwrap_or(true) { 
                            "border-[var(--color-border-surface)]" 
                        } else { 
                            "border-transparent not-peer-checked:hover:border-[var(--color-border-surface)]" 
                        },
                        
                        div_size
                    ].join(" ")
                }
            >
                {Check(icon_props).await}
            </div>
        </label>
    }
}