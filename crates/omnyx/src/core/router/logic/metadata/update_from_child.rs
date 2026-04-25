use super::core::RouteMetadata;
use super::types::custom_tag::{MetaTag, LinkTag};
use std::collections::HashMap;

impl RouteMetadata {
    /// Merges `child` into `self` (mutates self).  
    /// - Any non‑empty field from `child` overwrites the corresponding field in `self`.  
    /// - For nested `Option<Struct>`: if both `Some`, recursively call `update_from_child` on the inner struct;  
    ///   if `child` has `Some` and `self` has `None`, clone the child’s struct into `self`.  
    /// - For `custom_meta` and `custom_links`: merge by key, child’s tag overwrites parent’s tag with same key.  
    /// - For `i18n_variants`, `mode_variants`, `extensions`: child’s entries overwrite parent’s entries.  
    pub fn update_from_child(&mut self, child: &Self) {
        // ----- Core simple Option fields -----
        if child.title.is_some() {
            self.title = child.title.clone();
        }
        if child.description.is_some() {
            self.description = child.description.clone();
        }
        if child.keywords.is_some() {
            self.keywords = child.keywords.clone();
        }
        if child.authors.is_some() {
            self.authors = child.authors.clone();
        }
        if child.creator.is_some() {
            self.creator = child.creator.clone();
        }
        if child.publisher.is_some() {
            self.publisher = child.publisher.clone();
        }
        if child.category.is_some() {
            self.category = child.category.clone();
        }
        if child.classification.is_some() {
            self.classification = child.classification.clone();
        }
        if child.referrer.is_some() {
            self.referrer = child.referrer.clone();
        }

        // ----- Robots & Googlebot (nested Option<Robots>) -----
        if let Some(child_robots) = &child.robots {
            if let Some(self_robots) = &mut self.robots {
                self_robots.update_from_child(child_robots);
            } else {
                self.robots = Some(child_robots.clone());
            }
        }
        if let Some(child_googlebot) = &child.googlebot {
            if let Some(self_googlebot) = &mut self.googlebot {
                self_googlebot.update_from_child(child_googlebot);
            } else {
                self.googlebot = Some(child_googlebot.clone());
            }
        }

        // ----- Alternates (Option<Alternates>) -----
        if let Some(child_alt) = &child.alternates {
            if let Some(self_alt) = &mut self.alternates {
                self_alt.update_from_child(child_alt);
            } else {
                self.alternates = Some(child_alt.clone());
            }
        }

        // ----- Open Graph -----
        if let Some(child_og) = &child.open_graph {
            if let Some(self_og) = &mut self.open_graph {
                self_og.update_from_child(child_og);
            } else {
                self.open_graph = Some(child_og.clone());
            }
        }

        // ----- Twitter -----
        if let Some(child_tw) = &child.twitter {
            if let Some(self_tw) = &mut self.twitter {
                self_tw.update_from_child(child_tw);
            } else {
                self.twitter = Some(child_tw.clone());
            }
        }

        // ----- Icons (Vec<Icon> – simple replace) -----
        if child.icons.is_some() {
            self.icons = child.icons.clone();
        }

        // ----- PWA -----
        if child.manifest.is_some() {
            self.manifest = child.manifest.clone();
        }
        if child.theme_color.is_some() {
            self.theme_color = child.theme_color.clone();
        }
        if child.color_scheme.is_some() {
            self.color_scheme = child.color_scheme.clone();
        }

        // ----- Apple Web App -----
        if let Some(child_awa) = &child.apple_web_app {
            if let Some(self_awa) = &mut self.apple_web_app {
                self_awa.update_from_child(child_awa);
            } else {
                self.apple_web_app = Some(child_awa.clone());
            }
        }

        // ----- App Links -----
        if let Some(child_al) = &child.app_links {
            if let Some(self_al) = &mut self.app_links {
                self_al.update_from_child(child_al);
            } else {
                self.app_links = Some(child_al.clone());
            }
        }

        // ----- Verification -----
        if let Some(child_ver) = &child.verification {
            if let Some(self_ver) = &mut self.verification {
                self_ver.update_from_child(child_ver);
            } else {
                self.verification = Some(child_ver.clone());
            }
        }

        // ----- Structured Data (json_ld) -----
        if child.json_ld.is_some() {
            self.json_ld = child.json_ld.clone();
        }

        // ----- Custom Meta (merge with key override) -----
        let mut merged_meta = Vec::new();
        let mut child_map: HashMap<_, &MetaTag> = child.custom_meta
            .iter()
            .filter_map(|tag| tag.key().map(|k| (k, tag)))
            .collect();
        // First, take all self tags, but if a child has the same key, use child's merged version
        for self_tag in &self.custom_meta {
            if let Some(key) = self_tag.key() {
                if let Some(child_tag) = child_map.remove(&key) {
                    // Child has same key – merge child into self (child wins)
                    let mut merged_tag = self_tag.clone();
                    merged_tag.update_from_child(child_tag);
                    merged_meta.push(merged_tag);
                } else {
                    // No child override – keep self
                    merged_meta.push(self_tag.clone());
                }
            } else {
                // Self tag without key – keep it (can't be overridden)
                merged_meta.push(self_tag.clone());
            }
        }
        // Add remaining child tags that didn't exist in self
        for child_tag in child_map.values() {
            merged_meta.push((*child_tag).clone());
        }
        self.custom_meta = merged_meta;

        // ----- Custom Links (merge with key override) -----
        let mut merged_links = Vec::new();
        let mut child_link_map: HashMap<_, &LinkTag> = child.custom_links
            .iter()
            .filter_map(|tag| tag.key().map(|k| (k, tag)))
            .collect();
        for self_link in &self.custom_links {
            if let Some(key) = self_link.key() {
                if let Some(child_link) = child_link_map.remove(&key) {
                    let mut merged_link = self_link.clone();
                    merged_link.update_from_child(child_link);
                    merged_links.push(merged_link);
                } else {
                    merged_links.push(self_link.clone());
                }
            } else {
                merged_links.push(self_link.clone());
            }
        }
        for child_link in child_link_map.values() {
            merged_links.push((*child_link).clone());
        }
        self.custom_links = merged_links;

        // ----- App Behavior (simple primitive overwrite) -----
        if child.stack_hint.is_some() {
            self.stack_hint = child.stack_hint.clone();
        }
        // requires_auth and skip_layouts are likely bool – if child is not default, overwrite
        // We assume default for bool is false. So if child is true, set self to true.
        if child.requires_auth {
            self.requires_auth = true;
        }
        if child.skip_layouts {
            self.skip_layouts = true;
        }

        // ----- i18n variants (child overrides parent by key) -----
        for (key, child_val) in &child.i18n_variants {
            if let Some(self_val) = self.i18n_variants.get_mut(key) {
                // Both exist – recursively merge
                self_val.update_from_child(child_val);
            } else {
                // Insert child's variant
                self.i18n_variants.insert(key.clone(), child_val.clone());
            }
        }
        // No need to keep parent-only entries because self already had them; child may add new ones.

        // ----- mode variants (same as i18n) -----
        for (key, child_val) in &child.mode_variants {
            if let Some(self_val) = self.mode_variants.get_mut(key) {
                self_val.update_from_child(child_val);
            } else {
                self.mode_variants.insert(key.clone(), child_val.clone());
            }
        }

        // ----- extensions – simple child override (shallow) -----
        for (key, val) in &child.extensions {
            self.extensions.insert(key.clone(), val.clone());
        }
    }
}