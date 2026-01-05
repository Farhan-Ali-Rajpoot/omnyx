import React from 'react'
import { FaShieldAlt, FaEnvelope, FaServer, FaUsers } from 'react-icons/fa'
import Link from 'next/link'
import type { Metadata, Viewport } from 'next';
import { wn, favicon, shortcutIcon, appleIcon, themeColor, ogImageUrl, ogTwitterImage, applicationName, authorName, category } from '@/app/Meta';


export const metadata: Metadata = {
    title: 'Privacy Policy - Tendor - A Web Developer community that provides good desgined website.',
    description:
        `Tendor is a vibrant web developer community dedicated to crafting beautifully designed, high-performance websites. We bring together designers, developers, and digital creators to share knowledge, collaborate on projects, and elevate web standards.`

,
    keywords: [
        'Tendor',
        'Web developer service',
        'admin login page',
        'Web developer',
        'admin dashboard',
    ],
    metadataBase: new URL(wn), // already a URL object
    applicationName: applicationName,
    category: category,
    authors: [{ name: authorName, url: wn.toString() }],
    openGraph: {
        title: 'Privacy Policy - Tendor - A Web Developer community that provides good desgined website.',
        description:
            `Tendor is a vibrant web developer community dedicated to crafting beautifully designed, high-performance websites. We bring together designers, developers, and digital creators to share knowledge, collaborate on projects, and elevate web standards.`,
        url: `${wn}/blog`,
        siteName: applicationName,
        images: [
            {
                url: `${wn}${ogImageUrl}`,
                width: 736,
                height: 727,
                alt: 'Admin Login Page - Tendor',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Privacy policy - Tendor - A Web Developer community that provides good desgined website.',
        description:
            '`Tendor is a vibrant web developer community dedicated to crafting beautifully designed, high-performance websites. We bring together designers, developers, and digital creators to share knowledge, collaborate on projects, and elevate web standards.`',
        images: [`${wn}${ogTwitterImage}`],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            nocache: false,
        },
    },
    icons: {
        icon: favicon,
        shortcut: shortcutIcon,
        apple: appleIcon,
    },
    alternates: {
        canonical: `${wn}/blog`,
    },
};

export const viewport: Viewport = {
    themeColor: `${themeColor}`,
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};





const page = () => {
  return (
    <div className="text-white pt-28 pb-24 px-6 md:px-12 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b border-neutral-800 pb-12 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FaShieldAlt className="text-neutral-400" />
            <h1 className="text-4xl font-light tracking-tight">Privacy Policy</h1>
          </div>
          <p className="text-neutral-400">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="space-y-16">
          {/* Introduction */}
          <section>
            <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">1. Introduction</h2>
            <p className="text-neutral-400 leading-relaxed">
              Tendor is a cloud-based community platform designed for secure collaboration.
              This policy explains how we handle your information with the utmost respect for your privacy.
            </p>
          </section>

          {/* Information Collected */}
          <section>
            <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">2. Information Collected</h2>
            <ul className="space-y-3 text-neutral-400">
              <li className="flex items-start">
                <span className="inline-block w-1 h-1 mt-2 mr-2 bg-neutral-400 rounded-full"></span>
                <span><strong>Account Data:</strong> Name, email, profile information</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1 h-1 mt-2 mr-2 bg-neutral-400 rounded-full"></span>
                <span><strong>Community Data:</strong> Posts, comments, and collaborations</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1 h-1 mt-2 mr-2 bg-neutral-400 rounded-full"></span>
                <span><strong>Technical Data:</strong> IP address, device information, usage metrics</span>
              </li>
            </ul>
          </section>

          {/* Data Usage */}
          <section>
            <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">3. Data Usage</h2>
            <div className="grid md:grid-cols-2 gap-6 text-neutral-400">
              <div className="flex items-start">
                <FaServer className="mt-1 mr-3 text-neutral-500 flex-shrink-0" />
                <span>To provide and maintain our cloud services</span>
              </div>
              <div className="flex items-start">
                <FaUsers className="mt-1 mr-3 text-neutral-500 flex-shrink-0" />
                <span>To enable community features and collaboration</span>
              </div>
            </div>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">4. Data Protection</h2>
            <p className="text-neutral-400 mb-4 leading-relaxed">
              We implement enterprise-grade security measures including:
            </p>
            <ul className="space-y-3 text-neutral-400">
              <li className="flex items-start">
                <span className="inline-block w-1 h-1 mt-2 mr-2 bg-neutral-400 rounded-full"></span>
                <span>End-to-end encryption for sensitive data</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1 h-1 mt-2 mr-2 bg-neutral-400 rounded-full"></span>
                <span>Regular security audits and penetration testing</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1 h-1 mt-2 mr-2 bg-neutral-400 rounded-full"></span>
                <span>Strict access controls and authentication protocols</span>
              </li>
            </ul>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">5. Your Rights</h2>
            <p className="text-neutral-400 leading-relaxed">
              You have the right to access, correct, or delete your personal data.
              Community content may be retained as part of collaborative works.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">6. Contact</h2>
            <Link 
              href="/help/contact" 
              className="inline-flex items-center text-neutral-400 hover:text-white transition-colors"
            >
              <FaEnvelope className="mr-2" />
              Privacy inquiries
            </Link>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-neutral-800 text-center text-sm text-neutral-500">
          By using Tendor, you acknowledge this Privacy Policy.
        </div>
      </div>
    </div>
  )
}

export default page