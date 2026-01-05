'use client'

import { FaTrash, FaArrowLeft, FaSpinner } from 'react-icons/fa'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { secFetch } from '@/libs/secFetch'

const DeleteAccountPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('id')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleDelete = async () => {
    if (!isConfirmed) {
      setError('Please confirm deletion by checking the box')
      return
    }

    if (!userId) {
      setError('User ID is missing')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await secFetch('/api/auth/delete-account', {
        method: 'POST',
        service: 'auth',
        body: JSON.stringify({ userId })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Account deletion failed')
      }

      // Force full page reload to clear all client-side state
      window.location.href = '/'
    } catch (err: any) {
      console.error('Deletion error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
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
            <div className="p-3 rounded-full bg-red-900/20 border border-red-800/50">
              <FaTrash className="text-red-500 text-lg" />
            </div>
            <h1 className="text-2xl font-light text-white">Delete Account</h1>
          </div>

          <div className="space-y-6">
            <p className="text-neutral-400">
              This will permanently delete your account and all associated data. 
              <span className="text-red-400 font-medium"> This action cannot be undone.</span>
            </p>

            {/* Confirmation checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="confirmDelete"
                checked={isConfirmed}
                onChange={(e) => {
                  setIsConfirmed(e.target.checked)
                  setError(null)
                }}
                className="mt-1 h-4 w-4 rounded border-neutral-700 bg-neutral-800 focus:ring-red-500 text-red-600"
              />
              <label htmlFor="confirmDelete" className="text-sm text-neutral-300">
                I understand that this will permanently delete my account and all data.
              </label>
            </div>

            {/* Error message */}
            {error && (
              <div className="text-red-400 text-sm py-2 px-4 rounded bg-red-900/20 border border-red-800/50">
                {error}
              </div>
            )}

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
                onClick={handleDelete}
                disabled={isSubmitting || !isConfirmed}
                className={`cursor-pointer flex-1 py-3 px-6 rounded flex items-center justify-center gap-2 transition-colors ${
                  isSubmitting
                    ? 'bg-red-900/50 text-red-400 cursor-not-allowed'
                    : 'bg-red-900/30 text-red-400 hover:bg-red-900/40 hover:text-red-300 border border-red-800/50'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash />
                    Delete Account
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

export default DeleteAccountPage