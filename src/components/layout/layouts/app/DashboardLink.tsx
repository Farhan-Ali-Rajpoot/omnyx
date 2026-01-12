import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { IconType } from "react-icons";

export type NavItemColor =
  | "blue"
  | "violet"
  | "emerald"
  | "amber"
  | "rose"
  | "cyan"
  | "lime"
  | "fuchsia"
  | "orange"
  | "sky"
  | "muted";

// Map color → Tailwind active icon class
const ICON_COLOR_CLASSES: Record<NavItemColor, string> = {
  blue: "group-data-active:text-[var(--color-icon-blue)]",
  violet: "group-data-active:text-[var(--color-icon-violet)]",
  emerald: "group-data-active:text-[var(--color-icon-emerald)]",
  amber: "group-data-active:text-[var(--color-icon-amber)]",
  rose: "group-data-active:text-[var(--color-icon-rose)]",
  cyan: "group-data-active:text-[var(--color-icon-cyan)]",
  lime: "group-data-active:text-[var(--color-icon-lime)]",
  fuchsia: "group-data-active:text-[var(--color-icon-fuchsia)]",
  orange: "group-data-active:text-[var(--color-icon-orange)]",
  sky: "group-data-active:text-[var(--color-icon-sky)]",
  muted: "",
};

export const renderIcon = (ic?: ReactNode | IconType) => {
  if (!ic) return null;
  if (typeof ic === "function") {
    const IconComp = ic;
    return <IconComp strokeWidth={1.5} />;
  }
  return ic;
};

export interface NavItemProps {
  label: string;
  href?: string;
  icon?: ReactNode | IconType;
  color?: NavItemColor;
  className?: string;
  style?: React.CSSProperties;
  items?: Array<{
    active?: boolean;
    color?: NavItemColor;
    label: string;
    href: string;
    icon?: ReactNode | IconType;
  }>;
}

export type DashboardLinkProps = Omit<NavItemProps, "items"> &
  Pick<NavItemProps, "href"> &
  Omit<LinkProps, "href">;

export function DashboardLink({
  label,
  href,
  icon,
  color = "muted",
  className = "",
  style,
  ...props
}: DashboardLinkProps) {
  const iconColorClass = ICON_COLOR_CLASSES[color] || "";

  return (
    <Link
      {...props}
      href={href!}
      style={style}
      className={`
        group flex w-full items-center 
        py-[calc(var(--sfu)*0.65)] px-[calc(var(--sfu)*0.74)] rounded-[calc(var(--sfu)*0.28)]
        hover:bg-[var(--color-bg-surface-hover)] data-active:bg-[var(--color-bg-surface-emphasis)] data-active:pointer-events-none
        ${className}
      `}
    >
      {icon && (
        <span
          className={` text-[calc(var(--sfu)*1.3)] text-[var(--color-icon-muted)] ${iconColorClass} `}
        >
          {" "}
          {renderIcon(icon)}{" "}
        </span>
      )}

      <span
        className="
          dashboard-link-text
          block ml-[calc(var(--sfu)*0.7)] text-[calc(var(--sfu)*0.88)] tracking-[calc(var(--sfu)*0.023)] 
          max-w-0 overflow-hidden whitespace-nowrap 
          transition-all duration-[var(--duration-long)]
          ease-[var(--motion-steady)]
        "
      >
        {label}
      </span>
    </Link>
  );
}