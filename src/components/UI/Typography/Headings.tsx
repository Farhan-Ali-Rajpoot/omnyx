import { HTMLProps, ReactNode } from "react";

interface HeadingProps extends HTMLProps<HTMLHeadingElement> {
  children: ReactNode | string;
  level?: 1 | 0.85 | 0.93 | 1.25 | 1.5 | 1.75 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6; 
}

export function Heading({ children, level = 1, ...props }: HeadingProps) {
  return (
    <h2
      {...props}
      style={{
        fontSize: `calc(var(--sfu) * ${level})`,
        WebkitTextStroke: "0.3px currentColor",
        paintOrder: "stroke fill"
      }}
    >
      {children}
    </h2>
  );
}
