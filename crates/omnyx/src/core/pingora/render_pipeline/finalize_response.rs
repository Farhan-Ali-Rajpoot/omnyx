


use pingora::http::ResponseHeader;
use pingora::proxy::Session;

use crate::core::{Body, DeferredTask, Response};
use crate::core::router::io::Request;
use crate::core::pingora::PingoraAdapter;


impl<T> PingoraAdapter<T> where T: Send + Sync + 'static { 
   pub async fn finalize_streaming_response(
        &self,
        session: &mut Session,
        req: &Request,
        response: Response,
        mut tasks: Vec<DeferredTask>,
    ) -> pingora::Result<bool> {
        let status = req.status().as_u16();
        let mut header = ResponseHeader::build(status, None).unwrap();

        // Headers from request
        let headers_copy: Vec<(String, String)> = req
            .headers_raw()
            .iter()
            .filter_map(|(name, value)| value.to_str().ok().map(|v| (name.as_str().to_string(), v.to_string())))
            .collect();
        for (name, value) in headers_copy {
            if let Ok(hv) = http::HeaderValue::from_str(&value) {
                header.insert_header(name, hv).unwrap();
            }
        }

        // Cookies from request
        for cookie in req.cookies_raw().iter() {
            header.append_header("Set-Cookie", cookie.to_string()).unwrap();
        }

        let (body_bytes, content_type) = response.body.into_bytes_and_content_type();
        header.insert_header("Content-Type", content_type).unwrap();
        header.remove_header("Content-Length");

        session.write_response_header(Box::new(header), false).await?;
        session.write_response_body(Some(body_bytes), tasks.is_empty()).await?;

        for task in tasks.drain(..).rev() {
            let res = task.task.await;
            let html = if matches!(res.body, Body::Err(_)) {
                if let Some(err_ctr) = &task.error_controller {
                    let err_res = err_ctr.call_erased(req.clone()).await;
                    if !matches!(err_res.body, Body::Err(_)) {
                        err_res.body.to_string()
                    } else {
                        "Internal Server Error".to_string()
                    }
                } else {
                    "Internal Server Error".to_string()
                }
            } else {
                res.body.to_string()
            };
            let chunk = format!(
                r#"<template id="tpl-omnyx-{}">{}</template><script>(function(id){{var p=document.getElementById(id),t=document.getElementById("tpl-"+id);p&&t&&p.replaceWith(t.content.cloneNode(!0));}})("omnyx-{}");</script>"#,
                task.id, html, task.id
            );
            session.write_response_body(Some(bytes::Bytes::from(chunk)), false).await?;
        }

        session.write_response_body(None, true).await?;
        Ok(true)
    }
}


