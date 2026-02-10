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
          Terms & Conditions
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
        <LegalPageLinks active="terms-conditions" />

        <div className="max-w-xl flex flex-col items-start mx-auto text-[calc(var(--sfu)*0.85)]">
          <Paragraph>
            These Terms & Conditions ("Terms") set out the rules for using our
            website, resources, and services. By accessing or using {appName}’s
            platform and/or website, you agree to these Terms. If you don’t
            agree, that’s okay, but you won’t be able to use our services.
          </Paragraph>

          <Divider level={3} />

          <Heading level={1.5}>Scope of Services</Heading>
          <Paragraph space={1.25}>
            {appName} provides access to a curated library of resources, including
            code snippets, templates, tutorials, tools, and more. Access to
            these may be granted via:
          </Paragraph>

          <UnorderedList space={1.25} gap={0.75}>
            <li>
              <Heading className="inline" level={0.85}>
                Subscription Plans:
              </Heading>
              <Paragraph>
                Quarterly or annual recurring payments provide ongoing access to
                all current and future resources during the active subscription
                period..
              </Paragraph>
            </li>
            <li>
              <Heading className="inline" level={0.85}>
                Lifetime Access:
              </Heading>
              <Paragraph>
                {" "}
                A one-time payment option granting permanent access to all
                current and future resources, including updates, for the life of
                the platform.{" "}
              </Paragraph>
            </li>
            <li>
              <Heading className="inline" level={0.85}>
                One-Time Purchases:
              </Heading>
              <Paragraph>
                Select products or templates may be offered as standalone items,
                granting perpetual access to the specific item purchased.{" "}
              </Paragraph>
            </li>
          </UnorderedList>

          <Divider level={3} />

          <Heading level={1.5}>Subscriptions & Lifetime Access</Heading>
          <UnorderedList space={1.25} gap={0.75}>
            <li>
              <Heading className="inline">Subscriptions:</Heading>
              <Paragraph>
                Subscriptions are automatically renewed unless canceled before
                the renewal date. Payments are securely processed through
                Stripe. Canceling a subscription ends access at the conclusion
                of the current billing period.
              </Paragraph>
            </li>
            <li>
              <Heading className="inline">Lifetime Access:</Heading>
              <Paragraph>
                Lifetime access provides uninterrupted access to all resources
                available in the Vault, including updates and newly released
                Vault items, for as long as {appName} operates the platform. Lifetime
                access is:
              </Paragraph>
              <UnorderedList space={0.75} gap={0.75}>
                <li>
                  Non-Transferable: Access is tied to the user account that made
                  the purchase.
                </li>
                <li>
                  Limited to Vault Contents: Lifetime access applies exclusively
                  to items available in the Vault. It does not guarantee access
                  to other products, services, or offerings released by {appName}
                  that fall outside of the Vault, such as standalone site
                  templates, courses, or premium add-ons, unless explicitly
                  stated.
                </li>
                <li>
                  Guaranteed for the Life of the Platform: While lifetime access
                  includes updates to Vault items, {appName} reserves the right to
                  modify or discontinue specific Vault resources in the event of
                  platform closure, legal, or technical constraints.
                </li>
                <li>
                  Exclusive to {appName}: Lifetime users may not resell, transfer, or
                  sublicense their access.
                </li>
              </UnorderedList>
            </li>
          </UnorderedList>

          <Divider level={3} />

          <Heading level={1.5}>Refund Policy</Heading>
          <Paragraph space={1.5}>
            We want you to be happy with {appName}! If you encounter an issue,
            contact us at midlelnight@gmail.com within 7 days of purchase.
            Refunds will be considered on a case-by-case basis and may be
            subject to processing fees.
          </Paragraph>

          <Divider level={3} />

          <Heading level={1.5}>Taxes</Heading>
          <Paragraph space={1.25}>
            All prices listed on {appName} are subject to applicable taxes, such as
            VAT. You are responsible for any additional taxes or fees based on
            your location.
          </Paragraph>

          <Divider level={3} />

          <Heading level={1.5}>Links to Other Websites</Heading>
          <Paragraph space={1.25}>
            Our website may contain links to third-party websites or services
            that are not owned or controlled by {appName}. These links are provided
            for convenience and additional resources but are beyond our control
          </Paragraph>

          <Paragraph space={1}>
            {appName} has no responsibility for the content, privacy policies, or
            practices of any third-party websites or services. By accessing
            these links, you acknowledge and agree that {appName} is not responsible
            or liable, directly or indirectly, for any damage or loss caused or
            alleged to be caused by or in connection with the use of or reliance
            on any such content, goods, or services available on or through any
            such websites or services.
          </Paragraph>

          <Divider level={3} />

          <Heading level={1.5}>Affiliate Links</Heading>
          <Paragraph space={1.25}>
            Some links within the {appName} Vault may be referral or affiliate links.
            This means {appName} may receive compensation if you make a purchase or
            subscribe through these links.
          </Paragraph>
          <Paragraph space={1}>
            We include referral links only to products or services we believe
            provide value to our users. Using these links comes at no additional
            cost to you and helps support {appName}’s development and continued
            resource creation.
          </Paragraph>

          <Divider level={3} />

          <Heading level={1.5}>Contact Us</Heading>
          <Paragraph space={0.25}>
            If you have any questions or concerns about these Terms, please
            reach out to midlelnight@gmail
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default page;
