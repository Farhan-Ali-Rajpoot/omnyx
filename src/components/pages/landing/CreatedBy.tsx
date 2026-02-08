import { Section } from "@/components/UI/Section";
import { founderName } from "@/config/founder";
import { Images } from "@/config/images";
import dynamic from "next/dynamic";
import Image from "next/image";
import { CSSProperties, HTMLProps, ReactNode, Suspense } from "react";
import {
  FiArrowDown,
  FiArrowUp,
  FiCpu,
  FiLayers,
  FiMoon,
  FiTarget,
  FiUserCheck,
  FiZap,
} from "react-icons/fi";
import { IconType } from "react-icons";

export function CreatedBy() {
  const RadialDashCircle = dynamic(() => import("@/config/svgs/radialDash"), {
    // Options
  });

  const founderIdentity = [
    {
      title: "Caffeine Powered",
      description:
        "Fueled by 80% dark coffee and 20% curiosity. I turn high-quality beans into high-performance code.",
      icon: FiZap,
    },
    {
      title: "Pixel Obsessed",
      description:
        "I suffer from a chronic need for perfection. If it's 1px off, it’s not finished—simple as that.",
      icon: FiTarget,
    },
    {
      title: "Night Mode",
      description:
        "While the world sleeps, I build. My peak creativity hits when the notifications finally stop.",
      icon: FiMoon,
    },
    {
      title: "Clean Logic",
      description:
        "I believe the code behind the curtain should be just as beautiful as the interface in front of it.",
      icon: FiLayers,
    },
    {
      title: "Always Evolving",
      description:
        "The web moves at light speed, and so do I. If there's a better way to build it, I'm already learning it.",
      icon: FiCpu,
    },
    {
      title: "User Advocate",
      description:
        "I don't just write functions; I craft experiences. If a user has to think twice, I haven't done my job.",
      icon: FiUserCheck,
    },
  ];

  return (
    <>
      <Section className="py-[calc(var(--sfu)*2)]">
        <div className="w-full flex items-center justify-center gap-[calc(var(--sfu)*0.75)] py-[calc(var(--sfu)*1)]">
          <div className="flex -space-x-[calc(var(--sfu)*0.5)]">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[calc(var(--sfu)*1.5)] w-[calc(var(--sfu)*1.5)] rounded-full border-[calc(var(--sfu)*0.125)] border-[var(--color-border-emphasis)] bg-[var(--color-bg-surface-emphasis)]"
              />
            ))}
          </div>
          <p className="font-medium">Trusted by Big Croud</p>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-[calc(var(--sfu)*1)] w-full text-[var(--color-text-action)]">
          <div className="h-fit lg:h-[calc(var(--sfu)*35)] 2xl:h-[calc(var(--sfu)*42.5)] w-full  lg:w-2/5 border-t-[calc(var(--sfu)*0.0625)] border-[var(--color-border-surface)]">
            <div className="h-full w-full rounded-[calc(var(--sfu)*1.25)] bg-[var(--color-electric-indigo)] p-[calc(var(--sfu)*1)] mt-[calc(var(--sfu)*1)] overflow-hidden">
              <div className="pt-[calc(var(--sfu)*1)] pl-[calc(var(--sfu)*1)] leading-none">
                <p className="font-brisa text-[calc(var(--sfu)*1.25)]">
                  Created By
                </p>
                {founderName.split(" ").map((word, i) => {
                  if (i == 0)
                    return (
                      <h1
                        key={i}
                        className="pt-[calc(var(--sfu)*1.25)] text-[calc(var(--sfu)*3)]"
                      >
                        {word}
                      </h1>
                    );
                  return (
                    <p
                      key={i}
                      className="pt-[calc(var(--sfu)*0.25)] inline-block"
                    >
                      {" "}
                      {word}
                    </p>
                  );
                })}
              </div>

              <div className=" w-auto lg:w-full aspect-square">
                <div className="h-full w-full px-[calc(var(--sfu)*2)] pb-[calc(var(--sfu)*4)]">
                  <div className="w-full h-full rounded-full relative">
                    {/* 1. Largest Circle (Scale 1) */}
                    <div
                      className="plx-circles plx-circle-1 absolute inset-0 rounded-full scale-[1] bg-[var(--color-electric-indigo)] overflow-hidden flex
                     items-center justify-center ease-[var(--motion-steady)]"
                      style={
                        {
                          "--i": 1,
                          "--d": 1,
                        } as CSSProperties
                      }
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={Images.people.cutout.farhanAli}
                          alt="Founder"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    {/* 2. Middle Circle (Scale 0.75) */}
                    <div
                      className="plx-circles plx-circle-2 absolute inset-0 rounded-full scale-[0.75] bg-[var(--color-electric-indigo)] overflow-hidden flex items-center
                    justify-center ease-[var(--motion-steady)]"
                      style={
                        {
                          "--i": 2,
                          "-d": -1,
                        } as CSSProperties
                      }
                    >
                      <div className="relative w-[133.33%] h-[133.33%]">
                        <Image
                          src={Images.people.cutout.farhanAli}
                          alt="Founder"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    {/* 3. Smallest Circle (Scale 0.5) */}
                    <div
                      className="plx-circles plx-circle-3 absolute inset-0 rounded-full scale-[0.5] bg-[var(--color-electric-indigo)] overflow-hidden flex items-center
                     justify-center ease-[var(--motion-steady)]"
                      style={
                        {
                          "--i": 3,
                          "--d": 1,
                        } as CSSProperties
                      }
                    >
                      <div className="relative w-[200%] h-[200%]">
                        <Image
                          src={Images.people.cutout.farhanAli}
                          alt="Founder"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <Suspense fallback={null}>
                      <RadialDashCircle className="plx-svg absolute inset-[calc(var(--sfu)*0.25)] z-10 text-[var(--color-text-action)] ease-[var(--motion-steady)]" />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <MindsetCarousel data={founderIdentity} />
        </div>
      </Section>
    </>
  );
}

interface CardProps extends HTMLProps<HTMLDivElement> {
  title: string;
  description: string;
  icon?: IconType;
}

interface MindsetCarouselProps {
  data: CardProps[];
}

function MindsetCarousel({ data }: MindsetCarouselProps) {
  // Note:  langth of data objects or card hsould must be 12, 6 or below 6 , should must never be between 12 and 6.
  const cards = [...data, ...data]; // Ensure we handle up to 12
  const uel = 6;

  return (
    <div className="h-[calc(var(--sfu)*33)] lg:h-[calc(var(--sfu)*35)] 2xl:h-[calc(var(--sfu)*42.5)] w-full lg:w-3/5 border-t-[calc(var(--sfu)*0.0625)] border-[var(--color-border-surface)]">
      <div
        className="h-full w-full rounded-full bg-[var(--color-bg-contrast)] mt-[calc(var(--sfu)*1)] overflow-hidden p-[calc(var(--sfu)*1)]
       py-[calc(var(--sfu)*3)] sm:py-[calc(var(--sfu)*1)]
       flex flex-col items-center justify-between relative"
      >
        {/* Hidden Radio Inputs - Extended to 12 */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
          <input
            key={num}
            type="radio"
            name="mindset-stack"
            id={`card-${num}`}
            defaultChecked={num === 4}
            className={`hidden peer/c${num}`}
          />
        ))}

        {/* Heading Section */}
        <div className="text-[calc(var(--sfu)*1.25)]">
          <p className="leading-[1] text-center uppercase font-bold tracking-tighter">
            THE MINDSET <br /> BEHIND THE CRAFT
          </p>
        </div>

        {/* The Stage - All 12 States Mapped */}
        <div
          className="relative w-full flex items-center justify-center group [perspective:1200px] [transform-style:preserve-3d]
            [&_>_div]:opacity-0 [&_>_div]:scale-90 [&_>_div]:pointer-events-none [&_>_div]:[backface-visibility:hidden]

            [--card-gap:180%] 2xl:[--card-gap:300%]
            [--rot:60deg]
            
            /* State 1 */
            peer-checked/c1:[&_.card1]:translate-y-0 peer-checked/c1:[&_.card1]:opacity-100 peer-checked/c1:[&_.card1]:scale-100 peer-checked/c1:[&_.card1]:[transform:rotateX(0deg)]
            peer-checked/c1:[&_.card2]:translate-y-[var(--card-gap)] peer-checked/c1:[&_.card2]:opacity-100 peer-checked/c1:[&_.card2]:[transform:rotateX(calc(var(--rot)*-1))]
            peer-checked/c1:[&_.card12]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c1:[&_.card12]:opacity-100 peer-checked/c1:[&_.card12]:[transform:rotateX(var(--rot))]
            peer-checked/c1:[&_.card3]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c1:[&_.card4]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c1:[&_.card5]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c1:[&_.card6]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c1:[&_.card7]:translate-y-[calc(var(--card-gap)*6)]
            peer-checked/c1:[&_.card11]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c1:[&_.card10]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c1:[&_.card9]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c1:[&_.card8]:translate-y-[calc(var(--card-gap)*-5)]

            /* State 2 */
            peer-checked/c2:[&_.card2]:translate-y-0 peer-checked/c2:[&_.card2]:opacity-100 peer-checked/c2:[&_.card2]:scale-100 peer-checked/c2:[&_.card2]:[transform:rotateX(0deg)]
            peer-checked/c2:[&_.card3]:translate-y-[var(--card-gap)] peer-checked/c2:[&_.card3]:opacity-100 peer-checked/c2:[&_.card3]:[transform:rotateX(calc(var(--rot)*-1))]
            peer-checked/c2:[&_.card1]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c2:[&_.card1]:opacity-100 peer-checked/c2:[&_.card1]:[transform:rotateX(var(--rot))]
            peer-checked/c2:[&_.card4]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c2:[&_.card5]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c2:[&_.card6]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c2:[&_.card7]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c2:[&_.card8]:translate-y-[calc(var(--card-gap)*6)]
            peer-checked/c2:[&_.card12]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c2:[&_.card11]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c2:[&_.card10]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c2:[&_.card9]:translate-y-[calc(var(--card-gap)*-5)]

            /* State 3 */
            peer-checked/c3:[&_.card3]:translate-y-0 peer-checked/c3:[&_.card3]:opacity-100 peer-checked/c3:[&_.card3]:scale-100 peer-checked/c3:[&_.card3]:[transform:rotateX(0deg)]
            peer-checked/c3:[&_.card4]:translate-y-[var(--card-gap)] peer-checked/c3:[&_.card4]:opacity-100 peer-checked/c3:[&_.card4]:[transform:rotateX(calc(var(--rot)*-1))]
            peer-checked/c3:[&_.card2]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c3:[&_.card2]:opacity-100 peer-checked/c3:[&_.card2]:[transform:rotateX(var(--rot))]
            peer-checked/c3:[&_.card5]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c3:[&_.card6]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c3:[&_.card7]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c3:[&_.card8]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c3:[&_.card9]:translate-y-[calc(var(--card-gap)*6)]
            peer-checked/c3:[&_.card1]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c3:[&_.card12]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c3:[&_.card11]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c3:[&_.card10]:translate-y-[calc(var(--card-gap)*-5)]

            /* State 4 */
            peer-checked/c4:[&_.card4]:translate-y-0 peer-checked/c4:[&_.card4]:opacity-100 peer-checked/c4:[&_.card4]:scale-100 peer-checked/c4:[&_.card4]:[transform:rotateX(0deg)]
            peer-checked/c4:[&_.card5]:translate-y-[var(--card-gap)] peer-checked/c4:[&_.card5]:opacity-100 peer-checked/c4:[&_.card5]:[transform:rotateX(calc(var(--rot)*-1))]
            peer-checked/c4:[&_.card3]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c4:[&_.card3]:opacity-100 peer-checked/c4:[&_.card3]:[transform:rotateX(var(--rot))]
            peer-checked/c4:[&_.card6]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c4:[&_.card7]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c4:[&_.card8]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c4:[&_.card9]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c4:[&_.card10]:translate-y-[calc(var(--card-gap)*6)]
            peer-checked/c4:[&_.card2]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c4:[&_.card1]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c4:[&_.card12]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c4:[&_.card11]:translate-y-[calc(var(--card-gap)*-5)]

            /* State 5 */
            peer-checked/c5:[&_.card5]:translate-y-0 peer-checked/c5:[&_.card5]:opacity-100 peer-checked/c5:[&_.card5]:scale-100 peer-checked/c5:[&_.card5]:[transform:rotateX(0deg)]
            peer-checked/c5:[&_.card6]:translate-y-[var(--card-gap)] peer-checked/c5:[&_.card6]:opacity-100 peer-checked/c5:[&_.card6]:[transform:rotateX(calc(var(--rot)*-1))]
            peer-checked/c5:[&_.card4]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c5:[&_.card4]:opacity-100 peer-checked/c5:[&_.card4]:[transform:rotateX(var(--rot))]
            peer-checked/c5:[&_.card7]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c5:[&_.card8]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c5:[&_.card9]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c5:[&_.card10]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c5:[&_.card11]:translate-y-[calc(var(--card-gap)*6)]
            peer-checked/c5:[&_.card3]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c5:[&_.card2]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c5:[&_.card1]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c5:[&_.card12]:translate-y-[calc(var(--card-gap)*-5)]

            /* State 6 */
            peer-checked/c6:[&_.card6]:translate-y-0 peer-checked/c6:[&_.card6]:opacity-100 peer-checked/c6:[&_.card6]:scale-100 peer-checked/c6:[&_.card6]:[transform:rotateX(0deg)]
            peer-checked/c6:[&_.card7]:translate-y-[var(--card-gap)] peer-checked/c6:[&_.card7]:opacity-100 peer-checked/c6:[&_.card7]:[transform:rotateX(calc(var(--rot)*-1))]
            peer-checked/c6:[&_.card5]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c6:[&_.card5]:opacity-100 peer-checked/c6:[&_.card5]:[transform:rotateX(var(--rot))]
            peer-checked/c6:[&_.card8]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c6:[&_.card9]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c6:[&_.card10]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c6:[&_.card11]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c6:[&_.card12]:translate-y-[calc(var(--card-gap)*6)]
            peer-checked/c6:[&_.card4]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c6:[&_.card3]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c6:[&_.card2]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c6:[&_.card1]:translate-y-[calc(var(--card-gap)*-5)]

            /* State 7 */
            peer-checked/c7:[&_.card7]:translate-y-0 peer-checked/c7:[&_.card7]:opacity-100 peer-checked/c7:[&_.card7]:scale-100 peer-checked/c7:[&_.card7]:[transform:rotateX(0deg)]
            peer-checked/c7:[&_.card8]:translate-y-[var(--card-gap)] peer-checked/c7:[&_.card8]:opacity-100 peer-checked/c7:[&_.card8]:[transform:rotateX(calc(var(--rot)*-1))]
            peer-checked/c7:[&_.card6]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c7:[&_.card6]:opacity-100 peer-checked/c7:[&_.card6]:[transform:rotateX(var(--rot))]
            peer-checked/c7:[&_.card9]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c7:[&_.card10]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c7:[&_.card11]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c7:[&_.card12]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c7:[&_.card1]:translate-y-[calc(var(--card-gap)*6)]
            peer-checked/c7:[&_.card5]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c7:[&_.card4]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c7:[&_.card3]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c7:[&_.card2]:translate-y-[calc(var(--card-gap)*-5)]

            /* State 8 */
            peer-checked/c8:[&_.card8]:translate-y-0 peer-checked/c8:[&_.card8]:opacity-100 peer-checked/c8:[&_.card8]:scale-100 peer-checked/c8:[&_.card8]:[transform:rotateX(0deg)]
            peer-checked/c8:[&_.card9]:translate-y-[var(--card-gap)] peer-checked/c8:[&_.card9]:opacity-100 peer-checked/c8:[&_.card9]:[transform:rotateX(calc(var(--rot)*-1))]
            peer-checked/c8:[&_.card7]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c8:[&_.card7]:opacity-100 peer-checked/c8:[&_.card7]:[transform:rotateX(var(--rot))]
            peer-checked/c8:[&_.card10]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c8:[&_.card11]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c8:[&_.card12]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c8:[&_.card1]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c8:[&_.card2]:translate-y-[calc(var(--card-gap)*6)]
            peer-checked/c8:[&_.card6]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c8:[&_.card5]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c8:[&_.card4]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c8:[&_.card3]:translate-y-[calc(var(--card-gap)*-5)]

            /* State 9 */
            peer-checked/c9:[&_.card9]:translate-y-0 peer-checked/c9:[&_.card9]:opacity-100 peer-checked/c9:[&_.card9]:scale-100 peer-checked/c9:[&_.card9]:[transform:rotateX(0deg)]
            peer-checked/c9:[&_.card10]:translate-y-[var(--card-gap)] peer-checked/c9:[&_.card10]:opacity-100 peer-checked/c9:[&_.card10]:[transform:rotateX(calc(var(--rot)*-1))]
            peer-checked/c9:[&_.card8]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c9:[&_.card8]:opacity-100 peer-checked/c9:[&_.card8]:[transform:rotateX(var(--rot))]
            peer-checked/c9:[&_.card11]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c9:[&_.card12]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c9:[&_.card1]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c9:[&_.card2]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c9:[&_.card3]:translate-y-[calc(var(--card-gap)*6)]
            peer-checked/c9:[&_.card7]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c9:[&_.card6]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c9:[&_.card5]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c9:[&_.card4]:translate-y-[calc(var(--card-gap)*-5)]

            /* State 10 */
            peer-checked/c10:[&_.card10]:translate-y-0 peer-checked/c10:[&_.card10]:opacity-100 peer-checked/c10:[&_.card10]:scale-100 peer-checked/c10:[&_.card10]:[transform:rotateX(0deg)]
            peer-checked/c10:[&_.card11]:translate-y-[var(--card-gap)] peer-checked/c10:[&_.card11]:opacity-100 peer-checked/c10:[&_.card11]:[transform:rotateX(calc(var(--rot)*-1))]
            peer-checked/c10:[&_.card9]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c10:[&_.card9]:opacity-100 peer-checked/c10:[&_.card9]:[transform:rotateX(var(--rot))]
            peer-checked/c10:[&_.card12]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c10:[&_.card1]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c10:[&_.card2]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c10:[&_.card3]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c10:[&_.card4]:translate-y-[calc(var(--card-gap)*6)]
            peer-checked/c10:[&_.card8]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c10:[&_.card7]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c10:[&_.card6]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c10:[&_.card5]:translate-y-[calc(var(--card-gap)*-5)]

            /* State 11 */
            peer-checked/c11:[&_.card11]:translate-y-0 peer-checked/c11:[&_.card11]:opacity-100 peer-checked/c11:[&_.card11]:scale-100 peer-checked/c11:[&_.card11]:[transform:rotateX(0deg)]
            peer-checked/c11:[&_.card12]:translate-y-[var(--card-gap)] peer-checked/c11:[&_.card12]:opacity-100 peer-checked/c11:[&_.card12]:[transform:rotateX(calc(var(--rot)*-1))]
            peer-checked/c11:[&_.card10]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c11:[&_.card10]:opacity-100 peer-checked/c11:[&_.card10]:[transform:rotateX(var(--rot))]
            peer-checked/c11:[&_.card1]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c11:[&_.card2]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c11:[&_.card3]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c11:[&_.card4]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c11:[&_.card5]:translate-y-[calc(var(--card-gap)*6)]
            peer-checked/c11:[&_.card9]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c11:[&_.card8]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c11:[&_.card7]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c11:[&_.card6]:translate-y-[calc(var(--card-gap)*-5)]

            /* State 12 */
            peer-checked/c12:[&_.card12]:translate-y-0 peer-checked/c12:[&_.card12]:opacity-100 peer-checked/c12:[&_.card12]:scale-100 peer-checked/c12:[&_.card12]:[transform:rotateX(0deg)]
            peer-checked/c12:[&_.card1]:translate-y-[var(--card-gap)] peer-checked/c12:[&_.card1]:opacity-100 peer-checked/c12:[&_.card1]:[transform:rotateX(calc(var(--rot)*-1))]
            peer-checked/c12:[&_.card11]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c12:[&_.card11]:opacity-100 peer-checked/c12:[&_.card11]:[transform:rotateX(var(--rot))]
            peer-checked/c12:[&_.card2]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c12:[&_.card3]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c12:[&_.card4]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c12:[&_.card5]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c12:[&_.card6]:translate-y-[calc(var(--card-gap)*6)]
            peer-checked/c12:[&_.card10]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c12:[&_.card9]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c12:[&_.card8]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c12:[&_.card7]:translate-y-[calc(var(--card-gap)*-5)]
          "
        >
          {/* <div className="h-[calc(var(--sfu)*12)] w-2/3 invisible pointer-events-none" /> */}

          {cards.map((p, i) => (
            <Card
              key={i}
              title={p.title}
              description={p.description}
              className={`card${i + 1} absolute transition-all duration-500 ease-[var(--motion-steady)]`}
              icon={p.icon}
            />
          ))}
        </div>

        {/* Navigation Controls - Extended to 12 */}
        <div
          className="flex gap-[calc(var(--sfu)*0.5)] 
          peer-checked/c1:[&_.down-2]:block peer-checked/c2:[&_.down-3]:block peer-checked/c3:[&_.down-4]:block peer-checked/c4:[&_.down-5]:block peer-checked/c5:[&_.down-6]:block peer-checked/c6:[&_.down-7]:block peer-checked/c7:[&_.down-8]:block peer-checked/c8:[&_.down-9]:block peer-checked/c9:[&_.down-10]:block peer-checked/c10:[&_.down-11]:block peer-checked/c11:[&_.down-12]:block peer-checked/c12:[&_.down-1]:block
          peer-checked/c1:[&_.up-12]:block peer-checked/c2:[&_.up-1]:block peer-checked/c3:[&_.up-2]:block peer-checked/c4:[&_.up-3]:block peer-checked/c5:[&_.up-4]:block peer-checked/c6:[&_.up-5]:block peer-checked/c7:[&_.up-6]:block peer-checked/c8:[&_.up-7]:block peer-checked/c9:[&_.up-8]:block peer-checked/c10:[&_.up-9]:block peer-checked/c11:[&_.up-10]:block peer-checked/c12:[&_.up-11]:block"
        >
          {/* Up Button */}
          <div className="p-[calc(var(--sfu)*1.25)] rounded-full bg-[var(--color-bg-base)] text-[var(--color-text-base)] relative active:scale-95 transition-transform">
            <FiArrowUp strokeWidth={1.5} />
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
              <label
                key={n}
                htmlFor={`card-${n}`}
                className={`up-${n} absolute inset-0 hidden cursor-pointer`}
              />
            ))}
          </div>
          {/* Down Button */}
          <div className="p-[calc(var(--sfu)*1.25)] rounded-full bg-[var(--color-bg-base)] text-[var(--color-text-base)] relative active:scale-95 transition-transform">
            <FiArrowDown strokeWidth={1.5} />
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
              <label
                key={n}
                htmlFor={`card-${n}`}
                className={`down-${n} absolute inset-0 hidden cursor-pointer`}
              />
            ))}
          </div>
        </div>

        <div
          className="hidden sm:flex flex-col gap-[calc(var(--sfu)*0.5)] absolute right-0 top-1/2 -translate-1/2 mr-[calc(var(--sfu)*2)]
        peer-checked/c1:[&_.line-1]:scale-x-200  peer-checked/c1:[&_.line-1]:bg-[var(--color-bg-base)]
        peer-checked/c2:[&_.line-2]:scale-x-200  peer-checked/c2:[&_.line-2]:bg-[var(--color-bg-base)]
        peer-checked/c3:[&_.line-3]:scale-x-200  peer-checked/c3:[&_.line-3]:bg-[var(--color-bg-base)]
        peer-checked/c4:[&_.line-4]:scale-x-200  peer-checked/c4:[&_.line-4]:bg-[var(--color-bg-base)]
        peer-checked/c5:[&_.line-5]:scale-x-200  peer-checked/c5:[&_.line-5]:bg-[var(--color-bg-base)]
        peer-checked/c6:[&_.line-6]:scale-x-200  peer-checked/c6:[&_.line-6]:bg-[var(--color-bg-base)]
        peer-checked/c7:[&_.line-1]:scale-x-200  peer-checked/c7:[&_.line-1]:bg-[var(--color-bg-base)]
        peer-checked/c8:[&_.line-2]:scale-x-200  peer-checked/c8:[&_.line-2]:bg-[var(--color-bg-base)]
        peer-checked/c9:[&_.line-3]:scale-x-200  peer-checked/c9:[&_.line-3]:bg-[var(--color-bg-base)]
        peer-checked/c10:[&_.line-4]:scale-x-200 peer-checked/c10:[&_.line-4]:bg-[var(--color-bg-base)]
        peer-checked/c11:[&_.line-5]:scale-x-200 peer-checked/c11:[&_.line-5]:bg-[var(--color-bg-base)]
        peer-checked/c12:[&_.line-6]:scale-x-200 peer-checked/c12:[&_.line-6]:bg-[var(--color-bg-base)]
         "
        >
          {[...Array(uel)].map((_, i) => {
            return (
              <div
                key={i}
                className={`line-${i + 1} w-[calc(var(--sfu)*0.5)] h-[calc(var(--sfu)*0.125)] rounded-full bg-[var(--color-bg-action-secondary)] transition-all duration-[var(--duration-medium)] ease-[var(--motion-steady)]`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  description,
  icon: Icon,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={`w-11/12 sm:w-2/3 h-fit p-[calc(var(--sfu)*1.75)] rounded-[calc(var(--sfu)*0.25)] 
        bg-[var(--color-electric-lime)] flex flex-col gap-[calc(var(--sfu)*1.25)] 
        text-[var(--color-bg-action)] ${className}`}
    >
      <h3 className="text-[calc(var(--sfu)*2.25)] leading-tight tracking-tighter">
        {title}
      </h3>

      <div className="flex flex-col sm:flex-row items-center gap-[calc(var(--sfu)*1.5)]">
        {/* 1. Render the Icon component here */}
        {/* We use a wrapper to control the "Expensive" look of the icon */}
        <div className=" hidden sm:block shrink-0 text-[calc(var(--sfu)*1.5)] p-[calc(var(--sfu)*1)] rounded-full bg-[var(--color-bg-action)]/15">
          {Icon && <Icon />}
        </div>

        <p className="leading-normal font-medium opacity-90">{description}</p>
      </div>
    </div>
  );
}
