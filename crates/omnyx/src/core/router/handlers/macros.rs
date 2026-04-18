#[macro_export]
macro_rules! impl_handler {
    ( $trait:ident, $method:ident; $($ty:ident),* ) => {
        impl<F, Fut, R, $($ty,)*> $trait<($($ty,)*)> for F
        where
            F: Fn($($ty,)*) -> Fut + Clone + std::fmt::Debug + Send + Sync + 'static,
            Fut: std::future::Future<Output = R> + Send + 'static,
            R: $crate::core::router::io::IntoResponse + Send,
            $( $ty: $crate::core::router::handlers::FromContext + Send, )* {
            fn $method(self, request: $crate::core::router::io::Request) 
                -> std::pin::Pin<std::boxed::Box<dyn std::future::Future<Output = $crate::core::router::io::Response> + Send>> 
            {
                std::boxed::Box::pin(async move {
                    $(
                        let $ty = <$ty as $crate::core::router::handlers::FromContext>::from_request(&request).await;
                    )*

                    let result = (self)($($ty,)*).await;
                    
                    result.into_response()
                })
            }
        }
    };
}