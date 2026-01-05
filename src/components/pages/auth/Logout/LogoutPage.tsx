'use client'

import { FaSignOutAlt, FaArrowLeft, FaSpinner } from 'react-icons/fa'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { Notify } from '@/components/UI/Notify/Notify'
import { secFetch } from '@/libs/secFetch'

const LogoutPage = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const handleLogout = async () => {
    setIsSubmitting(true)
    try {
      const response = await secFetch('/api/auth/logout', {
        method: 'POST',
        service: 'auth',
        body: JSON.stringify({ userId: id })
      })

      if (!response.ok) {
        Notify({
          type: 'error',
          title: 'Logout Failed',
          message: "Failed to logout",
          duration: 4000
        });
        return
      }

      Notify({
          type: 'success',
          title: 'Successfukky Logout',
          message: "SucessFully Logout. If changes not happend then Refresh your page.",
          duration: 4000
        });

      // Force full page reload to clear all client-side state
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
      Notify({
          type: 'error',
          title: 'Logout Failed',
          message: "Failed to logout",
          duration: 4000
        });
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full py-24 px-6 md:px-12 flex items-center justify-center">
      <div className="max-w-md w-full relative">
        {/* Back button */}
        <Link 
          href="/user/profile" 
          className="group absolute -top-16 left-0 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-300"
        >
          <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
          <span>Back to profile</span>
        </Link>

        {/* Main content */}
        <div className="border border-neutral-800 rounded-xl p-8 bg-neutral-950/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-purple-900/20 border border-purple-800/50">
              <FaSignOutAlt className="text-purple-500 text-lg" />
            </div>
            <h1 className="text-2xl font-light text-white">Confirm Logout</h1>
          </div>

          <div className="space-y-6">
            <p className="text-neutral-400">
              Are you sure you want to sign out? You'll need to log in again to access your account.
            </p>

            {/* Action buttons */}
            <div className="flex gap-4 pt-2">
              <button
                onClick={() => router.back()}
                disabled={isSubmitting}
                className="cursor-pointer flex-1 py-3 px-6 rounded border border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isSubmitting}
                className={`cursor-pointer flex-1 py-3 px-6 rounded flex items-center justify-center gap-2 transition-colors ${
                  isSubmitting
                    ? 'bg-purple-900/50 text-purple-400 cursor-not-allowed'
                    : 'bg-purple-900/30 text-purple-400 hover:bg-purple-900/40 hover:text-purple-300 border border-purple-800/50'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Signing Out...
                  </>
                ) : (
                  <>
                    <FaSignOutAlt />
                    Log Out
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoutPage