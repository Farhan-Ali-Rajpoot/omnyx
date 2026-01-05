export const Tokens = {
  user: {
    session: {
      secret: process.env.JWT_USER_SESSION_SECRET!,
      cookieName: "usr_ssn",
      expiresIn: "90d", // user session token
    },

    verification: {
      register: {
        secret: process.env.JWT_USER_REGISTER_VERIFICATION_SECRET!,
        cookieName: "usr_rgt",
        expiresIn: "15m"
      },
      passwordReset: {
        secret: process.env.JWT_USER_PASSWORD_RESET_VERIFICATION_SECRET!,
        cookieName: "usr_vrf",
        expiresIn: "15m", // user email-verification token
      },
    },

    recovery: {
      password: {
        secret: process.env.JWT_USER_PASSWORD_RECOVERY_SECRET!,
        cookieName: "usr_rcv",
        expiresIn: "15m", // user password-reset token
      },
    },

    intermediate: {
      secret: process.env.JWT_INTERMEDIATE_USER_SECRET!,
      cookieName: "usr_tmp",
      expiresIn: "15m", // user temporary multi-step token
    },
  },

  admin: {
    session: {
      secret: process.env.JWT_ADMIN_SESSION_SECRET!,
      cookieName: "adm_ssn",
      expiresIn: "90d", // admin session token
    },

    verification: {
      secret: process.env.JWT_ADMIN_VERIFICATION_SECRET!,
      cookieName: "adm_vrf",
      expiresIn: "15m", // admin code-verification token
    },

    recovery: {
      secret: process.env.JWT_ADMIN_RECOVERY_SECRET!,
      cookieName: "adm_rcv",
      expiresIn: "15m", // admin password-reset token
    },

    intermediate: {
      secret: process.env.JWT_INTERMEDIATE_ADMIN_SECRET!,
      cookieName: "adm_tmp",
      expiresIn: "15m", // admin temporary multi-step token
    },
  },
} as const;

export type TokenKeyType = keyof typeof Tokens;
export interface TokenType {
  secret: string;
  cookieName: string;
  expiresIn: string | number;
}
