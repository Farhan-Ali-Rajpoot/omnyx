import { ComponentProps, HTMLProps, ReactNode } from "react";

interface SectionProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  className: ComponentProps<"div">["className"];
}

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <>
      <section
        {...props}
        className={`relative px-[calc(var(--sfu)*1.5)] w-full overflow-x-hidden
        ${className}`}
      >
        <div className="mx-auto max-w-[var(--size-container-max)]">
          {children}
        </div>
      </section>
    </>
  );
}
