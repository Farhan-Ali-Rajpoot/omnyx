import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        // This handles the growing/shrinking of the line
        'google-dash': {
          '0%': { strokeDasharray: '1, 150', strokeDashoffset: '0' },
          '50%': { strokeDasharray: '90, 150', strokeDashoffset: '-35' },
          '100%': { strokeDasharray: '90, 150', strokeDashoffset: '-124' },
        },
        enter: {
          "0%": {
            transform: "scale(0.8) translateY(calc(var(--sfu) * 10))",
          },
          "100%": {
            transform: "scale(1) translateY(0) translateX(0)",
          },
        },
      },
      animation: {
        // We combine the standard spin with our custom dash animation
        'google-dash': 'google-dash 1.5s ease-in-out infinite',
        enter: "enter var(--duration-long) ease-[var(--motion-steady)] forwards",
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".no-transition": {
          "*": {
            transition: "none !important",
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

export default config;
