import { appName } from "@/config/meta/app";
import { AppIconJSX, AppNameTextSVG } from "@/config/icons/appIcons";
import { founderName } from "@/config/meta/founder";
import FormInput from "../UI/Form/FormInput";
import { Checkbox } from "../UI/Form/Checkbox";
import { Button } from "../UI/Button";
import { UnderlineItem, UnderlineLink } from "../UI/UnderlineLink";
import { Badge } from "../UI/Badge";
import { FiX } from "react-icons/fi";
import { FrontendRoutes } from "@/config/urls";
import Image from "next/image";
import { SocialLinks } from "../UI/SocialLinks";
import { FounderSocialLinks } from "@/config/links/FounderSocialLink";
import { FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const sitemap = [
    {
      title: "Product",
      children: [
        { label: "The Vault", href: "/the-vault" },
        { label: "Page Transition Course", href: "/course" },
        { label: "Icon Library", href: "/icons" },
        { label: "Easings", href: "/easings" },
      ],
    },
    {
      title: "Community",
      children: [
        { label: "Showcase", href: "/showcase" },
        { label: `About ${appName}`, htmlFor: "about-modal" },
        { label: "Slack Community", href: "/slack" },
      ],
    },
    {
      title: "Membership",
      children: [
        { label: "Updates", href: "/updates" },
        { label: "Pricing", href: "/pricing" },
        { label: "FAQs", href: "/faqs" },
        { label: "Support", href: "/support" },
      ],
    },
  ];

  const FooterSubLinks = [
    { label: "Licensing", href: "/" },
    { label: "T&CS", href: "/" },
    { label: "Privacy", href: "/" },
    { label: "Cookies", href: "/" },
  ];

  return (
    <>
      <AboutCard />
      <div
        className="w-full min-h-fit max-h-screen h-screen flex flex-col justify-between"
        id="footer"
      >
        <div className="w-full max-w-[var(--size-container)] mx-auto flex flex-col lg:flex-row items-start justify-between pt-[calc(var(--sfu)*2)] pb-[calc(var(--sfu)*4)]">
          {/* Newsletter Form */}
          <form className="w-full lg:max-w-1/2 flex flex-col  pb-[calc(var(--sfu)*4)] lg:pb-0 lg:pr-[calc(var(--sfu)*7)] px-[calc(var(--sfu)*1.5)]">
            <div className="text-[calc(var(--sfu)*1.125)] pb-[calc(var(--sfu)*2)]">
              Subscribe to the {appName} Newsletter
            </div>
            <div className="flex flex-col sm:flex-row gap-[calc(var(--sfu)*0.5)] pb-[calc(var(--sfu)*1.75)]">
              <FormInput
                name="name"
                type="text"
                minLength={3}
                maxLength={40}
                placeholder="First Name"
                interactive
                border={false}
                className="py-[calc(var(--sfu)*0.75)] px-[calc(var(--sfu)*1)]"
              />
              <FormInput
                name="email"
                type="email"
                placeholder="yourname@email.com"
                interactive
                border={false}
                className="py-[calc(var(--sfu)*0.75)] px-[calc(var(--sfu)*1)]"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-[calc(var(--sfu)*2)] sm:gap-0 items-start sm:items-center justify-between">
              <div className="flex items-center gap-[calc(var(--sfu)*0.5)]">
                <Checkbox size="medium" border={false} />I agree to the
                <UnderlineLink variant="persistent" href="/">
                  Privacy Policy
                </UnderlineLink>
              </div>
              <Button
                type="submit"
                className="w-full sm:w-fit text-center bg-[var(--color-bg-contrast)] text-[var(--color-text-contrast)]"
              >
                Get Updates
              </Button>
            </div>
          </form>

          {/* Sitemap Links */}
          <div className="w-full md:max-w-1/2 flex flex-col sm:px-[calc(var(--sfu)*1.5)]">
            <div className="flex flex-col sm:flex-row w-full">
              {/* reset radio (required for close-on-reclick) */}
              <input
                type="radio"
                name="accordion"
                id="sitemap-reset"
                className="hidden"
              />

              {sitemap.map(({ title, children }, i) => (
                <div key={title} className="relative w-full sm:w-1/3">
                  {/* accordion control */}
                  <input
                    type="radio"
                    name="accordion"
                    id={`sitemap-${title}-${i}`}
                    className="peer hidden"
                  />

                  {/* visible label */}
                  <div
                    className={`group block w-full
                  border-b-[calc(var(--sfu)*0.0625)]
                  ${i == 0 && "border--[calc(var(--sfu)*0.0625)]"}
                  border-[var(--color-border-surface)]
                  sm:border-none`}
                  >
                    {/* header */}
                    <div
                      className="relative flex items-center justify-between active:bg-[var(--color-bg-press)] py-[calc(var(--sfu)*1)] sm:py-0 
                    px-[calc(var(--sfu)*1.5)] sm:px-0"
                    >
                      {/* invisible overlay to close when open */}
                      <label
                        htmlFor="sitemap-reset"
                        className="absolute inset-0 z-10 hidden group-peer-checked:block sm:hidden"
                      />
                      <label
                        htmlFor={`sitemap-${title}-${i}`}
                        className="inset-0 absolute"
                      ></label>
                      <div className="text-[calc(var(--sfu)*1.125)]">
                        {title}
                      </div>

                      <FiX
                        strokeWidth={2.75}
                        className="text-[calc(var(--sfu)*0.75)]
                      rotate-45
                      group-peer-checked:rotate-360
                      sm:hidden
                      transition-transform
                      duration-[var(--duration-long)]
                      ease-[var(--motion-steady)]"
                      />
                    </div>

                    {/* animated content */}
                    <div
                      className="
                      grid
                      grid-rows-[0fr] sm:grid-rows-[1fr]
                      group-peer-checked:grid-rows-[1fr]
                      transition-[grid-template-rows]
                      duration-[var(--duration-long)]
                      ease-[var(--motion-steady)]
                      px-[calc(var(--sfu)*1.5)] sm:px-0
                      sm:px-0
                    "
                    >
                      <div
                        className="overflow-hidden flex flex-col gap-[calc(var(--sfu)*0.5)] sm:gap-[calc(var(--sfu)*0.25)] pt-0 group-peer-checked:py-[calc(var(--sfu)*1)] 
                      sm:pt-[calc(var(--sfu)*2)]
                      transition-all
                      duration-[var(--duration-long)]
                      ease-[var(--motion-steady)]"
                      >
                        {children.map((item, i) => {
                          if (item.htmlFor || !item.href) {
                            return (
                              <>
                                <label htmlFor={item.htmlFor}>
                                  <UnderlineItem key={i} className="w-fit">
                                    {item.label}
                                  </UnderlineItem>
                                </label>
                              </>
                            );
                          } else if (item.href) {
                            return (
                              <>
                                <>
                                  <UnderlineLink
                                    key={i}
                                    href={item.href}
                                    className="w-fit"
                                  >
                                    {item.label}
                                  </UnderlineLink>
                                </>
                              </>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-[calc(var(--sfu)*4)] flex gap-[calc(var(--sfu)*2)] px-[calc(var(--sfu)*1.5)] sm:px-0">
              <div className="flex">
                <Button shape="rounded" href={FrontendRoutes.auth.login.base}>
                  Login
                </Button>
                <Button
                  className="bg-[var(--color-electric-red)] text-[var(--color-text-action)]"
                  href={FrontendRoutes.auth.register.base}
                >
                  Join {appName}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          {/* Large SVG Text */}
          <AppNameTextSVG
            className={"text-[20.1vw] text-[var(--color-bg-action)]"}
          />

          {/* Footer Bottom / Legal */}
          <div className="w-full max-w-[var(--size-container)] mx-auto flex flex-rwo justify-between relative px-[calc(var(--sfu)*1.5)] py-[calc(var(--sfu)*1.75)] font-mono uppercase text-[calc(var(--sfu)*0.7)]">
            <div className="text-[var(--color-text-action)] flex">
              {FooterSubLinks.map(({ label, href }, i) => (
                <Badge
                  key={i}
                  href={href}
                  shape={i % 2 == 1 ? "rounded" : "box"}
                  className="bg-[var(--color-text-base)] text-[var(--color-text-contrast)]"
                >
                  {label}
                </Badge>
              ))}
            </div>

            <div className="hidden sm:flex gap-[calc(var(--sfu)*0.25)] items-center">
              <p>Created By</p>
              <Badge className="bg-[var(--color-electric-indigo)] text-[var(--color-text-action)]">
                {founderName}
              </Badge>
            </div>

            <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2">
              © {currentYear} {appName}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function AboutCard() {
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

            <div className="px-[calc(var(--sfu)*2)] border-b-[calc(var(--sfu)*0.0625)] border-[var(--color-border-action)]">
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
                      src="/images/farhanali.webp"
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

            <div className="w-full flex flex-col gap-[calc(var(--sfu)*1)]">
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
          bg-neutral-900/40 
          opacity-0 pointer-events-none
          transition-opacity duration-[var(--duration-long)] delay-75
          
          peer-checked:opacity-100
          peer-checked:pointer-events-auto
        "
        />
      </div>
    </>
  );
}
