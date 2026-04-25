use serde::Serialize;

use crate::core::router::io::{Response, Body};




impl Response {
    pub fn html(content: impl Into<String>) -> Self {
        Self {
            body: Body::Html(content.into())
        }
    }

    pub fn error(message: impl Into<String>) -> Self {
        Self {
            body: Body::Err(message.into())
        }
    } 

    pub fn json<T: Serialize>(data: T) -> Self {
        let val = serde_json::to_value(data).unwrap_or_else(|_| {
            serde_json::json!({ "error": "Internal serialization error" })
        });

        Self {
            body: Body::Json(val)
        }
    }

    pub fn redirect(to: impl Into<String>) -> Self {
        Self {
            body: Body::Redirect(to.into())
        }
    }

    pub fn empty() -> Self {
        Self {
            body: Body::Empty
        }
    }

    pub fn bytes(data: impl Into<Vec<u8>>, content_type: impl Into<String>) -> Self {
        Self {
            body: Body::Bytes(data.into())
        }
    }
}

