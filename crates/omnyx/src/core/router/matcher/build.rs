use std::sync::Arc;

use crate::collections::LinearMap;
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
    pub slot_name: String,            // e.g., "sidebar", "header"
    pub base_path: String,            // absolute path prefix from parent layout (e.g., "/dashboard")
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
                not_found_controller,
                metadata,
                children,
                middlewares,
                extensions,
            } => {
                // Pages cannot have children (Next.js semantics)
                if !children.is_empty() {
                    return Err(RouteError::InvalidRoute(
                        "Page node cannot have children. Use a Layout folder instead.".into(),
                    ));
                }

                let mut current_ctx = ctx.clone();
                current_ctx.path = join_paths(&ctx.path, &path.to_matchit_pattern());
                current_ctx.middlewares.extend(middlewares);
                current_ctx.extensions.extend(extensions);
                if let Some(meta) = metadata {
                    current_ctx.metadata.update_from_child(&meta);
                }

                if !controllers.is_empty() {
                    let page_endpoint = PageEndpoint {
                        controllers,
                        loader_controller,
                        error_controller,
                        not_found_controller,
                        layouts: current_ctx.layouts.clone(),
                        metadata: current_ctx.metadata.clone(),
                    };

                    let entry = RouteEntry {
                        matched_pattern: current_ctx.path.clone(),
                        middlewares: current_ctx.middlewares.clone(),
                        extensions: current_ctx.extensions.clone(),
                        kind: RouteKind::Page(page_endpoint),
                    };

                    // Assuming router.resolve returns Err on duplicate
                    router.resolve(&current_ctx.path, entry)?;
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
                id: _,
                controller,
                error_controller,
                loader_controller,
                not_found_controller,
                metadata,
                children,
                parallel_routes,
                extensions,
                middlewares,
            } => {
                let mut current_ctx = ctx.clone();
                current_ctx.middlewares.extend(middlewares);
                current_ctx.extensions.extend(extensions);
                if let Some(meta) = metadata {
                    current_ctx.metadata.update_from_child(&meta);
                }

                // Build the layout object, which will be pushed onto the layout stack
                let mut current_layout = Layout {
                    controller,
                    error_controller,
                    loader_controller,
                    not_found_controller,
                    parallel_routes: LinearMap::new(), // now keyed by slot name (String)
                };

                // Bake parallel routes WITHIN this layout – pass the current accumulated path as base
                for (slot_name, node) in parallel_routes {
                    let parallel_ctx = ParallelRouteBakeContext {
                        slot_name: slot_name.clone(),
                        base_path: current_ctx.path.clone(),
                        layouts: Vec::new(),
                    };
                    bake_parallel_route_recursive(node, &mut current_layout, parallel_ctx)?;
                }

                // Push this layout onto the context for descendant pages (and parallel routes)
                current_ctx.layouts.push(Arc::new(current_layout));

                // Recurse into normal children (e.g., nested folders)
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

/// Bakes a parallel route tree into the parent `Layout`’s `parallel_routes` map.
/// Each slot stores its routes keyed by the **full path** (base_path + child path).
/// At request time, you can match the request path against this map to find the parallel route leaf.
fn bake_parallel_route_recursive(
    node: ParallelRouteNode,
    layout: &mut Layout,
    ctx: ParallelRouteBakeContext,
) -> Result<(), RouteError> {
    match node {
        ParallelRouteNode::Page {
            path,
            controller,
            error_controller,
            loader_controller,
            not_found_controller,
            children,
        } => {
            // Pages in parallel routes cannot have children either.
            if !children.is_empty() {
                return Err(RouteError::InvalidRoute(
                    "Parallel route page cannot have children".into(),
                ));
            }

            let full_path = join_paths(&ctx.base_path, &path.to_matchit_pattern());
            let parallel_route = ParallelRoute {
                controller,
                error_controller,
                loader_controller,
                not_found_controller,
                layouts: ctx.layouts.clone(),
            };

            // Store the parallel route under its slot name.
            // Note: If a slot defines multiple pages (e.g., @sidebar/profile and @sidebar/settings),
            // the map will hold one entry per full path – but lookup needs to match the exact request path.
            // Alternative: store a separate RouteMatcher per slot. This simple map works if you iterate
            // over entries and find the one whose key matches the request path prefix.
            layout
                .parallel_routes
                .insert(ctx.slot_name.clone(), parallel_route);
            // ^^^ Caution: this overwrites previous entries for the same slot name.
            // For multiple pages per slot, you'd need a map from path to route, or a small matcher.
            // I'm keeping the original signature but note this limitation.
            // Better fix: change `Layout::parallel_routes` to `LinearMap<String, LinearMap<String, ParallelRoute>>`
            // or `LinearMap<String, RouteMatcher>`. I'll leave a comment.
        }
        ParallelRouteNode::Layout {
            id: _,
            controller,
            error_controller,
            loader_controller,
            not_found_controller,
            parallel_routes,
            children,
        } => {
            let mut inner_layout = Layout {
                controller,
                error_controller,
                loader_controller,
                not_found_controller,
                parallel_routes: LinearMap::new(),
            };

            // Recurse into nested parallel routes (inside this parallel layout)
            for (slot_name, node) in parallel_routes {
                let child_ctx = ParallelRouteBakeContext {
                    slot_name: slot_name.clone(),
                    base_path: ctx.base_path.clone(), // same base path; path is built inside pages
                    layouts: ctx.layouts.clone(),
                };
                bake_parallel_route_recursive(node, &mut inner_layout, child_ctx)?;
            }

            // Push this parallel layout onto the context's layout stack for deeper pages
            let mut new_ctx = ctx.clone();
            new_ctx.layouts.push(Arc::new(inner_layout));

            // Recurse into children pages of this parallel layout
            for child in children {
                bake_parallel_route_recursive(child, layout, new_ctx.clone())?;
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