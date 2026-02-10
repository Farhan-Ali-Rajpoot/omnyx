import { ThemeToggle } from "@/components/shared/colorTheme/ThemeToggle";
import { navLinks } from "@/config/links/navl";
import { CSSProperties, HTMLAttributes } from "react";
import Link from "next/link";
import { AppIconJSX, AppNameTextSVG } from "@/config/Icons";
import { FounderSocialLinks } from "@/config/links/FounderSocialLink"; 
import { FaGithub, FaUser } from "react-icons/fa";
import { appName } from "@/config/meta/app";
import { authLinks } from "@/config/links/auth"; 
import Image from "next/image";

import { JwtPayload } from "jsonwebtoken";
import type { User } from "@/components/@types/Layout";
import { aboutLinks } from "@/config/links/about"; 
import { FrontendRoutes } from "@/config/urls";
import { UnderlineLink } from "../UI/UnderlineLink";
import { Button } from "../UI/Button";

interface NavbarProps {
  user: User | JwtPayload | null;
  className?: string;
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Navbar({ user, className = "", ...props }: NavbarProps) {
  return (
    <div id="navbar" className={`relative mx-auto ${className}`} {...props}>
      {/* 1. THE TRIGGER STATE */}
      <input type="checkbox" id="nav-toggle" className="peer hidden" />

      <nav
        className={` 
          fixed inset-x-0 top-0 z-30 mx-auto
          mt-[calc(var(--sfu)*0.5)] sm:mt-[calc(var(--sfu)*1)]
          max-w-[calc(100vw-var(--sfu))] sm:max-w-[calc(var(--sfu)*35)]
          flex flex-col rounded-[calc(var(--sfu)*0.25)]
          bg-[var(--color-bg-action-surface)]
          border border-[var(--color-border-action)]
          p-[calc(var(--sfu)*0.5)] sm:p-[calc(var(--sfu)*0.25)]
          transition-all duration-[var(--duration-long)] ease-[var(--motion-steady)] 
          
          max-h-[calc(var(--sfu)*5)]
          overflow-hidden scrollbar-none

          peer-checked:max-h-full
          peer-checked:max-w-full
          peer-checked:mt-0
          peer-checked:p-[calc(var(--sfu)*1)]
          peer-checked:overflow-y-scroll 
          
          sm:delay-[var(--delay-long)]
          sm:peer-checked:max-h-[calc(100vh-calc(var(--sfu)*2))]
          sm:peer-checked:max-w-[calc(100vw-calc(var(--sfu)*2))]
          sm:peer-checked:mt-[calc(var(--sfu)*1)]
          sm:peer-checked:p-[calc(var(--sfu)*0.25)]
          sm:peer-checked:delay-75
          sm:peer-checked:overflow-hidden

          peer-checked:[&_.expandable-content]:delay-[var(--delay-medium)]
          sm:peer-checked:[&_.expandable-content]:delay-[var(--delay-long)]
          peer-checked:[&_.expandable-content]:max-h-[calc(var(--sfu)*80)]
          
          peer-checked:[&_.expandable-divider]:scale-x-100
          peer-checked:[&_.expandable-divider]:delay-[var(--delay-long)]

          peer-checked:[&_.nav-card]:translate-y-0
          peer-checked:[&_.nav-card]:delay-[var(--delay-medium)]
          sm:peer-checked:[&_.nav-card]:delay-[var(--delay-long)]

          peer-checked:[&_.ham-wrapper]:gap-[calc(var(--sfu)*0.125)]

          peer-checked:[&_.ham-line-1]:translate-y-[calc(var(--sfu)*0.21)]
          peer-checked:[&_.ham-line-1]:scale-x-70
          peer-checked:[&_.ham-line-1]:rotate-45
          sm:peer-checked:[&_.ham-line-1]:translate-y-[calc(var(--sfu)*0.15)]

          peer-checked:[&_.ham-line-2]:-translate-y-[calc(var(--sfu)*0.19)]
          peer-checked:[&_.ham-line-2]:scale-x-70
          peer-checked:[&_.ham-line-2]:-rotate-45
          sm:peer-checked:[&_.ham-line-2]:-translate-y-[calc(var(--sfu)*0.15)]
          peer-checked:[&_.text-slider]:-translate-y-full
          peer-checked:[&_.text-close]:translate-y-0
        `}
      >
        {/* Top bar */}
        <div className="flex h-full w-full items-center justify-between shrink-0">
          {/* THE TRIGGER BUTTON */}
          <label
            htmlFor="nav-toggle"
            className="cursor-pointer select-none z-30"
          >
            <div
              className={`ham-wrapper group cursor-pointer flex items-center justify-center gap-[calc(var(--sfu)*0.625)] rounded-[calc(var(--sfu)*0.25)] 
                py-[calc(var(--sfu)*0.4)] px-[calc(var(--sfu)*0.9)] hover:bg-[var(--color-bg-action-emphasis)]
                transition-all duration-600`}
            >
              {/* Hamburger Lines */}
              <div className="flex flex-col gap-1.5 sm:gap-[0.3vw] 3xl:!gap-[5.76px]">
                <div
                  className="ham-line-1 h-[calc(var(--sfu)*0.1)] w-[calc(var(--sfu)*1.5)] bg-[var(--color-text-action)] rounded-full transition-transform 
                duration-[var(--duration-long)] ease-[var(--motion-steady)] origin-center"
                />
                <div
                  className="ham-line-2 h-[calc(var(--sfu)*0.1)] w-[calc(var(--sfu)*1.5)] bg-[var(--color-text-action)] rounded-full transition-transform 
                duration-[var(--duration-long)] ease-[var(--motion-steady)] origin-center"
                />
              </div>

              {/* Sliding Text */}
              <div className="relative overflow-hidden text-[var(--color-text-action)]">
                <p className="text-slider transition-transform duration-[var(--duration-long)] ease-[var(--motion-steady)]">
                  Menu
                </p>
                <p className="text-close absolute inset-0 transition-transform duration-[var(--duration-long)] ease-[var(--ease-steady)] translate-y-full">
                  Close
                </p>
              </div>
            </div>
          </label>

          <Link
            href={FrontendRoutes.home}
            className="text-[calc(var(--sfu)*1.25)] text-[var(--color-text-action)]"
          >
            <AppNameTextSVG />
          </Link>

          {user ? (
            <Link
              href={FrontendRoutes.app.account.base}
              className="flex items-center justify-center rounded-full
                         relative h-[calc(var(--sfu)*2.25)] w-[calc(var(--sfu)*2.25)] 
                         sm:h-[calc(var(--sfu)*2.5)] sm:w-[calc(var(--sfu)*2.5)] mr-[calc(var(--sfu)*0.25)]"
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
                <FaUser className="text-[var(--color-text-action)] h-[calc(var(--sfu)*1.25)] w-[calc(var(--sfu)*1.25)]" />
              )}
            </Link>
          ) : (
            <div className="flex gap-[calc(var(--sfu)*0.25)]">
              {authLinks.map((l, i) => {
                return (
                  <Button
                    key={i}
                    href={l.href}
                    shape={i % 2 == 0 ? "rounded" : "box"}
                    className={` ${i % 2 == 0 ? 
                      "bg-[var(--color-bg-action-secondary)] hidden sm:block text-[var(--color-text-action)]"
                      : "text-[var(--color-bg-action)] bg-[var(--color-bg-action-light)]"}`}
                  >
                    {l.label}
                  </Button>
                );
              })}
            </div>
          )}
        </div>

        {/* Expandable section content */}
        <div
          className={`
            expandable-content
            transition-[max-height,margin] duration-[var(--duration-long)] ease-[var(--motion-steady)]
            max-h-0 h-full
          `}
        >
          <div
            className={`
              expandable-divider w-full
              transition-all duration-600 ease-steady
              h-[calc(var(--sfu)*0.0625)]
              mt-[calc(var(--sfu)*1.25)] sm:mt-[calc(var(--sfu)*0.25)] scale-x-0 
              bg-[var(--color-border-action)]
            `}
          />

          <div
            className="flex flex-col h-fit sm:flex-row w-full pt-[calc(var(--sfu)*1.5)] sm:p-[calc(var(--sfu)*1)] 
            gap-[calc(var(--sfu)*1)] sm:gap-[calc(var(--sfu)*1.25)] text-[var(--color-text-action)]"
          >
            {[CardA, CardB, CardC].map((Card, i) => {
              const index = i + 1;
              const revIndex = 3 + 1 - index;
              return (
                <Card
                  key={i}
                  className={`
                      nav-card
                      ${i % 2 == 0 && "bg-[var(--color-bg-action-surface-emphasis)]"}
                      relative w-full rounded-[calc(var(--sfu)*1)] overflow-hidden
                      transition-transform duration-[var(--duration-long)] ease-[var(--motion-steady)] transform
                      translate-y-[calc(var(--sfu)*6)]
                      peer-checked:translate-y-0
                      peer-checked:delay-[calc(var(--r-i)*50ms)]
                      delay-[calc(var(--i)*50ms)] p-[calc(var(--sfu)*2.25)]
                    `}
                  style={
                    {
                      "--i": index.toString(),
                      "--r-i": revIndex.toString(),
                    } as CSSProperties
                  }
                />
              );
            })}
          </div>
        </div>
      </nav>

      {/* BACKGROUND WRAPPER */}
      <label
        htmlFor="nav-toggle"
        className="h-screen w-screen z-29
          fixed top-0 left-0
          bg-[var(--color-bg-overlay)]
          opacity-0 pointer-events-none cursor-pointer
          transition-opacity duration-[var(--duration-long)] delay-75
          
          peer-checked:opacity-100
          peer-checked:pointer-events-auto
          
          "
      />
    </div>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS (Cards)
// Refactored for Bolder Typography and Larger Click Targets
// ----------------------------------------------------------------------

export function CardA({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`${className} h-full  flex flex-col justify-between`}
      {...props}
    >
      <div>
        <p className="text-[calc(var(--sfu)*0.6125)] uppercase text-[var(--color-text-secondary)] mb-[calc(var(--sfu)*0.75)] sm:mb-[calc(var(--sfu)*1.25)]">
          Navigation
        </p>
        <div className="flex flex-col">
          {navLinks.map((l, i) => (
            <UnderlineLink
              data-target-checkbox-id="nav-toggle"
              key={l.link}
              href={l.link}
              lineClassName="bg-[var(--color-text-action)]"
              className={`
                w-full text-[calc(var(--sfu)*1.25)]
                text-[var(--color-text-action)]
                py-[calc(var(--sfu)*0.75)] ${i !== 0 && "border-t-[calc(var(--sfu)*0.1)]"} border-[var(--color-border-action)]
              `}
            >
              {l.name}
            </UnderlineLink>
          ))}
        </div>
      </div>

      {/* <div className="mt-[calc(var(--sfu)*2)] hidden sm:flex gap-[calc(var(--sfu)*0.5)] items-center w-fit rounded-[calc(var(--sfu)*0.5)] bg-neutral-800/60 dark:bg-neutral-900/60 p-[calc(var(--sfu)*0.375)] sm:px-[calc(var(--sfu)*0.75)]">
        <ThemeToggle>Theme</ThemeToggle>
      </div> */}
    </div>
  );
}

function CardB({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`${className} h-full flex flex-col justify-between`}
      {...props}
    >
      <div>
        <p className="text-[calc(var(--sfu)*0.6125)] uppercase text-[var(--color-text-secondary)] mb-[calc(var(--sfu)*0.75)] sm:mb-[calc(var(--sfu)*1.25)]">
          About
        </p>
        <div className="flex flex-col gap-[calc(var(--sfu)*0.2)]">
          {aboutLinks.map((l, i) => (
            <UnderlineLink
              data-target-checkbox-id="nav-toggle"
              key={l.href}
              href={l.href}
              lineClassName="bg-[var(--color-text-action)]"
              className={`
                w-full text-[calc(var(--sfu)*1.25)]
                text-[var(--color-text-action)]
                py-[calc(var(--sfu)*0.75)] ${i !== 0 && "border-t-[calc(var(--sfu)*0.1)]"} border-[var(--color-border-action)]
              `}
            >
              {l.name}
            </UnderlineLink>
          ))}
        </div>
      </div>

      <div className="mt-[calc(var(--sfu)*2)] hidden sm:flex gap-[calc(var(--sfu)*0.5)] items-center">
        {/* {FounderSocialLink.map((link, i) => {
          const Icon = link.icon;
          return (
            <Link
              key={i}
              target="_blank"
              data-toggle-target-id="navbar"
              href={link.href}
              className="p-[calc(var(--sfu)*0.625)] bg-neutral-800/60 hover:bg-neutral-700/80 rounded-full transition-all duration-200 hover:scale-105 border border-neutral-700/30"
            >
              <Icon className="h-[calc(var(--sfu)*1.25)] w-[calc(var(--sfu)*1.25)] text-neutral-200" />
            </Link>
          );
        })} */}
      </div>
    </div>
  );
}

function CardC({ className = "", ...props }: any) {
  return (
    <Link
      target="_blank"
      href={FounderSocialLinks.github}
      className={`${className} w-full hidden md:flex flex-col items-center justify-center text-center group/card`}
      {...props}
    >
      <div className="flex gap-[calc(var(--sfu)*0.5)] mb-[calc(var(--sfu)*1.5)]">
        <div className="text-[calc(var(--sfu)*0.875)] rounded-md py-[calc(var(--sfu)*0.25)] px-[calc(var(--sfu)*0.75)] bg-neutral-800 font-medium border border-neutral-700/50">
          Github
        </div>
        <div className="text-[calc(var(--sfu)*0.875)] rounded-md py-[calc(var(--sfu)*0.25)] px-[calc(var(--sfu)*0.75)] bg-neutral-200 text-neutral-900 font-bold">
          {appName}
        </div>
      </div>

      <p className="text-[calc(var(--sfu)*1.75)] sm:text-[calc(var(--sfu)*1.5)] font-bold mb-[calc(var(--sfu)*2)] leading-tight text-neutral-200 group-hover/card:text-white transition-colors">
        Building next level projects
      </p>

      <div className="flex gap-[calc(var(--sfu)*1)]">
        <FaGithub className="h-[calc(var(--sfu)*2.5)] w-[calc(var(--sfu)*2.5)] text-neutral-400 group-hover/card:text-white transition-colors duration-300" />
        <AppIconJSX className="h-[calc(var(--sfu)*2.5)] w-[calc(var(--sfu)*2.5)] text-neutral-400 group-hover/card:text-white transition-colors duration-300" />
      </div>

      <p className="mt-[calc(var(--sfu)*2)] text-[calc(var(--sfu)*0.875)] text-neutral-500 group-hover/card:text-neutral-400 transition-colors">
        Check out the source code &rarr;
      </p>
    </Link>
  );
}
