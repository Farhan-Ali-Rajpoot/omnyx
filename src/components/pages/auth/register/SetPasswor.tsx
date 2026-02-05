'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BsStars } from 'react-icons/bs';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { secFetch } from '@/libs/secFetch';


interface GoogleUser {
    email: string;
    name: string;
    picture: string;
}

export default function SetPassword() {
    const [user, setUser] = useState<GoogleUser | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getCookie = () => {
            try {
                const cookie = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('temp_google_user='));

                if (!cookie) {
                    setError('No Google user data found. Please sign up again.');
                    setLoading(false);
                    return;
                };

                const cookieValue = cookie.split('=')[1];
                const userData = JSON.parse(decodeURIComponent(cookieValue));
                setUser(userData);
                setLoading(false);
            } catch (err) {
                console.error('Error parsing user data:', err);
                setError('Invalid user data. Please try again.');
                setLoading(false);
            }
        };

        const timer = setTimeout(getCookie, 100);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await secFetch('/api/auth/register/google', {
                method: 'POST',
                service: 'auth',
                body: JSON.stringify(user),
            });

            if (res.ok) {
                setUser(null);
                router.push('/');
            } else {
                const text = await res.text();
                const data = text ? JSON.parse(text) : null;
                setError(data?.error || 'Something went wrong!');
            }
        } catch (err: any) {
            console.error('Submission error:', err);
            setError(err?.message || 'Something went wrong!');
        } finally{
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser: any) => ({
            ...prevUser,
            [name]: value
        }));
    };

    if (loading) {
        return (
            <div className="rounded-2xl p-8 w-full max-w-md bg-white border border-gray-200 text-center">
                <p className="text-sm text-gray-500">Loading user info...</p>
            </div>

        );
    }

    return (
        <div className="rounded-2xl w-full max-w-md  p-4">
            <div className="mb-8 text-start">
                <div className="flex items-center gap-2">
                    <BsStars className="text-purple-500" />
                    <h1 className="text-2xl font-medium text-neutral-900 tracking-tight">
                        Complete Sign Up
                    </h1>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                    Secure your account with a password
                </p>
            </div>

            { error ? (
                <div className="py-3 px-4 text-sm rounded-md text-red-600 bg-red-50 border border-red-200 mb-6">
                    {error}
                    <button
                        onClick={() => router.push('/auth/register')}
                        className="mt-2 text-purple-600 hover:underline cursor-pointer block text-xs"
                    >
                        Go back to signup
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

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="password"
                                className="text-xs text-gray-500 uppercase"
                            >
                                Create Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                required
                                minLength={7}
                                maxLength={70}
                                onChange={handleChange}
                                className="toggle-password py-2 px-3 text-sm rounded-md bg-neutral-200 focus:outline-none w-full border border-neutral-300 focus:ring-1 focus:ring-neutral-900 transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            className="form-submit-button relative flex items-center justify-center py-2 px-3 rounded-sm text-white bg-neutral-900 active:bg-neutral-800 text-sm w-full transition-all focus:outline-none cursor-pointer"
                        >
                            <span className="form-submit-button-text">Continue</span>

                            {/* Spinner */}
                            <span className="form-submit-button-loader my-0.5 ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin hidden"></span>
                        </button>
                    </form>
                </>
            ) : null}
        </div>
    );

}






