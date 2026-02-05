import "@/styles/foundation/tokens.css";
import "@/styles/foundation/scales.css";
import "@/styles/foundation/motion.css";
import "@/styles/globals.css";
import "@/styles/animation/parallax-spin.css";
import "@/styles/animation/footer-svg.css";

import type { Metadata, Viewport } from 'next';
import { NotificationCard } from "@/components/UI/Notify/NotifyCard"; 
import { hafferMonoRegular, BrisaRegular } from "./fonts";
import { ThemeScript } from "@/components/shared/colorTheme/ThemeScript";
import { AppMetadata, } from "@/config/meta/metadata/LayoutMetadata";
import { AppViewport } from "@/config/meta/app";
import { ThemeToggle } from "@/components/shared/colorTheme/ThemeToggle";
import { CheckboxToggleManager } from "@/components/layout/CheckboxToggleManager";


export const metadata: Metadata = AppMetadata;
export const viewport: Viewport = AppViewport;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  return (
    <html lang="en" className={`${BrisaRegular.variable} ${hafferMonoRegular.variable} antialiased`}>
      <head>
        <meta name="google-site-verification" content="AWylW6M_1Cm_a0q0-3_nWk_qmcbrc6p7LUbfYCCnDq8" />
        <ThemeScript />
      </head>
      <body className={`min-w-screen min-h-screen margin-0 bg-[var(--color-bg-base)] text-[var(--color-text-base)] text-[calc(var(--sfu)*0.93)] font-haffer-montreal
        overflow-x-hidden box-border scrollbar-none`}>
        {children}
        <CheckboxToggleManager />
        <NotificationCard />

        <div className="fixed bottom-0 right-0 m-4">
          <ThemeToggle />
        </div>
      </body>
    </html>
  );
}
