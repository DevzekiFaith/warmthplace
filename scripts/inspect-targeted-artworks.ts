import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const slugs = [
    "kinetic-drummers",
    "emerald-solitude",
    "golden-harvest-matriarchs",
    "oya-the-dancer",
    "chromatic-bloom",
    "flora-genesis",
    "obsidian-storm",
    "ceremonial-african-drummers",
    "indigo-tide-evening-lantern",
  ];

  for (const s of slugs) {
    const p = await prisma.product.findUnique({
      where: { slug: s },
      include: { images: { orderBy: { position: "asc" } }, artist: true },
    });
    if (p) {
      console.log(`[${p.slug}]`);
      console.log(`  Title: ${p.title}`);
      console.log(`  Artist: ${p.artist?.name}`);
      console.log(`  Price: ₦${(p.price / 100).toLocaleString()} (${p.price} kobo)`);
      console.log(`  Dims: ${p.heightCm}H × ${p.widthCm}W cm`);
      console.log(`  Images (${p.images.length}):`);
      p.images.forEach((img, i) => console.log(`    [${i}] ${img.url} (${img.alt})`));
      console.log("");
    } else {
      console.log(`NOT FOUND: ${s}\n`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
