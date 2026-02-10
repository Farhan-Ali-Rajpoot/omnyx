export const appBaseUrl: string = `https://agencytendor.vercel.app`;

export const FrontendAuthRoute: string = `/auth`;
export const FrontedLegalRoute: string = `/legal`;
export const FrontedHelpRoute: string = `/help`;
export const FrontedAppRoute: string = `/app`;

export const FrontendLoginRoute: string = `${FrontendAuthRoute}/login`;
export const FrontendRegisterRoute: string = `${FrontendAuthRoute}/register`;

export const FrontendResetPasswordRoute: string = `${FrontendLoginRoute}/reset-password`;
const FrontendAccountRoute: string = `${FrontedAppRoute}/account`;

export const FrontendRoutes = {
  home: "/",
  auth: {
    register: {
      base: FrontendRegisterRoute,
      codeVerification: `${FrontendRegisterRoute}/verify-code`,
      setPassword: `${FrontendRegisterRoute}/set-password`,
    },
    login: {
      base: FrontendLoginRoute,
      resetPassword: {
        base: FrontendResetPasswordRoute,
        verifyCode: `${FrontendResetPasswordRoute}/verify-code`,
        setNewPassword: `${FrontendResetPasswordRoute}/set-new-password`,
      },
    },
  },
  legal: {
    terms: `${FrontedLegalRoute}/terms`,
    privacy: `${FrontedLegalRoute}/privacy`,
    cookies: `${FrontedLegalRoute}/cookies`,
    license: `${FrontedLegalRoute}/license`,
  },
  help: {
    contact: `${FrontedHelpRoute}/contact`,
  },
  app: {
    base: FrontedAppRoute,
    account: {
      base: FrontendAccountRoute,
    },
    services: `${FrontedAppRoute}/services`,
    work: `${FrontedAppRoute}/work`,
  },
};

export const BackendAuthRoute: string = `/api/auth`;
export const BackendRegisterRoute: string = `${BackendAuthRoute}/register`;
export const BackendLoginRoute: string = `${BackendAuthRoute}/login`;
export const BackendResetPasswordRoute: string = `${BackendLoginRoute}/reset-password`;

export const BackendRoutes = {
  auth: {
    register: {
      base: BackendRegisterRoute,
      codeVerification: `${BackendRegisterRoute}/verify-registration-code`,
      resendCode: `${BackendRegisterRoute}/resend-code`,
    },
    login: {
      base: BackendLoginRoute,
      resetPassword: {
        base: BackendResetPasswordRoute,
        verifyCode: `${BackendResetPasswordRoute}/verify-code`,
        setNewPassowrd: `${BackendResetPasswordRoute}/set-new-password`,
      },
    },
  },
};
