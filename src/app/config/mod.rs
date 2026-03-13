pub mod addr_config;
pub mod app_env;
pub mod database_config;

pub use addr_config::AddrConfig;
pub use app_env::AppEnv;
pub use database_config::DatabaseConfig;

use serde::{Deserialize};


#[derive(Debug, Deserialize, Clone)]
pub struct Config {
    pub addr: AddrConfig,
    pub env: AppEnv,
    pub db: DatabaseConfig
}

impl Config {
    pub fn default() -> Self {
        Self {
            addr: AddrConfig::default(),
            env: AppEnv::Development,
            db: DatabaseConfig::default(),
        }
    }

    pub fn load() -> Self {
        dotenvy::dotenv().ok();

        Config {
            addr: AddrConfig::load(),
            env: AppEnv::load(),
            db: DatabaseConfig::load(),
        }
    }
}


