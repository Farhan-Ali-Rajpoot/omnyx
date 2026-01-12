import { ComponentProps, HTMLProps, ReactNode } from "react";
import Link, { LinkProps } from "next/link";

export interface UnderlineLinkProps extends LinkProps {
  children: ReactNode;
  href: LinkProps["href"];
  className?: ComponentProps<"div">["className"];
  variant?: "persistent" | "hover-only";
  lineClassName?: ComponentProps<"div">["className"];
}

export function UnderlineLink({
  children,
  href,
  className = "",
  lineClassName = "bg-[var(--color-text-base)]",
  variant = "hover-only",
  ...props
}: UnderlineLinkProps) {
  
  return (
    <Link href={href} {...props} className={`group/l ${className}`}>
      <div className={`w-fit relative overflow-hidden leading-tight`}>
        {children}

        {variant === "persistent" && (
          <>
            <div
              className={`absolute bottom-0 left-0 w-full h-[calc(var(--sfu)*0.0625)] transition-transform duration-[var(--duration-long)] ease-[var(--motion-steady)]
                ${lineClassName} group-hover/l:scale-x-0 origin-left group-hover/l:origin-right `}
            />
            <div
              className={`absolute bottom-0 right-0 w-full h-[calc(var(--sfu)*0.0625)] transition-transform duration-[var(--duration-long)] delay-[var(--delay-long)] 
            ease-[var(--motion-steady)] ${lineClassName} scale-x-0 group-hover/l:scale-x-100 origin-left group-hover/l:origin-left`}
            />
          </>
        )}

        {variant === "hover-only" && (
          <div
            className={`w-full h-[calc(var(--sfu)*0.0625)] ${lineClassName}
            transition-transform duration-[var(--duration-long)] ease-[var(--motion-steady)]
            scale-x-0 origin-right group-hover/l:origin-left group-hover/l:scale-x-100`}
          />
        )}
      </div>
    </Link>
  );
}

interface UnderlineItemProps
  extends HTMLProps<HTMLDivElement>,
          Pick<UnderlineLinkProps, "lineClassName" | "variant"> {
  children: React.ReactNode;
}

export function UnderlineItem({
  children,
  variant = "hover-only",
  lineClassName = "bg-[var(--color-text-base)]",
  className = "",
  ...props
}: UnderlineItemProps)  {
  const lineBase =
    "absolute bottom-0 left-0 w-full h-[calc(var(--sfu)*0.0625)] pointer-events-none";

  return (
    <div className={`relative overflow-hidden leading-tight cursor-pointer group/l ${className}`} {...props}>
      {children}
      {variant === "persistent" ? (
        <div className={lineBase}>
          <div
            className={`absolute inset-0 ${lineClassName} transition-transform duration-[var(--duration-long)] ease-[var(--motion-steady)] origin-left group-hover/l:scale-x-0 group-hover/l:origin-right`}
          />
          <div
            className={`absolute inset-0 ${lineClassName} transition-transform duration-[var(--duration-long)] delay-[var(--delay-long)] ease-[var(--motion-steady)] scale-x-0 origin-left group-hover/l:scale-x-100`}
          />
        </div>
      ) : (
        <div
          className={`${lineBase} ${lineClassName} transition-transform duration-[var(--duration-long)] ease-[var(--motion-steady)] scale-x-0 origin-right group-hover/l:origin-left group-hover/l:scale-x-100`}
        />
      )}
    </div>
  );
}
