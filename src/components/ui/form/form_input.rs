use rscx::{component, html, props};

#[derive(Default)]
#[props]
pub struct FormInputProps {
    pub name: Option<&'static str>,
    pub input_type: Option<&'static str>,
    pub placeholder: Option<&'static str>,
    pub class: Option<&'static str>,
    pub label: Option<&'static str>,
    pub required: Option<bool>,
    pub enable_error: Option<bool>,
    pub border: Option<bool>,
    pub interactive: Option<bool>,
    pub min_length: Option<u32>,
    pub max_length: Option<u32>
}

#[component]
pub fn FormInput(props: FormInputProps) -> String {
    html! {
        <div 
            data-input={props.name.unwrap_or("input")} 
            class={
                if props.enable_error.unwrap_or(false) { 
                    "w-full flex flex-col gap-[calc(var(--sfu)*0.5)] group" 
                } else { 
                    "w-full flex flex-col gap-[calc(var(--sfu)*0.5)]" 
                }
            }
        >
            {
                if let Some(label_text) = props.label {
                    html! {
                        <label 
                            for={props.name.unwrap_or("input")} 
                            class="text-[calc(var(--sfu)*0.65)] leading-[calc(var(--sfu)*1)] uppercase"
                        >
                            {label_text}
                        </label>
                    }
                } else {
                    "".into()
                }
            }

            <input
                type={props.input_type.unwrap_or("text")}
                name={props.name.unwrap_or("input")}
                placeholder={props.placeholder.unwrap_or("")}
                required={props.required.unwrap_or(false)}
                min_length={props.min_length.unwrap_or(3)}
                max_length={props.max_length.unwrap_or(60)}
                class={
                    [
                        "py-[calc(var(--sfu)*0.65)] px-[calc(var(--sfu)*0.9)] \
                        leading-[calc(var(--sfu)*1.25)] rounded-[calc(var(--sfu)*0.25)] \
                        bg-[var(--color-bg-input)] placeholder-[var(--color-text-placeholder)] \
                        border-[calc(var(--sfu)*0.0625)] focus:outline-none w-full \
                        focus:border-[var(--color-border-emphasis)]",
                        
                        if props.border.unwrap_or(true) { "border-[var(--color-border-surface)]" } else { "border-transparent" },
                        if props.interactive.unwrap_or(true) { "hover:border-[var(--color-border-surface)]" } else { "" },
                        if props.enable_error.unwrap_or(false) { "group-data-error:!border-[var(--color-electric-red)]" } else { "" },
                        props.class.unwrap_or("")
                    ].join(" ")
                }
            />

            {
                if props.enable_error.unwrap_or(false) {
                    html! {
                        <div class="hidden group-data-error:flex gap-[calc(var(--sfu)*0.5)] items-center text-[calc(var(--sfu)*0.75)] text-[var(--color-electric-red)]">
                            
                            <span data-input-error={props.name.unwrap_or("input")} class="leading-[calc(var(--sfu)*1)]">
                                "Error message goes here"
                            </span>
                        </div>
                    }
                } else {
                    "".into()
                }
            }
        </div>
    }
}