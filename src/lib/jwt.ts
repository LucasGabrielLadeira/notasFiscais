// src/lib/jwt.ts
import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

export async function generateTokens(payload: object) {
  const accessToken = await new SignJWT({ payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15m")
    .sign(secret);

  const refreshToken = await new SignJWT({ payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(secret);

  return { accessToken, refreshToken };
}
