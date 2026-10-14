import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Removing The Jazz Trio Session & Lagos Jazz Trio from collections & art...");

  const slugsToRemove = ["the-jazz-trio-session", "lagos-jazz-trio"];

  for (const slug of slugsToRemove) {
    const prod = await prisma.product.findUnique({
      where: { slug },
      include: { images: true, collections: true },
    });

    if (prod) {
      // Disconnect all collections
      await prisma.product.update({
        where: { id: prod.id },
        data: {
          collections: {
            set: [],
          },
        },
      });

      // Delete images
      await prisma.productImage.deleteMany({
        where: { productId: prod.id },
      });

      // Delete the product
      await prisma.product.delete({
        where: { id: prod.id },
      });

      console.log(`  [DELETED] ${slug} successfully removed.`);
    } else {
      console.log(`  [INFO] ${slug} not found in database.`);
    }
  }

  // Synchronize database files
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
