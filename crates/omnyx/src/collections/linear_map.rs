use core::fmt;
use std::borrow::Borrow;

#[derive(Default)]
pub struct LinearMap<K, V> {
    storage: Vec<(K, V)>,
}

impl<K, V> LinearMap<K, V> {
    #[inline]
    pub fn new() -> Self {
        Self { storage: Vec::new() }
    }

    #[inline]
    pub fn with_capacity(cap: usize) -> Self {
        Self { storage: Vec::with_capacity(cap) }
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
            if k == &key { // Simplified comparison
                *v = value;
                return;
            }
        }
        self.storage.push((key, value));
    }

    #[inline]
    pub fn get<Q>(&self, key: &Q) -> Option<&V>
    where
        K: Borrow<Q>,
        Q: PartialEq + ?Sized,
    {
        // FIX: Explicitly call Borrow::<Q>::borrow(k) to resolve ambiguity
        for (k, v) in &self.storage {
            if k.borrow() == key {
                return Some(v);
            }
        }
        None
    }

    #[inline]
    pub fn get_mut<Q>(&mut self, key: &Q) -> Option<&mut V>
    where
        K: Borrow<Q>,
        Q: PartialEq + ?Sized,
    {
        for (k, v) in &mut self.storage {
            let k_ref: &K = k; 
            if k_ref.borrow() == key {
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

impl<K, V> Clone for LinearMap<K, V>
where
    K: Clone,
    V: Clone,
{
    fn clone(&self) -> Self {
        Self {
            storage: self.storage.clone(),
        }
    }
}

impl<K, V> IntoIterator for LinearMap<K, V> {
    type Item = (K, V);
    type IntoIter = std::vec::IntoIter<Self::Item>;

    fn into_iter(self) -> Self::IntoIter {
        self.storage.into_iter()
    }
}

impl<'a, K, V> IntoIterator for &'a LinearMap<K, V> {
    type Item = &'a (K, V);
    type IntoIter = std::slice::Iter<'a, (K, V)>;

    fn into_iter(self) -> Self::IntoIter {
        self.storage.iter()
    }
}

impl<K, V> LinearMap<K, V> {
    /// Extends the map with another collection of key-value pairs.
    /// Standard "Last-One-Wins" behavior for configuration merging.
    pub fn extend<I>(&mut self, iter: I)
    where
        I: IntoIterator<Item = (K, V)>,
        K: PartialEq,
    {
        let iterator = iter.into_iter();
        
        // Pre-reserve capacity to prevent multiple re-allocations
        let (lower, _) = iterator.size_hint();
        self.storage.reserve(lower);

        for (key, value) in iterator {
            self.insert(key, value);
        }
    }
}

impl<K: fmt::Debug, V: fmt::Debug> fmt::Debug for LinearMap<K, V> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut map = f.debug_map();
        for (k, v) in &self.storage {
            map.entry(k, v);
        }
        map.finish()
    }
}

