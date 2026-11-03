const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const artwork = {
  slug: 'maternal-devotion-emerald-mosaic',
  title: 'Maternal Devotion: The Sacred Embrace in Emerald Mosaic',
  department: 'ART',
  category: 'ORIGINAL_PAINTING',
  productType: 'ORIGINAL',
  editionSize: null,
  description:
    'A poignant and deeply evocative mixed-media masterwork celebrating the unbreakable bond of African motherhood, tenderness, and sacred maternal protection. At its emotional core, a graceful mother bows her head in quiet reverence to kiss the brow of her resting child, who leans gently against her chest in complete peace and solace.\n\nThe mother\'s regal coiffure is crowned with a tactile cascade of pearlescent white beads and celadon accents. Her black bodice is enlivened by vibrant, concentric coiled-cord medallions in brilliant sun-yellow, fiery vermilion, crimson, royal blue, and magenta. Her sweeping gown is composed of a dimensional fractured emerald-green mosaic, capturing and refracting ambient light like cut gemstones.\n\nThe child is draped in a lively green-and-black striped woven tunic and authentic Ankara butterfly-winged wax print trousers, echoing the butterfly fabric inlay upon the tiered wooden terrace and hand-woven golden raffia foreground. Set against a deep, marbled crimson-wine ground etched with subtle organic crackle, this sculptural piece balances traditional West African textile heritage with contemporary tactile fine art.\n\nHand-signed recto and verso by Nkem Agbo, accompanied by an embossed Warmth Place studio certificate of provenance and museum white-glove packaging.',
  medium:
    'High-relief mixed-media collage, sculptural acrylic impasto, ceramic/glass tesserae mosaic, concentric cord embroidery, hand-beaded coiffure, and authentic butterfly Ankara wax print on gallery birch wood panel',
  materials:
    'Hand-sculpted white spherical beads, dimensional fractured emerald glass/ceramic mosaic tesserae, coiled multi-hue cord and yarn rosettes, Dutch wax butterfly print cotton textile, artist acrylics and oil pastels on archival canvas board, bespoke floating timber frame',
  year: 2026,
  widthCm: 85,
  heightCm: 110,
  depthCm: 4.5,
  weightKg: 6.5,
  orientation: 'PORTRAIT',
  price: 13500000, // ₦135,000 NGN (135,000 * 100 kobo)
  currency: 'NGN',
  stock: 1,
  status: 'PUBLISHED',
  featured: true,
  isSample: true,
  enquiryOnly: false,
  shippingClass: 'FRAGILE',
  images: [
    {
      url: '/images/catalogue/maternal-devotion-emerald-mosaic-room.jpg',
      alt: 'Maternal Devotion: The Sacred Embrace in Emerald Mosaic displayed in luxury gallery interior',
      position: 0,
    },
    {
      url: '/images/catalogue/maternal-devotion-emerald-mosaic.jpg',
      alt: 'Maternal Devotion: The Sacred Embrace in Emerald Mosaic mixed-media collage and impasto by Nkem Agbo',
      position: 1,
    },
  ],
};

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
    const nkem = await client.artist.findFirst({
      where: { slug: 'nkem-agbo' },
    });

    if (!nkem) {
      console.warn('Artist Nkem Agbo not found in', dbPath);
      return;
    }

    const col = await client.collection.findFirst({
      where: { slug: 'ancestral-rhythms' },
    });

    const now = new Date();

    const existing = await client.product.findUnique({
      where: { slug: artwork.slug },
    });

    const productData = {
      slug: artwork.slug,
      title: artwork.title,
      department: artwork.department,
      category: artwork.category,
      productType: artwork.productType,
      editionSize: artwork.editionSize,
      description: artwork.description,
      medium: artwork.medium,
      materials: artwork.materials,
      year: artwork.year,
      widthCm: artwork.widthCm,
      heightCm: artwork.heightCm,
      depthCm: artwork.depthCm,
      weightKg: artwork.weightKg,
      orientation: artwork.orientation,
      price: artwork.price,
      currency: artwork.currency,
      stock: artwork.stock,
      status: artwork.status,
      featured: artwork.featured,
      isSample: artwork.isSample,
      enquiryOnly: artwork.enquiryOnly,
      shippingClass: artwork.shippingClass,
      artistId: nkem.id,
      createdAt: now,
      updatedAt: now,
    };

    if (existing) {
      await client.productImage.deleteMany({
        where: { productId: existing.id },
      });
      await client.product.update({
        where: { id: existing.id },
        data: {
          ...productData,
          collections: col ? { set: [{ id: col.id }] } : undefined,
          images: {
            create: artwork.images,
          },
        },
      });
      console.log(`[OK] Updated ${artwork.slug} -> ₦${(artwork.price / 100).toLocaleString()} in ${dbPath}`);
    } else {
      await client.product.create({
        data: {
          ...productData,
          collections: col ? { connect: [{ id: col.id }] } : undefined,
          images: {
            create: artwork.images,
          },
        },
      });
      console.log(`[OK] Created ${artwork.slug} -> ₦${(artwork.price / 100).toLocaleString()} in ${dbPath}`);
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
