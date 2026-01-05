// import { HTMLAttributes } from "react";
// import HandleThemeToggle from "./HandleToggle";

// interface ThemeToggleButtonProps extends HTMLAttributes<HTMLDivElement> {
//   className?: string;
// }

// export function ThemeToggle({
//   className = "",
//   ...props
// }: ThemeToggleButtonProps) {
//   return (
//     <div
//       id="theme-toggle-button"
//       {...props}
//       className={`group cursor-pointer select-none transition-opacity hover:opacity-80 text-white ${className}`}
//     >
//       <HandleThemeToggle />
//       <ThemeIcon />
//     </div>
//   );
// }

// const ThemeIcon = ({ className = "", ...props }) => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={className}
//       {...props}
//     >
//       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//       <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
//       <path d="M12 3l0 18" />
//       <path d="M12 9l4.65 -4.65" />
//       <path d="M12 14.3l7.37 -7.37" />
//       <path d="M12 19.6l8.85 -8.85" />
//     </svg>
//   );
// };

import { HTMLAttributes, ReactNode } from "react";
import HandleThemeToggle from "./HandleToggle";

interface ThemeToggleButtonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode, 
}

export function ThemeToggle({
  children,
  className = "",
  ...props
}: ThemeToggleButtonProps) {
  return (
    <div
      id="theme-toggle-button"
      {...props}
      className={`group cursor-pointer select-none transition-opacity hover:opacity-80 items-center text-white flex gap-[0.3vw]
        sm:text-[1.3vw] 3xl:text-[24.96px]
         ${className}`}
    >
      <HandleThemeToggle />
      <ThemeIcon />
      {children}
    </div>
  );
}

export const ThemeIcon = ({ className = "w-5 h-5 sm:w-[1.5vw] sm:h-[1.5vw] 3xl:w-6 3xl:!h-6", ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className}`}
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 3l0 18" />
      <path d="M12 9l4.65 -4.65" />
      <path d="M12 14.3l7.37 -7.37" />
      <path d="M12 19.6l8.85 -8.85" />
    </svg>
  );
};
