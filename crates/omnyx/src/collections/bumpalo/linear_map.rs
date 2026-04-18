use std::any::{TypeId, Any};
use std::sync::Arc;
use core::fmt;
use bumpalo::collections::Vec as BumpVec;
use bumpalo::Bump;

pub struct LinearMapBump<'a, K, V> {
    storage: BumpVec<'a, (K, V)>,
}

impl<'a, K, V> LinearMapBump<'a, K, V> {
    #[inline]
    pub fn new_in(bump: &'a Bump) -> Self {
        Self {
            storage: BumpVec::new_in(bump),
        }
    }

    #[inline]
    pub fn with_capacity_in(cap: usize, bump: &'a Bump) -> Self {
        Self {
            storage: BumpVec::with_capacity_in(cap, bump),
        }
    }

    #[inline]
    pub fn push(&mut self, key: K, value: V) {
        self.storage.push((key, value));
    }

    #[inline]
    pub fn insert(&mut self, key: K, value: V)
    where
        K: PartialEq,
    {
        for (k, v) in &mut self.storage {
            if *k == key {
                *v = value;
                return;
            }
        }
        self.storage.push((key, value));
    }

    #[inline]
    pub fn get(&self, key: &K) -> Option<&V>
    where
        K: PartialEq,
    {
        for (k, v) in &self.storage {
            if k == key {
                return Some(v);
            }
        }
        None
    }

    #[inline]
    pub fn get_mut(&mut self, key: &K) -> Option<&mut V>
    where
        K: PartialEq,
    {
        for (k, v) in &mut self.storage {
            if k == key {
                return Some(v);
            }
        }
        None
    }

    #[inline]
    pub fn iter(&self) -> impl Iterator<Item = &(K, V)> {
        self.storage.iter()
    }

    #[inline]
    pub fn len(&self) -> usize {
        self.storage.len()
    }

    #[inline]
    pub fn is_empty(&self) -> bool {
        self.storage.is_empty()
    }
}

impl<'a> LinearMapBump<'a, TypeId, Arc<dyn Any + Send + Sync>> {
    #[inline]
    pub fn get_with_type<T: Send + Sync + 'static>(&self) -> Option<Arc<T>> {
        let id = TypeId::of::<T>();
        self.get(&id).map(|val| {
            val.clone()
                .downcast::<T>()
                .expect("Downcast failed: TypeId matched but types didn't")
        })
    }
}

impl<'a, K: fmt::Debug, V: fmt::Debug> fmt::Debug for LinearMapBump<'a, K, V> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut map = f.debug_map();
        for (k, v) in &self.storage {
            map.entry(k, v);
        }
        map.finish()
    }
}