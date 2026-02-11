import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionCookie, verifySessionToken } from "@/lib/auth";
import type { NextRequest } from "next/server";

async function getUserId(request: NextRequest) {
  const token = getSessionCookie(request);
  if (!token) return null;
  try {
    const payload = await verifySessionToken(token);
    return payload.userId;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ items: [] }, { status: 200 });

  const cart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true }
  });

  if (!cart) return NextResponse.json({ items: [] }, { status: 200 });

  return NextResponse.json({
    items: cart.items.map((item) => ({
      productId: item.productId,
      size: item.size,
      quantity: item.quantity
    }))
  });
}

export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const productId = String(body.productId || "");
  const size = String(body.size || "");
  const quantity = Number(body.quantity || 1);

  if (!productId || !size || Number.isNaN(quantity)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const cart = await prisma.cart.upsert({
    where: { userId },
    update: {},
    create: { userId }
  });

  const existing = await prisma.cartItem.findUnique({
    where: { cartId_productId_size: { cartId: cart.id, productId, size } }
  });

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity }
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        size,
        quantity
      }
    });
  }

  return NextResponse.json({ ok: true });
}

export async function PUT(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const productId = String(body.productId || "");
  const size = String(body.size || "");
  const quantity = Number(body.quantity || 0);

  if (!productId || !size || Number.isNaN(quantity)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const cart = await prisma.cart.findFirst({ where: { userId } });
  if (!cart) return NextResponse.json({ ok: true });

  if (quantity <= 0) {
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId, size }
    });
    return NextResponse.json({ ok: true });
  }

  await prisma.cartItem.upsert({
    where: { cartId_productId_size: { cartId: cart.id, productId, size } },
    update: { quantity },
    create: { cartId: cart.id, productId, size, quantity }
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cart = await prisma.cart.findFirst({ where: { userId } });
  if (!cart) return NextResponse.json({ ok: true });

  let body: { productId?: string; size?: string } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  if (!body.productId || !body.size) {
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return NextResponse.json({ ok: true });
  }

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id, productId: body.productId, size: body.size }
  });

  return NextResponse.json({ ok: true });
}
