use std::any::{Any, TypeId};
use std::collections::HashMap;
use std::sync::Arc;

#[derive(Clone, Default)]
pub struct BakeExtensions {
    map: HashMap<TypeId, Arc<dyn Any + Send + Sync>>,
}

impl BakeExtensions {
    pub fn insert<T: Send + Sync + 'static>(&mut self, val: T) {
        self.map.insert(TypeId::of::<T>(), Arc::new(val));
    }

    pub fn extend(&mut self, other: &Self) {
        for (k, v) in &other.map {
            self.map.insert(*k, Arc::clone(v));
        }
    }

    pub fn into_http_extensions(self) -> http::Extensions {
        let mut ext = http::Extensions::new();
        for (_, val) in self.map {
            ext.insert(val);
        }
        ext
    }
}