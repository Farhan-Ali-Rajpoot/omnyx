import Link, { LinkProps } from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

type Shape = 'rounded' | 'box'

interface BadgeProps {
  shape?: Shape
  children: ReactNode
  href?: LinkProps['href']
  className?: ComponentProps<'div'>['className']
}

const variants: Record<Shape, string> = {
  box: 'rounded-[calc(var(--sfu)*0.1)]',
  rounded: 'rounded-full',
}

const baseClass =
  'px-[calc(var(--sfu)*0.35)] py-[calc(var(--sfu)*0.025)] font-mono uppercase text-[calc(var(--sfu)*0.7)]' 

export function Badge({ children, href, className = "", shape = 'box' }: BadgeProps) {
  const attrs = {
    className: `${baseClass} ${variants[shape]} ${className}`,
  }

  if (href) {
    return (
      <Link href={href} {...attrs}>
        {children}
      </Link>
    )
  }

  return <div {...attrs}>{children}</div>
}
