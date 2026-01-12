import React from "react";

type TooltipPosition = "top" | "bottom" | "left" | "right";
type TooltipVariant = "simple" | "rich";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  variant?: TooltipVariant;
  position?: TooltipPosition;
  className?: string;
}

export function Tooltip({
  content,
  children,
  title,
  icon,
  className = "",
  position = "top",
  variant = "simple",
}: TooltipProps) {
  const POSITION_CLASSES: Record<TooltipPosition, string> = {
    top: `
      bottom-full left-1/2 -translate-x-1/2 -translate-y-1/12
      mb-[calc(var(--size-fluid-unit)*0.7)]
      group-hover/t:opacity-100 group-hover/t:-translate-y-0
    `,
    bottom: `
      top-full left-1/2 -translate-x-1/2 translate-y-1/12
      mt-[calc(var(--size-fluid-unit)*0.7)]
      group-hover/t:opacity-100 group-hover/t:translate-y-0
    `,
    left: `
      right-full top-1/2 -translate-y-1/2 -translate-x-1/12
      mr-[calc(var(--size-fluid-unit)*0.7)]
      group-hover/t:opacity-100 group-hover/t:-translate-x-0
    `,
    right: `
      left-full top-1/2 -translate-y-1/2 translate-x-1/12
      ml-[calc(var(--size-fluid-unit)*0.7)]
      group-hover/t:opacity-100 group-hover/t:translate-x-0
    `,
  };

  const VARIANT_STYLES: Record<TooltipVariant, string> = {
    simple: `
      px-[calc(var(--size-fluid-unit)*0.46)]
      py-[calc(var(--size-fluid-unit)*0.23)]
      rounded-[calc(var(--size-fluid-unit)*0.23)]
      whitespace-nowrap
      text-[calc(var(--sfu)*0.81)]
      font-medium
    `,
    rich: `
      p-[calc(var(--size-fluid-unit)*1.16)]
      w-[calc(var(--size-fluid-unit)*16.7)]
      rounded-[calc(var(--size-fluid-unit)*0.46)]
      whitespace-normal
      text-left
      shadow-xl
      border-[calc(var(--sfu)*0.058)]
      border-white/5
    `,
  };

  const ARROW_CLASSES: Record<TooltipPosition, string> = {
    top: `
      bottom-[-0.5rem] left-1/2 -translate-x-1/2
      border-l-[0.5rem] border-r-[0.5rem] border-t-[0.5rem]
      border-l-transparent border-r-transparent
      border-t-[var(--color-bg-contrast)]
    `,
    bottom: `
      top-[-0.5rem] left-1/2 -translate-x-1/2
      border-l-[0.5rem] border-r-[0.5rem] border-b-[0.5rem]
      border-l-transparent border-r-transparent
      border-b-[var(--color-bg-contrast)]
    `,
    left: `
      right-[-0.5rem] top-1/2 -translate-y-1/2
      border-t-[0.5rem] border-b-[0.5rem] border-l-[0.5rem]
      border-t-transparent border-b-transparent
      border-l-[var(--color-bg-contrast)]
    `,
    right: `
      left-[-0.5rem] top-1/2 -translate-y-1/2
      border-t-[0.5rem] border-b-[0.5rem] border-r-[0.5rem]
      border-t-transparent border-b-transparent
      border-r-[var(--color-bg-contrast)]
    `,
  };

  return (
    <div className="relative inline-block group/t">
      {children}

      <div
        role="tooltip"
        className={`
          absolute opacity-0 pointer-events-none z-50
          bg-[var(--color-bg-contrast)]
          text-[var(--color-text-contrast)]
          transition-all duration-[var(--duration-short)]
          ease-[var(--motion-steady)]
          ${POSITION_CLASSES[position]}
          ${VARIANT_STYLES[variant]}
          ${className}
        `}
      >
        {/* Arrow (rich only, outside container but attached) */}
        {variant === "rich" && (
          <span
            aria-hidden
            className={`
              absolute w-0 h-0
              ${ARROW_CLASSES[position]}
            `}
          />
        )}

        {variant === "simple" ? (
          <span>{content}</span>
        ) : (
          <div className="flex flex-col gap-[calc(var(--size-fluid-unit)*0.46)]">
            {(title || icon) && (
              <div className="flex items-center gap-[calc(var(--size-fluid-unit)*0.46)]">
                {icon && (
                  <span className="text-[calc(var(--sfu)*1.16)] opacity-90 shrink-0">
                    {icon}
                  </span>
                )}
                {title && (
                  <h4 className="font-bold text-[calc(var(--sfu)*0.93)] leading-none">
                    {title}
                  </h4>
                )}
              </div>
            )}

            <div className="text-[calc(var(--sfu)*0.81)] opacity-85 font-normal">
              {content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}