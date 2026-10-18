import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const updated = await prisma.artist.updateMany({
    where: {
      slug: { in: ["nkem-agbo", "tariq-osei"] },
    },
    data: {
      portraitImage: "/images/catalogue/solar-vortex.jpg",
      coverImage: "/images/catalogue/solar-vortex.jpg",
    },
  });
  console.log(`Updated ${updated.count} artist records to use /images/catalogue/solar-vortex.jpg`);

  const artists = await prisma.artist.findMany({
    where: { slug: { in: ["nkem-agbo", "tariq-osei"] } },
    select: { id: true, name: true, slug: true, portraitImage: true },
  });
  console.log("Current state in DB:", artists);
}

main()
  .catch((err) => {
    console.error("Error updating artist portrait:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
