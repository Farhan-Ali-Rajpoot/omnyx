use rscx::{component, html, props}; 
use std::borrow::Cow;

#[derive(Clone)]
pub struct SocialLinkItem {
    pub label: Cow<'static, str>, 
    pub href: &'static str,
}

#[props]
pub struct SocialLinksProps {
    pub items: Vec<SocialLinkItem>,
    pub class: Option<&'static str>,
    pub item_class: Option<&'static str>,
}

#[component]
pub fn SocialLinks(props: SocialLinksProps) -> String {
    html! {
        <div class={format!("flex {}", props.class.unwrap_or(""))}>
            {
                props.items.into_iter().enumerate().map(|(i, item)| {
                    let rounded_class = if i % 2 != 1 { "rounded-full" } else { "" };
                    
                    let combined_item_class = format!(
                        "p-[calc(var(--sfu)*0.6125)] bg-[var(--color-bg-action-surface-emphasis)] {} text-[calc(var(--sfu)*1)] {}",
                        rounded_class,
                        props.item_class.unwrap_or("")
                    );

                    html! {
                        <a href={item.href} class={combined_item_class}>
                            {item.label}
                        </a>
                    }
                }).collect::<String>() 
            }
        </div>
    }
}