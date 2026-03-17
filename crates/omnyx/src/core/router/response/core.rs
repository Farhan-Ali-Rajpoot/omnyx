use axum::{
    http::{header, HeaderMap, HeaderName, HeaderValue, StatusCode},
    response::IntoResponse,
};
use serde_json::Value;

#[derive(Debug, Clone)]
pub enum Response {
    Html {
        content: String,
        status: StatusCode,
        headers: HeaderMap,
    },
    Fragment {
        content: String,
        status: StatusCode,
        headers: HeaderMap,
    },
    Redirect {
        to: String,
        status: StatusCode,
        headers: HeaderMap,
    },
    Json {
        data: Value,
        status: StatusCode,
        headers: HeaderMap,
    },
    Empty {
        status: StatusCode,
        headers: HeaderMap,
    },
    Bytes {
        data: Vec<u8>,
        content_type: String,
        status: StatusCode,
        headers: HeaderMap,
    },
}



impl IntoResponse for Response {
    fn into_response(self) -> axum::response::Response {
        match self {
            Response::Html { content, status, mut headers } |
            Response::Fragment { content, status, mut headers } => {
                headers.insert(header::CONTENT_TYPE, HeaderValue::from_static("text/html; charset=utf-8"));
                (status, headers, content).into_response()
            }

            Response::Json { data, status, mut headers } => {
                headers.insert(header::CONTENT_TYPE, HeaderValue::from_static("application/json"));
                (status, headers, data.to_string()).into_response()
            }

            Response::Redirect { to, status, mut headers } => {
                if let Ok(val) = HeaderValue::try_from(to) {
                    headers.insert(header::LOCATION, val);
                }
                (status, headers, "").into_response()
            }

            Response::Empty { status, headers } => {
                (status, headers, "").into_response()
            }

            Response::Bytes { data, content_type, status, mut headers } => {
                if let Ok(val) = HeaderValue::try_from(content_type) {
                    headers.insert(header::CONTENT_TYPE, val);
                }
                (status, headers, data).into_response()
            }
        }
    }
}