import { AccessToken } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const roomName = req.nextUrl.searchParams.get("room") || "akshay-portfolio-demo";
  const identity = req.nextUrl.searchParams.get("identity") || `visitor-${Math.random().toString(36).substring(7)}`;

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const livekitUrl = process.env.LIVEKIT_URL;

  if (!apiKey || !apiSecret || !livekitUrl) {
    return NextResponse.json({ error: 'Server misconfigured. LiveKit env variables missing.' }, { status: 500 });
  }

  try {
    const at = new AccessToken(apiKey, apiSecret, { identity });
    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
    });

    const token = await at.toJwt();
    
    return NextResponse.json({ token, url: livekitUrl });
  } catch (error: any) {
    console.error('Error generating LiveKit token:', error);
    return NextResponse.json({ error: error.message || 'Token generation failed' }, { status: 500 });
  }
}
