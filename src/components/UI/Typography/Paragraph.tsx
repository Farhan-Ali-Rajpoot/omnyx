import { HTMLProps, ReactNode } from "react";
import { SpacingStep } from "./ListItem";

interface ParagraphProps extends HTMLProps<HTMLParagraphElement> {
  space?: SpacingStep;
  children: ReactNode | string;
}

export function Paragraph({ children, space = 0, ...props }: ParagraphProps) {
  return (
    <p
      {...props}
      style={{
        paddingTop: `calc(var(--sfu) * ${space})`,
      }}
    >
      {children}
    </p>
  );
}
