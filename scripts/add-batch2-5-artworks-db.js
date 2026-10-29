const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const newArtworks = [
  {
    slug: 'tufted-companion-on-olive-jute',
    title: 'The Dapper Companion: Tactile Study on Olive Jute',
    department: 'ART',
    category: 'ORIGINAL_PAINTING',
    productType: 'ORIGINAL',
    editionSize: null,
    description:
      'A joyful, high-relief mixed-media portrait executed on coarsely woven olive-moss jute hessian. At its center sits a sculptural, cream-gold curly-coated puppy rendered in thick, touchable tufted impasto, sporting a hand-painted botanical bow tie and perched atop a vibrant floral mat finished with real hanging cotton-yarn fringe tassels. Blending contemporary pop playfulness with artisanal West African fiber and relief craft, this work brings warmth, charm, and tactile dimension to modern living spaces. Signed recto and verso by Nkem Agbo with studio certificate of provenance.',
    medium:
      'Sculptural relief impasto, botanical acrylics, and hand-knotted cotton fringe on woven olive-moss raw jute, matte black floating frame',
    materials:
      'Hand-loomed olive jute hessian, high-build acrylic impasto paste, braided cotton fringe yarn, obsidian hardwood floater frame',
    year: 2026,
    widthCm: 85,
    heightCm: 130,
    depthCm: 5.0,
    weightKg: 6.6,
    orientation: 'PORTRAIT',
    price: 21400000, // ₦214,000 NGN
    currency: 'NGN',
    stock: 1,
    status: 'PUBLISHED',
    featured: true,
    enquiryOnly: false,
    shippingClass: 'FRAGILE',
    images: [
      {
        url: '/images/catalogue/tufted-companion-on-olive-jute-room.jpg',
        alt: 'The Dapper Companion: Tactile Study on Olive Jute displayed in sunlit contemporary living room',
        position: 0,
      },
      {
        url: '/images/catalogue/tufted-companion-on-olive-jute-canvas.jpg',
        alt: 'The Dapper Companion: Tactile Study on Olive Jute impasto and fringe close-up by Nkem Agbo',
        position: 1,
      },
    ],
  },
  {
    slug: 'savannah-strata-azure-horizon',
    title: 'Savannah Strata: Azure Sky & Ochre Ridges',
    department: 'ART',
    category: 'ORIGINAL_PAINTING',
    productType: 'ORIGINAL',
    editionSize: null,
    description:
      'A serene, architectural landscape composition that reimagines West African plateau horizons through tactile material strata. Beneath a sweeping cerulean and cloud-washed sky, undulating ridges of crumpled gold-ochre parchment, deep royal violet, emerald valleys, and woven celadon-mint linen are divided by crisp chalk-white geological fault lines. The interplay between smooth atmospheric brushwork and dimensional earth-toned relief creates a meditative focal point for sunlit interiors. Hand-signed by Nkem Agbo with studio certificate of provenance.',
    medium:
      'Mixed-media textile collage, sculpted mineral ochre relief, and cerulean acrylic wash on square gallery canvas',
    materials:
      'Stretched cotton-linen canvas, textured ochre fiber relief, woven celadon textile inlay, artist acrylics, timber stretcher',
    year: 2026,
    widthCm: 110,
    heightCm: 110,
    depthCm: 4.5,
    weightKg: 6.9,
    orientation: 'SQUARE',
    price: 24000000, // ₦240,000 NGN
    currency: 'NGN',
    stock: 1,
    status: 'PUBLISHED',
    featured: true,
    enquiryOnly: false,
    shippingClass: 'FRAGILE',
    images: [
      {
        url: '/images/catalogue/savannah-strata-azure-horizon-room.jpg',
        alt: 'Savannah Strata: Azure Sky & Ochre Ridges displayed above cream sofa in living room',
        position: 0,
      },
      {
        url: '/images/catalogue/savannah-strata-azure-horizon-canvas.jpg',
        alt: 'Savannah Strata: Azure Sky & Ochre Ridges tactile mixed-media canvas detail by Nkem Agbo',
        position: 1,
      },
    ],
  },
  {
    slug: 'royal-accord-ankara-couple',
    title: 'Royal Accord: Sovereign Couple on Olive Burlap',
    department: 'ART',
    category: 'ORIGINAL_PAINTING',
    productType: 'ORIGINAL',
    editionSize: null,
    description:
      'An intimate figurative portrait celebrating partnership, regal composure, and West African sartorial heritage on raw olive-gold woven burlap. Rendered in stylized sculptural charcoal and warm bronze-gold highlights, a poised couple leans together in quiet communion—he in a tall botanical-patterned fila cap, she crowned in a sweeping floral gele headwrap and matching crimson, emerald, and turquoise Ankara wrappers. The raw textile grain of the ground lends an earthy, timeless monumentality to the work. Framed in matte obsidian and signed by Nkem Agbo.',
    medium:
      'Charcoal-black impasto, metallic gold dry-brush, and vibrant botanical acrylics on woven olive-ochre burlap, matte black floating frame',
    materials:
      'Hand-loomed olive-ochre burlap linen, heavy-body acrylics, bronze-gold pigment, matte black hardwood floater frame',
    year: 2026,
    widthCm: 90,
    heightCm: 130,
    depthCm: 5.0,
    weightKg: 6.8,
    orientation: 'PORTRAIT',
    price: 26500000, // ₦265,000 NGN
    currency: 'NGN',
    stock: 1,
    status: 'PUBLISHED',
    featured: true,
    enquiryOnly: false,
    shippingClass: 'FRAGILE',
    images: [
      {
        url: '/images/catalogue/royal-accord-ankara-couple-room.jpg',
        alt: 'Royal Accord: Sovereign Couple on Olive Burlap displayed in contemporary living room',
        position: 0,
      },
      {
        url: '/images/catalogue/royal-accord-ankara-couple-canvas.jpg',
        alt: 'Royal Accord: Sovereign Couple on Olive Burlap canvas detail by Nkem Agbo',
        position: 1,
      },
    ],
  },
  {
    slug: 'white-stags-twilight-glade',
    title: 'White Stags of the Moonlit Glade',
    department: 'ART',
    category: 'ORIGINAL_PAINTING',
    productType: 'ORIGINAL',
    editionSize: null,
    description:
      'A mystical nocturnal wilderness canvas where two luminous ivory-white antlered stags emerge inside an enchanted twilight forest. Against a deep indigo-obsidian ground alive with cascading golden-yellow and crimson impasto drips, sculpted emerald willow boughs frame a glowing full moon whose reflection shimmers across still midnight waters. On the left, a stag stands sentinel upon a stone outcrop; on the right, its companion strides gracefully through emerald reeds. Signed recto and verso by Nkem Agbo with studio certificate of authenticity.',
    medium:
      'Heavy-body acrylic impasto, dimensional botanical relief, and titanium-white silhouette work on stretched Belgian linen',
    materials:
      'Belgian linen canvas, heavy-body acrylics & modelling paste, cadmium yellow & emerald glazes, solid timber stretcher',
    year: 2026,
    widthCm: 145,
    heightCm: 95,
    depthCm: 5.0,
    weightKg: 7.9,
    orientation: 'LANDSCAPE',
    price: 29000000, // ₦290,000 NGN
    currency: 'NGN',
    stock: 1,
    status: 'PUBLISHED',
    featured: true,
    enquiryOnly: false,
    shippingClass: 'FRAGILE',
    images: [
      {
        url: '/images/catalogue/white-stags-twilight-glade-room.jpg',
        alt: 'White Stags of the Moonlit Glade displayed above modern bouclé sectional sofa',
        position: 0,
      },
      {
        url: '/images/catalogue/white-stags-twilight-glade-canvas.jpg',
        alt: 'White Stags of the Moonlit Glade impasto canvas detail by Nkem Agbo',
        position: 1,
      },
    ],
  },
  {
    slug: 'meadow-symphony-panoramic-impasto',
    title: 'Meadow Symphony: Panoramic Chromatic Impasto',
    department: 'ART',
    category: 'ORIGINAL_PAINTING',
    productType: 'ORIGINAL',
    editionSize: null,
    description:
      'A commanding wide-format abstract expressionist canvas bursting with sculptural palette-knife blooms of electric cobalt blue, sunlit cadmium yellow, lush viridian green, burnt tangerine, and titanium white across a deep obsidian ground. Every cluster of pigment stands in three-dimensional relief, catching ambient daylight and casting dynamic micro-shadows across the surface. Conceived as a panoramic statement work for grand living rooms and architectural feature walls, hand-signed by Nkem Agbo and presented in a slim matte black floater frame.',
    medium:
      'Sculptural palette-knife acrylic impasto and high-relief modelling paste on wide-format stretched canvas, matte black floating frame',
    materials:
      'Heavy cotton-linen canvas, high-density acrylic impasto, mineral pigments, matte black hardwood floater frame',
    year: 2026,
    widthCm: 160,
    heightCm: 90,
    depthCm: 5.0,
    weightKg: 8.4,
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
        url: '/images/catalogue/meadow-symphony-panoramic-impasto-room.jpg',
        alt: 'Meadow Symphony: Panoramic Chromatic Impasto displayed in sunlit contemporary living room',
        position: 0,
      },
      {
        url: '/images/catalogue/meadow-symphony-panoramic-impasto-canvas.jpg',
        alt: 'Meadow Symphony: Panoramic Chromatic Impasto close-up canvas texture by Nkem Agbo',
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

    const colHeirloom = await client.collection.findFirst({
      where: { slug: 'heirloom-canvas' },
    });

    const baseTime = Date.now();

    for (let i = 0; i < newArtworks.length; i++) {
      const art = newArtworks[i];
      const createdAt = new Date(baseTime + i * 1000);

      const existing = await client.product.findUnique({
        where: { slug: art.slug },
      });

      const productData = {
        slug: art.slug,
        title: art.title,
        department: art.department,
        category: art.category,
        productType: art.productType,
        editionSize: art.editionSize,
        description: art.description,
        medium: art.medium,
        materials: art.materials,
        year: art.year,
        widthCm: art.widthCm,
        heightCm: art.heightCm,
        depthCm: art.depthCm,
        weightKg: art.weightKg,
        orientation: art.orientation,
        price: art.price,
        currency: art.currency,
        stock: art.stock,
        status: art.status,
        featured: art.featured,
        isSample: true,
        enquiryOnly: art.enquiryOnly,
        shippingClass: art.shippingClass,
        artistId: nkem.id,
        createdAt,
        updatedAt: createdAt,
      };

      if (existing) {
        await client.productImage.deleteMany({
          where: { productId: existing.id },
        });
        await client.product.update({
          where: { id: existing.id },
          data: {
            ...productData,
            images: {
              create: art.images,
            },
          },
        });
        console.log(`Updated ${art.slug} -> ₦${(art.price / 100).toLocaleString()}`);
      } else {
        await client.product.create({
          data: {
            ...productData,
            collections: colHeirloom ? { connect: [{ id: colHeirloom.id }] } : undefined,
            images: {
              create: art.images,
            },
          },
        });
        console.log(`Created ${art.slug} -> ₦${(art.price / 100).toLocaleString()}`);
      }
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

