import { FrontendRoutes } from "@/config/urls";
import Link from "next/link";
import React from "react";
import { FiChevronRight } from "react-icons/fi";

interface BreadcrumbProps {
  pathname: string;
}

const capitalize = (word: string) => (word ? word[0].toUpperCase() + word.slice(1) : "");

const Breadcrumb = ({ pathname }: BreadcrumbProps) => {
  const parts = pathname.replace(/^\/|\/$/g, "").split("/");

  const links: Record<string, string> = {
    app: FrontendRoutes.app.base,
    account: FrontendRoutes.app.account.base,
  };

  return (
    <div className="flex items-center space-x-2">
      {parts.map((part, index) => {
        const isLast = index === parts.length - 1;
        return (
          <React.Fragment key={index}>
            <Link
              href={links[part] || "#"}
              className={`text-[calc(var(--sfu)*0.75)] text-[var(--color-text-secondary)] px-[calc(var(--sfu)*0.75)] py-[calc(var(--sfu)*0.15)] ${
                isLast
                  ? "rounded-none bg-[var(--color-bg-surface)]"
                  : "rounded-full bg-[var(--color-bg-surface-emphasis)]"
              }`}
            >
              {capitalize(part)}
            </Link>
            {!isLast && (
              <FiChevronRight className="text-[var(--color-text-secondary)]" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
