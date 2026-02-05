import { forwardRef, SVGProps } from "react";

interface DiamondCircleIconProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
  color?: string;
}

export const diamondCircleIcon = forwardRef<SVGSVGElement, DiamondCircleIconProps>(
  ({ size = "1em", color = "currentColor", ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Outer circle */}
      <circle cx="32" cy="32" r="30" fill={color} />

      {/* White rotated square (SLIGHTLY ENLARGED: width/height changed from 28 to 29.5) */}
      <rect
        x="17.25" // Adjusted from 18 to 17.25 for the new center
        y="17.25" // Adjusted from 18 to 17.25 for the new center
        width="29.5" // Slightly larger size
        height="29.5" // Slightly larger size
        rx="4"
        fill="#fff"
        transform="rotate(45 32 32)"
      />

      {/* Inner black square (unrotated, full size) */}
      <rect x="23" y="23" width="18" height="18" rx="4" fill={color} />
    </svg>
  )
);