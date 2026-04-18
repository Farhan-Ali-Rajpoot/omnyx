use std::borrow::Cow;
use thiserror::Error;



#[derive(Error, Debug)]
pub enum RouteError {
    #[error("Path '{0}' not found in the route tree")]
    NotFound(Cow<'static, str>),

    #[error("Segment conflict: '{0}' is already registered")]
    Conflict(Cow<'static, str>),

    #[error("Missing required metadata or extension: {0}")]
    MissingData(Cow<'static, str>),

    #[error("Missing Handler")]
    MissingHandler(Cow<'static, str>),

    #[error("Route registration error: {0}")]
    RegistrationFailed(Cow<'static, str>),

    #[error("Unexpected route error: {0}")]
    Other(Cow<'static, str>),

}


