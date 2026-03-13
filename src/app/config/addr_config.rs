use crate::app::utils::env::{env_or};
use std::net::{IpAddr, Ipv4Addr};
use serde::{Deserialize};

#[derive(Debug, Deserialize, Clone)]
pub struct AddrConfig {
    pub ip: IpAddr,
    pub port: u16,
    pub domain: String
}


impl AddrConfig {
    pub fn default () -> Self {
        return Self {
            ip: IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1)),
            port: 3000,
            domain: "localhost".into(),
        }
    }

    pub fn load() -> Self {

        Self {
            ip: env_or("OWN_IP", "127.0.0.1").parse().expect("Invalid IP"),
            port: env_or("OWN_PORT", "3000").parse().expect("Invalid Port"),
            domain: env_or("OWN_DOMAIN", "localhost"),
        }
    }

    pub fn full_addr(&self) -> String {
        format!("{}:{}", self.ip, self.port)
    }
}
