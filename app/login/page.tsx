"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "Login failed.");
      setLoading(false);
      return;
    }

    router.push("/cart");
  }

  return (
    <div className="min-h-screen gradient-shell noise flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-oat-200 bg-white/80 p-8 shadow-soft">
        <h1 className="font-display text-2xl text-ink-950">Welcome back</h1>
        <p className="mt-2 text-sm text-ink-700">Sign in to save your cart and manage orders.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <a
            href="/api/auth/google"
            className="flex w-full items-center justify-center rounded-2xl border border-oat-200 bg-white px-4 py-3 text-sm font-semibold text-ink-900"
          >
            Continue with Google
          </a>
          <div className="flex items-center gap-3 text-xs text-ink-500">
            <span className="h-px flex-1 bg-oat-200"></span>
            or
            <span className="h-px flex-1 bg-oat-200"></span>
          </div>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Email"
            className="w-full rounded-2xl border border-oat-200 bg-white px-4 py-3 text-sm"
          />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            className="w-full rounded-2xl border border-oat-200 bg-white px-4 py-3 text-sm"
          />
          {error && <p className="text-sm text-coral-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-ink-900 px-4 py-3 text-sm font-semibold text-oat-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-sm text-ink-600">
          No account?{" "}
          <Link className="text-ink-900 underline" href="/register">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
