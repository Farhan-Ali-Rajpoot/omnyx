use axum::{
    http::{header, HeaderMap, HeaderName, HeaderValue, StatusCode},
    response::IntoResponse,
};
use axum_extra::extract::cookie::Cookie;

use super::core::Response;





impl Response {
    fn status_mut(&mut self) -> &mut StatusCode {
        match self {
            Self::Html { status, .. } => status,
            Self::Fragment { status, .. } => status,
            Self::Redirect { status, .. } => status,
            Self::Json { status, .. } => status,
            Self::Empty { status, .. } => status,
            Self::Bytes { status, .. } => status,
        }
    }

    fn headers_mut(&mut self) -> &mut HeaderMap {
        match self {
            Self::Html { headers, .. } => headers,
            Self::Fragment { headers, .. } => headers,
            Self::Redirect { headers, .. } => headers,
            Self::Json { headers, .. } => headers,
            Self::Empty { headers, .. } => headers,
            Self::Bytes { headers, .. } => headers,
        }
    }

    pub fn with_status(mut self, code: u16) -> Self {
        if let Ok(new_status) = StatusCode::from_u16(code) {
            *self.status_mut() = new_status;
        }
        self
    }

    pub fn with_header(
        mut self,
        key: impl Into<HeaderName>,
        value: impl Into<HeaderValue>,
    ) -> Self {
        let _ = self.headers_mut().append(key.into(), value.into());
        self
    }

    pub fn with_cookie(mut self, cookie_string: impl Into<String>) -> Self {
        if let Ok(value) = HeaderValue::try_from(cookie_string.into()) {
            self.headers_mut().append(header::SET_COOKIE, value);
        }
        self
    }

    pub fn with_cookie_typed(mut self, cookie: Cookie) -> Self {
        if let Ok(value) = HeaderValue::try_from(cookie.encoded().to_string()) {
            self.headers_mut().append(header::SET_COOKIE, value);
        }
        self
    }

    pub fn is_wrappable(&self) -> bool {
        matches!(self, Self::Html { .. } | Self::Fragment { .. })
    }

    pub fn into_wrappable_content(self) -> Option<(String, StatusCode, HeaderMap)> {
        match self {
            Self::Html { content, status, headers } | Self::Fragment { content, status, headers } => {
                Some((content, status, headers))
            }
            _ => None,
        }
    }

    pub fn status(&self) -> StatusCode {
        match self {
            Self::Html { status, .. }
            | Self::Fragment { status, .. }
            | Self::Redirect { status, .. }
            | Self::Json { status, .. }
            | Self::Empty { status, .. }
            | Self::Bytes { status, .. } => *status,
        }
    }

    pub fn headers(&self) -> &HeaderMap {
        match self {
            Self::Html { headers, .. }
            | Self::Fragment { headers, .. }
            | Self::Redirect { headers, .. }
            | Self::Json { headers, .. }
            | Self::Empty { headers, .. }
            | Self::Bytes { headers, .. } => headers,
        }
    }

    pub fn extend_headers(&mut self, additional: HeaderMap) {
        let target = match self {
            Self::Html { headers, .. }
            | Self::Fragment { headers, .. }
            | Self::Redirect { headers, .. }
            | Self::Json { headers, .. }
            | Self::Empty { headers, .. }
            | Self::Bytes { headers, .. } => headers,
        };

        for (key, value) in additional {
            if let Some(k) = key {
                target.append(k, value);
            }
        }
    }
}