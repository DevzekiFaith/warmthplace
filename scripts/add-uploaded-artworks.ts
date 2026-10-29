import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Adding 5 new uploaded artworks to database...");


  let nkem = await prisma.artist.findUnique({ where: { slug: "nkem-agbo" } });
  if (!nkem) {
    nkem = await prisma.artist.create({
      data: {
        slug: "nkem-agbo",
        name: "Nkem Agbo",
        discipline: "Contemporary Painter & Mixed-Media Impasto Colorist",
        location: "Enugu & Lagos, Nigeria",
        shortBio: "Master of monumental textured impasto, elemental coastal mythologies, and luminous mineral pigments on canvas.",
        bio: "Nkem Agbo is an acclaimed contemporary Nigerian visual artist whose monumental canvas works explore physical texture, obsidian topographies, and luminous coastal mythologies. Working with heavy-body acrylics, palette-knife impasto, and natural pigment slips, Agbo builds sculpted relief surfaces that capture West Africa's vibrant architectural and natural landscapes.",
        portraitImage: "/images/catalogue/indigo-tide.jpg",
        coverImage: "/images/catalogue/indigo-tide.jpg",
        position: 11,
        isSample: true,
      },
    });
  }

  let amina = await prisma.artist.findUnique({ where: { slug: "amina-adeleke" } });
  if (!amina) {
    amina = await prisma.artist.create({
      data: {
        slug: "amina-adeleke",
        name: "Amina E. Adeleke",
        discipline: "Contemporary Painter & Figurative Colorist",
        location: "Lagos, Nigeria",
        shortBio: "Known for rhythmically layered palettes, sacred textile geometries, and celebratory depictions of West African communal life.",
        bio: "Amina E. Adeleke is a Lagos-based visual artist whose vibrant canvases bridge indigenous Yoruba iconography and high-modernist figurative abstraction.",
        portraitImage: "/images/catalogue/oya-the-dancer.jpg",
        coverImage: "/images/catalogue/oya-the-dancer.jpg",
        position: 12,
        isSample: true,
      },
    });
  }

  // Get collections
  const colHeirloom = await prisma.collection.findUnique({ where: { slug: "ancestral-rhythms" } });
  const colCoastal = await prisma.collection.findUnique({ where: { slug: "the-coastal-monologue" } });
  const colEarth = await prisma.collection.findUnique({ where: { slug: "earth-and-hearth" } });

  // Helper to skip if already exists
  async function upsertProduct(slug: string, data: Parameters<typeof prisma.product.create>[0]["data"]) {
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      console.log(`  [SKIP] ${slug} already exists.`);
      return;
    }
    await prisma.product.create({ data });
    console.log(`  [OK]   ${slug} created.`);
  }

  // 1. Jazz Trio Session
  await upsertProduct("lagos-jazz-trio", {
    slug: "lagos-jazz-trio",
    title: "Lagos Jazz Trio",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    description:
      "Three jazz musicians frozen in improvisational communion — a double bass, trumpet, and flute — rendered in explosive geometric shapes of cobalt blue, crimson, gold, ivory, and forest green against a richly textured violet-purple ground. Palette-knife impasto technique gives the surface a sculptural quality that vibrates with musical energy. Signed recto and verso. Ships with certificate of authenticity.",
    medium: "Oil and palette-knife impasto on stretched Belgian linen, black oak float frame",
    materials: "Belgian linen, professional oil pigments, solid black oak frame",
    year: 2026,
    widthCm: 120,
    heightCm: 100,
    depthCm: 5,
    weightKg: 8.2,
    orientation: "LANDSCAPE",
    price: 395000000, // ₦3,950,000 (~$2,633 USD)
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    featured: true,
    isSample: true,
    artistId: nkem.id,
    collections: colHeirloom ? { connect: [{ id: colHeirloom.id }] } : undefined,
    images: {
      create: [
        {
          url: "/images/catalogue/jazz-trio-session.jpg",
          alt: "Lagos Jazz Trio original oil painting — three musicians in cobalt, crimson and gold",
          position: 0,
        },
      ],
    },
  });

  // 2. Obsidian Storm
  await upsertProduct("obsidian-storm", {
    slug: "obsidian-storm",
    title: "Obsidian Storm",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    description:
      "A powerful, brooding abstract built entirely from heavy-body acrylic and modelling paste applied with palette knives to create a dramatically sculpted surface. Deep obsidian blacks crack apart to reveal silver-white and icy blue fault lines, while ember-orange and rust-red glow from the inner depths — evoking molten earth, volcanic rupture, and primordial energy. A monumental statement piece for bold, minimalist interiors.",
    medium: "Heavy-body acrylic, modelling paste, and metallic pigment on stretched canvas",
    materials: "Cotton canvas, acrylic polymer, pumice gel, silver leaf fragments, iron oxide pigment",
    year: 2026,
    widthCm: 100,
    heightCm: 130,
    depthCm: 6,
    weightKg: 9.0,
    orientation: "PORTRAIT",
    price: 445000000, // ₦4,450,000 (~$2,967 USD)
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
          url: "/images/catalogue/obsidian-storm.jpg",
          alt: "Obsidian Storm — dark impasto abstract with silver cracks and ember highlights",
          position: 0,
        },
      ],
    },
  });

  // 3. Flora Genesis
  await upsertProduct("flora-genesis", {
    slug: "flora-genesis",
    title: "Flora Genesis",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    description:
      "An exuberant celebration of botanical life: oversized petals and leaves in vivid yellow, grass green, crimson red, electric blue, and pure white burst from a dark metallic ground like a tropical garden exploding into existence. Each shape is outlined in thick black linework and filled with luscious, glossy acrylic colour. The silvery background adds a contemporary, almost stained-glass luminosity. Transformative in large dining rooms and open-plan living spaces.",
    medium: "Acrylic, high-gloss medium, and graphite outline on stretched cotton canvas",
    materials: "Cotton canvas, acrylic, gloss varnish, oil-based black liner",
    year: 2025,
    widthCm: 110,
    heightCm: 110,
    depthCm: 4,
    weightKg: 7.0,
    orientation: "SQUARE",
    price: 320000000, // ₦3,200,000 (~$2,133 USD)
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
          url: "/images/catalogue/flora-genesis.jpg",
          alt: "Flora Genesis — bold colourful botanical abstract in yellow, green, red and blue",
          position: 0,
        },
      ],
    },
  });

  // 4. Chromatic Bloom
  await upsertProduct("chromatic-bloom", {
    slug: "chromatic-bloom",
    title: "Chromatic Bloom",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    description:
      "A magnificent tall-format impasto canvas in which thick, rounded blobs of paint in cobalt blue, cadmium yellow, viridian green, burnt orange, and pure white erupt from a jet-black ground with the joyous spontaneity of a wildflower meadow. Each mark is built up with a palette knife into a three-dimensional relief, casting minute shadows that shift as natural light moves through the room. Powerful and joyful — perfect for corporate lobbies, stairwells, or statement residential walls.",
    medium: "Heavy-body acrylic impasto and modelling paste on stretched canvas, palette-knife application",
    materials: "Cotton canvas, heavy-body acrylic, modelling paste, timber stretcher",
    year: 2026,
    widthCm: 80,
    heightCm: 150,
    depthCm: 5,
    weightKg: 7.6,
    orientation: "PORTRAIT",
    price: 50000000, // ₦500,000 NGN (~$313 USD)
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    featured: true,
    isSample: true,
    artistId: nkem.id,
    collections: colHeirloom ? { connect: [{ id: colHeirloom.id }] } : undefined,
    images: {
      create: [
        {
          url: "/images/catalogue/chromatic-bloom.jpg",
          alt: "Chromatic Bloom — tall portrait impasto abstract in cobalt, yellow and green on black",
          position: 0,
        },
      ],
    },
  });

  // 5. Oya the Dancer
  await upsertProduct("oya-the-dancer", {
    slug: "oya-the-dancer",
    title: "Oya, the Dancer",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    description:
      "A regal portrait of Oya — Yoruba deity of wind, change, and marketplace sovereignty — rendered as an elegant West African woman in a boldly patterned geometric gown of red, blue, yellow, and green. She carries a rolled ceremonial textile drum and gazes serenely in profile, her geometric headdress commanding reverence. The warm burnt sienna-ochre ground is framed by intricate hand-painted white scroll and vine border motifs that echo sacred Ife wall painting traditions. A deeply spiritual and visually commanding work.",
    medium: "Layered acrylic, mineral pigment, and hand-drawn linework on linen canvas",
    materials: "Belgian linen, acrylic, natural mineral ochre, white acrylic liner",
    year: 2026,
    widthCm: 90,
    heightCm: 130,
    depthCm: 4,
    weightKg: 6.5,
    orientation: "PORTRAIT",
    price: 60000000, // ₦600,000 (~$400 USD)
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    featured: true,
    isSample: true,
    artistId: nkem.id,
    collections: colHeirloom ? { connect: [{ id: colHeirloom.id }] } : undefined,
    images: {
      create: [
        {
          url: "/images/catalogue/oya-the-dancer.jpg",
          alt: "Oya the Dancer — figurative portrait of Yoruba deity in geometric cloth on ochre ground",
          position: 0,
        },
      ],
    },
  });

  console.log("\nDone! 5 new artworks added to the database.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
