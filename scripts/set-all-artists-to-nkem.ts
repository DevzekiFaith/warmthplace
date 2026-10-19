import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Updating all artist and designer names to Nkem Agbo...");

  // 1. Update all artists in database to have name 'Nkem Agbo'
  const artists = await prisma.artist.findMany();
  for (const a of artists) {
    console.log(`  Updating artist ${a.slug} (${a.name}) -> name: 'Nkem Agbo'`);
    await prisma.artist.update({
      where: { id: a.id },
      data: {
        name: "Nkem Agbo",
        published: true,
      },
    });
  }

  // 2. Ensure zainab-chinedu has the newly uploaded images and clean bio
  const zainab = await prisma.artist.findUnique({ where: { slug: "zainab-chinedu" } });
  if (zainab) {
    await prisma.artist.update({
      where: { id: zainab.id },
      data: {
        name: "Nkem Agbo",
        bio: "Nkem Agbo crafts monumental figurative works centered on community cohesion and ceremonial celebration. Her layered surfaces evoke sun-baked earth, ritual attire, and ancestral resonance.",
        portraitImage: "/images/hero/artwork-african-drummers.jpg",
        coverImage: "/images/hero/hero-african-drummers.jpg",
      },
    });
    console.log("  [OK] Updated zainab-chinedu profile images to new uploaded artwork.");
  }

  // 3. Update all products across both ART and DECOR to ensure all artist relations point to Nkem Agbo
  const nkem = await prisma.artist.findUnique({ where: { slug: "nkem-agbo" } });
  if (nkem) {
    await prisma.product.updateMany({
      data: {
        artistId: nkem.id,
      },
    });
    console.log("  [OK] Assigned all products to Nkem Agbo.");
  }

  // 4. Update ceremonial-african-drummers images
  const drummersProd = await prisma.product.findUnique({
    where: { slug: "ceremonial-african-drummers" },
    include: { images: true },
  });

  if (drummersProd) {
    await prisma.productImage.deleteMany({ where: { productId: drummersProd.id } });
    await prisma.productImage.createMany({
      data: [
        {
          productId: drummersProd.id,
          url: "/images/hero/artwork-african-drummers.jpg",
          alt: "Ceremonial African Drummers & Dancers canvas by Nkem Agbo",
          position: 0,
        },
        {
          productId: drummersProd.id,
          url: "/images/hero/hero-african-drummers.jpg",
          alt: "Ceremonial African Drummers & Dancers displayed in room interior",
          position: 1,
        },
      ],
    });
    console.log("  [OK] Updated ceremonial-african-drummers product images.");
  }

  // 5. Synchronize dev.db and prisma/dev.db
  const prismaDb = path.resolve(process.cwd(), "prisma/dev.db");
  const rootDb = path.resolve(process.cwd(), "dev.db");
  if (fs.existsSync(prismaDb)) {
    fs.copyFileSync(prismaDb, rootDb);
    console.log("  [OK] Synchronized database files.");
  }

  console.log("Finished updating all art designers to Nkem Agbo.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
