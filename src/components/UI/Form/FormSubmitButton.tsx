import { ButtonHTMLAttributes, ReactNode } from "react";

export interface FormSubmitButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  id?: string;
}

export function FormSubmitButton({
  children,
  id = "form-submit-button",
  ...props
}: FormSubmitButtonProps) {
  return (
    <button
      id={id}
      type="submit"
      data-state="idle"
      className="
        group relative flex items-center justify-center 
        py-[calc(var(--sfu)*0.65)] px-[calc(var(--sfu)*0.9)]
        leading-[calc(var(--sfu)*1.5)]
        rounded-[calc(var(--sfu)*0.25)] 
        text-[var(--color-text-action)] 
        bg-[var(--color-bg-action)]
        w-full transition-all duration-200
        focus:outline-none cursor-pointer
        disabled:cursor-not-allowed disabled:opacity-85
      "
      {...props}
    >
      <span className="transition-opacity duration-200 opacity-100 group-data-[state=loading]:opacity-0">
        {children}
      </span>
      <svg
        className="
          absolute left-1/2 top-1/2 
          -translate-x-1/2 -translate-y-1/2
          w-[calc(var(--sfu)*1.25)] 
          h-[calc(var(--sfu)*1.25)]
          opacity-0 group-data-[state=loading]:opacity-100
          transition-opacity duration-200
          animate-spin
        "
        viewBox="0 0 50 50"
      >
        <circle
          className="animate-google-dash"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
          stroke="var(--color-text-action)"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
