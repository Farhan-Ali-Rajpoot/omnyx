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
          Licensing Agreement
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
        <LegalPageLinks active="licensing-agreement" />

        <div className="max-w-xl flex flex-col items-start mx-auto text-[calc(var(--sfu)*0.85)]">
          <Paragraph>
            Terms & Conditions Cookie Policy Cookie Policy Licensing Agreement
            Licensing Agreement Privacy Policy Privacy Policy Welcome to {appName}!
            This Licensing Agreement ("Agreement") outlines the terms under
            which you ("User") may use our resources, including code snippets,
            templates, and other assets ("Items"). By accessing or using {appName}'s
            resources, you agree to comply with and be bound by this Agreement.
            License
          </Paragraph>

          <Divider level={3} />

          <Heading level={1.5}>License</Heading>
          <Paragraph space={0.25}>
            {appName} grants you a non-exclusive, non-transferable license to use,
            modify, and integrate the Items into your personal or commercial
            projects, subject to the limitations outlined herein.
          </Paragraph>

          <Divider level={3} />

          <Heading level={1.5}>You are allowed to:</Heading>
          <UnorderedList space={1.25}>
            <li>
              You may create end products for yourself or clients using the
              Items.
            </li>
            <li>
              You are allowed to modify, adapt, and combine the Items with other
              works to develop derivative creations.
            </li>
            <li>
              This license permits the use of Items across multiple projects
              without additional fees.
            </li>
          </UnorderedList>

          <Divider level={3} />

          <Heading level={1.5}>You are not allowed to:</Heading>
          <UnorderedList space={1.25}>
            <li>
              You may not redistribute, resell, lease, license, sublicense, or
              offer the Items, modified or unmodified, to any third party. This
              includes uploading Items to websites, marketplaces, or media
              channels, whether for free or for a fee. In other words, you
              cannot copy or modify the Items and then sell or share them on
              other platforms as your own.
            </li>
            <li>
              You may not use the Items to create products that compete directly
              with {appName}, including but not limited to similar templates, code
              snippets, or other resources designed for sale or distribution.
            </li>
            <li>
              You may not recreate the Items in other platforms, frameworks, or
              formats, whether attributed to {appName} or not, and then distribute or
              sell them. For example, you may not recreate {appName}’s Items in
              Framer or similar tools and share them as educational remixes or
              otherwise.
            </li>
            <li>
              If we suspect that you are not complying with this Agreement or
              the terms of using our service, we reserve the right to block your
              account and restrict access to the Items without providing a
              refund or explanation of the circumstances. Violations of these
              terms will be prosecuted to the fullest extent permitted by law.
            </li>
          </UnorderedList>

          <Divider level={3} />

          <Heading level={1.5}>Account Usage</Heading>
          <UnorderedList space={1.25}>
            <li>
              Single user: an {appName} account is designated for individual use.
              Sharing account credentials or allowing multiple users to access
              the same account is not allowed.
            </li>
          </UnorderedList>

          <Divider level={3} />

          <Heading level={1.5}>Termination</Heading>
          <Paragraph space={1.25}>
            {appName} reserves the right to terminate or suspend your access to our
            resources without prior notice if you violate this Agreement. Upon
            termination, you must cease all use of the Items and destroy any
            copies in your possession.
          </Paragraph>

          <Divider level={3} />

          <Heading level={1.5}>Limitation of Liability</Heading>
          <Paragraph space={1.25}>
            In no event shall {appName} be liable for any indirect, incidental,
            special, consequential, or punitive damages, including but not
            limited to loss of data, profits, or business opportunities, arising
            out of or related to your use or inability to use the Items.
            Modifica
          </Paragraph>

          <Divider level={3} />

          <Heading level={1.5}>Contact</Heading>
          <Paragraph space={0.25}>
            For any questions or concerns regarding this Licensing Agreement,
            please contact us at midlelnight@gmail.com
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default page;
