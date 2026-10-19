import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Checking artist Adebayo Olufemi...");
  const adebayo = await prisma.artist.findUnique({
    where: { slug: "adebayo-olufemi" },
    include: { products: true },
  });

  if (!adebayo) {
    console.log("Adebayo Olufemi not found in DB.");
  } else {
    console.log(`Found Adebayo Olufemi (${adebayo.id}) with ${adebayo.products.length} products:`);
    adebayo.products.forEach((p) => {
      console.log(`  - ${p.title} (${p.slug})`);
    });

    const nkem = await prisma.artist.findUnique({ where: { slug: "nkem-agbo" } });

    // If there are products, reassign to Nkem Agbo
    for (const p of adebayo.products) {
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

    // Delete artist from database
    console.log("Deleting Adebayo Olufemi from database...");
    await prisma.artist.delete({
      where: { id: adebayo.id },
    });
    console.log("  [OK] Adebayo Olufemi successfully removed from database.");
  }

  // Sync DB files
  const prismaDb = path.resolve(process.cwd(), "prisma/dev.db");
  const rootDb = path.resolve(process.cwd(), "dev.db");
  if (fs.existsSync(prismaDb)) {
    fs.copyFileSync(prismaDb, rootDb);
    console.log("  [OK] Synchronized database files.");
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
