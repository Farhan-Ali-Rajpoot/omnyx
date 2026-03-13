use rscx::{component, html, props};

pub enum UnderlineVariant {
    Persistent,
    HoverOnly,
}

#[props]
pub struct UnderlineItemProps {
    pub children: &'static str,
    pub variant: Option<UnderlineVariant>,
    pub class: Option<&'static str>,
    pub line_class: Option<&'static str>,
}

#[props]
pub struct UnderlineAProps {
    pub href: &'static str,
    pub children: &'static str,
    pub variant: Option<UnderlineVariant>,
    pub class: Option<&'static str>,
    pub line_class: Option<&'static str>,
}


#[component]
pub fn UnderlineA(props: UnderlineAProps) -> String {
    let line_base = "absolute bottom-0 w-full h-[calc(var(--sfu)*0.0625)] \
                     transition-transform duration-[var(--duration-long)] \
                     ease-[var(--motion-steady)]";

    html! {
        <a href={props.href} class={["group/l", props.class.unwrap_or("")].join(" ")}>
            <div class="w-fit relative overflow-hidden leading-tight">
                {props.children}

                {match props.variant.unwrap_or(UnderlineVariant::HoverOnly) {
                    UnderlineVariant::Persistent => html! {
                        <>
                            <div class={
                                [line_base, props.line_class.unwrap_or("bg-[var(--color-bg-contrast)]"), 
                                "left-0 group-hover/l:scale-x-0 origin-left group-hover/l:origin-right"].join(" ")
                            } />
                            <div class={
                                [line_base, props.line_class.unwrap_or("bg-[var(--color-bg-contrast)]"), 
                                "right-0 delay-[var(--delay-long)] scale-x-0 group-hover/l:scale-x-100 origin-left"].join(" ")
                            } />
                        </>
                    },
                    UnderlineVariant::HoverOnly => html! {
                        <div class={
                            [line_base, props.line_class.unwrap_or("bg-[var(--color-bg-contrast)]"), 
                            "scale-x-0 origin-right group-hover/l:origin-left group-hover/l:scale-x-100"].join(" ")
                        } />
                    }
                }}
            </div>
        </a>
    }
}


#[component]
pub fn UnderlineItem(props: UnderlineItemProps) -> String {
    let line_container = "absolute bottom-0 left-0 w-full h-[calc(var(--sfu)*0.0625)] pointer-events-none";
    let motion_base = "transition-transform duration-[var(--duration-long)] ease-[var(--motion-steady)]";

    html! {
        <div class={["relative overflow-hidden leading-tight cursor-pointer group/l", props.class.unwrap_or("")].join(" ")}>
            {props.children}
            
            {match props.variant.unwrap_or(UnderlineVariant::HoverOnly) {
                UnderlineVariant::Persistent => html! {
                    <div class={line_container}>
                        <div class={
                            ["absolute inset-0", props.line_class.unwrap_or("bg-[var(--color-bg-contrast)]"), motion_base, 
                            "origin-left group-hover/l:scale-x-0 group-hover/l:origin-right"].join(" ")
                        } />
                        <div class={
                            ["absolute inset-0", props.line_class.unwrap_or("bg-[var(--color-bg-contrast)]"), motion_base, 
                            "delay-[var(--delay-long)] scale-x-0 origin-left group-hover/l:scale-x-100"].join(" ")
                        } />
                    </div>
                },
                UnderlineVariant::HoverOnly => html! {
                    <div class={
                        [line_container, props.line_class.unwrap_or("bg-[var(--color-bg-contrast)]"), motion_base, 
                        "scale-x-0 origin-right group-hover/l:origin-left group-hover/l:scale-x-100"].join(" ")
                    } />
                }
            }}
        </div>
    }
}