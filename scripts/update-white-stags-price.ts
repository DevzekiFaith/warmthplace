import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Updating price for Canopy & Grace: White Stags at Twilight to 500,000 NGN (50,000,000 kobo)...");

  // Find products matching either slug or title
  const prods = await prisma.product.findMany({
    where: {
      OR: [
        { slug: "chromatic-field-impasto" },
        { slug: "canopy-and-grace" },
        { title: { contains: "White Stags" } },
      ],
    },
  });

  console.log(`Found ${prods.length} matching products:`);
  for (const prod of prods) {
    console.log(`- ID: ${prod.id}, Slug: ${prod.slug}, Title: ${prod.title}, Old Price: ${prod.price}`);
    await prisma.product.update({
      where: { id: prod.id },
      data: {
        price: 50000000, // ₦500,000 NGN (50,000,000 kobo)
      },
    });
    console.log(`  -> Updated to 50000000 (₦500,000)`);
  }

  // Sync dev.db and prisma/dev.db
  const prismaDb = path.resolve(process.cwd(), "prisma/dev.db");
  const rootDb = path.resolve(process.cwd(), "dev.db");
  if (fs.existsSync(prismaDb)) {
    fs.copyFileSync(prismaDb, rootDb);
    console.log("Synchronized database files.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
