import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionCookie, verifySessionToken } from "@/lib/auth";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = getSessionCookie(request);
  if (!token) return NextResponse.json({ user: null });

  try {
    const payload = await verifySessionToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true }
    });
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}
