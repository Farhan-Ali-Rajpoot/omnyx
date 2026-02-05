import { NextResponse } from "next/server";
import { connectDB } from "@/libs/db/connectDB";
import { cookies } from "next/headers";

export async function POST(req: any) {
  try {

    const cookieStore = await cookies();
    const authCookie = cookieStore.get("_adminAuthToken");

    if (authCookie) {
      cookieStore.delete("_adminAuthToken");
    };

    return NextResponse.json(
      {
        message: "Logged out successfully",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log("Internal Server Error: ", err);
    return NextResponse.json(
      {
        error: "Internal server Error",
      },
      {
        status: 501,
      }
    );
  }
}