import { forwardRef, HTMLProps, SVGProps } from 'react';

interface DiamondCircleIconProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
  color?: string;
}

const DiamondCircleIcon = forwardRef<SVGSVGElement, DiamondCircleIconProps>(
  ({ size = '1em', color = 'currentColor', ...props }, ref) => (
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
      <rect
        x="23"
        y="23"
        width="18"
        height="18"
        rx="4"
        fill={color}
      />
    </svg>
  )
);

interface AppNameTextSVGProps extends HTMLProps<SVGSVGElement> {}

export function AppNameTextSVG({...props}: AppNameTextSVGProps) {
  return (
   <svg
      width={"auto"}
      height={"1em"}
      // 408 83
      viewBox="0 0 407 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M355.227 1.09375L368.352 24.375H368.977L382.258 1.09375H406.477L382.57 41.0938L407.414 81.0938H382.57L368.977 57.3438H368.352L354.758 81.0938H330.07L354.602 41.0938L330.852 1.09375H355.227Z" fill="currentColor"/>
      <path d="M250.053 1.09375H274.271L289.896 33.5938H290.521L306.146 1.09375H330.365L300.99 55.9375V81.0938H279.428V55.9375L250.053 1.09375Z" fill="currentColor"/>
      <path d="M248.561 1.09375V81.0938H230.436L201.529 39.0625H201.061V81.0938H179.342V1.09375H197.779L226.217 42.9688H226.842V1.09375H248.561Z" fill="currentColor"/>
      <path d="M82.3613 1.09375H109.393L127.986 46.4062H128.924L147.518 1.09375H174.549V81.0938H153.299V34.8438H152.674L134.861 80.4688H122.049L104.236 34.5312H103.611V81.0938H82.3613V1.09375Z" fill="currentColor"/>
      <path d="M77.8125 41.0938C77.8125 50 76.0807 57.513 72.6172 63.6328C69.1536 69.7266 64.4792 74.349 58.5938 77.5C52.7083 80.625 46.1458 82.1875 38.9062 82.1875C31.6146 82.1875 25.026 80.612 19.1406 77.4609C13.2812 74.2839 8.61979 69.6484 5.15625 63.5547C1.71875 57.4349 0 49.9479 0 41.0938C0 32.1875 1.71875 24.6875 5.15625 18.5938C8.61979 12.474 13.2812 7.85156 19.1406 4.72656C25.026 1.57552 31.6146 0 38.9062 0C46.1458 0 52.7083 1.57552 58.5938 4.72656C64.4792 7.85156 69.1536 12.474 72.6172 18.5938C76.0807 24.6875 77.8125 32.1875 77.8125 41.0938ZM55.4688 41.0938C55.4688 36.3021 54.8307 32.2656 53.5547 28.9844C52.3047 25.6771 50.4427 23.1771 47.9688 21.4844C45.5208 19.7656 42.5 18.9062 38.9062 18.9062C35.3125 18.9062 32.2786 19.7656 29.8047 21.4844C27.3568 23.1771 25.4948 25.6771 24.2188 28.9844C22.9688 32.2656 22.3438 36.3021 22.3438 41.0938C22.3438 45.8854 22.9688 49.9349 24.2188 53.2422C25.4948 56.5234 27.3568 59.0234 29.8047 60.7422C32.2786 62.4349 35.3125 63.2813 38.9062 63.2813C42.5 63.2813 45.5208 62.4349 47.9688 60.7422C50.4427 59.0234 52.3047 56.5234 53.5547 53.2422C54.8307 49.9349 55.4688 45.8854 55.4688 41.0938Z" fill="currentColor"/>
    </svg>
  );
}

export const AppIconJSX = DiamondCircleIcon;
