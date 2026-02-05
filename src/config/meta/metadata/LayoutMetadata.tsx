// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { appBaseUrl } from "@/config/urls";
import {
  appTitle,
  appDescription,
  appName,
  appKeywords,
  appType,
  appLocale,
  appOgImage,
  appTwitterCard,
  appIcons,
  appManifest,
  appCategory,
} from "../app";
import { founderName } from "../../founder";

export const AppMetadata: Metadata = {
  metadataBase: new URL(appBaseUrl),

  title: {
    default: appTitle,
    template: appTitle,
  },

  description: appDescription,
  applicationName: appName,

  keywords: appKeywords,
  authors: [{ name: founderName }, { name: appName, url: appBaseUrl }],

  creator: founderName,
  publisher: founderName,
  generator: "Next.js",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: appTitle,
    description: appDescription,
    url: appBaseUrl,
    siteName: appName,
    type: appType,
    locale: appLocale,
    images: [
      {
        url: appOgImage.url,
        width: appOgImage.width,
        height: appOgImage.height,
        alt: appOgImage.alt,
      },
    ],
  },

  twitter: {
    card: appTwitterCard.card,
    title: appTwitterCard.title,
    description: appTwitterCard.description,
    creator: appTwitterCard.creater,
    images: appTwitterCard.images,
  },

  alternates: {
    canonical: appBaseUrl,
    languages: {
      "en-US": appBaseUrl,
    },
  },

  icons: {
    icon: appIcons.icon,
    shortcut: appIcons.shortcut,
    apple: appIcons.apple,
    other: appIcons.other,
  },

  manifest: appManifest,
  category: appCategory,

  appLinks: {
    // ios: {
    //   url: "example://open",
    //   app_store_id: "1234567890",
    // },
    // android: {
    //   package: "com.example.app",
    //   url: "example://open",
    // },
    web: {
      url: appBaseUrl,
      should_fallback: true,
    },
  },
};
