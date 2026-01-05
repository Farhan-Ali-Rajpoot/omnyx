import { NextResponse } from "next/server";
import UserModel from "@/models/user.model";
import { connectDB } from "@/libs/db/connectDB";
import { cookies } from "next/headers";
import { isRequestUnauthorized } from "@/libs/middleware/verifyRequestSource";
import { decodeJwtTokenFromRequestSafe, DecodeTokenErrorType } from "@/libs/DecodeJwtTokenFromCookies";
import { Tokens } from "@/config/tokens";


export async function POST(req: Request) {
  try {
    const unauthorizedResponse = await isRequestUnauthorized(req);
    if (unauthorizedResponse) return unauthorizedResponse;

    await connectDB();

    const requestBody = await req.json();
    const { code: submittedCode } = requestBody;

    if (!submittedCode) {
      return NextResponse.json(
        { error: "Verification code is required" },
        { status: 400 }
      );
    }

    const tokenResult = await decodeJwtTokenFromRequestSafe(Tokens.user.verification.passwordReset);

    if (!tokenResult.ok) {
      if (tokenResult.error === "EXPIRED") {
        const error: DecodeTokenErrorType = 'EXPIRED'
        return NextResponse.json(
          { error: "Reset code expired. Request a new one.", errorType: error },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: "Invalid reset session. Please request a new reset link." },
        { status: 401 }
      );
    }

    const payload = tokenResult.value!;
    const userId = payload._id;
    const expectedCode = payload.otp;

    if (submittedCode !== expectedCode) {
      return NextResponse.json(
        { error: "Incorrect verification code" },
        { status: 401 }
      );
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json({ 
        error: "User account not found" 
      }, { status: 401 });
    }

    const tempUserToken = user.generateJWT({
      cfg: Tokens.user.recovery.password
    });

    (await cookies()).set(
      Tokens.user.recovery.password.cookieName , 
      tempUserToken, 
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 15 * 60, // 15 minutes
      }
    );

    (await cookies()).delete(Tokens.user.verification.passwordReset.cookieName);

    return NextResponse.json({
      message: 'Code verified successfully',
    }, {
      status: 200
    });

  } catch (error) {
    console.error("Password Reset Verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}