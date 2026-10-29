const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function updateDb(dbPath) {
  console.log(`Updating database at: ${dbPath}`);
  const client = new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbPath}`,
      },
    },
  });

  try {
    // 0. Remove blurry artworks meadow-symphony-panoramic-impasto & white-stags-twilight-glade
    for (const blurrySlug of ['meadow-symphony-panoramic-impasto', 'white-stags-twilight-glade']) {
      const blurry = await client.product.findUnique({
        where: { slug: blurrySlug },
      });
      if (blurry) {
        await client.productImage.deleteMany({ where: { productId: blurry.id } });
        await client.product.delete({ where: { id: blurry.id } });
        console.log(`Deleted ${blurrySlug}`);
      }
    }

    // 1. Update Flora Genesis and Obsidian Storm to ₦500,000 (50000000 kobo)
    const r1 = await client.product.updateMany({
      where: { slug: { in: ['flora-genesis', 'obsidian-storm'] } },
      data: { price: 50000000 },
    });
    console.log(`Updated flora-genesis & obsidian-storm (${r1.count}) -> ₦500,000`);

    // 2. For all products, remove in-situ (-room.jpg) images and leave only pure canvas images
    const products = await client.product.findMany({
      include: { images: { orderBy: { position: 'asc' } } },
    });

    for (const p of products) {
      const hasRoomImg = p.images.some((img) => img.url.includes('-room.jpg'));
      if (!hasRoomImg) continue;

      const nonRoomImgs = p.images.filter((img) => !img.url.includes('-room.jpg'));
      let canvasUrl;
      let canvasAlt = `${p.title} original canvas by Nkem Agbo`;

      if (nonRoomImgs.length > 0) {
        canvasUrl = nonRoomImgs[0].url;
        canvasAlt = nonRoomImgs[0].alt || canvasAlt;
      } else {
        // Fallback: convert -room.jpg to -canvas.jpg
        canvasUrl = p.images[0].url.replace('-room.jpg', '-canvas.jpg');
      }

      await client.productImage.deleteMany({
        where: { productId: p.id },
      });

      await client.productImage.create({
        data: {
          productId: p.id,
          url: canvasUrl,
          alt: canvasAlt,
          position: 0,
        },
      });
      console.log(`[Canvas Only] ${p.slug} -> ${canvasUrl}`);
    }
  } finally {
    await client.$disconnect();
  }
}

async function main() {
  const prismaDb = path.resolve(__dirname, '../prisma/dev.db');
  const rootDb = path.resolve(__dirname, '../dev.db');

  if (fs.existsSync(prismaDb)) {
    await updateDb(prismaDb);
  }
  if (fs.existsSync(rootDb)) {
    await updateDb(rootDb);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

