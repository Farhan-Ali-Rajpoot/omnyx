use super::*;
use const_format::formatcp;

pub mod images {
    use super::*;
    const PUBLIC_ROUTE: &str = "/public";
    const IMAGES_ROUTE: &str = formatcp!("{}/images", PUBLIC_ROUTE);

    pub mod maps {
        use super::*;
        pub const EXT: &str = ".svg"; // Maps use SVG for scaling
        const DIR: &str = formatcp!("{}/maps", IMAGES_ROUTE);
        pub const TYPE: &str = "image/svg+xml";

        pub const PAKISTAN_FOCUSED: &str = formatcp!("{}/pakistan-globe-map{}", DIR, EXT);
    }

    pub mod showcase {
        use super::*;
        pub const EXT: &str = ".webp";
        const DIR: &str = formatcp!("{}/showcase/website", IMAGES_ROUTE);
        pub const TYPE: &str = "image/webp";
        
        pub const WEBSITES: [&str; 4] = [
            formatcp!("{}/project-view{}", DIR, EXT),
            formatcp!("{}/project-view-1{}", DIR, EXT),
            formatcp!("{}/project-view-2{}", DIR, EXT),
            formatcp!("{}/project-view-3{}", DIR, EXT),
        ];
    }

    pub mod people {
        use super::*;
        pub const EXT: &str = ".webp";
        const DIR: &str = formatcp!("{}/people", IMAGES_ROUTE);
        pub const TYPE: &str = "image/webp";
        
        pub mod portrait {
            use super::*;
            pub const FARHAN_ALI: &str = formatcp!("{}/farhanali{}", DIR, EXT);
        }

        pub mod cutout {
            use super::*;
            pub const FARHAN_ALI: &str = formatcp!("{}/farhanali-no-bg{}", DIR, EXT);
        }
    }

    pub mod app {
        use super::*;
        pub const EXT: &str = ".webp";
        const DIR: &str = formatcp!("{}/app", IMAGES_ROUTE);
        pub const TYPE: &str = "image/webp";

        pub const HERO: &str = formatcp!("{}/hero{}", DIR, EXT);
    }
}