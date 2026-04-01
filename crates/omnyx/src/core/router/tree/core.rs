use std::sync::Arc;
use std::collections::HashMap;
use serde_json::Value;

use crate::core::router::logic::RouteMetadata;
use crate::error::RouteError;
use crate::builder::router::RouteTreeBuilderInfo;
use crate::core::router::registry::RouteNode;
use crate::core::router::tree::RouteMatcher;


#[derive(Clone)]
pub struct RouteTree {
    pub roots: Vec<RouteNode>,
    pub matcher: Arc<dyn RouteMatcher + Send + Sync>,       
    pub by_id: HashMap<String, RouteNode>,                  
    pub by_pattern: HashMap<String, RouteNode>,  

    pub builder_info: RouteTreeBuilderInfo,                 
}

impl RouteTree {
    pub fn new(
        roots: Vec<RouteNode>,
        builder_info: RouteTreeBuilderInfo,
    ) -> Self {
        Self {
            roots: roots,
            by_id: HashMap::new(),
            by_pattern: HashMap::new(),
            matcher: RouteMatcher::new(),
            builder_info,
        }
    }


    pub fn build(&mut self) -> Result<(), RouteError> {
        // fn traverse(
        //     node: &RouteNode,               
        //     parent_id: &str,
        //     parent_pattern: &str,
        //     parent_metadata: &RouteMetadata,   
        //     layout_stack: &mut Vec<String>,
        //     by_id: &mut HashMap<String, RouteNode>,
        //     by_pattern: &mut HashMap<String, RouteNode>,
        // ) -> Result<(), RouteError> {
        //     match node {
        //         RouteNode::Page { 
        //             path, 
        //             metadata, 
        //             children, 
        //             .. 
        //         } => {
        //             let path_str = path.to_matchit_pattern()
        //             .replace("[","{")
        //             .replace("[[","{")
        //             .replace("]","}")
        //             .replace("]]","}")
        //             .replace("...","*");

        //             let new_pattern = if parent_pattern.is_empty() {
        //                 path_str.clone()
        //             } else {
        //                 format!("{}/{}", parent_pattern, path_str)
        //             };

        //             let route_id = if parent_id.is_empty() {
        //                 new_pattern.clone()
        //             } else {
        //                 format!("{}/{}", parent_id, path_str)
        //             };

        //             // === CACHES ===
        //             by_id.insert(route_id.clone(), node.clone());
        //             by_pattern.insert(new_pattern.clone(), node.clone());

        //             // === METADATA INHERITANCE (using your method) ===
        //             let mut merged = metadata.clone();
        //             merged.inherit_from(parent_metadata);           // ← your method

        //             merged_metadata.insert(route_id.clone(), merged.clone());

        //             // === LAYOUT CHAIN ===
        //             layout_chains.insert(route_id.clone(), layout_stack.clone());

        //             // Recurse
        //             for child in children {
        //                 traverse(child, &route_id, &new_pattern, layout_stack, &merged, 
        //                          by_id, by_pattern, layout_chains, merged_metadata)?;
        //             }
        //         }

        //         RouteNode::Api {
        //             path,
        //             middlewares,
        //             children,
        //             ..
        //         } => {
        //             let path_str = path.to_matchit_pattern();

        //             let new_pattern = if parent_pattern.is_empty() {
        //                 path_str.clone()
        //             } else {
        //                 format!("{}/{}", parent_pattern, path_str)
        //             };

        //             let route_id = if parent_id.is_empty() {
        //                 new_pattern.clone()
        //             } else {
        //                 format!("{}/{}", parent_id, path_str)
        //             };

        //             by_id.insert(route_id.clone(), node.clone());
        //             by_pattern.insert(new_pattern.clone(), node.clone());

        //             for child in children {
        //                 traverse(child, &route_id, &new_pattern, layout_stack, parent_metadata,
        //                          by_id, by_pattern, layout_chains, merged_metadata)?;
        //             }

        //         }

        //         RouteNode::Layout { 
        //             id, 
        //             metadata, 
        //             children, 
        //             slots, 
        //             .. 
        //         } => {
        //             layout_stack.push(id.clone());

        //             let mut merged = metadata.clone();
        //             merged.inherit_from(parent_metadata);

        //             // Normal children
        //             for child in children {
        //                 traverse(child, parent_id, parent_pattern, layout_stack, &merged, 
        //                          by_id, by_pattern, layout_chains, merged_metadata)?;
        //             }

        //             // Parallel slots (@sidebar, @modal, etc.)
        //             for slots in slots.values() {
        //                 for slot in slots {
        //                     traverse(slot, parent_id, parent_pattern, layout_stack, &merged, 
        //                              by_id, by_pattern, layout_chains, merged_metadata)?;
        //                 }
        //             }

        //             layout_stack.pop();
        //         }

        //         RouteNode::Group { id, children, .. } => {
        //             let new_id = if parent_id.is_empty() {
        //                 id.clone()
        //             } else {
        //                 format!("{}/{}", parent_id, id)
        //             };

        //             for child in children {
        //                 traverse(child, &new_id, parent_pattern, layout_stack, parent_metadata,
        //                          by_id, by_pattern, layout_chains, merged_metadata)?;
        //             }
        //         }

        //         RouteNode::Special { kind, children, .. } => {
        //             let kind_str = format!("{:?}", kind).to_lowercase();
        //             let new_pattern = if parent_pattern.is_empty() {
        //                 format!("/_{}", kind_str)
        //             } else {
        //                 format!("{}/_{}", parent_pattern, kind_str)
        //             };

        //             for child in children {
        //                 traverse(child, parent_id, &new_pattern, layout_stack, parent_metadata,
        //                          by_id, by_pattern, layout_chains, merged_metadata)?;
        //             }
        //         }
        //     }
        //     Ok(())
        // }

        // let mut layout_stack = Vec::new();
        // let default_metadata = RouteMetadata::default();

        // for node in &self.roots.unwrap_or(Vec::new()) {
        //     traverse(
        //         node,
        //         "",
        //         "",
        //         &default_metadata,
        //         &mut self.by_id,
        //         &mut self.by_pattern,
        //     )?;
        // }

        // Ok(())
    }
}