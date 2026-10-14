import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Warmthplace database...");

  // Clear existing records in proper dependency order
  await prisma.paymentEvent.deleteMany();
  await prisma.orderEvent.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.enquiry.deleteMany();
  await prisma.subscriber.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.article.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.shippingZone.deleteMany();
  await prisma.adminUser.deleteMany();
  await prisma.setting.deleteMany();

  // 1. Admin user
  const adminPassword = process.env.ADMIN_PASSWORD || "WarmthplaceAdmin2026!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.adminUser.create({
    data: {
      email: (process.env.ADMIN_EMAIL || "admin@warmthplace.com").toLowerCase(),
      name: "Warmthplace Curatorial Team",
      passwordHash,
      role: "OWNER",
    },
  });

  // 2. Settings
  await prisma.setting.createMany({
    data: [
      { key: "site_name", value: "Warmthplace Art Studio" },
      { key: "site_tagline", value: "African Art. Contemporary Living. Enduring Stories." },
      { key: "store_currency", value: "NGN" },
      { key: "contact_email", value: "nkempearl2@gmail.com" },
      { key: "contact_phone", value: "+234 1 888 2026" },
      { key: "studio_address", value: "7 Victoria Island Crescent, Lagos, Nigeria" },
    ],
  });

  // 3. Shipping Zones (amounts in kobo: 1 NGN = 100 kobo)
  await prisma.shippingZone.createMany({
    data: [
      {
        name: "Lagos Metropolitan (White Glove Courier)",
        countries: "NG",
        baseRate: 1500000, // ₦15,000
        additionalItemRate: 300000,
        fragileSurcharge: 2000000,
        oversizedSurcharge: 5000000,
        freeOver: 200000000, // Free on orders over ₦2,000,000
        estimate: "1–2 business days via specialized art courier",
        position: 1,
        active: true,
        isSample: true,
      },
      {
        name: "Nigeria (Interstate Insured Delivery)",
        countries: "NG",
        baseRate: 3500000, // ₦35,000
        additionalItemRate: 500000,
        fragileSurcharge: 3000000,
        oversizedSurcharge: 8000000,
        freeOver: 350000000,
        estimate: "3–5 business days, fully crated and insured",
        position: 2,
        active: true,
        isSample: true,
      },
      {
        name: "United Kingdom & Europe (Air Cargo Express)",
        countries: "GB,FR,DE,NL,BE,CH,ES,IT,SE,IE,PT,AT,DK,NO",
        baseRate: 14500000, // ₦145,000 (~$95 USD)
        additionalItemRate: 2500000,
        fragileSurcharge: 8000000,
        oversizedSurcharge: 22000000,
        estimate: "4–7 business days via DHL Express / Art Logistics. Includes export permits.",
        position: 3,
        active: true,
        isSample: true,
      },
      {
        name: "North America & Global (Insured Fine Art Logistics)",
        countries: "US,CA,AE,ZA,GH,KE,JP,AU,NZ",
        baseRate: 18500000, // ₦185,000 (~$120 USD)
        additionalItemRate: 3500000,
        fragileSurcharge: 10000000,
        oversizedSurcharge: 28000000,
        estimate: "5–9 business days with customs clearance assistance and museum-grade crating",
        position: 4,
        active: true,
        isSample: true,
      },
    ],
  });

  // 4. Artists
  const amina = await prisma.artist.create({
    data: {
      slug: "amina-adeleke",
      name: "Amina E. Adeleke",
      discipline: "Contemporary Painter & Figurative Colorist",
      location: "Lagos, Nigeria",
      shortBio: "Known for rhythmically layered palettes, sacred textile geometries, and celebratory depictions of West African communal life.",
      bio: "Amina E. Adeleke is a Lagos-based visual artist whose vibrant canvases bridge indigenous Yoruba iconography, Adinkra glyphs, and high-modernist figurative abstraction. Adeleke builds dense, luminous surfaces with acrylic, natural pigments, and archival linen. Her figures move with ceremonial dignity, wrapped in intricately coded textiles that speak to matrilineal memory, marketplace governance, and quiet everyday transcendence.",
      portraitImage: "/images/catalogue/harmattan-procession.jpg",
      coverImage: "/images/catalogue/harmattan-procession.jpg",
      position: 1,
      isSample: true,
    },
  });

  const nkem = await prisma.artist.create({
    data: {
      slug: "nkem-agbo",
      name: "Nkem Agbo",
      discipline: "Contemporary Painter & Mixed-Media Impasto Colorist",
      location: "Enugu & Lagos, Nigeria",
      shortBio: "Master of monumental textured impasto, elemental coastal mythologies, and luminous mineral pigments on canvas.",
      bio: "Nkem Agbo is an acclaimed contemporary Nigerian visual artist whose monumental canvas works explore physical texture, obsidian topographies, and luminous coastal mythologies. Working with heavy-body acrylics, palette-knife impasto, and natural pigment slips, Agbo builds sculpted relief surfaces that capture West Africa's vibrant architectural and natural landscapes.",
      portraitImage: "/images/catalogue/indigo-tide.jpg",
      coverImage: "/images/catalogue/indigo-tide.jpg",
      position: 2,
      isSample: true,
    },
  });

  const tariq = await prisma.artist.create({
    data: {
      slug: "tariq-osei",
      name: "Tariq Osei",
      discipline: "Mixed-Media Painter & Printmaker",
      location: "Accra, Ghana & London",
      shortBio: "Explores maritime coastal mythologies, natural indigo dye baths, and the meditative quietude of Atlantic borderlands.",
      bio: "Tariq Osei works across natural resist-dyed textiles, works on handmade cotton rag paper, and mixed-media assemblages. His practice is deeply informed by coastal West African fishing communities and the spiritual symbolism of water spirits. By combining indigo chemistry with sumi ink and ceramic clay slips, Osei crafts works that feel both ancient and startlingly contemporary.",
      portraitImage: "/images/catalogue/quiet-lagoon.jpg",
      coverImage: "/images/catalogue/quiet-lagoon.jpg",
      position: 3,
      isSample: true,
    },
  });

  const chinwe = await prisma.artist.create({
    data: {
      slug: "chinwe-okoli",
      name: "Chinwe Okoli",
      discipline: "Sculptor & Ceramic Artist",
      location: "Enugu, Nigeria",
      shortBio: "Reclaims traditional burnishing and pit-firing traditions, producing sculptural vessels and bronze heads of exquisite restraint.",
      bio: "Chinwe Okoli began her apprenticeship under veteran potters in eastern Nigeria before studying fine art sculpture. Her work investigates the dialogue between functional earthenware and contemplative sacred forms. Using local earthenware clay burnished with river stones and treated with botanical smoke, Okoli's tactile vessels celebrate the organic geometry of African domestic heritage.",
      portraitImage: "/images/catalogue/incised-terracotta-vessel.jpg",
      coverImage: "/images/catalogue/the-listener.jpg",
      position: 3,
      isSample: true,
    },
  });

  const kofi = await prisma.artist.create({
    data: {
      slug: "kofi-mensah",
      name: "Kofi Mensah",
      discipline: "Master Weaver & Graphic Artist",
      location: "Kumasi, Ghana",
      shortBio: "Transposes historic Asante and Kuba strip-weaving architectures into collectible limited-edition serigraphs and handwoven textiles.",
      bio: "Kofi Mensah is a third-generation weaver whose studio experiments with architectural abstraction. Mensah treats the loom as an instrument of mathematical precision, weaving hand-spun cotton and plant-dyed linen into heirloom throws and tapestries. His graphic screenprints distill these interlocking rhythms into timeless geometric editions.",
      portraitImage: "/images/catalogue/ancestral-geometry.jpg",
      coverImage: "/images/catalogue/strip-woven-throw.jpg",
      position: 4,
      isSample: true,
    },
  });

  const adebayo = await prisma.artist.create({
    data: {
      slug: "adebayo-olufemi",
      name: "Adebayo Olufemi",
      discipline: "Contemporary Painter & Figurative Colorist",
      location: "Lagos, Nigeria",
      shortBio: "Captures the syncopated energy and nocturnal vibrancy of Lagos musical and cultural gatherings.",
      bio: "Adebayo Olufemi is a celebrated contemporary painter whose high-contrast impasto works document West Africa's vibrant live music scenes. Working primarily with heavy oil pigments and palette-knife techniques, Olufemi translates musical syncopation into rich visual rhythms.",
      portraitImage: "/images/hero/artwork-jazz-trio.jpg",
      coverImage: "/images/hero/hero-jazz-trio.jpg",
      position: 5,
      isSample: true,
    },
  });

  const zainab = await prisma.artist.create({
    data: {
      slug: "zainab-chinedu",
      name: "Zainab Chinedu",
      discipline: "Figurative Painter & Ceremonial Colorist",
      location: "Abuja, Nigeria",
      shortBio: "Explores communal ritual, sacred dance, and kinetic rhythms with warm mineral ochres and raw pigments.",
      bio: "Zainab Chinedu crafts monumental figurative works centered on community cohesion and ceremonial celebration. Her layered surfaces evoke sun-baked earth, ritual attire, and ancestral resonance.",
      portraitImage: "/images/hero/artwork-african-drummers.jpg",
      coverImage: "/images/hero/hero-african-drummers.jpg",
      position: 6,
      isSample: true,
    },
  });

  // 5. Curated Collections
  const colCoastal = await prisma.collection.create({
    data: {
      slug: "the-coastal-monologue",
      title: "The Coastal Monologue",
      subtitle: "Indigo dye baths, oceanic mythologies, and the Atlantic shoreline",
      description: "A contemplative suite of original mixed-media canvases, works on paper, and adire-dyed textiles that explore water as memory, pathway, and healing element.",
      coverImage: "/images/catalogue/indigo-tide.jpg",
      coverAlt: "Deep indigo painting with swimming ceramic fish and a night lantern",
      featured: true,
      position: 1,
      isSample: true,
    },
  });

  const colEarth = await prisma.collection.create({
    data: {
      slug: "earth-and-hearth",
      title: "Earth & Hearth",
      subtitle: "Terracotta vessels, carved iroko wood, and warm living objects",
      description: "Tactile objects shaped by hand and fire. Each piece in this collection brings organic warmth, grounded texture, and generational craftsmanship into the contemporary interior.",
      coverImage: "/images/catalogue/incised-terracotta-vessel.jpg",
      coverAlt: "Burnished terracotta vessel with incised linear patterns",
      featured: true,
      position: 2,
      isSample: true,
    },
  });

  const colHeirloom = await prisma.collection.create({
    data: {
      slug: "ancestral-rhythms",
      title: "Ancestral Rhythms",
      subtitle: "Vibrant celebratory figurative canvases and limited-edition prints",
      description: "Bold compositions celebrating communion, marketplace vitality, and ceremonial poise. Featuring major works by Amina E. Adeleke and Kofi Mensah.",
      coverImage: "/images/catalogue/harmattan-procession.jpg",
      coverAlt: "Procession of figures wrapped in patterned cloth with sacred motifs",
      featured: true,
      position: 3,
      isSample: true,
    },
  });

  // 6. Products
  // 1 - Harmattan Procession (Original Painting)
  await prisma.product.create({
    data: {
      slug: "harmattan-procession",
      title: "Harmattan Procession",
      department: "ART",
      category: "ORIGINAL_PAINTING",
      productType: "ORIGINAL",
      description: "An extraordinary large-scale original painting on Belgian linen. Figures wrapped in festive ochre, indigo, and terracotta textiles move across a textured ground punctuated by birds, cowrie shells, and sacred symbols. Rendered with layered acrylics, mineral ochres, and fine brush linework. Signed by the artist recto and verso with museum certificate of authenticity.",
      medium: "Acrylic, natural mineral pigment, and gold leaf on stretched Belgian linen",
      materials: "Belgian linen, timber stretcher, pigment, acrylic emulsion",
      year: 2025,
      widthCm: 110,
      heightCm: 145,
      depthCm: 4.5,
      weightKg: 6.2,
      orientation: "PORTRAIT",
      price: 285000000, // ₦2,850,000 (Approx $1,900 USD)
      currency: "NGN",
      stock: 1,
      status: "PUBLISHED",
      enquiryOnly: false,
      shippingClass: "FRAGILE",
      featured: true,
      isSample: true,
      artistId: amina.id,
      collections: { connect: [{ id: colHeirloom.id }] },
      images: {
        create: [
          {
            url: "/images/catalogue/harmattan-procession.jpg",
            alt: "Harmattan Procession original painting by Amina E. Adeleke",
            position: 0,
          },
        ],
      },
    },
  });

  // 2 - Indigo Tide & The Evening Lantern (Original Mixed Media)
  await prisma.product.create({
    data: {
      slug: "indigo-tide-evening-lantern",
      title: "Indigo Tide & The Evening Lantern",
      department: "ART",
      category: "ORIGINAL_PAINTING",
      productType: "ORIGINAL",
      description: "A poetic masterpiece of texture and oceanic stillness. Set against a deep slate-indigo ground patterned with traditional adire resist motifs, a serpentine school of hand-sculpted terracotta ceramic fish sweeps upward. At the base, a solitary figure with flowing hair holds a luminous evening lantern. A work of deep contemplation and rare tactile presence.",
      medium: "Natural indigo dye, clay-slip resist, oil, sumi ink, and attached low-fire terracotta reliefs on stretched canvas",
      materials: "Heavy cotton canvas, natural indigo, terracotta ceramic components, hardwood frame backing",
      year: 2025,
      widthCm: 95,
      heightCm: 135,
      depthCm: 5.0,
      weightKg: 7.8,
      orientation: "PORTRAIT",
      price: 340000000, // ₦3,400,000 (Approx $2,260 USD)
      currency: "NGN",
      stock: 1,
      status: "PUBLISHED",
      enquiryOnly: false,
      shippingClass: "FRAGILE",
      featured: true,
      isSample: true,
      artistId: nkem.id,
      collections: { connect: [{ id: colCoastal.id }] },
      images: {
        create: [
          {
            url: "/images/catalogue/indigo-tide.jpg",
            alt: "Indigo Tide & The Evening Lantern mixed-media canvas by Nkem Agbo",
            position: 0,
          },
        ],
      },
    },
  });

  // 3 - Market Women at Dusk (Original Oil & Gold Leaf)
  await prisma.product.create({
    data: {
      slug: "market-women-at-dusk",
      title: "Market Women at Dusk",
      department: "ART",
      category: "ORIGINAL_PAINTING",
      productType: "ORIGINAL",
      description: "Executed with energetic palette-knife strokes and hand-laid 24k gold leaf foil, this painting captures four regal market women striding purposefully in unison under a sunset sky of swirling magenta, amber, and cobalt. The composition honours the foundational commercial backbone and grace of West African urban markets.",
      medium: "Oil, cold wax, and gold leaf foil on heavy linen",
      materials: "Linen canvas, professional oil color, gold foil",
      year: 2024,
      widthCm: 100,
      heightCm: 140,
      depthCm: 4.0,
      weightKg: 5.8,
      orientation: "PORTRAIT",
      price: 220000000, // ₦2,200,000 (Approx $1,460 USD)
      currency: "NGN",
      stock: 1,
      status: "PUBLISHED",
      enquiryOnly: false,
      shippingClass: "FRAGILE",
      featured: true,
      isSample: true,
      artistId: amina.id,
      collections: { connect: [{ id: colHeirloom.id }] },
      images: {
        create: [
          {
            url: "/images/catalogue/market-women-at-dusk.jpg",
            alt: "Market Women at Dusk by Amina E. Adeleke",
            position: 0,
          },
        ],
      },
    },
  });

  // 4 - The Silent Listener (Cast Bronze Sculpture)
  await prisma.product.create({
    data: {
      slug: "the-silent-listener",
      title: "The Silent Listener",
      department: "ART",
      category: "SCULPTURE",
      productType: "ORIGINAL",
      editionSize: 8,
      description: "An elongated sculptural head with serene downcast eyelids and a spiral coiffure, referencing the revered lost-wax bronze casting tradition of ancient Ife and Benin, re-imagined with modernist minimalism. Mounted on a solid honed limestone plinth. Each cast is individually hand-patinated with brass accents.",
      medium: "Lost-wax cast bronze with hand-applied antique patina on limestone base",
      materials: "Sculptural bronze alloy, honed limestone base",
      year: 2025,
      widthCm: 22,
      heightCm: 68,
      depthCm: 24,
      weightKg: 14.5,
      orientation: "PORTRAIT",
      price: 460000000, // ₦4,600,000 (Approx $3,050 USD)
      currency: "NGN",
      stock: 2,
      status: "PUBLISHED",
      enquiryOnly: true, // Selected high-value sculpture allows direct enquiry or purchase
      shippingClass: "OVERSIZED",
      featured: true,
      isSample: true,
      artistId: chinwe.id,
      collections: { connect: [{ id: colEarth.id }] },
      images: {
        create: [
          {
            url: "/images/catalogue/the-listener.jpg",
            alt: "The Silent Listener cast bronze sculpture on limestone plinth by Chinwe Okoli",
            position: 0,
          },
        ],
      },
    },
  });

  // 5 - Quiet Lagoon with Canoe (Work on Paper)
  await prisma.product.create({
    data: {
      slug: "quiet-lagoon-with-canoe",
      title: "Quiet Lagoon with Canoe",
      department: "ART",
      category: "WORK_ON_PAPER",
      productType: "ORIGINAL",
      description: "A meditative composition executed with Japanese sumi ink and artisanal Nigerian fermented indigo on deckle-edged handmade cotton rag paper. The sweep of the water, stilt architecture, and a lone boatman evoke the profound quietude of coastal lagoons at dawn.",
      medium: "Sumi ink, botanical indigo wash, and terracotta pigment on deckle-edge handmade cotton paper",
      materials: "300gsm handmade cotton rag, natural pigments",
      year: 2025,
      widthCm: 56,
      heightCm: 76,
      depthCm: 0.2,
      weightKg: 0.4,
      orientation: "PORTRAIT",
      price: 95000000, // ₦950,000 (Approx $630 USD)
      currency: "NGN",
      stock: 1,
      status: "PUBLISHED",
      enquiryOnly: false,
      shippingClass: "STANDARD",
      featured: false,
      isSample: true,
      artistId: tariq.id,
      collections: { connect: [{ id: colCoastal.id }] },
      images: {
        create: [
          {
            url: "/images/catalogue/quiet-lagoon.jpg",
            alt: "Quiet Lagoon with Canoe original work on paper by Tariq Osei",
            position: 0,
          },
        ],
      },
    },
  });

  // 6 - Ancestral Geometry I (Limited Edition Print)
  await prisma.product.create({
    data: {
      slug: "ancestral-geometry-i",
      title: "Ancestral Geometry I",
      department: "ART",
      category: "PRINT_EDITION",
      productType: "EDITION",
      editionSize: 25,
      description: "Limited edition 12-colour silkscreen print on 310gsm Hahnemühle German Etching paper. Distills Kuba and Ndebele geometric spatial syntax into clean modernist polyhedrons of terracotta, olive, charcoal, and warm ivory. Hand-numbered, titled, and signed by Kofi Mensah in pencil.",
      medium: "12-colour hand-pulled serigraph on 310gsm archival etching paper",
      materials: "Archival inks, 100% cotton German etching paper",
      year: 2025,
      widthCm: 70,
      heightCm: 70,
      depthCm: 0.1,
      weightKg: 0.3,
      orientation: "SQUARE",
      price: 42000000, // ₦420,000 (Approx $280 USD)
      currency: "NGN",
      stock: 14,
      status: "PUBLISHED",
      enquiryOnly: false,
      shippingClass: "STANDARD",
      featured: true,
      isSample: true,
      artistId: kofi.id,
      collections: { connect: [{ id: colHeirloom.id }] },
      images: {
        create: [
          {
            url: "/images/catalogue/ancestral-geometry.jpg",
            alt: "Ancestral Geometry I limited edition print by Kofi Mensah",
            position: 0,
          },
        ],
      },
    },
  });

  // 7 - Golden Hour Crossing (Fine-Art Photography Print)
  await prisma.product.create({
    data: {
      slug: "golden-hour-crossing",
      title: "Golden Hour Crossing",
      department: "ART",
      category: "PHOTOGRAPHY",
      productType: "EDITION",
      editionSize: 15,
      description: "Archival pigment print capturing the warm cinematic haze of Lagos Island at dusk. A woman in a flowing terracotta wrapper strides across an amber street bathed in elongated architectural shadows. Printed on museum-grade cotton baryta paper.",
      medium: "Archival pigment print on Hahnemühle Photo Rag Baryta 315gsm",
      materials: "Pigment ink, archival rag paper",
      year: 2024,
      widthCm: 60,
      heightCm: 80,
      depthCm: 0.1,
      weightKg: 0.3,
      orientation: "PORTRAIT",
      price: 68000000, // ₦680,000 (Approx $450 USD)
      currency: "NGN",
      stock: 8,
      status: "PUBLISHED",
      enquiryOnly: false,
      shippingClass: "STANDARD",
      featured: false,
      isSample: true,
      artistId: null,
      images: {
        create: [
          {
            url: "/images/catalogue/golden-hour-crossing.jpg",
            alt: "Golden Hour Crossing archival photograph",
            position: 0,
          },
        ],
      },
    },
  });

  // 8 - Incised Terracotta Water Vessel (Ceramics)
  await prisma.product.create({
    data: {
      slug: "incised-terracotta-vessel",
      title: "Incised Terracotta Water Vessel",
      department: "DECOR",
      category: "CERAMICS",
      productType: "DECOR",
      description: "Coil-built and hand-burnished using river quartz stones before firing. The spherical shoulder is incised with rhythmic herringbone and crosshatch lines referencing traditional grain storage silos. Rich earthenware tones with natural smoke-firing variations. Ideal as an interior centerpiece or dry sculptural vase.",
      medium: "Hand-coiled earthenware clay, burnished and pit-smoked",
      materials: "Local Nigerian earthenware clay, botanical smoke finish",
      year: 2025,
      widthCm: 26,
      heightCm: 38,
      depthCm: 26,
      weightKg: 3.4,
      orientation: "PORTRAIT",
      price: 28500000, // ₦285,000 (Approx $190 USD)
      currency: "NGN",
      stock: 4,
      status: "PUBLISHED",
      enquiryOnly: false,
      shippingClass: "FRAGILE",
      featured: true,
      isSample: true,
      artistId: chinwe.id,
      collections: { connect: [{ id: colEarth.id }] },
      images: {
        create: [
          {
            url: "/images/catalogue/incised-terracotta-vessel.jpg",
            alt: "Incised terracotta water vessel hand-thrown ceramic by Chinwe Okoli",
            position: 0,
          },
        ],
      },
    },
  });

  // 9 - Strip-Woven Indigo & Terracotta Throw (Textiles)
  await prisma.product.create({
    data: {
      slug: "strip-woven-throw",
      title: "Strip-Woven Indigo & Terracotta Throw",
      department: "DECOR",
      category: "TEXTILES",
      productType: "DECOR",
      description: "Crafted on traditional narrow double-heddle strip looms by artisans in Kumasi under the direction of Kofi Mensah. Bands of natural unbleached cotton, vat-dyed botanical indigo, sage olive, and terracotta are stitched together with fringed ends. Substantial, tactile, and luxuriously soft.",
      medium: "100% hand-spun African cotton with natural botanical dyes",
      materials: "Organic cotton, fermented indigo, madder root",
      year: 2025,
      widthCm: 140,
      heightCm: 200,
      depthCm: 1.0,
      weightKg: 1.6,
      orientation: "PORTRAIT",
      price: 19500000, // ₦195,000 (Approx $130 USD)
      currency: "NGN",
      stock: 9,
      status: "PUBLISHED",
      enquiryOnly: false,
      shippingClass: "STANDARD",
      featured: true,
      isSample: true,
      artistId: kofi.id,
      collections: { connect: [{ id: colCoastal.id }, { id: colEarth.id }] },
      images: {
        create: [
          {
            url: "/images/catalogue/strip-woven-throw.jpg",
            alt: "Handwoven strip-woven cotton throw draped over bench",
            position: 0,
          },
        ],
      },
    },
  });

  // 10 - Fluted Iroko Pedestal Bowl (Woodware / Objects)
  await prisma.product.create({
    data: {
      slug: "fluted-iroko-pedestal-bowl",
      title: "Fluted Iroko Pedestal Bowl",
      department: "DECOR",
      category: "TABLETOP",
      productType: "DECOR",
      description: "Turned and hand-carved from sustainably salvaged aged iroko timber. Features an undulating fluted exterior texture contrasted against a silky smooth oiled interior basin. Elevated on a low circular foot. Finished with food-safe organic walnut oil and beeswax.",
      medium: "Solid aged West African iroko wood, hand-fluted and polished",
      materials: "Aged iroko timber, cold-pressed walnut oil, beeswax",
      year: 2025,
      widthCm: 32,
      heightCm: 19,
      depthCm: 32,
      weightKg: 2.8,
      orientation: "PORTRAIT",
      price: 24000000, // ₦240,000 (Approx $160 USD)
      currency: "NGN",
      stock: 5,
      status: "PUBLISHED",
      enquiryOnly: false,
      shippingClass: "STANDARD",
      featured: true,
      isSample: true,
      artistId: null,
      collections: { connect: [{ id: colEarth.id }] },
      images: {
        create: [
          {
            url: "/images/catalogue/fluted-pedestal-bowl.jpg",
            alt: "Hand-carved fluted iroko wood pedestal bowl",
            position: 0,
          },
        ],
      },
    },
  });

  // 11 - Stacked-Disc Brass Candle Holders (Pair)
  await prisma.product.create({
    data: {
      slug: "stacked-brass-candle-holders",
      title: "Stacked-Disc Brass Candle Holders (Pair)",
      department: "DECOR",
      category: "DECORATIVE_OBJECTS",
      productType: "DECOR",
      description: "A commanding pair of solid sand-cast brass candle holders in staggered heights (28cm and 20cm). Sculptural stepped disc finials give them architectural presence on a dining table or console. Finished with a soft matte antique brass patina that deepens with age.",
      medium: "Solid sand-cast brass with hand-turned disc collars and warm matte patina",
      materials: "Brass alloy, felted base protection",
      year: 2025,
      widthCm: 12,
      heightCm: 28,
      depthCm: 12,
      weightKg: 3.1,
      orientation: "PORTRAIT",
      price: 18000000, // ₦180,000 (Approx $120 USD)
      currency: "NGN",
      stock: 7,
      status: "PUBLISHED",
      enquiryOnly: false,
      shippingClass: "STANDARD",
      featured: true,
      isSample: true,
      artistId: null,
      collections: { connect: [{ id: colEarth.id }] },
      images: {
        create: [
          {
            url: "/images/catalogue/stacked-brass-candle-holders.jpg",
            alt: "Stacked-disc brass candle holders with ivory taper candles",
            position: 0,
          },
        ],
      },
    },
  });

  // 12 - Adire Resist Indigo Cushion
  await prisma.product.create({
    data: {
      slug: "adire-indigo-cushion",
      title: "Adire Resist Indigo Cushion",
      department: "DECOR",
      category: "CUSHIONS",
      productType: "DECOR",
      description: "Hand-dyed adire eleko cushion cover featuring geometric celestial and shield medallions resist-painted with cassava starch before dipping in living indigo fermentation pits. Backed with undyed raw natural Belgian linen and finished with concealed brass zipper. Filled with cruelty-free down alternative.",
      medium: "Hand-dyed indigo cotton resist cloth with natural linen backing",
      materials: "Organic cotton, fermented indigo, Belgian linen, brass zipper",
      year: 2025,
      widthCm: 50,
      heightCm: 50,
      depthCm: 15,
      weightKg: 1.1,
      orientation: "SQUARE",
      price: 9500000, // ₦95,000 (Approx $65 USD)
      currency: "NGN",
      stock: 12,
      status: "PUBLISHED",
      enquiryOnly: false,
      shippingClass: "STANDARD",
      featured: true,
      isSample: true,
      artistId: null,
      collections: { connect: [{ id: colCoastal.id }] },
      images: {
        create: [
          {
            url: "/images/catalogue/adire-indigo-cushion.jpg",
            alt: "Adire resist-dyed indigo cushion on linen sofa",
            position: 0,
          },
        ],
      },
    },
  });

  // 14 - Ceremonial African Drummers & Dancers (Hero Artwork & Interior In-Situ)
  await prisma.product.create({
    data: {
      slug: "ceremonial-african-drummers",
      title: "Ceremonial African Drummers & Dancers",
      department: "ART",
      category: "ORIGINAL_PAINTING",
      productType: "ORIGINAL",
      description: "A rhythmic celebration of communal ceremony: drummers and dancers rendered in expressive figures against a warm ochre ground. Layered acrylic and mineral pigments give the surface a tactile, sun-baked richness that anchors any sunlit living space.",
      medium: "Acrylic and mineral pigment on stretched cotton canvas",
      materials: "Cotton canvas, acrylic, natural mineral pigment, timber stretcher",
      year: 2026,
      widthCm: 90,
      heightCm: 130,
      depthCm: 4.0,
      weightKg: 6.1,
      orientation: "PORTRAIT",
      price: 420000000, // ₦4,200,000 (~$2,800 USD)
      currency: "NGN",
      stock: 1,
      status: "PUBLISHED",
      enquiryOnly: false,
      shippingClass: "FRAGILE",
      featured: true,
      isSample: true,
      artistId: zainab.id,
      collections: { connect: [{ id: colHeirloom.id }] },
      images: {
        create: [
          {
            url: "/images/hero/artwork-african-drummers.jpg",
            alt: "Ceremonial African Drummers and Dancers canvas by Zainab Chinedu",
            position: 0,
          },
          {
            url: "/images/hero/hero-african-drummers.jpg",
            alt: "Ceremonial Drummers canvas in a sunlit living room",
            position: 1,
          },
        ],
      },
    },
  });

  // 15 - Chromatic Field: Contemporary Impasto Canvas (Hero Artwork & Interior In-Situ)
  await prisma.product.create({
    data: {
      slug: "chromatic-field-impasto",
      title: "Chromatic Field: Contemporary Impasto Canvas",
      department: "ART",
      category: "ORIGINAL_PAINTING",
      productType: "ORIGINAL",
      description: "A monumental abstract built from thick, sculpted ribbons of colour. Chromatic Field rewards close looking with ridges, scrapes and layered pigment, while from across the room it reads as a luminous field of harmony. Ideal as a statement piece in minimalist interiors.",
      medium: "Heavy-body acrylic impasto on stretched canvas",
      materials: "Cotton canvas, heavy-body acrylic, modelling paste",
      year: 2026,
      widthCm: 120,
      heightCm: 120,
      depthCm: 5.0,
      weightKg: 8.2,
      orientation: "SQUARE",
      price: 315000000, // ₦3,150,000 (~$2,100 USD)
      currency: "NGN",
      stock: 1,
      status: "PUBLISHED",
      enquiryOnly: false,
      shippingClass: "FRAGILE",
      featured: true,
      isSample: true,
      artistId: nkem.id,
      collections: { connect: [{ id: colHeirloom.id }] },
      images: {
        create: [
          {
            url: "/images/hero/artwork-abstract-canvas.jpg",
            alt: "Chromatic Field impasto abstract canvas by Nkem Agbo",
            position: 0,
          },
          {
            url: "/images/hero/hero-abstract-canvas.jpg",
            alt: "Chromatic Field abstract canvas in a sunlit room",
            position: 1,
          },
        ],
      },
    },
  });

  // 7. Editorial Articles
  await prisma.article.createMany({
    data: [
      {
        slug: "the-alchemical-chemistry-of-natural-indigo",
        title: "The Alchemical Chemistry of Natural Indigo in Southwestern Nigeria",
        category: "Materials & Techniques",
        excerpt: "Exploring the century-old fermentation pits of Osogbo and Abeokuta, where fermented leaves of Lonchocarpus cyanescens produce deep, living shades of blue that change with the air.",
        body: `
# The Living Blue: Indigo as Memory and Chemistry

In southwestern Nigeria, true indigo (Adire) is not simply a pigment; it is an animate living culture. Unlike synthetic petroleum dyes that coat fibres uniformly in minutes, genuine indigo is insoluble in water until converted by alkaline fermentation into its reduced, yellowish-green *leuco* form.

Artisans in historic dye centres like Abeokuta, Osogbo, and Kano tend to these clay fermentation vats with ritualistic attentiveness. Ash water from burnt hardwood acts as the alkali; molasses, fermented plant starch, and gentle heat nurture the active microorganisms over weeks.

> "When you submerge cotton into an active indigo pit, it emerges bright green. It is only as the cloth encounters open oxygen in the courtyard air that it breathes itself into indigo. You are watching chemistry dance with atmospheric memory."

At Warmthplace, our textile collections partner directly with multi-generational master dyers. Every piece, from our hand-dyed adire cushions to Tariq Osei's mixed-media canvas grounds, is steeped in this chemical alchemy.
        `.trim(),
        coverImage: "/images/catalogue/adire-indigo-cushion.jpg",
        coverAlt: "Adire resist dyed textiles in natural indigo",
        authorName: "Yewande Balogun",
        published: true,
        publishedAt: new Date("2026-08-14T09:00:00Z"),
        isSample: true,
      },
      {
        slug: "living-with-contemporary-african-art",
        title: "Living with Meaning: How Collectors are Integrating Contemporary African Art into Minimalist Interiors",
        category: "Collecting & Interiors",
        excerpt: "A conversation with leading interior designers on balancing bold narrative canvases with serene, tactile, warm-neutral architectural living spaces.",
        body: `
# Beyond the White Cube: Art in Domestic Rhythm

For decades, the standard gallery doctrine insisted on sterile, hyper-white plaster walls: spaces stripped of domestic warmth so the artwork existed in clinical isolation. Contemporary living, however, demands intimacy.

Today’s most discerning collectors are pairing the vibrant chromatic energy of West African figurative painting with natural limewashed walls, fluted oak joinery, natural woven throws, and patinated bronze objects.

### 1. Anchor with Generous Scale
Rather than assembling crowded salon walls, choose a single monumental painting—such as Amina E. Adeleke’s *Harmattan Procession*—to anchor the primary sightline of the living or dining room. The surrounding negative space allows the intricate textile patterns to reverberate throughout the room.

### 2. Echo Tones Through Earthy Objects
Allow the palette of the canvas to subtly inform the surrounding décor. A deep indigo adire cushion on an oat linen sofa or an incised terracotta vessel on a low coffee table establishes an effortless dialogue between high art and everyday living.

### 3. Honour the Materials
Original African contemporary art possesses deep physical texture: cold wax, pumice stone, gold leaf, raw cotton weave. Position lighting so natural daylight grazes the surface at an angle, revealing the artist's hand throughout the day.
        `.trim(),
        coverImage: "/images/catalogue/harmattan-procession.jpg",
        coverAlt: "Harmattan Procession artwork in an editorial interior setting",
        authorName: "Farouk Al-Hassan",
        published: true,
        publishedAt: new Date("2026-09-02T10:30:00Z"),
        isSample: true,
      },
      {
        slug: "from-clay-to-continuity",
        title: "From Clay to Continuity: Chinwe Okoli on Revitalising Ancient Burnishing Techniques",
        category: "Studio Interviews",
        excerpt: "Inside the Enugu studio of sculptor Chinwe Okoli, where river-bed earthenware is burnished with smooth quartz pebbles and pit-fired with botanical leaves.",
        body: `
# In the Studio with Chinwe Okoli

Tucked beneath the mahogany trees on the outskirts of Enugu, Chinwe Okoli's studio smells of wet loam, dry grass, and woodsmoke.

"People often assume fine ceramic finishes require high-tech gas kilns and imported glazes," Okoli remarks as she rotates a bulbous water vessel in her lap. "In reality, the women potters of southeastern Nigeria achieved a mirror-like finish for centuries using nothing more than river-washed quartz stones and patience."

Burnishing is done when the earthenware has reached the "leather-hard" stage. Over hours of rhythmic circular motion, the rounded stone compresses the clay's fine surface platelets, sealing the pores and creating a soft, tactile sheen that artificial glazes cannot replicate.

Following burnishing, the vessels are pit-fired in an open trench covered with palm fronds. Post-firing, while the vessel is still glowing with residual heat, it is submerged in a rich broth of locust bean pods and dry mahogany leaves, permanently infusing the clay with smoky amber and ebony variations.

Each vessel available through Warmthplace Art Studio carries this direct lineage: ancient material wisdom translated into contemporary architectural form.
        `.trim(),
        coverImage: "/images/catalogue/incised-terracotta-vessel.jpg",
        coverAlt: "Chinwe Okoli burnished terracotta vessel",
        authorName: "Editorial Staff",
        published: true,
        publishedAt: new Date("2026-09-28T14:15:00Z"),
        isSample: true,
      },
    ],
  });

  console.log("Database seeded successfully with 15 products, 6 artists, 3 collections, 3 articles, 4 shipping zones, and admin account!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
