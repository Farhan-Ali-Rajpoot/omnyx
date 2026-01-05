import { IconType } from "react-icons";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

export interface SocialLinkType {
    name: string,
    icon: IconType,
    href: string
};

export type SocialLinksType = SocialLinkType[];

export const FounderSocialLink: SocialLinksType = [
    { name: "Facebook", icon: FaFacebook, href: "https://www.facebook.com/profile.php?id=61550005691019" },
    { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/ali_farhan_oop" },
    { name: "Tiktok", icon: FaTiktok, href: "https://www.tiktok.com/@duferminded" },
];


export const FounderGithubLink = "https://github.com/Farhan-Ali-Rajpoot";