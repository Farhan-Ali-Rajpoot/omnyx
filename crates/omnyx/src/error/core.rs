use std::borrow::Cow;
use thiserror::Error;

pub use crate::error::route_error::RouteError;

#[derive(Error, Debug)]
pub enum OmnyxError {
    #[error(transparent)]
    Route(#[from] RouteError),
    #[error("Build Error: {0}")]
    Build(Cow<'static, str>)
}


