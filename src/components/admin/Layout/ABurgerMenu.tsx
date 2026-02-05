'use client';
import { usePathname } from 'next/navigation'
import AHandleToggle from "./HandleToggle";
import type { JwtPayload } from "jsonwebtoken";
import Link from "next/link";
import { FaTools, FaUser } from "react-icons/fa";
import { BsGear } from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const ABurgerMenu = ({ admin }: any) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <>
      <AHandleToggle />
      <div>
        <input
          type="checkbox"
          id="menu-toggle"
          className="hidden peer h-fit w-fit"
        />

        {/* Overlay for mobile */}
        <label 
          htmlFor="menu-toggle"
          className="fixed inset-0 bg-black/50 z-40 opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto lg:hidden transition-opacity duration-300"
        />

        {/* Menu Container */}
        <div className="fixed lg:relative left-0 top-0 h-screen w-64 text-neutral-300 bg-neutral-900 transform transition-transform duration-300 ease-in-out -translate-x-full peer-checked:translate-x-0 z-50 shadow-xl">
          <div className="w-full h-full flex flex-col p-4 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <MdSpaceDashboard className="text-2xl text-neutral-400" />
                <h1 className="text-lg font-semibold text-white">Admin Dashboard</h1>
              </div>
              
              {/* Close button (mobile only) */}
              <label
                htmlFor="menu-toggle"
                className="lg:hidden p-1 rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <IoClose className="text-xl" />
              </label>
            </div>

            {/* Navigation Sections */}
            <nav className="flex-1 flex flex-col gap-6 py-6">
              {/* Tools Section */}
              <div className="space-y-2">
                <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-500 px-2">
                  Navigation
                </h3>
                <Link 
                  href="/admin/dashboard/user-management" 
                  className={`toggle-menu flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    isActive('/admin/dashboard/user-management')
                      ? 'bg-neutral-800 text-white font-semibold'
                      : 'hover:bg-neutral-800 text-neutral-300'
                  }`}
                >
                  <FaUser className="text-neutral-400" />
                  <span>User Management</span>
                </Link>
                <Link 
                  href="/admin/dashboard/tools" 
                  className={`toggle-menu flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    isActive('/admin/dashboard/tools')
                      ? 'bg-neutral-800 text-white font-semibold'
                      : 'hover:bg-neutral-800 text-neutral-300'
                  }`}
                >
                  <FaTools className="text-neutral-400" />
                  <span>Tools</span>
                </Link>
              </div>

              {/* Settings Section */}
              <div className="space-y-2">
                <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-500 px-2">
                  Settings
                </h3>
                <Link
                  href="/admin/dashboard/profile/settings"
                  className={`toggle-menu flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    isActive('/admin/dashboard/profile/settings')
                      ? 'bg-neutral-800 text-white font-semibold'
                      : 'hover:bg-neutral-800 text-neutral-300'
                  }`}
                >
                  <BsGear className="text-neutral-400" />
                  <span>Settings</span>
                </Link>
              </div>
            </nav>

            {/* Footer */}
            <div className="pt-4 border-t border-neutral-800">
              <div className="flex items-center gap-3 p-2">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
                  <FaUser className="text-neutral-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{admin?.name}</p>
                  <p className="text-xs text-neutral-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ABurgerMenu;
