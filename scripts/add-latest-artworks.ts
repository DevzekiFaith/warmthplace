import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Adding 5 latest uploaded artworks by Nkem Agbo to database...");

  // 1. Get or create artist Nkem Agbo
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
        position: 2,
        published: true,
        isSample: true,
      },
    });
  }

  // 2. Collections
  const colAncestral = await prisma.collection.findUnique({ where: { slug: "ancestral-rhythms" } });
  const colCoastal = await prisma.collection.findUnique({ where: { slug: "the-coastal-monologue" } });
  const colEarth = await prisma.collection.findUnique({ where: { slug: "earth-and-hearth" } });

  async function upsertProduct(slug: string, data: Parameters<typeof prisma.product.create>[0]["data"]) {
    const existing = await prisma.product.findUnique({
      where: { slug },
      include: { images: true },
    });

    if (existing) {
      console.log(`  [UPDATE] ${slug}`);
      await prisma.productImage.deleteMany({ where: { productId: existing.id } });
      await prisma.product.update({
        where: { id: existing.id },
        data: {
          ...data,
          images: data.images,
        },
      });
      return;
    }

    await prisma.product.create({ data });
    console.log(`  [CREATE] ${slug}`);
  }

  // 1. Golden Harvest of the Matriarchs
  await upsertProduct("golden-harvest-matriarchs", {
    slug: "golden-harvest-matriarchs",
    title: "Golden Harvest of the Matriarchs",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    description:
      "A celebratory canvas depicting three market matriarchs in procession, each balancing handwoven wicker bowls piled high with the green fruits of the harvest upon their heads. Flanked by generational kin—a kneeling mother and smiling child—their rhythmic strides are enveloped in vibrant Nigerian wax-print textiles in cobalt blue, ivory, and leaf green against a luminous amber-ochre ground. Richly textured with impasto glazes, the painting radiates maternal sovereignty, fertility, and communal wealth. Signed recto and verso, delivered with an embossed studio certificate of provenance.",
    medium: "Oil, natural mineral ochre, and textural impasto on stretched Belgian linen, walnut floating frame",
    materials: "Belgian linen, professional oils, raw mineral ochre, solid walnut frame",
    year: 2026,
    widthCm: 120,
    heightCm: 105,
    depthCm: 5,
    weightKg: 7.8,
    orientation: "LANDSCAPE",
    price: 460000000, // ₦4,600,000 (~$3,067 USD)
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    featured: true,
    isSample: true,
    artistId: nkem.id,
    collections: colAncestral ? { connect: [{ id: colAncestral.id }] } : undefined,
    images: {
      create: [
        {
          url: "/images/catalogue/golden-harvest-matriarchs.jpg",
          alt: "Golden Harvest of the Matriarchs original oil painting by Nkem Agbo",
          position: 0,
        },
        {
          url: "/images/catalogue/golden-harvest-matriarchs-room.jpg",
          alt: "Golden Harvest of the Matriarchs displayed in contemporary living room interior",
          position: 1,
        },
      ],
    },
  });

  // 2. Emerald Solitude: The Chartreuse Crown
  await upsertProduct("emerald-solitude", {
    slug: "emerald-solitude",
    title: "Emerald Solitude: The Chartreuse Crown",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    description:
      "A monumental vertical statement portrait featuring a statuesque African woman rendered in profile with a sculptural white coiffure and oversized circular hammered gold disc earrings. Her form is clothed in an electric, layered impasto of primary red, yellow, deep blue, and viridian green that cascades like sculpted gems down her spine. The composition is electrified by a bold horizon split: an acid-green chartreuse hill surging into a pitch-black cosmos. An unforgettable modern masterpiece for statement hallways, double-height entries, and contemporary living spaces.",
    medium: "Heavy-body acrylic, palette-knife impasto, and mineral pigments on vertical stretched canvas",
    materials: "Cotton canvas, heavy-body acrylic, 24k gold leaf powder, timber stretcher",
    year: 2026,
    widthCm: 75,
    heightCm: 140,
    depthCm: 5,
    weightKg: 6.5,
    orientation: "PORTRAIT",
    price: 385000000, // ₦3,850,000 (~$2,567 USD)
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    featured: true,
    isSample: true,
    artistId: nkem.id,
    collections: colCoastal ? { connect: [{ id: colCoastal.id }] } : undefined,
    images: {
      create: [
        {
          url: "/images/catalogue/emerald-solitude.jpg",
          alt: "Emerald Solitude: The Chartreuse Crown by Nkem Agbo",
          position: 0,
        },
        {
          url: "/images/catalogue/emerald-solitude-room.jpg",
          alt: "Emerald Solitude displayed in luxury interior setting",
          position: 1,
        },
      ],
    },
  });

  // 3. Canopy & Grace: White Gazelles at Twilight
  await upsertProduct("canopy-and-grace", {
    slug: "canopy-and-grace",
    title: "Canopy & Grace: White Gazelles at Twilight",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    description:
      "Set against a void of pure obsidian black, a colossal tropical rainforest leaf rendered in vivid botanical greens with bold white bone-like venation anchors the left canvas. To the right, delicate weeping vines with chartreuse buds cascade downward over four pristine white gazelles grazing serenely among dandelions and wild grasses. Built with contrasting high-gloss and matte impasto textures, this monumental landscape evokes primeval peace and botanical majesty.",
    medium: "High-gloss enamel, heavy acrylic, and mineral pigments on stretched canvas, black floating frame",
    materials: "Canvas, gloss enamel, acrylic polymer, dark aluminum-wood composite float frame",
    year: 2026,
    widthCm: 150,
    heightCm: 100,
    depthCm: 5,
    weightKg: 8.5,
    orientation: "LANDSCAPE",
    price: 480000000, // ₦4,800,000 (~$3,200 USD)
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    featured: true,
    isSample: true,
    artistId: nkem.id,
    collections: colEarth ? { connect: [{ id: colEarth.id }] } : undefined,
    images: {
      create: [
        {
          url: "/images/catalogue/canopy-and-grace.jpg",
          alt: "Canopy & Grace: White Gazelles at Twilight by Nkem Agbo",
          position: 0,
        },
        {
          url: "/images/catalogue/canopy-and-grace-room.jpg",
          alt: "Canopy & Grace displayed above a contemporary linen sofa",
          position: 1,
        },
      ],
    },
  });

  // 4. Tree of Life: Sacred Ochre Canopy
  await upsertProduct("kinetic-drummers", {
    slug: "kinetic-drummers",
    title: "Tree of Life: Sacred Ochre Canopy",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    description:
      "A monumental vertical tactile relief masterpiece celebrating the Tree of Life. Sculptural, hand-modelled impasto leaves in vibrant scarlet red, radiant cadmium yellow, verdant emerald green, and deep roasted umber branch outward in lush radial symmetry from a textured dark trunk. Rendered against a luminous amber-ochre mineral ground, the painting embodies ancestral vitality, spiritual groundedness, and perpetual renewal. Delivered stretched with a handcrafted Natural Oak floater frame and an embossed studio certificate of provenance.",
    medium: "Tactile impasto relief, modelling paste, mineral ochre wash, heavy-body acrylic, and gloss enamel on stretched canvas",
    materials: "Stretched cotton canvas, sculptural impasto polymer, raw mineral pigment, natural oak floater frame",
    year: 2026,
    widthCm: 80,
    heightCm: 140,
    depthCm: 4.5,
    weightKg: 7.2,
    orientation: "PORTRAIT",
    price: 55000000, // ₦550,000 (~$367 USD)
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    featured: true,
    isSample: true,
    artistId: nkem.id,
    collections: colAncestral ? { connect: [{ id: colAncestral.id }] } : undefined,
    images: {
      create: [
        {
          url: "/images/catalogue/tree-of-life-ochre.jpg",
          alt: "Tree of Life: Sacred Ochre Canopy tactile relief painting by Nkem Agbo",
          position: 0,
        },
        {
          url: "/images/catalogue/tree-of-life-ochre-room.jpg",
          alt: "Tree of Life displayed in contemporary living room interior",
          position: 1,
        },
      ],
    },
  });

  // 5. Solar Vortex: The Obsidian Rhythms
  await upsertProduct("ochre-silhouette", {
    slug: "ochre-silhouette",
    title: "Solar Vortex: The Obsidian Rhythms",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    description:
      "A monumental tactile relief masterpiece dominated by hypnotic concentric vortex grooves sculpted into a deep obsidian impasto ground. Sweeping radial striations generate a powerful centrifugal rhythm across the surface, electrified by spontaneous gestural cascades of golden amber, warm sunlit ochre, emerald viridian, and vermilion accents. Merging sacred African geometric motifs with raw, tactile abstract expressionism, the work vibrates with kinetic energy and contemplative depth. Signed recto and verso, delivered with an embossed studio certificate of provenance.",
    medium: "Textured impasto relief, combed bitumen ground, natural mineral ochre, oil, and gestural enamel splatter on reinforced wooden panel",
    materials: "Hardwood gallery panel, heavy impasto paste, raw mineral ochre, artist oil & gloss enamel, UV protective varnish",
    year: 2026,
    widthCm: 100,
    heightCm: 100,
    depthCm: 5.0,
    weightKg: 8.5,
    orientation: "SQUARE",
    price: 110000000, // ₦1,100,000 (~$733 USD)
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    featured: true,
    isSample: true,
    artistId: nkem.id,
    collections: colAncestral ? { connect: [{ id: colAncestral.id }] } : undefined,
    images: {
      create: [
        {
          url: "/images/catalogue/solar-vortex.jpg",
          alt: "Solar Vortex: The Obsidian Rhythms tactile relief painting by Nkem Agbo",
          position: 0,
        },
        {
          url: "/images/catalogue/solar-vortex-room.jpg",
          alt: "Solar Vortex displayed in contemporary minimalist living room interior",
          position: 1,
        },
      ],
    },
  });

  // 6. Ceremonial Rhythm: The Emerald Drummer
  await upsertProduct("indigo-tide-evening-lantern", {
    slug: "indigo-tide-evening-lantern",
    title: "Ceremonial Rhythm: The Emerald Drummer",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    description:
      "A captivating figurative masterpiece celebrating ancestral rhythm, sacred drumming, and spiritual radiance. Rendered against a luminous, electric emerald-green ground, a ceremonial West African drummer wearing a feather crown, vivid ritual face paint, and intricately patterned batik attire plays a hand-carved talking drum with infectious vitality. Built with rich impasto textures and brilliant mineral pigments, the canvas pulses with celebratory sound, kinetic movement, and communal joy. Signed recto and verso, delivered with an embossed studio certificate of provenance.",
    medium: "Acrylic, oil impasto, natural mineral pigments, and textured ground on vertical stretched canvas",
    materials: "Heavy cotton canvas, artist acrylics & oil impasto, mineral pigments, solid wood stretcher",
    year: 2026,
    widthCm: 70,
    heightCm: 135,
    depthCm: 4.5,
    weightKg: 6.8,
    orientation: "PORTRAIT",
    price: 280000000, // ₦2,800,000 (~$1,867 USD)
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    featured: true,
    isSample: true,
    artistId: nkem.id,
    collections: colCoastal ? { connect: [{ id: colCoastal.id }] } : undefined,
    images: {
      create: [
        {
          url: "/images/catalogue/indigo-tide.jpg",
          alt: "Indigo Tide & The Evening Lantern mixed-media canvas by Nkem Agbo",
          position: 0,
        },
        {
          url: "/images/catalogue/indigo-tide-room.jpg",
          alt: "Indigo Tide & The Evening Lantern displayed in modern gallery interior",
          position: 1,
        },
      ],
    },
  });

  // Sync DB files
  const prismaDb = path.resolve(process.cwd(), "prisma/dev.db");
  const rootDb = path.resolve(process.cwd(), "dev.db");
  if (fs.existsSync(prismaDb)) {
    fs.copyFileSync(prismaDb, rootDb);
  }
  console.log("All 5 artworks successfully added and databases synchronized.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
