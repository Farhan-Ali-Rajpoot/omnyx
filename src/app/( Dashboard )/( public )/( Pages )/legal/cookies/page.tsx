import React from "react";
import {
  FaExternalLinkAlt,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";
import Link from "next/link";
import type { Metadata, Viewport } from "next";
import {
  wn,
  favicon,
  shortcutIcon,
  appleIcon,
  themeColor,
  ogImageUrl,
  ogTwitterImage,
  applicationName,
  authorName,
  category,
} from "@/app/Meta";
import { Divider } from "@/components/UI/Typography/Divider";
import { Heading } from "@/components/UI/Typography/Headings";
import { Paragraph } from "@/components/UI/Typography/Paragraph";
import { appName } from "@/config/meta/app";
import { Badge } from "@/components/UI/Badge";
import {
  OrderedList,
  UnorderedList,
} from "@/components/UI/Typography/ListItem";
import { LegalPageLinks } from "@/components/pages/LegalPageLinks";

export const metadata: Metadata = {
  title:
    "Change Password - Tendor - A Web Developer community that provides good desgined website.",
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
      "Terms Policy - Tendor - A Web Developer community that provides good desgined website.",
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
      "Terms Policy - Tendor - A Web Developer community that provides good desgined website.",
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

export const viewport: Viewport = {
  themeColor: `${themeColor}`,
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const page = () => {
  const lastUpdated = "January 1, 2026";
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-[calc(var(--sfu)*1.5)]">
      <div className="pt-[calc(var(--sfu)*9)] pb-[calc(var(--sfu)*6)] flex flex-col items-center">
        <h1 className="text-[calc(var(--sfu)*4.5)] tracking-[calc(var(--sfu)*-0.25)]">
          Cookies Policy
        </h1>
        <div className="flex">
          <Badge className="bg-[var(--color-bg-surface-emphasis)]">
            Last Updated
          </Badge>
          <Badge className="bg-[var(--color-bg-surface-emphasis)] rounded-full">
            {lastUpdated}
          </Badge>
        </div>
      </div>
      <div
        className="w-full pt-[calc(var(--sfu)*1.5)] border-t-[calc(var(--sfu)*0.0625)] border-[var(--color-border-surface)]
       flex items-start justify-center gap-[calc(var(--sfu)*1.5)] pb-[calc(var(--sfu)*15)]"
      >
        <LegalPageLinks active="cookies-policy" />

        <div className="max-w-xl flex flex-col items-start mx-auto text-[calc(var(--sfu)*0.85)]">
          <Paragraph>
            At {appName}, we use cookies and local storage (and similar technologies)
            to improve your experience, make our website work seamlessly, and
            help us understand how it’s being used. This Cookie Policy explains
            what cookies are, why we use them, and how you can control their
            use.
          </Paragraph>
          <Paragraph space={1}>
            For more information about how we handle data, please see our
            Privacy Policy.
          </Paragraph>

          <Divider level={3} />

          <Heading level={3}>What Are Cookies?</Heading>
          <Paragraph space={1.25}>
            Cookies are small text files stored on your device by your browser
            when you visit a website. They help websites remember your
            preferences, improve functionality, and provide insights into user
            behaviour.
          </Paragraph>

          <Paragraph space={1}>Cookies are generally classified as:</Paragraph>
          <UnorderedList space={1}>
            <li>
              Session Cookies: Temporary cookies that disappear when you close
              your browser.
            </li>
            <li>
              Persistent Cookies: Cookies that stay on your device until you
              delete them or they expire.
            </li>
          </UnorderedList>
          <Paragraph space={1.25}>
            We may also use similar technologies like:
          </Paragraph>
          <UnorderedList>
            <li>
              Local Storage: Data stored locally on your device to enhance
              features or save preferences.
            </li>
            <li>
              Tracking Pixels (Web Beacons): Tiny graphics files used to track
              things like email opens or ad performance.
            </li>
          </UnorderedList>
          <Paragraph space={1.25}>
            Cookies we set are called "first-party cookies." Cookies set by
            others (e.g., analytics tools) are "third-party cookies."
          </Paragraph>

          <Divider level={3} />

          <Heading level={1.5}>Why we use Cookies</Heading>
          <Paragraph>{appName} uses cookies to:</Paragraph>
          <UnorderedList space={1}>
            <li>
              Keep the Website Functional: Certain cookies are essential to make
              sure our website works properly.
            </li>
            <li>
              Improve Performance: Cookies help us analyze how users interact
              with the site so we can make it better.
            </li>
            <li>
              Remember Preferences: So you don’t have to set things like
              language or layout every time you visit.
            </li>
          </UnorderedList>
          <Paragraph space={1}>
            We don’t serve ads, so no marketing or advertising cookies here!
          </Paragraph>

          <Divider level={3} />

          <Heading level={1.5}>Types of Cookies we use</Heading>
          <UnorderedList space={1.25}>
            <li>
              Essential Cookies: These are required for basic functionality,
              like staying logged in or accessing certain features. They cannot
              be disabled.
            </li>
            <li>
              Analytics Cookies: We use Plausible Analytics, a privacy-friendly
              tool that doesn’t use personal data or intrusive tracking. It
              helps us understand how visitors interact with our website so we
              can improve it.
            </li>
          </UnorderedList>

          <Divider level={3} />

          <Heading level={1.5}>Managing Cookies</Heading>
          <Paragraph space={1.25}>
            You have the right to control cookies. Most browsers allow you to
            adjust your cookie settings or delete cookies altogether. Please
            note that disabling cookies might affect the functionality of some
            parts of our website.
          </Paragraph>
          <Paragraph space={1}>
            Here’s how to manage cookies in popular browsers:
          </Paragraph>

          <UnorderedList>
            <li>Google Chrome</li>
            <li>Mozilla Firefox</li>
            <li>Safari</li>
            <li>Microsoft Edge</li>
          </UnorderedList>

          <Divider level={3} />

          <Heading level={1.25}>Contact us</Heading>
          <Paragraph space={1.25}>
            If you have any questions or feedback about this Cookie Policy,
            please email us at midlelnight@gmail.com
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default page;
