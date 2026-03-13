use rscx::{component, html, props};

#[props]
pub struct FormErrorProps {}

#[component]
pub fn FormError(_props: FormErrorProps) -> String {
    html! {
        <div 
            data-form-error
            class="hidden data-[state=show]:block py-[calc(var(--sfu)*0.75)] \
                   px-[calc(var(--sfu)*1)] text-[calc(var(--sfu)*1)] \
                   rounded-[calc(var(--sfu)*0.25)] bg-[var(--color-electric-red)] \
                   text-[var(--color-text-action)] w-full"
        >
            // Error
        </div>
    }
}