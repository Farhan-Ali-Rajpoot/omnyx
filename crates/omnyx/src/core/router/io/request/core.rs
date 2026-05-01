use std::sync::Arc;
use std::sync::atomic::{AtomicBool, Ordering};
use parking_lot::{RwLock, RwLockReadGuard, RwLockWriteGuard};
use http::{HeaderMap, Method, Uri};

use crate::core::Extensions;
use crate::core::router::handlers::LayoutProps;
use crate::core::router::logic::RouteMetadata;
use crate::collections::LinearMap; 

#[derive(Debug, Clone)]
pub struct Request {
    pub(crate) inner: Arc<RequestInner>,
}

// Request Inner to prevent heayy clone of Request Across multiple handlers
// Keep data of a request once in memory (Saves from merging multipl modified request to get final request to generate Response)
#[derive(Debug)]
pub struct RequestInner {
    // Thread-safe state tracking
    pub(crate) is_dynamic: AtomicBool,
    pub(crate) is_modified: AtomicBool,
    
    // Read-only identifiers (accessible directly via Deref)
    pub(crate) id: String,
    pub(crate) method: Method,
    pub(crate) uri: Uri,
    pub(crate) layout_props: RwLock<LayoutProps>,
    pub(crate) state: Arc<dyn std::any::Any + Send + Sync + 'static>,

    // Thread-safe mutable jars using owned Strings
    pub(crate) params: RwLock<LinearMap<String, Vec<String>>>,
    pub(crate) query: RwLock<LinearMap<String, String>>,

    // Response 
    pub(crate) status: RwLock<http::StatusCode>,
    pub(crate) headers: RwLock<HeaderMap>,
    pub(crate) cookies: RwLock<cookie::CookieJar>,

    pub(crate) extensions: RwLock<crate::core::Extensions>,
    pub(crate) metadata: RwLock<RouteMetadata>,
}

// Automatically forwards `req.method` to `req.inner.method`
impl std::ops::Deref for Request {
    type Target = RequestInner;

    fn deref(&self) -> &Self::Target {
        &self.inner
    }
}

impl Request
{
    // Create Request
    pub(crate) fn new(
        state: Arc<dyn std::any::Any + Send + Sync + 'static>,
        header: &pingora::http::RequestHeader,
        params: LinearMap<String, Vec<String>>,
        request_id: &str,
        owned_metadata: RouteMetadata,
    ) -> Self {
        let mut query_map = LinearMap::new();
        let mut cookies = cookie::CookieJar::new();

        // 1. Parse Cookies
        if let Some(cookie_header) = header.headers.get("Cookie") {
            if let Ok(cookie_str) = cookie_header.to_str() {
                for c in cookie::Cookie::split_parse(cookie_str).flatten() {
                    cookies.add_original(c.into_owned());
                }
            }
        }
        
        // 2. Parse Query parameters into owned Strings
        if let Some(q) = header.uri.query() {
            for pair in q.split('&') {
                let (k, v) = pair.split_once('=').unwrap_or((pair, ""));
                query_map.insert(k.to_string(), v.to_string());
            }
        }

        let inner = RequestInner {
            is_dynamic: AtomicBool::new(false),
            is_modified: AtomicBool::new(false),
            id: request_id.to_string(),
            method: header.method.clone(),
            uri: header.uri.clone(),
            state: state,

            // Wrap in RwLocks for shared async mutation
            status: RwLock::new(http::StatusCode::OK),
            params: RwLock::new(params),
            query: RwLock::new(query_map),
            headers: RwLock::new(header.headers.clone()),
            cookies: RwLock::new(cookies),
            extensions: RwLock::new(Extensions::new()),
            metadata: RwLock::new(owned_metadata),
            layout_props: RwLock::new(LayoutProps::default()),
        };

        Self {
            inner: Arc::new(inner)
        }
    }

    // --- Contructional Api ---

    // Marck Dynamic to a handler (Layout, Page)
    // Used to track that is a handler request specific or do it reads request
    // Used to pre generate html at startup (if handler is not dynamic)
    #[inline]
    pub(crate) fn mark_dynamic(&self) {
        self.inner.is_dynamic.store(true, Ordering::Relaxed);
    }

    // Mark Modified to a handler
    // Used to track that do a handler modifies request (Such as Extensions, Metadata ..etc)
    // if fields like Metadata is modified we will update to fronted via our client side Route
    #[inline]
    pub(crate) fn mark_modified(&self) {
        self.inner.is_modified.store(true, Ordering::Relaxed);
        self.inner.is_dynamic.store(true, Ordering::Relaxed);
    }

    // Set Metadata, so we can create request even having metadata (With Metadata:::default())
    pub(crate) fn set_metadata(&mut self, metadata: RouteMetadata) {
        *self.metadata_mut() = metadata;
    }

    // Set Extensions, so we can create request even before having Extensions (With Extensions::defualt)
    pub(crate) fn set_extensions(&mut self, extensions: crate::core::Extensions) {
        *self.extensions_raw_mut() = extensions;
    }

    // Set Layout Props after creating the Request
    pub(crate) fn set_layout_props(&mut self, layout_props: LayoutProps) {
        *self.inner.layout_props.write() = layout_props;
    }

    // --- Public API ---

    // Get status
    pub fn status(&self) -> RwLockReadGuard<'_, http::StatusCode> {
        self.mark_dynamic();
        self.inner.status.read()
    }

    // Set status code
    pub fn set_status(&self, code: http::StatusCode) {
        *self.inner.status.write() = code;
    }

    // Get request method
    #[inline]
    pub fn method(&self) -> &http::Method { 
        self.mark_dynamic();
        &self.inner.method
     }
    
    // Get URI struct
    #[inline]
    pub fn uri(&self) -> &http::Uri { 
        self.mark_dynamic();
        &self.inner.uri
    }
    
    // Get Request id
    #[inline]
    pub fn request_id(&self) -> &str { 
        self.mark_dynamic();
        &self.inner.id
    }

    // -- Cookies --

    // Get Cookie Value as String
    #[inline]
    pub fn cookie(&self, name: &str) -> Option<String> {
        self.mark_dynamic();
        self.inner.cookies.read()
            .get(name)
            .map(|c| c.value().to_string())
    }

    // Get Raw Cookies
    #[inline]
    pub fn cookies_raw(&self) -> RwLockReadGuard<'_, cookie::CookieJar> {
        self.mark_dynamic();
        self.inner.cookies.read()
    }

    /// Get raw write guard for Cookies.
    #[inline]
    pub fn cookies_raw_mut(&self) -> RwLockWriteGuard<'_, cookie::CookieJar> {
        self.mark_modified();
        self.inner.cookies.write()
    }

    // Get write guard to Cookies
    #[inline]
    pub fn cookies_mut(&self) -> RwLockWriteGuard<'_, cookie::CookieJar> {
        self.mark_modified();
        self.inner.cookies.write()
    }

    // Check Cookie
    #[inline]
    pub fn has_cookie(&self, name: &str) -> bool {
        self.mark_dynamic();
        self.inner.cookies.read().get(name).is_some()
    }

    // Set a cookie. Accepts owned `Cookie<'static>` to avoid lifetime issues.
    pub fn set_cookie(&self, cookie: cookie::Cookie<'static>) {
        self.mark_modified();
        self.inner.cookies.write().add(cookie);
    }

    // Remove a cookie from the jar (client-side removal requires `delete_cookie`).
    pub fn remove_cookie(&self, name: &str) -> bool {
        self.mark_modified();
        
        // Create a temporary cookie with just the name
        let cookie_to_remove = cookie::Cookie::from(name.to_string());
        self.inner.cookies.write().remove(cookie_to_remove);
        
        true
    }

    /// Delete a cookie (sets expiry in past for client removal).
    pub fn delete_cookie(&self, name: &str) {
        self.mark_modified();
        let mut jar = self.inner.cookies.write();
        if let Some(mut cookie) = jar.get(name).cloned() {
            cookie.make_removal();
            jar.add(cookie);
        }
    }

    // -- Headers --

    // Get Header
    #[inline]
    pub fn header(&self, name: &str) -> Option<String> {
        self.mark_dynamic();
        self.inner.headers.read()
            .get(name)
            .and_then(|v| v.to_str().ok())
            .map(|s| s.to_string())
    }

    // Get Read Guard to Headers
    pub fn headers_raw(&self) -> RwLockReadGuard<'_, http::HeaderMap> {
        self.mark_dynamic();
        self.inner.headers.read()
    }

    /// Get write guard for headers. Use with caution.
    #[inline]
    pub fn headers_raw_mut(&self) -> RwLockWriteGuard<'_, http::HeaderMap> {
        self.mark_modified();
        self.inner.headers.write()
    }

    // Set Header
    pub fn set_header(&self, name: &str, value: impl TryInto<http::HeaderValue>) -> Result<(), HeaderError> {
        self.mark_dynamic();
        let value = value.try_into().map_err(|_| HeaderError::InvalidValue)?;
        let name = http::HeaderName::from_bytes(name.as_bytes())
            .map_err(|_| HeaderError::InvalidName)?;
        
        self.mark_modified();
        self.inner.headers.write().insert(name, value);
        Ok(())
    }

    /// Remove all headers with the given name.
    pub fn remove_header(&self, name: &str) -> bool {
        self.mark_dynamic();
        let name = match http::HeaderName::from_bytes(name.as_bytes()) {
            Ok(n) => n,
            Err(_) => return false,
        };
        self.mark_modified();
        self.inner.headers.write().remove(name).is_some()
    }


    // Append Header
    pub fn append_header(&self, name: &str, value: impl TryInto<http::HeaderValue>) -> Result<(), HeaderError> {
        self.mark_dynamic();
        let value = value.try_into().map_err(|_| HeaderError::InvalidValue)?;
        let name = http::HeaderName::from_bytes(name.as_bytes())
            .map_err(|_| HeaderError::InvalidName)?;
        
        self.mark_modified();
        self.inner.headers.write().append(name, value);
        Ok(())
    }

    // Check Header
    #[inline]
    pub fn has_header(&self, name: &str) -> bool {
        self.mark_dynamic();
        self.inner.headers.read().contains_key(name)
    }

    // Get all headers
    #[inline]
    pub fn header_all(&self, name: &str) -> Vec<String> {
        self.mark_dynamic();
        self.inner.headers.read()
            .get_all(name)
            .iter()
            .filter_map(|v| v.to_str().ok().map(|s| s.to_string()))
            .collect()
    }

    // Get Read guard to Queries 
    #[inline]
    pub fn queries(&self) -> RwLockReadGuard<'_, LinearMap<String, String>> {
        self.mark_dynamic();
        self.inner.query.read()
    }

    // Get query (Owned)
    #[inline]
    pub fn query(&self, key: &str) -> Option<String> {
        self.mark_dynamic();
        self.inner.query.read().get(key).cloned()
    }

    // Set Query (Mostly won't be used)
    pub fn set_query(&self, key: &str, value: String) {
        self.mark_dynamic();
        self.mark_modified();
        self.inner.query.write().insert(key.to_string(), value);
    }

    // Check Query
    #[inline]
    pub fn has_query(&self, key: &str) -> bool {
        self.mark_dynamic();
        self.inner.query.read().contains_key(key)
    }

    // -- Params --

    // Get Param
    #[inline]
    pub fn param(&self, key: &str) -> Option<Vec<String>> {
        self.mark_dynamic();
        self.inner.params.read().get(key).cloned()
    }

    // Set Param
    pub fn set_param(&self, key: &str, value: Vec<String>) {
        self.mark_dynamic();
        self.mark_modified();
        self.inner.params.write().insert(key.to_string(), value);
    }

    // Get read guard to Params
    #[inline]
    pub fn params_raw(&self) -> RwLockReadGuard<'_, LinearMap<String, Vec<String>>> {
        self.mark_dynamic();
        self.inner.params.read()
    }

    /// Get raw write guard for route params.
    #[inline]
    pub fn params_raw_mut(&self) -> RwLockWriteGuard<'_, LinearMap<String, Vec<String>>> {
        self.mark_modified();
        self.inner.params.write()
    }

    // Check Params
    #[inline]
    pub fn has_param(&self, key: &str) -> bool {
        self.mark_dynamic();
        self.inner.params.read().contains_key(key)
    }

    // -- Extensions --

    // Get Read guuard to Extensions
    pub fn extensions_raw(&self) -> RwLockReadGuard<'_, crate::core::Extensions> {
        self.mark_dynamic();
        self.inner.extensions.read()
    }

    // Get write guard to Extensions
    pub fn extensions_raw_mut(&self) -> RwLockWriteGuard<'_, crate::core::Extensions> {
        self.mark_dynamic(); 
        self.inner.extensions.write()
    }

    // Get Read guard Metadata
    pub fn metadata(&self) -> RwLockReadGuard<'_, RouteMetadata> {
        self.mark_dynamic();
        self.inner.metadata.read()
    }

    // Get write guard to metadata
    pub fn metadata_mut(&self) -> RwLockWriteGuard<'_, RouteMetadata> {
        self.mark_dynamic();
        self.mark_modified();
        self.inner.metadata.write()
    }
}


// Header Error for header opertion failures for (Request struct Use only)
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum HeaderError {
    InvalidName,
    InvalidValue,
}

impl std::fmt::Display for HeaderError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            HeaderError::InvalidName => write!(f, "invalid header name"),
            HeaderError::InvalidValue => write!(f, "invalid header value"),
        }
    }
}

impl std::error::Error for HeaderError {}