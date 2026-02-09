import Image from "next/image";
import Link from "next/link";

export default function SupportPage() {
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
            <p className="text-xs uppercase tracking-[0.2em] text-ink-600">Support</p>
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
          <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Support</p>
          <h1 className="mt-3 font-display text-3xl text-ink-950">How can we help?</h1>
          <p className="mt-3 text-sm text-ink-700">
            Here are our standard shipping and returns policies, plus a contact template you can customize.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-oat-200 bg-white p-5">
              <p className="font-display text-lg text-ink-950">Shipping</p>
              <div className="mt-3 space-y-3 text-sm text-ink-700">
                <p>Standard shipping: 3-5 business days.</p>
                <p>Express shipping: 1-2 business days (available at checkout).</p>
                <p>Free standard shipping on orders over $150.</p>
                <p>Orders ship within 24 hours on business days.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-oat-200 bg-white p-5">
              <p className="font-display text-lg text-ink-950">Returns</p>
              <div className="mt-3 space-y-3 text-sm text-ink-700">
                <p>Returns accepted within 14 days of delivery.</p>
                <p>Items must be unworn, unwashed, and in original packaging.</p>
                <p>Final sale items are not eligible for return.</p>
                <p>Refunds are issued to the original payment method within 5-7 business days.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-oat-200 bg-white p-5">
            <p className="font-display text-lg text-ink-950">Contact</p>
            <div className="mt-3 space-y-3 text-sm text-ink-700">
              <p>Email: support@revya.com</p>
              <p>Hours: Monday-Friday, 9am-6pm ET</p>
              <p>Include your order number and item name for faster support.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
