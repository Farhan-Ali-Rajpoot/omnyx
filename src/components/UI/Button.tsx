import Link, { LinkProps } from "next/link"
import { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react"

type shape = 'rounded' | 'box';

const variants = {
    rounded: `rounded-full`,
    box: `rounded-[calc(var(--sfu)*0.1)]`
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode,
  shape?: shape,
  href?: LinkProps['href'],
  textColor?: string 
}

const baseClass = `px-[calc(var(--sfu)*1)] py-[calc(var(--sfu)*0.65)] leading-none cursor-pointer`

export function Button({ children, href ,className = "bg-[var(--color-bg-contrast)] text-[var(--color-text-contrast)]", shape = 'box', ...props }: ButtonProps) {
    const attrs = {
        className:  `${baseClass} ${variants[shape]} ${className} `,
    };
    if (href) {
      return (
        <Link href={href} {...attrs}>
          {children}
        </Link>
      )
    }

    return <div {...attrs}>{children}</div>
}
