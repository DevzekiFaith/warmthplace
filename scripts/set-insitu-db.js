const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const catDir = path.resolve(__dirname, '../public/images/catalogue');

const roomImgMap = {
  'indigo-tide-evening-lantern': '/images/catalogue/indigo-tide-room.jpg',
  'ceremonial-african-drummers': '/images/catalogue/ceremonial-african-drummers-room.jpg',
  'chromatic-field-impasto': '/images/catalogue/canopy-and-grace-room.jpg',
  'canopy-and-grace': '/images/catalogue/canopy-and-grace-room.jpg',
  'obsidian-storm': '/images/catalogue/obsidian-storm-room.jpg',
  'flora-genesis': '/images/catalogue/flora-genesis-room.jpg',
  'chromatic-bloom': '/images/catalogue/chromatic-bloom-room.jpg',
  'oya-the-dancer': '/images/catalogue/oya-the-dancer-room.jpg',
  'golden-harvest-matriarchs': '/images/catalogue/golden-harvest-matriarchs-room.jpg',
  'emerald-solitude': '/images/catalogue/emerald-solitude-room.jpg',
  'kinetic-drummers': '/images/catalogue/tree-of-life-ochre-room.jpg',
  'ochre-silhouette': '/images/catalogue/solar-vortex-room.jpg',
  'trinity-blossoms-on-raw-jute': '/images/catalogue/trinity-blossoms-on-raw-jute-room.jpg',
  'rain-on-ochre-pop-duck': '/images/catalogue/rain-on-ochre-pop-duck-room.jpg',
  'harvest-canopy-tree-of-vitality': '/images/catalogue/harvest-canopy-tree-of-vitality-room.jpg',
  'midnight-afrobeat-saxophonist': '/images/catalogue/midnight-afrobeat-saxophonist-room.jpg',
  'courtyard-tambourine-celebration': '/images/catalogue/courtyard-tambourine-celebration-room.jpg',
  'tufted-companion-on-olive-jute': '/images/catalogue/tufted-companion-on-olive-jute-room.jpg',
  'savannah-strata-azure-horizon': '/images/catalogue/savannah-strata-azure-horizon-room.jpg',
  'royal-accord-ankara-couple': '/images/catalogue/royal-accord-ankara-couple-room.jpg',
  'white-stags-twilight-glade': '/images/catalogue/white-stags-twilight-glade-room.jpg',
  'meadow-symphony-panoramic-impasto': '/images/catalogue/meadow-symphony-panoramic-impasto-room.jpg',
};

async function updateDb(dbPath) {
  console.log(`Updating in-situ images in: ${dbPath}`);
  const client = new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbPath}`,
      },
    },
  });

  try {
    const products = await client.product.findMany({
      include: { images: true },
    });

    for (const p of products) {
      const targetUrl = roomImgMap[p.slug];
      if (!targetUrl) continue;

      await client.productImage.deleteMany({
        where: { productId: p.id },
      });

      await client.productImage.create({
        data: {
          productId: p.id,
          url: targetUrl,
          alt: `${p.title} displayed in contemporary interior setting`,
          position: 0,
        },
      });
      console.log(`[In-Situ Set] ${p.slug} -> ${targetUrl}`);
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

