import Link, { LinkProps } from "next/link";
import { ComponentProps, HTMLProps, ReactNode } from "react";
import { IconType } from "react-icons";

interface SocialLinkItem {
    label: string | ReactNode
    href: string
}

interface SocialLinksProps extends HTMLProps<HTMLDivElement> {
    items: SocialLinkItem[],
    itemClassName?: ComponentProps<'div'>['className']
}

export function SocialLinks ({ itemClassName = "", className = "", items, ...props}: SocialLinksProps) {
    return(
        <>
        <div className={`flex ${className}`} {...props}>
            {
                items.map(({label, href}, i) => (
                    <>
                    <Link href={href} className={`p-[calc(var(--sfu)*0.6125)] bg-[var(--color-bg-action-surface-emphasis)]
                        ${i % 2 !== 1 && "rounded-full"} text-[calc(var(--sfu)*1)] ${itemClassName}`}>
                            {label}
                        </Link>
                    </>
                ))
            }
        </div>
        </>
    )
}