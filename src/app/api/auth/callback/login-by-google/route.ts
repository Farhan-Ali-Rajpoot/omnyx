import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/libs/db/connectDB";
import UserModel from "@/models/user.model";

export const dynamic = "force-dynamic";
const production_default_url = `${process.env.NEXT_PUBLIC_BASR_URL}${process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT_URL_PATH}`;
const development_default_url = `http://localhost:3000${process.env.NEXT_PUBLIC_GOOGLE_REGISTER_REDIRECT_URL_PATH}`;

export async function GET(request: Request) {
  await connectDB();

  const { searchParams } = await new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.json({ error: "Access Denied by user or Google" });
  }

  if (!code) {
    return NextResponse.json({ error: "No Authorization" });
  }

  try {
    const redirect_uri =
      process.env.NODE_ENV === "development"
        ? development_default_url
        : production_default_url;

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_AUTH_CLIENT_ID! ,
        client_secret: process.env.GOOGLE_AUTH_CLIENT_SECRET! ,
        redirect_uri,
        grant_type: "authorization_code",
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Failed to exchange code:", tokens);
      throw new Error(tokens.error || "Failed to exchange code for tokens");
    }

    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      }
    );

    const googleUser = await userInfoResponse.json();

    if (!userInfoResponse.ok) {
      console.error("Failed to fetch user info:", googleUser);
      throw new Error(googleUser.error || "Failed to fetch user info");
    }

    const userEmail = googleUser.email;

    const existingUser = await UserModel.findOne({ email: userEmail });

    const cookieStore = await cookies();

    // If user exists, create and store JWT
    if (existingUser) {
      const token = await existingUser.generateJWT();

      // Set secure JWT auth token (HTTP-only)
      cookieStore.set("_authToken", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    // Set public cookie (used on frontend to show state)
    cookieStore.set(
      "google_user_info",
      JSON.stringify({
        exists: !!existingUser,
        user: existingUser?.toObject?.() || null,
        google: !existingUser ? googleUser : null,
      }),
      {
        path: "/",
        maxAge: 60 * 5,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
      }
    );

    return NextResponse.redirect(
      new URL("/auth/login/google/verify-user", request.url)
    );
  } catch (err) {
    console.error("Google callback error:", err);
    return NextResponse.redirect(
      new URL(
        `/auth/login?error=${encodeURIComponent(
          err instanceof Error ? err.message : "Authentication failed"
        )}`,
        request.url
      )
    );
  }
}
