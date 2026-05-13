use omnyx::{router::{RouteMetadata, Router}};

use super::home_router;

pub fn base_router () -> Router {
    Router::new()
    .group("root", |group| {
        group
        .metadata(
            RouteMetadata::new()
                .title("Aspire College | Chowk Sarwar Shaheed")
                // Updated description with specific academic levels
                .description("Comprehensive education from Matric to BS level at Aspire College Chowk Sarwar Shaheed. Offering FSc, ICS, ICom, and diverse Bachelor programs.")
                .creator("Farhan Ali")
        )
        .nest_router(home_router())
    })
}