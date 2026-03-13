use rscx::{component, html, props};
use crate::config::{
    icons::{
        RadialDashCircle, Zap, Target, Moon, Layers, Cpu, UserCheck, ArrowDown, ArrowUp
    },
    meta::{
        APP_METADATA,
    },
    images::{
        images,
    },
};
use std::borrow::{Cow};

#[derive(Clone)]
pub struct CardData {
    pub title: &'static str,
    pub description: &'static str,
    pub icon: String,
}

#[props]
pub struct CreatedByProps {
    pub class: Option<Cow<'static, str>>
}

#[component]
pub fn CreatedBy(props: CreatedByProps) -> String {

    let founder_identity: Vec<CardData> = vec![
        CardData {
            title: "Caffeine Powered",
            description: "Fueled by 80% dark coffee and 20% curiosity. I turn high-quality beans into high-performance code.",
            icon: html! { <Zap class=None path_class=None /> },
        },
        CardData {
            title: "Pixel Obsessed",
            description: "I suffer from a chronic need for perfection. If it's 1px off, it’s not finished—simple as that.",
            icon: html! { <Target class=None path_class=None /> },
        },
        CardData {
            title: "Night Mode",
            description: "While the world sleeps, I build. My peak creativity hits when the notifications finally stop.",
            icon: html! { <Moon class=None path_class=None /> },
        },
        CardData {
            title: "Clean Logic",
            description: "I believe the code behind the curtain should be just as beautiful as the interface in front of it.",
            icon: html! { <Layers class=None path_class=None /> },
        },
        CardData {
            title: "Always Evolving",
            description: "The web moves at light speed, and so do I. If there's a better way to build it, I'm already learning it.",
            icon: html! { <Cpu class=None path_class=None /> },
        },
        CardData {
            title: "User Advocate",
            description: "I don't just write functions; I craft experiences. If a user has to think twice, I haven't done my job.",
            icon: html! { <UserCheck class=None path_class=None /> },
        },
    ];

    html! {
        <section class={["py-[calc(var(--sfu)*2)]", props.class.as_deref().unwrap_or("")].join(" ")}>
            // Header: Trusted By
            <div data-section-content >
                <div class="w-full flex items-center justify-center gap-[calc(var(--sfu)*0.75)] py-[calc(var(--sfu)*1)]">
                    <div class="flex -space-x-[calc(var(--sfu)*0.5)]">
                        {
                            (1..=3).map(|i| html! {
                                <div key={i.to_string()} class="h-[calc(var(--sfu)*1.5)] w-[calc(var(--sfu)*1.5)] rounded-full border-[calc(var(--sfu)*0.125)] border-[var(--color-border-emphasis)] bg-[var(--color-bg-surface-emphasis)]" />
                            }).collect::<Vec<_>>().join("")
                        }
                    </div>
                    <p class="font-medium">"Trusted by Big Croud"</p>
                </div>
                    
                // Content Grid
                <div class="flex flex-col lg:flex-row items-center justify-center gap-[calc(var(--sfu)*1)] w-full text-[var(--color-text-action)]">
                    
                    // Left Column: The Founder Card
                    <div class="h-fit lg:h-[calc(var(--sfu)*35)] 2xl:h-[calc(var(--sfu)*42.5)] w-full lg:w-2/5 border-t-[calc(var(--sfu)*0.0625)] border-[var(--color-border-surface)]">
                        <div class="h-full w-full rounded-[calc(var(--sfu)*1.25)] bg-[var(--color-electric-indigo)] p-[calc(var(--sfu)*1)] mt-[calc(var(--sfu)*1)] overflow-hidden">
                            
                            // Text: Created By + Split Name
                            <div class="pt-[calc(var(--sfu)*1)] pl-[calc(var(--sfu)*1)] leading-none">
                                <p class="font-brisa text-[calc(var(--sfu)*1.25)]">"Created By"</p>
                                {
                                    APP_METADATA.creator.split_whitespace().enumerate().map(|(i, word)| {
                                        if i == 0 {
                                            html! { <h1 class="pt-[calc(var(--sfu)*1.25)] text-[calc(var(--sfu)*3)]">{word}</h1> }
                                        } else {
                                            html! { <p class="pt-[calc(var(--sfu)*0.25)] inline-block">" "{word}</p> }
                                        }
                                    }).collect::<Vec<_>>().join("")
                                }
                            </div>
                            
                            // Parallax Image Section
                            <div class="w-auto lg:w-full aspect-square">
                                <div class="h-full w-full px-[calc(var(--sfu)*2)] pb-[calc(var(--sfu)*4)]">
                                    <div class="w-full h-full rounded-full relative">
                                        
                                        // 1. Largest Circle (Scale 1)
                                        <div 
                                            class="plx-circles plx-circle-1 absolute inset-0 rounded-full scale-[1] bg-[var(--color-electric-indigo)] overflow-hidden flex items-center justify-center ease-[var(--motion-steady)]"
                                            style="--i: 1; --d: 1;"
                                        >
                                            <div class="relative w-full h-full">
                                                <img 
                                                    src={images::people::cutout::FARHAN_ALI} 
                                                    alt="Founder" 
                                                    class="object-cover w-full h-full" 
                                                />
                                            </div>
                                        </div>
                            
                                        // 2. Middle Circle (Scale 0.75)
                                        <div 
                                            class="plx-circles plx-circle-2 absolute inset-0 rounded-full scale-[0.75] bg-[var(--color-electric-indigo)] overflow-hidden flex items-center justify-center ease-[var(--motion-steady)]"
                                            style="--i: 2; --d: -1;"
                                        >
                                            <div class="relative w-[133.33%] h-[133.33%]">
                                                <img 
                                                    src={images::people::cutout::FARHAN_ALI} 
                                                    alt="Founder" 
                                                    class="object-cover w-full h-full" 
                                                />
                                            </div>
                                        </div>
                            
                                        // 3. Smallest Circle (Scale 0.5)
                                        <div 
                                            class="plx-circles plx-circle-3 absolute inset-0 rounded-full scale-[0.5] bg-[var(--color-electric-indigo)] overflow-hidden flex items-center justify-center ease-[var(--motion-steady)]"
                                            style="--i: 3; --d: 1;"
                                        >
                                            <div class="relative w-[200%] h-[200%]">
                                                <img 
                                                    src={images::people::cutout::FARHAN_ALI} 
                                                    alt="Founder" 
                                                    class="object-cover w-full h-full" 
                                                />
                                            </div>
                                        </div>
                            
                                        // SVG Overlay
                                        <div class="absolute inset-[calc(var(--sfu)*0.25)] z-10 text-[var(--color-text-action)] ease-[var(--motion-steady)]">
                                            <RadialDashCircle class=Some("plx-svg w-full h-full") path_class=None />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                            
                    // Right Column: Carousel Placeholder
                    <MindsetCarousel data=founder_identity />
                </div>
            </div>
        </section>
    }
}









#[props]
pub struct MindsetCarouselProps {
    pub data: Vec<CardData>,
}

#[component]
pub async fn MindsetCarousel(props: MindsetCarouselProps) -> String {

    let cards_data = [props.data.clone(), props.data].concat();
    let uel = 6;

    let mut cards_html = String::new();
    
    for (i, p) in cards_data.iter().enumerate() {
        let css_class = format!(
            "card{} absolute transition-all duration-500 ease-[var(--motion-steady)]",
            i + 1
        );
        
        // Render the individual card
        let card_str = Card(CardProps {
            title: p.title.into(),
            description: p.description.into(),
            icon: p.icon.clone(),
            class_name: css_class.into(),
        }).await;

        cards_html.push_str(&card_str);
    }

    let range_1_to_12: Vec<usize> = (1..=12).collect();

    html! {
        <div class="h-[calc(var(--sfu)*33)] lg:h-[calc(var(--sfu)*35)] 2xl:h-[calc(var(--sfu)*42.5)] w-full lg:w-3/5 border-t-[calc(var(--sfu)*0.0625)] border-[var(--color-border-surface)]">
            <div
                class="h-full w-full rounded-full bg-[var(--color-bg-contrast)] mt-[calc(var(--sfu)*1)] overflow-hidden p-[calc(var(--sfu)*1)]
                py-[calc(var(--sfu)*3)] sm:py-[calc(var(--sfu)*1)]
                flex flex-col items-center justify-between relative"
            >
                {
                    range_1_to_12.iter().map(|num| {
                        html! {
                            <input
                                key={num.to_string()}
                                type="radio"
                                name="mindset-stack"
                                id={format!("card-{}", num)}
                                checked={if *num == 4 { "checked" } else { "" }} 
                                class={format!("hidden peer/c{}", num)}
                            />
                        }
                    }).collect::<String>()
                }

                <div class="text-[calc(var(--sfu)*1.25)]">
                    <p class="leading-[1] text-center uppercase font-bold tracking-tighter">
                        "THE MINDSET" <br /> "BEHIND THE CRAFT"
                    </p>
                </div>

                <div
                    class=r#"relative w-full flex items-center justify-center group [perspective:1200px] [transform-style:preserve-3d]
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
                    "#
                >
                    // INJECT THE PRE-RENDERED CARD HTML HERE
                    {cards_html}
                </div>

                <div
                    class="flex gap-[calc(var(--sfu)*0.5)] 
                    peer-checked/c1:[&_.down-2]:block peer-checked/c2:[&_.down-3]:block peer-checked/c3:[&_.down-4]:block peer-checked/c4:[&_.down-5]:block peer-checked/c5:[&_.down-6]:block peer-checked/c6:[&_.down-7]:block peer-checked/c7:[&_.down-8]:block peer-checked/c8:[&_.down-9]:block peer-checked/c9:[&_.down-10]:block peer-checked/c10:[&_.down-11]:block peer-checked/c11:[&_.down-12]:block peer-checked/c12:[&_.down-1]:block
                    peer-checked/c1:[&_.up-12]:block peer-checked/c2:[&_.up-1]:block peer-checked/c3:[&_.up-2]:block peer-checked/c4:[&_.up-3]:block peer-checked/c5:[&_.up-4]:block peer-checked/c6:[&_.up-5]:block peer-checked/c7:[&_.up-6]:block peer-checked/c8:[&_.up-7]:block peer-checked/c9:[&_.up-8]:block peer-checked/c10:[&_.up-9]:block peer-checked/c11:[&_.up-10]:block peer-checked/c12:[&_.up-11]:block"
                >
                    <div class="p-[calc(var(--sfu)*1.25)] rounded-full bg-[var(--color-bg-base)] text-[var(--color-text-base)] relative active:scale-95 transition-transform">
                        <ArrowUp class=None path_class=None />
                        {
                            range_1_to_12.iter().map(|n| html! {
                                <label
                                    for={format!("card-{}", n)}
                                    class={format!("up-{} absolute inset-0 hidden cursor-pointer", n)}
                                />
                            }).collect::<String>()
                        }
                    </div>
                    <div class="p-[calc(var(--sfu)*1.25)] rounded-full bg-[var(--color-bg-base)] text-[var(--color-text-base)] relative active:scale-95 transition-transform">
                        <ArrowDown class=None path_class=None />
                        {
                            range_1_to_12.iter().map(|n| html! {
                                <label
                                    for={format!("card-{}", n)}
                                    class={format!("down-{} absolute inset-0 hidden cursor-pointer", n)}
                                />
                            }).collect::<String>()
                        }
                    </div>
                </div>

                <div
                    class="hidden sm:flex flex-col gap-[calc(var(--sfu)*0.5)] absolute right-0 top-1/2 -translate-1/2 mr-[calc(var(--sfu)*2)]
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
                    {
                        (0..uel).map(|i| html! {
                            <div
                                key={i.to_string()}
                                class={format!("line-{} w-[calc(var(--sfu)*0.5)] h-[calc(var(--sfu)*0.125)] rounded-full bg-[var(--color-bg-action-secondary)] transition-all duration-[var(--duration-medium)] ease-[var(--motion-steady)]", i + 1)}
                            />
                        }).collect::<String>()
                    }
                </div>
            </div>
        </div>
    }
}

#[props]
pub struct CardProps {
    pub title: Cow<'static, str>,
    pub description: Cow<'static, str>,
    pub icon: String,
    pub class_name: Cow<'static, str>,
}

#[component]
pub async fn Card(props: CardProps) -> String {
    html! {
        <div
            class={[
                "w-11/12 sm:w-2/3 h-fit p-[calc(var(--sfu)*1.75)] rounded-[calc(var(--sfu)*0.25)] \
                bg-[var(--color-electric-lime)] flex flex-col gap-[calc(var(--sfu)*1.25)] \
                text-[var(--color-bg-action)] {}", 
                &props.class_name
            ].join(" ")}
        >
            <h3 class="text-[calc(var(--sfu)*2.25)] leading-tight tracking-tighter">
                {props.title}
            </h3>

            <div class="flex flex-col sm:flex-row items-center gap-[calc(var(--sfu)*1.5)]">
                <div class="hidden sm:block shrink-0 text-[calc(var(--sfu)*1.5)] p-[calc(var(--sfu)*1)] rounded-full bg-[var(--color-bg-action)]/15">
                    {props.icon}
                </div>

                <p class="leading-normal font-medium opacity-90">{props.description}</p>
            </div>
        </div>
    }
}