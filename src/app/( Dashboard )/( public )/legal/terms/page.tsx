import React from 'react'
import { FaExternalLinkAlt, FaEnvelope, FaLock, FaShieldAlt } from 'react-icons/fa'
import Link from 'next/link'
import type { Metadata, Viewport } from 'next';
import { wn, favicon, shortcutIcon, appleIcon, themeColor, ogImageUrl, ogTwitterImage, applicationName, authorName, category } from '@/app/Meta';


export const metadata: Metadata = {
    title: 'Change Password - Tendor - A Web Developer community that provides good desgined website.',
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
        title: 'Terms Policy - Tendor - A Web Developer community that provides good desgined website.',
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
        title: 'Terms Policy - Tendor - A Web Developer community that provides good desgined website.',
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
          <h1 className="text-4xl font-light tracking-tight mb-4">Terms of Service</h1>
          <p className="text-neutral-400">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="space-y-16">
          {/* 1. Acceptance */}
          <section>
            <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">1. Acceptance</h2>
            <p className="text-neutral-400 leading-relaxed">
              By accessing Tendor's cloud platform, you agree to these terms. Discontinue use if you disagree.
            </p>
          </section>

          {/* 2. Platform Purpose */}
          <section>
            <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">2. Platform Purpose</h2>
            <p className="text-neutral-400 leading-relaxed">
              Tendor provides secure cloud-based collaboration tools for teams and communities.
            </p>
          </section>

          {/* 3. Data Security */}
          <section>
            <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-4 flex items-center gap-2">
              <FaShieldAlt className="text-neutral-500" />
              3. Data Protection
            </h2>
            <p className="text-neutral-400 mb-4 leading-relaxed">
              We implement enterprise-grade security measures:
            </p>
            <ul className="space-y-3 text-neutral-400">
              <li className="flex items-start">
                <span className="inline-block w-1 h-1 mt-2 mr-2 bg-neutral-400 rounded-full"></span>
                <span>End-to-end encryption for all sensitive data</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1 h-1 mt-2 mr-2 bg-neutral-400 rounded-full"></span>
                <span>Regular third-party security audits</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1 h-1 mt-2 mr-2 bg-neutral-400 rounded-full"></span>
                <span>Strict access controls with multi-factor authentication</span>
              </li>
            </ul>
          </section>

          {/* 4. User Responsibilities */}
          <section>
            <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">4. User Conduct</h2>
            <p className="text-neutral-400 mb-4 leading-relaxed">
              You agree not to:
            </p>
            <ul className="space-y-3 text-neutral-400">
              <li className="flex items-start">
                <span className="inline-block w-1 h-1 mt-2 mr-2 bg-neutral-400 rounded-full"></span>
                <span>Violate any laws or third-party rights</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1 h-1 mt-2 mr-2 bg-neutral-400 rounded-full"></span>
                <span>Disrupt service or compromise system integrity</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1 h-1 mt-2 mr-2 bg-neutral-400 rounded-full"></span>
                <span>Share login credentials or access tokens</span>
              </li>
            </ul>
          </section>

          {/* 5. Intellectual Property */}
          <section>
            <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">5. Ownership</h2>
            <p className="text-neutral-400 leading-relaxed">
              Tendor retains all rights to platform code and infrastructure. Users retain ownership of their content.
            </p>
          </section>

          {/* 6. Account Management */}
          <section>
            <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">6. Accounts</h2>
            <p className="text-neutral-400 leading-relaxed">
              You're responsible for maintaining account security. We may suspend accounts violating these terms.
            </p>
          </section>

          {/* 7. Liability */}
          <section>
            <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">7. Limitations</h2>
            <p className="text-neutral-400 leading-relaxed">
              Tendor isn't liable for indirect damages from service interruptions, within legal limits.
            </p>
          </section>

          {/* 8. Changes */}
          <section>
            <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">8. Modifications</h2>
            <p className="text-neutral-400 leading-relaxed">
              We may update these terms with 30 days notice. Continued use constitutes acceptance.
            </p>
          </section>

          {/* 9. Contact */}
          <section>
            <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">9. Contact</h2>
            <Link 
              href="/help/contact" 
              className="inline-flex items-center text-neutral-400 hover:text-white transition-colors"
            >
              <FaEnvelope className="mr-2" />
              Legal inquiries
            </Link>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-neutral-800 text-center text-sm text-neutral-500">
          By using Tendor, you acknowledge reading and agreeing to these Terms.
        </div>
      </div>
    </div>
  )
}


export default page