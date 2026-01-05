import { FaInfoCircle, FaUsers, FaBriefcase, FaShieldAlt, FaFileContract } from "react-icons/fa";
import { IconType } from "react-icons";
import { FrontendRoutes } from "@/config/urls";

export type AboutLink = {
  name: string;
  href: string;
  description: string;
  icon: IconType;
};

export type AboutLinksStack = AboutLink[];

const helpRoute = '/help/policies';

export const aboutLinks: AboutLinksStack = [
  {
    name: "Privacy Policy",
    href: FrontendRoutes.legal.privacy,
    description: "Policies",
    icon: FaShieldAlt,
  },
  {
    name: "Terms of Service",
    href: FrontendRoutes.legal.terms,
    description: "Rules for user",
    icon: FaFileContract,
  },
];
