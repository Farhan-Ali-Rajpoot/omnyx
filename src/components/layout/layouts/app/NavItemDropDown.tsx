import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import {
  NavItemProps,
  renderIcon,
} from "./DashboardLink";

export function DashboardItemDropdown({
  label,
  icon,
  color,
  items,
}: Omit<NavItemProps, "href" | "active">) {
  if (!items || items.length === 0) return null;
  return (
      <details className="group overflow-hidden">
        {/* Summary clickable header */}
        <summary
          className={`flex items-center justify-between gap-2.5 px-3.5 py-2.5 cursor-pointer rounded 
          hover:bg-[var(--color-bg-hover)] group-open:bg-[var(--color-bg-active)]
         `}
        >
          <div className="flex items-center gap-2.5">
            {icon && (
              <span
                className={`text-[21px] 
                  transition-colors duration-400 ease-steady 
                  text-[var(--color-icon-muted)]
                   `}
              >
                {renderIcon(icon)}
              </span>
            )}
            <span className="text-[15px] font-medium tracking-wide">
              {label}
            </span>
          </div>
          <div
            className="group-open:rotate-90 transition-[scale] duration-300 ease-steady
           p-1 text-sm bg-[var(--color-bg-base)] group-hover:bg-[var(--color-bg-surface)] group-open:bg-[var(--color-bg-surface)] rounded-full"
          >
            <FiChevronRight />
          </div>
        </summary>

        {/* Submenu */}
        <ul
          className="mx-2 my-2 pb-2 space-y-1 max-h-0 h-auto 
               overflow-x-hidden overflow-y-scroll

               transition-[max-height] duration-300 ease-steady
               group-open:max-h-48
               border-b border-neutral-300 dark:border-neutral-700

               scrollbar-none hover:scrollbar-thin
               scrollbar-track-transparent
               scrollbar-thumb-transparent
               scrollbar-hover:cursor-grab
               scrollbar-active:cursor-grabbing
               group-hover:scrollbar-thumb-neutral-300
               dark:group-hover:scrollbar-thumb-neutral-800
               "
        >
          {items.map((item, index) => (
            <Link 
              data-active
              data-aside-link
              href={item.href}
              key={index}
              className="group/l text-[var(--color-text-secondary)]"
            >
              <li
                className={`flex items-center gap-2.5 w-fit px-2.5 pr-3.5 py-1 rounded-full group-hover/l:bg-[var(--color-bg-hover)]
              dark:group-hover/l:bg-neutral-800
              ${item.active && "bg-[var(--color-bg-active)]"}
              `}
              >
                {item.icon && (
                  <span
                    className={`text-lg text-[var(--color-icon-muted)]`}
                  >
                    {renderIcon(item.icon)}
                  </span>
                )}
                <span className="text-sm">{item.label}</span>
              </li>
            </Link>
          ))}
        </ul>
      </details>
  );
}
