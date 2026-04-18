use std::any::{TypeId, Any};
use std::sync::Arc;
use std::sync::atomic::{AtomicBool, Ordering};
use parking_lot::{RwLock, RwLockReadGuard, RwLockWriteGuard};
use http::{HeaderMap, Method, Uri};

use crate::core::router::handlers::LayoutProps;
use crate::core::router::logic::RouteMetadata;
use crate::collections::LinearMap; 

#[derive(Debug, Clone)]
pub struct Request {
    pub(crate) inner: Arc<RequestInner>,
}

#[derive(Debug)]
pub struct RequestInner {
    // Thread-safe state tracking
    pub(crate) is_dynamic: AtomicBool,
    pub(crate) is_modified: AtomicBool,
    
    // Read-only identifiers (accessible directly via Deref)
    pub id: String,
    pub method: Method,
    pub uri: Uri,
    pub layout_props: LayoutProps,

    // Thread-safe mutable jars using owned Strings
    params: RwLock<LinearMap<String, String>>,
    query: RwLock<LinearMap<String, String>>,
    headers: RwLock<HeaderMap>,
    cookies: RwLock<cookie::CookieJar>,
    extensions: RwLock<LinearMap<TypeId, Arc<dyn Any + Send + Sync>>>,
    metadata: RwLock<RouteMetadata>,
}

// Automatically forwards `req.method` to `req.inner.method`
impl std::ops::Deref for Request {
    type Target = RequestInner;

    fn deref(&self) -> &Self::Target {
        &self.inner
    }
}

impl Request {
    pub(crate) fn new(
        header: &pingora::http::RequestHeader,
        params_iter: matchit::Params<'_, '_>,
        request_id: &str,
        owned_metadata: RouteMetadata,
        owned_layout_props: LayoutProps,
        initial_extensions: LinearMap<TypeId, Arc<dyn Any + Send + Sync>>,
    ) -> Self {
        let mut query_map = LinearMap::new();
        let mut param_map = LinearMap::new();
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

        // 3. Parse Route Params into owned Strings
        for (k, v) in params_iter.iter() {
            param_map.insert(k.to_string(), v.to_string());
        }

        let inner = RequestInner {
            is_dynamic: AtomicBool::new(false),
            is_modified: AtomicBool::new(false),
            id: request_id.to_string(),
            method: header.method.clone(),
            uri: header.uri.clone(),
            layout_props: owned_layout_props,
            
            // Wrap in RwLocks for shared async mutation
            params: RwLock::new(param_map),
            query: RwLock::new(query_map),
            headers: RwLock::new(header.headers.clone()),
            cookies: RwLock::new(cookies),
            extensions: RwLock::new(initial_extensions),
            metadata: RwLock::new(owned_metadata),
        };

        Self {
            inner: Arc::new(inner)
        }
    }

    #[inline]
    fn mark_dynamic(&self) {
        self.inner.is_dynamic.store(true, Ordering::Relaxed);
    }

    #[inline]
    fn mark_modified(&self) {
        self.inner.is_modified.store(true, Ordering::Relaxed);
        self.inner.is_dynamic.store(true, Ordering::Relaxed);
    }

    // --- Public API ---

    pub fn cookies(&self) -> RwLockReadGuard<'_, cookie::CookieJar> {
        self.mark_dynamic();
        self.inner.cookies.read()
    }

    pub fn cookies_mut(&self) -> RwLockWriteGuard<'_, cookie::CookieJar> {
        self.mark_modified();
        self.inner.cookies.write()
    }

    pub fn headers(&self) -> RwLockReadGuard<'_, HeaderMap> {
        self.inner.headers.read()
    }

    pub fn headers_mut(&self) -> RwLockWriteGuard<'_, HeaderMap> {
        self.mark_modified();
        self.inner.headers.write()
    }

    pub fn query(&self) -> RwLockReadGuard<'_, LinearMap<String, String>> {
        self.mark_dynamic();
        self.inner.query.read()
    }
    
    // Note: Returns Option<String> instead of Option<&str> because 
    // the RwLockReadGuard drops at the end of the function.
    pub fn param(&self, key: &str) -> Option<String> {
        self.mark_dynamic();
        self.inner.params.read().get(key).cloned()
    }

    pub fn extensions(&self) -> RwLockReadGuard<'_, LinearMap<TypeId, Arc<dyn Any + Send + Sync>>> {
        self.mark_dynamic();
        self.inner.extensions.read()
    }

    pub fn extensions_mut(&self) -> RwLockWriteGuard<'_, LinearMap<TypeId, Arc<dyn Any + Send + Sync>>> {
        self.mark_dynamic(); 
        self.inner.extensions.write()
    }

    pub fn metadata(&self) -> RwLockReadGuard<'_, RouteMetadata> {
        self.inner.metadata.read()
    }

    pub fn metadata_mut(&self) -> RwLockWriteGuard<'_, RouteMetadata> {
        self.mark_modified();
        self.inner.metadata.write()
    }
}