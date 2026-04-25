use super::{TagDescriptor, TagProp};
use serde::{Serialize, Deserialize};
use std::borrow::Cow;

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct Author {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub url: Option<Cow<'static, str>>,
}

impl Author {
    pub fn render_html(&self) -> String {
        let mut html = String::with_capacity(256);
        meta_tags!(html, ("meta", "name", "author", self.name.as_deref()));
        if let Some(url) = &self.url {
            meta_tags!(link: html, ("link", "rel", "author", Some(url.as_ref())));
        }
        html
    }

    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        if let Some(name) = &self.name {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "name".to_string(), value: "author".to_string() },
                    TagProp { key: "content".to_string(), value: name.to_string() },
                ],
            });
        }
        if let Some(url) = &self.url {
            tags.push(TagDescriptor {
                r#type: "link".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "rel".to_string(), value: "author".to_string() },
                    TagProp { key: "href".to_string(), value: url.to_string() },
                ],
            });
        }
    }

    /// Merges `child` into `self` (mutates self).  
    /// Any `Some` field in `child` overwrites the corresponding field in `self`.  
    /// `None` fields in `child` leave `self` unchanged.
    pub fn update_from_child(&mut self, child: &Self) {
        if child.name.is_some() {
            self.name = child.name.clone();
        }
        if child.url.is_some() {
            self.url = child.url.clone();
        }
    }
}