import { ThemeToggle } from "@/components/shared/colorTheme/ThemeToggle";
import { navLinks } from "@/config/links/navl";
import { MenuButton } from "./menuButton";
import { CSSProperties, HTMLAttributes } from "react";
import Link from "next/link";
import { AppIconJSX } from "@/config/icons/appIcons";
import { AnimLink } from "@/components/UI/AnimLink";
import {
  FounderGithubLink,
  FounderSocialLink,
} from "@/config/links/founder/socialLinks";
import { FaGithub, FaUser } from "react-icons/fa";
import { appName } from "@/config/meta/app";
import { authLinks } from "@/config/links/auth";
import Image from "next/image";

import { JwtPayload } from "jsonwebtoken";
import type { User } from "@/components/@types/Layout";
import { aboutLinks } from "@/config/links/about/about";
import { FrontendRoutes } from "@/config/urls";

interface NavbarProps {
  user: User | JwtPayload | null;
  className?: string;
}

export function Navbar({ user, className = "" }: NavbarProps) {
  return (
    <div id="navbar" className="group relative max-w-site mx-auto">
      <nav
        className={`
         fixed inset-x-0 top-0 z-30 mx-auto
         mt-[calc(var(--sfu)*0.5)] sm:mt-[calc(var(--sfu)*1)]
         max-w-[calc(100vw-var(--sfu))] sm:max-w-[calc(var(--sfu)*35)]
         flex flex-col rounded-[calc(var(--sfu)*0.25)]
         bg-neutral-850 dark:bg-neutral-900
         border border-neutral-700 dark:border-neutral-800
         p-[calc(var(--sfu)*1)] sm:p-[calc(var(--sfu)*0.25)]
         transition-all duration-[var(--duration-long)] ease-[var(--motion-steady)] delay-[var(--delay-long)]
         max-h-[calc(var(--sfu)*6)]
         group-open:max-h-full
         group-open:max-w-full
         group-open:mt-0
         group-open:p-3.5
         sm:group-open:max-h-[calc(100vw-var(--sfu))]
         sm:group-open:max-w-[calc(100vw-var(--sfu))]
         sm:group-open:mt-[calc(var(--sfu)*1)]
         sm:group-open:p-[calc(var(--sfu)*0.25)]
         sm:group-open:delay-75
         overflow-hidden scrollbar-none
         group-open:overflow-y-scroll sm:group-open:overflow-hidden
       `}
      >
        {/* Top bar */}
        <div className="flex h-full w-full items-center justify-between shrink-0">
          <MenuButton />
          <Link
            href={FrontendRoutes.home}
            className="text-[calc(var(--sfu)*1.25)] sm:text-[calc(var(--sfu)*1.5)] text-neutral-100 font-semibold leading-tight"
          >
            {appName}
          </Link>

          {user ? (
            <Link
              href={FrontendRoutes.app.account.base}
              className="flex items-center justify-center rounded-full
                         relative h-[calc(var(--sfu)*2)] w-[calc(var(--sfu)*2)] 
                         sm:h-[calc(var(--sfu)*2)] sm:w-[calc(var(--sfu)*2)] mr-[calc(var(--sfu)*0.25)]"
            >
              {user.picture ? (
                <Image
                  className="rounded-full object-cover"
                  src={user.picture}
                  fill
                  alt={user.name || "User profile picture"}
                  sizes="(max-width: 640px) 32px, (max-width: 1919px) 2.2vw, 40px"
                />
              ) : (
                <FaUser
                  className="text-white h-[calc(var(--sfu)*1)] w-[calc(var(--sfu)*1)] 
                  sm:h-[calc(var(--sfu)*1)] sm:w-[calc(var(--sfu)*1)]"
                />
              )}
            </Link>
          ) : (
            <div className="flex gap-[calc(var(--sfu)*0.25)]">
              {authLinks.map((l, i) => {
                return (
                  <Link
                    key={i}
                    href={l.link}
                    className={`cursor-pointer py-[calc(var(--sfu)*0.375)] px-[calc(var(--sfu)*0.75)] 
                      sm:py-[calc(var(--sfu)*0.25)] sm:px-[calc(var(--sfu)*0.875)]
                    text-[calc(var(--sfu)*0.875)] sm:text-[calc(var(--sfu)*0.75)]
                    rounded-full transition-colors duration-200
                    ${
                      l.name.toLowerCase() == "login"
                        ? "bg-neutral-700 hover:bg-neutral-600 text-neutral-100"
                        : "bg-neutral-200 hover:bg-neutral-300 text-neutral-900"
                    }`}
                  >
                    {l.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Expandable section */}
        <div
          className={`
           transition-[max-height,margin] duration-[var(--duration-long)] ease-[var(--motion-steady)]
           max-h-0
           group-open:delay-[var(--delay-long)]
           group-open:max-h-[calc(var(--sfu)*60)]
         `}
        >
          <div
            className={`
             bg-neutral-700/60 w-full
             transition-all duration-600 ease-steady delay-75
             h-0 mt-[calc(var(--sfu)*1)] sm:mt-[calc(var(--sfu)*0.25)] scale-0 
             group-open:h-[calc(var(--sfu)*0.0625)]
             group-open:scale-100
             group-open:delay-[var(--delay-long)]
           `}
          />
          <div
            className="flex flex-col h-fit sm:flex-row w-full pt-[calc(var(--sfu)*1.25)] sm:p-[calc(var(--sfu)*0.75)] 
            gap-[calc(var(--sfu)*0.75)] sm:gap-[calc(var(--sfu)*1)] text-neutral-100"
          >
            {[CardA, CardB, CardC].map((Card, i) => (
              <Card
                key={i}
                className={`
                 relative w-full rounded-[calc(var(--sfu)*0.75)] overflow-hidden
                 transition-transform duration-[var(--duration-long)] ease-[var(--motion-steady)] transform
                 translate-y-[calc(var(--sfu)*2.9)]
                 group-open:delay-[var(--delay-long)]
                 group-open:translate-y-0
                 ${
                   i !== 1 &&
                   "bg-neutral-800/30 dark:bg-neutral-800/20 border border-neutral-700/30"
                 }
               `}
                style={
                  {
                    "--index": i.toString(),
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Background Wrapper */}
      <div
        data-toggle-target-id="navbar"
        className="h-screen w-screen z-29
          fixed top-0 left-0
          bg-neutral-800/20
          opacity-0 pointer-events-none
          transition-opacity duration-[var(--duration-long)] delay-75
          sm:group-open:flex
          sm:group-open:opacity-100
          sm:group-open:pointer-events-auto"
      />
    </div>
  );
}

export function CardA({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`${className} h-full p-[calc(var(--sfu)*1.25)] sm:p-[calc(var(--sfu)*1)] flex flex-col justify-between`}
      {...props}
    >
      <p className="text-[calc(var(--sfu)*0.625)] sm:text-[calc(var(--sfu)*0.5)] uppercase text-neutral-400 tracking-wider font-medium mb-[calc(var(--sfu)*0.75)]">
        Navigation
      </p>
      <div className="flex flex-col gap-[calc(var(--sfu)*0.125)]">
        {navLinks.map((l, i) => (
          <AnimLink
            data-toggle-target-id="navbar"
            NoTextAnimation
            key={l.link}
            href={l.link}
            lineColor="bg-neutral-100"
            className={`
              py-[calc(var(--sfu)*0.5)] sm:py-[calc(var(--sfu)*0.375)]
              text-[calc(var(--sfu)*1.125)] sm:text-[calc(var(--sfu)*0.875)]
              font-medium tracking-wide
              transition-colors duration-200
              hover:text-white
              ${
                i !== navLinks.length - 1
                  ? "border-b border-neutral-700/40"
                  : ""
              }
            `}
          >
            {l.name}
          </AnimLink>
        ))}
      </div>
      <div className="mt-[calc(var(--sfu)*1.5)] hidden sm:flex gap-[calc(var(--sfu)*0.25)] items-center w-fit rounded-[calc(var(--sfu)*0.25)] bg-neutral-800/60 dark:bg-neutral-900/60 p-[calc(var(--sfu)*0.25)] sm:px-[calc(var(--sfu)*0.5)]">
        <ThemeToggle>Theme</ThemeToggle>
      </div>
    </div>
  );
}

function CardB({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`${className} h-full p-[calc(var(--sfu)*1.25)] sm:p-[calc(var(--sfu)*1)] flex flex-col justify-between`}
      {...props}
    >
      <p className="text-[calc(var(--sfu)*0.625)] sm:text-[calc(var(--sfu)*0.5)] uppercase text-neutral-400 tracking-wider font-medium mb-[calc(var(--sfu)*0.75)]">
        About
      </p>
      <div className="flex flex-col gap-[calc(var(--sfu)*0.125)]">
        {aboutLinks.map((l, i) => (
          <AnimLink
            data-toggle-target-id="navbar"
            NoTextAnimation
            key={i}
            href={l.href}
            lineColor="bg-neutral-100"
            className={`
              py-[calc(var(--sfu)*0.5)] sm:py-[calc(var(--sfu)*0.375)]
              text-[calc(var(--sfu)*1.125)] sm:text-[calc(var(--sfu)*0.875)]
              font-medium tracking-wide
              transition-colors duration-200
              hover:text-white
              ${
                i !== aboutLinks.length - 1
                  ? "border-b border-neutral-700/40"
                  : ""
              }
            `}
          >
            {l.name}
          </AnimLink>
        ))}
      </div>

      <div className="mt-[calc(var(--sfu)*1.5)] hidden sm:flex gap-[calc(var(--sfu)*0.375)] items-center">
        {FounderSocialLink.map((link, i) => {
          const Icon = link.icon;
          return (
            <Link
              key={i}
              target="_blank"
              data-toggle-target-id="navbar"
              href={link.href}
              className="p-[calc(var(--sfu)*0.375)] bg-neutral-800/60 hover:bg-neutral-700 rounded-full transition-all duration-200 hover:scale-105"
            >
              <Icon className="h-[calc(var(--sfu)*0.875)] w-[calc(var(--sfu)*0.875)]" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function CardC({ className = "", ...props }: any) {
  return (
    <Link
      target="_blank"
      href={FounderGithubLink}
      className={`${className} w-full p-[calc(var(--sfu)*1.25)] sm:p-[calc(var(--sfu)*1)] hidden md:flex flex-col items-center justify-center text-center`}
      {...props}
    >
      <div className="flex gap-[calc(var(--sfu)*0.375)] mb-[calc(var(--sfu)*1)]">
        <div className="text-[calc(var(--sfu)*0.75)] rounded-md py-[calc(var(--sfu)*0.25)] px-[calc(var(--sfu)*0.5)] bg-neutral-800 font-medium">
          Github
        </div>
        <div className="text-[calc(var(--sfu)*0.75)] rounded-md py-[calc(var(--sfu)*0.25)] px-[calc(var(--sfu)*0.5)] bg-neutral-200 text-neutral-900 font-medium">
          {appName}
        </div>
      </div>
      
      <p className="text-[calc(var(--sfu)*1.25)] sm:text-[calc(var(--sfu)*1.125)] font-medium mb-[calc(var(--sfu)*1.5)] leading-snug">
        Building Next level projects
      </p>
      
      <div className="flex gap-[calc(var(--sfu)*0.75)]">
        <FaGithub className="h-[calc(var(--sfu)*2)] w-[calc(var(--sfu)*2)] text-neutral-300 dark:text-neutral-400" />
        <AppIconJSX className="h-[calc(var(--sfu)*2)] w-[calc(var(--sfu)*2)] text-neutral-300 dark:text-neutral-400" />
      </div>
      
      <p className="mt-[calc(var(--sfu)*1.5)] text-[calc(var(--sfu)*0.75)] text-neutral-400">
        Check out the source code
      </p>
    </Link>
  );
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}