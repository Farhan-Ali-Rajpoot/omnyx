import { FrontendRoutes } from "../urls";

export interface LegalPagelinktype {
    label: string,
    href: string,
    key: string,
    shortName: string,
}


export const legalPagesLinks: LegalPagelinktype[] = [
    { key: "terms-conditions", label: "Terms & Conditions", href: FrontendRoutes.legal.terms, shortName: "T&CS" },
    { key: "cookies-policy", label: "Cookies Policy", href: FrontendRoutes.legal.cookies, shortName: "Cookies"},
    { key: "licensing-agreement", label: "Licensing Agreement", href: FrontendRoutes.legal.license, shortName: "License" },
    { key: "privacy-policy", label: "Privacy Policy", href: FrontendRoutes.legal.privacy, shortName: "Privacy" },
  ] as const;