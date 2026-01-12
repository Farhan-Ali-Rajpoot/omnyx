import { Metadata, Viewport } from 'next';
import { AnimButton } from '@/components/UI/AnimLink';
import { wn, favicon, shortcutIcon, appleIcon, themeColor, ogImageUrl, ogTwitterImage, applicationName, authorName, category } from '@/app/Meta';
import { FiCode, FiLayout, FiTrendingUp, FiZap } from 'react-icons/fi';
import { BiCheckCircle } from 'react-icons/bi';
import { SiNextdotjs, SiTailwindcss, SiNodedotjs, SiFirebase, SiMongodb, SiVercel, SiGit, SiReact } from "react-icons/si";



export const metadata: Metadata = {
    title: 'Tendor - A Web Developer community that provides good desgined website.',
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
        title: 'Tendor - A Web Developer community that provides good desgined website.',
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
        title: 'Tendor - A Web Developer community that provides good desgined website.',
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
        <>
            <Hero />
        </>
    )

};

export default page



const Hero = () => {
    

    return (
        <>
            <div className="min-h-screen mt-[25vh] flex flex-col items-center">
                <div className="flex flex-col">
                    <h1 className="text-[calc(var(--sfu)*5.5)] text-center leading-none">
                        Building Websites <br /> that Flex
                    </h1>
                </div>
            </div>
        </>
    );

};
