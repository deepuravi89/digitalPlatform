import "./globals.css";
import type { Metadata } from "next";
import { CartProvider } from "@/components/CartProvider";

export const metadata: Metadata = {
  title: "Revya",
  description: "Revya is a modern clothing brand with curated drops, search, and concierge chat."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
