"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/CartProvider";

export default function AddToCartForm({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  return (
    <div className="rounded-3xl border border-oat-200 bg-white/80 p-5 shadow-soft">
      <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Size</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {product.sizes.map((option) => (
          <button
            key={option}
            onClick={() => setSize(option)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              size === option
                ? "bg-ink-900 text-oat-50"
                : "border border-oat-200 text-ink-700 hover:border-ink-700"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between rounded-2xl border border-oat-200 px-4 py-3">
        <span className="text-sm text-ink-600">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="h-8 w-8 rounded-full border border-oat-200 text-sm"
          >
            -
          </button>
          <span className="text-sm font-semibold text-ink-900">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="h-8 w-8 rounded-full border border-oat-200 text-sm"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => addItem(product, size, quantity)}
        className="mt-5 w-full rounded-2xl bg-ink-900 px-4 py-3 text-sm font-semibold text-oat-50"
      >
        Add to Cart
      </button>
      <p className="mt-3 text-xs text-ink-500">Free shipping on orders over $150.</p>
    </div>
  );
}
