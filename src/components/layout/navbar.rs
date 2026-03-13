use rscx::{component, html, props};
use crate::config::{
    icons::{
        AppNameTextSvg,
        CustomIconProps,
    },
    routes::{frontend},
};
use crate::components::{
    ui::{
        Button, ButtonProps, ButtonShape,
    },
};
use std::{borrow::Cow};

pub struct User {
    pub name: Option<String>,
    pub picture: Option<String>,
}

pub struct NavLink {
    pub name: &'static str,
    pub link: &'static str,
}

const NAV_LINKS: &[NavLink] = &[
    NavLink { name: "Home", link: frontend::HOME },
    NavLink { name: "Page1", link:  "/page1" },
    NavLink { name: "Page2", link: "/page2" },
    NavLink { name: "Page3", link: "/page3" },
];

const ABOUT_LINKS: &[NavLink] = &[
    NavLink { name: "About", link: frontend::HOME },
    NavLink { name: "Contact", link: frontend::help::CONTACT },
];

#[props]
pub struct NavbarProps {
    pub class: Option<Cow<'static, str>>,
    pub user: Option<User>, // passed in to handle auth state
}

#[component]
pub async fn Navbar(props: NavbarProps) -> String {

    let auth = match props.user {
        Some(u) => html! {
            <a href="/app/account" class="\
                flex items-center justify-center rounded-full relative \
                h-[calc(var(--sfu)*2.25)] w-[calc(var(--sfu)*2.25)] \
                sm:h-[calc(var(--sfu)*2.5)] sm:w-[calc(var(--sfu)*2.5)] mr-[calc(var(--sfu)*0.25)] \
            ">
                {
                    if let Some(pic) = &u.picture {
                        html! { <img class="rounded-full object-cover w-full h-full" src={pic} alt="User" /> }
                    } else {
                        html! { <div class="text-[var(--color-text-action)]">"User"</div> }
                    }
                }
            </a>
        },
        None => html! {
            <div class="flex gap-[calc(var(--sfu)*0.25)]">
                {
                    Button(ButtonProps { 
                        children: "Login".into(), 
                        href: Some(frontend::auth::login::BASE), 
                        shape: Some(ButtonShape::Rounded), 
                        button_type: None,
                        class: Some("bg-[var(--color-bg-action-secondary)] text-[var(--color-text-contrast)]")
                    }).await
                }
                {
                    Button(ButtonProps { 
                        children: "Join".into(), 
                        href: Some(frontend::auth::register::BASE), 
                        shape: Some(ButtonShape::Box), 
                        button_type: None,
                        class: Some("bg-[var(--color-electric-lime)] text-[var(--color-bg-action)]")
                    }).await
                }
            </div>
        }
    };

    
    html! {
        <div id="navbar" class={["relative mx-auto", props.class.as_deref().unwrap_or("")].join(" ")}>
            <input type="checkbox" id="nav-toggle" class="peer hidden" />

            <nav class="\
                fixed inset-x-0 top-0 z-30 mx-auto \
                mt-[calc(var(--sfu)*0.5)] sm:mt-[calc(var(--sfu)*1)] \
                max-w-[calc(100vw-var(--sfu))] sm:max-w-[calc(var(--sfu)*35)] \
                flex flex-col rounded-[calc(var(--sfu)*0.25)] \
                bg-[var(--color-bg-action-surface)] \
                border border-[var(--color-border-action)] \
                p-[calc(var(--sfu)*0.5)] sm:p-[calc(var(--sfu)*0.25)] \
                transition-all duration-[var(--duration-long)] ease-[var(--motion-steady)] \
                max-h-[calc(var(--sfu)*5)] \
                overflow-hidden scrollbar-none \
                peer-checked:max-h-full \
                peer-checked:max-w-full \
                peer-checked:mt-0 \
                peer-checked:p-[calc(var(--sfu)*1)] \
                peer-checked:overflow-y-scroll \
                \
                sm:delay-[var(--delay-long)] \
                sm:peer-checked:max-h-[calc(100vh-calc(var(--sfu)*2))] \
                sm:peer-checked:max-w-[calc(100vw-calc(var(--sfu)*2))] \
                sm:peer-checked:mt-[calc(var(--sfu)*1)] \
                sm:peer-checked:p-[calc(var(--sfu)*0.25)] \
                sm:peer-checked:delay-75 \
                sm:peer-checked:overflow-hidden \
                \
                peer-checked:[&_.expandable-content]:delay-[var(--delay-medium)] \
                sm:peer-checked:[&_.expandable-content]:delay-[var(--delay-long)] \
                peer-checked:[&_.expandable-content]:max-h-[calc(var(--sfu)*80)] \
                peer-checked:[&_.expandable-divider]:scale-x-100 \
                peer-checked:[&_.expandable-divider]:delay-[var(--delay-long)] \
                peer-checked:[&_.nav-card]:translate-y-0 \
                peer-checked:[&_.nav-card]:delay-[var(--delay-medium)] \
                sm:peer-checked:[&_.nav-card]:delay-[var(--delay-long)] \
                peer-checked:[&_.ham-wrapper]:gap-[calc(var(--sfu)*0.125)] \
                peer-checked:[&_.ham-line-1]:translate-y-[calc(var(--sfu)*0.21)] \
                peer-checked:[&_.ham-line-1]:scale-x-70 \
                peer-checked:[&_.ham-line-1]:rotate-45 \
                sm:peer-checked:[&_.ham-line-1]:translate-y-[calc(var(--sfu)*0.15)] \
                peer-checked:[&_.ham-line-2]:-translate-y-[calc(var(--sfu)*0.19)] \
                peer-checked:[&_.ham-line-2]:scale-x-70 \
                peer-checked:[&_.ham-line-2]:-rotate-45 \
                sm:peer-checked:[&_.ham-line-2]:-translate-y-[calc(var(--sfu)*0.15)] \
                peer-checked:[&_.text-slider]:-translate-y-full \
                peer-checked:[&_.text-close]:translate-y-0 \
            ">
                <div class="flex h-full w-full items-center justify-between shrink-0">
                    <label for="nav-toggle" class="cursor-pointer select-none z-30">
                        <div class="\
                            ham-wrapper group cursor-pointer flex items-center justify-center \
                            gap-[calc(var(--sfu)*0.625)] rounded-[calc(var(--sfu)*0.25)] \
                            py-[calc(var(--sfu)*0.4)] px-[calc(var(--sfu)*0.9)] \
                            hover:bg-[var(--color-bg-action-emphasis)] transition-all duration-600 \
                        ">
                            <div class="flex flex-col gap-1.5 sm:gap-[0.3vw] 3xl:!gap-[5.76px]">
                                <div class="\
                                    ham-line-1 h-[calc(var(--sfu)*0.1)] w-[calc(var(--sfu)*1.5)] bg-[var(--color-text-action)] \
                                    rounded-full transition-transform duration-[var(--duration-long)] \
                                    ease-[var(--motion-steady)] origin-center \
                                " />
                                <div class="\
                                    ham-line-2 h-[calc(var(--sfu)*0.1)] w-[calc(var(--sfu)*1.5)] bg-[var(--color-text-action)] \
                                    rounded-full transition-transform duration-[var(--duration-long)] \
                                    ease-[var(--motion-steady)] origin-center \
                                " />
                            </div>

                            <div class="relative overflow-hidden text-[var(--color-text-action)]">
                                <p class="text-slider transition-transform duration-[var(--duration-long)] ease-[var(--motion-steady)]">
                                    "Menu"
                                </p>
                                <p class="\
                                    text-close absolute inset-0 transition-transform \
                                    duration-[var(--duration-long)] ease-[var(--ease-steady)] translate-y-full \
                                ">
                                    "Close"
                                </p>
                            </div>
                        </div>
                    </label>

                    <a href={frontend::HOME} class="text-[calc(var(--sfu)*1.25)] text-[var(--color-text-action)]">
                        {AppNameTextSvg(CustomIconProps::default()).await}
                    </a>

                    {auth}
                </div>

                <div class="\
                    expandable-content transition-[max-height,margin] \
                    duration-[var(--duration-long)] ease-[var(--motion-steady)] \
                    max-h-0 h-full \
                ">
                    <div class="\
                        expandable-divider w-full transition-all duration-600 ease-steady \
                        h-[calc(var(--sfu)*0.0625)] mt-[calc(var(--sfu)*1.25)] sm:mt-[calc(var(--sfu)*0.25)] \
                        scale-x-0 bg-[var(--color-border-action)] \
                    " />

                    <div class="\
                        flex flex-col h-fit sm:flex-row w-full pt-[calc(var(--sfu)*1.5)] \
                        sm:p-[calc(var(--sfu)*1)] gap-[calc(var(--sfu)*1)] \
                        sm:gap-[calc(var(--sfu)*1.25)] text-[var(--color-text-action)] \
                    ">
                        { render_nav_card_wrapper(0, html! { <CardA /> }) }
                        { render_nav_card_wrapper(1, html! { <CardB /> }) }
                        { render_nav_card_wrapper(2, html! { <CardC /> }) }
                    </div>
                </div>
            </nav>

            <label for="nav-toggle" class="\
                h-screen w-screen z-29 fixed top-0 left-0 \
                bg-[var(--color-bg-overlay)] opacity-0 pointer-events-none \
                cursor-pointer transition-opacity duration-[var(--duration-long)] delay-75 \
                peer-checked:opacity-100 peer-checked:pointer-events-auto \
            " />
        </div>
    }
}



fn render_nav_card_wrapper(i: usize, content: String) -> String {
    let index = i + 1;
    let rev_index = 3 + 1 - index;
    let bg_color = if i % 2 == 0 { "bg-[var(--color-bg-action-surface-emphasis)]" } else { "" };
    let style = format!("--i: {}; --r-i: {};", index, rev_index);

    html! {
        <div 
            style={style}
            class={[
                "\
                nav-card relative w-full rounded-[calc(var(--sfu)*1)] overflow-hidden \
                transition-transform duration-[var(--duration-long)] ease-[var(--motion-steady)] \
                transform translate-y-[calc(var(--sfu)*6)] \
                peer-checked:translate-y-0 \
                peer-checked:delay-[calc(var(--r-i)*50ms)] \
                delay-[calc(var(--i)*50ms)] p-[calc(var(--sfu)*2.25)]\
                ", 
                bg_color
            ].join(" ")}
        >
            {content}
        </div>
    }
}

#[component]
fn CardA() -> String {
    html! {
        <div class="h-full flex flex-col justify-between">
            <div>
                <p class="text-[calc(var(--sfu)*0.6125)] uppercase \
                 text-[var(--color-text-secondary)] mb-[calc(var(--sfu)*0.75)] sm:mb-[calc(var(--sfu)*1.25)]">
                    "Navigation"
                </p>
                <div class="flex flex-col">
                    {
                        NAV_LINKS.iter().enumerate().map(|(i, l)| {
                            let border_cls = if i != 0 { "border-t-[calc(var(--sfu)*0.1)]" } else { "" };
                            html! {
                                <label for="nav-toggle">
                                    <a 
                                        data-target-checkbox-id="nav-toggle"
                                        href={l.link}
                                        class={format!("w-full text-[calc(var(--sfu)*1.25)] text-[var(--color-text-action)] \
                                         py-[calc(var(--sfu)*0.75)] {} border-[var(--color-border-action)] block", border_cls)}
                                    >
                                        {l.name}
                                    </a>
                                </label>
                            }
                        }).collect::<String>()
                    }
                </div>
            </div>
        </div>
    }
}

#[component]
fn CardB() -> String {
    html! {
        <div class="h-full flex flex-col justify-between">
            <div>
                <p class="text-[calc(var(--sfu)*0.6125)] uppercase text-[var(--color-text-secondary)] mb-[calc(var(--sfu)*0.75)] sm:mb-[calc(var(--sfu)*1.25)]">
                    "About"
                </p>
                <div class="flex flex-col gap-[calc(var(--sfu)*0.2)]">
                     {
                        ABOUT_LINKS.iter().enumerate().map(|(i, l)| {
                            let border_cls = if i != 0 { "border-t-[calc(var(--sfu)*0.1)]" } else { "" };
                            html! {
                                <label for="nav-toggle">
                                    <a 
                                        data-target-checkbox-id="nav-toggle"
                                        href={l.link}
                                        class={format!("w-full text-[calc(var(--sfu)*1.25)] text-[var(--color-text-action)] \
                                         py-[calc(var(--sfu)*0.75)] {} border-[var(--color-border-action)] block", border_cls)}
                                    >
                                        {l.name}
                                    </a>
                                </label>
                            }
                        }).collect::<String>()
                    }
                </div>
            </div>
        </div>
    }
}

#[component]
fn CardC() -> String {
    // Note: Icons are placeholders (divs) here. Replace with <svg> or your icon components.
    html! {
        <a 
            target="_blank"
            href="https://github.com/your-repo"
            class="w-full hidden md:flex flex-col items-center justify-center text-center group/card"
        >
            <div class="flex gap-[calc(var(--sfu)*0.5)] mb-[calc(var(--sfu)*1.5)]">
                <div class="text-[calc(var(--sfu)*0.875)] rounded-md py-[calc(var(--sfu)*0.25)] px-[calc(var(--sfu)*0.75)] bg-neutral-800 font-medium border border-neutral-700/50 text-white">
                    "Github"
                </div>
                <div class="text-[calc(var(--sfu)*0.875)] rounded-md py-[calc(var(--sfu)*0.25)] px-[calc(var(--sfu)*0.75)] bg-neutral-200 text-neutral-900 font-bold">
                    "App"
                </div>
            </div>

            <p class="text-[calc(var(--sfu)*1.75)] sm:text-[calc(var(--sfu)*1.5)] font-bold mb-[calc(var(--sfu)*2)] leading-tight text-neutral-200 group-hover/card:text-white transition-colors">
                "Building next level projects"
            </p>

            <div class="flex gap-[calc(var(--sfu)*1)]">
               <div class="h-[calc(var(--sfu)*2.5)] w-[calc(var(--sfu)*2.5)] text-neutral-400 bg-gray-500 rounded-full"></div>
            </div>

            <p class="mt-[calc(var(--sfu)*2)] text-[calc(var(--sfu)*0.875)] text-neutral-500 group-hover/card:text-neutral-400 transition-colors">
                "Check out the source code ->"
            </p>
        </a>
    }
}