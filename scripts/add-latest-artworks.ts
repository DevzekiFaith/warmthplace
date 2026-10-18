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
        portraitImage: "/images/catalogue/solar-vortex.jpg",
        coverImage: "/images/catalogue/solar-vortex.jpg",
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

  // 4. Kinetic Drummers of the Red Earth
  await upsertProduct("kinetic-drummers", {
    slug: "kinetic-drummers",
    title: "Kinetic Drummers of the Red Earth",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    description:
      "Four ceremonial percussionists depicted in mid-dance, their bodies articulated in bold, kinetic geometric forms of crimson red, saffron yellow, pure white, and cobalt blue against an earthy textured burnt-sienna background. Upward-thrusting emerald grass blades anchor the lower edge, giving the impression of an open-air savannah festival at dusk. Each angular brushmark vibrates with musical syncopation and ancestral energy.",
    medium: "Mineral terracotta ground, palette-knife acrylic, and raw pigment on stretched canvas",
    materials: "Cotton canvas, mineral pigment, heavy acrylic, timber float frame",
    year: 2026,
    widthCm: 140,
    heightCm: 80,
    depthCm: 4.5,
    weightKg: 7.2,
    orientation: "LANDSCAPE",
    price: 410000000, // ₦4,100,000 (~$2,733 USD)
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
          url: "/images/catalogue/kinetic-drummers.jpg",
          alt: "Kinetic Drummers of the Red Earth original painting by Nkem Agbo",
          position: 0,
        },
        {
          url: "/images/catalogue/kinetic-drummers-room.jpg",
          alt: "Kinetic Drummers of the Red Earth in modern gallery lounge",
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
