// import Account from '@/components/pages/account/Account';
import type { Metadata, Viewport } from 'next';
import { wn, favicon, shortcutIcon, appleIcon, themeColor, ogImageUrl, ogTwitterImage, applicationName, authorName, category } from '@/app/Meta';
import { UserType } from '@/models/user.model';
import { headers } from 'next/headers';
import { FrontendRoutes } from '@/config/urls';


export const metadata: Metadata = {
    title: 'Profile - Tendor - A Web Developer community that provides good desgined website.',
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
        title: 'Profile - Tendor - A Web Developer community that provides good desgined website.',
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
        title: 'Profile - Tendor - A Web Developer community that provides good desgined website.',
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


const Page = async () => {

    const pathname = (await headers()).get('x-pathname') || FrontendRoutes.app.account.base;

    const user: Omit<UserType, "password" | "verified" | "name_normalized"> =  {
        _id: "3274612893472",
        email: "farhan@gmail.com",
        name: "Farhan Ali",
        provider: "email",
        createdAt: undefined,
        picture: "",
    };

    return (
        <>

            {/* <Account user={user}  pathname={pathname} /> */}

        </>
    )
}

export default Page