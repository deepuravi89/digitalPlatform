import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mapProduct } from "@/lib/dbProducts";
import { requireAdmin } from "@/lib/admin";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ products: rows.map(mapProduct) });
}

export async function PUT(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const id = String(body.id || "");
  const stock = Number(body.stock);
  const featured = Boolean(body.featured);

  if (!id || Number.isNaN(stock)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const updated = await prisma.product.update({
    where: { id },
    data: { stock, featured }
  });

  return NextResponse.json({ product: mapProduct(updated) });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const id = String(body.id || "").trim();
  const name = String(body.name || "").trim();
  const category = String(body.category || "").trim();
  const sizes = Array.isArray(body.sizes) ? body.sizes : [];
  const color = String(body.color || "").trim();
  const price = Number(body.price || 0);
  const drop = String(body.drop || "").trim();
  const vibe = String(body.vibe || "").trim();
  const status = String(body.status || "").trim();
  const description = String(body.description || "").trim();
  const details = Array.isArray(body.details) ? body.details : [];
  const care = Array.isArray(body.care) ? body.care : [];
  const images = Array.isArray(body.images) ? body.images : [];
  const featured = Boolean(body.featured);
  const stock = Number(body.stock || 0);

  if (
    !id ||
    !name ||
    !category ||
    !sizes.length ||
    !color ||
    Number.isNaN(price) ||
    !drop ||
    !vibe ||
    !status ||
    !description ||
    !details.length ||
    !care.length ||
    !images.length
  ) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const created = await prisma.product.create({
    data: {
      id,
      name,
      category,
      sizes: JSON.stringify(sizes),
      color,
      price,
      drop,
      vibe,
      status,
      description,
      details: JSON.stringify(details),
      care: JSON.stringify(care),
      images: JSON.stringify(images),
      featured,
      stock
    }
  });

  return NextResponse.json({ product: mapProduct(created) }, { status: 201 });
}
