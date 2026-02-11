import type { NextRequest } from "next/server";
import { getSessionCookie, verifySessionToken } from "@/lib/auth";

export async function requireAdmin(request: NextRequest) {
  const token = getSessionCookie(request);
  if (!token) return null;

  try {
    const payload = await verifySessionToken(token);
    const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase();
    if (!adminEmail || payload.email.toLowerCase() !== adminEmail) return null;
    return payload;
  } catch {
    return null;
  }
}
