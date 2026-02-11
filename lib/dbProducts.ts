import type { Product } from "@/lib/products";
import type { Product as PrismaProduct } from "@prisma/client";

export function mapProduct(row: PrismaProduct): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category as Product["category"],
    sizes: JSON.parse(row.sizes) as Product["sizes"],
    color: row.color,
    price: row.price,
    drop: row.drop,
    vibe: row.vibe,
    status: row.status as Product["status"],
    description: row.description,
    details: JSON.parse(row.details) as Product["details"],
    care: JSON.parse(row.care) as Product["care"],
    images: JSON.parse(row.images) as Product["images"],
    featured: row.featured,
    stock: row.stock
  };
}
