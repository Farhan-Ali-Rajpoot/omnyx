'use client'

import { useState } from 'react'
import { FaPaperPlane, FaUser, FaEnvelope, FaComment, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const ContactPage = () => {
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const authSecret = process.env.NEXT_PUBLIC_AUTH_HEADERS_SECRET;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError(null)
        setIsSubmitting(true)
        setSuccess(false)

        const formData = new FormData(event.currentTarget)
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            message: formData.get('message') as string
        }

        try {
            // Basic client-side validation
            if (!data.name || !data.email || !data.message) {
                throw new Error('All fields are required')
            }

            if (!/^\S+@\S+\.\S+$/.test(data.email)) {
                throw new Error('Please enter a valid email address')
            }

            const response = await fetch('/api/help/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-secret': authSecret
                } as HeadersInit,
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Submission failed')
            }

            setSuccess(true)
            event.currentTarget.reset()
        } catch (err: any) {
            setError(err.message || 'Something went wrong')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-24">
            {/* Left Column - Form */}
            <div className="w-full md:w-1/2 h-full flex flex-col items-start pr-0 md:pr-12 mb-16 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-medium mb-6">Love to hear from you</h2>
                <p className="text-neutral-400 mb-8 max-w-md">
                    Have a project in mind or want to discuss potential collaboration?
                    Fill out the form and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                    {/* Name Input */}
                    <div className="relative group">
                        <div className="flex items-center mb-1">
                            <FaUser className="text-neutral-500 mr-2 text-sm" />
                            <label htmlFor="name" className="text-xs text-neutral-400">YOUR NAME</label>
                        </div>
                        <input
                            name="name"
                            id="name"
                            type="text"
                            className="peer w-full bg-transparent border-b border-neutral-700 py-2 px-0 text-white focus:outline-none transition-colors"
                            placeholder="John Doe"
                        />
                        <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 bg-white transition-transform duration-300 ease-out origin-left peer-focus:scale-x-100"></span>
                    </div>

                    {/* Email Input */}
                    <div className="relative group">
                        <div className="flex items-center mb-1">
                            <FaEnvelope className="text-neutral-500 mr-2 text-sm" />
                            <label htmlFor="email" className="text-xs text-neutral-400">EMAIL ADDRESS</label>
                        </div>
                        <input
                            name="email"
                            id="email"
                            type="email"
                            className="peer w-full bg-transparent border-b border-neutral-700 py-2 px-0 text-white focus:outline-none transition-colors"
                            placeholder="john@example.com"
                        />
                        <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 bg-white transition-transform duration-300 ease-out origin-left peer-focus:scale-x-100"></span>
                    </div>

                    {/* Message Textarea */}
                    <div className="relative group">
                        <div className="flex items-center mb-1">
                            <FaComment className="text-neutral-500 mr-2 text-sm" />
                            <label htmlFor="message" className="text-xs text-neutral-400">YOUR MESSAGE</label>
                        </div>
                        <textarea
                            name="message"
                            id="message"
                            rows={4}
                            className="peer w-full bg-transparent border-b border-neutral-700 py-2 px-0 text-white focus:outline-none transition-colors resize-none"
                            placeholder="Tell us about your project..."
                        />
                        <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 bg-white transition-transform duration-300 ease-out origin-left peer-focus:scale-x-100"></span>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="cursor-pointer flex items-center justify-center px-8 py-3 bg-white text-black text-sm font-medium tracking-wide hover:bg-neutral-100 transition-colors disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                'Sending...'
                            ) : (
                                <>
                                    Send Message
                                    <FaPaperPlane className="ml-2" />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Error & Success Messages */}
                    {error && (
                        <div className="text-red-400 text-sm mt-4">{error}</div>
                    )}
                    {success && (
                        <div className="text-green-400 text-sm mt-4">
                            Thank you! Your message has been sent successfully.
                        </div>
                    )}
                </form>

            </div>

            {/* Right Column - Contact Info */}
            <div className="w-full md:w-1/2 h-full pl-0 md:pl-12 border-t md:border-t-0 md:border-l border-neutral-800 pt-8 md:pt-0">
                <div className="space-y-8">
                    <div>
                        <h3 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">Contact Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <FaPhone className="text-neutral-400 mt-1 mr-3 text-sm" />
                                <div>
                                    <p className="text-neutral-400 text-sm">Phone</p>
                                    <p className="text-white">(+92) 3271323839</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <FaEnvelope className="text-neutral-400 mt-1 mr-3 text-sm" />
                                <div>
                                    <p className="text-neutral-400 text-sm">Email</p>
                                    <p className="text-white">midlelnight@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <FaMapMarkerAlt className="text-neutral-400 mt-1 mr-3 text-sm" />
                                <div>
                                    <p className="text-neutral-400 text-sm">Based in</p>
                                    <p className="text-white">Pakistan, Worldwide services</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">Business Inquiries</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-neutral-400 text-sm">Founder</p>
                                <p className="text-white">Farhan Ali Rajpoot</p>
                            </div>
                            <div>
                                <p className="text-neutral-400 text-sm">For careers</p>
                                <p className="text-white">midlelnight@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* <div>
                    <h3 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">Our Products</h3>
                    <div className="space-y-2">
                        <a href="#" className="text-white hover:text-neutral-300 transition-colors block">Tendor</a>
                        <a href="#" className="text-white hover:text-neutral-300 transition-colors block">Prodpost Studio</a>
                        <a href="#" className="text-white hover:text-neutral-300 transition-colors block">UI Components</a>
                    </div>
                </div> */}
                </div>
            </div>
        </div>
    )
}

export default ContactPage