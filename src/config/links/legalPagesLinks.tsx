import { FrontendRoutes } from "../urls";

export interface LegalPagelinktype {
    label: string,
    href: string,
    key: string,
}


export const legalPagesLinks: LegalPagelinktype[] = [
    { key: "terms-conditions", label: "Terms & Conditions", href: FrontendRoutes.legal.terms },
    { key: "cookies-policy", label: "Cookies Policy", href: FrontendRoutes.legal.cookies },
    { key: "licensing-agreement", label: "Licensing Agreement", href: FrontendRoutes.legal.license },
    { key: "privacy-policy", label: "Privacy Policy", href: FrontendRoutes.legal.privacy },
  ] as const;