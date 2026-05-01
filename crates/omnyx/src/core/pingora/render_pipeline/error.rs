


use pingora::http::ResponseHeader;
use pingora::proxy::Session;

use crate::core::router::io::Request;
use crate::core::pingora::PingoraAdapter;


impl<T> PingoraAdapter<T> where T: Send + Sync + 'static { 
    pub async fn handle_error_response(&self, session: &mut Session) -> pingora::Result<bool> {

        let mut header = ResponseHeader::build(404, None).unwrap();
        header.insert_header("Content-Type", "text/html").unwrap();
        
        session.write_response_header(Box::new(header), false).await?;
        session.write_response_body(Some(bytes::Bytes::from(self.fallbacks.error_html)), true).await?;
        Ok(true)
    }

    pub async fn send_response(
        &self,
        session: &mut Session,
        status: u16,
        body: impl Into<Option<bytes::Bytes>>,
        content_type: impl Into<Option<String>>,
    ) -> pingora::Result<bool> {
        let body_bytes = body.into().unwrap_or_else(|| bytes::Bytes::new());
        let content_type = content_type.into().unwrap_or_else(|| "text/html".to_string());

        let mut header = ResponseHeader::build(status, None).unwrap();
        header.insert_header("Content-Type", &content_type).unwrap();
        if !body_bytes.is_empty() {
            header.insert_header("Content-Length", body_bytes.len().to_string()).unwrap();
        }
        session.write_response_header(Box::new(header), false).await?;
        if !body_bytes.is_empty() {
            session.write_response_body(Some(body_bytes), true).await?;
        } else {
            session.write_response_body(None, true).await?;
        }
        Ok(true)
    }
}
