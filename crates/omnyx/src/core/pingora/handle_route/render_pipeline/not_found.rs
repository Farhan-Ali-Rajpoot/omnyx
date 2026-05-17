


use pingora::http::ResponseHeader;
use pingora::proxy::Session;

use crate::core::router::io::Request;
use crate::core::pingora::PingoraAdapter;


impl<T> PingoraAdapter<T> where T: Send + Sync + 'static { 
    pub async fn handle_not_found_response(&self, session: &mut Session) -> pingora::Result<bool> {

        let mut header = ResponseHeader::build(404, None).unwrap();
        header.insert_header("Content-Type", "text/html").unwrap();
        
        session.write_response_header(Box::new(header), false).await?;
        session.write_response_body(Some(bytes::Bytes::from(self.fallbacks.not_found_html)), true).await?;
        
        Ok(true)
    }
}
