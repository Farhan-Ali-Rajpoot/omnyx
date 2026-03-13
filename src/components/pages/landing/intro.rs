use rscx::{component, html, props};
use crate::{
    components::{
        ui::{
            Button, ButtonShape,
        },
    },
    config::{
        icons::{
            Globe,
        },
        meta::{
            APP_METADATA,
        },
    },
};
use std::borrow::Cow;

#[props]
pub struct IntroProps {
    pub class: Option<Cow<'static, str>>
}

#[component]
pub fn Intro(props: IntroProps) -> String {
    html! {
        <section class=["mb-[calc(var(--sfu)*10)] w-full px-[calc(var(--sfu)*1.5)]", props.class.as_deref().unwrap_or("")].join(" ")>
            <div data-section-content class="p-[calc(var(--sfu)*1)]">
                <div class="w-full mb-[calc(var(--sfu)*1)] xl:mb-[calc(var(--sfu)*2)]">
                    <div class="text-[calc(var(--sfu)*3)] sm:text-[calc(var(--sfu)*4)] lg:text-[calc(var(--sfu)*6.5)] leading-[1] tracking-tighter">
                        <h2 class="xl:pl-[calc(var(--sfu)*15)]">"Beyond Interface"</h2>
                        <h2 class="">"WithIn Action"</h2>
                    </div>
                </div>

                <div class="w-full flex flex-col-reverse lg:flex-row items-start justify-between pt-[calc(var(--sfu)*2)]">
                    <div class="w-full lg:w-fit mt-[calc(var(--sfu)*5)] lg:mt-0 flex items-center justify-between">
                        <div class="relative p-[calc(var(--sfu)*0.75)] lg:p-[calc(var(--sfu)*3)] rounded-full bg-[var(--color-bg-surface-emphasis)] text-[calc(var(--sfu)*2)] lg:text-[calc(var(--sfu)*8)] transition-transform ease-[var(--motion-steady)] duration-[var(--duration-long)]">
                            <Globe class=None path_class=None />
                        </div>
                        <div class="lg:hidden p-[calc(var(--sfu)*0.75)] rounded-full bg-[var(--color-bg-surface-emphasis)] text-[calc(var(--sfu)*2)] ">
                            <Globe class=None path_class=None />
                        </div>
                        <div class="lg:hidden p-[calc(var(--sfu)*0.75)] rounded-full bg-[var(--color-bg-surface-emphasis)] text-[calc(var(--sfu)*2)] ">
                            <Globe class=None path_class=None />
                        </div>
                    </div>

                    <div class="max-w-[calc(var(--sfu)*32.5)] sm:mr-[calc(var(--sfu)*2)] relative">
                        <input
                            id="about-text-section"
                            type="checkbox"
                            class="peer/expand hidden"
                        />

                        <p class="lg:text-[calc(var(--sfu)*1)] leading-relaxed text-pretty">
                            {APP_METADATA.name} " is a high-performance collective bridging visionary design with rigorous technical precision. We engineer future-ready ecosystems optimized for speed, SEO, and long-term scalability, ensuring your brand dominates the digital landscape."
                        </p>

                        <div class="grid grid-rows-[0fr] peer-checked/expand:grid-rows-[1fr] transition-all duration-500 ease-[var(--motion-steady)]">
                            <div class="overflow-hidden flex flex-col gap-[calc(var(--sfu)*2)]">
                                <p class="pt-[calc(var(--sfu)*2)]">
                                    "We prioritize performance-first architecture to eliminate friction and maximize conversion. By integrating cutting-edge frameworks with clean, sustainable code, we build digital assets that remain agile as your industry evolves."
                                </p>
                                <p>
                                    "Our approach transforms complex data into intuitive, high-impact user experiences. We don't just launch platforms; we cultivate dynamic environments designed to capture market share and sustain competitive advantage."
                                </p>
                            </div>
                        </div>

                        <label
                            for="about-text-section"
                            class="mt-[calc(var(--sfu)*2)] block w-fit cursor-pointer select-none peer-checked/expand:[&_.text1]:-translate-y-full \
                            peer-checked/expand:[&_.text2]:translate-y-0"
                        >
                            <Button
                                shape=Some(ButtonShape::Rounded)
                                button_type=None
                                href=None
                                class=Some("bg-[var(--color-bg-contrast)] text-[var(--color-text-contrast)] flex items-center gap-[calc(var(--sfu)*0.75)] \
                                    w-fit pointer-events-none")
                                children={html! {
                                    <div class="relative overflow-hidden">
                                        <p class="text1 transition-transform duration-[var(--duration-long)] ease-[var(--motion-steady)]">
                                            "Read More"
                                        </p>
                                        <p class="text2 absolute inset-0 translate-y-full transition-transform duration-[var(--duration-long)] \
                                            ease-[var(--motion-steady)]"
                                        >
                                            "Show Less"
                                        </p>
                                    </div>
                                }.into()}
                            /> 
                        </label>
                    </div>
                </div>
            </div>
        </section>
    }
}