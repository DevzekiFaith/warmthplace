import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Removing canvas and leaving only in-situ room mockup for Ceremonial African Drummers & Dancers...");

  // 1. Find product
  const product = await prisma.product.findUnique({
    where: { slug: "ceremonial-african-drummers" },
    include: { images: true },
  });

  if (product) {
    console.log(`Found product: ${product.title} (${product.slug}) with ${product.images.length} images:`);
    product.images.forEach((img) => console.log(`  - pos ${img.position}: ${img.url}`));

    // Delete existing images
    await prisma.productImage.deleteMany({
      where: { productId: product.id },
    });

    // Create single in-situ image
    await prisma.productImage.create({
      data: {
        productId: product.id,
        url: "/images/hero/hero-african-drummers.jpg",
        alt: "Ceremonial African Drummers & Dancers canvas by Nkem Agbo",
        position: 0,
      },
    });

    console.log("[OK] Updated product images in database to in-situ only.");
  } else {
    console.log("[WARN] Product ceremonial-african-drummers not found in database.");
  }

  // 2. Backup canvas and copy in-situ to artwork-african-drummers.jpg and ceremonial-african-drummers.jpg
  const heroRoom = path.resolve("public/images/hero/hero-african-drummers.jpg");
  const heroCanvas = path.resolve("public/images/hero/artwork-african-drummers.jpg");
  const heroCanvasBackup = path.resolve("public/images/hero/artwork-african-drummers-canvas-backup.jpg");
  const catCanvas = path.resolve("public/images/catalogue/ceremonial-african-drummers.jpg");

  if (fs.existsSync(heroCanvas) && !fs.existsSync(heroCanvasBackup)) {
    fs.copyFileSync(heroCanvas, heroCanvasBackup);
    console.log("[OK] Backed up original canvas to artwork-african-drummers-canvas-backup.jpg");
  }

  if (fs.existsSync(heroRoom)) {
    fs.copyFileSync(heroRoom, heroCanvas);
    fs.copyFileSync(heroRoom, catCanvas);
    console.log("[OK] Synchronized artwork-african-drummers.jpg and ceremonial-african-drummers.jpg with in-situ image.");
  }

  // 3. Sync prisma/dev.db and dev.db
  const prismaDb = path.resolve(process.cwd(), "prisma/dev.db");
  const rootDb = path.resolve(process.cwd(), "dev.db");
  if (fs.existsSync(prismaDb)) {
    fs.copyFileSync(prismaDb, rootDb);
    console.log("[OK] Synchronized dev.db files.");
  }

  console.log("Completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
