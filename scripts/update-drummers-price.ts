import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Updating price for Ceremonial African Drummers & Dancers to 500,000 NGN (50,000,000 kobo)...");

  const product = await prisma.product.findUnique({
    where: { slug: "ceremonial-african-drummers" },
  });

  if (product) {
    console.log(`Found product: ${product.title} (old price: ${product.price})`);
    await prisma.product.update({
      where: { id: product.id },
      data: {
        price: 50000000, // ₦500,000 NGN (50,000,000 kobo)
      },
    });
    console.log("Updated product price to 50,000,000 kobo (₦500,000).");
  } else {
    console.log("[WARN] Product ceremonial-african-drummers not found in database.");
  }

  // Synchronize dev.db and prisma/dev.db
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
