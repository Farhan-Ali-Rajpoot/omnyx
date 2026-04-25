use super::{TagDescriptor, TagProp};
use serde::{Serialize, Deserialize};
use std::borrow::Cow;

#[derive(Clone, Debug, Default, Serialize, Deserialize, PartialEq)]
pub struct MetaTag {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub property: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub http_equiv: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub content: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub charset: Option<Cow<'static, str>>,
}

impl MetaTag {
    /// Renders the meta tag as a valid HTML string.
    /// Handles charset specially (self-closing tag without content).
    pub fn render_html(&self) -> String {
        let mut html = String::with_capacity(128);
        html.push_str("<meta");

        if let Some(charset) = &self.charset {
            html.push_str(" charset=\"");
            html.push_str(charset.as_ref());
            html.push('"');
        } else {
            if let Some(name) = &self.name {
                html.push_str(" name=\"");
                html.push_str(name.as_ref());
                html.push('"');
            }
            if let Some(property) = &self.property {
                html.push_str(" property=\"");
                html.push_str(property.as_ref());
                html.push('"');
            }
            if let Some(http_equiv) = &self.http_equiv {
                html.push_str(" http-equiv=\"");
                html.push_str(http_equiv.as_ref());
                html.push('"');
            }
            if let Some(content) = &self.content {
                html.push_str(" content=\"");
                html.push_str(content.as_ref());
                html.push('"');
            }
        }

        html.push_str(" />\n");
        html
    }

    /// Collects flat tag descriptors for this meta tag.
    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        let mut props = Vec::new();
        if let Some(name) = &self.name {
            props.push(TagProp { key: "name".to_string(), value: name.to_string() });
        }
        if let Some(property) = &self.property {
            props.push(TagProp { key: "property".to_string(), value: property.to_string() });
        }
        if let Some(http_equiv) = &self.http_equiv {
            props.push(TagProp { key: "http-equiv".to_string(), value: http_equiv.to_string() });
        }
        if let Some(content) = &self.content {
            props.push(TagProp { key: "content".to_string(), value: content.to_string() });
        }
        if let Some(charset) = &self.charset {
            props.push(TagProp { key: "charset".to_string(), value: charset.to_string() });
        }

        if !props.is_empty() {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props,
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
        if child.property.is_some() {
            self.property = child.property.clone();
        }
        if child.http_equiv.is_some() {
            self.http_equiv = child.http_equiv.clone();
        }
        if child.content.is_some() {
            self.content = child.content.clone();
        }
        if child.charset.is_some() {
            self.charset = child.charset.clone();
        }
    }

    /// Returns a unique key for this meta tag based on its primary attribute.
    pub fn key(&self) -> Option<Cow<'static, str>> {
        self.name.clone()
            .or_else(|| self.property.clone())
            .or_else(|| self.http_equiv.clone())
            .or_else(|| self.charset.clone())
    }
}

#[derive(Clone, Debug, Default, Serialize, PartialEq, Deserialize)]
pub struct LinkTag {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub rel: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub href: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub type_: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub sizes: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub media: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub integrity: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub crossorigin: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub referrerpolicy: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub as_: Option<Cow<'static, str>>,
}

impl LinkTag {
    /// Renders the link tag with all present attributes.
    pub fn render_html(&self) -> String {
        let mut html = String::with_capacity(256);
        html.push_str("<link");

        macro_rules! push_attr {
            ($attr:literal, $value:expr) => {
                if let Some(v) = $value {
                    html.push_str(" ");
                    html.push_str($attr);
                    html.push_str("=\"");
                    html.push_str(v.as_ref());
                    html.push('"');
                }
            };
        }

        push_attr!("rel", self.rel.as_ref());
        push_attr!("href", self.href.as_ref());
        push_attr!("type", self.type_.as_ref());
        push_attr!("sizes", self.sizes.as_ref());
        push_attr!("media", self.media.as_ref());
        push_attr!("integrity", self.integrity.as_ref());
        push_attr!("crossorigin", self.crossorigin.as_ref());
        push_attr!("referrerpolicy", self.referrerpolicy.as_ref());
        push_attr!("as", self.as_.as_ref());

        html.push_str(" />\n");
        html
    }

    /// Collects flat tag descriptors for this link tag.
    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        let mut props = Vec::new();
        if let Some(rel) = &self.rel {
            props.push(TagProp { key: "rel".to_string(), value: rel.to_string() });
        }
        if let Some(href) = &self.href {
            props.push(TagProp { key: "href".to_string(), value: href.to_string() });
        }
        if let Some(type_) = &self.type_ {
            props.push(TagProp { key: "type".to_string(), value: type_.to_string() });
        }
        if let Some(sizes) = &self.sizes {
            props.push(TagProp { key: "sizes".to_string(), value: sizes.to_string() });
        }
        if let Some(media) = &self.media {
            props.push(TagProp { key: "media".to_string(), value: media.to_string() });
        }
        if let Some(integrity) = &self.integrity {
            props.push(TagProp { key: "integrity".to_string(), value: integrity.to_string() });
        }
        if let Some(crossorigin) = &self.crossorigin {
            props.push(TagProp { key: "crossorigin".to_string(), value: crossorigin.to_string() });
        }
        if let Some(referrerpolicy) = &self.referrerpolicy {
            props.push(TagProp { key: "referrerpolicy".to_string(), value: referrerpolicy.to_string() });
        }
        if let Some(as_) = &self.as_ {
            props.push(TagProp { key: "as".to_string(), value: as_.to_string() });
        }

        if !props.is_empty() {
            tags.push(TagDescriptor {
                r#type: "link".to_string(),
                content: None,
                props,
            });
        }
    }

    /// Merges `child` into `self` (mutates self).  
    /// Any `Some` field in `child` overwrites the corresponding field in `self`.  
    /// `None` fields in `child` leave `self` unchanged.
    pub fn update_from_child(&mut self, child: &Self) {
        if child.rel.is_some() {
            self.rel = child.rel.clone();
        }
        if child.href.is_some() {
            self.href = child.href.clone();
        }
        if child.type_.is_some() {
            self.type_ = child.type_.clone();
        }
        if child.sizes.is_some() {
            self.sizes = child.sizes.clone();
        }
        if child.media.is_some() {
            self.media = child.media.clone();
        }
        if child.integrity.is_some() {
            self.integrity = child.integrity.clone();
        }
        if child.crossorigin.is_some() {
            self.crossorigin = child.crossorigin.clone();
        }
        if child.referrerpolicy.is_some() {
            self.referrerpolicy = child.referrerpolicy.clone();
        }
        if child.as_.is_some() {
            self.as_ = child.as_.clone();
        }
    }

    /// Returns a unique key for this link tag based on its `rel` attribute.
    pub fn key(&self) -> Option<Cow<'static, str>> {
        self.rel.clone()
    }
}