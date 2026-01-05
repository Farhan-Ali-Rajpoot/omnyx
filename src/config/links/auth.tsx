import { FrontendRoutes } from "../urls";

interface AuthLinks {
    name: string,
    link: string,
};

export const authLinks: AuthLinks[] = [
    { name: "Login", link: FrontendRoutes.auth.login.base},
    { name: "Join", link: FrontendRoutes.auth.register.base,},
];