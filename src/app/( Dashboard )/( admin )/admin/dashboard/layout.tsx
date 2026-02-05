import React from 'react'
// import ANavbar from '@/components/admin/Layout/ANavbar'
// import ABurgerMenu from '@/components/admin/Layout/ABurgerMenu'
// import type { Admin } from '@/components/@types/admin/Layout';
// import type { JwtPayload } from 'jsonwebtoken';
// import GetAdmin from '@/libs/auth/GetAdmin';
// import NotFound from '@/components/layout/NotFound';
// import Link from 'next/link';

const layout = async ({ children }: { children: React.ReactNode }) => {

    // const admin: Admin | JwtPayload | null = await GetAdmin();

    // return (
    //     <>
    //         {
    //             admin ? (


    //             <div className="w-full mx-auto flex">
    //                 <ANavbar admin={admin} />

    //                 <div className="menu-area max-w-64 bg-neutral-800">
    //                     <ABurgerMenu admin={admin} />
    //                 </div>
    //                 <div className="h-[calc(100vh-3.9rem)] mt-[3.9rem] overflow-y-auto w-full lg:max-w-full bg-neutral-950 border-l border-neutral-700 dark-scrollbar">
    //                     <div className="w-full px-6 lg:max-w-7xl mx-auto ">
    //                         <Link href="/admin/dashboard/"></Link>
    //                         {children}
    //                     </div>
    //                 </div>
    //             </div>



    //             ) : <NotFound />
    //         }
    //     </>
    // )
    return (
        <>
        <p>Test</p>
        </>
    );
}

export default layout
