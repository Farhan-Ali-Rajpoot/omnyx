use rscx::{component, html, props};

pub enum FormSubmitButtonState {
    Idle,
    Loading,
}

#[props]
pub struct FormSubmitButtonProps {
    pub children: &'static str,
    pub id: &'static str,
    pub state: FormSubmitButtonState,
    pub class: Option<&'static str>
}

#[component]
pub fn FormSubmitButton(props: FormSubmitButtonProps) -> String {
    let state_str = match props.state {
        FormSubmitButtonState::Idle => "idle",
        FormSubmitButtonState::Loading => "loading",
    };

    html! {
        <button
            id={props.id}
            type="submit"
            data-state={state_str}
            class={["group relative flex items-center justify-center \
                   py-[calc(var(--sfu)*0.65)] px-[calc(var(--sfu)*0.9)] \
                   leading-[calc(var(--sfu)*1.5)] \
                   rounded-[calc(var(--sfu)*0.25)] \
                   text-[var(--color-text-action)] \
                   bg-[var(--color-bg-action)] \
                   w-full transition-all duration-200 \
                   focus:outline-none cursor-pointer \
                   disabled:cursor-not-allowed disabled:opacity-85",
                   props.class.unwrap_or("")].join(" ")
                }
        >
            <span class="transition-opacity duration-200 opacity-100 group-data-[state=loading]:opacity-0">
                {props.children}
            </span>

            <svg
                
                class="absolute left-1/2 top-1/2 \
                       -translate-x-1/2 -translate-y-1/2 \
                       w-[calc(var(--sfu)*1.25)] \
                       h-[calc(var(--sfu)*1.25)] \
                       opacity-0 group-data-[state=loading]:opacity-100 \
                       transition-opacity duration-200 \
                       animate-spin"
                viewBox="0 0 50 50"
            >
                <circle
                    class="animate-google-dash"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke-width="5"
                    stroke="var(--color-text-action)"
                    stroke-linecap="round"
                />
            </svg>
        </button>
    }
}