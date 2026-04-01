use crate::core::router::io::Request;
use crate::core::router::io::IntoResponse;
use crate::core::router::handlers::FromContext;


#[macro_export]
macro_rules! impl_handler {
    ( $trait:ident, $method:ident; $($ty:ident),* ) => {
        #[async_trait]
        impl<F, Fut, R, $($ty,)*> $trait<($($ty,)*)> for F
        where
            F: Fn($($ty,)*) -> Fut + Clone + Send + Sync + 'static,
            Fut: Future<Output = R> + Send,
            R: $crate::core::router::io::IntoResponse + Send + 'static,
            $( $ty: $crate::core::router::handlers::FromContext + Send, )* {
            async fn $method(self, request: $crate::core::router::io::Request) -> $crate::core::router::io::Response {
                let req = request;

                $(
                    let $ty = <$ty as $crate::core::router::handlers::FromContext>::from_context(req.clone()).await;
                )*

                let result = (self)($($ty,)*).await;

                $crate::core::router::io::IntoResponse::into_response(result)
            }
        }
    };
}

// impl_handler!(PageHandler, call; );
// impl_handler!(PageHandler, call; T1, T2, T3);