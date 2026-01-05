import React from 'react'
import Link from 'next/link'
import { FaSignInAlt } from 'react-icons/fa'

const NotLoggedIn = () => {
    return (
        <div className="min-h-screen w-full py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md mt-[min(10vh,100px)] mb-16">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Access Required</h1>
                    <p className="text-gray-500 mt-2">Please login to view this page</p>
                </div>

                <div className="space-y-6">
                    <div className="py-3 px-5 text-base rounded-full text-center text-gray-600 bg-gray-50 w-full border border-gray-200">
                        You need to be logged in to access this page.
                    </div>

                    <Link
                        href="/auth/login"
                        className="flex items-center justify-center py-3 px-6 rounded-full text-white bg-black border-neutral-900 hover:bg-neutral-900 active:bg-neutral-800 text-lg w-full transition-all focus:outline-none cursor-pointer"
                    >
                        <FaSignInAlt className="mr-2" />
                        Go to Login Page
                    </Link>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        {`Don't have an account?`}{' '}
                        <Link href="/auth/register" className="font-medium text-purple-600 hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotLoggedIn;