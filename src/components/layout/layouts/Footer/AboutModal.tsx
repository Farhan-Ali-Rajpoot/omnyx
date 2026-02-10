'use client';
import { SocialLinks } from "@/components/UI/SocialLinks";
import { FounderSocialLinks } from "@/config/links/FounderSocialLink"; 
import { AppIconJSX, AppNameTextSVG } from "@/config/Icons";
import { Images } from "@/config/images";
import Image from "next/image";
import { FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import { FiX } from "react-icons/fi";




export default function AboutModal() {
  return (
    <>
      <div className="">
        <input type="checkbox" id="about-modal" className="peer hidden" />
        <div
          className={`m-[calc(var(--sfu)*0.5)] h-[calc(100vh-calc(var(--sfu)*1))] w-[calc(var(--sfu)*39)] bg-[var(--color-bg-action-surface)] text-[var(--color-text-action)]
        rounded-[calc(var(--sfu)*0.25)] fixed top-0 right-0 z-32
        translate-x-[calc(var(--sfu)*55)] translate-y-[calc(var(--sfu)*5)] rotate-15
        transition-transform duration-[var(--duration-long)] ease-[var(--motion-steady)]
        peer-checked:translate-0
        peer-checked:rotate-0
        
        p-[calc(var(--sfu)*0.75)] flex flex-col
        oveflow-x-hidden overflow-y-scroll scrollbar-none`}
        >
          <div className="h-full w-full relative">
            <label
              htmlFor="about-modal"
              className="absolute top-0 right-0 py-[calc(var(--sfu)*0.75)] mx-[calc(var(--sfu)*0.5)] flex cursor-pointer rounded-full"
            >
              <div className="p-[calc(var(--sfu)*0.2)] text-[calc(var(--sfu)*0.85)] rounded-full bg-[var(--color-bg-action-surface-emphasis)]">
                <FiX />
              </div>
              <div className="leading-none py-[calc(var(--sfu)*0.2)] px-[calc(var(--sfu)*0.4)] bg-[var(--color-bg-action-surface-emphasis)]">
                Close
              </div>
            </label>

            <div className="px-[calc(var(--sfu)*2)] pb-[calc(var(--sfu)*1)] border-b-[calc(var(--sfu)*0.0625)] border-[var(--color-border-action)]">
              <div className="flex items-center justify-center w-fit py-[calc(var(--sfu)*3)]">
                <AppIconJSX className="text-[calc(var(--sfu)*2.5)] text-[var(--color-electric-indigo)]" />
                <AppNameTextSVG className="text-[calc(var(--sfu)*1.5)]" />
              </div>
              <h1 className="text-[calc(var(--sfu)*4.25)] pb-[calc(var(--sfu)*0.5)]">
                A platform By...
              </h1>

              <div className="py-[calc(var(--sfu)*1.5)]">
                <div className=" w-fit flex items-center justify-center gap-[calc(var(--sfu)*1)]">
                  <div className="relative h-[calc(var(--sfu)*4.75)] w-[calc(var(--sfu)*4.75)] rounded-full overflow-hidden">
                    <Image
                      src={Images.people.prtrait.farhanAli}
                      alt="Farhan Ali"
                      fill
                      sizes="calc(var(--sfu)*4.75)"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <h2 className="text-[calc(var(--sfu)*1.25)]">Farhan </h2>
                    <h2 className="text-[calc(var(--sfu)*1.25)]">Ali</h2>
                  </div>
                </div>
                <SocialLinks
                  className="pt-[calc(var(--sfu)*0.5)] pl-[calc(var(--sfu)*5.5)]"
                  items={[
                    {
                      label: <FaTwitter />,
                      href: FounderSocialLinks.twitter,
                    },
                    {
                      label: <FaInstagram />,
                      href: FounderSocialLinks.instagram,
                    },
                    {
                      label: <FaTiktok />,
                      href: FounderSocialLinks.tiktok,
                    },
                  ]}
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-[calc(var(--sfu)*1)] ">
              <div className="relative w-full aspect-[2/1] overflow-hidden rounded-b-full  shadow-inner">
                <Image
                  src="/images/maps/pakistan-globe-map.svg"
                  alt="Pakistan Map"
                  fill
                  className="object-cover object-top"
                  sizes="100%"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-b-full shadow-[inset_0_-20px_60px_rgba(0,0,0,0.25)] pointer-events-none" />
              </div>

              <p className=" w-2/3 text-center mx-auto text-[calc(var(--sfu)*0.75)] py-[calc(var(--sfu)*0.75)]">
                Based in Pakistan, building websites with the years of
                experience. Serving skills to thousand of clients with satisfyng
                work.
              </p>

              <div
                className="mt-[calc(var(--sfu)*1)] px-[calc(var(--sfu)*2.5)] py-[calc(var(--sfu)*1.5)] border-t-[calc(var(--sfu)*0.0625)]
                 border-[var(--color-border-action)]
                 flex items-center justify-between"
              >
                <div className="w-1/2 flex flex-col gap-[calc(var(--sfu)*1.25)]">
                  <p className="text-[calc(var(--sfu)*4)]">20+</p>
                  <p className="">Sites pushed live</p>
                </div>
                <div className="w-1/2 flex flex-col gap-[calc(var(--sfu)*1.25)]">
                  <p className="text-[calc(var(--sfu)*4)]">7+</p>
                  <p className="">Startup Sites </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        <label
          htmlFor="about-modal"
          className="h-screen w-screen z-31
          fixed top-0 left-0
          bg-[var(--color-bg-overlay)]
          opacity-0 pointer-events-none cursor-pointer
          transition-opacity duration-[var(--duration-long)] delay-75
          
          peer-checked:opacity-100
          peer-checked:pointer-events-auto
        "
        />
      </div>
    </>
  );
}