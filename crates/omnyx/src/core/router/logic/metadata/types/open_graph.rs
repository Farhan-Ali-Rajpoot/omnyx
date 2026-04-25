use super::{TagDescriptor, TagProp};
use serde::{Serialize, Deserialize};
use std::borrow::Cow;

// Note: The following nested types (OgImage, OgVideo, OgAudio, ArticleMetadata,
// BookMetadata, ProfileMetadata) are assumed to have their own `update_from_child` methods.
// If they don't, you'll need to implement them similarly.

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct OpenGraph {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub title: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub url: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub site_name: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub locale: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub alternate_locales: Option<Vec<Cow<'static, str>>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub determiner: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub og_type: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub images: Option<Vec<OgImage>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub videos: Option<Vec<OgVideo>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub audio: Option<Vec<OgAudio>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub article: Option<ArticleMetadata>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub book: Option<BookMetadata>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub profile: Option<ProfileMetadata>,
}

impl OpenGraph {
    pub fn render_html(&self) -> String {
        let mut html = String::with_capacity(1024);

        meta_tags!(html,
            ("meta", "property", "og:title", self.title.as_deref()),
            ("meta", "property", "og:description", self.description.as_deref()),
            ("meta", "property", "og:url", self.url.as_deref()),
            ("meta", "property", "og:site_name", self.site_name.as_deref()),
            ("meta", "property", "og:locale", self.locale.as_deref()),
            ("meta", "property", "og:determiner", self.determiner.as_deref()),
            ("meta", "property", "og:type", self.og_type.as_deref()),
        );

        if let Some(locales) = &self.alternate_locales {
            for locale in locales {
                html.push_str(&format!("<meta property=\"og:locale:alternate\" content=\"{}\" />\n", locale.as_ref()));
            }
        }

        if let Some(images) = &self.images {
            for img in images { html.push_str(&img.render_html()); }
        }
        if let Some(videos) = &self.videos {
            for vid in videos { html.push_str(&vid.render_html()); }
        }
        if let Some(audio) = &self.audio {
            for aud in audio { html.push_str(&aud.render_html()); }
        }

        if let Some(ref article) = self.article { html.push_str(&article.render_html()); }
        if let Some(ref book) = self.book { html.push_str(&book.render_html()); }
        if let Some(ref profile) = self.profile { html.push_str(&profile.render_html()); }

        html
    }

    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        // Basic Open Graph meta tags
        if let Some(title) = &self.title {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "og:title".to_string() },
                    TagProp { key: "content".to_string(), value: title.to_string() },
                ],
            });
        }
        if let Some(description) = &self.description {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "og:description".to_string() },
                    TagProp { key: "content".to_string(), value: description.to_string() },
                ],
            });
        }
        if let Some(url) = &self.url {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "og:url".to_string() },
                    TagProp { key: "content".to_string(), value: url.to_string() },
                ],
            });
        }
        if let Some(site_name) = &self.site_name {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "og:site_name".to_string() },
                    TagProp { key: "content".to_string(), value: site_name.to_string() },
                ],
            });
        }
        if let Some(locale) = &self.locale {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "og:locale".to_string() },
                    TagProp { key: "content".to_string(), value: locale.to_string() },
                ],
            });
        }
        if let Some(determiner) = &self.determiner {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "og:determiner".to_string() },
                    TagProp { key: "content".to_string(), value: determiner.to_string() },
                ],
            });
        }
        if let Some(og_type) = &self.og_type {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "og:type".to_string() },
                    TagProp { key: "content".to_string(), value: og_type.to_string() },
                ],
            });
        }

        // Alternate locales
        if let Some(locales) = &self.alternate_locales {
            for locale in locales {
                tags.push(TagDescriptor {
                    r#type: "meta".to_string(),
                    content: None,
                    props: vec![
                        TagProp { key: "property".to_string(), value: "og:locale:alternate".to_string() },
                        TagProp { key: "content".to_string(), value: locale.to_string() },
                    ],
                });
            }
        }

        // Images, videos, audio
        if let Some(images) = &self.images {
            for img in images {
                img.collect_tags(tags);
            }
        }
        if let Some(videos) = &self.videos {
            for vid in videos {
                vid.collect_tags(tags);
            }
        }
        if let Some(audio) = &self.audio {
            for aud in audio {
                aud.collect_tags(tags);
            }
        }

        // Type-specific metadata
        if let Some(article) = &self.article {
            article.collect_tags(tags);
        }
        if let Some(book) = &self.book {
            book.collect_tags(tags);
        }
        if let Some(profile) = &self.profile {
            profile.collect_tags(tags);
        }
    }

    /// Merges `child` into `self` (mutates self).  
    /// - For simple `Option` fields: if `child` has `Some(v)`, assign `v` to `self`.  
    /// - For `Option<Vec<T>>`: if `child` has `Some(vec)`, replace `self`’s vec with `child`’s vec (full override).  
    /// - For nested structs (`article`, `book`, `profile`): if `child` has `Some`, either update the existing
    ///   inner struct (if `self` already has one) or clone `child`'s inner struct.
    pub fn update_from_child(&mut self, child: &Self) {
        // Simple optional primitives
        if child.title.is_some() {
            self.title = child.title.clone();
        }
        if child.description.is_some() {
            self.description = child.description.clone();
        }
        if child.url.is_some() {
            self.url = child.url.clone();
        }
        if child.site_name.is_some() {
            self.site_name = child.site_name.clone();
        }
        if child.locale.is_some() {
            self.locale = child.locale.clone();
        }
        if child.determiner.is_some() {
            self.determiner = child.determiner.clone();
        }
        if child.og_type.is_some() {
            self.og_type = child.og_type.clone();
        }

        // Optional vectors (full replacement)
        if child.alternate_locales.is_some() {
            self.alternate_locales = child.alternate_locales.clone();
        }
        if child.images.is_some() {
            self.images = child.images.clone();
        }
        if child.videos.is_some() {
            self.videos = child.videos.clone();
        }
        if child.audio.is_some() {
            self.audio = child.audio.clone();
        }

        // Nested optional structs: update in place if both exist, otherwise clone
        if let Some(child_article) = &child.article {
            if let Some(self_article) = &mut self.article {
                self_article.update_from_child(child_article);
            } else {
                self.article = Some(child_article.clone());
            }
        }
        if let Some(child_book) = &child.book {
            if let Some(self_book) = &mut self.book {
                self_book.update_from_child(child_book);
            } else {
                self.book = Some(child_book.clone());
            }
        }
        if let Some(child_profile) = &child.profile {
            if let Some(self_profile) = &mut self.profile {
                self_profile.update_from_child(child_profile);
            } else {
                self.profile = Some(child_profile.clone());
            }
        }
    }
}
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct OgImage {
    pub url: Cow<'static, str>,
    pub width: u32,
    pub height: u32,
    pub alt: Cow<'static, str>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub secure_url: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub media_type: Option<Cow<'static, str>>,
}

impl Default for OgImage {
    fn default() -> Self {
        Self {
            url: Cow::Borrowed(""),
            width: 0,
            height: 0,
            alt: Cow::Borrowed(""),
            secure_url: None,
            media_type: None,
        }
    }
}

impl OgImage {
    pub fn render_html(&self) -> String {
        let mut html = String::new();
        html.push_str(&format!("<meta property=\"og:image\" content=\"{}\" />\n", self.url.as_ref()));

        let w = self.width.to_string();
        let h = self.height.to_string();

        meta_tags!(html,
            ("meta", "property", "og:image:width", Some(w.as_str())),
            ("meta", "property", "og:image:height", Some(h.as_str())),
            ("meta", "property", "og:image:alt", Some(self.alt.as_ref())),
            ("meta", "property", "og:image:secure_url", self.secure_url.as_deref()),
            ("meta", "property", "og:image:type", self.media_type.as_deref()),
        );
        html
    }

    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        // Main image meta tag
        tags.push(TagDescriptor {
            r#type: "meta".to_string(),
            content: None,
            props: vec![
                TagProp { key: "property".to_string(), value: "og:image".to_string() },
                TagProp { key: "content".to_string(), value: self.url.to_string() },
            ],
        });

        // Width
        tags.push(TagDescriptor {
            r#type: "meta".to_string(),
            content: None,
            props: vec![
                TagProp { key: "property".to_string(), value: "og:image:width".to_string() },
                TagProp { key: "content".to_string(), value: self.width.to_string() },
            ],
        });

        // Height
        tags.push(TagDescriptor {
            r#type: "meta".to_string(),
            content: None,
            props: vec![
                TagProp { key: "property".to_string(), value: "og:image:height".to_string() },
                TagProp { key: "content".to_string(), value: self.height.to_string() },
            ],
        });

        // Alt
        tags.push(TagDescriptor {
            r#type: "meta".to_string(),
            content: None,
            props: vec![
                TagProp { key: "property".to_string(), value: "og:image:alt".to_string() },
                TagProp { key: "content".to_string(), value: self.alt.to_string() },
            ],
        });

        // Secure URL
        if let Some(secure_url) = &self.secure_url {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "og:image:secure_url".to_string() },
                    TagProp { key: "content".to_string(), value: secure_url.to_string() },
                ],
            });
        }

        // Type
        if let Some(media_type) = &self.media_type {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "og:image:type".to_string() },
                    TagProp { key: "content".to_string(), value: media_type.to_string() },
                ],
            });
        }
    }

    /// Merges `child` into `self` (mutates self).  
    /// Non‑optional fields always take `child`’s value.  
    /// Optional fields are overwritten only if `child` has `Some`.
    pub fn update_from_child(&mut self, child: &Self) {
        // Non‑optional fields: always overwrite
        self.url = child.url.clone();
        self.width = child.width;
        self.height = child.height;
        self.alt = child.alt.clone();

        // Optional fields: only if child has value
        if child.secure_url.is_some() {
            self.secure_url = child.secure_url.clone();
        }
        if child.media_type.is_some() {
            self.media_type = child.media_type.clone();
        }
    }
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct OgVideo {
    pub url: Cow<'static, str>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub secure_url: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub media_type: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub width: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub height: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub alt: Option<Cow<'static, str>>,
}

impl OgVideo {
    pub fn render_html(&self) -> String {
        let mut html = String::new();
        html.push_str(&format!("<meta property=\"og:video\" content=\"{}\" />\n", self.url.as_ref()));

        let w = self.width.map(|v| v.to_string());
        let h = self.height.map(|v| v.to_string());

        meta_tags!(html,
            ("meta", "property", "og:video:secure_url", self.secure_url.as_deref()),
            ("meta", "property", "og:video:type", self.media_type.as_deref()),
            ("meta", "property", "og:video:width", w.as_deref()),
            ("meta", "property", "og:video:height", h.as_deref()),
            ("meta", "property", "og:video:alt", self.alt.as_deref()),
        );
        html
    }

    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        // Main video tag
        tags.push(TagDescriptor {
            r#type: "meta".to_string(),
            content: None,
            props: vec![
                TagProp { key: "property".to_string(), value: "og:video".to_string() },
                TagProp { key: "content".to_string(), value: self.url.to_string() },
            ],
        });

        if let Some(secure_url) = &self.secure_url {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "og:video:secure_url".to_string() },
                    TagProp { key: "content".to_string(), value: secure_url.to_string() },
                ],
            });
        }

        if let Some(media_type) = &self.media_type {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "og:video:type".to_string() },
                    TagProp { key: "content".to_string(), value: media_type.to_string() },
                ],
            });
        }

        if let Some(width) = self.width {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "og:video:width".to_string() },
                    TagProp { key: "content".to_string(), value: width.to_string() },
                ],
            });
        }

        if let Some(height) = self.height {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "og:video:height".to_string() },
                    TagProp { key: "content".to_string(), value: height.to_string() },
                ],
            });
        }

        if let Some(alt) = &self.alt {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "og:video:alt".to_string() },
                    TagProp { key: "content".to_string(), value: alt.to_string() },
                ],
            });
        }
    }

    /// Merges `child` into `self` (mutates self).  
    /// Non‑optional `url` always takes `child`’s value.  
    /// Optional fields are overwritten only if `child` has `Some`.
    pub fn update_from_child(&mut self, child: &Self) {
        // Non‑optional field
        self.url = child.url.clone();

        // Optional fields
        if child.secure_url.is_some() {
            self.secure_url = child.secure_url.clone();
        }
        if child.media_type.is_some() {
            self.media_type = child.media_type.clone();
        }
        if child.width.is_some() {
            self.width = child.width;
        }
        if child.height.is_some() {
            self.height = child.height;
        }
        if child.alt.is_some() {
            self.alt = child.alt.clone();
        }
    }
}
#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct OgAudio {
    pub url: Cow<'static, str>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub secure_url: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub media_type: Option<Cow<'static, str>>,
}

impl OgAudio {
    pub fn render_html(&self) -> String {
        let mut html = String::with_capacity(256);
        html.push_str(&format!("<meta property=\"og:audio\" content=\"{}\" />\n", self.url.as_ref()));
        meta_tags!(html,
            ("meta", "property", "og:audio:secure_url", self.secure_url.as_deref()),
            ("meta", "property", "og:audio:type", self.media_type.as_deref()),
        );
        html
    }

    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        tags.push(TagDescriptor {
            r#type: "meta".to_string(),
            content: None,
            props: vec![
                TagProp { key: "property".to_string(), value: "og:audio".to_string() },
                TagProp { key: "content".to_string(), value: self.url.to_string() },
            ],
        });
        if let Some(secure_url) = &self.secure_url {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "og:audio:secure_url".to_string() },
                    TagProp { key: "content".to_string(), value: secure_url.to_string() },
                ],
            });
        }
        if let Some(media_type) = &self.media_type {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "og:audio:type".to_string() },
                    TagProp { key: "content".to_string(), value: media_type.to_string() },
                ],
            });
        }
    }

    /// Merges `child` into `self` (mutates self).  
    /// Non‑optional `url` always takes `child`’s value.  
    /// Optional fields are overwritten only if `child` has `Some`.
    pub fn update_from_child(&mut self, child: &Self) {
        self.url = child.url.clone();
        if child.secure_url.is_some() {
            self.secure_url = child.secure_url.clone();
        }
        if child.media_type.is_some() {
            self.media_type = child.media_type.clone();
        }
    }
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct ArticleMetadata {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub published_time: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub modified_time: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub expiration_time: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub authors: Option<Vec<Cow<'static, str>>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub section: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tags: Option<Vec<Cow<'static, str>>>,
}

impl ArticleMetadata {
    pub fn render_html(&self) -> String {
        let mut html = String::new();
        meta_tags!(html,
            ("meta", "property", "article:published_time", self.published_time.as_deref()),
            ("meta", "property", "article:modified_time", self.modified_time.as_deref()),
            ("meta", "property", "article:expiration_time", self.expiration_time.as_deref()),
            ("meta", "property", "article:section", self.section.as_deref()),
        );

        if let Some(authors) = &self.authors {
            for author in authors {
                html.push_str(&format!("<meta property=\"article:author\" content=\"{}\" />\n", author.as_ref()));
            }
        }

        if let Some(tags) = &self.tags {
            for tag in tags {
                html.push_str(&format!("<meta property=\"article:tag\" content=\"{}\" />\n", tag.as_ref()));
            }
        }

        html
    }

    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        if let Some(published_time) = &self.published_time {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "article:published_time".to_string() },
                    TagProp { key: "content".to_string(), value: published_time.to_string() },
                ],
            });
        }
        if let Some(modified_time) = &self.modified_time {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "article:modified_time".to_string() },
                    TagProp { key: "content".to_string(), value: modified_time.to_string() },
                ],
            });
        }
        if let Some(expiration_time) = &self.expiration_time {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "article:expiration_time".to_string() },
                    TagProp { key: "content".to_string(), value: expiration_time.to_string() },
                ],
            });
        }
        if let Some(authors) = &self.authors {
            for author in authors {
                tags.push(TagDescriptor {
                    r#type: "meta".to_string(),
                    content: None,
                    props: vec![
                        TagProp { key: "property".to_string(), value: "article:author".to_string() },
                        TagProp { key: "content".to_string(), value: author.to_string() },
                    ],
                });
            }
        }
        if let Some(section) = &self.section {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "article:section".to_string() },
                    TagProp { key: "content".to_string(), value: section.to_string() },
                ],
            });
        }
        if let Some(tags_list) = &self.tags {
            for tag in tags_list {
                tags.push(TagDescriptor {
                    r#type: "meta".to_string(),
                    content: None,
                    props: vec![
                        TagProp { key: "property".to_string(), value: "article:tag".to_string() },
                        TagProp { key: "content".to_string(), value: tag.to_string() },
                    ],
                });
            }
        }
    }

    /// Merges `child` into `self` (mutates self).  
    /// Any `Some` field in `child` overwrites the corresponding field in `self`.  
    /// `None` fields in `child` leave `self` unchanged.  
    /// For vectors (`authors`, `tags`), `child`'s vector fully replaces `self`'s if present.
    pub fn update_from_child(&mut self, child: &Self) {
        if child.published_time.is_some() {
            self.published_time = child.published_time.clone();
        }
        if child.modified_time.is_some() {
            self.modified_time = child.modified_time.clone();
        }
        if child.expiration_time.is_some() {
            self.expiration_time = child.expiration_time.clone();
        }
        if child.authors.is_some() {
            self.authors = child.authors.clone();
        }
        if child.section.is_some() {
            self.section = child.section.clone();
        }
        if child.tags.is_some() {
            self.tags = child.tags.clone();
        }
    }
}
#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct BookMetadata {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub isbn: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub release_date: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tags: Option<Vec<Cow<'static, str>>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub authors: Option<Vec<Cow<'static, str>>>,
}

impl BookMetadata {
    pub fn render_html(&self) -> String {
        let mut html = String::new();
        meta_tags!(html,
            ("meta", "property", "book:isbn", self.isbn.as_deref()),
            ("meta", "property", "book:release_date", self.release_date.as_deref()),
        );

        if let Some(tags) = &self.tags {
            for tag in tags {
                html.push_str(&format!("<meta property=\"book:tag\" content=\"{}\" />\n", tag.as_ref()));
            }
        }

        if let Some(authors) = &self.authors {
            for author in authors {
                html.push_str(&format!("<meta property=\"book:author\" content=\"{}\" />\n", author.as_ref()));
            }
        }

        html
    }

    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        if let Some(isbn) = &self.isbn {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "book:isbn".to_string() },
                    TagProp { key: "content".to_string(), value: isbn.to_string() },
                ],
            });
        }
        if let Some(release_date) = &self.release_date {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "book:release_date".to_string() },
                    TagProp { key: "content".to_string(), value: release_date.to_string() },
                ],
            });
        }
        if let Some(tags_list) = &self.tags {
            for tag in tags_list {
                tags.push(TagDescriptor {
                    r#type: "meta".to_string(),
                    content: None,
                    props: vec![
                        TagProp { key: "property".to_string(), value: "book:tag".to_string() },
                        TagProp { key: "content".to_string(), value: tag.to_string() },
                    ],
                });
            }
        }
        if let Some(authors_list) = &self.authors {
            for author in authors_list {
                tags.push(TagDescriptor {
                    r#type: "meta".to_string(),
                    content: None,
                    props: vec![
                        TagProp { key: "property".to_string(), value: "book:author".to_string() },
                        TagProp { key: "content".to_string(), value: author.to_string() },
                    ],
                });
            }
        }
    }

    /// Merges `child` into `self` (mutates self).  
    /// Any `Some` field in `child` overwrites the corresponding field in `self`.  
    /// `None` fields in `child` leave `self` unchanged.  
    /// For vectors (`tags`, `authors`), `child`'s vector fully replaces `self`'s if present.
    pub fn update_from_child(&mut self, child: &Self) {
        if child.isbn.is_some() {
            self.isbn = child.isbn.clone();
        }
        if child.release_date.is_some() {
            self.release_date = child.release_date.clone();
        }
        if child.tags.is_some() {
            self.tags = child.tags.clone();
        }
        if child.authors.is_some() {
            self.authors = child.authors.clone();
        }
    }
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
pub struct ProfileMetadata {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub first_name: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub last_name: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub username: Option<Cow<'static, str>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub gender: Option<Cow<'static, str>>,
}

impl ProfileMetadata {
    pub fn render_html(&self) -> String {
        let mut html = String::new();
        meta_tags!(html,
            ("meta", "property", "profile:first_name", self.first_name.as_deref()),
            ("meta", "property", "profile:last_name", self.last_name.as_deref()),
            ("meta", "property", "profile:username", self.username.as_deref()),
            ("meta", "property", "profile:gender", self.gender.as_deref()),
        );
        html
    }

    pub fn collect_tags(&self, tags: &mut Vec<TagDescriptor>) {
        if let Some(first_name) = &self.first_name {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "profile:first_name".to_string() },
                    TagProp { key: "content".to_string(), value: first_name.to_string() },
                ],
            });
        }
        if let Some(last_name) = &self.last_name {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "profile:last_name".to_string() },
                    TagProp { key: "content".to_string(), value: last_name.to_string() },
                ],
            });
        }
        if let Some(username) = &self.username {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "profile:username".to_string() },
                    TagProp { key: "content".to_string(), value: username.to_string() },
                ],
            });
        }
        if let Some(gender) = &self.gender {
            tags.push(TagDescriptor {
                r#type: "meta".to_string(),
                content: None,
                props: vec![
                    TagProp { key: "property".to_string(), value: "profile:gender".to_string() },
                    TagProp { key: "content".to_string(), value: gender.to_string() },
                ],
            });
        }
    }

    /// Merges `child` into `self` (mutates self).  
    /// Any `Some` field in `child` overwrites the corresponding field in `self`.  
    /// `None` fields in `child` leave `self` unchanged.
    pub fn update_from_child(&mut self, child: &Self) {
        if child.first_name.is_some() {
            self.first_name = child.first_name.clone();
        }
        if child.last_name.is_some() {
            self.last_name = child.last_name.clone();
        }
        if child.username.is_some() {
            self.username = child.username.clone();
        }
        if child.gender.is_some() {
            self.gender = child.gender.clone();
        }
    }
}