import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie, verifySessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = getSessionCookie(request);
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const payload = await verifySessionToken(token);
    const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase();
    if (!adminEmail || payload.email.toLowerCase() !== adminEmail) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin"]
};
