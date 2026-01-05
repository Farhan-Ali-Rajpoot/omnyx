export const SERVICE_SECRETS = {
    auth: process.env.NEXT_PUBLIC_AUTH_API_SECRET || "",
} as const;

export type ServiceType = keyof typeof SERVICE_SECRETS;

Object.entries(SERVICE_SECRETS).forEach(([service, secret]) => {
    if (!secret || secret.trim() === "") {
        throw new Error(`${service.toUpperCase()}_SECRET is not defined`);
    }
});

export interface SecFetchOptions extends RequestInit {
    service: ServiceType;
}

export function secFetch(url: string, options: SecFetchOptions) {
    const { service, ...fetchOptions } = options;
    const selectedSecret = SERVICE_SECRETS[service];
    
    const headers = {
        "Content-Type": "application/json",
        'api-secret': selectedSecret,
        'api-service': service,
        ...fetchOptions.headers,
    };

    return fetch(url, {
        ...fetchOptions,
        headers,
    });
}