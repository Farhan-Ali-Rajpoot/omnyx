use const_format::formatcp;


pub const CREATOR_NAME: &str = "Farhan Ali Rajpoot";
// Source of truth for handles
const GITHUB_HANDLE: &str = "Farhan-Ali-Rajpoot";

pub struct SocialLinks {
    pub facebook: &'static str,
    pub instagram: &'static str,
    pub tiktok: &'static str,
    pub twitter: &'static str,
    pub github: &'static str,
}

pub const CREATOR_GITHUB_LINK: &str = formatcp!("https://github.com/{}", GITHUB_HANDLE);

pub const CREATOR_SOCIAL_LINKS: SocialLinks = SocialLinks {
    facebook: "https://www.facebook.com/profile.php?id=61550005691019",
    instagram: "https://www.instagram.com/ali_farhan_oop",
    tiktok: "https://www.tiktok.com/@duferminded",
    twitter: "https://x.com/FaranAli_Dev",
    github: CREATOR_GITHUB_LINK, // Reuse the constant defined above
};