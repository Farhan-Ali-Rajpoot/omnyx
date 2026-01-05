'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BsStars } from 'react-icons/bs';

interface GoogleUser {
    email: string;
    name: string;
    picture: string;
    exists: boolean;
}

function VerifyUser() {
    const [user, setUser] = useState<GoogleUser | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getCookieData = () => {
            try {
                const cookie = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('google_user_info='));

                if (!cookie) {
                    setError('No Google user data found. Please try logging in again.');
                    setLoading(false);
                    return;
                }

                const cookieValue = cookie.split('=')[1];
                const parsed = JSON.parse(decodeURIComponent(cookieValue));

                const userData: GoogleUser = {
                    email: parsed.user?.email || parsed.email || parsed.google?.email || '',
                    name: parsed.user?.name || parsed.name || parsed.google?.name || '',
                    picture: parsed.user?.picture || parsed.picture || parsed.google?.picture || '',
                    exists: parsed.exists,
                };

                setUser(userData);
                setLoading(false);
            } catch (err) {
                console.error('Failed to parse user cookie:', err);
                setError('Invalid user data. Please try again.');
                setLoading(false);
            }
        };

        // Slight delay to ensure cookie is set before reading
        const timer = setTimeout(getCookieData, 100);
        return () => clearTimeout(timer);
    }, []);

    const handleContinue = () => {
        router.push('/');
    };

  if (loading) {
    return (
        <div className="rounded-2xl p-8 w-full max-w-md bg-white">
            <p className="text-gray-500">Loading user info...</p>
        </div>
    );
}

return (
    <div className="rounded-2xl p-8 w-full max-w-md">
        <div className="mb-8 text-start">
            <div className="flex items-center gap-2">
                <BsStars className="text-purple-500" />
                <h1 className="text-2xl font-medium text-neutral-900 tracking-tight">
                    Verify Your Account
                </h1>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
                We've received your Google login details
            </p>
        </div>

        {error ? (
            <div className="py-3 px-5 text-sm rounded-full text-red-600 bg-red-50 w-full border border-red-200 mb-6">
                {error}
                <button
                    onClick={() => router.push('/auth/login')}
                    className="mt-1 text-purple-600 hover:underline cursor-pointer block text-xs"
                >
                    Back to Login
                </button>
            </div>
        ) : user ? (
            <>
                <div className="flex flex-col items-center space-y-3 mb-6">
                    <Image
                        src={user.picture}
                        alt={user.name}
                        width={80}
                        height={80}
                        className="rounded-full border-2 border-purple-100"
                    />
                    <p className="text-gray-800 font-medium">{user.name}</p>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                </div>

                {user.exists ? (
                    <button
                        onClick={handleContinue}
                        className="py-2 px-3 rounded-sm text-white bg-neutral-900 active:bg-neutral-800 text-sm w-full transition-all focus:outline-none cursor-pointer"
                    >
                        Continue to Dashboard
                    </button>
                ) : (
                    <div className="space-y-4">
                        <p className="text-red-500 text-sm text-center">
                            No account exists for this Google email
                        </p>
                        <div className="flex flex-col items-center space-y-3">
                            <button
                                onClick={() => router.push('/auth/register')}
                                className="text-purple-600 hover:underline text-sm"
                            >
                                Create New Account
                            </button>
                            <button
                                onClick={() => router.push('/auth/login')}
                                className="text-neutral-500 hover:underline text-xs"
                            >
                                Back to Login
                            </button>
                        </div>
                    </div>
                )}
            </>
        ) : null}
    </div>
);
}

export default VerifyUser;
