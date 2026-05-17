use std::sync::Arc;
use crate::core::{
    ErasedErrorComponent, ErasedLayoutComponent, ErasedNotFoundComponent, ErrorComponent, ErrorComponentWrapper,
    LayoutComponent, LayoutComponentWrapper, NotFoundComponent, NotFoundComponentWrapper
};
use super::FrameworkFallbacks;

#[derive(Default)]
pub struct Renderer {
    pub not_found_controller: Option<Arc<dyn ErasedNotFoundComponent>>,
    pub error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    pub root_layout: Option<Arc<dyn ErasedLayoutComponent>>,

    pub(crate) fallbacks: FrameworkFallbacks,
}


impl Renderer {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn error_handler<H, Args>(mut self, h: H) -> Self
    where
        H: ErrorComponent<Args> + Clone + Send + Sync + 'static,
        Args: Clone + Send + Sync + 'static,
    {
        let wrapper = ErrorComponentWrapper {
            handler: h,
            _marker: std::marker::PhantomData,
        };

        self.error_controller = Some(Arc::new(wrapper));
        self
    }

    pub fn not_found_handler<H, Args>(mut self, h: H) -> Self
    where
        H: NotFoundComponent<Args> + Send + Sync + Clone + 'static,
        Args: Send + Sync + Clone + 'static, 
    {
        let wrapper = NotFoundComponentWrapper {
            handler: h,
            _marker: std::marker::PhantomData,
        };

        self.not_found_controller = Some(Arc::new(wrapper));
        self
    }

    pub fn root_layout_handler<H, Args>(mut self, h: H) -> Self
    where
        H: LayoutComponent<Args> + Send + Sync + Clone + 'static,
        Args: Send + Sync + Clone + 'static, 
    {
        let wrapper = LayoutComponentWrapper {
            handler: h,
            _marker: std::marker::PhantomData,
        };

        self.root_layout = Some(Arc::new(wrapper));
        self
    }
    
} 