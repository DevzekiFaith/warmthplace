import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const updates = [
  {
    slug: "kinetic-drummers",
    title: "Tree of Life: Sacred Ochre Canopy",
    heightCm: 140,
    widthCm: 80,
    depthCm: 5.0,
    orientation: "PORTRAIT",
    images: [
      {
        url: "/images/catalogue/tree-of-life-ochre.jpg",
        alt: "Tree of Life: Sacred Ochre Canopy pure oil impasto canvas by Nkem Agbo",
        position: 0,
      },
      {
        url: "/images/catalogue/tree-of-life-ochre-room.jpg",
        alt: "Tree of Life: Sacred Ochre Canopy displayed in contemporary living room interior",
        position: 1,
      },
    ],
  },
  {
    slug: "emerald-solitude",
    title: "Emerald Solitude: The Chartreuse Crown",
    heightCm: 140,
    widthCm: 75,
    depthCm: 5.0,
    orientation: "PORTRAIT",
    images: [
      {
        url: "/images/catalogue/emerald-solitude.jpg",
        alt: "Emerald Solitude: The Chartreuse Crown pure oil impasto canvas by Nkem Agbo",
        position: 0,
      },
      {
        url: "/images/catalogue/emerald-solitude-room.jpg",
        alt: "Emerald Solitude: The Chartreuse Crown displayed in luxury gallery interior",
        position: 1,
      },
    ],
  },
  {
    slug: "golden-harvest-matriarchs",
    title: "Golden Harvest of the Matriarchs",
    heightCm: 105,
    widthCm: 120,
    depthCm: 5.0,
    orientation: "LANDSCAPE",
    images: [
      {
        url: "/images/catalogue/golden-harvest-matriarchs.jpg",
        alt: "Golden Harvest of the Matriarchs pure oil impasto canvas by Nkem Agbo",
        position: 0,
      },
      {
        url: "/images/catalogue/golden-harvest-matriarchs-room.jpg",
        alt: "Golden Harvest of the Matriarchs displayed in contemporary living room interior",
        position: 1,
      },
    ],
  },
  {
    slug: "oya-the-dancer",
    title: "Oya, the Dancer",
    heightCm: 130,
    widthCm: 90,
    depthCm: 5.0,
    orientation: "PORTRAIT",
    images: [
      {
        url: "/images/catalogue/oya-the-dancer.jpg",
        alt: "Oya, the Dancer pure oil impasto canvas by Nkem Agbo",
        position: 0,
      },
      {
        url: "/images/catalogue/oya-the-dancer-room.jpg",
        alt: "Oya, the Dancer displayed in luxury living interior",
        position: 1,
      },
    ],
  },
  {
    slug: "chromatic-bloom",
    title: "Chromatic Bloom",
    heightCm: 150,
    widthCm: 80,
    depthCm: 5.0,
    orientation: "PORTRAIT",
    images: [
      {
        url: "/images/catalogue/chromatic-bloom.jpg",
        alt: "Chromatic Bloom pure oil impasto canvas by Nkem Agbo",
        position: 0,
      },
      {
        url: "/images/catalogue/chromatic-bloom-room.jpg",
        alt: "Chromatic Bloom displayed in contemporary residence interior",
        position: 1,
      },
    ],
  },
  {
    slug: "flora-genesis",
    title: "Flora Genesis",
    heightCm: 110,
    widthCm: 110,
    depthCm: 5.0,
    orientation: "SQUARE",
    images: [
      {
        url: "/images/catalogue/flora-genesis.jpg",
        alt: "Flora Genesis pure oil impasto canvas by Nkem Agbo",
        position: 0,
      },
      {
        url: "/images/catalogue/flora-genesis-room.jpg",
        alt: "Flora Genesis displayed in contemporary living room interior",
        position: 1,
      },
    ],
  },
  {
    slug: "obsidian-storm",
    title: "Obsidian Storm",
    heightCm: 130,
    widthCm: 100,
    depthCm: 5.0,
    orientation: "PORTRAIT",
    images: [
      {
        url: "/images/catalogue/obsidian-storm.jpg",
        alt: "Obsidian Storm pure sculptural impasto canvas by Nkem Agbo",
        position: 0,
      },
      {
        url: "/images/catalogue/obsidian-storm-room.jpg",
        alt: "Obsidian Storm displayed in luxury architectural interior",
        position: 1,
      },
    ],
  },
  {
    slug: "ceremonial-african-drummers",
    title: "Ceremonial African Drummers & Dancers",
    heightCm: 130,
    widthCm: 90,
    depthCm: 5.0,
    orientation: "LANDSCAPE",
    images: [
      {
        url: "/images/catalogue/ceremonial-african-drummers.jpg",
        alt: "Ceremonial African Drummers & Dancers pure oil impasto canvas by Nkem Agbo",
        position: 0,
      },
      {
        url: "/images/catalogue/ceremonial-african-drummers-room.jpg",
        alt: "Ceremonial African Drummers & Dancers displayed in contemporary living room interior",
        position: 1,
      },
    ],
  },
  {
    slug: "indigo-tide-evening-lantern",
    title: "Ceremonial Rhythm: The Emerald Drummer",
    heightCm: 135,
    widthCm: 70,
    depthCm: 5.0,
    orientation: "PORTRAIT",
    images: [
      {
        url: "/images/catalogue/indigo-tide.jpg",
        alt: "Ceremonial Rhythm: The Emerald Drummer pure oil impasto canvas by Nkem Agbo",
        position: 0,
      },
      {
        url: "/images/catalogue/indigo-tide-room.jpg",
        alt: "Ceremonial Rhythm: The Emerald Drummer displayed in modern gallery interior",
        position: 1,
      },
    ],
  },
];

async function main() {
  console.log("Updating database records for all 9 requested artworks...");

  for (const item of updates) {
    const product = await prisma.product.findUnique({
      where: { slug: item.slug },
      include: { images: true },
    });

    if (!product) {
      console.log(`Product with slug '${item.slug}' not found, skipping.`);
      continue;
    }

    // Delete existing images for this product
    await prisma.productImage.deleteMany({
      where: { productId: product.id },
    });

    // Update product fields and recreate images
    await prisma.product.update({
      where: { id: product.id },
      data: {
        title: item.title,
        heightCm: item.heightCm,
        widthCm: item.widthCm,
        depthCm: item.depthCm,
        orientation: item.orientation,
        images: {
          create: item.images.map((img) => ({
            url: img.url,
            alt: img.alt,
            position: img.position,
          })),
        },
      },
    });

    console.log(`Updated '${item.title}' (${item.slug}): ${item.heightCm}H × ${item.widthCm}W cm, ${item.images.length} images.`);
  }

  // Synchronize dev.db and prisma/dev.db
  const prismaDb = path.join(__dirname, "..", "prisma", "dev.db");
  const rootDb = path.join(__dirname, "..", "dev.db");

  if (fs.existsSync(prismaDb)) {
    fs.copyFileSync(prismaDb, rootDb);
    console.log("Synchronized prisma/dev.db -> dev.db");
  } else if (fs.existsSync(rootDb)) {
    fs.copyFileSync(rootDb, prismaDb);
    console.log("Synchronized dev.db -> prisma/dev.db");
  }

  console.log("Database update complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
