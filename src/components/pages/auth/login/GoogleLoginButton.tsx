'use client';

import { wn } from "@/app/Meta";

const clientId = process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID;
const production_default_url = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_GOOGLE_REGISTER_REDIRECT_URL_PATH}`;
const development_default_url = `http://localhost:3000${process.env.NEXT_PUBLIC_GOOGLE_REGISTER_REDIRECT_URL_PATH}`

export default function GoogleSignInButton() {
    const redirect_uri = process.env.NODE_ENV === 'production' ? production_default_url : development_default_url;

    const handleRedirect = () => {
        if (!clientId) return;

        // Create a form to initiate the redirect
        const form = document.createElement('form');
        form.method = 'GET';
        form.action = 'https://accounts.google.com/o/oauth2/v2/auth';

        const params = {
            client_id: clientId,
            redirect_uri: redirect_uri,
            response_type: 'code',
            scope: 'openid email profile',
            access_type: 'offline',
            prompt: 'consent',
        };

        for (const [key, value] of Object.entries(params)) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
    };

    if (!clientId) {
        console.error('Google Client ID is missing from environment variables');
        return (
            <div className="text-[calc(var(--color-text-action))] flex items-center justify-center gap-[calc(var(--sfu)*0.5)]
                py-[calc(var(--sfu)*0.65)] px-[calc(var(--sfu)*0.9)]
                rounded-[calc(var(--sfu)*0.25)] w-full transition-all">
                Google sign-in currently not available
            </div>
        );
    }

    return (
        <div
            onClick={handleRedirect}
            className="flex items-center justify-center gap-[calc(var(--sfu)*0.5)]
                py-[calc(var(--sfu)*0.65)] px-[calc(var(--sfu)*0.9)]
                rounded-[calc(var(--sfu)*0.25)] border border-[var(--color-border-surface)] 
                bg-[var(--color-bg-input)]                
                w-full transition-all focus:outline-none cursor-pointer
                "
        >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign up with Google
        </div>
    );
}