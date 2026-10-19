import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Checking artist Tariq Osei...");
  const tariq = await prisma.artist.findUnique({
    where: { slug: "tariq-osei" },
    include: { products: true },
  });

  if (!tariq) {
    console.log("Tariq Osei not found in DB.");
    return;
  }

  console.log(`Found Tariq Osei (${tariq.id}) with ${tariq.products.length} products:`);
  tariq.products.forEach((p) => {
    console.log(`  - ${p.title} (${p.slug})`);
  });

  // Get Nkem Agbo or Amina Adeleke or delete/reassign
  const nkem = await prisma.artist.findUnique({ where: { slug: "nkem-agbo" } });

  // If there are products, reassign or delete
  for (const p of tariq.products) {
    if (nkem) {
      console.log(`  Reassigning ${p.slug} to Nkem Agbo...`);
      await prisma.product.update({
        where: { id: p.id },
        data: { artistId: nkem.id },
      });
    } else {
      console.log(`  Deleting product ${p.slug}...`);
      await prisma.productImage.deleteMany({ where: { productId: p.id } });
      await prisma.product.delete({ where: { id: p.id } });
    }
  }

  // Set published: false and delete or unpublish Tariq Osei
  console.log("Deleting/Unpublishing Tariq Osei from database...");
  await prisma.artist.delete({
    where: { id: tariq.id },
  });
  console.log("  [OK] Tariq Osei removed from database.");

  // Sync DB files
  const prismaDb = path.resolve(process.cwd(), "prisma/dev.db");
  const rootDb = path.resolve(process.cwd(), "dev.db");
  if (fs.existsSync(prismaDb)) {
    fs.copyFileSync(prismaDb, rootDb);
  }
  console.log("Database files synchronized.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
