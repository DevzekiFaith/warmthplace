const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const newArtworks = [
  {
    slug: 'trinity-blossoms-on-raw-jute',
    title: 'Trinity Blossoms on Raw Jute',
    department: 'ART',
    category: 'ORIGINAL_PAINTING',
    productType: 'ORIGINAL',
    editionSize: null,
    description:
      'An expressive botanical study rendered directly upon coarsely woven golden-brown raw jute. Three radiant blossoms—a sunlit lemon-yellow flower, an emerald-viridian bloom, and a vibrant crimson floret—spring from a single organic stem with terracotta leaves. Each petal is sculpted in tactile pigment and outlined with gestural titanium-white impasto brushwork that contrasts boldly against the earthy woven grain of the burlap ground. Hand-signed by Nkem Agbo and presented in a minimalist matte black floater frame with studio certificate of provenance.',
    medium:
      'Heavy-body acrylic impasto and titanium white contour relief on woven golden-brown raw jute canvas, matte black floating frame',
    materials:
      'Hand-loomed raw jute hessian, heavy-body artist acrylics, titanium white impasto paste, obsidian hardwood floater frame',
    year: 2026,
    widthCm: 100,
    heightCm: 100,
    depthCm: 4.5,
    weightKg: 6.2,
    orientation: 'SQUARE',
    price: 21400000, // ₦214,000 NGN
    currency: 'NGN',
    stock: 1,
    status: 'PUBLISHED',
    featured: true,
    enquiryOnly: false,
    shippingClass: 'FRAGILE',
    images: [
      {
        url: '/images/catalogue/trinity-blossoms-on-raw-jute-room.jpg',
        alt: 'Trinity Blossoms on Raw Jute displayed in sunlit contemporary living room',
        position: 0,
      },
      {
        url: '/images/catalogue/trinity-blossoms-on-raw-jute-canvas.jpg',
        alt: 'Trinity Blossoms on Raw Jute original impasto canvas close-up by Nkem Agbo',
        position: 1,
      },
    ],
  },
  {
    slug: 'rain-on-ochre-pop-duck',
    title: 'Downpour & Whimsy: Neo-Pop Study on Ochre Burlap',
    department: 'ART',
    category: 'ORIGINAL_PAINTING',
    productType: 'ORIGINAL',
    editionSize: null,
    description:
      'A playful yet arresting Neo-Pop figurative canvas that pairs nostalgic animation iconography with raw West African textile materiality. Set against a warm, earth-toned woven ochre burlap ground streaked with vertical silver-white rain showers, a wide-eyed black duck figure gazes upward with an exaggerated vermilion-orange bill while sculpted emerald-green vine leaves trail along the left margin. Balancing contemporary street-pop wit with tactile gallery craftsmanship, this statement vertical piece brings personality and conversation to modern living spaces. Signed with studio certificate of provenance.',
    medium:
      'Acrylic, charcoal oil stick, and dimensional botanical relief on textured ochre burlap linen, obsidian floating frame',
    materials:
      'Textured ochre burlap linen, heavy-body acrylics, vermilion pigment, sculpted relief leaves, matte black floater frame',
    year: 2026,
    widthCm: 85,
    heightCm: 135,
    depthCm: 5.0,
    weightKg: 6.8,
    orientation: 'PORTRAIT',
    price: 24500000, // ₦245,000 NGN
    currency: 'NGN',
    stock: 1,
    status: 'PUBLISHED',
    featured: true,
    enquiryOnly: false,
    shippingClass: 'FRAGILE',
    images: [
      {
        url: '/images/catalogue/rain-on-ochre-pop-duck-room.jpg',
        alt: 'Downpour & Whimsy: Neo-Pop Study on Ochre Burlap displayed in arched living room niche',
        position: 0,
      },
      {
        url: '/images/catalogue/rain-on-ochre-pop-duck-canvas.jpg',
        alt: 'Downpour & Whimsy: Neo-Pop Study on Ochre Burlap canvas detail by Nkem Agbo',
        position: 1,
      },
    ],
  },
  {
    slug: 'harvest-canopy-tree-of-vitality',
    title: 'Harvest Canopy: Tree of Vitality',
    department: 'ART',
    category: 'ORIGINAL_PAINTING',
    productType: 'ORIGINAL',
    editionSize: null,
    description:
      'A vertical celebration of organic growth, rootedness, and seasonal abundance. Rising from a warm terracotta-ochre ground, a dark, textured trunk branches into a lush canopy of oversized leaves sculpted with thick palette-knife impasto in emerald green, cadmium yellow, burnt tangerine, and deep plum-burgundy. Each leaf catches natural daylight with three-dimensional relief highlights. Framed in warm walnut and signed recto and verso by Nkem Agbo with an embossed studio certificate of provenance.',
    medium:
      'Sculptural palette-knife oil and acrylic impasto on raw sienna-ochre linen board, walnut floating frame',
    materials:
      'Stretched linen over rigid gallery board, heavy impasto oils, natural ochre ground, solid walnut floater frame',
    year: 2026,
    widthCm: 75,
    heightCm: 130,
    depthCm: 4.5,
    weightKg: 6.4,
    orientation: 'PORTRAIT',
    price: 26000000, // ₦260,000 NGN
    currency: 'NGN',
    stock: 1,
    status: 'PUBLISHED',
    featured: true,
    enquiryOnly: false,
    shippingClass: 'FRAGILE',
    images: [
      {
        url: '/images/catalogue/harvest-canopy-tree-of-vitality-room.jpg',
        alt: 'Harvest Canopy: Tree of Vitality displayed in warm contemporary living room',
        position: 0,
      },
      {
        url: '/images/catalogue/harvest-canopy-tree-of-vitality-canvas.jpg',
        alt: 'Harvest Canopy: Tree of Vitality impasto canvas detail by Nkem Agbo',
        position: 1,
      },
    ],
  },
  {
    slug: 'midnight-afrobeat-saxophonist',
    title: 'Midnight Afrobeat: The Polychrome Saxophonist',
    department: 'ART',
    category: 'ORIGINAL_PAINTING',
    productType: 'ORIGINAL',
    editionSize: null,
    description:
      'An electrifying tribute to Lagos night-life and the spiritual pulse of Afrobeat jazz. Against a nocturnal obsidian-black ground energized by spontaneous Pollock-style colour splatters, a lone saxophonist stands in profile wearing a botanical-patterned white bucket hat and fringed ceremonial tunic. His golden-orange horn is inlaid with stained-glass mosaic geometry, flanked by an ancestral thatched dwelling on the left and a jewel-toned tropical palm on the right—bridging rural memory with urban musical improvisation. Signed recto and verso with studio certificate of authenticity.',
    medium:
      'Acrylic, gestural enamel splatter, and chalk-white textile linework on obsidian-primed Belgian linen',
    materials:
      'Belgian linen, jet-black gesso ground, artist acrylics & gloss enamel, timber stretcher',
    year: 2026,
    widthCm: 100,
    heightCm: 135,
    depthCm: 5.0,
    weightKg: 7.4,
    orientation: 'PORTRAIT',
    price: 28500000, // ₦285,000 NGN
    currency: 'NGN',
    stock: 1,
    status: 'PUBLISHED',
    featured: true,
    enquiryOnly: false,
    shippingClass: 'FRAGILE',
    images: [
      {
        url: '/images/catalogue/midnight-afrobeat-saxophonist-room.jpg',
        alt: 'Midnight Afrobeat: The Polychrome Saxophonist displayed above cream bouclé sofa',
        position: 0,
      },
      {
        url: '/images/catalogue/midnight-afrobeat-saxophonist-canvas.jpg',
        alt: 'Midnight Afrobeat: The Polychrome Saxophonist canvas detail by Nkem Agbo',
        position: 1,
      },
    ],
  },
  {
    slug: 'courtyard-tambourine-celebration',
    title: 'Moonlit Tambourine: Village Courtyard Celebration',
    department: 'ART',
    category: 'ORIGINAL_PAINTING',
    productType: 'ORIGINAL',
    editionSize: null,
    description:
      'A panoramic narrative canvas capturing the warmth and communal joy of an evening courtyard gathering. On the left, a matriarch in a turquoise bodice, crimson headwrap, and fiery palette-knife impasto skirt strikes a luminous golden tambourine that glows like a harvest moon. Across the stone-dotted earthen courtyard, two dancers in monochrome geometric wrappers and ankle rattles move in spirited dialogue beside a thatched homestead nestled beneath a fruiting citrus tree. Signed by Nkem Agbo and delivered in a custom matte black floater frame.',
    medium:
      'Oil, palette-knife impasto, and natural earth pigments on wide-format stretched linen, matte black floating frame',
    materials:
      'Stretched linen canvas, oil & acrylic impasto, raw umber and ochre pigments, matte black hardwood floater frame',
    year: 2026,
    widthCm: 150,
    heightCm: 95,
    depthCm: 5.0,
    weightKg: 8.2,
    orientation: 'LANDSCAPE',
    price: 31000000, // ₦310,000 NGN
    currency: 'NGN',
    stock: 1,
    status: 'PUBLISHED',
    featured: true,
    enquiryOnly: false,
    shippingClass: 'FRAGILE',
    images: [
      {
        url: '/images/catalogue/courtyard-tambourine-celebration-room.jpg',
        alt: 'Moonlit Tambourine: Village Courtyard Celebration displayed in living room interior',
        position: 0,
      },
      {
        url: '/images/catalogue/courtyard-tambourine-celebration-canvas.jpg',
        alt: 'Moonlit Tambourine: Village Courtyard Celebration canvas detail by Nkem Agbo',
        position: 1,
      },
    ],
  },
];

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

    let offsetMs = 0;
    for (const art of newArtworks) {
      const timestamp = new Date(Date.now() + offsetMs);
      offsetMs += 1000;

      const existing = await client.product.findUnique({
        where: { slug: art.slug },
      });

      const { images, ...fields } = art;

      if (existing) {
        await client.productImage.deleteMany({
          where: { productId: existing.id },
        });
        await client.product.update({
          where: { id: existing.id },
          data: {
            ...fields,
            artistId: nkem.id,
            createdAt: timestamp,
            updatedAt: timestamp,
            images: {
              create: images,
            },
          },
        });
        console.log(`  [UPDATED] ${art.slug} -> ₦${(art.price / 100).toLocaleString()}`);
      } else {
        await client.product.create({
          data: {
            ...fields,
            isSample: true,
            artistId: nkem.id,
            collections: col ? { connect: [{ id: col.id }] } : undefined,
            createdAt: timestamp,
            updatedAt: timestamp,
            images: {
              create: images,
            },
          },
        });
        console.log(`  [CREATED] ${art.slug} -> ₦${(art.price / 100).toLocaleString()}`);
      }
    }
  } catch (err) {
    console.error('Error updating', dbPath, err);
  } finally {
    await client.$disconnect();
  }
}

async function main() {
  const root = path.resolve(__dirname, '..');
  const dbs = [
    path.join(root, 'prisma', 'dev.db'),
    path.join(root, 'dev.db'),
  ];

  for (const db of dbs) {
    if (fs.existsSync(db)) {
      await updateDb(db);
    }
  }
}

main().catch(console.error);

