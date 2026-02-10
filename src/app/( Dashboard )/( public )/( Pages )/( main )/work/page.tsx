import React from 'react'
import { wn, favicon, shortcutIcon, appleIcon, themeColor, ogImageUrl, ogTwitterImage, applicationName, authorName, category } from '@/app/Meta';
import { Metadata, Viewport } from 'next';


export const metadata: Metadata = {
    title: 'Work - Tendor - A Web Developer community that provides good desgined website.',
    description:
        `Work - Tendor is a vibrant web developer community dedicated to crafting beautifully designed, high-performance websites. We bring together designers, developers, and digital creators to share knowledge, collaborate on projects, and elevate web standards.`

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
        title: 'Work - Tendor - A Web Developer community that provides good desgined website.',
        description:
            `Work - Tendor is a vibrant web developer community dedicated to crafting beautifully designed, high-performance websites. We bring together designers, developers, and digital creators to share knowledge, collaborate on projects, and elevate web standards.`,
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
        title: 'Work - Tendor - A Web Developer community that provides good desgined website.',
        description:
            '`Work - Tendor is a vibrant web developer community dedicated to crafting beautifully designed, high-performance websites. We bring together designers, developers, and digital creators to share knowledge, collaborate on projects, and elevate web standards.`',
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
    <div className="text-white pt-28 pb-24 px-6 md:px-12 lg:px-12 min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="border-b border-neutral-800 pb-12 mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-3">Our Work</h1>
          <p className="text-neutral-400 max-w-2xl">
            Portfolio under development. We're crafting our first case studies with the same precision we'll apply to your project.
          </p>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-24 border border-neutral-800 rounded-lg">
          <div className="text-center max-w-md px-6">
            <p className="text-sm uppercase tracking-widest text-neutral-500 mb-4">Coming Soon</p>
            <h2 className="text-2xl font-light mb-6">Case Studies in Progress</h2>
            <p className="text-neutral-400 mb-8">
              We're currently working with select clients to build impactful projects. 
              Our portfolio will showcase these collaborations soon.
            </p>
            <a
              href="/contact"
              className="inline-block border border-white px-8 py-3 text-sm font-light tracking-wider hover:bg-white hover:text-black transition duration-300"
            >
              Be Our First Feature
            </a>
          </div>
        </div>

        {/* Current Collaborations (optional) */}
        <div className="mt-24">
          <h3 className="text-sm uppercase tracking-widest text-neutral-500 mb-8">Currently Working With</h3>
          <div className="flex flex-wrap gap-8 items-center">
            {/* Placeholder for client logos - use actual <Image> tags */}
            <div className="h-8 w-32 bg-neutral-800"></div>
            <div className="h-8 w-32 bg-neutral-800"></div>
            <div className="h-8 w-32 bg-neutral-800"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page