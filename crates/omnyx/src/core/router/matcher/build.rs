use std::sync::Arc;

use crate::core::router::registry::{RouteNode};
use crate::core::router::logic::{RouteMetadata, Middleware};
use crate::core::router::handlers::{ErasedLayoutComponent};
use crate::error::RouteError;
use crate::collections::LinearMap;
use crate::core::router::registry::Extensions;

use super::{
    RouteMatcher, 
    core::{ApiEndpoint, PageEndpoint, ParallelRoute, RouteEntry, RouteKind, }
};

#[derive(Clone)]
pub struct BakeContext {
    pub path: String,
    pub layouts: Vec<Arc<dyn ErasedLayoutComponent>>,
    pub middlewares: Vec<Arc<dyn Middleware>>,
    pub metadata: RouteMetadata,
    pub extensions: Extensions,
}

impl Default for BakeContext {
    fn default() -> Self {
        Self {
            path: "/".into(),
            layouts: Vec::new(),
            middlewares: Vec::new(),
            
            metadata: RouteMetadata::default(),
            extensions: Extensions::new(),
        }
    }
} 


impl RouteMatcher {

    pub fn build_with_nodes(root_nodes: Vec<RouteNode>) -> Result<Self, RouteError> {
        let mut router_matcher = RouteMatcher::new();

        for node in root_nodes {
            let ctx = BakeContext::default();
            Self::bake_recursive(node, &mut router_matcher, ctx)?;
        }

        Ok(router_matcher)
    }

    fn bake_recursive(
        node: RouteNode,
        router: &mut RouteMatcher,
        ctx: BakeContext,
    ) -> Result<(), RouteError> {
        match node {
            RouteNode::Page { 
                path, 
                controllers, 
                error_controller, 
                loader_controller, 
                metadata, 
                children, 
                middlewares, 
                extensions 
            } => {
                let mut current_ctx = ctx.clone();

                current_ctx.path = Self::join_paths(&ctx.path, &path.to_matchit_pattern());

                current_ctx.middlewares.extend(middlewares);
                current_ctx.extensions.extend(extensions);
                
                if let Some(meta) = metadata {
                    current_ctx.metadata.inherit_from(&meta); 
                }

                if !controllers.is_empty() {
                    let page_endpoint = PageEndpoint {
                        controllers, 
                        loader_controller,
                        error_controller,
                        layouts: current_ctx.layouts.clone(), 
                        metadata: current_ctx.metadata.clone(),
                        slots: LinearMap::new(), 
                    };

                    let entry = RouteEntry {
                        matched_pattern: current_ctx.path.clone(),
                        middlewares: current_ctx.middlewares.clone(),
                        extensions: current_ctx.extensions.clone(), 
                        kind: RouteKind::Page(page_endpoint),
                    };

                    router.resolve(&current_ctx.path, entry)?;
                }

                for child in children {
                    Self::bake_recursive(child, router, current_ctx.clone())?;
                }
            },
            RouteNode::Api { 
                path, 
                controllers, 
                children, 
                middlewares, 
                extensions 
            } => {
                let mut current_ctx = ctx.clone();
                
                current_ctx.path = Self::join_paths(&ctx.path, &path.to_matchit_pattern());

                current_ctx.middlewares.extend(middlewares);
                current_ctx.extensions.extend(extensions);

                if !controllers.is_empty() {
                    let api_endpoint = ApiEndpoint {
                        controllers,
                    };

                    let entry = RouteEntry {
                        matched_pattern: current_ctx.path.clone(),
                        middlewares: current_ctx.middlewares.clone(),
                        extensions: current_ctx.extensions.clone(), 
                        kind: RouteKind::Api(api_endpoint),
                    };

                    router.resolve(&current_ctx.path, entry)?;
                }

                for child in children {
                    Self::bake_recursive(child, router, current_ctx.clone())?;
                }
            },
            RouteNode::Layout { 
                id: _, 
                controller, 
                error_controller, 
                loader_controller, 
                metadata, 
                children, 
                parallel_routes, 
                extensions, 
                middlewares 
            } => {
                let mut current_ctx = ctx.clone();

                if let Some(ctr) = controller {
                    current_ctx.layouts.push(ctr);
                }
                 
                current_ctx.middlewares.extend(middlewares);
                current_ctx.extensions.extend(extensions);
                
                if let Some(meta) = metadata {
                    current_ctx.metadata.inherit_from(&meta); 
                }

                let mut baked_slots = LinearMap::new();
                for (slot_name, node) in parallel_routes {
                    // We bake the parallel route using the current context
                    // Note: Parallel routes usually don't have their own nested layouts 
                    // unless specified, but they inherit the current stack.
                    if let RouteNode::Page { controllers, loader_controller, error_controller, .. } = node {
                        if let Some(handler) = controllers.get(&http::Method::GET) {
                            baked_slots.insert(slot_name, ParallelRoute {
                                layout_stack: current_ctx.layouts.clone(),
                                handler: handler.clone(),
                                error_handler: error_controller,
                                loader_handler: loader_controller,
                            });
                        }
                    }
                }

                // 4. RECURSE TO CHILDREN
                // Every child (Page/Api/Group) inside this Layout node will now 
                // carry this layout in its 'layout_stack'.
                for child in children {
                    // We can optionally pass the baked_slots down if you want 
                    // nested pages to be aware of their sibling slots.
                    Self::bake_recursive(child, router, current_ctx.clone())?;
                }
            },
            RouteNode::Group { 
                id: _, 
                children, 
                metadata, 
                extensions, 
                middlewares 
            } => {
                let mut current_ctx = ctx.clone();

                current_ctx.middlewares.extend(middlewares);
                current_ctx.extensions.extend(extensions);
                
                if let Some(meta) = metadata {
                    current_ctx.metadata.inherit_from(&meta); 
                }

                for child in children {
                    Self::bake_recursive(child, router, current_ctx.clone())?;
                }
            },
        }

        Ok(())
    }
}



impl RouteMatcher {
    fn join_paths(parent: &str, child: &str) -> String {
        let p = parent.trim_end_matches('/');
        
        let c_normalized = child
            .replace("[[", "{")
            .replace("]]", "}")
            .replace("[", "{")
            .replace("]", "}")
            .replace("...", "*");
            
        let c = c_normalized.trim_start_matches('/');

        if p.is_empty() {
            if c.is_empty() { String::from("/") } else { format!("/{}", c) }
        } else if c.is_empty() {
            p.to_string()
        } else {
            format!("{}/{}", p, c)
        }
    }
}