"use client";
import { AppIconJSX, AppNameTextSVG } from "@/config/Icons";
import { appName } from "@/config/meta/app";
import { ReactNode } from "react";
import {
  FiAirplay,
  FiSettings,
  FiUser,
  FiChevronLeft,
  FiLogOut,
} from "react-icons/fi";
import { DashboardLink } from "./DashboardLink";
import { InitAccordion } from "./NavItemDropDownHandler";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FrontendRoutes } from "@/config/urls";
import { Tooltip } from "@/components/UI/Tooltip";

interface DashboardProps {
  children: ReactNode;
}

const dashboardLinks = [
  {
    label: "Settings",
    href: "/dashboard",
    icon: FiSettings,
    color: "amber",
    "data-active": true,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: FiAirplay,
    color: "blue",
  },
  {
    label: "Settings",
    href: "/dashboard",
    icon: FiSettings,
    color: "violet",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: FiAirplay,
    color: "blue",
  },
];

export async function Dashboard({ children }: DashboardProps) {
  const pathname = usePathname();
  const hasImage = false;

  return (
    <>
      <InitAccordion />
      {/* Structure for CSS Toggle:
        1. Hidden Input (peer)
        2. Aside (peer-checked reacts to input)
        3. Labels inside/outside act as toggle buttons
      */}
      <div className="flex bg-[var(--color-bg-app)] relative">
        <input
          type="checkbox"
          id="app-sidebar-toggle"
          className="peer hidden"
          aria-hidden="true"
        />

        {/* Aside */}
        <aside
          id="dashboard-sidebar"
          className="
            dashboard-sidebar group
            fixed top-0 left-0 z-30
            flex flex-col justify-between items-center
            
            /* Mobile Base Styles (Scaled down ~93%) */
            w-[calc(100vw-(var(--sfu)*0.9))] 
            h-[calc(var(--sfu)*3.7)] 
            p-[calc(var(--sfu)*0.65)] 
            m-[calc(var(--sfu)*0.45)]
            overflow-hidden 
            bg-[var(--color-bg-surface)] 
            border-[length:calc(var(--sfu)*0.06)] border-[var(--color-border-surface)]
            rounded-[calc(var(--sfu)*0.45)]
            
            transition-[width,height,background-color] 
            duration-[var(--duration-long)] 
            ease-[var(--motion-steady)]

            /* Mobile Open State */
            peer-checked:h-[90vh]
            md:peer-checked:h-[calc(100vh-(var(--sfu)*0.9))]

            /* Desktop Base Styles */
            md:relative md:top-auto md:left-auto md:z-auto
            md:h-[calc(100vh-(var(--sfu)*0.9))] 
            md:w-[calc(var(--sfu)*4.65)] 
            md:p-[calc(var(--sfu)*0.93)]
            md:border-none md:overflow-visible

            md:peer-checked:w-[calc(var(--sfu)*17)]

            peer-checked:[&_.app-name]:max-w-[calc(var(--sfu)*11.6)]
            peer-checked:[&_.toggle-icon]:rotate-0
            peer-checked:[&_.toggle-line-1]:translate-y-[calc(var(--sfu)*0.38)]
            peer-checked:[&_.toggle-line-1]:rotate-45
            peer-checked:[&_.toggle-line-2]:opacity-0
            peer-checked:[&_.toggle-line-3]:translate-y-[calc(var(--sfu)*-0.38)]
            peer-checked:[&_.toggle-line-3]:-rotate-45
            peer-checked:[&_.mobile-separator]:scale-x-100
            peer-checked:[&_.link-tooltip-wrapper]:hidden
            peer-checked:[&_.dashboard-link-item]:translate-y-0
            peer-checked:[&_.user-name]:max-w-[calc(var(--sfu)*11.6)]
            peer-checked:[&_.mobile-logout]:block
            
            md:peer-checked:[&_.header-container]:px-[calc(var(--sfu)*0.75)]

            peer-checked:[&_.dashboard-link-text]:max-w-[calc(var(--sfu)*11.6)]
          "
        >
          {/* Top Section */}
          <div className="flex flex-col w-full">
            {/* Header */}
            <div
              className="
                header-container
                flex items-center justify-between pb-[calc(var(--sfu)*0.65)]
                md:justify-center md:pb-0 md:block
                md:transition-[padding] md:duration-[var(--duration-long)]
              "
            >
              <div
                className="
                  flex flex-row-reverse items-center justify-between
                  text-[calc(var(--sfu)*1.67)]
                  transition-all duration-[var(--duration-long)] ease-[var(--motion-steady)]

                  gap-[calc(var(--sfu)*0.46)]
                  md:gap-0
                  
                  md:flex-row md:text-[calc(var(--sfu)*1.86)]
                  md:pt-[calc(var(--sfu)*1)]
                  md:pb-[calc(var(--sfu)*1.75)]
                "
              >
                <h1
                  className="
                    app-name
                    md:max-w-[calc(var(--sfu)*11.6)] md:overflow-hidden md:whitespace-nowrap 
                    md:transition-all md:duration-[var(--duration-long)] md:ease-[var(--motion-steady)]
                  "
                >
                  <AppNameTextSVG className="min-w-fit" />
                </h1>
                <h1 className="md:min-w-[calc(var(--sfu)*2.8)] flex items-center justify-center text-[var(--color-bg-action)]">
                  <AppIconJSX />
                </h1>
              </div>

              {/* Aside Type Toggler Icon (Desktop Only) - LABEL for Checkbox */}
              <label
                htmlFor="app-sidebar-toggle"
                className="
                  hidden md:block
                  absolute top-[calc(var(--sfu)*2.3)] right-0
                  p-[calc(var(--sfu)*0.7)_calc(var(--sfu)*0.23)]
                  text-[calc(var(--sfu)*0.7)]
                  bg-[var(--color-bg-surface)]
                  rounded-r-[calc(var(--sfu)*0.23)]
                  origin-center cursor-pointer pointer-events-none opacity-0
                  transition-all duration-[var(--duration-medium)] ease-[var(--motion-steady)]
                  
                  group-hover:translate-x-[98%] group-hover:opacity-100 group-hover:pointer-events-auto
                  
                  /* We use sibling selector logic for hover persistence on open state if needed, 
                     but here we rely on the group-hover which works fine */
                  peer-checked:hover:opacity-100 peer-checked:hover:pointer-events-auto
                "
              >
                <div
                  className="
                    toggle-icon
                    transform rotate-180 
                    transition-transform
                  "
                >
                  <FiChevronLeft />
                </div>
              </label>

              {/* Navbar Type Toggler Icon (Mobile Only) - LABEL for Checkbox */}
              <label
                htmlFor="app-sidebar-toggle"
                className="
                  flex flex-col gap-[calc(var(--sfu)*0.28)]
                  px-[calc(var(--sfu)*0.6)]
                  cursor-pointer
                  md:hidden
                "
              >
                <div
                  className="
                    toggle-line-1
                    w-[calc(var(--sfu)*1.62)] h-[calc(var(--sfu)*0.09)] 
                    bg-[var(--color-text-base)] 
                    transition-all duration-[var(--duration-medium)] ease-[var(--motion-steady)]
                  "
                ></div>
                <div
                  className="
                    toggle-line-2
                    w-[calc(var(--sfu)*1.62)] h-[calc(var(--sfu)*0.09)] 
                    bg-[var(--color-text-base)] 
                    transition-all duration-[var(--duration-medium)] ease-[var(--motion-steady)]
                  "
                ></div>
                <div
                  className="
                    toggle-line-3
                    w-[calc(var(--sfu)*1.62)] h-[calc(var(--sfu)*0.09)] 
                    bg-[var(--color-text-base)] 
                    transition-all duration-[var(--duration-medium)] ease-[var(--motion-steady)]
                  "
                ></div>
              </label>
            </div>

            {/* Styling border line (Mobile Only) */}
            <div
              className="
                mobile-separator
                h-[calc(var(--sfu)*0.06)] w-full 
                bg-[var(--color-border-surface)] 
                scale-x-0 transition-all duration-[var(--duration-long)] ease-[var(--motion-steady)]
                md:hidden
              "
            />

            {/* Links Container */}
            <div
              className="
                flex flex-col 
                pt-[calc(var(--sfu)*0.93)] gap-[calc(var(--sfu)*0.11)]
                md:pt-0
              "
            >
              {dashboardLinks.map((props, i) => {
                return (
                  <Tooltip
                    key={i}
                    // link-tooltip-wrapper class is targeted by aside peer-checked to hide
                    className="link-tooltip-wrapper block" 
                    content={props.label}
                    position="right"
                  >
                    <DashboardLink
                      {...(props as any)}
                      style={{ "--position": `${i + 1}` } as any}
                      // dashboard-link-item targeted for translate reset
                      className="
                      dashboard-link-item
                      translate-y-[calc(var(--sfu)*var(--position))]
                      transition-all duration-[var(--duration-long)] ease-[var(--motion-steady)] md:transition-none
                      md:translate-0
                    "
                    />
                  </Tooltip>
                );
              })}
            </div>
          </div>

          {/* Bottom Section (User) */}
          <div className="flex flex-col w-full">
            <div
              className="
                flex items-center justify-between w-full
              "
            >
              <Tooltip
                // link-tooltip-wrapper is hidden when sidebar is open
                className="hidden md:block link-tooltip-wrapper"
                content="Account"
                position="right"
              >
                <Link
                  href={FrontendRoutes.app.account.base}
                  className="
                  flex items-center justify-center 
                  md:transition-all md:duration-[var(--duration-long)] md:ease-[var(--motion-steady)]
                  gap-[calc(var(--sfu)*0.46)]
                  md:gap-0
                "
                >
                  <div>
                    {hasImage ? (
                      <div
                        data-image
                        className="
                        overflow-hidden 
                        rounded-[calc(var(--sfu)*0.28)]
                        bg-[var(--color-bg-action)]
                        text-[calc(var(--sfu)*1.3)]
                        text-[var(--color-icon-muted)]
                        p-[calc(var(--sfu)*0.65)_calc(var(--sfu)*0.74)]
                      "
                      />
                    ) : (
                      <div
                        data-image
                        className="
                        overflow-hidden
                        rounded-[calc(var(--sfu)*0.28)]
                        bg-[var(--color-bg-action)]
                        text-[calc(var(--sfu)*1.16)]
                        text-[var(--color-electric-lime)]
                        p-[calc(var(--sfu)*0.65)_calc(var(--sfu)*0.74)]
                      "
                      >
                        <FiUser strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  <div
                    className="
                    user-name
                    text-ellipsis 
                    md:ml-[calc(var(--sfu)*0.57)]
                    md:max-w-0 md:overflow-hidden md:whitespace-nowrap
                    md:transition-all md:duration-[var(--duration-long)] md:ease-[var(--motion-steady)] 
                  "
                  >
                    Farhan Ali
                  </div>
                </Link>
              </Tooltip>
              <Link
                href={"/app"}
                className="
                  mobile-logout
                  hidden
                  md:hidden 
                  text-[calc(var(--sfu)*1.05)] text-[var(--color-icon-rose)]
                  px-[calc(var(--sfu)*0.7)]
                "
              >
                <FiLogOut strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </aside>

        {/* Overlay - now a LABEL to close the checkbox */}
        <label
          htmlFor="app-sidebar-toggle"
          className="
            hidden
            fixed inset-0 z-29
            peer-checked:block
            md:hidden
            md:peer-checked:hidden
          "
        />

        {/* Main Content */}
        <div className="flex-1 max-h-screen overflow-y-scroll overflow-x-auto px-[calc(var(--sfu)*1.4)] pt-[calc(var(--sfu)*0.46)]">
          {children}
        </div>
      </div>
    </>
  );
}