use serde_json::Value;

#[derive(Debug, Clone)]
pub enum Body {
    Html(String),
    Json(Value),
    Bytes(Vec<u8>),
    Redirect(String),
    Err(String),
    Empty,
}

#[derive(Debug, Clone)]
pub struct Response {
    pub body: Body,
}

impl Response {
    pub fn new(body: Body) -> Self {
        Self {
            body,
        }
    }
}

impl Body {
    pub fn to_string(self) -> String {
        match self {
            Body::Html(s) => s,
            
            Body::Json(v) => v.to_string(), 
            
            Body::Bytes(b) => String::from_utf8_lossy(&b).into_owned(),

            Body::Err(v) => v,
            
            Body::Redirect(_) | Body::Empty => String::new(),
        }
    }

    pub fn into_bytes_and_content_type(self) -> (bytes::Bytes, &'static str) {
        match self {
            Body::Html(s) => {
                (bytes::Bytes::from(s), "text/html; charset=utf-8")
            }
            Body::Json(v) => {
                // Serialize directly to a Vec<u8> then to Bytes to save a String allocation
                let vec = serde_json::to_vec(&v).unwrap_or_default();
                (bytes::Bytes::from(vec), "application/json")
            }
            Body::Bytes(b) => {
                (bytes::Bytes::from(b), "application/octet-stream")
            }
            Body::Redirect(_) | Body::Empty | Body::Err(_) => {
                (bytes::Bytes::new(), "text/plain")
            }
        }
    }
}