import { founderName } from "../founder"; 
import { Viewport } from "next";

export const appName: string = `Omnyx`;
export const appEmail: string = process.env.APP_EMAIL as string; 

export const appTitle: string = `${appName} | Helping developers to Connect and share their ideas`;
export const appDescription: string = `A platform where developers connect and shares thier ideas, Open source Projects`;
export const appType: AppType = "website";
export const appLocale: string = "en_US";
export const appManifest = `/site.webmanifest`;
export const appCategory = `technology`;
export const appDefaultIcon: string = `/favicon.svg`;
export const appDefaultAppleIcon: string = `/apple-touch-ico.svg`;
export const appShortCutIcon: string = `/favicon-16-16.svg`;
export const appKeywords: string[] = [
  appName,
  founderName,
  "Open Source Projects",
  "Developer Platform",
  "Next Level Projects",
  "Software Engineer",
  "Projects",
  "",
];
export const appOgImage: OgImage = {
  url: `/favicon.svg`,
  height: 1200,
  width: 630,
  alt: `${appName} Image`,
};
export const appTwitterCard: TwitterCard = {
  card: "summary_large_image",
  title: appTitle,
  description: appDescription,
  creater: founderName,
  images: [appOgImage.url],
};
export const appIcons: Icons = {
  icon: appDefaultIcon,
  shortcut: appShortCutIcon,
  apple: appDefaultAppleIcon,
  other: [
    {
      rel: "mask-icon",
      url: appDefaultIcon,
      color: "white",
    },
  ],
};

export const appThemeColors: AppThemeColor = {
  white: { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  dark: { media: "(prefers-color-scheme: dark)", color: "#000000" },
};

export const AppViewport: Viewport = {
  themeColor: [
    { media: appThemeColors.white.media, color: appThemeColors.white.color },
    { media: appThemeColors.dark.media, color: appThemeColors.dark.color },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export interface AppThemeColor {
  white: ThemeColor;
  dark: ThemeColor;
}

export interface ThemeColor {
  media: string;
  color: string;
}

export interface Icons {
  icon: string;
  shortcut: string;
  apple: string;
  other?: OtherIcon[];
}

export interface TwitterCard {
  card: Card;
  title: string;
  description: string;
  creater: string;
  images: string[];
}

export interface OgImage {
  url: string;
  height: number;
  width: number;
  alt: string;
}

export interface OtherIcon {
  rel: OtherIconRelation;
  url: string;
  color: string;
}

export type OtherIconRelation = "mask-icon";
export type Card = "summary_large_image" | "summary" | "player" | "app";
export type AppType =
  | "website"
  | "article"
  | "book"
  | "profile"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other";
