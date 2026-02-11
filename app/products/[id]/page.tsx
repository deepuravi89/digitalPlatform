import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartForm from "@/components/AddToCartForm";
import { prisma } from "@/lib/prisma";
import { mapProduct } from "@/lib/dbProducts";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const row = await prisma.product.findUnique({ where: { id: params.id } });
  if (!row) notFound();
  const product = mapProduct(row);

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
        <Link
          href="/"
          className="rounded-full border border-ink-900 px-4 py-2 text-sm font-medium text-ink-900 transition hover:bg-ink-900 hover:text-oat-50"
        >
          Back to Shop
        </Link>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink-500">
              <span>{product.drop}</span>
              <span className="h-1 w-1 rounded-full bg-ink-400"></span>
              <span>{product.category}</span>
            </div>
            <h1 className="mt-4 font-display text-4xl text-ink-950">{product.name}</h1>
            <p className="mt-3 text-base text-ink-700">{product.description}</p>

            <div className="mt-6 overflow-hidden rounded-3xl border border-oat-200 bg-gradient-to-br from-oat-100 to-white shadow-soft">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={1200}
                height={1400}
                className="h-72 w-full object-cover"
                priority
              />
            </div>

            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image) => (
                <div key={image} className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-oat-200">
                  <Image src={image} alt={product.name} width={200} height={200} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-oat-200 bg-white/70 p-5 shadow-soft">
                <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Details</p>
                <ul className="mt-4 space-y-2 text-sm text-ink-700">
                  {product.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-oat-200 bg-white/70 p-5 shadow-soft">
                <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Care</p>
                <ul className="mt-4 space-y-2 text-sm text-ink-700">
                  {product.care.map((care) => (
                    <li key={care}>{care}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-oat-200 bg-white/80 p-5 shadow-soft">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-ink-500">{product.status}</p>
                  <p className="mt-2 text-3xl font-semibold text-ink-950">${product.price}</p>
                </div>
                <span className="rounded-full border border-oat-200 px-3 py-1 text-xs text-ink-600">{product.color}</span>
              </div>
              <p className="mt-3 text-sm text-ink-700">{product.vibe}</p>
            </div>

            <AddToCartForm product={product} />

            <div className="rounded-3xl bg-ink-900 p-6 text-oat-50 shadow-soft">
              <p className="text-xs uppercase tracking-[0.3em] text-oat-200">Stylist note</p>
              <p className="mt-3 text-sm text-oat-100">
                Pair with the Glassline Blazer for gallery nights or layer with the Arc Shift Shirt for a refined day look.
              </p>
              <button className="mt-5 w-full rounded-2xl bg-oat-50 px-4 py-3 text-sm font-semibold text-ink-900">
                Chat with Revya Stylist
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
