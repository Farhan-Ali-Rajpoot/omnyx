


use crate::core::router::io::Request;
use crate::core::pingora::PingoraAdapter;
use crate::error::RouteError;


impl<T> PingoraAdapter<T> where T: Send + Sync + 'static { 
    pub async fn run_middlewares(&self, req: &mut Request) -> Result<(), &str> {
        Ok(())
    }
}
