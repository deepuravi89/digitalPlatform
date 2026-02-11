import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mapProduct } from "@/lib/dbProducts";

export async function GET() {
  const rows = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ products: rows.map(mapProduct) });
}
