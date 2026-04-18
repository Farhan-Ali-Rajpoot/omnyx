use crate::core::router::io::{Request};
use crate::core::router::handlers::{LayoutProps};



pub trait FromContext: Sized {
    fn from_request(request: &Request) -> impl Future<Output = Self> + Send;
}


impl FromContext for Request {
    fn from_request(request: &Request) -> impl Future<Output = Self> + Send {
        async move {
            request.clone()
        }
    }
}

impl FromContext for LayoutProps {
    fn from_request(request: &Request) -> impl Future<Output = Self> + Send {
        async move {
            request.layout_props.clone()
        }
    }
}