pub mod app_name_text;
pub mod app_icon;
pub mod radial_dash_circle;
pub mod world_map;
pub mod check;
pub mod outline_eye;
pub mod outline_eye_invisible;
pub mod x;
pub mod tiktok;
pub mod instagram;
pub mod twitter;
pub mod globe;
pub mod arrow_up;
pub mod arrow_down;
pub mod target;
pub mod zap;
pub mod moon;
pub mod layers;
pub mod cpu;
pub mod user_check;
pub mod si;

use rscx::{props};

#[derive(Default)]
#[props]
pub struct CustomIconProps {
    pub class: Option<&'static str>,
    pub path_class: Option<&'static str>,
}
