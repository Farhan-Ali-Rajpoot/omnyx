import { Button } from "@/components/UI/Button";
import { Section } from "@/components/UI/Section";

export function Hero() {
  return (
    <>
      <Section className="min-h-[600px] h-screen max-h-[1080px] flex flex-col items-center justify-center py-[calc(var(--sfu)*1.5)]">
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-[calc(var(--sfu)*1.75)]">
            <h1 className="text-[calc(var(--sfu)*5.5)] text-center tracking-tight leading-none pt-[calc(var(--sfu)*2)]">
              Building Modern Web
            </h1>
            <p className="text-[calc(var(--sfu)*1)] max-w-[calc(var(--sfu)*37)] text-center">
              We build modern, SEO-focused, and high-performance websites that
              not only look great but also attract real traffic and convert
              visitors into customers.
            </p>
            <div className="flex gap-[calc(var(--sfu)*0.5)]">
              <label htmlFor="need-a-website-modal">
                <Button className="bg-[var(--color-bg-contrast)] text-[var(--color-text-contrast)]">
                  Need a website?
                </Button>
              </label>
              <label htmlFor="about-modal">
                <Button className="bg-[var(--color-bg-surface-emphasis)]">
                  About Us
                </Button>
              </label>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}