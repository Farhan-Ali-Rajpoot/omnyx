// src/config/routes.rs (or wherever you place this)

pub const APP_BASE_URL: &str = "https://agencytendor.vercel.app";

/// Frontend Route Definitions
pub mod frontend {
    pub const HOME: &str = "/";

    pub mod auth {
        pub mod register {
            pub const BASE: &str = "/auth/register";
            pub const CODE_VERIFICATION: &str = "/auth/register/verify-code";
            pub const SET_PASSWORD: &str = "/auth/register/set-password";
        }

        pub mod login {
            pub const BASE: &str = "/auth/login";

            pub mod reset_password {
                pub const BASE: &str = "/auth/login/reset-password";
                pub const VERIFY_CODE: &str = "/auth/login/reset-password/verify-code";
                pub const SET_NEW_PASSWORD: &str = "/auth/login/reset-password/set-new-password";
            }
        }
    }

    pub mod legal {
        pub const TERMS: &str = "/legal/terms";
        pub const PRIVACY: &str = "/legal/privacy";
        pub const COOKIES: &str = "/legal/cookies";
        pub const LICENSE: &str = "/legal/license";
    }

    pub mod help {
        pub const CONTACT: &str = "/help/contact";
    }

    pub mod app {
        pub const BASE: &str = "/app";
        pub const SERVICES: &str = "/app/services";
        pub const WORK: &str = "/app/work";

        pub mod account {
            pub const BASE: &str = "/app/account";
        }
    }
}

/// Backend API Route Definitions
pub mod backend {
    pub mod auth {
        pub mod register {
            pub const BASE: &str = "/api/auth/register";
            pub const CODE_VERIFICATION: &str = "/api/auth/register/verify-registration-code";
            pub const RESEND_CODE: &str = "/api/auth/register/resend-code";
        }

        pub mod login {
            pub const BASE: &str = "/api/auth/login";

            pub mod reset_password {
                pub const BASE: &str = "/api/auth/login/reset-password";
                pub const VERIFY_CODE: &str = "/api/auth/login/reset-password/verify-code";
                pub const SET_NEW_PASSWORD: &str = "/api/auth/login/reset-password/set-new-password";
            }
        }
    }
}