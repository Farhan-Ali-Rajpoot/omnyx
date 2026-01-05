import { decodeJwtTokenFromRequestSafe } from "@/libs/DecodeJwtTokenFromCookies";
import { connectDB } from "@/libs/db/connectDB";
import { isRequestUnauthorized } from "@/libs/middleware/verifyRequestSource";
import { NextResponse, NextRequest } from "next/server";
import UserModel from "@/models/user.model";
import { cookies } from "next/headers";
import { Tokens } from "@/config/tokens";
import { FrontendRoutes } from "@/config/urls";

export async function POST(req: NextRequest | Request) {
  try {
    const unauthorizedResponse = await isRequestUnauthorized(req);
    if (unauthorizedResponse) return unauthorizedResponse;

    await connectDB();

    const tokenResult = await decodeJwtTokenFromRequestSafe(Tokens.user.recovery.password);

    if (!tokenResult.ok) {
      return NextResponse.json(
        { 
          error: "Reset session expired or invalid. Please restart the password reset process." 
        },
        { status: 401 }
      );
    }

    const { password, confirmPassword } = await req.json();
    
    if (!password || !confirmPassword) {
      return NextResponse.json(
        { error: "Password and confirmation are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const payload = tokenResult.value!;
    const userId = payload._id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json({ 
        error: "User account not found" 
      }, { status: 404 });
    }

    
    user.password = password;
    user.updatedAt = new Date();
    
    await user.save();

    const cookieStore = await cookies();
    cookieStore.delete(Tokens.user.recovery.password?.cookieName);

    return NextResponse.json({
      message: 'Password has been reset successfully',
      redirectTo: FrontendRoutes.auth.login.base
    }, {
      status: 200
    });

  } catch (err: any) {
    console.error(`Set new password error: ${err.message}`);
    return NextResponse.json(
      {
        error: "Failed to reset password. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}