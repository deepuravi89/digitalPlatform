import { PrismaClient } from "@prisma/client";
import { products } from "../lib/products";

const prisma = new PrismaClient();

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        category: product.category,
        sizes: JSON.stringify(product.sizes),
        color: product.color,
        price: product.price,
        drop: product.drop,
        vibe: product.vibe,
        status: product.status,
        description: product.description,
        details: JSON.stringify(product.details),
        care: JSON.stringify(product.care),
        images: JSON.stringify(product.images),
        featured: Boolean(product.featured)
      },
      create: {
        id: product.id,
        name: product.name,
        category: product.category,
        sizes: JSON.stringify(product.sizes),
        color: product.color,
        price: product.price,
        drop: product.drop,
        vibe: product.vibe,
        status: product.status,
        description: product.description,
        details: JSON.stringify(product.details),
        care: JSON.stringify(product.care),
        images: JSON.stringify(product.images),
        featured: Boolean(product.featured),
        stock: 20
      }
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
