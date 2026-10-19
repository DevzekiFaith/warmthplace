/**
 * Featured hero artworks. Used by the product detail page as a fallback when
 * the database has not been seeded, and mirrored in prisma/seed.ts.
 * Prices are in kobo (NGN).
 */
export interface HeroProduct {
  id: string;
  slug: string;
  title: string;
  department: string;
  category: string;
  productType: string;
  editionSize: number | null;
  description: string;
  medium: string;
  materials: string;
  year: number;
  widthCm: number;
  heightCm: number;
  depthCm: number;
  weightKg: number;
  orientation: string;
  price: number;
  currency: string;
  stock: number;
  status: string;
  enquiryOnly: boolean;
  shippingClass: string;
  artist: { name: string; slug: string; discipline: string; location: string };
  images: { url: string; alt: string; position: number }[];
}

export const HERO_PRODUCTS: HeroProduct[] = [

  {
    id: "hero-ceremonial-african-drummers",
    slug: "ceremonial-african-drummers",
    title: "Ceremonial African Drummers & Dancers",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
    description:
      "A rhythmic celebration of communal ceremony: drummers and dancers rendered in expressive figures against a warm ochre ground. Layered acrylic and mineral pigments give the surface a tactile, sun-baked richness that anchors any sunlit living space.",
    medium: "Acrylic and mineral pigment on stretched cotton canvas",
    materials: "Cotton canvas, acrylic, natural mineral pigment, timber stretcher",
    year: 2026,
    widthCm: 90,
    heightCm: 130,
    depthCm: 4,
    weightKg: 6.1,
    orientation: "PORTRAIT",
    price: 50000000, // ₦500,000 NGN
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    artist: {
      name: "Nkem Agbo",
      slug: "nkem-agbo",
      discipline: "Contemporary Painter & Mixed-Media Impasto Colorist",
      location: "Enugu & Lagos, Nigeria",
    },
    images: [
      { url: "/images/hero/hero-african-drummers.jpg", alt: "Ceremonial African Drummers & Dancers canvas by Nkem Agbo", position: 0 },
    ],
  },
  {
    id: "hero-chromatic-field-impasto",
    slug: "chromatic-field-impasto",
    title: "Canopy & Grace: White Stags at Twilight",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
    description:
      "A monumental landscape masterpiece capturing two ethereal white stags bathed in twilight serenity. Set against a deep atmospheric expanse with delicate weeping willow branches, dripping golden-yellow blossoms, and a radiant full moon reflecting upon still waters, the composition evokes primordial grace, silence, and sacred nature. Rendered in rich textural impasto with radiant emerald greens, cadmium yellows, and luminescent white figures. Hand-signed recto and verso, delivered with an embossed studio certificate of provenance.",
    medium: "Heavy-body acrylic, textural impasto, and mineral pigments on stretched Belgian linen, obsidian floating frame",
    materials: "Belgian linen canvas, artist acrylics & gloss enamel, timber stretcher, matte black float frame",
    year: 2026,
    widthCm: 150,
    heightCm: 100,
    depthCm: 5,
    weightKg: 8.5,
    orientation: "LANDSCAPE",
    price: 50000000, // ₦500,000 NGN
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    artist: {
      name: "Nkem Agbo",
      slug: "nkem-agbo",
      discipline: "Contemporary Painter & Mixed-Media Impasto Colorist",
      location: "Enugu & Lagos, Nigeria",
    },
    images: [
      { url: "/images/catalogue/white-stags-twilight-room.jpg", alt: "Canopy & Grace: White Stags at Twilight canvas by Nkem Agbo", position: 0 },
    ],
  },
  {
    id: "hero-obsidian-storm",
    slug: "obsidian-storm",
    title: "Obsidian Storm",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
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
    price: 445000000,
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    artist: {
      name: "Nkem Agbo",
      slug: "nkem-agbo",
      discipline: "Contemporary Painter & Mixed-Media Impasto Colorist",
      location: "Enugu & Lagos, Nigeria",
    },
    images: [
      { url: "/images/catalogue/obsidian-storm.jpg", alt: "Obsidian Storm — dark impasto abstract with silver cracks and ember highlights", position: 0 },
    ],
  },
  {
    id: "hero-flora-genesis",
    slug: "flora-genesis",
    title: "Flora Genesis",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
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
    price: 320000000,
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    artist: {
      name: "Nkem Agbo",
      slug: "nkem-agbo",
      discipline: "Contemporary Painter & Mixed-Media Impasto Colorist",
      location: "Enugu & Lagos, Nigeria",
    },
    images: [
      { url: "/images/catalogue/flora-genesis.jpg", alt: "Flora Genesis — bold colourful botanical abstract in yellow, green, red and blue", position: 0 },
    ],
  },
  {
    id: "hero-chromatic-bloom",
    slug: "chromatic-bloom",
    title: "Chromatic Bloom",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
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
    price: 355000000,
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    artist: {
      name: "Nkem Agbo",
      slug: "nkem-agbo",
      discipline: "Contemporary Painter & Mixed-Media Impasto Colorist",
      location: "Enugu & Lagos, Nigeria",
    },
    images: [
      { url: "/images/catalogue/chromatic-bloom.jpg", alt: "Chromatic Bloom — tall portrait impasto abstract in cobalt, yellow and green on black", position: 0 },
    ],
  },
  {
    id: "hero-oya-the-dancer",
    slug: "oya-the-dancer",
    title: "Oya, the Dancer",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
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
    price: 430000000,
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    artist: {
      name: "Nkem Agbo",
      slug: "nkem-agbo",
      discipline: "Contemporary Painter & Mixed-Media Impasto Colorist",
      location: "Enugu & Lagos, Nigeria",
    },
    images: [
      { url: "/images/catalogue/oya-the-dancer.jpg", alt: "Oya the Dancer — figurative portrait of Yoruba deity in geometric cloth on ochre ground", position: 0 },
    ],
  },
  {
    id: "hero-golden-harvest-matriarchs",
    slug: "golden-harvest-matriarchs",
    title: "Golden Harvest of the Matriarchs",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
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
    price: 460000000,
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    artist: {
      name: "Nkem Agbo",
      slug: "nkem-agbo",
      discipline: "Contemporary Painter & Mixed-Media Impasto Colorist",
      location: "Enugu & Lagos, Nigeria",
    },
    images: [
      { url: "/images/catalogue/golden-harvest-matriarchs.jpg", alt: "Golden Harvest of the Matriarchs original oil painting by Nkem Agbo", position: 0 },
      { url: "/images/catalogue/golden-harvest-matriarchs-room.jpg", alt: "Golden Harvest of the Matriarchs displayed in contemporary living room interior", position: 1 },
    ],
  },
  {
    id: "hero-emerald-solitude",
    slug: "emerald-solitude",
    title: "Emerald Solitude: The Chartreuse Crown",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
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
    price: 385000000,
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    artist: {
      name: "Nkem Agbo",
      slug: "nkem-agbo",
      discipline: "Contemporary Painter & Mixed-Media Impasto Colorist",
      location: "Enugu & Lagos, Nigeria",
    },
    images: [
      { url: "/images/catalogue/emerald-solitude.jpg", alt: "Emerald Solitude: The Chartreuse Crown by Nkem Agbo", position: 0 },
      { url: "/images/catalogue/emerald-solitude-room.jpg", alt: "Emerald Solitude displayed in luxury interior setting", position: 1 },
    ],
  },
  {
    id: "hero-canopy-and-grace",
    slug: "canopy-and-grace",
    title: "Canopy & Grace: White Stags at Twilight",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
    description:
      "A monumental landscape masterpiece capturing two ethereal white stags bathed in twilight serenity. Set against a deep atmospheric expanse with delicate weeping willow branches, dripping golden-yellow blossoms, and a radiant full moon reflecting upon still waters, the composition evokes primordial grace, silence, and sacred nature. Rendered in rich textural impasto with radiant emerald greens, cadmium yellows, and luminescent white figures. Hand-signed recto and verso, delivered with an embossed studio certificate of provenance.",
    medium: "Heavy-body acrylic, textural impasto, and mineral pigments on stretched Belgian linen, obsidian floating frame",
    materials: "Belgian linen canvas, artist acrylics & gloss enamel, timber stretcher, matte black float frame",
    year: 2026,
    widthCm: 150,
    heightCm: 100,
    depthCm: 5,
    weightKg: 8.5,
    orientation: "LANDSCAPE",
    price: 50000000, // ₦500,000 NGN
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    artist: {
      name: "Nkem Agbo",
      slug: "nkem-agbo",
      discipline: "Contemporary Painter & Mixed-Media Impasto Colorist",
      location: "Enugu & Lagos, Nigeria",
    },
    images: [
      { url: "/images/catalogue/white-stags-twilight.jpg", alt: "Canopy & Grace: White Stags at Twilight by Nkem Agbo", position: 0 },
      { url: "/images/catalogue/white-stags-twilight-room.jpg", alt: "Canopy & Grace displayed in contemporary living room interior", position: 1 },
    ],
  },
  {
    id: "hero-kinetic-drummers",
    slug: "kinetic-drummers",
    title: "Tree of Life: Sacred Ochre Canopy",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
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
    price: 55000000,
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    artist: {
      name: "Nkem Agbo",
      slug: "nkem-agbo",
      discipline: "Contemporary Painter & Mixed-Media Impasto Colorist",
      location: "Enugu & Lagos, Nigeria",
    },
    images: [
      { url: "/images/catalogue/tree-of-life-ochre.jpg", alt: "Tree of Life: Sacred Ochre Canopy tactile relief painting by Nkem Agbo", position: 0 },
      { url: "/images/catalogue/tree-of-life-ochre-room.jpg", alt: "Tree of Life displayed in contemporary living room interior", position: 1 },
    ],
  },
  {
    id: "hero-ochre-silhouette",
    slug: "ochre-silhouette",
    title: "Solar Vortex: The Obsidian Rhythms",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
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
    price: 50000000, // ₦500,000 (~$333 USD)
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    artist: {
      name: "Nkem Agbo",
      slug: "nkem-agbo",
      discipline: "Contemporary Painter & Mixed-Media Impasto Colorist",
      location: "Enugu & Lagos, Nigeria",
    },
    images: [
      { url: "/images/catalogue/solar-vortex.jpg", alt: "Solar Vortex: The Obsidian Rhythms tactile relief painting by Nkem Agbo", position: 0 },
      { url: "/images/catalogue/solar-vortex-room.jpg", alt: "Solar Vortex displayed in contemporary minimalist living room interior", position: 1 },
    ],
  },
  {
    id: "hero-indigo-tide-evening-lantern",
    slug: "indigo-tide-evening-lantern",
    title: "Ceremonial Rhythm: The Emerald Drummer",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
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
    price: 280000000,
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    artist: {
      name: "Nkem Agbo",
      slug: "nkem-agbo",
      discipline: "Contemporary Painter & Mixed-Media Impasto Colorist",
      location: "Enugu & Lagos, Nigeria",
    },
    images: [
      { url: "/images/catalogue/indigo-tide.jpg", alt: "Indigo Tide & The Evening Lantern mixed-media canvas by Nkem Agbo", position: 0 },
      { url: "/images/catalogue/indigo-tide-room.jpg", alt: "Indigo Tide & The Evening Lantern displayed in modern interior", position: 1 },
    ],
  },
];

export function getHeroProduct(slug: string): HeroProduct | undefined {
  return HERO_PRODUCTS.find(
    (p) =>
      p.slug === slug ||
      (slug === "indigo-tide" && p.slug === "indigo-tide-evening-lantern") ||
      (slug === "canopy-and-grace" && (p.slug === "canopy-and-grace" || p.slug === "chromatic-field-impasto")) ||
      (slug === "chromatic-field-impasto" && p.slug === "chromatic-field-impasto")
  );
}

export interface HeroArtist {
  id: string;
  slug: string;
  name: string;
  discipline: string;
  location: string;
  shortBio: string;
  bio: string;
  portraitImage: string;
  coverImage: string;
  products: {
    id: string;
    slug: string;
    title: string;
    department: string;
    category: string;
    productType: string;
    price: number;
    currency: string;
    stock: number;
    shippingClass: string;
    artist: { name: string; slug: string };
    images: { url: string; alt: string; position: number }[];
  }[];
}

export const HERO_ARTISTS: HeroArtist[] = [
  {
    id: "hero-artist-nkem-agbo",
    slug: "nkem-agbo",
    name: "Nkem Agbo",
    discipline: "Contemporary Painter & Mixed-Media Impasto Colorist",
    location: "Enugu & Lagos, Nigeria",
    shortBio:
      "Master of monumental textured impasto, elemental coastal mythologies, and luminous mineral pigments on canvas.",
    bio: "Nkem Agbo is an acclaimed contemporary Nigerian visual artist whose monumental canvas works explore physical texture, obsidian topographies, and luminous coastal mythologies. Working with heavy-body acrylics, palette-knife impasto, and natural pigment slips, Agbo builds sculpted relief surfaces that capture West Africa's vibrant architectural and natural landscapes.",
    portraitImage: "/images/catalogue/tree-of-life-ochre.jpg",
    coverImage: "/images/catalogue/tree-of-life-ochre.jpg",
    products: [
      {
        id: "hero-ceremonial-african-drummers",
        slug: "ceremonial-african-drummers",
        title: "Ceremonial African Drummers & Dancers",
        department: "ART",
        category: "ORIGINAL_PAINTING",
        productType: "ORIGINAL",
        price: 50000000, // ₦500,000 NGN
        currency: "NGN",
        stock: 1,
        shippingClass: "FRAGILE",
        artist: { name: "Nkem Agbo", slug: "nkem-agbo" },
        images: [
          { url: "/images/hero/hero-african-drummers.jpg", alt: "Ceremonial African Drummers & Dancers canvas by Nkem Agbo", position: 0 },
        ],
      },
      {
        id: "hero-ochre-silhouette",
        slug: "ochre-silhouette",
        title: "Solar Vortex: The Obsidian Rhythms",
        department: "ART",
        category: "ORIGINAL_PAINTING",
        productType: "ORIGINAL",
        price: 50000000,
        currency: "NGN",
        stock: 1,
        shippingClass: "FRAGILE",
        artist: { name: "Nkem Agbo", slug: "nkem-agbo" },
        images: [
          { url: "/images/catalogue/solar-vortex.jpg", alt: "Solar Vortex: The Obsidian Rhythms by Nkem Agbo", position: 0 },
        ],
      },
      {
        id: "hero-obsidian-storm",
        slug: "obsidian-storm",
        title: "Obsidian Storm",
        department: "ART",
        category: "ORIGINAL_PAINTING",
        productType: "ORIGINAL",
        price: 445000000,
        currency: "NGN",
        stock: 1,
        shippingClass: "FRAGILE",
        artist: { name: "Nkem Agbo", slug: "nkem-agbo" },
        images: [
          { url: "/images/catalogue/obsidian-storm.jpg", alt: "Obsidian Storm — dark impasto abstract with silver cracks", position: 0 },
        ],
      },
      {
        id: "hero-chromatic-bloom",
        slug: "chromatic-bloom",
        title: "Chromatic Bloom",
        department: "ART",
        category: "ORIGINAL_PAINTING",
        productType: "ORIGINAL",
        price: 355000000,
        currency: "NGN",
        stock: 1,
        shippingClass: "FRAGILE",
        artist: { name: "Nkem Agbo", slug: "nkem-agbo" },
        images: [
          { url: "/images/catalogue/chromatic-bloom.jpg", alt: "Chromatic Bloom tall impasto canvas by Nkem Agbo", position: 0 },
        ],
      },
      {
        id: "hero-flora-genesis",
        slug: "flora-genesis",
        title: "Flora Genesis",
        department: "ART",
        category: "ORIGINAL_PAINTING",
        productType: "ORIGINAL",
        price: 320000000,
        currency: "NGN",
        stock: 1,
        shippingClass: "FRAGILE",
        artist: { name: "Nkem Agbo", slug: "nkem-agbo" },
        images: [
          { url: "/images/catalogue/flora-genesis.jpg", alt: "Flora Genesis botanical abstract canvas by Nkem Agbo", position: 0 },
        ],
      },
      {
        id: "hero-oya-the-dancer",
        slug: "oya-the-dancer",
        title: "Oya, the Dancer",
        department: "ART",
        category: "ORIGINAL_PAINTING",
        productType: "ORIGINAL",
        price: 430000000,
        currency: "NGN",
        stock: 1,
        shippingClass: "FRAGILE",
        artist: { name: "Nkem Agbo", slug: "nkem-agbo" },
        images: [
          { url: "/images/catalogue/oya-the-dancer.jpg", alt: "Oya the Dancer figurative canvas by Nkem Agbo", position: 0 },
        ],
      },
      {
        id: "hero-golden-harvest-matriarchs",
        slug: "golden-harvest-matriarchs",
        title: "Golden Harvest of the Matriarchs",
        department: "ART",
        category: "ORIGINAL_PAINTING",
        productType: "ORIGINAL",
        price: 460000000,
        currency: "NGN",
        stock: 1,
        shippingClass: "FRAGILE",
        artist: { name: "Nkem Agbo", slug: "nkem-agbo" },
        images: [
          { url: "/images/catalogue/golden-harvest-matriarchs.jpg", alt: "Golden Harvest of the Matriarchs by Nkem Agbo", position: 0 },
        ],
      },
      {
        id: "hero-emerald-solitude",
        slug: "emerald-solitude",
        title: "Emerald Solitude: The Chartreuse Crown",
        department: "ART",
        category: "ORIGINAL_PAINTING",
        productType: "ORIGINAL",
        price: 385000000,
        currency: "NGN",
        stock: 1,
        shippingClass: "FRAGILE",
        artist: { name: "Nkem Agbo", slug: "nkem-agbo" },
        images: [
          { url: "/images/catalogue/emerald-solitude.jpg", alt: "Emerald Solitude by Nkem Agbo", position: 0 },
        ],
      },
      {
        id: "hero-canopy-and-grace",
        slug: "canopy-and-grace",
        title: "Canopy & Grace: White Stags at Twilight",
        department: "ART",
        category: "ORIGINAL_PAINTING",
        productType: "ORIGINAL",
        price: 50000000, // ₦500,000 NGN
        currency: "NGN",
        stock: 1,
        shippingClass: "FRAGILE",
        artist: { name: "Nkem Agbo", slug: "nkem-agbo" },
        images: [
          { url: "/images/catalogue/white-stags-twilight-room.jpg", alt: "Canopy & Grace: White Stags at Twilight canvas by Nkem Agbo", position: 0 },
        ],
      },
      {
        id: "hero-kinetic-drummers",
        slug: "kinetic-drummers",
        title: "Tree of Life: Sacred Ochre Canopy",
        department: "ART",
        category: "ORIGINAL_PAINTING",
        productType: "ORIGINAL",
        price: 55000000,
        currency: "NGN",
        stock: 1,
        shippingClass: "FRAGILE",
        artist: { name: "Nkem Agbo", slug: "nkem-agbo" },
        images: [
          { url: "/images/catalogue/tree-of-life-ochre.jpg", alt: "Tree of Life: Sacred Ochre Canopy by Nkem Agbo", position: 0 },
        ],
      },
      {
        id: "hero-indigo-tide-evening-lantern",
        slug: "indigo-tide-evening-lantern",
        title: "Ceremonial Rhythm: The Emerald Drummer",
        department: "ART",
        category: "ORIGINAL_PAINTING",
        productType: "ORIGINAL",
        price: 280000000,
        currency: "NGN",
        stock: 1,
        shippingClass: "FRAGILE",
        artist: { name: "Nkem Agbo", slug: "nkem-agbo" },
        images: [
          { url: "/images/catalogue/indigo-tide.jpg", alt: "Indigo Tide & The Evening Lantern by Nkem Agbo", position: 0 },
        ],
      },
    ],
  },
];

export function getHeroArtist(slug: string): HeroArtist | undefined {
  return (
    HERO_ARTISTS.find((a) => a.slug === slug) ||
    HERO_ARTISTS.find((a) => a.slug === "nkem-agbo") ||
    HERO_ARTISTS[0]
  );
}

