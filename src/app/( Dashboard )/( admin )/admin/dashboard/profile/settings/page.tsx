// import { Admin } from '@/components/@types/admin/Layout';
// import GetAdmin from '@/libs/auth/GetAdmin';
// import { JwtPayload } from 'jsonwebtoken';
// import Link from 'next/link';
import { FaEnvelope, FaLock, FaTrash, FaUser, FaShieldAlt, FaKey } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { wn, favicon, shortcutIcon, appleIcon, themeColor, ogImageUrl, ogTwitterImage, applicationName, authorName, category } from '@/app/Meta';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Tendor',
    description:
        'Admin Login Page - Tendor is a web developer service that provides an admin dashboard for managing web development projects and services.',
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
        title: 'Admin Login Page  – Tendor',
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
            'Admin Login Page - Tendor - Web developer community for managing web development projects and services.',
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


const ProfilePage = async () => {
    // const admin: Admin | JwtPayload | null = await GetAdmin();

    // return (
    //     <div className="w-full min-h-screen text-neutral-100">
    //         {/* Main Content */}
    //         <div className="max-w-4xl mx-auto py-8">
    //             {/* Header */}
    //             <div className="mb-10">
    //                 <h1 className="text-3xl font-bold">Admin Profile</h1>
    //                 <p className="text-neutral-400 mt-2">Manage your account settings and security</p>
    //             </div>

    //             {/* Profile Card */}
    //             <div className="bg-neutral-900 rounded-xl p-6 mb-6 border border-neutral-800">
    //                 <div className="flex items-center space-x-5">
    //                     <div className="w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700">
    //                         <FaUser className="text-3xl text-neutral-400" />
    //                     </div>
    //                     <div>
    //                         <h2 className="text-2xl font-semibold">{admin?.name}</h2>
    //                         <div className="flex items-center mt-1">
    //                             <span className="bg-neutral-800 text-neutral-300 text-xs px-2.5 py-1 rounded-full border border-neutral-700">
    //                                 Admin Privileges
    //                             </span>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>

    //             {/* Account Details Section */}
    //             <section className="mb-8">
    //                 <h3 className="text-lg font-medium mb-4 flex items-center">
    //                     <FaUser className="mr-2 text-neutral-400" />
    //                     Account Details
    //                 </h3>
                    
    //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //                     <div className="bg-neutral-900 p-5 rounded-lg border border-neutral-800">
    //                         <h4 className="text-sm font-medium text-neutral-400 mb-2">Full Name</h4>
    //                         <p className="text-lg">{admin?.name}</p>
    //                     </div>
                        
    //                     <div className="bg-neutral-900 p-5 rounded-lg border border-neutral-800">
    //                         <h4 className="text-sm font-medium text-neutral-400 mb-2">Account Type</h4>
    //                         <div className="flex items-center">
    //                             <FaShieldAlt className="text-neutral-300 mr-2" />
    //                             <span>Administrator</span>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </section>

    //             {/* Security Section */}
    //             <section className="mb-8">
    //                 <h3 className="text-lg font-medium mb-4 flex items-center">
    //                     <FaLock className="mr-2 text-neutral-400" />
    //                     Security
    //                 </h3>
                    
    //                 <div className="space-y-3">
    //                     <Link 
    //                         href={`/admin/dashboard/profile/settings/change-password?id=${admin?.id}`}
    //                         className="flex items-center justify-between bg-neutral-900 hover:bg-neutral-850 p-5 rounded-lg border border-neutral-800 transition-colors"
    //                     >
    //                         <div className="flex items-center">
    //                             <FaKey className="mr-3 text-amber-400" />
    //                             <div>
    //                                 <h4 className="font-medium">Change Password</h4>
    //                                 <p className="text-sm text-neutral-400">Update your account password</p>
    //                             </div>
    //                         </div>
    //                         <span className="text-neutral-400 text-sm">Update</span>
    //                     </Link>
                        
    //                     <Link 
    //                         href={`/admin/dashboard/profile/settings/logout?id=${admin?.id}`}
    //                         className="flex items-center justify-between bg-neutral-900 hover:bg-neutral-850 p-5 rounded-lg border border-neutral-800 transition-colors"
    //                     >
    //                         <div className="flex items-center">
    //                             <FiLogOut className="mr-3 text-red-400" />
    //                             <div>
    //                                 <h4 className="font-medium">Logout</h4>
    //                                 <p className="text-sm text-neutral-400">Sign out from this device</p>
    //                             </div>
    //                         </div>
    //                         <span className="text-neutral-400 text-sm">Sign out</span>
    //                     </Link>
    //                 </div>
    //             </section>

    //             {/* Danger Zone */}
    //             <section>
    //                 <h3 className="text-lg font-medium mb-4 flex items-center">
    //                     <FaTrash className="mr-2 text-red-400" />
    //                     Danger Zone
    //                 </h3>
                    
    //                 <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
    //                     <div className="flex flex-col md:flex-row md:items-center justify-between">
    //                         <div>
    //                             <h4 className="font-medium">Delete Account</h4>
    //                             <p className="text-sm text-neutral-400 mt-1">
    //                                 Permanently delete your admin account. This action cannot be undone.
    //                             </p>
    //                         </div>
    //                         <Link
    //                             href={`/admin/dashboard/profile/settings/delete-account?id=${admin?.id}`}
    //                             className="mt-3 md:mt-0 inline-flex items-center px-4 py-2 bg-neutral-800 border border-neutral-700 text-red-400 rounded-md hover:bg-neutral-800/70 transition-colors"
    //                         >
    //                             <FaTrash className="mr-2" />
    //                             Delete Account
    //                         </Link>
    //                     </div>
    //                 </div>
    //             </section>
    //         </div>
    //     </div>
    // );
     return (
        <>
        <p>Test</p>
        </>
    );
};

export default ProfilePage;