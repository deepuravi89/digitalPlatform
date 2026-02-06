"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "@/components/CartProvider";
import { products } from "@/lib/products";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clear } = useCart();

  const cartItems = items.map((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return { ...item, product };
  });

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      if (!item.product) return sum;
      return sum + item.product.price * item.quantity;
    }, 0);
  }, [cartItems]);

  return (
    <div className="min-h-screen gradient-shell noise">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-ink-900"></div>
          <div>
            <p className="font-display text-lg tracking-tight">Revya</p>
            <p className="text-xs uppercase tracking-[0.2em] text-ink-600">Cart</p>
          </div>
        </div>
        <Link
          href="/"
          className="rounded-full border border-ink-900 px-4 py-2 text-sm font-medium text-ink-900 transition hover:bg-ink-900 hover:text-oat-50"
        >
          Continue Shopping
        </Link>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-3xl border border-oat-200 bg-white/70 p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <h1 className="font-display text-2xl text-ink-950">Your Cart</h1>
              {items.length > 0 && (
                <button onClick={clear} className="text-sm text-ink-600 underline">
                  Clear cart
                </button>
              )}
            </div>

            {items.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-oat-200 p-6 text-sm text-ink-600">
                Your cart is empty. Start with a Revya drop.
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {cartItems.map((item) => {
                  if (!item.product) return null;
                  return (
                    <div key={`${item.productId}-${item.size}`} className="flex flex-col gap-4 rounded-2xl border border-oat-200 bg-white p-4 sm:flex-row sm:items-center">
                      <div className="h-16 w-16 overflow-hidden rounded-2xl bg-gradient-to-br from-oat-100 to-white">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-ink-950">{item.product.name}</p>
                        <p className="text-xs text-ink-600">Size {item.size} · {item.product.drop}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, Math.max(1, item.quantity - 1))}
                          className="h-8 w-8 rounded-full border border-oat-200 text-sm"
                        >
                          -
                        </button>
                        <span className="min-w-[24px] text-center text-sm font-semibold text-ink-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                          className="h-8 w-8 rounded-full border border-oat-200 text-sm"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-sm font-semibold text-ink-950">${item.product.price * item.quantity}</div>
                      <button
                        onClick={() => removeItem(item.productId, item.size)}
                        className="text-xs text-ink-600 underline"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-oat-200 bg-white/80 p-6 shadow-soft">
              <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Order Summary</p>
              <div className="mt-4 flex items-center justify-between text-sm text-ink-700">
                <span>Subtotal</span>
                <span>${total}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-ink-700">
                <span>Shipping</span>
                <span>{total > 150 ? "Free" : "$12"}</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-base font-semibold text-ink-950">
                <span>Total</span>
                <span>${total > 150 ? total : total + 12}</span>
              </div>
              <button className="mt-5 w-full rounded-2xl bg-ink-900 px-4 py-3 text-sm font-semibold text-oat-50">
                Checkout
              </button>
              <p className="mt-3 text-xs text-ink-500">Secure checkout is the next step.</p>
            </div>
            <div className="rounded-3xl bg-ink-900 p-6 text-oat-50 shadow-soft">
              <p className="text-xs uppercase tracking-[0.3em] text-oat-200">Need help?</p>
              <p className="mt-3 text-sm text-oat-100">Message the Revya stylist for sizing or styling help.</p>
              <button className="mt-5 w-full rounded-2xl bg-oat-50 px-4 py-3 text-sm font-semibold text-ink-900">
                Chat with Revya Stylist
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
