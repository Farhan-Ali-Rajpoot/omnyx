import jwt, { JwtPayload, SignOptions, VerifyOptions } from "jsonwebtoken";
import { Tokens, TokenKeyType, TokenType } from "@/config/tokens";

export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

const JWT = {
  sign<T extends object>(
    cfg: TokenType,
    payload: T,
    options?: SignOptions
  ): Result<string> {
    if (!cfg?.secret) return { ok: false, error: "INVALID_TOKEN_TYPE" };

    const opts: SignOptions = {
      algorithm: "HS256",
      ...options,
    };

    if (!opts.expiresIn && (cfg as any).expiresIn) {
      opts.expiresIn = (cfg as any).expiresIn;
    }

    try {
      const token = jwt.sign(payload, cfg.secret, opts);
      return { ok: true, value: token };
    } catch (err: any) {
      return { ok: false, error: err.message ?? "SIGN_FAILED" };
    }
  },

  verify<T extends JwtPayload = any>(
    cfg: TokenType,
    token: string,
    options?: VerifyOptions
  ): Result<T> {
    if (!cfg?.secret) return { ok: false, error: "INVALID_TOKEN_TYPE" };

    const opts: VerifyOptions = {
      algorithms: ["HS256"],
      ...options,
    };

    try {
      const decoded = jwt.verify(token, cfg.secret, opts) as T;
      return { ok: true, value: decoded };
    } catch (err: any) {
      if (err.name === "TokenExpiredError") return { ok: false, error: "EXPIRED" };
      if (err.name === "JsonWebTokenError") return { ok: false, error: "INVALID" };
      return { ok: false, error: "UNKNOWN" };
    }
  },
};

export default JWT;