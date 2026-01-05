import { AnchorHTMLAttributes, ReactNode } from "react";
import Link, { LinkProps } from "next/link";

export interface FormLinkProps extends LinkProps {
    children: ReactNode,
    href: string,
    className?: string
}

export function FormLink({ children, href, className = "", ...props }: FormLinkProps) {
    return(
         <Link
              href={href}
              {...props}
              className={`${className} text-black dark:text-white relative group`}
            >
              {children}
              <div
                className="absolute bottom-0 left-0 w-full h-px transition-transform duration-600 ease-steady
               bg-neutral-900 dark:bg-neutral-100 group-hover:scale-x-0 origin-left group-hover:origin-right"
              />
              <div
                className="absolute bottom-0 right-0 w-full h-px transition-transform duration-600 delay-500 ease-steady
               bg-neutral-900 dark:bg-neutral-100 scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-left"
              />
            </Link>
    )
}