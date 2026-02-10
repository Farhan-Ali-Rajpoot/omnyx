import { Section } from "@/components/UI/Section";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { HTMLProps } from "react";
import Image from "next/image";
import { RadialDashCircle, WorldMap } from "@/config/Icons";

export function Reviews() {
  const reviews = [
    // --- CLUSTER 1: EUROPE (Dense, Small Distance, High Zoom) ---
    // Strategy: Minimize camera movement by moving neighbor-to-neighbor.
    {
      title:
        "Rock-Solid Security Architecture and Outstanding Platform Reliability",
      description:
        "Our data integrity has remained uncompromised. The platform’s stability under peak traffic during our UK rollout proved the strength of its engineering foundation.",
      image: "/images/avatars/james.jpg",
      name: "James Whitaker",
      country: "united-kingdom", // United Kingdom
      role: "Technology Officer",
    },
    {
      title: "Cutting-Edge Nano-Tech and Systems Integration",
      description:
        "Our collaboration required extreme precision and low-level systems architecture. This solution provided the perfect framework for our hardware-software integration projects in Leuven.",
      image: "/images/avatars/benoit.jpg",
      name: "Benoît Lefebvre",
      country: "belgium", // Belgium (Direct neighbor to UK/France)
      role: "Systems Integration",
    },
    {
      title: "Robust AI Data Pipelines for Real-Time Analytics",
      description:
        "We needed a backend capable of processing real-time telemetry from our automated systems. This solution delivered the low-latency throughput our engineers in Amsterdam demanded.",
      image: "/images/avatars/bram.jpg",
      name: "Bram van den Berg",
      country: "netherlands", // Netherlands (Direct neighbor to Belgium)
      role: "AI Data Engineer",
    },
    {
      title: "Masterclass In Clean Architecture and Seamless Digital Scaling",
      description:
        "Finally, a framework that prioritizes clean code and efficiency. The scaling logic is robust, making our European expansion effortless and friction-free.",
      image: "/images/avatars/lukas.jpg",
      name: "Lukas Weber",
      country: "germany", // Germany (Direct neighbor to Netherlands)
      role: "Software Engineer",
    },
    {
      title: "Streamlined Fintech Integration with Unparalleled Security",
      description:
        "In the Swiss banking sector, security is non-negotiable. This architecture provided the perfect balance of encrypted data protection and rapid transaction processing.",
      image: "/images/avatars/elias.jpg",
      name: "Elias Müller",
      country: "switzerland", // Switzerland (South of Germany)
      role: "Fintech Security",
    },
    {
      title:
        "Revolutionizing Nordic User Experience with Minimalist Efficiency",
      description:
        "The codebase aligns perfectly with our philosophy of efficiency and simplicity. It significantly reduced our technical debt while enhancing the end-user experience across Scandinavia.",
      image: "/images/avatars/astrid.jpg",
      name: "Astrid Jensen",
      country: "sweden", // Sweden (North, keeping within Europe region)
      role: "UX Strategy Head",
    },

    // --- CLUSTER 2: THE AMERICAS (Large Landmasses) ---
    // Strategy: A single "hop" across the Atlantic, then stay zoomed out for big countries.
    {
      title:
        "Driving Canadian Tech Innovation With Cutting-Edge Cloud Solutions",
      description:
        "Our Canadian operations benefited from an ultra-optimized cloud infrastructure. The team’s technical rigor and proactive problem-solving accelerated project delivery and performance.",
      image: "/images/avatars/sophia.jpg",
      name: "Sophia Tremblay",
      country: "canada", // Canada
      role: "Cloud Architect",
    },
    {
      title:
        "Driving Market-Leading Visibility With a Data-Driven SEO Strategy",
      description:
        "Their precision-focused technical SEO approach helped us secure top search positions across highly competitive U.S. markets far faster than expected.",
      image: "/images/avatars/john.jpg",
      name: "John Miller",
      country: "united-states", // United States (Direct neighbor south)
      role: "Director of Growth",
    },

    // --- CLUSTER 3: ASIA (Large & Distant) ---
    // Strategy: Hop to Asia, then sweep Eastward.
    {
      title: "Agile Development Velocity for Rapid Market Deployment",
      description:
        "Our team in Bangalore appreciated the modular design. It allowed us to iterate features rapidly and deploy updates to our global user base without downtime.",
      image: "/images/avatars/priya.jpg",
      name: "Priya Sharma",
      country: "india", // India
      role: "DevOps Engineer",
    },
    {
      title: "Exceptional Scalability for High-Volume Mobile Ecosystems",
      description:
        "Integrating this solution into our Shenzhen R&D hub was seamless. The ability to handle massive concurrent user loads without latency is exactly what our ecosystem required.",
      image: "/images/avatars/wei.jpg",
      name: "Wei Zhang",
      country: "china", // China (Direct neighbor to India)
      role: "Mobile Product Lead",
    },
    {
      title: "The Most Fluid Performance Engineering Ever Encountered",
      description:
        "The performance is unmatched. Our load times dropped by 60% across Seoul and Tokyo, and the fluid responsiveness feels incredibly premium on every device.",
      image: "/images/avatars/ji-won.jpg",
      name: "Park Ji-won",
      country: "south-korea", // South Korea (East of China)
      role: "Systems Architect",
    },
    {
      title: "Redefining Luxury Standards Through Meticulous UI Execution",
      description:
        "A masterclass in modern web design. Every interaction is smooth, precise, and perfectly aligned with the high-end aesthetic our Japanese clients demand.",
      image: "/images/avatars/yuki.jpg",
      name: "Yuki Tanaka",
      country: "japan", // Japan (East of Korea)
      role: "Creative Director",
    },
  ];

  const cards = [...reviews];

  return (
    <>
      <Section className="py-[calc(var(--sfu)*2)]">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-[calc(var(--sfu)*1)] w-full">
          {/* INPUTS ARE HERE (Parent Level).
            They act as peers to the sibling elements below (The Map and The Carousel).
          */}
          {cards.map((obj, num) => (
            <input
              key={`${num}-rv`}
              type="radio"
              name="mindset-stack-rv"
              id={`card-${num + 1}-rv`} // Fixed index to match 1-based logic usually used in CSS
              defaultChecked={num === 0} // Check the first one
              className={`hidden peer/c${num + 1} peer/${obj.country}`}
            />
          ))}

          {/* Left Side: Map Panel */}
          <div
            className="h-fit w-full lg:max-w-1/3 lg:h-[calc(var(--sfu)*35)] 2xl:h-[calc(var(--sfu)*42.5)]

            [--cu:0.8] sm:[--cu:1.6] md:[--cu:2] lg:[--cu:0.8] xl:[--cu:1.03125] 2xl:[--cu:1.3] 

            peer-checked/canada:[&_.wm]:scale-275 peer-checked/canada:[&_.wm]:translate-y-[calc(var(--sfu)*15*var(--cu))] peer-checked/canada:[&_.wm]:translate-x-[calc(var(--sfu)*13*var(--cu))]
            peer-checked/south-korea:[&_.wm]:scale-900 peer-checked/south-korea:[&_.wm]:translate-y-[calc(var(--sfu)*22*var(--cu))] peer-checked/south-korea:[&_.wm]:-translate-x-[calc(var(--sfu)*60*var(--cu))]
            peer-checked/germany:[&_.wm]:scale-900 peer-checked/germany:[&_.wm]:translate-y-[calc(var(--sfu)*30*var(--cu))] peer-checked/germany:[&_.wm]:-translate-x-[calc(var(--sfu)*1.5*var(--cu))]
            peer-checked/united-states:[&_.wm]:scale-275 peer-checked/united-states:[&_.wm]:translate-y-[calc(var(--sfu)*13*var(--cu))] peer-checked/united-states:[&_.wm]:translate-x-[calc(var(--sfu)*16*var(--cu))]
            peer-checked/japan:[&_.wm]:scale-675 peer-checked/japan:[&_.wm]:translate-y-[calc(var(--sfu)*18*var(--cu))] peer-checked/japan:[&_.wm]:-translate-x-[calc(var(--sfu)*49*var(--cu))]

            peer-checked/united-kingdom:[&_.wm]:scale-900 peer-checked/united-kingdom:[&_.wm]:translate-y-[calc(var(--sfu)*32*var(--cu))] 
            peer-checked/united-kingdom:[&_.wm]:translate-x-[calc(var(--sfu)*3*var(--cu))]

            peer-checked/china:[&_.wm]:scale-475 peer-checked/china:[&_.wm]:translate-y-[calc(var(--sfu)*14*var(--cu))] 
            peer-checked/china:[&_.wm]:-translate-x-[calc(var(--sfu)*25*var(--cu))]

            peer-checked/switzerland:[&_.wm]:scale-1600 peer-checked/switzerland:[&_.wm]:translate-y-[calc(var(--sfu)*45*var(--cu))] 
            peer-checked/switzerland:[&_.wm]:-translate-x-[calc(var(--sfu)*3*var(--cu))]

            peer-checked/sweden:[&_.wm]:scale-875 peer-checked/sweden:[&_.wm]:translate-y-[calc(var(--sfu)*35*var(--cu))] 
            peer-checked/sweden:[&_.wm]:-translate-x-[calc(var(--sfu)*4*var(--cu))]

            peer-checked/netherlands:[&_.wm]:scale-1600 peer-checked/netherlands:[&_.wm]:translate-y-[calc(var(--sfu)*50*var(--cu))] 
            peer-checked/netherlands:[&_.wm]:-translate-x-[calc(var(--sfu)*0*var(--cu))]

            peer-checked/india:[&_.wm]:scale-475 peer-checked/india:[&_.wm]:translate-y-[calc(var(--sfu)*10*var(--cu))] 
            peer-checked/india:[&_.wm]:-translate-x-[calc(var(--sfu)*21*var(--cu))]

            peer-checked/belgium:[&_.wm]:scale-1600 peer-checked/belgium:[&_.wm]:translate-y-[calc(var(--sfu)*48*var(--cu))] 
            peer-checked/belgium:[&_.wm]:-translate-x-[calc(var(--sfu)*0*var(--cu))]

            peer-checked/united-kingdom:[&_.sm-state-GB]:[fill:var(--color-electric-lime)]
            peer-checked/belgium:[&_.sm-state-BE]:[fill:var(--color-electric-lime)] peer-checked/belgium:[&_path]:stroke-[0.1]
            peer-checked/netherlands:[&_.sm-state-NL]:[fill:var(--color-electric-lime)] peer-checked/netherlands:[&_path]:stroke-[0.1]
            peer-checked/germany:[&_.sm-state-DE]:[fill:var(--color-electric-lime)] 
            peer-checked/switzerland:[&_.sm-state-CH]:[fill:var(--color-electric-lime)] peer-checked/switzerland:[&_path]:stroke-[0.1]
            peer-checked/sweden:[&_.sm-state-SE]:[fill:var(--color-electric-lime)] 
            peer-checked/canada:[&_.sm-state-CA]:[fill:var(--color-electric-indigo)] 
            peer-checked/united-states:[&_.sm-state-US]:[fill:var(--color-electric-indigo)] peer-
            peer-checked/india:[&_.sm-state-IN]:[fill:var(--color-electric-red)] 
            peer-checked/china:[&_.sm-state-CN]:[fill:var(--color-electric-red)] 
            peer-checked/south-korea:[&_.sm-state-KR]:[fill:var(--color-electric-red)] peer-
            peer-checked/japan:[&_.sm-state-JP]:[fill:var(--color-electric-red)] 
            
            "
          >
            <div
              className="h-full w-full rounded-full flex flex-col items-center text-center justify-between bg-[var(--color-bg-contrast)] p-[calc(var(--sfu)*1)] py-[calc(var(--sfu)*2)]
               mt-[calc(var(--sfu)*1)]
             overflow-hidden text-[var(--color-text-contrast)]"
            >
              <p className="leading-[1]">
                Working <br /> Worldwide
              </p>

              <div className="w-full aspect-square py-[calc(var(--sfu)*2)]">
                <div className="h-full w-full px-[calc(var(--sfu)*1)]">
                  <div className="w-full aspect-square rounded-full relative">
                    <RadialDashCircle className="absolute inset-[calc(var(--sfu)*-0.25)] z-10 text-[var(--color-text-action)] ease-[var(--motion-steady)]" />
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <WorldMap
                        className="wm absolute inset-0 transition-all duration-[var(--duration-extra-long)] ease-[var(--motion-steady)]]
                        [&_path]:transition-all [&_path]:duration-[var(--duration-short)] [&_path]:ease-[var(--motion-steady)] [&_path]:stroke-[0.2]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <p className="font-brisa text-[calc(var(--sfu)*1.25)]">
                Dealing with All
              </p>
            </div>
          </div>

          {/* Right Side: Carousel */}
          {/* We pass the data. The CSS logic inside this component will react to the 'peer' inputs above. */}
          <ReviewCarasoul data={reviews} />
        </div>
      </Section>
    </>
  );
}

interface CardProps extends HTMLProps<HTMLDivElement> {
  title: string;
  description: string;
  image: string;
  name: string;
  country: string;
  role: string;
}

function ReviewCarasoul({ data }: { data: CardProps[] }) {
  const cards = [...data];
  const uel = 6;

  return (
    <div
      className="h-[calc(var(--sfu)*33)] lg:h-[calc(var(--sfu)*35)] 2xl:h-[calc(var(--sfu)*42.5)] w-full lg:w-2/3

        /* Card active indicator */
        peer-checked/c1:[&_.line-1]:scale-x-200  peer-checked/c1:[&_.line-1]:bg-[var(--color-electric-indigo)]
        peer-checked/c2:[&_.line-2]:scale-x-200  peer-checked/c2:[&_.line-2]:bg-[var(--color-electric-indigo)]
        peer-checked/c3:[&_.line-3]:scale-x-200  peer-checked/c3:[&_.line-3]:bg-[var(--color-electric-indigo)]
        peer-checked/c4:[&_.line-4]:scale-x-200  peer-checked/c4:[&_.line-4]:bg-[var(--color-electric-indigo)]
        peer-checked/c5:[&_.line-5]:scale-x-200  peer-checked/c5:[&_.line-5]:bg-[var(--color-electric-indigo)]
        peer-checked/c6:[&_.line-6]:scale-x-200  peer-checked/c6:[&_.line-6]:bg-[var(--color-electric-indigo)]
        peer-checked/c7:[&_.line-7]:scale-x-200  peer-checked/c7:[&_.line-7]:bg-[var(--color-electric-indigo)]
        peer-checked/c8:[&_.line-8]:scale-x-200  peer-checked/c8:[&_.line-8]:bg-[var(--color-electric-indigo)]
        peer-checked/c9:[&_.line-9]:scale-x-200  peer-checked/c9:[&_.line-9]:bg-[var(--color-electric-indigo)]
        peer-checked/c10:[&_.line-10]:scale-x-200 peer-checked/c10:[&_.line-10]:bg-[var(--color-electric-indigo)]
        peer-checked/c11:[&_.line-11]:scale-x-200 peer-checked/c11:[&_.line-11]:bg-[var(--color-electric-indigo)]
        peer-checked/c12:[&_.line-12]:scale-x-200 peer-checked/c12:[&_.line-12]:bg-[var(--color-electric-indigo)]

        /* Navigation Controls */
        peer-checked/c1:[&_.down-2-rv]:block peer-checked/c2:[&_.down-3-rv]:block peer-checked/c3:[&_.down-4-rv]:block peer-checked/c4:[&_.down-5-rv]:block
        peer-checked/c5:[&_.down-6-rv]:block peer-checked/c6:[&_.down-7-rv]:block peer-checked/c7:[&_.down-8-rv]:block peer-checked/c8:[&_.down-9-rv]:block
        peer-checked/c9:[&_.down-10-rv]:block peer-checked/c10:[&_.down-11-rv]:block peer-checked/c11:[&_.down-12-rv]:block peer-checked/c12:[&_.down-1-rv]:block
        peer-checked/c1:[&_.up-12-rv]:block peer-checked/c2:[&_.up-1-rv]:block peer-checked/c3:[&_.up-2-rv]:block peer-checked/c4:[&_.up-3-rv]:block 
        peer-checked/c5:[&_.up-4-rv]:block peer-checked/c6:[&_.up-5-rv]:block peer-checked/c7:[&_.up-6-rv]:block peer-checked/c8:[&_.up-7-rv]:block 
        peer-checked/c9:[&_.up-8-rv]:block peer-checked/c10:[&_.up-9-rv]:block peer-checked/c11:[&_.up-10-rv]:block peer-checked/c12:[&_.up-11-rv]:block

        [--card-gap:180%] 2xl:[--card-gap:300%]
        [--rot:60deg]
        
        /* State 1 */
        peer-checked/c1:[&_.card1-rv]:translate-y-0 peer-checked/c1:[&_.card1-rv]:opacity-100 peer-checked/c1:[&_.card1-rv]:scale-100 peer-checked/c1:[&_.card1-rv]:[transform:rotateX(0deg)]
        peer-checked/c1:[&_.card2-rv]:translate-y-[var(--card-gap)] peer-checked/c1:[&_.card2-rv]:opacity-100 peer-checked/c1:[&_.card2-rv]:[transform:rotateX(calc(var(--rot)*-1))]
        peer-checked/c1:[&_.card12-rv]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c1:[&_.card12-rv]:opacity-100 peer-checked/c1:[&_.card12-rv]:[transform:rotateX(var(--rot))]
        peer-checked/c1:[&_.card3-rv]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c1:[&_.card4-rv]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c1:[&_.card5-rv]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c1:[&_.card6-rv]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c1:[&_.card7-rv]:translate-y-[calc(var(--card-gap)*6)]
        peer-checked/c1:[&_.card11-rv]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c1:[&_.card10-rv]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c1:[&_.card9-rv]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c1:[&_.card8-rv]:translate-y-[calc(var(--card-gap)*-5)]
        
        /* State 2 */
        peer-checked/c2:[&_.card2-rv]:translate-y-0 peer-checked/c2:[&_.card2-rv]:opacity-100 peer-checked/c2:[&_.card2-rv]:scale-100 peer-checked/c2:[&_.card2-rv]:[transform:rotateX(0deg)]
        peer-checked/c2:[&_.card3-rv]:translate-y-[var(--card-gap)] peer-checked/c2:[&_.card3-rv]:opacity-100 peer-checked/c2:[&_.card3-rv]:[transform:rotateX(calc(var(--rot)*-1))]
        peer-checked/c2:[&_.card1-rv]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c2:[&_.card1-rv]:opacity-100 peer-checked/c2:[&_.card1-rv]:[transform:rotateX(var(--rot))]
        peer-checked/c2:[&_.card4-rv]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c2:[&_.card5-rv]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c2:[&_.card6-rv]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c2:[&_.card7-rv]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c2:[&_.card8-rv]:translate-y-[calc(var(--card-gap)*6)]
        peer-checked/c2:[&_.card12-rv]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c2:[&_.card11-rv]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c2:[&_.card10-rv]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c2:[&_.card9-rv]:translate-y-[calc(var(--card-gap)*-5)]

        /* State 3 */
        peer-checked/c3:[&_.card3-rv]:translate-y-0 peer-checked/c3:[&_.card3-rv]:opacity-100 peer-checked/c3:[&_.card3-rv]:scale-100 peer-checked/c3:[&_.card3-rv]:[transform:rotateX(0deg)]
        peer-checked/c3:[&_.card4-rv]:translate-y-[var(--card-gap)] peer-checked/c3:[&_.card4-rv]:opacity-100 peer-checked/c3:[&_.card4-rv]:[transform:rotateX(calc(var(--rot)*-1))]
        peer-checked/c3:[&_.card2-rv]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c3:[&_.card2-rv]:opacity-100 peer-checked/c3:[&_.card2-rv]:[transform:rotateX(var(--rot))]
        peer-checked/c3:[&_.card5-rv]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c3:[&_.card6-rv]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c3:[&_.card7-rv]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c3:[&_.card8-rv]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c3:[&_.card9-rv]:translate-y-[calc(var(--card-gap)*6)]
        peer-checked/c3:[&_.card1-rv]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c3:[&_.card12-rv]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c3:[&_.card11-rv]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c3:[&_.card10-rv]:translate-y-[calc(var(--card-gap)*-5)]
        
        /* State 4 */
        peer-checked/c4:[&_.card4-rv]:translate-y-0 peer-checked/c4:[&_.card4-rv]:opacity-100 peer-checked/c4:[&_.card4-rv]:scale-100 peer-checked/c4:[&_.card4-rv]:[transform:rotateX(0deg)]
        peer-checked/c4:[&_.card5-rv]:translate-y-[var(--card-gap)] peer-checked/c4:[&_.card5-rv]:opacity-100 peer-checked/c4:[&_.card5-rv]:[transform:rotateX(calc(var(--rot)*-1))]
        peer-checked/c4:[&_.card3-rv]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c4:[&_.card3-rv]:opacity-100 peer-checked/c4:[&_.card3-rv]:[transform:rotateX(var(--rot))]
        peer-checked/c4:[&_.card6-rv]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c4:[&_.card7-rv]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c4:[&_.card8-rv]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c4:[&_.card9-rv]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c4:[&_.card10-rv]:translate-y-[calc(var(--card-gap)*6)]
        peer-checked/c4:[&_.card2-rv]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c4:[&_.card1-rv]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c4:[&_.card12-rv]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c4:[&_.card11-rv]:translate-y-[calc(var(--card-gap)*-5)]

        /* State 5 */
        peer-checked/c5:[&_.card5-rv]:translate-y-0 peer-checked/c5:[&_.card5-rv]:opacity-100 peer-checked/c5:[&_.card5-rv]:scale-100 peer-checked/c5:[&_.card5-rv]:[transform:rotateX(0deg)]
        peer-checked/c5:[&_.card6-rv]:translate-y-[var(--card-gap)] peer-checked/c5:[&_.card6-rv]:opacity-100 peer-checked/c5:[&_.card6-rv]:[transform:rotateX(calc(var(--rot)*-1))]
        peer-checked/c5:[&_.card4-rv]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c5:[&_.card4-rv]:opacity-100 peer-checked/c5:[&_.card4-rv]:[transform:rotateX(var(--rot))]
        peer-checked/c5:[&_.card7-rv]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c5:[&_.card8-rv]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c5:[&_.card9-rv]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c5:[&_.card10-rv]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c5:[&_.card11-rv]:translate-y-[calc(var(--card-gap)*6)]
        peer-checked/c5:[&_.card3-rv]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c5:[&_.card2-rv]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c5:[&_.card1-rv]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c5:[&_.card12-rv]:translate-y-[calc(var(--card-gap)*-5)]

        /* State 6 */
        peer-checked/c6:[&_.card6-rv]:translate-y-0 peer-checked/c6:[&_.card6-rv]:opacity-100 peer-checked/c6:[&_.card6-rv]:scale-100 peer-checked/c6:[&_.card6-rv]:[transform:rotateX(0deg)]
        peer-checked/c6:[&_.card7-rv]:translate-y-[var(--card-gap)] peer-checked/c6:[&_.card7-rv]:opacity-100 peer-checked/c6:[&_.card7-rv]:[transform:rotateX(calc(var(--rot)*-1))]
        peer-checked/c6:[&_.card5-rv]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c6:[&_.card5-rv]:opacity-100 peer-checked/c6:[&_.card5-rv]:[transform:rotateX(var(--rot))]
        peer-checked/c6:[&_.card8-rv]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c6:[&_.card9-rv]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c6:[&_.card10-rv]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c6:[&_.card11-rv]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c6:[&_.card12-rv]:translate-y-[calc(var(--card-gap)*6)]
        peer-checked/c6:[&_.card4-rv]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c6:[&_.card3-rv]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c6:[&_.card2-rv]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c6:[&_.card1-rv]:translate-y-[calc(var(--card-gap)*-5)]

        /* State 7 */
        peer-checked/c7:[&_.card7-rv]:translate-y-0 peer-checked/c7:[&_.card7-rv]:opacity-100 peer-checked/c7:[&_.card7-rv]:scale-100 peer-checked/c7:[&_.card7-rv]:[transform:rotateX(0deg)]
        peer-checked/c7:[&_.card8-rv]:translate-y-[var(--card-gap)] peer-checked/c7:[&_.card8-rv]:opacity-100 peer-checked/c7:[&_.card8-rv]:[transform:rotateX(calc(var(--rot)*-1))]
        peer-checked/c7:[&_.card6-rv]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c7:[&_.card6-rv]:opacity-100 peer-checked/c7:[&_.card6-rv]:[transform:rotateX(var(--rot))]
        peer-checked/c7:[&_.card9-rv]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c7:[&_.card10-rv]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c7:[&_.card11-rv]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c7:[&_.card12-rv]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c7:[&_.card1-rv]:translate-y-[calc(var(--card-gap)*6)]
        peer-checked/c7:[&_.card5-rv]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c7:[&_.card4-rv]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c7:[&_.card3-rv]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c7:[&_.card2-rv]:translate-y-[calc(var(--card-gap)*-5)]

        /* State 8 */
        peer-checked/c8:[&_.card8-rv]:translate-y-0 peer-checked/c8:[&_.card8-rv]:opacity-100 peer-checked/c8:[&_.card8-rv]:scale-100 peer-checked/c8:[&_.card8-rv]:[transform:rotateX(0deg)]
        peer-checked/c8:[&_.card9-rv]:translate-y-[var(--card-gap)] peer-checked/c8:[&_.card9-rv]:opacity-100 peer-checked/c8:[&_.card9-rv]:[transform:rotateX(calc(var(--rot)*-1))]
        peer-checked/c8:[&_.card7-rv]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c8:[&_.card7-rv]:opacity-100 peer-checked/c8:[&_.card7-rv]:[transform:rotateX(var(--rot))]
        peer-checked/c8:[&_.card10-rv]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c8:[&_.card11-rv]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c8:[&_.card12-rv]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c8:[&_.card1-rv]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c8:[&_.card2-rv]:translate-y-[calc(var(--card-gap)*6)]
        peer-checked/c8:[&_.card6-rv]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c8:[&_.card5-rv]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c8:[&_.card4-rv]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c8:[&_.card3-rv]:translate-y-[calc(var(--card-gap)*-5)]

        /* State 9 */
        peer-checked/c9:[&_.card9-rv]:translate-y-0 peer-checked/c9:[&_.card9-rv]:opacity-100 peer-checked/c9:[&_.card9-rv]:scale-100 peer-checked/c9:[&_.card9-rv]:[transform:rotateX(0deg)]
        peer-checked/c9:[&_.card10-rv]:translate-y-[var(--card-gap)] peer-checked/c9:[&_.card10-rv]:opacity-100 peer-checked/c9:[&_.card10-rv]:[transform:rotateX(calc(var(--rot)*-1))]
        peer-checked/c9:[&_.card8-rv]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c9:[&_.card8-rv]:opacity-100 peer-checked/c9:[&_.card8-rv]:[transform:rotateX(var(--rot))]
        peer-checked/c9:[&_.card11-rv]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c9:[&_.card12-rv]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c9:[&_.card1-rv]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c9:[&_.card2-rv]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c9:[&_.card3-rv]:translate-y-[calc(var(--card-gap)*6)]
        peer-checked/c9:[&_.card7-rv]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c9:[&_.card6-rv]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c9:[&_.card5-rv]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c9:[&_.card4-rv]:translate-y-[calc(var(--card-gap)*-5)]

        /* State 10 */
        peer-checked/c10:[&_.card10-rv]:translate-y-0 peer-checked/c10:[&_.card10-rv]:opacity-100 peer-checked/c10:[&_.card10-rv]:scale-100 peer-checked/c10:[&_.card10-rv]:[transform:rotateX(0deg)]
        peer-checked/c10:[&_.card11-rv]:translate-y-[var(--card-gap)] peer-checked/c10:[&_.card11-rv]:opacity-100 peer-checked/c10:[&_.card11-rv]:[transform:rotateX(calc(var(--rot)*-1))]
        peer-checked/c10:[&_.card9-rv]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c10:[&_.card9-rv]:opacity-100 peer-checked/c10:[&_.card9-rv]:[transform:rotateX(var(--rot))]
        peer-checked/c10:[&_.card12-rv]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c10:[&_.card1-rv]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c10:[&_.card2-rv]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c10:[&_.card3-rv]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c10:[&_.card4-rv]:translate-y-[calc(var(--card-gap)*6)]
        peer-checked/c10:[&_.card8-rv]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c10:[&_.card7-rv]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c10:[&_.card6-rv]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c10:[&_.card5-rv]:translate-y-[calc(var(--card-gap)*-5)]

        /* State 11 */
        peer-checked/c11:[&_.card11-rv]:translate-y-0 peer-checked/c11:[&_.card11-rv]:opacity-100 peer-checked/c11:[&_.card11-rv]:scale-100 peer-checked/c11:[&_.card11-rv]:[transform:rotateX(0deg)]
        peer-checked/c11:[&_.card12-rv]:translate-y-[var(--card-gap)] peer-checked/c11:[&_.card12-rv]:opacity-100 peer-checked/c11:[&_.card12-rv]:[transform:rotateX(calc(var(--rot)*-1))]
        peer-checked/c11:[&_.card10-rv]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c11:[&_.card10-rv]:opacity-100 peer-checked/c11:[&_.card10-rv]:[transform:rotateX(var(--rot))]
        peer-checked/c11:[&_.card1-rv]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c11:[&_.card2-rv]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c11:[&_.card3-rv]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c11:[&_.card4-rv]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c11:[&_.card5-rv]:translate-y-[calc(var(--card-gap)*6)]
        peer-checked/c11:[&_.card9-rv]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c11:[&_.card8-rv]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c11:[&_.card7-rv]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c11:[&_.card6-rv]:translate-y-[calc(var(--card-gap)*-5)]

        /* State 12 */
        peer-checked/c12:[&_.card12-rv]:translate-y-0 peer-checked/c12:[&_.card12-rv]:opacity-100 peer-checked/c12:[&_.card12-rv]:scale-100 peer-checked/c12:[&_.card12-rv]:[transform:rotateX(0deg)]
        peer-checked/c12:[&_.card1-rv]:translate-y-[var(--card-gap)] peer-checked/c12:[&_.card1-rv]:opacity-100 peer-checked/c12:[&_.card1-rv]:[transform:rotateX(calc(var(--rot)*-1))]
        peer-checked/c12:[&_.card11-rv]:translate-y-[calc(var(--card-gap)*-1)] peer-checked/c12:[&_.card11-rv]:opacity-100 peer-checked/c12:[&_.card11-rv]:[transform:rotateX(var(--rot))]
        peer-checked/c12:[&_.card2-rv]:translate-y-[calc(var(--card-gap)*2)] peer-checked/c12:[&_.card3-rv]:translate-y-[calc(var(--card-gap)*3)] peer-checked/c12:[&_.card4-rv]:translate-y-[calc(var(--card-gap)*4)] peer-checked/c12:[&_.card5-rv]:translate-y-[calc(var(--card-gap)*5)] peer-checked/c12:[&_.card6-rv]:translate-y-[calc(var(--card-gap)*6)]
        peer-checked/c12:[&_.card10-rv]:translate-y-[calc(var(--card-gap)*-2)] peer-checked/c12:[&_.card9-rv]:translate-y-[calc(var(--card-gap)*-3)] peer-checked/c12:[&_.card8-rv]:translate-y-[calc(var(--card-gap)*-4)] peer-checked/c12:[&_.card7-rv]:translate-y-[calc(var(--card-gap)*-5)]
    "
    >
      <div
        className="h-full w-full bg-[var(--color-bg-surface-emphasis)] mt-[calc(var(--sfu)*1)] overflow-hidden p-[calc(var(--sfu)*1)]
                py-[calc(var(--sfu)*3)] sm:py-[calc(var(--sfu)*1)]
                flex flex-col items-center justify-between relative rounded-[calc(var(--sfu)*1)]"
      >
        {/* INPUTS REMOVED FROM HERE */}

        {/* Heading Section */}
        <div />

        {/* The Stage - All 12 States Mapped */}
        <div
          className="relative w-full flex items-center justify-center group [perspective:1200px] [transform-style:preserve-3d]
                   [&_>_div]:opacity-0 [&_>_div]:scale-90 [&_>_div]:pointer-events-none [&_>_div]:[backface-visibility:hidden]
                  "
        >
          {cards.map((p, i) => (
            <Card
              key={`${i}-rv`}
              name={p.name}
              title={p.title}
              image={p.image}
              role={p.role}
              description={p.description}
              country={p.country}
              // Added i+1 here so it matches the class logic (card1-rv, card2-rv)
              className={`card${i + 1}-rv absolute transition-all duration-500 ease-[var(--motion-steady)]`}
            />
          ))}
        </div>

        {/* Navigation Controls - Extended to 12 */}
        {/* Labels here trigger the INPUTS present in the parent 'Reviews' component via global ID matching */}
        <div
          className="flex gap-[calc(var(--sfu)*0.5)] sm:mt-0 translate-y-[calc(var(--sfu)*2)] sm:translate-y-0 
                  "
        >
          {/* Up Button */}
          <div className="p-[calc(var(--sfu)*1.25)] rounded-full bg-[var(--color-bg-contrast)] text-[var(--color-text-contrast)] relative active:scale-95 transition-transform">
            <FiArrowUp strokeWidth={1.5} />
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
              <label
                key={`${n}-rv`}
                htmlFor={`card-${n}-rv`}
                className={`up-${n}-rv absolute inset-0 hidden cursor-pointer`}
              />
            ))}
          </div>
          {/* Down Button */}
          <div className="p-[calc(var(--sfu)*1.25)] rounded-full bg-[var(--color-bg-contrast)] text-[var(--color-text-contrast)] relative active:scale-95 transition-transform">
            <FiArrowDown strokeWidth={1.5} />
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
              <label
                key={`${n}-rv`}
                htmlFor={`card-${n}-rv`}
                className={`down-${n}-rv absolute inset-0 hidden cursor-pointer`}
              />
            ))}
          </div>
        </div>

        <div
          className="hidden sm:flex flex-col gap-[calc(var(--sfu)*0.5)] absolute right-0 top-1/2 -translate-1/2 mr-[calc(var(--sfu)*2)]
                  "
        >
          {cards.map((_, i) => {
            return (
              <div
                key={i}
                className={`line-${i + 1} w-[calc(var(--sfu)*0.5)] h-[calc(var(--sfu)*0.125)] rounded-full bg-[var(--color-border-emphasis)] transition-all duration-[var(--duration-medium)] ease-[var(--motion-steady)]`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Card({
  name,
  role,
  title,
  description,
  className = "",
  country,
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={`w-11/12 lg:w-3/4 h-fit p-[calc(var(--sfu)*1.5)] sm:p-[calc(var(--sfu)*3)] rounded-[calc(var(--sfu)*0.75)] 
        bg-[var(--color-electric-indigo)] flex flex-col gap-[calc(var(--sfu)*2)] 
        text-[var(--color-text-action)] ${className}`}
    >
      <h3 className="text-[calc(var(--sfu)*1.25)] sm:text-[calc(var(--sfu)*2)] leading-tight tracking-tighter">
        {title}
      </h3>

      <div className="flex flex-col-reverse lg:flex-row items-start justify-between gap-[calc(var(--sfu)*1.5)]">
        <div className="flex flex-row gap-[calc(var(--sfu)*1)] lg:gap-0 lg:flex-col items-center lg:items-start justify-start ">
          <div className="w-[calc(var(--sfu)*3.25)] sm:w-[calc(var(--sfu)*4)] aspect-square rounded-full bg-[var(--color-bg-base)] relative overflow-hidden">
            {/* Added Image support */}
            {/* <Image src={props.image} alt={name} fill className="object-cover" /> */}
          </div>
          <div className="flex flex-col">
            <h3 className="font-brisa text-[calc(var(--sfu)*1.25)] pt-[calc(var(--sfu)*0.25)]">
              {name}
            </h3>
            <h4
              className="py-[calc(var(--sfu)*0.125)] px-[calc(var(--sfu)*0.25)] font-mono leading-none bg-[var(--color-bg-contrast)] text-[var(--color-text-contrast)]
            text-[calc(var(--sfu)*0.75)]"
            >
              {role}
            </h4>
          </div>
        </div>
        <p className="leading-normal font-medium opacity-90 max-w-full xl:max-w-2/3 leading-[0.95]">
          {description}
        </p>
      </div>
    </div>
  );
}
