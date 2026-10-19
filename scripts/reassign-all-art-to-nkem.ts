import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Fetching Nkem Agbo...");
  let nkem = await prisma.artist.findUnique({ where: { slug: "nkem-agbo" } });
  if (!nkem) {
    nkem = await prisma.artist.create({
      data: {
        slug: "nkem-agbo",
        name: "Nkem Agbo",
        discipline: "Contemporary Painter & Mixed-Media Impasto Colorist",
        location: "Enugu & Lagos, Nigeria",
        shortBio:
          "Master of monumental textured impasto, elemental coastal mythologies, and luminous mineral pigments on canvas.",
        bio: "Nkem Agbo is an acclaimed contemporary Nigerian visual artist whose monumental canvas works explore physical texture, obsidian topographies, and luminous coastal mythologies. Working with heavy-body acrylics, palette-knife impasto, and natural pigment slips, Agbo builds sculpted relief surfaces that capture West Africa's vibrant architectural and natural landscapes.",
        portraitImage: "/images/catalogue/tree-of-life-ochre.jpg",
        coverImage: "/images/catalogue/tree-of-life-ochre.jpg",
        position: 1,
        published: true,
        isSample: true,
      },
    });
  }

  // 1. Reassign all products in department ART to Nkem Agbo
  const artProducts = await prisma.product.findMany({
    where: { department: "ART" },
    include: { artist: true, images: true },
  });

  console.log(`Found ${artProducts.length} ART products:`);
  for (const prod of artProducts) {
    console.log(`  Updating ${prod.slug} (current artist: ${prod.artist?.name || 'none'}) -> Nkem Agbo`);
    
    // Update product artistId
    await prisma.product.update({
      where: { id: prod.id },
      data: {
        artistId: nkem.id,
      },
    });

    // Update images alt text if mentioning other artists
    for (const img of prod.images) {
      let newAlt = img.alt;
      newAlt = newAlt.replace(/Amina E\. Adeleke/g, "Nkem Agbo");
      newAlt = newAlt.replace(/Amina Adeleke/g, "Nkem Agbo");
      newAlt = newAlt.replace(/Tariq Osei/g, "Nkem Agbo");
      newAlt = newAlt.replace(/Adebayo Olufemi/g, "Nkem Agbo");
      newAlt = newAlt.replace(/Zainab Chinedu/g, "Nkem Agbo");
      newAlt = newAlt.replace(/Kofi Mensah/g, "Nkem Agbo");
      newAlt = newAlt.replace(/Chinwe Okoli/g, "Nkem Agbo");
      
      if (newAlt !== img.alt) {
        await prisma.productImage.update({
          where: { id: img.id },
          data: { alt: newAlt },
        });
      }
    }
  }

  // Sync DB files
  const prismaDb = path.resolve(process.cwd(), "prisma/dev.db");
  const rootDb = path.resolve(process.cwd(), "dev.db");
  if (fs.existsSync(prismaDb)) {
    fs.copyFileSync(prismaDb, rootDb);
    console.log("  [OK] Synchronized database files.");
  }

  console.log("All artwork attribution successfully updated to Nkem Agbo.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
