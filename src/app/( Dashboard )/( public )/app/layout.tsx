import React from "react";
import {
  wn,
  favicon,
  shortcutIcon,
  appleIcon,
  ogImageUrl,
  ogTwitterImage,
  applicationName,
  authorName,
  category,
} from "@/app/Meta";
import { Metadata } from "next";
import { Dashboard } from "@/components/layout/layouts/app/Dashboard";

export const metadata: Metadata = {
  title:
    "Tendor - A Web Developer community that provides good desgined website.",
  description: `Tendor is a vibrant web developer community dedicated to crafting beautifully designed, high-performance websites. We bring together designers, developers, and digital creators to share knowledge, collaborate on projects, and elevate web standards.`,

  keywords: [
    "Tendor",
    "Web developer service",
    "admin login page",
    "Web developer",
    "admin dashboard",
  ],
  metadataBase: new URL(wn), // already a URL object
  applicationName: applicationName,
  category: category,
  authors: [{ name: authorName, url: wn.toString() }],
  openGraph: {
    title:
      "Tendor - A Web Developer community that provides good desgined website.",
    description: `Tendor is a vibrant web developer community dedicated to crafting beautifully designed, high-performance websites. We bring together designers, developers, and digital creators to share knowledge, collaborate on projects, and elevate web standards.`,
    url: `${wn}/blog`,
    siteName: applicationName,
    images: [
      {
        url: `${wn}${ogImageUrl}`,
        width: 736,
        height: 727,
        alt: "Admin Login Page - Tendor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Tendor - A Web Developer community that provides good desgined website.",
    description:
      "`Tendor is a vibrant web developer community dedicated to crafting beautifully designed, high-performance websites. We bring together designers, developers, and digital creators to share knowledge, collaborate on projects, and elevate web standards.`",
    images: [`${wn}${ogTwitterImage}`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      nocache: false,
    },
  },
  icons: {
    icon: favicon,
    shortcut: shortcutIcon,
    apple: appleIcon,
  },
  alternates: {
    canonical: `${wn}/blog`,
  },
};

const layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
    <Dashboard >
      {children}
    </Dashboard>
    </>
  )
  
};

export default layout;
