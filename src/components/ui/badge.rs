use rscx::{component, html, props};

pub enum BadgeShape {
    Box,
    Rounded,
}

#[props]
pub struct BadgeProps {
    pub children: &'static str,
    pub shape: Option<BadgeShape>,
    pub href: Option<&'static str>,
    pub class: Option<&'static str>,
}

#[component]
pub fn Badge(props: BadgeProps) -> String {
    let shape_class = match props.shape.unwrap_or(BadgeShape::Box) {
        BadgeShape::Box => "rounded-[calc(var(--sfu)*0.1)]",
        BadgeShape::Rounded => "rounded-full",
    };

    let base_class = "px-[calc(var(--sfu)*0.35)] py-[calc(var(--sfu)*0.025)] \
                      font-mono uppercase text-[calc(var(--sfu)*0.7)]";

    let full_class = [base_class, shape_class, props.class.unwrap_or("")].join(" ");

    if let Some(url) = props.href {
        html! {
            <a href={url} class={full_class}>
                {props.children}
            </a>
        }
    } else {
        html! {
            <div class={full_class}>
                {props.children}
            </div>
        }
    }
}