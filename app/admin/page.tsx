"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "Tops",
    sizes: "S, M, L",
    color: "",
    price: "",
    drop: "",
    vibe: "",
    status: "New",
    description: "",
    details: "",
    care: "",
    images: "",
    featured: false,
    stock: "0"
  });

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/admin/products");
        if (!response.ok) {
          const data = await response.json();
          setError(data.error || "Unauthorized");
          return;
        }
        const data = await response.json();
        setProducts(data.products || []);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  async function updateProduct(id: string, stock: number, featured: boolean) {
    const response = await fetch("/api/admin/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, stock, featured })
    });

    if (response.ok) {
      const data = await response.json();
      setProducts((prev) => prev.map((item) => (item.id === id ? data.product : item)));
    }
  }

  async function createProduct(event: React.FormEvent) {
    event.preventDefault();
    setCreating(true);
    setFormError(null);

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      sizes: form.sizes.split(",").map((value) => value.trim()).filter(Boolean),
      details: form.details.split("|").map((value) => value.trim()).filter(Boolean),
      care: form.care.split("|").map((value) => value.trim()).filter(Boolean),
      images: form.images.split(",").map((value) => value.trim()).filter(Boolean)
    };

    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const data = await response.json();
      setFormError(data.error || "Failed to create product.");
      setCreating(false);
      return;
    }

    const data = await response.json();
    setProducts((prev) => [data.product, ...prev]);
    setForm({
      id: "",
      name: "",
      category: "Tops",
      sizes: "S, M, L",
      color: "",
      price: "",
      drop: "",
      vibe: "",
      status: "New",
      description: "",
      details: "",
      care: "",
      images: "",
      featured: false,
      stock: "0"
    });
    setCreating(false);
  }

  return (
    <div className="min-h-screen gradient-shell noise">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div>
          <p className="font-display text-lg tracking-tight">Revya Admin</p>
          <p className="text-xs uppercase tracking-[0.2em] text-ink-600">Inventory</p>
        </div>
        <Link
          href="/"
          className="rounded-full border border-ink-900 px-4 py-2 text-sm font-medium text-ink-900 transition hover:bg-ink-900 hover:text-oat-50"
        >
          Back to Home
        </Link>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-20">
        <section className="rounded-3xl border border-oat-200 bg-white/70 p-6 shadow-soft">
          <h1 className="font-display text-2xl text-ink-950">Inventory</h1>
          <p className="mt-2 text-sm text-ink-600">Update stock and featured drop items.</p>

          <form onSubmit={createProduct} className="mt-6 rounded-2xl border border-oat-200 bg-white p-5">
            <p className="text-sm font-semibold text-ink-950">Add product</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input
                value={form.id}
                onChange={(event) => setForm((prev) => ({ ...prev, id: event.target.value }))}
                placeholder="Product ID (e.g. rev-10)"
                className="rounded-xl border border-oat-200 px-3 py-2 text-sm"
              />
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Name"
                className="rounded-xl border border-oat-200 px-3 py-2 text-sm"
              />
              <input
                value={form.drop}
                onChange={(event) => setForm((prev) => ({ ...prev, drop: event.target.value }))}
                placeholder="Drop"
                className="rounded-xl border border-oat-200 px-3 py-2 text-sm"
              />
              <input
                value={form.vibe}
                onChange={(event) => setForm((prev) => ({ ...prev, vibe: event.target.value }))}
                placeholder="Vibe"
                className="rounded-xl border border-oat-200 px-3 py-2 text-sm"
              />
              <input
                value={form.color}
                onChange={(event) => setForm((prev) => ({ ...prev, color: event.target.value }))}
                placeholder="Color"
                className="rounded-xl border border-oat-200 px-3 py-2 text-sm"
              />
              <input
                value={form.price}
                onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
                placeholder="Price"
                type="number"
                min={0}
                className="rounded-xl border border-oat-200 px-3 py-2 text-sm"
              />
              <input
                value={form.sizes}
                onChange={(event) => setForm((prev) => ({ ...prev, sizes: event.target.value }))}
                placeholder="Sizes (comma-separated)"
                className="rounded-xl border border-oat-200 px-3 py-2 text-sm"
              />
              <input
                value={form.images}
                onChange={(event) => setForm((prev) => ({ ...prev, images: event.target.value }))}
                placeholder="Images (comma-separated paths)"
                className="rounded-xl border border-oat-200 px-3 py-2 text-sm"
              />
              <input
                value={form.details}
                onChange={(event) => setForm((prev) => ({ ...prev, details: event.target.value }))}
                placeholder="Details (use | separator)"
                className="rounded-xl border border-oat-200 px-3 py-2 text-sm"
              />
              <input
                value={form.care}
                onChange={(event) => setForm((prev) => ({ ...prev, care: event.target.value }))}
                placeholder="Care (use | separator)"
                className="rounded-xl border border-oat-200 px-3 py-2 text-sm"
              />
              <input
                value={form.description}
                onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                placeholder="Description"
                className="rounded-xl border border-oat-200 px-3 py-2 text-sm md:col-span-2"
              />
              <input
                value={form.stock}
                onChange={(event) => setForm((prev) => ({ ...prev, stock: event.target.value }))}
                placeholder="Stock"
                type="number"
                min={0}
                className="rounded-xl border border-oat-200 px-3 py-2 text-sm"
              />
              <select
                value={form.category}
                onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                className="rounded-xl border border-oat-200 px-3 py-2 text-sm"
              >
                <option value="Outerwear">Outerwear</option>
                <option value="Tops">Tops</option>
                <option value="Bottoms">Bottoms</option>
                <option value="Dresses">Dresses</option>
                <option value="Sets">Sets</option>
              </select>
              <select
                value={form.status}
                onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
                className="rounded-xl border border-oat-200 px-3 py-2 text-sm"
              >
                <option value="New">New</option>
                <option value="Low stock">Low stock</option>
                <option value="Bestseller">Bestseller</option>
                <option value="Limited">Limited</option>
              </select>
              <label className="flex items-center gap-2 text-sm text-ink-700">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(event) => setForm((prev) => ({ ...prev, featured: event.target.checked }))}
                />
                Featured
              </label>
            </div>
            {formError && <p className="mt-3 text-sm text-coral-500">{formError}</p>}
            <button
              type="submit"
              disabled={creating}
              className="mt-4 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-oat-50"
            >
              {creating ? "Creating..." : "Add product"}
            </button>
          </form>

          {loading && <p className="mt-6 text-sm text-ink-600">Loading...</p>}
          {error && (
            <p className="mt-6 rounded-2xl border border-oat-200 bg-white p-4 text-sm text-ink-700">
              {error}. Set `ADMIN_EMAIL` in `.env` to access.
            </p>
          )}

          {!loading && !error && (
            <div className="mt-6 space-y-4">
              {products.map((product) => (
                <div key={product.id} className="rounded-2xl border border-oat-200 bg-white p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-ink-950">{product.name}</p>
                      <p className="text-xs text-ink-600">{product.drop} · {product.category}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="flex items-center gap-2 text-sm text-ink-700">
                        Stock
                        <input
                          type="number"
                          min={0}
                          defaultValue={product.stock ?? 0}
                          className="w-24 rounded-xl border border-oat-200 px-3 py-2 text-sm"
                          onChange={(event) => {
                            const value = Number(event.target.value);
                            setProducts((prev) =>
                              prev.map((item) =>
                                item.id === product.id ? ({ ...item, stock: value } as Product) : item
                              )
                            );
                          }}
                        />
                      </label>
                      <label className="flex items-center gap-2 text-sm text-ink-700">
                        Featured
                        <input
                          type="checkbox"
                          defaultChecked={Boolean(product.featured)}
                          onChange={(event) => {
                            const value = event.target.checked;
                            setProducts((prev) =>
                              prev.map((item) => (item.id === product.id ? { ...item, featured: value } : item))
                            );
                          }}
                        />
                      </label>
                      <button
                        onClick={() => updateProduct(product.id, product.stock ?? 0, Boolean(product.featured))}
                        className="rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-oat-50"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
