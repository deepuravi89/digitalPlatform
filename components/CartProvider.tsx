"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";

export type CartItem = {
  productId: string;
  size: "XS" | "S" | "M" | "L" | "XL";
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  user: { id: string; email: string } | null;
  loading: boolean;
  addItem: (product: Product, size: CartItem["size"], quantity?: number) => void;
  updateQuantity: (productId: string, size: CartItem["size"], quantity: number) => void;
  removeItem: (productId: string, size: CartItem["size"]) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "revya-cart";

const readFromStorage = () => {
  if (typeof window === "undefined") return [] as CartItem[];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
};

const writeToStorage = (items: CartItem[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const response = await fetch("/api/auth/me");
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
          const localItems = readFromStorage();
          if (localItems.length > 0) {
            await Promise.all(
              localItems.map((item) =>
                fetch("/api/cart", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(item)
                })
              )
            );
            writeToStorage([]);
          }
          const cartResponse = await fetch("/api/cart");
          const cartData = await cartResponse.json();
          setItems(cartData.items || []);
        } else {
          setItems(readFromStorage());
        }
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  useEffect(() => {
    if (!user) {
      writeToStorage(items);
    }
  }, [items, user]);

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
      user,
      loading,
      addItem: (product, size, quantity = 1) => {
        setItems((prev) => {
          const existing = prev.find((item) => item.productId === product.id && item.size === size);
          if (existing) {
            return prev.map((item) =>
              item.productId === product.id && item.size === size
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          return [...prev, { productId: product.id, size, quantity }];
        });

        if (user) {
          fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: product.id, size, quantity })
          });
        }
      },
      updateQuantity: (productId, size, quantity) => {
        setItems((prev) =>
          prev
            .map((item) =>
              item.productId === productId && item.size === size
                ? { ...item, quantity }
                : item
            )
            .filter((item) => item.quantity > 0)
        );

        if (user) {
          fetch("/api/cart", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, size, quantity })
          });
        }
      },
      removeItem: (productId, size) => {
        setItems((prev) => prev.filter((item) => !(item.productId === productId && item.size === size)));

        if (user) {
          fetch("/api/cart", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, size })
          });
        }
      },
      clear: () => {
        setItems([]);
        if (user) {
          fetch("/api/cart", { method: "DELETE" });
        }
      }
    };
  }, [items, user, loading]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
