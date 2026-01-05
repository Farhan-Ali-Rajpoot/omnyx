"use client";
import { AppIconJSX } from "@/config/icons/appIcons";
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
      <div className="flex app">
        {/* Aside */}
        <aside
          id="dashboard-sidebar"
          className="
            dashboard-sidebar group peer
            fixed top-0 left-0 z-30
            flex flex-col justify-between items-center
            w-[calc(100vw-var(--sfu))] 
            h-[calc(var(--sfu)*4)] 
            p-[calc(var(--sfu)*0.7)] 
            m-[calc(var(--sfu)*0.5)]
            overflow-hidden 
            bg-[var(--color-bg-surface)] 
            border-[length:calc(var(--sfu)*0.0625)] border-[var(--color-border-surface)]
            rounded-[calc(var(--sfu)*0.5)]
            
            transition-[width,height,background-color] 
            duration-[var(--duration-long)] 
            ease-[var(--motion-steady)]

            [&[open]]:h-[90vh]

            md:[&[open]]:h-[calc(100vh-var(--sfu))]

            md:relative md:top-auto md:left-auto md:z-auto
            md:h-[calc(100vh-var(--sfu))] 
            md:w-[calc(var(--sfu)*5)] 
            md:p-[calc(var(--sfu)*1)]
            md:border-none md:overflow-visible

            md:[&[open]]:w-[calc(var(--sfu)*18.5)]
          "
        >
          {/* Top Section */}
          <div className="flex flex-col w-full">
            {/* Header */}
            <div
              className="
                flex items-center justify-between pb-[calc(var(--sfu)*0.7)]
                md:justify-center md:pb-0 md:block
              "
            >
              <div
                className="
                  flex flex-row-reverse items-center justify-between
                  text-[calc(var(--sfu)*1.8)]
                  transition-all duration-[var(--duration-long)] ease-[var(--motion-steady)]

                  gap-[calc(var(--sfu)*0.5)]
                  md:gap-0
                  
                  md:flex-row md:text-[calc(var(--sfu)*2)]
                  md:p-[calc(var(--sfu)*0.5)_0_calc(var(--sfu)*2)_0]
                  
                  md:group-open:p-[calc(var(--sfu)*0.5)_0_calc(var(--sfu)*2)_calc(var(--sfu)*0.8)]
                "
              >
                <h1
                  className="
                    font-bold uppercase 
                    tracking-[calc(var(--sfu)*0.025)]
                    
                    md:max-w-[calc(var(--sfu)*12.5)] md:overflow-hidden md:whitespace-nowrap 
                    md:transition-all md:duration-[var(--duration-long)] md:ease-[var(--motion-steady)]
                    
                    md:group-open:max-w-[calc(var(--sfu) * 12.5)]
                  "
                >
                  {appName}
                </h1>
                <h1 className="md:min-w-[calc(var(--sfu)*3)] flex items-center justify-center text-[var(--color-bg-action)]">
                  <AppIconJSX />
                </h1>
              </div>

              {/* Aside Type Toggler Icon (Desktop Only) */}
              <div
                data-toggle-target-id="dashboard-sidebar"
                className="
                  hidden md:block
                  absolute top-[calc(var(--sfu)*2.5)] right-0
                  p-[calc(var(--sfu)*0.75)_calc(var(--sfu)*0.25)]
                  text-[calc(var(--sfu)*0.75)]
                  bg-[var(--color-bg-surface)]
                  rounded-r-[calc(var(--sfu)*0.25)]
                  origin-center cursor-pointer pointer-events-none opacity-0
                  transition-all duration-[var(--duration-medium)] ease-[var(--motion-steady)]
                  
                  group-hover:translate-x-[98%] group-hover:opacity-100 group-hover:pointer-events-auto
                  
                  group-open:hover:opacity-100 group-open:hover:pointer-events-auto
                "
              >
                <div
                  className="
                    transform rotate-180 
                    group-open:rotate-0
                    transition-transform
                  "
                >
                  <FiChevronLeft />
                </div>
              </div>

              {/* Navbar Type Toggler Icon (Mobile Only) */}
              <div
                data-toggle-target-id="dashboard-sidebar"
                className="
                  flex flex-col gap-[calc(var(--sfu)*0.3)]
                  px-[calc(var(--sfu)*0.65)]
                  md:hidden
                "
              >
                <div
                  className="
                    w-[calc(var(--sfu)*1.75)] h-[calc(var(--sfu)*0.1)] 
                    bg-[var(--color-text-base)] 
                    transition-all duration-[var(--duration-medium)] ease-[var(--motion-steady)]
                    group-open:translate-y-[calc(var(--sfu)*0.41)] group-open:rotate-45
                  "
                ></div>
                <div
                  className="
                    w-[calc(var(--sfu)*1.75)] h-[calc(var(--sfu)*0.1)] 
                    bg-[var(--color-text-base)] 
                    transition-all duration-[var(--duration-medium)] ease-[var(--motion-steady)]
                    group-open:opacity-0
                  "
                ></div>
                <div
                  className="
                    w-[calc(var(--sfu)*1.75)] h-[calc(var(--sfu)*0.1)] 
                    bg-[var(--color-text-base)] 
                    transition-all duration-[var(--duration-medium)] ease-[var(--motion-steady)]
                    group-open:translate-y-[calc(var(--sfu)*-0.41)] group-open:-rotate-45
                  "
                ></div>
              </div>
            </div>

            {/* Styling border line (Mobile Only) */}
            <div
              className="
                h-[calc(var(--sfu)*0.0625)] w-full 
                bg-[var(--color-border-surface)] 
                scale-x-0 transition-all duration-[var(--duration-long)] ease-[var(--motion-steady)]
                group-open:scale-x-100
                md:hidden
              "
            />

            {/* Links Container */}
            <div
              className="
                flex flex-col 
                pt-[calc(var(--sfu)*1)] gap-[calc(var(--sfu)*0.125)]
                md:pt-0
              "
            >
              {dashboardLinks.map((props, i) => {
                return (
                  <Tooltip
                    key={i}
                    className="block group-open:hidden"
                    content={props.label}
                    position="right"
                  >
                    <DashboardLink
                      {...(props as any)}
                      style={{ "--position": `${i + 1}` } as any}
                      className="
                      translate-y-[calc(var(--sfu)*var(--position))]
                      transition-all duration-[var(--duration-long)] ease-[var(--motion-steady)] md:transition-none
                      group-open:translate-y-0
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
                className="hidden md:block md:group-open:hidden"
                content="Account"
                position="right"
              >
                <Link
                  href={FrontendRoutes.app.account.base}
                  className="
                  flex items-center justify-center 
                  md:transition-all md:duration-[var(--duration-long)] md:ease-[var(--motion-steady)]
                  gap-[calc(var(--sfu)*0.5)]
                  md:gap-0
                "
                >
                  <div>
                    {hasImage ? (
                      <div
                        data-image
                        className="
                        overflow-hidden 
                        rounded-[calc(var(--sfu)*0.3)]
                        bg-[var(--color-bg-action)]
                        text-[calc(var(--sfu)*1.4)]
                        text-[var(--color-icon-muted)]
                        p-[calc(var(--sfu)*0.7)_calc(var(--sfu)*0.8)]
                      "
                      />
                    ) : (
                      <div
                        data-image
                        className="
                        overflow-hidden
                        rounded-[calc(var(--sfu)*0.3)]
                        bg-[var(--color-bg-action)]
                        text-[calc(var(--sfu)*1.25)]
                        text-[var(--color-electric-lime)]
                        p-[calc(var(--sfu)*0.7)_calc(var(--sfu)*0.8)]
                      "
                      >
                        <FiUser strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  <div
                    className="
                    text-ellipsis 
                    md:ml-[calc(var(--sfu)*0.6175)]
                    md:max-w-0 md:overflow-hidden md:whitespace-nowrap
                    md:transition-all md:duration-[var(--duration-long)] md:ease-[var(--motion-steady)] 
                    md:group-open:max-w-[calc(var(--sfu)*12.5)]
                  "
                  >
                    Farhan Ali
                  </div>
                </Link>
              </Tooltip>
              <Link
                href={"/app"}
                className="
                  md:hidden 
                  text-[calc(var(--sfu)*1.125)] text-[var(--color-icon-rose)]
                  md:group-open:block
                  px-[calc(var(--sfu)*0.75)]
                "
              >
                <FiLogOut strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        <div
          data-toggle-target-id="dashboard-sidebar"
          className="
            hidden
            fixed inset-0 z-29
            peer-[[open]]:block
            md:hidden
            md:peer-[[open]]:hidden
          "
        />

        {/* Main */}
        <div className="flex-1 max-h-screen overflow-y-scoll overflow-x-auto px-[calc(var(--sfu)*1.5)] pt-[calc(var(--sfu)*0.5)]">
          {children}
        </div>
      </div>
    </>
  );
}
