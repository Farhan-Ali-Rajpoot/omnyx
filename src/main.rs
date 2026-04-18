use async_trait::async_trait;
use pingora::prelude::*;
use pingora::proxy::{ProxyHttp, http_proxy_service, Session};
use pingora::http::ResponseHeader;
use bytes::Bytes;

pub struct MyServer;

#[async_trait]
impl ProxyHttp for MyServer {
    type CTX = ();
    fn new_ctx(&self) -> Self::CTX {}

    async fn request_filter(&self, session: &mut Session, _ctx: &mut Self::CTX) -> Result<bool> {
        let body_str: String = format!("<html>
            <body>
                {:#?}
            </body>
        </html>", session.req_header());
        let body = Bytes::from(body_str); 

        let mut header = ResponseHeader::build(200, Some(3)).unwrap();
        header.insert_header("Content-Type", "text/json").unwrap();
        header.insert_header("Content-Length", body.len().to_string()).unwrap();

        // FIX: In 0.8.0, write_response_header takes (Header, end_of_stream)
        // We pass 'false' because we are about to send the body next.
        session.write_response_header(Box::new(header), false).await?;
        
        // Send the body and mark the stream as finished (true)
        session.write_response_body(Some(body), true).await?;

        Ok(true) 
    }

    async fn upstream_peer(&self, _session: &mut Session, _ctx: &mut Self::CTX) -> Result<Box<HttpPeer>> {
        Err(Error::create(
            ErrorType::InternalError,
            ErrorSource::Internal, 
            None,
            None
        ))
    }
}

fn main() {
    let mut my_server = Server::new(None).unwrap();
    my_server.bootstrap();

    let mut service = http_proxy_service(&my_server.configuration, MyServer);
    service.add_tcp("0.0.0.0:8080");

    my_server.add_service(service);
    my_server.run_forever();
}
