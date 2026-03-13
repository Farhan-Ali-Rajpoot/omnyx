use rscx::{component, html, props};
use chrono;
use super::{
    AboutModal,
};

use crate::config::{
    meta::{APP_METADATA, CREATOR_NAME}, 
    links::{FOOTER_SITEMAP, FooterSitemapItem},
    icons::{AppNameTextSvg, X},
    routes::{frontend},
};

use crate::components::ui::{
    form::{FormInput, Checkbox, CheckboxSize}, 
    UnderlineA, UnderlineItem, UnderlineVariant, 
    Button, ButtonShape, 
    Badge, BadgeShape, 
};
use std::borrow::Cow;

#[props]
pub struct FooterProps {
    pub class: Option<Cow<'static, str>>,
}

#[component]
pub fn Footer(props: FooterProps) -> String {
    let current_year = chrono::Utc::now().format("%Y").to_string();
    
    let extra_classes = props.class.as_deref().unwrap_or("");
    let wrapper_class = format!(
        "w-full min-h-fit max-h-screen h-screen flex flex-col justify-between {}", 
        extra_classes
    );

    html! {
        <AboutModal class=None />
        <div class={wrapper_class} id="footer">
            <div class="w-full max-w-[var(--size-container)] mx-auto flex flex-col lg:flex-row \
                items-start justify-between pt-[calc(var(--sfu)*2)] pb-[calc(var(--sfu)*4)]">
                
                <form class="w-full lg:max-w-1/2 flex flex-col pb-[calc(var(--sfu)*4)] \
                    lg:pb-0 lg:pr-[calc(var(--sfu)*7)] px-[calc(var(--sfu)*1.5)]">
                    
                    <div class="text-[calc(var(--sfu)*1.125)] pb-[calc(var(--sfu)*2)]">
                        {format!("Subscribe to the {} Newsletter", APP_METADATA.name)}
                    </div>

                    <div class="flex flex-col sm:flex-row gap-[calc(var(--sfu)*0.5)] pb-[calc(var(--sfu)*1.75)]">
                        <FormInput 
                            label=None
                            required=Some(false)
                            enable_error=Some(false)
                            name=Some("name")
                            input_type=Some("text")
                            placeholder=Some("First Name")
                            class=Some("py-[calc(var(--sfu)*0.75)] px-[calc(var(--sfu)*1)]")
                            border=Some(false)
                            interactive=Some(true)
                            min_length=None
                            max_length=None
                        />
                        <FormInput 
                            label=None
                            required=Some(false)
                            enable_error=Some(false)
                            name=Some("email")
                            input_type=Some("email")
                            placeholder=Some("yourname@email.com")
                            class=Some("py-[calc(var(--sfu)*0.75)] px-[calc(var(--sfu)*1)]")
                            border=Some(false)
                            interactive=Some(true)
                            min_length=None
                            max_length=None
                        />
                    </div>

                    <div class="flex flex-col sm:flex-row gap-[calc(var(--sfu)*2)] sm:gap-0 items-start \
                        sm:items-center justify-between">
                        <div class="flex items-center gap-[calc(var(--sfu)*0.5)] text-[calc(var(--sfu)*0.8625)]">
                            <Checkbox 
                                size=CheckboxSize::Medium 
                                border=Some(false) 
                                checked=Some(false)
                            />
                            "I agree to the "
                            <UnderlineA 
                                children="Privacy Policy" 
                                href="/" 
                                variant=Some(UnderlineVariant::Persistent)
                                class=Some("w-fit")
                                line_class=None
                            />
                        </div>
                        <Button
                            button_type=Some("submit")
                            href=Some("#")
                            shape=Some(ButtonShape::Box)
                            class=Some("w-full sm:w-fit text-center bg-[var(--color-bg-contrast)] text-[var(--color-text-contrast)]")
                            children="Get Updates".into()
                        />
                    </div>
                </form>

                <div class="w-full md:max-w-1/2 flex flex-col sm:px-[calc(var(--sfu)*1.5)]">
                    <div class="flex flex-col sm:flex-row w-full">
                        <input type="radio" name="accordion" id="sitemap-reset" class="hidden" />
                        {render_sitemap().await}
                    </div>
                    
                    <div class="pt-[calc(var(--sfu)*4)] flex gap-[calc(var(--sfu)*2)] px-[calc(var(--sfu)*1.5)] sm:px-0">
                      <div class="flex">
                            <Button 
                                children="Login".into()
                                href= Some(frontend::auth::login::BASE)
                                shape= Some(ButtonShape::Rounded)
                                button_type=None
                                class= Some("bg-[var(--color-bg-contrast)] text-[var(--color-text-contrast)]")
                            />
                            <Button 
                                children=["Join", APP_METADATA.name].join(" ").into()
                                href= Some(frontend::auth::register::BASE)
                                shape= Some(ButtonShape::Box) 
                                button_type=None
                                class= Some("bg-[var(--color-electric-red)] text-[var(--color-text-contrast)]")
                            />
                      </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col">
                <AppNameTextSvg
                    class=Some("footer-svg text-[20.1vw] text-[var(--color-bg-action)] overflow-visible")
                    path_class=Some("footer-svg-path relative transition-all duration-[var(--duration-long)] hover:translate-y-0")
                />

                <div class="w-full max-w-[var(--size-container)] mx-auto flex flex-row justify-between \
                    relative px-[calc(var(--sfu)*1.5)] py-[calc(var(--sfu)*1.75)] font-mono uppercase text-[calc(var(--sfu)*0.7)]">
                    
                    <div class="text-[var(--color-text-action)] flex">
                       {render_legal_links().await}
                    </div>

                    <div class="hidden sm:flex gap-[calc(var(--sfu)*0.25)] items-center">
                        <p>"Created By"</p>
                        <Badge 
                            children=CREATOR_NAME 
                            class=Some("bg-[var(--color-electric-indigo)] text-[var(--color-text-action)]")
                            shape=None
                            href=None
                        />
                    </div>

                    <div class="sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                        {["©", current_year.as_str(), APP_METADATA.name].join(" ")}
                    </div>
                </div>
            </div>
        </div>
    }
}

async fn render_legal_links() -> String {
    use crate::config::links::LEGAL_PAGES_LINKS;
    let mut html_buffer = String::new();

    for (i, link) in LEGAL_PAGES_LINKS.iter().enumerate() {
        let shape = if i % 2 == 1 { BadgeShape::Rounded } else { BadgeShape::Box };

        let badge = html! {
            <Badge
                children=link.short_name
                href=Some(link.href)
                shape=Some(shape)
                class=Some("bg-[var(--color-text-base)] text-[var(--color-text-contrast)]")
            />
        };
        html_buffer.push_str(&badge);
    }
    
    html_buffer
}

async fn render_sitemap() -> String {
    let mut sitemap_html = String::new();

    for (i, section) in FOOTER_SITEMAP.iter().enumerate() {
        let title = section.title;
        let id = format!("sitemap-{}-{}", title, i);
        let children_html = render_sitemap_items(&section.children).await;

        let section_fragment = html! {
            <div class="relative w-full sm:w-1/3 border-t-[calc(var(--sfu)*0.0625)] border-[var(--color-border-surface)] sm:border-none">
                <input type="radio" name="accordion" id={id.clone()} class="peer hidden" />

                <div class="group block w-full border-b-[calc(var(--sfu)*0.0625)] border-[var(--color-border-surface)] sm:border-none">
                    <div class="relative flex items-center justify-between active:bg-[var(--color-bg-press)] sm:active:bg-transparent \
                        py-[calc(var(--sfu)*1)] sm:py-0 px-[calc(var(--sfu)*1.5)] sm:px-0">

                        <label for="sitemap-reset" class="absolute inset-0 z-10 hidden group-peer-checked:block sm:hidden" />
                        <label for={id} class="inset-0 absolute"></label>

                        <div class="text-[calc(var(--sfu)*1.125)]">{title}</div>

                        <X 
                            class=Some("text-[calc(var(--sfu)*0.75)] w-[1em] h-[1em] rotate-45 group-peer-checked:rotate-360 \
                                sm:hidden transition-transform duration-[var(--duration-long)] ease-[var(--motion-steady)]") 
                            path_class=None
                        />
                    </div>

                    <div class="grid grid-rows-[0fr] sm:grid-rows-[1fr] group-peer-checked:grid-rows-[1fr] transition-[grid-template-rows] \
                     duration-[var(--duration-long)] ease-[var(--motion-steady)] px-[calc(var(--sfu)*1.5)] sm:px-0">
                        <div class="overflow-hidden flex flex-col gap-[calc(var(--sfu)*0.5)] sm:gap-[calc(var(--sfu)*0.25)] pt-0 \
                          group-peer-checked:py-[calc(var(--sfu)*1)] sm:group-peer-checked:py-[calc(var(--sfu)*2)] \
                          sm:group-peer-checked:pb-0
                          sm:pt-[calc(var(--sfu)*2)] transition-all duration-[var(--duration-long)] \
                          ease-[var(--motion-steady)]">
                            {children_html}
                        </div>
                    </div>
                </div>
            </div>
        };
        sitemap_html.push_str(&section_fragment);
    }
    sitemap_html
}

async fn render_sitemap_items(children: &[FooterSitemapItem]) -> String {
    let mut items_html = String::new();

    for item in children {
        let fragment = if let Some(target) = item.html_for {
            html! {
                <label for={target}>
                    <UnderlineItem 
                        children=item.label 
                        class=Some("w-fit") 
                        variant=None 
                        line_class=None
                    />
                </label>
            }
        } else {
            html! {
                <UnderlineA 
                    children=item.label 
                    href=item.href.unwrap_or("/") 
                    class=Some("w-fit") 
                    variant=None
                    line_class=None
                />
            }
        };
        items_html.push_str(&fragment);
    }
    items_html
}