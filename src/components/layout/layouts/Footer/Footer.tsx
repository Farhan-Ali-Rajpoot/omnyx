import { appName } from "@/config/meta/app";
import { AppNameTextSVG } from "@/config/Icons";
import { founderName } from "@/config/founder";
import FormInput from "../../../UI/Form/FormInput";
import { Checkbox } from "../../../UI/Form/Checkbox";
import { Button } from "../../../UI/Button";
import { UnderlineItem, UnderlineLink } from "../../../UI/UnderlineLink";
import { Badge } from "../../../UI/Badge";
import { FiX } from "react-icons/fi";
import { FrontendRoutes } from "@/config/urls";
import AboutModal from "./AboutModal";
import { legalPagesLinks } from "@/config/links/legalPagesLinks";
import { footerSitemap } from "@/config/links/FooterSitemapLinks";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <AboutModal />
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
            <div className="flex flex-col sm:flex-row gap-[calc(var(--sfu)*2)] sm:gap-0 items-start sm:items-center justify-between ">
              <div className="flex items-center gap-[calc(var(--sfu)*0.5)] text-[calc(var(--sfu)*0.8625)]">
                <Checkbox size="medium" border={false} />I agree to the
                <UnderlineLink variant="persistent" href="/" className="">
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

              {footerSitemap.map(({ title, children }, i) => (
                <div
                  key={title}
                  className="relative w-full sm:w-1/3 border-t-[calc(var(--sfu)*0.0625)] border-[var(--color-border-surface)] sm:border-none"
                >
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
            className={
              "footer-svg text-[20.1vw] text-[var(--color-bg-action)] overflow-visible"
            }
            pathClassName="footer-svg-path relative transition-all duration-[var(--duration-long)]"
          />

          {/* Footer Bottom / Legal */}
          <div className="w-full max-w-[var(--size-container)] mx-auto flex flex-rwo justify-between relative px-[calc(var(--sfu)*1.5)] py-[calc(var(--sfu)*1.75)] font-mono uppercase text-[calc(var(--sfu)*0.7)]">
            <div className="text-[var(--color-text-action)] flex">
              {legalPagesLinks.map(({ label, href, shortName }, i) => (
                <Badge
                  key={i}
                  href={href}
                  shape={i % 2 == 1 ? "rounded" : "box"}
                  className="bg-[var(--color-text-base)] text-[var(--color-text-contrast)]"
                >
                  {shortName}
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


