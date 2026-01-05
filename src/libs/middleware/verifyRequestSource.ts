// lib/middleware/shouldBlockRequest.ts
import { NextRequest, NextResponse } from 'next/server';
import { SERVICE_SECRETS, ServiceType } from '@/libs/secFetch';

export const allowedDomains = process.env.NODE_ENV === 'development'
    ? ['http://localhost:3000', 'http://127.0.0.1:3000']
    : [process.env.NEXT_PUBLIC_BASE_URL];

export async function isRequestUnauthorized(request: NextRequest | Request): Promise<NextResponse | null> {
    try {
        const requestHeaders = request.headers;
        const requestOrigin = requestHeaders.get('origin') || '';
        const serviceName = requestHeaders.get('api-service') as ServiceType;
        const providedSecret = requestHeaders.get('api-secret');

        if (providedSecret !== SERVICE_SECRETS[serviceName]) {
            console.warn('[SECURITY] Unauthorized access attempt.');
            return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
        }

        if (!allowedDomains.includes(requestOrigin)) {
            console.warn('[SECURITY] Request from unknown origin:', requestOrigin);
        }

        return null; 

    } catch (error) {
        console.error('[SECURITY] Middleware error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}