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
import { Badge } from "@/components/UI/Badge";
import { appName } from "@/config/meta/app";
import { Heading } from "@/components/UI/Typography/Headings";
import { Paragraph } from "@/components/UI/Typography/Paragraph";
import { Divider } from "@/components/UI/Typography/Divider";
import {
  OrderedList,
  UnorderedList,
} from "@/components/UI/Typography/ListItem";
import { LegalPageLinks } from "@/components/pages/LegalPageLinks";

export const metadata: Metadata = {
  title:
    "Privacy Policy - Tendor - A Web Developer community that provides good desgined website.",
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
      "Privacy Policy - Tendor - A Web Developer community that provides good desgined website.",
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
      "Privacy policy - Tendor - A Web Developer community that provides good desgined website.",
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
          Privacy Policy
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
        <LegalPageLinks active="privacy-policy" />

        <div className="max-w-xl flex flex-col items-start mx-auto text-[calc(var(--sfu)*0.85)]">
          <Paragraph>
            This Privacy Policy explains how {appName} ("we," "us," or "our")
            collects, uses, and protects your information when you use our
            website and services. By using the {appName} website, you agree to
            the terms outlined in this Privacy Policy. If you disagree with any
            part, you may not access our services.
          </Paragraph>
          <Paragraph space={1} className="pt-[calc(var(--sfu)*1.25)]">
            We take your privacy seriously. This policy breaks down what data we
            collect, how we use it, and what your options are to stay in
            control.
          </Paragraph>

          <Divider level={3} />

          <Heading level={1.5}>Information We Collect</Heading>
          <UnorderedList space={1.25} gap={0.75}>
            <li>
              Non-Personal Data: We collect non-personal information, such as
              your browser type, language preferences, and the date/time of your
              visit. This helps us improve your experience and ensure everything
              works as it should.
            </li>
            <li>
              Personal Data: When you interact with {appName} (e.g., signing up,
              making a purchase, or contacting us), we may collect:
              <UnorderedList space={0.25}>
                <li>Name and email address</li>
                <li>
                  Other optional data you share with us (e.g., survey responses
                  or preferences).
                </li>
              </UnorderedList>
            </li>
          </UnorderedList>
          <Paragraph space={1}>
            We don’t share your personally identifying information publicly or
            with third parties, except when required by law.
          </Paragraph>

          <Divider level={3} />

          <Heading level={1.5}>How We Use Your Information</Heading>
          <UnorderedList space={1.25} gap={0.75}>
            <li>To provide and improve our services.</li>
            <li>To process payments and deliver products or subscriptions.</li>
            <li>
              To send you updates about new resources or important changes (only
              the ones you want).
            </li>
          </UnorderedList>

          <Divider level={3} />

          <Heading level={1.5}>Protection of Information</Heading>
          <Paragraph space={1.25}>
            {appName} discloses potentially personally-identifying and
            personally-identifying information only to those of its employees,
            contractors, and affiliated organizations that:
          </Paragraph>
          <OrderedList space={1} gap={0.75}>
            <li>
              Have agreed to confidentiality obligations that prevent disclosure
              to others.
            </li>
            <li>
              Need to know that information to process it on {appName}’s behalf or
              provide services available through the {appName} platform, and
            </li>
          </OrderedList>
          <Paragraph space={1}>
            Some of these employees, contractors, and affiliated organizations
            may be located outside your home country. By using {appName}’s website,
            you consent to the transfer of your information to them.
          </Paragraph>
          <Paragraph space={3}>
            {appName} does not rent or sell potentially personally-identifying or
            personally-identifying information to anyone. Outside of the parties
            mentioned above, {appName} discloses such information only in the
            following cases:
          </Paragraph>
          <UnorderedList space={1}>
            <li>
              Legal Requirements: When required to comply with legal obligations
              or governmental requests.
            </li>
            <li>
              Good Faith Belief: When {appName} believes disclosure is reasonably
              necessary to protect its rights, property, or the safety of its
              users, third parties, or the public.
            </li>
          </UnorderedList>
          <Paragraph space={1}>
            We strive to handle your data responsibly and in line with best
            practices to maintain your trust and privacy.
          </Paragraph>

          <Divider level={3} />

          <Heading level={1.5}>We don’t train AI with your data</Heading>

          <Paragraph space={1.25}>
            We don’t use your data to train AI models. Does that make us the
            only one in 2025? We're not sure, but your data stays private.
          </Paragraph>

          <Divider level={3} />

          <Heading level={1.5}>Cookies</Heading>
          <Paragraph space={1.25}>
            We use cookies, but only for improving your experience. No ad
            tracking or pop-ups here, we don’t serve ads. For more details,
            check out our Cookie Notice.
          </Paragraph>

          <Divider level={3} />

          <Heading level={1.5}>Analytics</Heading>
          <Paragraph space={1.25}>
            We use Plausible Analytics, a privacy-focused analytics tool that
            does not use cookies or track personal data. Plausible provides
            insights on website performance while respecting your privacy.
          </Paragraph>
          <Paragraph space={1.25}>
            We use Plausible Analytics, a privacy-focused analytics tool that
            does not use cookies or track personal data. Plausible provides
            insights on website performance while respecting your privacy.
          </Paragraph>

          <Divider level={3} />

          <Heading level={1.5}>Referral Links</Heading>
          <Paragraph space={1.25}>
            Some links in the {appName} Vault may be referral or affiliate links. If
            you click these links and make a purchase, we may earn a small
            commission, at no extra cost to you. This helps us keep building the
            tools and resources you love.
          </Paragraph>

          <Divider level={3} />

          <Heading level={1.5}>Links to Other Websites</Heading>
          <Paragraph space={1.25}>
            Our website may include links to third-party websites or services.
            {appName} is not responsible for the content, privacy policies, or
            practices of these external sites. We encourage you to review their
            privacy policies before sharing any information
          </Paragraph>

          <Divider level={3}></Divider>

          <Heading level={1.5}>Privacy Policy Changes</Heading>
          <Paragraph space={1.25}>
            We may update this Privacy Policy occasionally to reflect changes in
            our services or legal obligations. When we do, we’ll post the
            updated version on this page. Your continued use of {appName} after an
            update constitutes acceptance of the new terms.
          </Paragraph>

          <Divider level={3} />

          <Heading level={1.5}>Contact Us</Heading>
          <Paragraph space={.25}>Got questions, concerns, or just want to say hi? Reach us at midlelnight@gmail.com</Paragraph>
        </div>
      </div>
    </div>
  );
};

export default page;

