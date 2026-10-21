const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function updateDb(dbPath) {
  console.log(`Updating database at: ${dbPath}`);
  const client = new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbPath}`
      }
    }
  });

  try {
    const nkem = await client.artist.findFirst({
      where: { slug: 'nkem-agbo' }
    });

    if (!nkem) {
      console.warn('Artist Nkem Agbo not found in', dbPath);
      return;
    }

    const col = await client.collection.findFirst({
      where: { slug: 'heirloom-heritage' }
    });

    const existing = await client.product.findUnique({
      where: { slug: 'emerald-solitude' },
      include: { images: true }
    });

    const now = new Date();

    if (existing) {
      console.log('Found existing product, updating details & fresh createdAt...');
      await client.product.update({
        where: { slug: 'emerald-solitude' },
        data: {
          title: 'Sovereign Grace: The Indigo Queen',
          department: 'ART',
          category: 'ORIGINAL_PAINTING',
          productType: 'ORIGINAL',
          editionSize: null,
          description:
            'A breathtaking museum-grade portrait celebrating regal African matriarchy, ancestral sovereignty, and sacred adornment. Rendered in exquisite profile, an African queen is adorned in an elaborate sculptural indigo-dyed adire headwrap interwoven with cowrie shells and delicate molten gold filigree. Her royal garments flow in layered cobalt, deep violet, and burnt sienna with thick, sculpted palette-knife impasto and shimmering gold leaf accents against an amber ground etched with ancient geometric glyphs. Hand-signed recto and verso by Nkem Agbo, delivered with an embossed studio certificate of provenance.',
          medium:
            'Heavy-body oil, sculptural palette-knife impasto, natural fermented indigo, and 24k gold leaf on stretched Belgian linen, natural oak floating frame',
          materials: 'Belgian linen, artist oils & acrylics, 24k gold leaf foil, natural oak floater frame',
          year: 2026,
          widthCm: 75,
          heightCm: 140,
          depthCm: 5.0,
          weightKg: 6.8,
          orientation: 'PORTRAIT',
          price: 50000000, // ₦500,000 NGN
          currency: 'NGN',
          stock: 1,
          status: 'PUBLISHED',
          featured: true,
          enquiryOnly: false,
          shippingClass: 'FRAGILE',
          createdAt: now,
          updatedAt: now,
          images: {
            deleteMany: {},
            create: [
              {
                url: '/images/catalogue/emerald-solitude.jpg',
                alt: 'Sovereign Grace: The Indigo Queen pure oil impasto canvas by Nkem Agbo',
                position: 0,
              },
              {
                url: '/images/catalogue/emerald-solitude-room.jpg',
                alt: 'Sovereign Grace: The Indigo Queen displayed in luxury gallery interior',
                position: 1,
              },
            ],
          },
        },
      });
      console.log('Successfully updated emerald-solitude product in', dbPath);
    } else {
      console.log('Creating new emerald-solitude product in', dbPath);
      await client.product.create({
        data: {
          slug: 'emerald-solitude',
          title: 'Sovereign Grace: The Indigo Queen',
          department: 'ART',
          category: 'ORIGINAL_PAINTING',
          productType: 'ORIGINAL',
          description:
            'A breathtaking museum-grade portrait celebrating regal African matriarchy, ancestral sovereignty, and sacred adornment. Rendered in exquisite profile, an African queen is adorned in an elaborate sculptural indigo-dyed adire headwrap interwoven with cowrie shells and delicate molten gold filigree. Her royal garments flow in layered cobalt, deep violet, and burnt sienna with thick, sculpted palette-knife impasto and shimmering gold leaf accents against an amber ground etched with ancient geometric glyphs. Hand-signed recto and verso by Nkem Agbo, delivered with an embossed studio certificate of provenance.',
          medium:
            'Heavy-body oil, sculptural palette-knife impasto, natural fermented indigo, and 24k gold leaf on stretched Belgian linen, natural oak floating frame',
          materials: 'Belgian linen, artist oils & acrylics, 24k gold leaf foil, natural oak floater frame',
          year: 2026,
          widthCm: 75,
          heightCm: 140,
          depthCm: 5.0,
          weightKg: 6.8,
          orientation: 'PORTRAIT',
          price: 50000000, // ₦500,000 NGN
          currency: 'NGN',
          stock: 1,
          status: 'PUBLISHED',
          featured: true,
          enquiryOnly: false,
          shippingClass: 'FRAGILE',
          artistId: nkem.id,
          collections: col ? { connect: [{ id: col.id }] } : undefined,
          createdAt: now,
          updatedAt: now,
          images: {
            create: [
              {
                url: '/images/catalogue/emerald-solitude.jpg',
                alt: 'Sovereign Grace: The Indigo Queen pure oil impasto canvas by Nkem Agbo',
                position: 0,
              },
              {
                url: '/images/catalogue/emerald-solitude-room.jpg',
                alt: 'Sovereign Grace: The Indigo Queen displayed in luxury gallery interior',
                position: 1,
              },
            ],
          },
        },
      });
      console.log('Successfully created emerald-solitude product in', dbPath);
    }
  } catch (err) {
    console.error('Error in updateDb for', dbPath, err);
  } finally {
    await client.$disconnect();
  }
}

async function main() {
  const root = path.resolve(__dirname, '..');
  const dbs = [
    path.join(root, 'prisma', 'dev.db'),
    path.join(root, 'dev.db')
  ];

  for (const db of dbs) {
    if (fs.existsSync(db)) {
      await updateDb(db);
    }
  }
}

main().catch(console.error);
