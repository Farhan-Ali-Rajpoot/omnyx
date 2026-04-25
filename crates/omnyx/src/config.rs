pub struct FrameworkInfo {
    pub name: &'static str,
    pub version: &'static str,
    pub author: &'static str,
}

pub const FRAMEWORK: FrameworkInfo = FrameworkInfo {
    name: env!("CARGO_PKG_NAME"),
    version: env!("CARGO_PKG_VERSION"),
    author: env!("CARGO_PKG_AUTHORS"), 
};