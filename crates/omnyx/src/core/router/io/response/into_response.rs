use std::borrow::Cow;
use http::StatusCode;
use super::{Response, Body};

pub trait IntoResponse {
    fn into_response(self) -> Response;
}

impl IntoResponse for Response {
    fn into_response(self) -> Self {
        self
    }
}

impl IntoResponse for String {
    fn into_response(self) -> Response {
        Response::new(Body::Html(self))
    }
}

impl IntoResponse for &'static str {
    fn into_response(self) -> Response {
        Response::new(Body::Html(self.into()))
    }
}

impl IntoResponse for Cow<'static, str> {
    fn into_response(self) -> Response {
        Response::new(Body::Html(self.into_owned()))
    }
}

impl IntoResponse for Vec<u8> {
    fn into_response(self) -> Response {
        Response::new(Body::Bytes(self))
    }
}

impl IntoResponse for serde_json::Value {
    fn into_response(self) -> Response {
        Response::new(Body::Json(self))
    }
}

impl IntoResponse for () {
    fn into_response(self) -> Response {
        Response::new(Body::Empty)
    }
}

impl<T, E> IntoResponse for Result<T, E>
where
    T: IntoResponse,
    E: Into<String>, 
{
    fn into_response(self) -> Response {
        match self {
            Ok(value) => value.into_response(),
            Err(err) => {
                Response::error(err.into())   
            }
        }
    }
}

impl<T> IntoResponse for Option<T> 
where
    T: IntoResponse,
{
    fn into_response(self) -> Response {
        match self {
            Some(value) => value.into_response(),
            None => Response::new(Body::Empty),
        }
    }
}

impl IntoResponse for StatusCode {
    fn into_response(self) -> Response {
        let mut res = Response::new(Body::Empty);
        res
    }
}