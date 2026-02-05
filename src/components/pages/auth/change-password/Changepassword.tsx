'use client'

import { FaLock, FaArrowLeft, } from 'react-icons/fa'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Notify } from '@/components/UI/Notify/Notify'
import { secFetch } from '@/libs/secFetch'

const ChangePasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const AUTH_HEADER_SECRET = process.env.NEXT_PUBLIC_AUTH_HEADERS_SECRET || '';


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const currentPassword = formData.get('currentPassword') as string
    const newPassword = formData.get('newPassword') as string
    const confirmPassword = formData.get('confirmPassword') as string

    // Client-side validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return
    }

    if (newPassword.length < 7) {
      return
    }

    if (newPassword !== confirmPassword) {
      return
    }

    try {
      const response = await secFetch('/api/auth/change-password', {
        method: 'POST',
        service: 'auth',
        body: JSON.stringify({ id, currentPassword, newPassword })
      });

      const res = await response.json();

      if (!response.ok) {
        return
      };

      event.currentTarget.reset()

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/user/profile')
      }, 2000)

    } catch (err: any) {
    } finally {
    }
  }

  return (
    <div className="min-h-screen w-full py-24 px-6 md:px-12 mt-20">
      <div className="max-w-md mx-auto relative">
        {/* Back button */}
        <Link
          href="/user/profile"
          className="group absolute -top-16 left-0 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-300"
        >
          <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
          <span>Back to profile</span>
        </Link>

        {/* Form container */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-light text-white">Change Password</h1>
            <p className="text-neutral-400">Update your account password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div className="relative group">
              <div className="flex items-center mb-1">
                <FaLock className="text-neutral-500 mr-2 text-sm" />
                <label htmlFor="currentPassword" className="text-xs text-neutral-400">
                  CURRENT PASSWORD
                </label>
              </div>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                className="peer w-full bg-transparent border-b border-neutral-700 py-2 px-0 text-white focus:outline-none"
                // placeholder="Enter current password"
                minLength={7}
                required
              />
              <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 bg-white transition-transform duration-300 ease-out origin-left peer-focus:scale-x-100"></span>
            </div>

            {/* New Password */}
            <div className="relative group">
              <div className="flex items-center mb-1">
                <FaLock className="text-neutral-500 mr-2 text-sm" />
                <label htmlFor="newPassword" className="text-xs text-neutral-400">
                  NEW PASSWORD
                </label>
              </div>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                className="peer w-full bg-transparent border-b border-neutral-700 py-2 px-0 text-white focus:outline-none"
                // placeholder="At least 7 characters"
                minLength={7}
                required
              />
              <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 bg-white transition-transform duration-300 ease-out origin-left peer-focus:scale-x-100"></span>
            </div>

            {/* Confirm Password */}
            <div className="relative group">
              <div className="flex items-center mb-1">
                <FaLock className="text-neutral-500 mr-2 text-sm" />
                <label htmlFor="confirmPassword" className="text-xs text-neutral-400">
                  CONFIRM PASSWORD
                </label>
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="peer w-full bg-transparent border-b border-neutral-700 py-2 px-0 text-white focus:outline-none"
                // placeholder="Re-enter new password"
                minLength={7}
                required
              />
              <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 bg-white transition-transform duration-300 ease-out origin-left peer-focus:scale-x-100"></span>
            </div>

            {/* {error && ( */}
            <div className="form-error-element hidden py-2 px-3 text-sm rounded-md text-red-400 bg-red-500/10 w-full border border-red-500/40">
              {/* {error} */}
            </div>

            {/* )} */}

            {/* Submit button */}
            <button
              type="submit"
              className="form-submit-button relative flex items-center justify-center py-3 px-5 rounded-sm bg-white hover:bg-neutral-100 active:bg-neutral-200 text-base w-full transition-all focus:outline-none cursor-pointer"
            >
              <span className="form-submit-button-text text-black">Change Password</span>

              {/* Spinner */}
              <span className="form-submit-button-loader my-0.5 ml-2 w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin hidden"></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordPage