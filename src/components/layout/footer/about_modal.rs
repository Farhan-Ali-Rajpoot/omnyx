use rscx::{component, html, props};
use crate::{
    config::{
        icons::{AppNameTextSvg, AppIcon, X, Twitter, Instagram, Tiktok},
        images::{images},
        meta::{
            CREATOR_SOCIAL_LINKS,
        },
    },
    components::ui::{
        SocialLinks, SocialLinkItem,
    },
};
use std::borrow::Cow;

#[props]
pub struct AboutModalProps {
    pub class: Option<Cow<'static, str>>,
}

#[component]
pub fn AboutModal(props: AboutModalProps) -> String {
    
    html! {
        <div class={props.class.as_deref().unwrap_or("")}>
            <input type="checkbox" id="about-modal" class="peer hidden" />
            
            <div class={"
               m-[calc(var(--sfu)*0.5)] h-[calc(100vh-calc(var(--sfu)*1))] w-[calc(var(--sfu)*39)] bg-[var(--color-bg-action-surface)] \
               text-[var(--color-text-action)] rounded-[calc(var(--sfu)*0.25)] fixed top-0 right-0 z-32 \
               translate-x-[calc(var(--sfu)*55)] translate-y-[calc(var(--sfu)*5)] rotate-15 \
               transition-transform duration-[var(--duration-long)] ease-[var(--motion-steady)] \
               peer-checked:translate-0 \
               peer-checked:rotate-0 \
               p-[calc(var(--sfu)*0.75)] flex flex-col \
               oveflow-x-hidden overflow-y-scroll scrollbar-none \
            "}>
                <div class="h-full w-full relative">
                    <label
                        for="about-modal"
                        class="absolute top-0 right-0 py-[calc(var(--sfu)*0.75)] mx-[calc(var(--sfu)*0.5)] flex cursor-pointer rounded-full"
                    >
                        <div class="p-[calc(var(--sfu)*0.2)] text-[calc(var(--sfu)*0.85)] rounded-full bg-[var(--color-bg-action-surface-emphasis)]">
                            <X class=None path_class=None />
                        </div>
                        <div class="leading-none py-[calc(var(--sfu)*0.2)] px-[calc(var(--sfu)*0.4)] bg-[var(--color-bg-action-surface-emphasis)]">
                            "Close"
                        </div>
                    </label>

                    <div class="px-[calc(var(--sfu)*2)] pb-[calc(var(--sfu)*1)] border-b-[calc(var(--sfu)*0.0625)] border-[var(--color-border-action)]">
                        <div class="flex items-center w-fit py-[calc(var(--sfu)*3)]">
                            <AppIcon class=Some("text-[calc(var(--sfu)*2.5)] text-[var(--color-electric-indigo)]") path_class=None />
                            <AppNameTextSvg class=Some("text-[calc(var(--sfu)*1.5)]") path_class=None />
                        </div>
                        <h1 class="text-[calc(var(--sfu)*4.25)] pb-[calc(var(--sfu)*0.5)]">
                            "A platform By..."
                        </h1>

                        <div class="py-[calc(var(--sfu)*1.5)]">
                            <div class="w-fit flex items-center justify-center gap-[calc(var(--sfu)*1)]">
                                <div class="relative h-[calc(var(--sfu)*4.75)] w-[calc(var(--sfu)*4.75)] rounded-full overflow-hidden">
                                    <img
                                        src={images::people::portrait::FARHAN_ALI}
                                        alt="Farhan Ali"
                                        class="object-cover h-[calc(var(--sfu)*4.75)] aspect-square"
                                    />
                                </div>
                                <div class="flex flex-col leading-tight">
                                    <h2 class="text-[calc(var(--sfu)*1.25)]">"Farhan"</h2>
                                    <h2 class="text-[calc(var(--sfu)*1.25)]">"Ali"</h2>
                                </div>
                            </div>
                            
                            // Simplified SocialLinks logic for Rust
                            <SocialLinks 
                                class=Some("pt-[calc(var(--sfu)*1.5)]")
                                item_class=None
                                items={vec![
                                    SocialLinkItem {
                                        label: html! {<Tiktok class=None path_class=None /> }.into(),
                                        href: CREATOR_SOCIAL_LINKS.tiktok
                                    },
                                    SocialLinkItem {
                                        label: html! {<Twitter class=None path_class=None /> }.into(),
                                        href: CREATOR_SOCIAL_LINKS.twitter
                                    },
                                    SocialLinkItem {
                                        label: html! {<Instagram class=None path_class=None /> }.into(),
                                        href: CREATOR_SOCIAL_LINKS.instagram
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    <div class="w-full flex flex-col gap-[calc(var(--sfu)*1)]">
                        <div class="relative w-full aspect-[2/1] overflow-hidden rounded-b-full shadow-inner">
                            <img
                                src={images::maps::PAKISTAN_FOCUSED}
                                alt="Pakistan Map"
                                class="object-cover object-top w-full h-full"
                            />
                            <div class="absolute inset-0 rounded-b-full shadow-[inset_0_-20px_60px_rgba(0,0,0,0.25)] pointer-events-none" />
                        </div>

                        <p class="w-2/3 text-center mx-auto text-[calc(var(--sfu)*0.75)] py-[calc(var(--sfu)*0.75)]">
                            "Based in Pakistan, building websites with years of experience. Serving skills to thousands of clients with satisfying work."
                        </p>

                        <div class="mt-[calc(var(--sfu)*1)] px-[calc(var(--sfu)*2.5)] py-[calc(var(--sfu)*1.5)] border-t-[calc(var(--sfu)*0.0625)] border-[var(--color-border-action)] flex items-center justify-between">
                            <div class="w-1/2 flex flex-col gap-[calc(var(--sfu)*1.25)]">
                                <p class="text-[calc(var(--sfu)*4)]">"20+"</p>
                                <p>"Sites pushed live"</p>
                            </div>
                            <div class="w-1/2 flex flex-col gap-[calc(var(--sfu)*1.25)]">
                                <p class="text-[calc(var(--sfu)*4)]">"7+"</p>
                                <p>"Startup Sites"</p>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <AppNameTextSvg 
                            class=Some("footer-svg w-full h-auto overflow-visible pt-[calc(var(--sfu)*3)] \
                                [animation-range:entry_5%_entry_calc(100%+var(--sfu)*0.5)] ") 
                            path_class=Some("footer-svg-path") 
                        />
                    </div>
                </div>
            </div>


            // Overlay
            <label
                for="about-modal"
                class="h-screen w-screen z-31 fixed top-0 left-0 bg-[var(--color-bg-overlay)] \
                opacity-0 pointer-events-none cursor-pointer transition-opacity \
                duration-[var(--duration-long)] delay-75 peer-checked:opacity-100 peer-checked:pointer-events-auto"
            />
        </div>
    }
}