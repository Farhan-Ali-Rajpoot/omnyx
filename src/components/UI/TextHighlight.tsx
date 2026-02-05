import { ReactNode } from "react"

interface HeroHighlightProps {
    children: ReactNode
}

export function HeroHighlight({ children }: HeroHighlightProps) {
    return (
        <div className="inline-flex items-center px-[calc(var(--sfu)*0.5)] bg-[var(--color-bg-surface-hover)] rounded-full">
            {children}
        </div>
    )
}
