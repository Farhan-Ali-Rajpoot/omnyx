use super::{TagDescriptor, TagProp};
use serde::{Serialize, Deserialize};
use std::borrow::Cow;

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct TwitterCard {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub card: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub site: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub site_id: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub creator: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub creator_id: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub title: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub image: Option<TwitterImage>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub player: Option<TwitterPlayer>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub app: Option<TwitterApp>,
}

impl TwitterCard {
    pub fn render_html(&self) -> String {
        let mut html = String::with_capacity(1024);
        meta_tags!(html,
            ("meta", "name", "twitter:card", self.card.as_deref()),
            ("meta", "name", "twitter:site", self.site.as_deref()),
            ("meta", "name", "twitter:site:id", self.site_id.as_deref()),
            ("meta", "name", "twitter:creator", self.creator.as_deref()),
            ("meta", "name", "twitter:creator:id", self.creator_id.as_deref()),
            ("meta", "name", "twitter:title", self.title.as_deref()),
            ("meta", "name", "twitter:description", self.description.as_deref()),
        );
        if let Some(ref img) = self.image {
            html.push_str(&img.render_html());
        }
        if let Some(ref player) = self.player {
            html.push_str(&player.render_html());
        }
        if let Some(ref app) = self.app {
            html.push_str(&app.render_html());
        }
        html
    }

    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        // Basic twitter meta tags
        if let Some(card) = &self.card {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "name".to_string(), value: "twitter:card".to_string() },
                    TagProp { key: "content".to_string(), value: card.to_string() },
                ],
            });
        }
        if let Some(site) = &self.site {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "name".to_string(), value: "twitter:site".to_string() },
                    TagProp { key: "content".to_string(), value: site.to_string() },
                ],
            });
        }
        if let Some(site_id) = &self.site_id {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "name".to_string(), value: "twitter:site:id".to_string() },
                    TagProp { key: "content".to_string(), value: site_id.to_string() },
                ],
            });
        }
        if let Some(creator) = &self.creator {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "name".to_string(), value: "twitter:creator".to_string() },
                    TagProp { key: "content".to_string(), value: creator.to_string() },
                ],
            });
        }
        if let Some(creator_id) = &self.creator_id {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "name".to_string(), value: "twitter:creator:id".to_string() },
                    TagProp { key: "content".to_string(), value: creator_id.to_string() },
                ],
            });
        }
        if let Some(title) = &self.title {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "name".to_string(), value: "twitter:title".to_string() },
                    TagProp { key: "content".to_string(), value: title.to_string() },
                ],
            });
        }
        if let Some(desc) = &self.description {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "name".to_string(), value: "twitter:description".to_string() },
                    TagProp { key: "content".to_string(), value: desc.to_string() },
                ],
            });
        }
        // Nested structs
        if let Some(img) = &self.image {
            img.collect_tags(tags);
        }
        if let Some(player) = &self.player {
            player.collect_tags(tags);
        }
        if let Some(app) = &self.app {
            app.collect_tags(tags);
        }
    }

    /// Merges `child` into `self` (mutates self).  
    /// Child's `Some` fields overwrite `self`. For nested structs, recursively call `update_from_child`.
    pub fn update_from_child(&mut self, child: &Self) {
        if child.card.is_some() {
            self.card = child.card.clone();
        }
        if child.site.is_some() {
            self.site = child.site.clone();
        }
        if child.site_id.is_some() {
            self.site_id = child.site_id.clone();
        }
        if child.creator.is_some() {
            self.creator = child.creator.clone();
        }
        if child.creator_id.is_some() {
            self.creator_id = child.creator_id.clone();
        }
        if child.title.is_some() {
            self.title = child.title.clone();
        }
        if child.description.is_some() {
            self.description = child.description.clone();
        }

        // Nested option structs: if child has Some, either update existing or clone
        if let Some(child_img) = &child.image {
            if let Some(self_img) = &mut self.image {
                self_img.update_from_child(child_img);
            } else {
                self.image = Some(child_img.clone());
            }
        }
        if let Some(child_player) = &child.player {
            if let Some(self_player) = &mut self.player {
                self_player.update_from_child(child_player);
            } else {
                self.player = Some(child_player.clone());
            }
        }
        if let Some(child_app) = &child.app {
            if let Some(self_app) = &mut self.app {
                self_app.update_from_child(child_app);
            } else {
                self.app = Some(child_app.clone());
            }
        }
    }
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct TwitterImage {
    pub url: Cow<'static, str>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub alt: Option<Cow<'static, str>>,
}

impl TwitterImage {
    pub fn render_html(&self) -> String {
        let mut html = String::with_capacity(128);
        html.push_str(&format!("<meta name=\"twitter:image\" content=\"{}\" />\n", self.url.as_ref()));
        if let Some(ref alt) = self.alt {
            html.push_str(&format!("<meta name=\"twitter:image:alt\" content=\"{}\" />\n", alt.as_ref()));
        }
        html
    }

    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        tags.push(TagDescriptor {
            r#type: "meta".to_string(),
            content: None,
            props: vec![
                TagProp { key: "name".to_string(), value: "twitter:image".to_string() },
                TagProp { key: "content".to_string(), value: self.url.to_string() },
            ],
        });
        if let Some(alt) = &self.alt {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "name".to_string(), value: "twitter:image:alt".to_string() },
                    TagProp { key: "content".to_string(), value: alt.to_string() },
                ],
            });
        }
    }

    pub fn update_from_child(&mut self, child: &Self) {
        self.url = child.url.clone(); // non-optional overwrites
        if child.alt.is_some() {
            self.alt = child.alt.clone();
        }
    }
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct TwitterPlayer {
    pub url: Cow<'static, str>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub width: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub height: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub stream: Option<Cow<'static, str>>,
}

impl TwitterPlayer {
    pub fn render_html(&self) -> String {
        let mut html = String::with_capacity(256);
        html.push_str(&format!("<meta name=\"twitter:player\" content=\"{}\" />\n", self.url.as_ref()));
        meta_tags!(html,
            ("meta", "name", "twitter:player:width", self.width.as_deref()),
            ("meta", "name", "twitter:player:height", self.height.as_deref()),
            ("meta", "name", "twitter:stream", self.stream.as_deref()),
        );
        html
    }

    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        tags.push(TagDescriptor {
            r#type: "meta".to_string(),
            content: None,
            props: vec![
                TagProp { key: "name".to_string(), value: "twitter:player".to_string() },
                TagProp { key: "content".to_string(), value: self.url.to_string() },
            ],
        });
        if let Some(width) = &self.width {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "name".to_string(), value: "twitter:player:width".to_string() },
                    TagProp { key: "content".to_string(), value: width.to_string() },
                ],
            });
        }
        if let Some(height) = &self.height {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "name".to_string(), value: "twitter:player:height".to_string() },
                    TagProp { key: "content".to_string(), value: height.to_string() },
                ],
            });
        }
        if let Some(stream) = &self.stream {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "name".to_string(), value: "twitter:stream".to_string() },
                    TagProp { key: "content".to_string(), value: stream.to_string() },
                ],
            });
        }
    }

    pub fn update_from_child(&mut self, child: &Self) {
        self.url = child.url.clone();
        if child.width.is_some() {
            self.width = child.width.clone();
        }
        if child.height.is_some() {
            self.height = child.height.clone();
        }
        if child.stream.is_some() {
            self.stream = child.stream.clone();
        }
    }
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct TwitterApp {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub iphone: Option<TwitterAppPlatform>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub ipad: Option<TwitterAppPlatform>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub googleplay: Option<TwitterAppPlatform>,
}

impl TwitterApp {
    pub fn render_html(&self) -> String {
        let mut html = String::with_capacity(512);
        if let Some(ref platform) = self.iphone {
            render_platform(&mut html, "iphone", platform);
        }
        if let Some(ref platform) = self.ipad {
            render_platform(&mut html, "ipad", platform);
        }
        if let Some(ref platform) = self.googleplay {
            render_platform(&mut html, "googleplay", platform);
        }
        html
    }

    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        if let Some(iphone) = &self.iphone {
            iphone.collect_tags(tags, "iphone");
        }
        if let Some(ipad) = &self.ipad {
            ipad.collect_tags(tags, "ipad");
        }
        if let Some(googleplay) = &self.googleplay {
            googleplay.collect_tags(tags, "googleplay");
        }
    }

    pub fn update_from_child(&mut self, child: &Self) {
        if let Some(child_iphone) = &child.iphone {
            if let Some(self_iphone) = &mut self.iphone {
                self_iphone.update_from_child(child_iphone);
            } else {
                self.iphone = Some(child_iphone.clone());
            }
        }
        if let Some(child_ipad) = &child.ipad {
            if let Some(self_ipad) = &mut self.ipad {
                self_ipad.update_from_child(child_ipad);
            } else {
                self.ipad = Some(child_ipad.clone());
            }
        }
        if let Some(child_gp) = &child.googleplay {
            if let Some(self_gp) = &mut self.googleplay {
                self_gp.update_from_child(child_gp);
            } else {
                self.googleplay = Some(child_gp.clone());
            }
        }
    }
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct TwitterAppPlatform {
    pub name: Cow<'static, str>,
    pub id: Cow<'static, str>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub url: Option<Cow<'static, str>>,
}

impl TwitterAppPlatform {
    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>, platform: &str) {
        tags.push(TagDescriptor {
            r#type: "meta".to_string(),
            content: None,
            props: vec![
                TagProp { key: "name".to_string(), value: format!("twitter:app:name:{}", platform) },
                TagProp { key: "content".to_string(), value: self.name.to_string() },
            ],
        });
        tags.push(TagDescriptor {
            r#type: "meta".to_string(),
            content: None,
            props: vec![
                TagProp { key: "name".to_string(), value: format!("twitter:app:id:{}", platform) },
                TagProp { key: "content".to_string(), value: self.id.to_string() },
            ],
        });
        if let Some(url) = &self.url {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "name".to_string(), value: format!("twitter:app:url:{}", platform) },
                    TagProp { key: "content".to_string(), value: url.to_string() },
                ],
            });
        }
    }

    pub fn update_from_child(&mut self, child: &Self) {
        self.name = child.name.clone();
        self.id = child.id.clone();
        if child.url.is_some() {
            self.url = child.url.clone();
        }
    }
}

fn render_platform(html: &mut String, platform: &str, data: &TwitterAppPlatform) {
    html.push_str(&format!("<meta name=\"twitter:app:name:{}\" content=\"{}\" />\n", platform, data.name.as_ref()));
    html.push_str(&format!("<meta name=\"twitter:app:id:{}\" content=\"{}\" />\n", platform, data.id.as_ref()));
    if let Some(ref url) = data.url {
        html.push_str(&format!("<meta name=\"twitter:app:url:{}\" content=\"{}\" />\n", platform, url.as_ref()));
    }
}