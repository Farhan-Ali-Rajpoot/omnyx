use std::sync::Arc;

use crate::core::AppState;
use crate::core::pingora::handle_route::renderer::Renderer;

pub struct PingoraAdapter<T = ()> {
    pub state: Arc<AppState<T>>,
    pub renderer: Renderer,
}

impl<T> PingoraAdapter<T>
where
    T: Send + Sync + 'static,
{
    pub(crate) fn from_state(
        state: Arc<AppState<T>>,
    ) -> Self {

        Self {
            state,
            renderer: Renderer::default(),
        }
    }

    pub(crate) fn from_state_and_renderer(
        state: Arc<AppState<T>>,
        renderer: Renderer,
    ) -> Self {

        Self {
            state,
            renderer,
        }
    }
}

impl<T> PingoraAdapter<T> 
where
    T: Send + Sync + 'static,
{
    pub fn renderer(mut self, renderer: Renderer) -> Self {
        self.renderer = renderer;
        self
    }
}
