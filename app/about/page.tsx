import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
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
            <p className="text-xs uppercase tracking-[0.2em] text-ink-600">About</p>
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
          <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Our story</p>
          <h1 className="mt-3 font-display text-3xl text-ink-950">Revya, reclaimed through design</h1>
          <div className="mt-4 space-y-4 text-sm text-ink-700">
            <p>She gave. And gave. And gave.</p>
            <p>Stitching the world together in silence, her hands knew magic, but the world never knew her name.</p>
            <p>She wore strength, not comfort. She wore roles, not recognition. Her identity was always present, just never worn.</p>
            <p>
              Revya was born from her silence. It carries the voice she never raised, the colors she never chose, the
              elegance she never allowed herself to own.
            </p>
            <p>This is not just a boutique. It is a return. A reclaiming. A resurrection.</p>
            <p>Through every thread, a truth. Through every design, a story. Through every piece, a woman who finally says: This is me.</p>
            <p className="font-display text-base text-ink-900">Revya. Once unworn. Now reclaimed — through design.</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-oat-200 bg-white p-5">
              <p className="font-display text-lg text-ink-950">Reclamation</p>
              <p className="mt-2 text-sm text-ink-600">Design as a return to self, identity, and voice.</p>
            </div>
            <div className="rounded-2xl border border-oat-200 bg-white p-5">
              <p className="font-display text-lg text-ink-950">Dignity</p>
              <p className="mt-2 text-sm text-ink-600">Clothing that honors the woman wearing it.</p>
            </div>
            <div className="rounded-2xl border border-oat-200 bg-white p-5">
              <p className="font-display text-lg text-ink-950">Craft</p>
              <p className="mt-2 text-sm text-ink-600">Intentional silhouettes, thoughtful details, lasting quality.</p>
            </div>
            <div className="rounded-2xl border border-oat-200 bg-white p-5">
              <p className="font-display text-lg text-ink-950">Story</p>
              <p className="mt-2 text-sm text-ink-600">Every piece carries a narrative, not just a look.</p>
            </div>
            <div className="rounded-2xl border border-oat-200 bg-white p-5">
              <p className="font-display text-lg text-ink-950">Presence</p>
              <p className="mt-2 text-sm text-ink-600">A quiet boldness that is worn, not announced.</p>
            </div>
            <div className="rounded-2xl border border-oat-200 bg-white p-5">
              <p className="font-display text-lg text-ink-950">Care</p>
              <p className="mt-2 text-sm text-ink-600">Respect for the hands that create and the lives that wear.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
