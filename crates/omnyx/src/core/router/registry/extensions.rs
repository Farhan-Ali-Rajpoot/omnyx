use std::sync::Arc;
use std::any::{TypeId, Any};
use crate::collections::LinearMap;

#[derive(Clone)]
pub struct Extensions {
    inner: LinearMap<TypeId, Arc<dyn Any + Send + Sync + 'static>>
}

impl Extensions {
    #[inline]
    pub fn new() -> Self {
        Self {
            inner: LinearMap::new(),
        }
    }

    /// Inserts a value into the map. If a value of the same type 
    /// already exists, it is overwritten and returned.
    pub fn insert<T: Send + Sync + 'static>(&mut self, val: T) -> Option<Arc<T>> {
        let type_id = TypeId::of::<T>();
        // We wrap the value in Arc immediately for type-erasure
        let arc_val = Arc::new(val);
        
        // Use your LinearMap's existing logic
        let old = self.inner.get(&type_id).cloned();
        self.inner.insert(type_id, arc_val);

        // Downcast the old value back to the original type for the user
        old.and_then(|any| any.downcast::<T>().ok())
    }

    /// Returns a reference to the value of the specified type.
    pub fn get<T: Send + Sync + 'static>(&self) -> Option<&T> {
        self.inner
            .get(&TypeId::of::<T>())
            .and_then(|arc_any| arc_any.downcast_ref::<T>())
    }

    /// Returns a cloned Arc of the value.
    /// Extremely useful for passing state into async blocks.
    pub fn get_cloned<T: Send + Sync + 'static>(&self) -> Option<Arc<T>> {
        self.inner
            .get(&TypeId::of::<T>())
            .cloned()
            .and_then(|arc_any| arc_any.downcast::<T>().ok())
    }

    /// Removes a type from the extensions.
    /// (If you haven't implemented 'remove' in LinearMap, 
    /// you might need to add it to your storage Vec).
    pub fn remove<T: Send + Sync + 'static>(&mut self) -> bool {
        // Implementation depends on your LinearMap having a remove logic.
        // If not, you can filter the storage vec.
        false 
    }

    /// Merges another set of extensions into this one.
    /// Perfect for your "Bake" phase.
    pub fn extend(&mut self, other: Extensions) {
        self.inner.extend(other.inner);
    }

    pub fn is_empty(&self) -> bool {
        self.inner.is_empty()
    }

    pub fn len(&self) -> usize {
        self.inner.len()
    }
}

impl std::fmt::Debug for Extensions {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("Extensions")
            .field("len", &self.len())
            .finish()
    }
}