import React from "react";
import Link from "next/link";
import type { JwtPayload } from "jsonwebtoken";
import { MdSpaceDashboard } from "react-icons/md";

const ANavbar = async ({
  admin,
  className,
}: {
  admin: JwtPayload | any | null;
  className?: string;
}) => {
  return (
    <div className="fixed top-0 left-0 w-full z-40 flex items-center justify-between px-6 py-3 bg-neutral-900 border-b border-neutral-700 backdrop-blur-sm">
      {/* Left Side: Logout + Hamburger */}
      <div className="flex items-center gap-4">
        {/* Hamburger Menu (Mobile only) */}
        <label
          htmlFor="menu-toggle"
          className="block md:hidden cursor-pointer flex flex-col gap-1.5 z-50"
        >
          <span className="w-6 h-0.5 bg-neutral-400 rounded-sm transition-all duration-200" />
          <span className="w-6 h-0.5 bg-neutral-400 rounded-sm transition-all duration-200" />
        </label>

        {/* Right Side: Page Title or Section */}

        <h1 className="text-xl font-semibold tracking-wide text-white flex items-center gap-2">
          <MdSpaceDashboard className="text-2xl text-sky-400" />
          Admin Dashboard
        </h1>
      </div>

      {/* Logout Button (Visible on all screens) */}
      <Link
        href="/admin/dashboard/profile/settings/logout"
        className="px-4 py-2 text-sm font-medium text-neutral-200 bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-800 border border-neutral-600 rounded-md transition-all duration-200"
      >
        Logout
      </Link>
    </div>
  );
};

export default ANavbar;
