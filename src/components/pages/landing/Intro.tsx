import { Button } from "@/components/UI/Button";
import { Section } from "@/components/UI/Section";
import { appName } from "@/config/meta/app";
import { FiGlobe } from "react-icons/fi";

export function Intro() {
  return (
    <Section className="mb-[calc(var(--sfu)*10)] w-full px-[calc(var(--sfu)*1.5)]">
      <div className="mx-auto p-[calc(var(--sfu)*1)]">
        {/* BIG TWO-LINE TITLE */}
        <div className="w-full mb-[calc(var(--sfu)*1)] xl:mb-[calc(var(--sfu)*2)]">
          {/* Line 1: The Left Offset Gap */}
          <div className="text-[calc(var(--sfu)*3)] sm:text-[calc(var(--sfu)*4)] lg:text-[calc(var(--sfu)*6.5)] leading-[1] tracking-tighter">
            <h2 className="xl:pl-[calc(var(--sfu)*15)]">Beyond Interface</h2>
            <h2 className="">WithIn Action</h2>
          </div>
        </div>

        {/* CONTENT BLOCK */}
        <div className="w-full flex flex-col-reverse lg:flex-row items-start justify-between pt-[calc(var(--sfu)*2)]">
          <input
            id="about-text-section"
            type="checkbox"
            className="peer hidden"
          />

          <div className="group/gb w-full lg:w-fit mt-[calc(var(--sfu)*5)] lg:mt-0 flex items-center justify-between">
            <div
              className="group-peer-checked/gb:rotate-360 relative
               p-[calc(var(--sfu)*0.75)] lg:p-[calc(var(--sfu)*3)] rounded-full bg-[var(--color-bg-surface-emphasis)]
               text-[calc(var(--sfu)*2)] lg:text-[calc(var(--sfu)*8)] transition-transform ease-[var(--motion-steady)] duration-[var(--duration-long)]"
            >
              <FiGlobe />
            </div>
            <div className="lg:hidden p-[calc(var(--sfu)*0.75)] rounded-full bg-[var(--color-bg-surface-emphasis)] text-[calc(var(--sfu)*2)] ">
              <FiGlobe />
            </div>
            <div className="lg:hidden p-[calc(var(--sfu)*0.75)] rounded-full bg-[var(--color-bg-surface-emphasis)] text-[calc(var(--sfu)*2)] ">
              <FiGlobe />
            </div>
          </div>

          <div className="group/ats max-w-[calc(var(--sfu)*32.5)] sm:mr-[calc(var(--sfu)*2)]">
            <p className="lg:text-[calc(var(--sfu)*1)] leading-relaxed text-pretty">
              {appName} is a high-performance collective bridging visionary
              design with rigorous technical precision. We engineer future-ready
              ecosystems optimized for speed, SEO, and long-term scalability,
              ensuring your brand dominates the digital landscape.
            </p>

            <div
              className="more-text grid grid-rows-[0fr] group-peer-checked/ats:grid-rows-[1fr] lg:text-[calc(var(--sfu)*1)] leading-relaxed text-pretty 
            transition-all duration-500 ease-[var(--motion-steady)] "
            >
              <div className="overflow-hidden flex flex-col gap-[calc(var(--sfu)*2)]">
                <p className="pt-[calc(var(--sfu)*2)]">
                  We prioritize performance-first architecture to eliminate
                  friction and maximize conversion. By integrating cutting-edge
                  frameworks with clean, sustainable code, we build digital
                  assets that remain agile as your industry evolves.
                </p>
                <p className="">
                  Our approach transforms complex data into intuitive,
                  high-impact user experiences. We don't just launch platforms;
                  we cultivate dynamic environments designed to capture market
                  share and sustain competitive advantage.
                </p>
              </div>
            </div>

            <label
              htmlFor="about-text-section"
              className="mt-[calc(var(--sfu)*2)] block w-fit"
            >
              <Button
                shape="rounded"
                className="bg-[var(--color-bg-contrast)] text-[var(--color-text-contrast)] flex items-center gap-[calc(var(--sfu)*0.75)] w-fit"
              >
                <div className="relative overflow-hidden">
                  <p className="group-peer-checked/ats:-translate-y-full transition-transform duration-[var(--duration-long)] ease-[var(--motion-steady)]">
                    Read More
                  </p>
                  <p
                    className="absolute inset-0 transition-transform duration-[var(--duration-long)] ease-[var(--ease-steady)] translate-y-full 
                  group-peer-checked/ats:translate-0"
                  >
                    Show Less
                  </p>
                </div>
              </Button>
            </label>
          </div>
        </div>
      </div>
    </Section>
  );
}
