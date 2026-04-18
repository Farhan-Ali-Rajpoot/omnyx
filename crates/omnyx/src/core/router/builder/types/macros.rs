#[macro_export]
macro_rules! apply_shortcut_method_function {
    ($trait:ident { $($name:ident => $verb:expr),* $(,)? } ) => {
        $(
            #[inline]
            pub fn $name<H: $trait + 'static>(self, handler: H) -> Self {
                self.method($verb, handler)
            }
        )*
    };
}
