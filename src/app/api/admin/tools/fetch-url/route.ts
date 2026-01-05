// src/app/api/proxy/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { url, method, headers, body } = await req.json();

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: ['GET', 'HEAD'].includes(method) ? undefined : body,
    });

    const resHeaders: Record<string, string> = {};
    response.headers.forEach((v, k) => (resHeaders[k] = v));

    const text = await response.text();

    return NextResponse.json({
      body: text,
      headers: resHeaders,
      contentType: response.headers.get('content-type'),
    });
  } catch (err) {
    return NextResponse.json({ error: (err as any).message }, { status: 500 });
  }
}
