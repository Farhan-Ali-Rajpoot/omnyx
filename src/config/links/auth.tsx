import { FrontendRoutes } from "../urls";

interface AuthLinks {
    label: string,
    href: string,
};

export const authLinks: AuthLinks[] = [
    { label: "Login", href: FrontendRoutes.auth.login.base},
    { label: "Join",  href: FrontendRoutes.auth.register.base,},
];