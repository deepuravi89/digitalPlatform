import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { mapProduct } from "@/lib/dbProducts";

export default async function CollectionsPage() {
  const rows = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  const products = rows.map(mapProduct);

  const collections = Array.from(
    products.reduce((map, product) => {
      const list = map.get(product.drop) ?? [];
      list.push(product);
      map.set(product.drop, list);
      return map;
    }, new Map<string, typeof products>())
  ).map(([drop, items]) => ({
    drop,
    count: items.length,
    hero: items[0],
    note: items[0]?.vibe ?? ""
  }));

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
            <p className="text-xs uppercase tracking-[0.2em] text-ink-600">Collections</p>
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
          <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Signature drops</p>
          <h1 className="mt-3 font-display text-3xl text-ink-950">Revya Collections</h1>
          <p className="mt-3 text-sm text-ink-700">Each drop is curated in-house. Explore the story behind each drop.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {collections.map((collection) => (
              <div key={collection.drop} className="rounded-2xl border border-oat-200 bg-white p-5">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-2xl border border-oat-200 bg-oat-100">
                    {collection.hero?.images?.[0] && (
                      <Image
                        src={collection.hero.images[0]}
                        alt={collection.drop}
                        width={120}
                        height={120}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-display text-xl text-ink-950">{collection.drop}</p>
                    <p className="text-xs text-ink-600">{collection.count} styles</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-ink-600">{collection.note}</p>
                {collection.hero && (
                  <Link
                    href={`/products/${collection.hero.id}`}
                    className="mt-4 inline-flex text-sm font-semibold text-ink-900"
                  >
                    View highlight
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
