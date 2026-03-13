use rscx::{component, html, props};
use crate::components::{
    ui::{Button},
};
use std::borrow::Cow;

#[props]
pub struct HeroProps {
    class: Option<Cow<'static, str>>
}

#[component]
pub fn Hero (
    props: HeroProps 
) -> String {
    html! {
        <section 
            class={
                ["min-h-[600px] h-screen max-h-[1080px] flex flex-col items-center justify-center py-[calc(var(--sfu)*1.5)]",
                props.class.as_deref().unwrap_or(" ")].join(" ")
            }
        >
            <div data-section-content class="w-full h-full flex items-center justify-center">
              <div class="flex flex-col items-center gap-[calc(var(--sfu)*1.75)]">
                <h1 class="text-[calc(var(--sfu)*5.5)] text-center tracking-tight leading-none pt-[calc(var(--sfu)*2)]">
                  Building Modern Web
                </h1>
                <p class="text-[calc(var(--sfu)*1)] max-w-[calc(var(--sfu)*37)] text-center">
                  We build modern, SEO-focused, and high-performance websites that
                  not only look great but also attract real traffic and convert
                  visitors into customers.
                </p>
                <div class="flex gap-[calc(var(--sfu)*0.5)]">
                  <label for="need-a-website-modal">
                    <Button
                        children="Need a website?".into()
                        class=Some("bg-[var(--color-bg-contrast)] text-[var(--color-text-contrast)]")
                        href=None
                        shape=None
                        button_type=None
                    />
                  </label>
                  <label for="about-modal">
                    <Button
                        children="About Us" .into()
                        class=Some("bg-[var(--color-bg-surface-emphasis)]")
                        href=None                            
                        shape=None      
                        button_type=None
                      />
                  </label>
                </div>
              </div>
            </div>
        </section>
    }
}
