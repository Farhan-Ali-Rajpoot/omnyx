export function FormError() {
    return(
        <div 
            data-form-error
            className="hidden data-[state=show]:block py-[calc(var(--sfu)*0.75)] px-[calc(var(--sfu)*1)] text-[calc(var(--sfu)*1)] 
                rounded-[calc(var(--sfu)*0.25)] bg-[var(--color-electric-red)] 
                text-[var(--color-text-action)] 
                w-full">
            {/* {error} */}
        </div>
    )
}

interface FormErrorProps {
  error?: string;
  state?: boolean;
}

const ShowFormError = ({ error, state }: FormErrorProps) => {
  const errorElement = document.getElementById('form-error-element');
  if (!errorElement) return;

  if (state || error) {
    errorElement.setAttribute('data-open', '');
    errorElement.textContent = error || "An error occurred";
  } else {
    errorElement.removeAttribute('data-open');
  }
};

export default ShowFormError;