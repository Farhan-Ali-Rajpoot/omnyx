use rscx::{component, html, props};
use crate::config::icons::{
    Nodejs, Vercel, Typescript, Tailwind, React, Nextjs, Threejs, MongoDB,
};
use std::borrow::Cow;

#[props]
pub struct TechCardProps {
    pub icon: String, // Accepts rendered HTML string from an icon component
    pub title: &'static str,
    pub description: &'static str,
}

#[component]
fn TechCard(props: TechCardProps) -> String {
    html! {
        <div class="group relative p-[calc(var(--sfu)*2)] border-l-[calc(var(--sfu)*0.0625)] border-t-[calc(var(--sfu)*0.0625)] border-[var(--color-border-contrast)]">
            <div class="mb-[calc(var(--sfu)*1)] text-[var(--color-text-secondary)]">
                { props.icon }
            </div>
            <h3 class="text-[calc(var(--sfu)*1.125)] text-[var(--color-text-contrast)] mb-[calc(var(--sfu)*0.5)] tracking-tight">
                { props.title }
            </h3>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
                { props.description }
            </p>
        </div>
    }
}

#[props]
pub struct TechProps {
    pub class: Option<Cow<'static, str>>,
}

#[component]
pub fn Tech(props: TechProps) -> String {
    html! {
        <section class={format!("py-[calc(var(--sfu)*6)] bg-[var(--color-bg-contrast)] {}", props.class.as_deref().unwrap_or(""))}>
            /* Essential for your global CSS: section div[data-section-content] */
            <div data-section-content class="w-full flex flex-col items-center justify-center sm:px-[calc(var(--sfu)*2)] gap-[calc(var(--sfu)*2)]">
                
                /* Header */
                <div class="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between mb-[calc(var(--sfu)*4)]">
                    <div class="mb-[calc(var(--sfu)*2.5)] lg:mb-0">
                        <span class="text-[var(--color-text-secondary)] block mb-[calc(var(--sfu)*1)]">
                            "Technical excellence"
                        </span>
                        <h1 class="text-[calc(var(--sfu)*3.5)] sm:text-[calc(var(--sfu)*4.5)] text-[var(--color-text-contrast)] tracking-tighter leading-[0.9] max-w-[calc(var(--sfu)*35)]">
                            "Engineering For " <span class="italic">"hyper Growth"</span>
                        </h1>
                    </div>
                    <div class="text-[var(--color-text-contrast)] max-w-[calc(var(--sfu)*20)] leading-relaxed">
                        "We leverage a modern ecosystem to ensure your application is lightweight, secure, and ready for global scale."
                    </div>
                </div>

                /* Main Grid */
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-r-[calc(var(--sfu)*0.0625)] border-[var(--color-border-contrast)]">
                    <TechCard 
                        icon={ html! { <Nextjs class=Some("text-[calc(var(--sfu)*2)]") path_class=None /> } }
                        title="Next.js 14"
                        description="Server-side rendering and edge computing for instantaneous load times."
                    />
                    <TechCard 
                        icon={html! { <Typescript class=Some("text-[calc(var(--sfu)*2)]") path_class=None /> }}
                        title="TypeScript"
                        description="Enterprise-grade type safety ensuring zero-runtime errors in production."
                    />
                    <TechCard 
                        icon={html! { <MongoDB class=Some("text-[calc(var(--sfu)*2)]") path_class=None /> }}
                        title="Mongo DB"
                        description="Distributed database architecture designed for high-concurrency systems."
                    />
                    <TechCard 
                        icon={html! { <Vercel class=Some("text-[calc(var(--sfu)*2)]") path_class=None /> }}
                        title="Vercel"
                        description="Global Edge Network deployment ensuring sub-second latency worldwide."
                    />
                </div>

                /* Subtle Footer */
                <div class="mt-[calc(var(--sfu)*4)] w-full flex flex-wrap justify-center gap-[calc(var(--sfu)*2.75)] text-[var(--color-text-secondary)] text-[calc(var(--sfu)*1.5)]">
                    <React    class=None path_class=None />
                    <Nodejs   class=None path_class=None />
                    <Tailwind class=None path_class=None />
                    <Threejs  class=None path_class=None/>
                    {
                        vec!["JWT Auth", "Bcrypt"].into_iter().map(|txt| html! {
                            <span class="uppercase font-mono tracking-widest text-[calc(var(--sfu)*0.75)]">
                                { txt }
                            </span>
                        }).collect::<String>()
                    }
                </div>
            </div>
        </section>
    }
}