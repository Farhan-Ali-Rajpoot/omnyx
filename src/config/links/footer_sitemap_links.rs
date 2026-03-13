use const_format::formatcp;
use crate::{
    config::meta::{
        CREATOR_NAME,
    },
};

pub struct FooterSitemapItem {
    pub label: &'static str,
    pub href: Option<&'static str>,
    pub html_for: Option<&'static str>,
}

pub struct FooterSitemapSection {
    pub title: &'static str,
    pub children: &'static [FooterSitemapItem], // Static slice for nested items
}

pub const FOOTER_SITEMAP: &[FooterSitemapSection] = &[
    FooterSitemapSection {
        title: "Product",
        children: &[
            FooterSitemapItem { label: "The Vault", href: Some("/the-vault"), html_for: None },
            FooterSitemapItem { label: "Page Transition Course", href: Some("/course"), html_for: None },
            FooterSitemapItem { label: "Icon Library", href: Some("/icons"), html_for: None },
            FooterSitemapItem { label: "Easings", href: Some("/easings"), html_for: None },
        ],
    },
    FooterSitemapSection {
        title: "Community",
        children: &[
            FooterSitemapItem { label: "Showcase", href: Some("/showcase"), html_for: None },
            FooterSitemapItem { label: formatcp!("About {}", CREATOR_NAME), href: None, html_for: Some("about-modal") },
            FooterSitemapItem { label: "Slack Community", href: Some("/slack"), html_for: None },
        ],
    },
    FooterSitemapSection {
        title: "Membership",
        children: &[
            FooterSitemapItem { label: "Updates", href: Some("/updates"), html_for: None },
            FooterSitemapItem { label: "Pricing", href: Some("/pricing"), html_for: None },
            FooterSitemapItem { label: "FAQs", href: Some("/faqs"), html_for: None },
            FooterSitemapItem { label: "Support", href: Some("/support"), html_for: None },
        ],
    },
];