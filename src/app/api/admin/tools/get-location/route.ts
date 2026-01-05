// app/api/get-location/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: any) {

  const ip = 'No IP', country = 'Pakistan', city = 'No City', region = 'No Region', ll = [0, 0];

  const location = {
    ip,
    country: country,
    city: city || 'Unknown',
    region: region || 'Unknown',
    ll: ll, // [lat, lon]
  };

  return NextResponse.json(location);
}
