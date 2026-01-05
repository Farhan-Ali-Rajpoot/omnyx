import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';


export const dynamic = 'force-dynamic';
const production_default_url = `${process.env.NEXT_PUBLIC_BASR_URL}{process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT_URL_PATH}`;
const development_default_url = `http://localhost:3000${process.env.NEXT_PUBLIC_GOOGLE_REGISTER_REDIRECT_URL_PATH}`

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
        return NextResponse.json({ error: 'Access Denied by user or Google' });
    }

    if (!code) {
        return NextResponse.json({ error: 'No authorization code provided by Google' });
    }

    try {
        const redirect_uri =
            process.env.NODE_ENV === 'development'
                ? development_default_url
                : production_default_url;

        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_AUTH_CLIENT_ID! ,
                client_secret: process.env.GOOGLE_AUTH_CLIENT_SECRET! ,
                redirect_uri,
                grant_type: 'authorization_code',
            }),
        });

        const tokens = await tokenResponse.json();

        if (!tokenResponse.ok) {
            console.error('Failed to exchange code:', tokens);
            throw new Error(tokens.error || 'Failed to exchange code for tokens');
        }

        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
        });

        const userInfo = await userInfoResponse.json();

        if (!userInfoResponse.ok) {
            console.error('Failed to fetch user info:', userInfo);
            throw new Error(userInfo.error || 'Failed to fetch user info');
        }

        // Prepare user info object you want to pass
        const user = {
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture,
            provider: 'google',
            providerId: userInfo.id,
        };

        // Save user info in a cookie (JSON stringify + encode)
        const cookieStore = (await cookies());
        cookieStore.set('temp_google_user', JSON.stringify(user), {
            path: '/', // accessible anywhere on your site
            maxAge: 60 * 5, // expire in 5 minutes
            httpOnly: false, // accessible by client-side JS, so you can read it in the set-password page
            secure: process.env.NODE_ENV === 'production',
        });

        // Redirect user to set-password page where they will finalize registration
        return NextResponse.redirect(new URL('/auth/register/google/set-password', request.url));
    } catch (err) {
        console.error('Google callback error:', err);
        return NextResponse.redirect(
            new URL(
                `/auth/login?error=${encodeURIComponent(
                    err instanceof Error ? err.message : 'Authentication failed'
                )}`,
                request.url
            )
        );
    }
}
