import React from 'react'
// import AChangePasswordPage from '@/components/admin/profile/settings/AChangePassword';
import type { Metadata, Viewport } from 'next';
import { wn, favicon, shortcutIcon, appleIcon, themeColor, ogImageUrl, ogTwitterImage, applicationName, authorName, category } from '@/app/Meta';


export const metadata: Metadata = {
    title: 'Tendor',
    description:
        'Change Password - Tendor is a web developer service that provides an admin dashboard for managing web development projects and services.',
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
        title: 'Change Password  – TENDOR',
        description:
            'Admin Login Page - Tendor - Web developer community for managing web development projects and services.',
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
        title: 'Admin Login Page - Tendor',
        description:
            'Change Password - Tendor - Web developer community for managing web development projects and services.',
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
    <>

      {/* <AChangePasswordPage /> */}

    </>
  )
}

export default page;
