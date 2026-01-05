import { Tokens } from "@/config/tokens";
import { connectDB } from "@/libs/db/connectDB";
import { sendRegistrationVerificationEmail } from "@/libs/email/sendEmail";
import { isRequestUnauthorized } from "@/libs/middleware/verifyRequestSource";
import UserModel from "@/models/user.model";
import { generateOtpWithToken } from "@/libs/generateOtpWithToken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest | Request) {
  try {
    const unauthorizedResponse = await isRequestUnauthorized(req);
    if (unauthorizedResponse) return unauthorizedResponse;

    await connectDB();

    const body = await req.json();
    const { email } = body;

    if (!email) {
      console.log(`Email not provided (Reset Password)`);
      return NextResponse.json(
        {
          error: "Email is required",
        },
        {
          status: 400,
        }
      );
    }

    const existedUser = await UserModel.findOne({
      email,
    });

    if (!existedUser || !existedUser.verified) {
      console.log("User not found (Reset Password)");
      return NextResponse.json({
        error: "Network connection error",
      },{
        status: 401
      });
    }

    const { otp, otpToken } =
      await generateOtpWithToken({ cfg: Tokens.user.verification.passwordReset, payload: { _id: existedUser._id } });

    const isSent = await sendRegistrationVerificationEmail({
      name: existedUser.name,
      to: email,
      verificationCode: otp,
    });

    if (!isSent) {
      console.log(`Email not sent (Reset password)`);
      return NextResponse.json(
        {
          error: "Failed to send reset email. Please try again.",
        },
        {
          status: 503,
        }
      );
    }

    const cookieStore = await cookies();

    cookieStore.set({
      name: Tokens.user.verification.passwordReset.cookieName,
      value: otpToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60, // 15 minutes
    });

    return NextResponse.json({
      message: "Reset code sent to your email",
    },{
      status: 201
    });
  } catch (err: any) {
    console.error(`Reset password error: ${err.message || err}`);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
