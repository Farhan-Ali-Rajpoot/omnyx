use super::{TagDescriptor, TagProp};
use serde::{Serialize, Deserialize};
use std::borrow::Cow;

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct AppleWebApp {
    /// Enables standalone (full‑screen) mode. Values: "yes", "no".
    #[serde(skip_serializing_if = "Option::is_none")]
    pub capable: Option<Cow<'static, str>>,

    /// Sets the title on the home screen icon. If not provided, the page title is used.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub title: Option<Cow<'static, str>>,

    /// Status bar appearance. Values: "default", "black", "black-translucent".
    #[serde(skip_serializing_if = "Option::is_none")]
    pub status_bar_style: Option<Cow<'static, str>>,
}

impl AppleWebApp {
    /// Renders HTML meta tags for Apple web app.
    pub fn render_html(&self) -> String {
        let mut html = String::with_capacity(128);
        meta_tags!(html,
            ("meta", "name", "apple-mobile-web-app-capable", self.capable.as_deref()),
            ("meta", "name", "apple-mobile-web-app-title", self.title.as_deref()),
            ("meta", "name", "apple-mobile-web-app-status-bar-style", self.status_bar_style.as_deref()),
        );
        html
    }

    /// Collects flat tag descriptors for all Apple web app meta tags.
    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        if let Some(capable) = &self.capable {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "name".to_string(), value: "apple-mobile-web-app-capable".to_string() },
                    TagProp { key: "content".to_string(), value: capable.to_string() },
                ],
            });
        }
        if let Some(title) = &self.title {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "name".to_string(), value: "apple-mobile-web-app-title".to_string() },
                    TagProp { key: "content".to_string(), value: title.to_string() },
                ],
            });
        }
        if let Some(style) = &self.status_bar_style {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "name".to_string(), value: "apple-mobile-web-app-status-bar-style".to_string() },
                    TagProp { key: "content".to_string(), value: style.to_string() },
                ],
            });
        }
    }

    /// Merges `child` into `self` (mutates self).  
    /// Any `Some` field in `child` overwrites the corresponding field in `self`.  
    /// `None` fields in `child` leave `self` unchanged.
    pub fn update_from_child(&mut self, child: &Self) {
        if child.capable.is_some() {
            self.capable = child.capable.clone();
        }
        if child.title.is_some() {
            self.title = child.title.clone();
        }
        if child.status_bar_style.is_some() {
            self.status_bar_style = child.status_bar_style.clone();
        }
    }
}