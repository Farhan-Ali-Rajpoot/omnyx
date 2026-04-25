use std::marker::PhantomData;
use std::sync::Arc;

use crate::collections::LinearMap;
use crate::core::router::builder::Router;
use crate::core::router::handlers::{
    ErasedErrorComponent, ErasedLoaderComponent, ErasedPageComponent,
};
use crate::core::router::logic::{Middleware, RouteMetadata};
use crate::core::router::registry::RouteNode;
use crate::core::router::utils::Path;
use crate::core::{ErasedNotFoundComponent, ErrorComponent, ErrorComponentWrapper, LoaderComponent, LoaderComponentWrapper, NotFoundComponent, NotFoundComponentWrapper, PageComponent, PageComponentWrapper};

pub struct PageDefinition {
    pub(crate) path: Path,
    pub(crate) controllers: LinearMap<http::Method, Arc<dyn ErasedPageComponent>>,
    pub(crate) error_controller: Option<Arc<dyn ErasedErrorComponent>>,
    pub(crate) loader_controller: Option<Arc<dyn ErasedLoaderComponent>>,
    pub(crate) not_found_controller: Option<Arc<dyn ErasedNotFoundComponent>>,
    
    pub(crate) metadata: Option<RouteMetadata>,
    pub(crate) children: Vec<RouteNode>,
    pub(crate) extensions: crate::core::router::registry::Extensions,
    pub(crate) middlewares: Vec<Arc<dyn Middleware>>,
}

impl PageDefinition {
    // Utility

    // Custom Methods
    // Usage: .method("GET", handler)
    pub fn method<H, Args>(mut self, verb: &str, handler: H) -> Self
    where
        H: PageComponent<Args> + Clone + Send + Sync + 'static,
        Args: 'static + Clone + Send + Sync,
    {
        let m = http::Method::from_bytes(verb.to_uppercase().as_bytes()).unwrap();

        // Wrap it!
        let wrapper = PageComponentWrapper {
            handler,
            _marker: PhantomData,
        };

        self.controllers.insert(m, Arc::new(wrapper));
        self
    }

    pub fn metadata(mut self, metadata: RouteMetadata) -> Self {
        self.metadata = Some(metadata);
        self
    }

    pub fn error_handler<H, Args>(mut self, handler: H) -> Self 
    where
        H: ErrorComponent<Args> + Clone + Send + Sync + 'static,
        Args: 'static + Clone + Send + Sync,
    {
        let wrapper = ErrorComponentWrapper {
            handler,
            _marker: PhantomData,
        };

        self.error_controller = Some(Arc::new(wrapper));
        self
    }

    pub fn not_found_handler<H, Args>(mut self, handler: H) -> Self 
    where
        H: NotFoundComponent<Args> + Clone + Send + Sync + 'static,
        Args: 'static + Clone + Send + Sync,
    {
        let wrapper = NotFoundComponentWrapper {
            handler,
            _marker: PhantomData,
        };

        self.not_found_controller = Some(Arc::new(wrapper));
        self
    }

    pub fn loader_handler<H, Args>(mut self, handler: H) -> Self 
    where
        H: LoaderComponent<Args> + Clone + Send + Sync + 'static,
        Args: 'static + Clone + Send + Sync,
    {
        let wrapper = LoaderComponentWrapper {
            handler,
            _marker: PhantomData,
        };

        self.loader_controller = Some(Arc::new(wrapper));
        self
    }

    pub fn middleware<M: Middleware + Send + Sync + 'static>(mut self, middleware: M) -> Self {
        self.middlewares.push(Arc::new(middleware));
        self
    }

    pub fn extension<T: Send + Clone + Sync + 'static>(mut self, value: T) -> Self {
        self.extensions.insert(value);
        self
    }

    pub fn children<F>(mut self, f: F) -> Self
    where
        F: FnOnce(Router) -> Router,
    {
        let final_router = f(Router::new());

        self.children.extend(final_router.root_nodes);
        self
    }

    // Router
    pub fn nest_router(mut self, router: Router) -> Self {
        self.children.extend(router.root_nodes);
        self
    }

    pub(crate) fn into_route_node(self) -> RouteNode {
        RouteNode::Page {
            path: self.path,
            controllers: self.controllers,
            error_controller: self.error_controller,
            loader_controller: self.loader_controller,
            not_found_controller: self.not_found_controller,
            metadata: self.metadata,
            children: self.children,
            extensions: self.extensions,
            middlewares: self.middlewares,
        }
    }
}
