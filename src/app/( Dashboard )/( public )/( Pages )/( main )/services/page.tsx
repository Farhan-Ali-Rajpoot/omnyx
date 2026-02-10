import Link from 'next/link'
import React from 'react'
import { FiSearch, FiCode, FiLayers, FiPackage } from 'react-icons/fi'
import { wn, favicon, shortcutIcon, appleIcon, themeColor, ogImageUrl, ogTwitterImage, applicationName, authorName, category } from '@/app/Meta';
import { Metadata, Viewport } from 'next';



export const metadata: Metadata = {
    title: 'Services - Tendor - A Web Developer community that provides good desgined website.',
    description:
        `Services - Tendor is a vibrant web developer community dedicated to crafting beautifully designed, high-performance websites. We bring together designers, developers, and digital creators to share knowledge, collaborate on projects, and elevate web standards.`

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
        title: 'Services - Tendor - A Web Developer community that provides good desgined website.',
        description:
            `Services - Tendor is a vibrant web developer community dedicated to crafting beautifully designed, high-performance websites. We bring together designers, developers, and digital creators to share knowledge, collaborate on projects, and elevate web standards.`,
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
        title: 'Services - Tendor - A Web Developer community that provides good desgined website.',
        description:
            '`Services - Tendor is a vibrant web developer community dedicated to crafting beautifully designed, high-performance websites. We bring together designers, developers, and digital creators to share knowledge, collaborate on projects, and elevate web standards.`',
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





const ServicesPage = () => {
  return (
    <div className="pt-28 pb-24 px-6 md:px-12 lg:px-12 min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-medium mb-4">Our Services</h1>
          <p className="text-neutral-400 text-lg">
            We offer specialized solutions to elevate your digital presence. Each service is crafted 
            to deliver exceptional results for your business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {/* SEO Service Card */}
          <div className="service-card">
            <div className="icon-container mb-6">
              <FiSearch className="text-3xl text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-medium mb-3">SEO Optimization</h3>
            <p className="text-neutral-400 mb-6">
              Boost your visibility with our data-driven SEO strategies that drive organic traffic 
              and improve search rankings.
            </p>
            <Link href="/help/contact" className="px-6 py-2 border border-neutral-700 text-sm font-medium tracking-wide hover:bg-white hover:text-black transition-all">
              Get Consultation
            </Link>
          </div>

          {/* UI/UX Card */}
          <div className="service-card ">
            <div className="icon-container mb-6">
              <FiLayers className="text-3xl text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-medium mb-3">UI/UX Design</h3>
            <p className="text-neutral-400 mb-6">
              Beautiful, intuitive interfaces designed to enhance user experience and drive 
              engagement with your product.
            </p>
            <Link href="/help/contact" className="px-6 py-2 border border-neutral-700 text-sm font-medium tracking-wide hover:bg-white hover:text-black transition-all">
              Get Consultation
            </Link>
          </div>

          {/* Custom Features Card */}
          <div className="service-card">
            <div className="icon-container mb-6">
              <FiCode className="text-3xl text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-medium mb-3">Custom Features</h3>
            <p className="text-neutral-400 mb-6">
              Tailored functionality built specifically for your needs to give you a competitive 
              edge in your market.
            </p>
            <Link href='/help/contact' className="px-6 py-2 border border-neutral-700 text-sm font-medium tracking-wide hover:bg-white hover:text-black transition-all">
              Get Consultation
            </Link>
          </div>
        </div>

        {/* Mega Offer Card */}
        <div className="relative overflow-hidden border border-neutral-800 rounded-lg p-8 md:p-12 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a]">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center mb-4">
              <FiPackage className="text-2xl mr-3 text-blue-400" />
              <span className="text-sm uppercase tracking-wider text-blue-400">Special Offer</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-medium mb-4">All-In-One Package</h2>
            <p className="text-neutral-400 mb-6 text-lg">
              Get all three services together at a discounted rate. Perfect for startups and businesses 
              looking for a complete digital transformation.
            </p>
            <Link href="/help/contact" className="px-8 py-3 bg-white hover:bg-neutral-200 text-black cursor-pointer font-medium tracking-wide transition-colors flex items-center">
              Get Consultation
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage