"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CartButton() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-2 rounded-full border border-ink-900 px-4 py-2 text-sm font-medium text-ink-900 transition hover:bg-ink-900 hover:text-oat-50"
    >
      Cart
      <span className="rounded-full bg-ink-900 px-2 py-0.5 text-xs font-semibold text-oat-50">
        {count}
      </span>
    </Link>
  );
}
