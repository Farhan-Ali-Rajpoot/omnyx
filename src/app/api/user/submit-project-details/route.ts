import { NextResponse } from "next/server";
import { isRequestUnauthorized } from "@/libs/middleware/verifyRequestSource";
import { sendProjectEmail } from "@/libs/email/snedProjectEmail";

export async function POST(req: Request) {
  try {
    const unauthorizedResponse = await isRequestUnauthorized(req);
        if (unauthorizedResponse) return unauthorizedResponse;

    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      console.log("All fields are required");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const sended = await sendProjectEmail({ name, email, message });

    if (!sended) {
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
