import { SignJWT, jwtVerify } from "jose";
import type { NextRequest } from "next/server";

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || "change-me");
const COOKIE_NAME = "revya_session";

export type SessionPayload = {
  userId: string;
  email: string;
};

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify<SessionPayload>(token, SECRET);
  return payload;
}

export function getSessionCookie(request: NextRequest) {
  return request.cookies.get(COOKIE_NAME)?.value;
}

export function getSessionCookieName() {
  return COOKIE_NAME;
}
