import { InputHTMLAttributes } from "react";
import { FiCheck } from "react-icons/fi";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: "small" | "medium",
  border?: boolean,
}

const sizeStyles = {
  small: {
    divStyles: "w-[calc(var(--sfu)*1.25)] h-[calc(var(--sfu)*1.25)]",
    iconStyles: "text-[calc(var(--sfu)*0.7)]",
  },
  medium: {
    divStyles: "w-[calc(var(--sfu)*1.75)] h-[calc(var(--sfu)*1.75)]",
    iconStyles: "text-[calc(var(--sfu)*1)]",
  },
};

export function Checkbox({ size = "small", border = true, ...props }: CheckboxProps) {
  const { divStyles, iconStyles } = sizeStyles[size];
  return (
    <label className="relative inline-flex items-center cursor-pointer rounded-full">
      {/* Hidden native checkbox */}
      <input type="checkbox" {...props} className="sr-only peer" />

      {/* Circle */}
      <div
        className={`group
          rounded-full
          bg-[var(--color-bg-app)]
          peer-checked:bg-[var(--color-electric-indigo)]
          flex items-center justify-center
          flex-shrink-0
          relative
          border-[calc(var(--sfu)*0.0625)] ${border ? `border-[var(--color-border-surface)]` : `border-transparent not-peer-checked:hover:border-[var(--color-border-surface)]`}
          ${divStyles}
        `}
      >
        {/* Check icon centered */}
        <FiCheck
          className={`hidden group-peer-checked:block text-[var(--color-text-contrast)] ${iconStyles}`}
        />
      </div>
    </label>
  );
}
