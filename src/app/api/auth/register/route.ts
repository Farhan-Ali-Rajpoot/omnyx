import { connectDB } from "@/libs/db/connectDB";
import { NextResponse } from "next/server";
import UserModel, { UserProviderType } from "@/models/user.model";
import { sendRegistrationVerificationEmail } from "@/libs/email/sendEmail";
import { isRequestUnauthorized } from "@/libs/middleware/verifyRequestSource";
import { generateOtpWithToken } from "@/libs/generateOtpWithToken";
import { Tokens } from "@/config/tokens";
import { cookies } from "next/headers";

export interface RegistrationBody {
  email: string;
  name: string;
  password: string;
  provider: UserProviderType;
}

export async function POST(req: Request) {
  try {
    const unauthorizedResponse = await isRequestUnauthorized(req);
    if (unauthorizedResponse) return unauthorizedResponse;

    await connectDB();

    const body: RegistrationBody = await req.json();
    const { email, name, password, provider } = body;

    if (!email || !name || !password || provider !== "email") {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (email.length < 7 || name.length < 3 || password.length < 6) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const existingUser = await UserModel.findOne({
      $or: [{ email }, { name_normalized: name.trim().toLowerCase() }],
    });

    let user;

    if (existingUser) {
      if (existingUser.verified) {
        const matchType = existingUser.email === email ? "email" : "name";
        return NextResponse.json(
          { error: "Invalid Credentials", matchType },
          { status: 409 }
        );
      }

      existingUser.name = name;
      existingUser.name_normalized = name.trim().toLowerCase();
      existingUser.password = password;
      existingUser.provider = provider;

      await existingUser.save();
      user = existingUser;
    } else {
      user = await UserModel.create({
        name,
        name_normalized: name.trim().toLowerCase(),
        email,
        password,
        provider,
        verified: false,
      });
    }

    const { otp, otpToken } = await 
    generateOtpWithToken({ cfg: Tokens.user.verification.register, payload: { _id: user._id } });

    const isSent = await sendRegistrationVerificationEmail({
      to: email,
      name,
      verificationCode: otp,
    });

    if (!isSent) {
      console.log("Verification email not sent.");
      return NextResponse.json(
        { error: "Failed to send verification email" },
        { status: 500 }
      );
    }

    const tempUserSessionToken = await user.generateJWT({
      cfg: Tokens.user.intermediate
    });

    const cookieStore = await cookies();

    cookieStore.set({
      name: Tokens.user.intermediate.cookieName,
      value: tempUserSessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60,
    });

    cookieStore.set({
      name: Tokens.user.verification.register.cookieName,
      value: otpToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60,
    });

    return NextResponse.json(
      { message: "Successfully registered" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
