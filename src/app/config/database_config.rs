use crate::app::utils::env::{env_or};
use serde::{Deserialize};


#[derive(Debug, Deserialize, Clone)]
pub enum DatabaseType {
    Postgres,
    Mysql,
    Sqlite,
    MongoDB,
}

#[derive(Debug, Deserialize, Clone)]
pub struct DatabaseConfig {
    pub db_type: DatabaseType,
    pub url: String,
    pub max_connection: u32,
    pub min_connection: u32,
    pub connect_timeout_seconds: u64,
    pub idle_timeout_seconds: u64,
}

impl DatabaseConfig {
    pub fn default() -> Self {
        Self {
            db_type: DatabaseType::MongoDB,
            url: "".to_string(),
            max_connection: 20,
            min_connection: 5,
            connect_timeout_seconds: 600,
            idle_timeout_seconds: 300,
        }
    }

    pub fn load() -> Self {
        let type_str = env_or("DB_TYPE", "mongodb");
        let db_type = match type_str.as_str() {
            "mysql" => DatabaseType::Mysql,
            "sqlite" => DatabaseType::Sqlite,
            "mongodb" => DatabaseType::MongoDB,
            "postgres" => DatabaseType::Postgres,
            _ => DatabaseType::Postgres,
        };

        Self {
            db_type,
            url: env_or("DATABASE_URL", "postgres://user:pass@localhost/db"),
            
            max_connection: env_or("DB_MAX_CONNECTIONS", "20")
                .parse().unwrap_or(20),
            min_connection: env_or("DB_MIN_CONNECTIONS", "5")
                .parse().unwrap_or(5),
            
            connect_timeout_seconds: env_or("DB_CONNECT_TIMEOUT", "30")
                .parse().unwrap_or(30),
            idle_timeout_seconds: env_or("DB_IDLE_TIMEOUT", "600")
                .parse().unwrap_or(600),
        }
    }
}