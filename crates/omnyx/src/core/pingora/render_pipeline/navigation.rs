// use futures::FutureExt;
// use pingora::proxy::Session;
// use std::{sync::{Arc, atomic::{AtomicUsize, Ordering}}};

// use crate::{collections::LinearMap, core::{Body, DeferredTask, ErasedErrorComponent, ErasedLoaderComponent, LayoutProps, MainComponent, PageEndpoint, ParallelRouteMatcher, RenderedParallelRoute, Request, Response, SlotOutcome, pingora::PingoraAdapter}};



// static SLOT_COUNTER: AtomicUsize = AtomicUsize::new(1);

// impl<T> PingoraAdapter<T>
// where
//     T: Send + Sync + 'static,
// {
//     pub async fn render_page_navigation(
//         &self,
//         session: &mut Session,
//         req: &mut Request,
//         page: &PageEndpoint,
//     ) -> pingora::Result<bool> {
//         let mut tasks = Vec::new();
//         let mut node_ids = Vec::new();
//         let nodes = {
//             if let Some(nodes_str) = req.header("X-OMNYX-NODES") {
//                 Vec::from(nodes_str)
//             } else {
//                 Vec::new()
//             }
//         };

//         let page_ctr = page
//             .controllers
//             .get(req.method())
//             .ok_or_else(|| pingora::Error::new_str("405"))?;

//         // 1. Render leaf page and wrap with its node container
//         let mut current_outcome = self
//             .execute_slot_nav(
//                 req,
//                 &Some(MainComponent::Page(Arc::clone(page_ctr))),
//                 &page.loader_controller,
//                 &page.error_controller,
//                 &mut tasks,
//             )
//             .await;

//         let mut current_html = self.unwrap_outcome(&current_outcome);
//         if current_outcome != SlotOutcome::BubbleUpError {
//             node_ids.push(page.node_id.clone());
//             current_html = format!(
//                 "<omnyx-container data-omnyx-id=\"{}\" style=\"display: contents;\">{}</omnyx-container>",
//                 page.node_id, current_html
//             );
//             current_outcome = SlotOutcome::Ready(current_html);
//         }

//         // 2. Walk through layouts (innermost to outermost)
//         for layout in &page.layouts {
//             if current_outcome == SlotOutcome::BubbleUpError {
//                 current_outcome = self.try_error_boundary(req, &layout.error_controller).await;
//                 continue;
//             }

//             let children_html = self.unwrap_outcome(&current_outcome);

//             // Compute remaining path for parallel slots
//             let full_path = req.uri().path().to_string();
//             let remaining = full_path
//                 .strip_prefix(&layout.base_path)
//                 .unwrap_or(&full_path)
//                 .to_string();
//             let remaining = if remaining.is_empty() {
//                 "/".to_string()
//             } else {
//                 remaining
//             };

//             // Render parallel slots
//             let mut parallel_map = LinearMap::new();
//             for (slot_name, slot_matcher_arc) in &layout.parallel_routers {
//                 let (slot_outcome, params) = self
//                     .render_parallel_slot_nav(
//                         req,
//                         slot_matcher_arc.as_ref(),
//                         slot_name,
//                         &remaining,
//                         &mut tasks,
//                         &layout.node_id,
//                         &mut node_ids,
//                     )
//                     .await;
//                 let slot_html = self.unwrap_outcome(&slot_outcome);
//                 parallel_map.insert(
//                     slot_name.clone(),
//                     RenderedParallelRoute {
//                         html: slot_html,
//                         params,
//                     },
//                 );
//             }

//             req.set_layout_props(LayoutProps {
//                 children: children_html,
//                 parallel_routes: parallel_map,
//             });

//             // Render the layout itself
//             current_outcome = self
//                 .execute_slot_nav(
//                     req,
//                     &layout
//                         .controller
//                         .as_ref()
//                         .map(|c| MainComponent::Layout(Arc::clone(c))),
//                     &layout.loader_controller,
//                     &layout.error_controller,
//                     &mut tasks,
//                 )
//                 .await;

//             // Wrap the layout output with its own container
//             let layout_html = self.unwrap_outcome(&current_outcome);
//             if current_outcome != SlotOutcome::BubbleUpError {
//                 node_ids.push(layout.node_id.clone());
//                 let wrapped_layout = format!(
//                     "<omnyx-container data-omnyx-id=\"{}\" style=\"display: contents;\">{}</omnyx-container>",
//                     layout.node_id, layout_html
//                 );
//                 current_outcome = SlotOutcome::Ready(wrapped_layout);
//             }
//         }

//         // Final response after all layouts
//         if current_outcome == SlotOutcome::BubbleUpError {
//             let res = Response::html(self.fallbacks.error_html);
//             return self
//                 .finalize_streaming_response(session, req, Some(res), Some(tasks))
//                 .await;
//         }

//         let final_html = self.unwrap_outcome(&current_outcome);

//         // Inject the node IDs script for the initial page load (not for navigation)
//         let node_ids_json = serde_json::to_string(&node_ids).unwrap();
//         let script = format!("<script>window.__OMNYX_NODES = {};</script>", node_ids_json);
//         // Insert script before closing </body>
//         let final_html_with_script =
//             final_html.replacen("</body>", &format!("{}</body>", script), 1);

//         let res = Response::html(final_html_with_script);
//         self.finalize_streaming_response(session, req, Some(res), Some(tasks))
//             .await
//     }

//     async fn render_parallel_slot_nav(
//         &self,
//         req: &mut Request,
//         matcher: &ParallelRouteMatcher,
//         slot_name: &str,
//         relative_path: &str,
//         tasks: &mut Vec<DeferredTask>,
//         parent_layout_id: &str,
//         node_ids: &mut Vec<String>,
//     ) -> (SlotOutcome, LinearMap<String, Vec<String>>) {
//         let lookup_path = if relative_path.is_empty() {
//             "/".to_string()
//         } else {
//             format!("/{}", relative_path.trim_start_matches('/'))
//         };
//         let matched = match matcher.lookup(&lookup_path) {
//             Ok(m) => m,
//             Err(_) => return (SlotOutcome::BubbleUpError, LinearMap::new()),
//         };
//         let parallel_route = matched.entry;

//         let page_ctr = match &parallel_route.controller {
//             Some(ctrl) => ctrl.clone(),
//             None => return (SlotOutcome::BubbleUpError, LinearMap::new()),
//         };

//         // Render the slot's leaf page
//         let mut current_outcome = self
//             .execute_slot_nav(
//                 req,
//                 &Some(MainComponent::Page(page_ctr)),
//                 &parallel_route.loader_controller,
//                 &parallel_route.error_controller,
//                 tasks,
//             )
//             .await;

//         // Wrap leaf page with its own node ID
//         let mut current_html = self.unwrap_outcome(&current_outcome);
//         if current_outcome != SlotOutcome::BubbleUpError {
//             node_ids.push(parallel_route.node_id.clone());
//             current_html = format!(
//                 "<omnyx-container data-omnyx-id=\"{}\" style=\"display: contents;\">{}</omnyx-container>",
//                 parallel_route.node_id, current_html
//             );
//             current_outcome = SlotOutcome::Ready(current_html);
//         }

//         // Wrap with layouts inside the slot
//         for layout in &parallel_route.layouts {
//             if current_outcome == SlotOutcome::BubbleUpError {
//                 current_outcome = self.try_error_boundary(req, &layout.error_controller).await;
//                 continue;
//             }

//             let children_html = self.unwrap_outcome(&current_outcome);

//             let mut nested_map = LinearMap::new();
//             for (nested_name, nested_matcher_arc) in &layout.parallel_routers {
//                 let (nested_outcome, nested_params) = Box::pin(self.render_parallel_slot_nav(
//                     req,
//                     nested_matcher_arc.as_ref(),
//                     nested_name,
//                     relative_path,
//                     tasks,
//                     &layout.node_id,
//                     node_ids,
//                 ))
//                 .await;
//                 let nested_html = self.unwrap_outcome(&nested_outcome);
//                 nested_map.insert(
//                     nested_name.clone(),
//                     RenderedParallelRoute {
//                         html: nested_html,
//                         params: nested_params,
//                     },
//                 );
//             }

//             req.set_layout_props(LayoutProps {
//                 children: children_html,
//                 parallel_routes: nested_map,
//             });

//             current_outcome = self
//                 .execute_slot_nav(
//                     req,
//                     &layout
//                         .controller
//                         .as_ref()
//                         .map(|c| MainComponent::Layout(Arc::clone(c))),
//                     &layout.loader_controller,
//                     &layout.error_controller,
//                     tasks,
//                 )
//                 .await;

//             // Wrap layout output with its own container
//             let layout_html = self.unwrap_outcome(&current_outcome);
//             if current_outcome != SlotOutcome::BubbleUpError {
//                 node_ids.push(layout.node_id.clone());
//                 let wrapped_layout = format!(
//                     "<omnyx-container data-omnyx-id=\"{}\" style=\"display: contents;\">{}</omnyx-container>",
//                     layout.node_id, layout_html
//                 );
//                 current_outcome = SlotOutcome::Ready(wrapped_layout);
//             }
//         }

//         // Wrap the entire slot content with a slot container ID
//         let slot_container_id = format!("{}:S_{}", parent_layout_id, slot_name);
//         node_ids.push(slot_container_id.clone());
//         let final_html = self.unwrap_outcome(&current_outcome);
//         let wrapped_slot = format!(
//             "<omnyx-container data-omnyx-id=\"{}\" style=\"display: contents;\">{}</omnyx-container>",
//             slot_container_id, final_html
//         );
//         (SlotOutcome::Ready(wrapped_slot), matched.params)
//     }

//     async fn execute_slot_nav(
//         &self,
//         req: &mut Request,
//         main: &Option<MainComponent>,
//         loader: &Option<Arc<dyn ErasedLoaderComponent>>,
//         error: &Option<Arc<dyn ErasedErrorComponent>>,
//         tasks: &mut Vec<DeferredTask>,
//     ) -> SlotOutcome {
//         // Prioritizing Loader
//         if let Some(l_ctr) = loader {
//             if let Some(m_ctr) = main {
//                 let l_res = std::panic::AssertUnwindSafe(l_ctr.call_erased(req.clone()))
//                     .catch_unwind()
//                     .await
//                     .unwrap_or_else(|_| Response::error("Loader panicked"));

//                 if matches!(l_res.body, Body::Err(_)) {
//                     return self.try_error_boundary(req, error).await;
//                 }

//                 let id = format!(
//                     "omnyx-shell-{}",
//                     SLOT_COUNTER.fetch_add(1, Ordering::Relaxed)
//                 );
//                 let shell = format!(
//                     "<omnyx-container id='{id}' style=\"display: contents;\" >{}</omnyx-container>",
//                     l_res.body.to_string()
//                 );
//                 let m_clone = match m_ctr {
//                     MainComponent::Page(p) => MainComponent::Page(Arc::clone(p)),
//                     MainComponent::Layout(l) => MainComponent::Layout(Arc::clone(l)),
//                 };

//                 let r_clone = req.clone();
//                 tasks.push(DeferredTask {
//                     id: id.clone(),
//                     task: Box::pin(async move { m_clone.call(r_clone).await }),
//                     error_controller: error.clone(),
//                 });

//                 return SlotOutcome::Pending { id, shell };
//             }
//         }

//         if let Some(m_ctr) = main {
//             let m_res = std::panic::AssertUnwindSafe(m_ctr.call(req.clone()))
//                 .catch_unwind()
//                 .await
//                 .unwrap_or_else(|_| Response::error("Main component panicked"));
//             if !matches!(m_res.body, Body::Err(_)) {
//                 return SlotOutcome::Ready(m_res.body.to_string());
//             }
//         }

//         self.try_error_boundary(req, error).await
//     }
// }
