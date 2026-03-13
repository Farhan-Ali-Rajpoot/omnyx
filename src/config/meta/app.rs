use const_format::formatcp;
use super::creator::CREATOR_NAME;

pub const APP_NAME: &str = "omnyx";
pub const APP_MANIFEST: &str = "/site.webmanifest";
pub const APP_CATEGORY: &str = "technology";
pub const APP_LOCALE: &str = "en_US";

pub const APP_ORIGIN: &str = match option_env!("OWN_ORIGIN") {
    Some(val) => val,
    None => "https://omnyx.com",
};

pub const APP_TITLE: &str = formatcp!("{} | Helping developers to Connect and share their ideas", APP_NAME);
pub const APP_DESCRIPTION: &str = "A platform where developers connect and shares thier ideas, Open source Projects";


pub const APP_KEYWORDS: &[&str] = &[
    APP_NAME,
    CREATOR_NAME,
    "Open Source Projects",
    "Developer Platform",
    "Next Level Projects",
    "Software Engineer",
    "Projects",
];

pub const APP_DEFAULT_ICON: &str = "/favicon.svg";
pub const APP_DEFAULT_APPLE_ICON: &str = "/apple-touch-ico.svg";
pub const APP_SHORTCUT_ICON: &str = "/favicon-16-16.svg";
pub const APP_ICON_TYPE: &str = "image/svg";

pub const APP_METADATA: AppMetadata = AppMetadata {
    name: APP_NAME,
    origin: APP_ORIGIN, 
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    manifest: APP_MANIFEST,
    locale: APP_LOCALE,
    keywords: APP_KEYWORDS,
    default_icon: APP_DEFAULT_ICON,
    apple_icon: APP_DEFAULT_APPLE_ICON,
    shortcut_icon: APP_SHORTCUT_ICON,
    icon_type: APP_ICON_TYPE,
    creator: CREATOR_NAME,
};

pub struct AppMetadata {
    pub name: &'static str,
    pub origin: &'static str, 
    pub title: &'static str,
    pub description: &'static str,
    pub manifest: &'static str,
    pub locale: &'static str,
    pub keywords: &'static [&'static str],
    pub default_icon: &'static str,
    pub apple_icon: &'static str,
    pub icon_type: &'static str,
    pub shortcut_icon: &'static str,
    pub creator: &'static str,
}