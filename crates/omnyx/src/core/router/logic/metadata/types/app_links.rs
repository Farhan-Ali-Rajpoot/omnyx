use super::{TagDescriptor, TagProp};
use serde::{Serialize, Deserialize};
use std::borrow::Cow;

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct IosAppLink {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub url: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub app_store_id: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub app_name: Option<Cow<'static, str>>,
}

impl IosAppLink {
    pub fn render_html(&self) -> String {
        let mut html = String::with_capacity(256);
        meta_tags!(html,
            ("meta", "property", "al:ios:url", self.url.as_deref()),
            ("meta", "property", "al:ios:app_store_id", self.app_store_id.as_deref()),
            ("meta", "property", "al:ios:app_name", self.app_name.as_deref()),
        );
        html
    }

    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        // (original implementation unchanged)
        if let Some(url) = &self.url {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "al:ios:url".to_string() },
                    TagProp { key: "content".to_string(), value: url.to_string() },
                ],
            });
        }
        if let Some(app_store_id) = &self.app_store_id {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "al:ios:app_store_id".to_string() },
                    TagProp { key: "content".to_string(), value: app_store_id.to_string() },
                ],
            });
        }
        if let Some(app_name) = &self.app_name {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "al:ios:app_name".to_string() },
                    TagProp { key: "content".to_string(), value: app_name.to_string() },
                ],
            });
        }
    }

    /// Merges `child` into `self` (mutates self).  
    /// Any `Some` field in `child` overwrites the corresponding field in `self`.  
    /// `None` fields in `child` leave `self` unchanged.
    pub fn update_from_child(&mut self, child: &Self) {
        if child.url.is_some() {
            self.url = child.url.clone();
        }
        if child.app_store_id.is_some() {
            self.app_store_id = child.app_store_id.clone();
        }
        if child.app_name.is_some() {
            self.app_name = child.app_name.clone();
        }
    }
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct AndroidAppLink {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub url: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub package: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub class: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub app_name: Option<Cow<'static, str>>,
}

impl AndroidAppLink {
    pub fn render_html(&self) -> String {
        let mut html = String::with_capacity(256);
        meta_tags!(html,
            ("meta", "property", "al:android:url", self.url.as_deref()),
            ("meta", "property", "al:android:package", self.package.as_deref()),
            ("meta", "property", "al:android:class", self.class.as_deref()),
            ("meta", "property", "al:android:app_name", self.app_name.as_deref()),
        );
        html
    }

    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        if let Some(url) = &self.url {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "al:android:url".to_string() },
                    TagProp { key: "content".to_string(), value: url.to_string() },
                ],
            });
        }
        if let Some(package) = &self.package {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "al:android:package".to_string() },
                    TagProp { key: "content".to_string(), value: package.to_string() },
                ],
            });
        }
        if let Some(class) = &self.class {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "al:android:class".to_string() },
                    TagProp { key: "content".to_string(), value: class.to_string() },
                ],
            });
        }
        if let Some(app_name) = &self.app_name {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "al:android:app_name".to_string() },
                    TagProp { key: "content".to_string(), value: app_name.to_string() },
                ],
            });
        }
    }

    pub fn update_from_child(&mut self, child: &Self) {
        if child.url.is_some() {
            self.url = child.url.clone();
        }
        if child.package.is_some() {
            self.package = child.package.clone();
        }
        if child.class.is_some() {
            self.class = child.class.clone();
        }
        if child.app_name.is_some() {
            self.app_name = child.app_name.clone();
        }
    }
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct WindowsAppLink {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub url: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub app_id: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub app_name: Option<Cow<'static, str>>,
}

impl WindowsAppLink {
    pub fn render_html(&self) -> String {
        let mut html = String::with_capacity(256);
        meta_tags!(html,
            ("meta", "property", "al:windows:url", self.url.as_deref()),
            ("meta", "property", "al:windows:app_id", self.app_id.as_deref()),
            ("meta", "property", "al:windows:app_name", self.app_name.as_deref()),
        );
        html
    }

    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        if let Some(url) = &self.url {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "al:windows:url".to_string() },
                    TagProp { key: "content".to_string(), value: url.to_string() },
                ],
            });
        }
        if let Some(app_id) = &self.app_id {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "al:windows:app_id".to_string() },
                    TagProp { key: "content".to_string(), value: app_id.to_string() },
                ],
            });
        }
        if let Some(app_name) = &self.app_name {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "al:windows:app_name".to_string() },
                    TagProp { key: "content".to_string(), value: app_name.to_string() },
                ],
            });
        }
    }

    pub fn update_from_child(&mut self, child: &Self) {
        if child.url.is_some() {
            self.url = child.url.clone();
        }
        if child.app_id.is_some() {
            self.app_id = child.app_id.clone();
        }
        if child.app_name.is_some() {
            self.app_name = child.app_name.clone();
        }
    }
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct WebAppLink {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub url: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub should_fallback: Option<bool>,
}

impl WebAppLink {
    pub fn render_html(&self) -> String {
        let mut html = String::with_capacity(128);

        if let Some(url) = &self.url {
            html.push_str(&format!("<meta property=\"al:web:url\" content=\"{}\" />\n", url.as_ref()));
        }

        if let Some(fb) = self.should_fallback {
            let value = if fb { "true" } else { "false" };
            html.push_str(&format!("<meta property=\"al:web:should_fallback\" content=\"{}\" />\n", value));
        }

        html
    }

    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        if let Some(url) = &self.url {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "al:web:url".to_string() },
                    TagProp { key: "content".to_string(), value: url.to_string() },
                ],
            });
        }
        if let Some(fb) = self.should_fallback {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "al:web:should_fallback".to_string() },
                    TagProp { key: "content".to_string(), value: (if fb { "true" } else { "false" }).to_string() },
                ],
            });
        }
    }

    pub fn update_from_child(&mut self, child: &Self) {
        if child.url.is_some() {
            self.url = child.url.clone();
        }
        if child.should_fallback.is_some() {
            self.should_fallback = child.should_fallback;
        }
    }
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct AppLinks {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub ios: Option<IosAppLink>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub android: Option<AndroidAppLink>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub windows: Option<WindowsAppLink>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub web: Option<WebAppLink>,
}

impl AppLinks {
    pub fn render_html(&self) -> String {
        let mut html = String::with_capacity(512);

        if let Some(ios) = &self.ios {
            html.push_str(&ios.render_html());
        }
        if let Some(android) = &self.android {
            html.push_str(&android.render_html());
        }
        if let Some(windows) = &self.windows {
            html.push_str(&windows.render_html());
        }
        if let Some(web) = &self.web {
            html.push_str(&web.render_html());
        }

        html
    }

    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        if let Some(ios) = &self.ios {
            ios.collect_tags(tags);
        }
        if let Some(android) = &self.android {
            android.collect_tags(tags);
        }
        if let Some(windows) = &self.windows {
            windows.collect_tags(tags);
        }
        if let Some(web) = &self.web {
            web.collect_tags(tags);
        }
    }

    /// Merges `child` into `self` (mutates self).  
    /// For each optional nested struct:
    /// - If `child` has `Some` for a field, that child struct is merged into `self`'s corresponding field (creating it if missing).
    /// - If `child` has `None`, `self`'s field remains unchanged.
    pub fn update_from_child(&mut self, child: &Self) {
        // iOS
        if let Some(child_ios) = &child.ios {
            if let Some(self_ios) = &mut self.ios {
                self_ios.update_from_child(child_ios);
            } else {
                self.ios = Some(child_ios.clone());
            }
        }
        // Android
        if let Some(child_android) = &child.android {
            if let Some(self_android) = &mut self.android {
                self_android.update_from_child(child_android);
            } else {
                self.android = Some(child_android.clone());
            }
        }
        // Windows
        if let Some(child_windows) = &child.windows {
            if let Some(self_windows) = &mut self.windows {
                self_windows.update_from_child(child_windows);
            } else {
                self.windows = Some(child_windows.clone());
            }
        }
        // Web
        if let Some(child_web) = &child.web {
            if let Some(self_web) = &mut self.web {
                self_web.update_from_child(child_web);
            } else {
                self.web = Some(child_web.clone());
            }
        }
    }
}