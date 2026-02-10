import Link, { LinkProps } from "next/link"
import { ButtonHTMLAttributes, ComponentProps, HTMLProps, ReactNode } from "react"

type shape = 'rounded' | 'box';

const variants = {
    rounded: `rounded-full`,
    box: `rounded-[calc(var(--sfu)*0.1)]`
}

interface ButtonProps {
  type?: HTMLButtonElement["type"],
  className?: string,
  children: ReactNode,
  shape?: shape,
  href?: LinkProps['href'],
  textColor?: string,
  style?: HTMLProps<HTMLButtonElement>["style"], 
}

const baseClass = `px-[calc(var(--sfu)*1)] py-[calc(var(--sfu)*0.65)] leading-none cursor-pointer`

export function Button({ children, href, type, style = {}, className = "bg-[var(--color-bg-contrast)] text-[var(--color-text-contrast)] w-fit", shape = 'box', ...props }: ButtonProps) {
    const attrs = {
        className:  `${baseClass} ${variants[shape]} ${className} `,
        style: style,
        ...props
    };
    if (href) {
      return (
        <Link href={href} {...attrs}>
          {children}
        </Link>
      )
    }

    return <button type={type} {...attrs}>{children}</button>
}
