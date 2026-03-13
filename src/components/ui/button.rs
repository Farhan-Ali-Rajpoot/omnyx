use rscx::{component, html, props};
use std::borrow::{Cow};

pub enum ButtonShape {
    Rounded,
    Box,
}

#[derive(Default)]
#[props]
pub struct ButtonProps {
    pub children: Cow<'static, str>,
    pub href: Option<&'static str>,
    pub button_type: Option<&'static str>,
    pub class: Option<&'static str>,
    pub shape: Option<ButtonShape>,
}

const BASE_CLASS: &str =
    "px-[calc(var(--sfu)*1)] py-[calc(var(--sfu)*0.65)] leading-none cursor-pointer";

const ROUNDED: &str = "rounded-full";
const BOX: &str = "rounded-[calc(var(--sfu)*0.1)]";

#[component]
pub fn Button(props: ButtonProps) -> String {
    let shape_class = match props.shape.unwrap_or(ButtonShape::Box) {
        ButtonShape::Rounded => ROUNDED,
        ButtonShape::Box => BOX,
    };

    let extra_class = props
        .class
        .unwrap_or("bg-[var(--color-bg-contrast)] text-[var(--color-text-contrast)] w-fit");

    let mut class = String::with_capacity(
        BASE_CLASS.len() + shape_class.len() + extra_class.len() + 3,
    );

    class.push_str(BASE_CLASS);
    class.push(' ');
    class.push_str(shape_class);
    class.push(' ');
    class.push_str(extra_class);

    // 1. If href is present, it's an anchor tag
    if let Some(href) = props.href {
        return html! {
            <a href={href} class={class}>
                {props.children}
            </a>
        };
    }

    // 2. If button_type is Some, it's a button. 
    // If button_type is None, it's a div (perfect for the label/checkbox hack).
    if let Some(btn_type) = props.button_type {
        html! {
            <button type={btn_type} class={class}>
                {props.children}
            </button>
        }
    } else {
        html! {
            <div class={class}>
                {props.children}
            </div>
        }
    }
}
