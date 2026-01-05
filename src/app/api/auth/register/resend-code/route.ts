import { NextResponse } from "next/server";
import { connectDB } from "@/libs/db/connectDB";
import { decodeJwtTokenFromRequestSafe } from "@/libs/DecodeJwtTokenFromCookies"; 
import UserModel from "@/models/user.model";
import { Tokens } from "@/config/tokens";
import { cookies } from "next/headers";
import { sendRegistrationVerificationEmail } from "@/libs/email/sendEmail";
import { generateOtpWithToken } from "@/libs/generateOtpWithToken";

export async function POST() {
  try {
    await connectDB();

    // Extract user identity from tempUser cookie
    const tempUserResult = await decodeJwtTokenFromRequestSafe(
      Tokens.user.intermediate
    );
    if (!tempUserResult.ok) {
      // Changed message from "Session expired"
      return NextResponse.json(
        { error: "Verification session expired. Please register again." },
        { status: 440 }
      );
    }

    const { _id, email, name } = tempUserResult.value;
    if (!_id || !email) {
      return NextResponse.json(
        { error: "Missing registration details. Please register again." },
        { status: 400 }
      );
    }

    // Validate user existence in DB
    const existingUser = await UserModel.findById(_id);
    if (!existingUser) {
      // Message updated for clarity
      return NextResponse.json(
        { error: "User record not found. Please register." },
        { status: 404 }
      );
    }

    // Generate new code + verification token
    const { otp, otpToken } = await generateOtpWithToken({
      cfg: Tokens.user.verification.register,
      payload: { _id: existingUser._id },
    });

    // Send email to user
    const isSent = await sendRegistrationVerificationEmail({
      to: email,
      name,
      verificationCode: otp,
    });

    if (!isSent) {
      // Message updated for clarity
      return NextResponse.json(
        {
          error:
            "Failed to send the verification code email. Please try again.",
        },
        { status: 500 }
      );
    }

    (await cookies()).set(
      Tokens.user.verification.register.cookieName,
      otpToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 15 * 60,
      }
    );

    return NextResponse.json(
      {
        message: "Verification code resent successfully",
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.error("Resend code error:", err);
    return NextResponse.json(
      { error: "Internal server error. Could not complete the request." },
      { status: 500 }
    );
  }
}
