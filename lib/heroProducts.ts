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
    price: 420000000,
    currency: "NGN",
    stock: 1,
    status: "PUBLISHED",
    enquiryOnly: false,
    shippingClass: "FRAGILE",
    artist: {
      name: "Zainab Chinedu",
      slug: "zainab-chinedu",
      discipline: "Figurative Painter",
      location: "Abuja, Nigeria",
    },
    images: [
      { url: "/images/hero/artwork-african-drummers.jpg", alt: "Ceremonial African Drummers and Dancers canvas", position: 0 },
      { url: "/images/hero/hero-african-drummers.jpg", alt: "Ceremonial Drummers canvas in a sunlit living room", position: 1 },
    ],
  },
  {
    id: "hero-chromatic-field-impasto",
    slug: "chromatic-field-impasto",
    title: "Chromatic Field: Contemporary Impasto Canvas",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
    description:
      "A monumental abstract built from thick, sculpted ribbons of colour. Chromatic Field rewards close looking with ridges, scrapes and layered pigment, while from across the room it reads as a luminous field of harmony. Ideal as a statement piece in minimalist interiors.",
    medium: "Heavy-body acrylic impasto on stretched canvas",
    materials: "Cotton canvas, heavy-body acrylic, modelling paste",
    year: 2026,
    widthCm: 120,
    heightCm: 120,
    depthCm: 5,
    weightKg: 8.2,
    orientation: "SQUARE",
    price: 315000000,
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
      { url: "/images/hero/artwork-abstract-canvas.jpg", alt: "Chromatic Field impasto abstract canvas", position: 0 },
      { url: "/images/hero/hero-abstract-canvas.jpg", alt: "Chromatic Field abstract canvas in a sunlit room", position: 1 },
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
    title: "Canopy & Grace: White Gazelles at Twilight",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
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
    price: 480000000,
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
      { url: "/images/catalogue/canopy-and-grace.jpg", alt: "Canopy & Grace: White Gazelles at Twilight by Nkem Agbo", position: 0 },
      { url: "/images/catalogue/canopy-and-grace-room.jpg", alt: "Canopy & Grace displayed above a contemporary linen sofa", position: 1 },
    ],
  },
  {
    id: "hero-kinetic-drummers",
    slug: "kinetic-drummers",
    title: "Kinetic Drummers of the Red Earth",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
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
    price: 410000000,
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
      { url: "/images/catalogue/kinetic-drummers.jpg", alt: "Kinetic Drummers of the Red Earth original painting by Nkem Agbo", position: 0 },
      { url: "/images/catalogue/kinetic-drummers-room.jpg", alt: "Kinetic Drummers of the Red Earth in modern gallery lounge", position: 1 },
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
    price: 110000000,
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
];

export function getHeroProduct(slug: string): HeroProduct | undefined {
  return HERO_PRODUCTS.find((p) => p.slug === slug);
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
    id: "hero-artist-zainab-chinedu",
    slug: "zainab-chinedu",
    name: "Zainab Chinedu",
    discipline: "Figurative Painter & Ceremonial Colorist",
    location: "Abuja, Nigeria",
    shortBio: "Explores communal ritual, sacred dance, and kinetic rhythms with warm mineral ochres and raw pigments.",
    bio: "Zainab Chinedu crafts monumental figurative works centered on community cohesion and ceremonial celebration. Her layered surfaces evoke sun-baked earth, ritual attire, and ancestral resonance across contemporary domestic spaces.",
    portraitImage: "/images/hero/artwork-african-drummers.jpg",
    coverImage: "/images/hero/hero-african-drummers.jpg",
    products: [
      {
        id: "hero-ceremonial-african-drummers",
        slug: "ceremonial-african-drummers",
        title: "Ceremonial African Drummers & Dancers",
        department: "ART",
        category: "ORIGINAL_PAINTING",
        productType: "ORIGINAL",
        price: 420000000,
        currency: "NGN",
        stock: 1,
        shippingClass: "FRAGILE",
        artist: { name: "Zainab Chinedu", slug: "zainab-chinedu" },
        images: [
          { url: "/images/hero/artwork-african-drummers.jpg", alt: "Ceremonial African Drummers and Dancers canvas", position: 0 },
        ],
      },
    ],
  },
  {
    id: "hero-artist-nkem-agbo",
    slug: "nkem-agbo",
    name: "Nkem Agbo",
    discipline: "Contemporary Painter & Mixed-Media Impasto Colorist",
    location: "Enugu & Lagos, Nigeria",
    shortBio:
      "Master of monumental textured impasto, elemental coastal mythologies, and luminous mineral pigments on canvas.",
    bio: "Nkem Agbo is an acclaimed contemporary Nigerian visual artist whose monumental canvas works explore physical texture, obsidian topographies, and luminous coastal mythologies. Working with heavy-body acrylics, palette-knife impasto, and natural pigment slips, Agbo builds sculpted relief surfaces that capture West Africa's vibrant architectural and natural landscapes.",
    portraitImage: "/images/catalogue/solar-vortex.jpg",
    coverImage: "/images/catalogue/solar-vortex.jpg",
    products: [
      {
        id: "hero-ochre-silhouette",
        slug: "ochre-silhouette",
        title: "Solar Vortex: The Obsidian Rhythms",
        department: "ART",
        category: "ORIGINAL_PAINTING",
        productType: "ORIGINAL",
        price: 110000000,
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
        title: "Canopy & Grace: White Gazelles at Twilight",
        department: "ART",
        category: "ORIGINAL_PAINTING",
        productType: "ORIGINAL",
        price: 480000000,
        currency: "NGN",
        stock: 1,
        shippingClass: "FRAGILE",
        artist: { name: "Nkem Agbo", slug: "nkem-agbo" },
        images: [
          { url: "/images/catalogue/canopy-and-grace.jpg", alt: "Canopy & Grace by Nkem Agbo", position: 0 },
        ],
      },
      {
        id: "hero-kinetic-drummers",
        slug: "kinetic-drummers",
        title: "Kinetic Drummers of the Red Earth",
        department: "ART",
        category: "ORIGINAL_PAINTING",
        productType: "ORIGINAL",
        price: 410000000,
        currency: "NGN",
        stock: 1,
        shippingClass: "FRAGILE",
        artist: { name: "Nkem Agbo", slug: "nkem-agbo" },
        images: [
          { url: "/images/catalogue/kinetic-drummers.jpg", alt: "Kinetic Drummers of the Red Earth by Nkem Agbo", position: 0 },
        ],
      },
    ],
  },
];

export function getHeroArtist(slug: string): HeroArtist | undefined {
  if (slug === "tariq-osei") {
    return HERO_ARTISTS.find((a) => a.slug === "nkem-agbo") || HERO_ARTISTS.find((a) => a.slug === slug);
  }
  return HERO_ARTISTS.find((a) => a.slug === slug);
}

