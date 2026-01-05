import { InputHTMLAttributes } from "react";
import { FiAlertCircle } from "react-icons/fi";

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  className?: string;
  label?: string;
  required?: boolean;
  enableError?: boolean;
  border?: boolean;
}

const FormInput = ({
  name,
  placeholder,
  className,
  label,
  enableError = false,
  required = true,
  border = true,
  ...props
}: FormInputProps) => {
  return (
    <div
      data-input={name}
      className={`flex flex-col gap-[calc(var(--sfu)*0.5)] ${
        enableError ? "group" : ""
      }`}
    >
      {label && (
        <label
          htmlFor={name}
          className="text-[calc(var(--sfu)*0.75)] leading-[calc(var(--sfu)*1)]  uppercase"
        >
          {label}
        </label>
      )}

      <input
        {...props}
        placeholder={placeholder}
        name={name}
        className={`py-[calc(var(--sfu)*0.75)] px-[calc(var(--sfu)*1)] leading-[calc(var(--sfu)*1.25)] rounded-[calc(var(--sfu)*0.25)]
        bg-[var(--color-bg-input)]
        focus:outline-none w-full border-[var(--color-border-surface)] focus:border-[var(--color-border-active)]  ${border && `border`}
        ${enableError && "group-data-error:!border-[var(--color-electric-red)]"}
        ${className}`}
        required={required}
      />

      {enableError && (
        <>
          <div className="hidden group-data-error:flex gap-[calc(var(--sfu)*0.5)] items-center text-[calc(var(--sfu)*0.75)] text-[var(--color-electric-red)]">
            <FiAlertCircle className="text-[calc(var(--sfu)*0.85)]" />
            <span
              data-input-error={name}
              className=" leading-[calc(var(--sfu)*1)] "
            >
              Error message goes here
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default FormInput;
