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
    const { verificationCode: submittedCode } = requestBody;

    if (!submittedCode) {
      return NextResponse.json(
        { error: "Verification code is required" },
        { status: 400 }
      );
    }

    const tokenResult = await decodeJwtTokenFromRequestSafe(Tokens.user.verification.register);

    if (!tokenResult.ok) {
      if (tokenResult.error === "EXPIRED") {
        const error: DecodeTokenErrorType = 'EXPIRED'
        return NextResponse.json(
          { error: "Verification code expired. Request a new one.", errorType: error },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: "Invalid verification token." },
        { status: 401 }
      );
    }

    const payload = tokenResult.value!;
    const userId = payload._id;
    const expectedCode = payload.code;

    if (submittedCode !== expectedCode) {
      return NextResponse.json(
        { error: "Incorrect verification code" },
        { status: 401 }
      );
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    if (!user.verified) {
      user.verified = true;
      await user.save();
    }

    const sessionToken = user.generateJWT({cfg: Tokens.user.session});

    (await cookies()).set(Tokens.user.session.cookieName, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 90, 
    });

    return NextResponse.json({
      message: 'Successfully Verified'
    },{
      status: 201
    });
  } catch (error) {
    console.error("Code Verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
