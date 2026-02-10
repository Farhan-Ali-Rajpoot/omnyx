import { Section } from "@/components/UI/Section";
import { AppNameTextSVG } from "@/config/Icons";

export function Qualities() {
  const qualities = [
    {
      title: "SEO Optimized",
      para: "Our architecture ensures your brand ranks higher from day one. Every element is built for search visibility, so you can focus on reaching the audience that matters.",
    },
    {
      title: "Blazing Performance",
      para: "We engineer systems that eliminate load times and maximize speed. Each asset is optimized for performance, so you can focus on keeping your users engaged longer.",
    },
    {
      title: "Future-Ready Scaling",
      para: "Our frameworks adapt as your business grows without losing stability. Every line is written for longevity, so you can focus on expanding your reach with confidence.",
    },
    {
      title: "Technical Precision",
      para: "We prioritize clean, sustainable code to prevent digital friction. Every component is crafted for accuracy, so you can focus on delivering a flawless user experience.",
    },
  ];
  return (
    <>
      <Section className="pt-[calc(var(--sfu)*8)] pb-[calc(var(--sfu)*4)]">
        <div className="flex justify-end xl:justify-between items-start">
          <div className="hidden xl:flex flex-col w-fit text-center">
            <AppNameTextSVG className="text-[calc(var(--sfu)*1)]" />
            <p className="text-[calc(var(--sfu)*0.75)]">Fast & Robust</p>
          </div>
          <div className="max-w-[calc(var(--sfu)*42)] md:mx-[calc(var(--sfu)*4)] lg:ml-0 lg:mr-[calc(var(--sfu)*8)]">
            <p className="text-[calc(var(--sfu)*1.75)] sm:text-[calc(var(--sfu)*3)] leading-[1] relative flex flex-col-reverse">
              Scale your presence online with a lightweight website fusing
              high-velocity speed and technical precision.
              <span
                className="font-brisa relative lg:absolute top-0 left-0 lg:-translate-x-full text-[calc(var(--sfu)*1.5)] text-[var(--color-electric-red)]
               lg:pr-[calc(var(--sfu)*1)] pb-[calc(var(--sfu)*1)] flex flex-col justify-center"
              >
                Why choose us
                <svg
                  style={{
                    height: "calc(var(--sfu) * 1.5)",
                    width: "auto",
                  }}
                  className="hidden sm:block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M30.3491 31.5811L30.558 30.3311L31.1618 29.9525C29.2036 30.1222 28.2898 27.0739 26.4295 26.369C25.8681 26.1568 25.7735 26.8128 25.9497 27.0119C25.9921
                     27.0609 26.6775 27.2502 27.0985 27.6516C27.4575 27.9975 29.1938 29.5543 28.8805 29.9492C23.8153 29.4434 19.1711 28.2358 14.7619 25.6477C5.77699 20.3802
                      0.852119 10.8502 0.0231477 0.612125C-0.616531 15.7327 12.0922 28.8428 26.9223 30.2821C26.5796 31.1372 23.8022 30.2234 23.9882 31.5811H30.3459H30.3491Z"
                    fill="currentColor"
                  />{" "}
                </svg>
              </span>
            </p>
            <div className="flex flex-col mt-[calc(var(--sfu)*4)] gap-[calc(var(--sfu)*2)]">
              {qualities.map((obj, i) => (
                <div
                  key={i}
                  className="border-t-[calc(var(--sfu)*0.0625)] border-[var(--color-border-surface)]
                    flex flex-col sm:flex-row items-start justify-between gap-[calc(var(--sfu)*2)] sm:gap-0 py-[calc(var(--sfu)*1.25)] "
                >
                  <h3
                    style={{
                      WebkitTextStroke: "0.3px currentColor",
                      paintOrder: "stroke fill",
                    }}
                  >
                    {obj.title}
                  </h3>
                  <p className="text-[calc(var(--sfu)*0.75)] max-w-[calc(var(--sfu)*25)]">
                    {obj.para}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
