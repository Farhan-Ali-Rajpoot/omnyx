import { CSSProperties, DetailedHTMLProps, HTMLProps, OlHTMLAttributes, ReactNode } from "react";

interface ListItemProps {
  children: ReactNode | string;
  className?: string;
}

export function ListItem({ children, className }: ListItemProps) {
  return (
    <li
      className={className}
    >
      {children}
    </li>
  );
}

export type SpacingStep = 0 | 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2 | 2.5 | 3 | 4 | 5 | 6 | 7 | 8; 


interface UnorderedListProps extends HTMLProps<HTMLUListElement> {
  children: ReactNode;
  paddingLeft?: SpacingStep; 
  space?: SpacingStep;
  gap?: SpacingStep;         
  className?: string;
  listStylePosition?: CSSProperties['listStylePosition'];
  autoAdjust?: boolean
}

export function UnorderedList({
  children,
  paddingLeft = 0,
  space = 0,
  gap = 0.25,
  className = "",
  listStylePosition = 'outside',
  autoAdjust= true,
  ...props
}: UnorderedListProps) {
  return (
    <ul
      {...props}
      className={`flex flex-col ${className} ${listStylePosition}`}
      style={{
        paddingLeft: `calc(var(--sfu) * ${paddingLeft} ${listStylePosition == 'outside' && autoAdjust &&'+ calc(var(--sfu)*1)'})`,
        marginTop: `calc(var(--sfu) * ${space})`,
        listStyleType: "disc",
        listStylePosition: listStylePosition,
        gap: `calc(var(--sfu) * ${gap})`,
      }}
    >
      {children}
    </ul>
  );
}


interface OrderedListProps extends Omit<DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>, "type"> {
  children: ReactNode;
  paddingLeft?: SpacingStep; 
  gap?: SpacingStep;
  space?: SpacingStep;
  className?: string;
  listStylePosition?: CSSProperties['listStylePosition'];
  autoAdjust?: boolean;
}

export function OrderedList({
  children,
  paddingLeft = 0,
  gap = 0.25,
  space = 0,
  className = "",
  listStylePosition = 'outside',
  autoAdjust= true,
  ...props
}: OrderedListProps) {
  return (
    <ol
      {...props}
      className={`flex flex-col ${className}`}
      style={{
        paddingLeft: `calc(var(--sfu) * ${paddingLeft} ${listStylePosition == 'outside' && autoAdjust &&'+ calc(var(--sfu)*1)'})`,
        marginTop: `calc(var(--sfu) * ${space})`,
        marginBottom: 0,
        listStyleType: "decimal",           // numbers
        listStylePosition,
        gap: `calc(var(--sfu) * ${gap})`,
      }}
    >
      {children}
    </ol>
  );
}

