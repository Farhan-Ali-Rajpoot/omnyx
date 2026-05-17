use pingora::http::ResponseHeader;
use pingora::proxy::Session;

use crate::core::router::io::Request;
use crate::core::{Body, DeferredTask, PingoraAdapter, Response};

impl<T> PingoraAdapter<T>
where
    T: Send + Sync + 'static
{
    pub async fn finalize_response(
        &self,
        session: &mut Session,
        req: &Request,
        response: Option<Response>,
        tasks: Option<Vec<DeferredTask>>,
    ) -> pingora::Result<bool> {
        let mut header = ResponseHeader::build(req.status().as_u16(), None).unwrap();

        // Headers from request
        let headers_copy: Vec<(String, String)> = req
            .headers_raw()
            .iter()
            .filter_map(|(name, value)| {
                value
                    .to_str()
                    .ok()
                    .map(|v| (name.as_str().to_string(), v.to_string()))
            })
            .collect();
        for (name, value) in headers_copy {
            if let Ok(hv) = http::HeaderValue::from_str(&value) {
                header.insert_header(name, hv).unwrap();
            }
        }

        // Cookies from request
        for cookie in req.cookies_raw().iter() {
            header
                .append_header("Set-Cookie", cookie.to_string())
                .unwrap();
        }

        // Body
        let body_bytes = if let Some(response) = response {
            let (bytes, content_type) = response.body.into_bytes_and_content_type();
            header.insert_header("Content-Type", content_type).unwrap();
            header.remove_header("Content-Length");
            Some(bytes)
        }else {
            None
        };

        session
            .write_response_header(Box::new(header), false)
            .await?;
        session
            .write_response_body(body_bytes, matches!(tasks, None))
            .await?;

        // Streaming tasks
        if let Some(mut tasks) = tasks {
            for task in tasks.drain(..).rev() {
                let res = task.task.await;
                let html = if matches!(res.body, Body::Err(_)) {
                    // Error handling
                    if let Some(err_ctr) = &task.error_controller {
                        let err_res = err_ctr.call_erased(req.clone()).await;
                        if !matches!(err_res.body, Body::Err(_)) {
                            err_res.body.to_string()
                        } else {
                            format!("Error occurd in Error Handler: {}", err_res.body.to_string())
                        }
                    } else {
                        format!("Error occured: {} (no error handler is defined)", res.body.to_string())
                    }
                } else {
                    // Success
                    res.body.to_string()
                };
                let chunk = format!(
                    r#"<template id="tpl-{}">{}</template><script>(function(id){{var p=document.getElementById(id),t=document.getElementById("tpl-"+id);p&&t&&p.replaceWith(t.content.cloneNode(!0));console.log("Replacing", id);}})("{}");</script>"#,
                    task.id, html, task.id
                );
                session
                    .write_response_body(Some(bytes::Bytes::from(chunk)), false)
                    .await?;
            }
        }
        // Closing connection
        session.write_response_body(None, true).await?;
        Ok(true)
    }
}
