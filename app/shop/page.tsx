import Image from "next/image";
import Link from "next/link";

export default function ShopPage() {
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
            <p className="text-xs uppercase tracking-[0.2em] text-ink-600">Shop</p>
          </div>
        </div>
        <Link
          href="/"
          className="rounded-full border border-ink-900 px-4 py-2 text-sm font-medium text-ink-900 transition hover:bg-ink-900 hover:text-oat-50"
        >
          Back to Home
        </Link>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-20">
        <section className="rounded-3xl border border-oat-200 bg-white/70 p-8 shadow-soft">
          <p className="text-xs uppercase tracking-[0.2em] text-ink-500">All styles</p>
          <h1 className="mt-3 font-display text-3xl text-ink-950">Revya Shop</h1>
          <p className="mt-3 text-sm text-ink-700">
            This page can hold category navigation, featured drops, and your full catalog.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full bg-ink-900 px-5 py-2 text-sm font-semibold text-oat-50"
            >
              Browse all products
            </Link>
            <Link
              href="/collections"
              className="rounded-full border border-ink-900 px-5 py-2 text-sm font-semibold text-ink-900"
            >
              View collections
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
