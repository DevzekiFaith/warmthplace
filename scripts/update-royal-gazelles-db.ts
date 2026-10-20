import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Updating database records for Canopy & Grace: Royal Gazelles at Twilight...");

  const title = "Canopy & Grace: Royal Gazelles at Twilight";
  const description =
    "A monumental African wildlife and landscape masterpiece capturing two statuesque royal gazelles bathed in twilight serenity. Set beneath the grand spreading canopy of an ancient baobab tree with delicate hanging golden-yellow blossoms, a radiant full moon reflects across tranquil waters into the savannah distance. Rendered in rich sculptural palette-knife impasto with deep twilight indigo, radiant cadmium yellows, warm mineral ochre, and luminescent gazelle figures. Hand-signed recto and verso by Nkem Agbo, delivered with an embossed studio certificate of provenance.";

  const prods = await prisma.product.findMany({
    where: {
      OR: [
        { slug: "chromatic-field-impasto" },
        { slug: "canopy-and-grace" },
        { title: { contains: "White Stags" } },
        { title: { contains: "Royal Gazelles" } },
      ],
    },
  });

  for (const prod of prods) {
    console.log(`Updating product ID: ${prod.id}, slug: ${prod.slug}`);
    await prisma.product.update({
      where: { id: prod.id },
      data: {
        title,
        description,
        price: 50000000,
      },
    });

    // Update images
    await prisma.productImage.deleteMany({ where: { productId: prod.id } });
    await prisma.productImage.createMany({
      data: [
        {
          productId: prod.id,
          url: "/images/catalogue/canopy-and-grace-room.jpg",
          alt: "Canopy & Grace: Royal Gazelles at Twilight displayed in contemporary living room",
          position: 0,
        },
        {
          productId: prod.id,
          url: "/images/catalogue/canopy-and-grace-canvas.jpg",
          alt: "Canopy & Grace: Royal Gazelles at Twilight original impasto canvas by Nkem Agbo",
          position: 1,
        },
      ],
    });
  }

  // Synchronize dev.db and prisma/dev.db
  const prismaDb = path.resolve(process.cwd(), "prisma/dev.db");
  const rootDb = path.resolve(process.cwd(), "dev.db");
  if (fs.existsSync(prismaDb)) {
    fs.copyFileSync(prismaDb, rootDb);
    console.log("Synchronized database files.");
  }

  console.log("Database updated successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
