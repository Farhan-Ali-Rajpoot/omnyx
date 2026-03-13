use crate::app::utils::env::{env_or};
use std::fmt;
use serde::{Deserialize};

#[derive(Debug, Deserialize, Clone)]
pub enum AppEnv {
    Development,
    Staging,
    Production
}


impl AppEnv {
    pub fn load() -> Self {
    let env_val = env_or("OWN_ENV", "development");
    let normalized = env_val.to_lowercase();
    match normalized.as_str() {
        "development" => Self::Development,
        "production"  => Self::Production,
        "staging"     => Self::Staging,
        _ => panic!("❌ Invalid OWN_ENV value: '{}'", env_val),
    }
}
}

impl fmt::Display for AppEnv {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            AppEnv::Development => write!(f, "development"),
            AppEnv::Staging => write!(f, "staging"),
            AppEnv::Production => write!(f, "production"),
        }
    } 
}

