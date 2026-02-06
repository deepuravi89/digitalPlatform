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

  useEffect(() => {
    setItems(readFromStorage());
  }, []);

  useEffect(() => {
    writeToStorage(items);
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
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
      },
      removeItem: (productId, size) => {
        setItems((prev) => prev.filter((item) => !(item.productId === productId && item.size === size)));
      },
      clear: () => setItems([])
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
