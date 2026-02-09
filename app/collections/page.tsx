import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    name: "Afterglow",
    note: "Evening silhouettes with sculpted knits and satin textures."
  },
  {
    name: "Calm Seas",
    note: "Lightweight linen and relaxed lounge sets."
  },
  {
    name: "Cityline",
    note: "Structured tailoring for day-to-night."    
  },
  {
    name: "Daylight",
    note: "Breathable layers and sun-ready tones."    
  }
];

export default function CollectionsPage() {
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
          <p className="mt-3 text-sm text-ink-700">
            Feature each seasonal drop with editorial imagery and a story-led intro.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {collections.map((collection) => (
              <div
                key={collection.name}
                className="rounded-2xl border border-oat-200 bg-white p-5"
              >
                <p className="font-display text-xl text-ink-950">{collection.name}</p>
                <p className="mt-2 text-sm text-ink-600">{collection.note}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
