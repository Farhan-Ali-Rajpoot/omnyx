import crypto from "crypto";
import JWT from "@/libs/jwtService";
import { Tokens, TokenType } from "@/config/tokens";
import { JwtPayload } from "jsonwebtoken";

export async function generateOtpWithToken({cfg, payload } : { cfg: TokenType, payload: JwtPayload }) {
  const code = crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
  const verification_payload = {
    ...payload,
    otp: code,
  };
  const token = await JWT.sign( cfg, verification_payload);

  if (!token.ok) {
    throw new Error(`JWT_SIGN_FAILED: ${token.error}`);
  }

  return { otp: code, otpToken: token.value };
}

