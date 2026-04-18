use std::sync::Arc;
use crate::core::OmnyxState;



#[derive(Clone)]
pub struct OmnyxProxy<T = OmnyxState> {
    pub state: Arc<T>
}