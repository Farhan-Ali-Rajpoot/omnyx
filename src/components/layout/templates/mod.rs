pub mod base_layout;
pub mod home_layout;

pub use base_layout::{RootLayout,};
pub use home_layout::{HomeLayout,};

use rscx::{props};
use std::borrow::Cow;

#[props]
#[derive(Clone)]
pub struct LayoutProps {
    pub children: Option<Cow<'static, str>>,
    pub class: Option<Cow<'static, str>>,
}

