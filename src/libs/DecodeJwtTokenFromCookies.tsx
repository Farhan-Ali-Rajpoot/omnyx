import { TokenType } from "@/config/tokens";
import JWT from "./jwtService"; 
import { cookies } from "next/headers";
import { JwtPayload } from "jsonwebtoken";

export async function decodeJwtTokenFromRequest<T extends JwtPayload = any>(
  cfg: TokenType
): Promise<T | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(cfg.cookieName)?.value;

  if (!token) return null;

  const payload = JWT.verify<T>(cfg, token);
  if (!payload.ok) return null;

  return payload.value;
}

export type DecodeTokenErrorType = "EXPIRED" | "INVALID" | "UNKNOWN" | "NO_TOKEN";

export interface DecodeTokenSafeResult<T extends JwtPayload = any> {
  ok: boolean;
  value?: T;
  error?: DecodeTokenErrorType;
}

export async function decodeJwtTokenFromRequestSafe<T extends JwtPayload = any>(
  cfg: TokenType
): Promise<DecodeTokenSafeResult<T>> {
  const cookieStore = await cookies();
  const token = cookieStore.get(cfg.cookieName)?.value;

  if (!token) {
    return { ok: false, error: "NO_TOKEN" };
  }

  const payload = JWT.verify<T>(cfg, token);

  if (!payload.ok) {
    return { ok: false, error: payload.error as DecodeTokenErrorType };
  }

  return { ok: true, value: payload.value };
}
