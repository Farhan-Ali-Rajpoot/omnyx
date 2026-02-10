import { HTMLProps, ReactNode } from "react";

interface DividerProps extends HTMLProps<HTMLDivElement> {
  children?: ReactNode; 
  level?: number;       
  className?: string;
  color?: string;      
}

export function Divider({
  children,
  level = 1,
  className = "w-full",
  color = "var(--color-border-surface)",
  ...props
}: DividerProps) {
  return (
    <div
      {...props}
      className={className}
      style={{
        borderTop: `1px solid ${color}`,
        marginTop: `calc(var(--sfu) * ${level})`,
        marginBottom: `calc(var(--sfu) * ${level})`,
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
}
