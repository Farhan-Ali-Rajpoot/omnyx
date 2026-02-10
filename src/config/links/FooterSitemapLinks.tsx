import { appName } from "../meta/app";

export const footerSitemap = [
    {
      title: "Product",
      children: [
        { label: "The Vault", href: "/the-vault" },
        { label: "Page Transition Course", href: "/course" },
        { label: "Icon Library", href: "/icons" },
        { label: "Easings", href: "/easings" },
      ],
    },
    {
      title: "Community",
      children: [
        { label: "Showcase", href: "/showcase" },
        { label: `About ${appName}`, htmlFor: "about-modal" },
        { label: "Slack Community", href: "/slack" },
      ],
    },
    {
      title: "Membership",
      children: [
        { label: "Updates", href: "/updates" },
        { label: "Pricing", href: "/pricing" },
        { label: "FAQs", href: "/faqs" },
        { label: "Support", href: "/support" },
      ],
    },
  ];