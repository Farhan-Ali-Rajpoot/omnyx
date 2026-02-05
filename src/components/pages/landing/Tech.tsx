import { Section } from "@/components/UI/Section";
import { IconType } from "react-icons";
import { SiMongodb, SiNextdotjs, SiNodedotjs, SiReact, SiTailwindcss, SiThreedotjs, SiTypescript, SiVercel } from "react-icons/si";

interface TechCardProps {
    icon: IconType,
    title: string,
    description: string,
}


export function TechCard({ icon: Icon, title, description }: TechCardProps) {
  return (
    <>
      <div className="group relative p-[calc(var(--sfu)*2)] border-l-[calc(var(--sfu)*0.0625)] border-t-[calc(var(--sfu)*0.0625)] border-[var(--color-border-contrast)]">
        <div className="mb-[calc(var(--sfu)*1)] text-[var(--color-text-secondary)] ">
          <Icon className="text-[calc(var(--sfu)*2)]" />
        </div>
        <h3 className="text-[calc(var(--sfu)*1.125)] text-[var(--color-text-contrast)] mb-[calc(var(--sfu)*0.5)] tracking-tight">
          {title}
        </h3>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          {description}
        </p>
      </div>
    </>
  );
}


export function Tech() {
  return (
    <>
      <Section className="py-[calc(var(--sfu)*6)] bg-[var(--color-bg-contrast)]">
        <div className="w-full flex flex-col items-center justify-center sm:px-[calc(var(--sfu)*2)] gap-[calc(var(--sfu)*2)]">
          {/* Header */}
          <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between mb-[calc(var(--sfu)*4)]">
            <div className="mb-[calc(var(--sfu)*2.5)] lg:mb-0">
              <span className="text-[var(--color-text-secondary)]  block mb-[calc(var(--sfu)*1)]">
                Technical excellence
              </span>
              <h1
                className="text-[calc(var(--sfu)*3.5)] sm:text-[calc(var(--sfu)*4.5)] text-[var(--color-text-contrast)] tracking-tighter leading-[0.9]
              max-w-[calc(var(--sfu)*35)] "
              >
                Engineering For <span className="italic">hyper Growth</span>
              </h1>
            </div>
            <div className="text-[var(--color-text-contrast)] max-w-[calc(var(--sfu)*20)] leading-relaxed">
              We leverage a modern ecosystem to ensure your application is
              lightweight, secure, and ready for global scale.
            </div>
          </div>
          {/* Main */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-r-[calc(var(--sfu)*0.0625)] border-[var(--color-border-contrast)]">
            <TechCard
              icon={SiNextdotjs}
              title="Next.js 14"
              description="Server-side rendering and edge computing for instantaneous load times."
            />
            <TechCard
              icon={SiTypescript}
              title="TypeScript"
              description="Enterprise-grade type safety ensuring zero-runtime errors in production."
            />
            <TechCard
              icon={SiMongodb}
              title="Mongo DB"
              description="Distributed database architecture designed for high-concurrency systems."
            />
            <TechCard
              icon={SiVercel}
              title="Vercel"
              description="Global Edge Network deployment ensuring sub-second latency worldwide."
            />
          </div>
          {/* Subtle Footer */}
          <div className="mt-[calc(var(--sfu)*4)] w-full flex flex-wrap justify-center gap-[calc(var(--sfu)*2.75)] text-[var(--color-text-secondary)] text-[calc(var(--sfu)*1.5)]">
            <SiReact />
            <SiNodedotjs />
            <SiTailwindcss />
            <SiThreedotjs />
            {["JWT Auth", "Bcrypt"].map((txt) => {
              return (
                <span className="uppercase font-mono tracking-widest text-[calc(var(--sfu)*0.75)]">
                  {txt}
                </span>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
