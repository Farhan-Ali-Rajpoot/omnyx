use std::sync::Arc;

use crate::collections::LinearMap;
use crate::core::{ParallelRouteMatcher, Request, Response};
use crate::core::router::logic::{Middleware, RouteMetadata};
use crate::core::router::registry::Extensions;
use crate::core::router::registry::ParallelRouteNode;
use crate::core::router::registry::RouteNode;
use crate::error::RouteError;

use super::{
    RouteMatcher,
    core::{ApiEndpoint, Layout, PageEndpoint, ParallelRoute, RouteEntry, RouteKind},
};

#[derive(Clone)]
pub struct RouteBakeContext {
    pub path: String,                 // accumulated URL path prefix
    pub layouts: Vec<Arc<Layout>>,   // layout chain
    pub middlewares: Vec<Arc<dyn Middleware>>,
    pub metadata: RouteMetadata,
    pub extensions: Extensions,
}

#[derive(Clone)]
pub struct ParallelRouteBakeContext {
    pub path: String,            // absolute path prefix from parent layout (e.g., "/dashboard")
    pub slot_name: String,            // e.g., "sidebar", "header"
    pub layouts: Vec<Arc<Layout>>,    // layouts inside this slot
}

impl Default for RouteBakeContext {
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
            let ctx = RouteBakeContext::default();
            Self::bake_route_recursive(node, &mut router_matcher, ctx)?;
        }

        Ok(router_matcher)
    }

    fn bake_route_recursive(
        node: RouteNode,
        router: &mut RouteMatcher,
        ctx: RouteBakeContext,
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
                extensions,
            } => {
                let mut current_ctx = ctx.clone();
                current_ctx.path = join_paths(&ctx.path, &path.to_matchit_pattern());
                current_ctx.middlewares.extend(middlewares);
                current_ctx.extensions.extend(extensions);
                if let Some(meta) = metadata {
                    current_ctx.metadata.update_from_child(&meta);
                }
            
                if !controllers.is_empty() {
                    let page_endpoint = PageEndpoint {
                        controllers: controllers.clone(),
                        loader_controller: loader_controller.clone(),
                        error_controller: error_controller.clone(),
                        layouts: current_ctx.layouts.clone(),
                        metadata: current_ctx.metadata.clone(),
                    };
                
                    let base_entry = RouteEntry {
                        matched_pattern: current_ctx.path.clone(),
                        middlewares: current_ctx.middlewares.clone(),
                        extensions: current_ctx.extensions.clone(),
                        kind: RouteKind::Page(page_endpoint.clone()),
                    };
                    router.resolve(&current_ctx.path, base_entry)?;
                
                    // Optional catch‑all expansion
                    if let Some((base_pattern, full_pattern)) = path.split_optional_catch_all() {
                        // The base_pattern (without catch‑all) might be the same as current_ctx.path
                        // if the path already had the optional segment. But we need to insert the full pattern.
                        let full_route_path = join_paths(&ctx.path, &full_pattern);
                        let full_page_endpoint = PageEndpoint {
                            controllers,
                            loader_controller,
                            error_controller,
                            layouts: current_ctx.layouts.clone(),
                            metadata: current_ctx.metadata.clone(),
                        };
                        let full_entry = RouteEntry {
                            matched_pattern: full_route_path.clone(),
                            middlewares: current_ctx.middlewares.clone(),
                            extensions: current_ctx.extensions.clone(),
                            kind: RouteKind::Page(full_page_endpoint),
                        };
                        router.resolve(&full_route_path, full_entry)?;
                    }
                }
            
                // Recursively bake children
                for child in children {
                    Self::bake_route_recursive(child, router, current_ctx.clone())?;
                }
            }
            RouteNode::Api {
                path,
                controllers,
                children,
                middlewares,
                extensions,
            } => {
                let mut current_ctx = ctx.clone();
                current_ctx.path = join_paths(&ctx.path, &path.to_matchit_pattern());
                current_ctx.middlewares.extend(middlewares);
                current_ctx.extensions.extend(extensions);

                if !controllers.is_empty() {
                    let api_endpoint = ApiEndpoint { controllers };
                    let entry = RouteEntry {
                        matched_pattern: current_ctx.path.clone(),
                        middlewares: current_ctx.middlewares.clone(),
                        extensions: current_ctx.extensions.clone(),
                        kind: RouteKind::Api(api_endpoint),
                    };
                    router.resolve(&current_ctx.path, entry)?;
                }

                for child in children {
                    Self::bake_route_recursive(child, router, current_ctx.clone())?;
                }
            }
            RouteNode::Layout {
                id,
                controller,
                error_controller,
                loader_controller,
                metadata,
                children,
                parallel_routes,  // now LinearMap<String, Vec<ParallelRouteNode>>
                extensions,
                middlewares,
            } => {
                let mut current_ctx = ctx.clone();
                current_ctx.middlewares.extend(middlewares);
                current_ctx.extensions.extend(extensions);
                if let Some(meta) = metadata {
                    current_ctx.metadata.update_from_child(&meta);
                }
            
                let mut current_layout = Layout {
                    base_path: current_ctx.path.clone(),
                    controller,
                    error_controller,
                    loader_controller,
                    parallel_routers: LinearMap::new(),
                };
            
                // For each slot, build a single matcher from all its nodes
                for (slot_name, nodes) in parallel_routes {
                    let mut slot_matcher = ParallelRouteMatcher::new();
                    // Insert each top‑level node into the same matcher
                    for node in nodes {
                        bake_parallel_route_recursive(node, &mut slot_matcher, ParallelRouteBakeContext {
                            slot_name: slot_name.clone(),
                            path: current_ctx.path.clone(),
                            layouts: Vec::new(),
                        })?;
                    }
                    current_layout.parallel_routers.insert(slot_name, Arc::new(slot_matcher));
                }
            
                current_ctx.layouts.push(Arc::new(current_layout));
            
                for child in children {
                    Self::bake_route_recursive(child, router, current_ctx.clone())?;
                }
            }
            RouteNode::Group {
                id: _,
                children,
                metadata,
                extensions,
                middlewares,
            } => {
                let mut current_ctx = ctx.clone();
                current_ctx.middlewares.extend(middlewares);
                current_ctx.extensions.extend(extensions);
                if let Some(meta) = metadata {
                    current_ctx.metadata.update_from_child(&meta);
                }
                for child in children {
                    Self::bake_route_recursive(child, router, current_ctx.clone())?;
                }
            }
        }
        Ok(())
    }
}
/// Bakes a parallel route tree into a `ParallelRouteMatcher` for a single slot.
/// `ctx.path` is the absolute path prefix of the parent layout (e.g., "/dashboard").
/// This prefix is **not** used as part of the slot’s route keys.
fn bake_parallel_route_recursive(
    node: ParallelRouteNode,
    matcher: &mut ParallelRouteMatcher,
    ctx: ParallelRouteBakeContext,
) -> Result<(), RouteError> {
    match node {
        ParallelRouteNode::Page {
            path,
            controller,
            error_controller,
            loader_controller,
            children,
        } => {
            let mut raw_path = path.to_matchit_pattern();
            let full_pattern = if raw_path.is_empty() { "/".to_string() } else { raw_path };
            let parallel_route = ParallelRoute {
                matched_pattern: full_pattern.clone(),
                controller: controller.clone(),
                error_controller: error_controller.clone(),
                loader_controller: loader_controller.clone(),
                layouts: ctx.layouts.clone(),
            };
            // Insert the full pattern (catch‑all)
            matcher.resolve(&full_pattern, parallel_route.clone())?;
        
            // If there is an optional catch‑all, insert the base path as well.
            if let Some((base_pattern, _)) = path.split_optional_catch_all() {
                // Insert base pattern (e.g., "/") only if it's not already present? We'll just insert.
                // The router will keep the last inserted for duplicates; we want the base pattern to resolve to the same component.
                matcher.resolve(&base_pattern, parallel_route)?;
            }
        
            // Recurse into children (they already have their own paths)
            for child in children {
                bake_parallel_route_recursive(child, matcher, ctx.clone())?;
            }
        }
        ParallelRouteNode::Layout {
            id,
            controller,
            error_controller,
            loader_controller,
            parallel_routes,
            children,
        } => {
            // This layout will wrap pages inside the slot.
            let mut inner_layout = Layout {
                base_path: ctx.path.clone(),
                controller,
                error_controller,
                loader_controller,
                parallel_routers: LinearMap::new(),
            };

            // Build matchers for any *nested parallel slots* inside this layout.
            for (slot_name, nodes) in parallel_routes {
                    let mut slot_matcher = ParallelRouteMatcher::new();
                    // Insert each top‑level node into the same matcher
                    for node in nodes {
                        bake_parallel_route_recursive(node, &mut slot_matcher, ParallelRouteBakeContext {
                            slot_name: slot_name.clone(),
                            path: ctx.path.clone(),
                            layouts: Vec::new(),
                        })?;
                    }
                    inner_layout.parallel_routers.insert(slot_name, Arc::new(slot_matcher));
                }

            // Push this layout onto the layout stack for deeper pages in the same slot.
            let mut new_ctx = ctx.clone();
            new_ctx.layouts.push(Arc::new(inner_layout));

            // Recurse into children pages (which belong to the same slot)
            for child in children {
                bake_parallel_route_recursive(child, matcher, new_ctx.clone())?;
            }
        }
    }
    Ok(())
}

/// Joins two path segments. Expects `child` to already be a matchit pattern (e.g., ":id", "*slug").
/// No bracket replacement is done here – that must have been done earlier.
fn join_paths(parent: &str, child: &str) -> String {
    let p = parent.trim_end_matches('/');
    let c = child.trim_start_matches('/');

    if p.is_empty() {
        if c.is_empty() {
            String::from("/")
        } else {
            format!("/{}", c)
        }
    } else if c.is_empty() {
        p.to_string()
    } else {
        format!("{}/{}", p, c)
    }
}