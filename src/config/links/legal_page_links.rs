pub struct LegalPageLink {
    pub key: &'static str,
    pub label: &'static str,
    pub href: &'static str,
    pub short_name: &'static str,
}

// Mimicking your FrontendRoutes logic
pub struct FrontendRoutes;
impl FrontendRoutes {
    pub const TERMS: &'static str = "/legal/terms";
    pub const COOKIES: &'static str = "/legal/cookies";
    pub const LICENSE: &'static str = "/legal/license";
    pub const PRIVACY: &'static str = "/legal/privacy";
}

pub const LEGAL_PAGES_LINKS: [LegalPageLink; 4] = [
    LegalPageLink {
        key: "terms-conditions",
        label: "Terms & Conditions",
        href: FrontendRoutes::TERMS,
        short_name: "T&CS",
    },
    LegalPageLink {
        key: "cookies-policy",
        label: "Cookies Policy",
        href: FrontendRoutes::COOKIES,
        short_name: "Cookies",
    },
    LegalPageLink {
        key: "licensing-agreement",
        label: "Licensing Agreement",
        href: FrontendRoutes::LICENSE,
        short_name: "License",
    },
    LegalPageLink {
        key: "privacy-policy",
        label: "Privacy Policy",
        href: FrontendRoutes::PRIVACY,
        short_name: "Privacy",
    },
];