import "@/styles/foundation/tokens.css";
import "@/styles/foundation/scales.css";
import "@/styles/foundation/motion.css";
import "@/styles/foundation/base.css";
import "@/styles/globals.css";

import type { Metadata, Viewport } from 'next';
import { NotificationCard } from "@/components/UI/Notify/NotifyCard"; 
import { neueMontreal } from "./fonts/neuemontreal";
import { ThemeScript } from "@/components/shared/colorTheme/ThemeScript";
import { GlobalToggleManager } from "@/components/layout/GlobalToggleManager";
import { AppMetadata, } from "@/config/meta/metadata/LayoutMetadata";
import { AppViewport } from "@/config/meta/app";
import { ThemeToggle } from "@/components/shared/colorTheme/ThemeToggle";


export const metadata: Metadata = AppMetadata;
export const viewport: Viewport = AppViewport;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  return (
    <html lang="en" className={`${neueMontreal.className}`}>
      <head>
        <meta name="google-site-verification" content="AWylW6M_1Cm_a0q0-3_nWk_qmcbrc6p7LUbfYCCnDq8" />
        <ThemeScript />
      </head>
      <body className={`antialiased min-w-screen`}>
        {children}
        <NotificationCard />
        <GlobalToggleManager />

        <div className="absolute bottom-0 right-0 m-4">
          <ThemeToggle />
        </div>
      </body>
    </html>
  );
}
