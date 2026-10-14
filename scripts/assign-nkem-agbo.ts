import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Updating artist attribution to Nkem Agbo for canvas artworks...");

  // 1. Create or update artist Nkem Agbo
  let nkemAgbo = await prisma.artist.findUnique({
    where: { slug: "nkem-agbo" },
  });

  if (!nkemAgbo) {
    nkemAgbo = await prisma.artist.create({
      data: {
        slug: "nkem-agbo",
        name: "Nkem Agbo",
        discipline: "Contemporary Painter & Mixed-Media Impasto Colorist",
        location: "Enugu & Lagos, Nigeria",
        shortBio:
          "Master of monumental textured impasto, elemental coastal mythologies, and luminous mineral pigments on canvas.",
        bio: "Nkem Agbo is an acclaimed contemporary Nigerian visual artist whose monumental canvas works explore physical texture, obsidian topographies, and luminous coastal mythologies. Working with heavy-body acrylics, palette-knife impasto, and natural pigment slips, Agbo builds sculpted relief surfaces that capture West Africa's vibrant architectural and natural landscapes.",
        portraitImage: "/images/catalogue/indigo-tide.jpg",
        coverImage: "/images/catalogue/indigo-tide.jpg",
        position: 2,
        published: true,
        isSample: true,
      },
    });
    console.log("  [OK] Created artist Nkem Agbo:", nkemAgbo.id);
  } else {
    nkemAgbo = await prisma.artist.update({
      where: { id: nkemAgbo.id },
      data: {
        name: "Nkem Agbo",
        discipline: "Contemporary Painter & Mixed-Media Impasto Colorist",
        location: "Enugu & Lagos, Nigeria",
        shortBio:
          "Master of monumental textured impasto, elemental coastal mythologies, and luminous mineral pigments on canvas.",
        published: true,
      },
    });
    console.log("  [OK] Updated artist Nkem Agbo:", nkemAgbo.id);
  }

  // 2. Find Tariq Osei
  const tariq = await prisma.artist.findUnique({
    where: { slug: "tariq-osei" },
  });

  if (tariq) {
    // 3. Find canvas artworks by Tariq Osei
    const canvasSlugs = [
      "indigo-tide-evening-lantern",
      "obsidian-storm",
      "chromatic-bloom",
      "chromatic-field-impasto",
    ];

    for (const slug of canvasSlugs) {
      const prod = await prisma.product.findUnique({ where: { slug } });
      if (prod) {
        await prisma.product.update({
          where: { slug },
          data: {
            artistId: nkemAgbo.id,
          },
        });
        console.log(`  [OK] Reassigned canvas artwork '${slug}' to Nkem Agbo.`);
      } else {
        console.log(`  [INFO] Product '${slug}' not found in DB.`);
      }
    }
  }

  // Sync dev.db with prisma/dev.db
  const prismaDb = path.resolve(process.cwd(), "prisma/dev.db");
  const rootDb = path.resolve(process.cwd(), "dev.db");
  if (fs.existsSync(prismaDb)) {
    fs.copyFileSync(prismaDb, rootDb);
    console.log("  [OK] Synchronized database files.");
  }

  console.log("Finished updating artist to Nkem Agbo.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
