import { Metadata, Viewport } from 'next';
import { AnimButton } from '@/components/UI/AnimLink';
import { wn, favicon, shortcutIcon, appleIcon, themeColor, ogImageUrl, ogTwitterImage, applicationName, authorName, category } from '@/app/Meta';
import { FiCode, FiLayout, FiTrendingUp, FiZap } from 'react-icons/fi';
import { BiCheckCircle } from 'react-icons/bi';
import { SiNextdotjs, SiTailwindcss, SiNodedotjs, SiFirebase, SiMongodb, SiVercel, SiGit, SiReact } from "react-icons/si";



export const metadata: Metadata = {
    title: 'Tendor - A Web Developer community that provides good desgined website.',
    description:
        `Tendor is a vibrant web developer community dedicated to crafting beautifully designed, high-performance websites. We bring together designers, developers, and digital creators to share knowledge, collaborate on projects, and elevate web standards.`

    ,
    keywords: [
        'Tendor',
        'Web developer service',
        'admin login page',
        'Web developer',
        'admin dashboard',
    ],
    metadataBase: new URL(wn), // already a URL object
    applicationName: applicationName,
    category: category,
    authors: [{ name: authorName, url: wn.toString() }],
    openGraph: {
        title: 'Tendor - A Web Developer community that provides good desgined website.',
        description:
            `Tendor is a vibrant web developer community dedicated to crafting beautifully designed, high-performance websites. We bring together designers, developers, and digital creators to share knowledge, collaborate on projects, and elevate web standards.`,
        url: `${wn}/blog`,
        siteName: applicationName,
        images: [
            {
                url: `${wn}${ogImageUrl}`,
                width: 736,
                height: 727,
                alt: 'Admin Login Page - Tendor',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tendor - A Web Developer community that provides good desgined website.',
        description:
            '`Tendor is a vibrant web developer community dedicated to crafting beautifully designed, high-performance websites. We bring together designers, developers, and digital creators to share knowledge, collaborate on projects, and elevate web standards.`',
        images: [`${wn}${ogTwitterImage}`],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            nocache: false,
        },
    },
    icons: {
        icon: favicon,
        shortcut: shortcutIcon,
        apple: appleIcon,
    },
    alternates: {
        canonical: `${wn}/blog`,
    },
};

export const viewport: Viewport = {
    themeColor: `${themeColor}`,
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};


const page = () => {

    return (
        <>
            <Hero />
            <Hero2 />
            <Technologies />
            <Code />
            <WhyChooseUs />
        </>
    )

};

export default page



const Hero = () => {
    const topics = [
        {
            title: 'Development',
            description: 'We converts clients idea into a visual website filled with our passion.',
            icon: <FiCode className="text-xl sm:text-2xl" />
        },
        {
            title: 'Designing',
            description: 'We make every edge of website detailed with our passion.',
            icon: <FiLayout className="text-xl sm:text-2xl" />
        },
        {
            title: 'SEO Optimization',
            description: 'Helps website to increase their visibility over internet.',
            icon: <FiTrendingUp className="text-xl sm:text-2xl" />
        },
        {
            title: 'Performance',
            description: 'Ensures fast loading times and smooth interactions for a better user experience.',
            icon: <FiZap className="text-xl sm:text-2xl" />
        }
    ];

    return (
        <>
            <div className="min-h-screen lg:h-screen gap-14 md:gap-18 lg:gap-0  mt-[25vh] lg:mt-0 lg:max-h-[900px]  lg:min-h-[600px] w-full relative flex flex-col items-center justify-center text-neutral-100 px-0 md:px-4 overflow-auto">
                <div className="flex flex-col items-center gap-4 sm:gap-6 text-center lg:absolute lg:top-[43%] lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2">
                    <p className="px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 w-fit flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
                        v_1.0.0
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold max-w-xs md:max-w-xl lg:max-w-2xl">
                        Cloud-Native Web Development for the Modern Web
                    </h2>
                </div>

                <div className="w-full flex justify-center lg:justify-between flex-wrap gap-4 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:p-6">
                    {topics.map((topic, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-start w-full max-w-xs lg:w-[calc(25%-1.5rem)] bg-neutral-900 sm:bg-transparent p-4 sm:p-6 rounded-md border border-neutral-800 sm:border-none gap-3"
                        >
                            <div className="flex gap-2 items-center">
                                {topic.icon}
                                <h4 className="text-lg sm:text-xl font-bold">{topic.title}</h4>
                            </div>
                            <p className="text-sm sm:text-base text-neutral-400">{topic.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

};

const Hero2 = () => {
    return (
        <section className="w-full text-white px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-3xl">
                    Crafting Full-Stack Solutions: Frontend & Backend Excellence
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl">
                    We deliver seamless full-stack development—from stunning user interfaces to powerful server-side architecture—tailored to your goals.
                </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {/* Card 1 - Improved */}
                <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-8 flex flex-col items-center text-center gap-4 ">
                    <div className="bg-neutral-800 p-4 rounded-full mb-2">
                        <img
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
                            alt="Next.js"
                            className="h-12 w-12 object-contain"
                        />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Full Stack Setup</h3>
                    <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">
                        Leveraging Next.js for high-performance SSR apps with seamless routing and optimized backend integration.
                    </p>
                </div>

                {/* Card 2 - Improved */}
                <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-8 flex flex-col items-center text-center gap-4 ">
                    <div className="flex gap-4 justify-center items-center mb-2">
                        <div className="bg-neutral-800 p-3 rounded-full">
                            <img
                                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                                alt="React"
                                className="h-10 w-10 object-contain"
                            />
                        </div>
                        <div className="bg-neutral-800 p-3 rounded-full">
                            <img
                                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
                                alt="Express"
                                className="h-10 w-10 object-contain invert"
                            />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Frontend & Backend Stack</h3>
                    <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">
                        Building interactive UIs with React and scalable APIs with Express.js for complete full-stack solutions.
                    </p>
                </div>
            </div>
        </section>
    );
};

const Code = () => {
    return (
        <div className="my-8 sm:my-12 w-full flex flex-col justify-center items-center px-4 sm:px-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-3xl mb-6 sm:mb-10 text-center">
                Precision in Every Line
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent mt-4 sm:mt-8"></div>
            </h2>
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 justify-center items-start w-full max-w-6xl">
                {/* Code Window - Tight layout */}
                <div className="flex flex-col gap-4 sm:gap-6 w-full md:w-auto">
                    <div className="w-full md:w-fit rounded-lg border border-neutral-700 bg-neutral-900 shadow-md overflow-hidden">
                        {/* Top Bar */}
                        <div className="flex gap-2 p-2 bg-neutral-800 border-b border-neutral-700">
                            <div className="h-2.5 sm:h-3 w-2.5 sm:w-3 rounded-full bg-red-500" />
                            <div className="h-2.5 sm:h-3 w-2.5 sm:w-3 rounded-full bg-yellow-500" />
                            <div className="h-2.5 sm:h-3 w-2.5 sm:w-3 rounded-full bg-green-500" />
                        </div>

                        {/* Code Area - Compact */}
                        <div className="p-0 font-mono text-xs sm:text-sm leading-relaxed text-neutral-100 bg-neutral-900 overflow-x-auto">
                            <div className="px-3 sm:px-4 py-2 sm:py-3 w-fit">
                                <pre className="whitespace-pre">
                                    <span className="text-green-400">function</span> <span className="text-blue-400">handleResize</span>() {"{"}
                                    <br />  <span className="text-purple-400">const</span> width = <span className="text-pink-400">window.innerWidth</span>;
                                    <br />  <span className="text-purple-400">const</span> height = <span className="text-pink-400">window.innerHeight</span>;
                                    <br />  <span className="text-blue-400">console</span>.<span className="text-yellow-400">log</span>(<span className="text-emerald-400">`Resized: ${'{'}width{'}'} x ${'{'}height{'}'}`</span>);
                                    {"}"}
                                    <br /><br />
                                    <span className="text-blue-400">window</span>.<span className="text-yellow-400">addEventListener</span>(<span className="text-emerald-400">'resize'</span>, handleResize);
                                </pre>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-fit rounded-lg border border-neutral-700 bg-neutral-900 shadow-md overflow-hidden">
                        {/* Top Bar */}
                        <div className="flex gap-2 p-2 bg-neutral-800 border-b border-neutral-700">
                            <div className="h-2.5 sm:h-3 w-2.5 sm:w-3 rounded-full bg-red-500" />
                            <div className="h-2.5 sm:h-3 w-2.5 sm:w-3 rounded-full bg-yellow-500" />
                            <div className="h-2.5 sm:h-3 w-2.5 sm:w-3 rounded-full bg-green-500" />
                        </div>

                        {/* Code Area - Compact */}
                        <div className="p-0 font-mono text-xs sm:text-sm leading-relaxed text-neutral-100 bg-neutral-900 overflow-x-auto">
                            <div className="px-3 sm:px-4 py-2 sm:py-3 w-fit">
                                <pre className="whitespace-pre">
                                    <span className="text-green-400">function</span> <span className="text-blue-400">toggleTheme</span>() {"{"}
                                    <br />  <span className="text-purple-400">const</span> root = <span className="text-pink-400">document.documentElement</span>;
                                    <br />  <span className="text-purple-400">const</span> theme = root.<span className="text-yellow-400">getAttribute</span>(<span className="text-emerald-400">'data-theme'</span>);
                                    <br />  root.<span className="text-yellow-400">setAttribute</span>(<span className="text-emerald-400">'data-theme'</span>,
                                    <br />    theme === <span className="text-emerald-400">'dark'</span> ? <span className="text-emerald-400">'light'</span> : <span className="text-emerald-400">'dark'</span>);
                                    {"}"}
                                    <br /><br />
                                    <span className="text-blue-400">document</span>.<span className="text-yellow-400">getElementById</span>(<span className="text-emerald-400">'themeBtn'</span>)
                                    <br />  .<span className="text-yellow-400">addEventListener</span>(<span className="text-emerald-400">'click'</span>, toggleTheme);
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Folder Tree Window - VS Code style compact */}
                <div className="w-full md:w-fit rounded-lg border border-neutral-700 bg-neutral-900 shadow-md overflow-hidden mt-4 sm:mt-0">
                    {/* Top Bar */}
                    <div className="flex gap-2 p-2 bg-neutral-800 border-b border-neutral-700">
                        <div className="h-2.5 sm:h-3 w-2.5 sm:w-3 rounded-full bg-red-500" />
                        <div className="h-2.5 sm:h-3 w-2.5 sm:w-3 rounded-full bg-yellow-500" />
                        <div className="h-2.5 sm:h-3 w-2.5 sm:w-3 rounded-full bg-green-500" />
                    </div>

                    {/* Folder Structure - Compact */}
                    <div className="py-2 sm:py-3 pr-4 sm:pr-6 pl-3 sm:pl-4 font-mono text-xs sm:text-sm text-neutral-200 bg-neutral-900 w-full overflow-x-auto">
                        <div className="w-fit flex flex-col gap-1">
                            <div className="flex items-center">
                                <span className="text-yellow-400 mr-1 sm:mr-2">📁</span>
                                <span className="text-yellow-400">app</span>
                            </div>
                            <div className="ml-3 sm:ml-4 flex flex-col">
                                <div className="flex items-center">
                                    <span className="text-gray-500 mr-1 sm:mr-2">└──</span>
                                    <span className="text-sky-400">layout.tsx</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-500 mr-1 sm:mr-2">└──</span>
                                    <span className="text-sky-400">layout.tsx</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-500 mr-1 sm:mr-2">└──</span>
                                    <span className="text-yellow-400 mr-1 sm:mr-2">📁</span>
                                    <span className="text-sky-400">dashboard</span>
                                </div>
                                <div className="flex items-center ml-6 sm:ml-9">
                                    <span className="text-gray-500 mr-1 sm:mr-2">└──</span>
                                    <span className="text-sky-400">page.tsx</span>
                                </div>
                            </div>

                            <div className="flex items-center mt-1">
                                <span className="text-yellow-400 mr-1 sm:mr-2">📁</span>
                                <span className="text-yellow-400">components</span>
                            </div>
                            <div className="ml-3 sm:ml-4 flex items-center">
                                <span className="text-gray-500 mr-1 sm:mr-2">└──</span>
                                <span className="text-sky-400">Navbar.tsx</span>
                            </div>
                            <div className="ml-3 sm:ml-4 flex items-center">
                                <span className="text-gray-500 mr-1 sm:mr-2">└──</span>
                                <span className="text-sky-400">Footer.tsx</span>
                            </div>

                            <div className="flex items-center mt-1">
                                <span className="text-yellow-400 mr-1 sm:mr-2">📁</span>
                                <span className="text-yellow-400">public</span>
                            </div>
                            <div className="ml-3 sm:ml-4 flex items-center">
                                <span className="text-gray-500 mr-1 sm:mr-2">└──</span>
                                <span className="text-sky-400">favicon.ico</span>
                            </div>

                            <div className="flex items-center">
                                <span className="text-sky-400">next-sitemap.config.ts</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sky-400">next.config.js</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sky-400">tailwind.config.js</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sky-400">postcss.config.json</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sky-400">package-lock.json</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sky-400">package.json</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sky-400">tsconfig.json</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Technologies = () => {

    const technologies = [
        { name: "Next.js", icon: <SiNextdotjs className='group-hover:text-[#ffffff]' />, color: "#ffffff" },
        { name: "Tailwind CSS", icon: <SiTailwindcss className='group-hover:text-[#38bdf8]' />, color: "#38bdf8" },
        { name: "Node.js", icon: <SiNodedotjs className='group-hover:text-[#68a063]' />, color: "#68a063" },
        { name: "Firebase", icon: <SiFirebase className='group-hover:text-[#FFA000]' />, color: "#FFA000" },
        { name: "React", icon: <SiReact className='group-hover:text-[#61DBFB]' />, color: "#61DBFB" },
        { name: "MongoDB", icon: <SiMongodb className='group-hover:text-[#47A248]' />, color: "#47A248" },
        { name: "Vercel", icon: <SiVercel className='group-hover:text-[#ffffff]' />, color: "#ffffff" },
        { name: "Git", icon: <SiGit className='group-hover:text-[#F05032]' />, color: "#F05032" },
    ];


    return (
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-12">Technologies We Use</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 cursor-default">
                    {technologies.map((tech, index) => (
                        <div
                            key={index}
                            className="group border border-neutral-700 bg-neutral-900 hover:border-white transition-all duration-200 rounded-xl p-6 flex flex-col items-center justify-center text-neutral-300 hover:text-white"
                        >
                            <div className="text-3xl mb-2">{tech.icon}</div>
                            <span className="text-sm font-medium">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const WhyChooseUs = () => {
    const qualities = [
        "Responsive Website",
        "Free Hosting   ( Limited Time )",
        "Complex Setup Support",
        "Login / Signup Functionality",
        "SEO Optimization",
        "Admin Panel Integration",
        "Dashboard UI Setup",
        "API Integration",
        "Custom Features",
        "Fast Performance",
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-6xl mx-auto text-center">
                <h3 className="text-sm text-neutral-500 my-3">Our Advantages </h3>
                <h2 className="text-4xl sm:text-5xl font-bold mb-12">
                    Why Choose Us
                </h2>

                <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-10 max-w-4xl mx-auto text-left shadow-lg">
                    {/* Title + Description */}
                    <div className="mb-8 text-center">
                        <h3 className="text-2xl sm:text-2xl text-neutral-100 font-semibold mb-2">Complete Web Solution</h3>
                        <p className="text-neutral-400 text-base max-w-xl mx-auto">
                            A professional package that covers everything from development to deployment.
                        </p>
                    </div>

                    {/* Feature List */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        {qualities.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-neutral-300 text-base hover:text-white cursor-default">
                                <BiCheckCircle className="text-white w-5 h-5 mt-1" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    {/* Optional CTA */}
                    <div className="mt-10 text-center w-full">
                      <AnimButton stagger={8.5} href='/' className='w-full text-base '>
                      Get Your Website
                      </AnimButton>
                    </div>
                </div>
            </div>
        </section>
    );
};


