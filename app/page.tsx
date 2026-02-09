"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import CartButton from "@/components/CartButton";
import { brandStats, categories, priceRanges, products, sizes } from "@/lib/products";

const badges: Record<string, string> = {
  New: "bg-lime-500 text-ink-900",
  "Low stock": "bg-coral-500 text-white",
  Bestseller: "bg-ink-900 text-oat-50",
  Limited: "bg-oat-300 text-ink-900"
};

const formatPrice = (price: number) => `$${price}`;

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [size, setSize] = useState<(typeof sizes)[number]>("All");
  const [priceRange, setPriceRange] = useState<(typeof priceRanges)[number]["label"]>("All");

  const filtered = useMemo(() => {
    const range = priceRanges.find((item) => item.label === priceRange) ?? priceRanges[0];

    return products.filter((product) => {
      const matchesQuery =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.drop.toLowerCase().includes(query.toLowerCase()) ||
        product.color.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || product.category === category;
      const matchesSize = size === "All" || product.sizes.includes(size);
      const matchesPrice = product.price >= range.min && product.price <= range.max;

      return matchesQuery && matchesCategory && matchesSize && matchesPrice;
    });
  }, [query, category, size, priceRange]);

  return (
    <div className="min-h-screen gradient-shell noise">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="h-11 w-11 overflow-hidden rounded-full border border-oat-200 bg-white shadow-soft">
            <Image
              src="/images/revya-logo.png"
              alt="Revya logo"
              width={64}
              height={64}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div>
            <p className="font-display text-lg tracking-tight">Revya</p>
            <p className="text-xs uppercase tracking-[0.2em] text-ink-600">Modern Essentials</p>
          </div>
        </div>
        <div className="hidden items-center gap-6 text-sm text-ink-700 md:flex">
          <Link href="/shop" className="hover:text-ink-900">Shop</Link>
          <Link href="/collections" className="hover:text-ink-900">Collections</Link>
          <Link href="/about" className="hover:text-ink-900">About Revya</Link>
          <Link href="/support" className="hover:text-ink-900">Support</Link>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden rounded-full border border-ink-900 px-4 py-2 text-sm font-medium text-ink-900 transition hover:bg-ink-900 hover:text-oat-50 sm:inline-flex">
            New Arrivals
          </button>
          <CartButton />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-20">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-oat-100 px-4 py-2 text-xs uppercase tracking-[0.24em] text-ink-700">
              <span className="h-2 w-2 rounded-full bg-coral-500"></span>
              Revya Drop: Curated Every Week
            </div>
            <h1 className="font-display text-4xl leading-tight text-ink-950 md:text-5xl">
              Revya is a modern label for bold wardrobes and clean silhouettes.
            </h1>
            <p className="max-w-xl text-base text-ink-700 md:text-lg">
              Discover limited runs, capsule collections, and signature pieces. Search by drop, color, and size, then chat with our stylist bot to build your look.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-oat-50 shadow-soft hover:opacity-90">
                Shop the Drop
              </button>
              <button className="rounded-full border border-ink-900 px-6 py-3 text-sm font-semibold text-ink-900">
                Our Story
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 text-sm text-ink-700 sm:grid-cols-4">
              {brandStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl text-ink-950">{stat.value}</p>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-ink-900 p-6 text-oat-50 shadow-soft-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-oat-200">Drop of the week</p>
                <p className="mt-2 font-display text-2xl">Revya Afterglow</p>
              </div>
              <span className="rounded-full bg-oat-50/15 px-3 py-1 text-xs">5 looks</span>
            </div>
            <div className="mt-6 space-y-4">
            {products.slice(1, 4).map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-2xl bg-oat-50/10 p-4">
                <div className="h-14 w-14 rounded-2xl bg-oat-50/20"></div>
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-oat-200">{item.vibe}</p>
                </div>
                <span className="ml-auto text-sm font-semibold">{formatPrice(item.price)}</span>
              </div>
            ))}
            </div>
            <button className="mt-6 w-full rounded-2xl border border-oat-50/40 px-4 py-3 text-sm font-semibold">
              View full drop
            </button>
          </div>
        </section>

        <section className="rounded-3xl border border-oat-200 bg-white/70 p-6 shadow-soft">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-display text-xl text-ink-950">Find your next look</p>
              <p className="text-sm text-ink-600">Search by color, drop, or silhouette. Refine by size and budget.</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <div className="flex-1">
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search Revya styles, drops, colors..."
                  className="w-full rounded-2xl border border-oat-200 bg-white px-4 py-3 text-sm text-ink-900 focus:border-ink-700 focus:outline-none"
                />
              </div>
              <button className="rounded-2xl bg-ink-900 px-5 py-3 text-sm font-semibold text-oat-50">
                Search
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  category === item
                    ? "bg-ink-900 text-oat-50"
                    : "border border-oat-200 text-ink-700 hover:border-ink-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-oat-200 bg-white px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Size</p>
              <select
                value={size}
                onChange={(event) => setSize(event.target.value)}
                className="mt-2 w-full bg-transparent text-sm text-ink-900"
              >
                {sizes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="rounded-2xl border border-oat-200 bg-white px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Price Range</p>
              <select
                value={priceRange}
                onChange={(event) => setPriceRange(event.target.value)}
                className="mt-2 w-full bg-transparent text-sm text-ink-900"
              >
                {priceRanges.map((item) => (
                  <option key={item.label} value={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="rounded-2xl border border-oat-200 bg-white px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Results</p>
              <p className="mt-2 text-lg font-semibold text-ink-950">{filtered.length} styles</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((product) => (
              <article
                key={product.id}
                className="group flex h-full flex-col rounded-3xl border border-oat-200 bg-white/70 p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-ink-500">{product.drop}</p>
                    <h3 className="mt-2 font-display text-xl text-ink-950">{product.name}</h3>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badges[product.status]}`}>
                    {product.status}
                  </span>
                </div>
                <div className="mt-5 h-44 overflow-hidden rounded-2xl bg-gradient-to-br from-oat-100 to-white">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-4 text-sm text-ink-700">{product.vibe}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="rounded-full border border-oat-200 px-3 py-1">
                    Sizes {product.sizes.join(", ")}
                  </span>
                  <span className="font-semibold text-ink-950">{formatPrice(product.price)}</span>
                </div>
                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 rounded-2xl border border-ink-900 px-4 py-3 text-center text-sm font-semibold text-ink-900"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 rounded-2xl bg-ink-900 px-4 py-3 text-center text-sm font-semibold text-oat-50"
                  >
                    Add to Cart
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-3xl border border-oat-200 bg-white/80 p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Live Concierge</p>
                  <h3 className="mt-2 font-display text-2xl text-ink-950">Revya Stylist</h3>
                </div>
                <span className="rounded-full bg-lime-500 px-3 py-1 text-xs font-semibold text-ink-900">Online</span>
              </div>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-oat-100 p-4 text-sm text-ink-700">
                  Hi! Tell me your vibe and size. I will build a Revya look in two minutes.
                </div>
                <div className="rounded-2xl bg-ink-900 p-4 text-sm text-oat-50">
                  I need an outfit for a gallery night, size M, something bold.
                </div>
                <div className="rounded-2xl bg-oat-100 p-4 text-sm text-ink-700">
                  Got it. Try the Solstice Knit Dress + Glassline Blazer. Want matching accessories?
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <input
                  placeholder="Ask the Revya stylist..."
                  className="flex-1 rounded-2xl border border-oat-200 bg-white px-4 py-3 text-sm text-ink-900"
                />
                <button className="rounded-2xl bg-ink-900 px-4 py-3 text-sm font-semibold text-oat-50">
                  Send
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-ink-900 p-6 text-oat-50 shadow-soft">
              <p className="text-xs uppercase tracking-[0.3em] text-oat-200">Revya Atelier</p>
              <h3 className="mt-3 font-display text-2xl">Designed in-house, shipped fast</h3>
              <p className="mt-3 text-sm text-oat-200">
                Each drop is designed by Revya. Limited quantities, premium fabrics, and a consistent fit guide.
              </p>
              <button className="mt-6 w-full rounded-2xl bg-oat-50 px-4 py-3 text-sm font-semibold text-ink-900">
                Explore the Atelier
              </button>
            </div>
          </aside>
        </section>

        <section className="grid gap-6 rounded-3xl border border-oat-200 bg-white/70 p-6 shadow-soft lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Join the Revya list</p>
            <h2 className="mt-3 font-display text-3xl text-ink-950">Ready for the next Revya drop?</h2>
            <p className="mt-3 text-sm text-ink-700">
              Sign up for early access, exclusive styling notes, and first dibs on limited runs.
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-3">
            <button className="w-full rounded-2xl bg-ink-900 px-4 py-3 text-sm font-semibold text-oat-50">Join the waitlist</button>
            <button className="w-full rounded-2xl border border-ink-900 px-4 py-3 text-sm font-semibold text-ink-900">View size guide</button>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-10 text-sm text-ink-600 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Revya. Crafted for modern style.</p>
        <div className="flex flex-wrap gap-4">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Support</span>
        </div>
      </footer>
    </div>
  );
}
