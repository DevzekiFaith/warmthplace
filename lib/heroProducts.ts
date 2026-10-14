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
    id: "hero-the-jazz-trio-session",
    slug: "the-jazz-trio-session",
    title: "The Jazz Trio Session",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
    description:
      "An original framed canvas capturing three musicians locked in improvisational conversation. Saturated cobalt, saffron and burnt sienna strokes pulse with the syncopation of a late-night Lagos jazz session. Signed by the artist, framed in hand-finished oak, and shipped with a certificate of authenticity.",
    medium: "Oil and palette-knife impasto on stretched linen, oak float frame",
    materials: "Linen canvas, professional oils, solid oak frame",
    year: 2026,
    widthCm: 100,
    heightCm: 120,
    depthCm: 5,
    weightKg: 7.4,
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
      { url: "/images/hero/artwork-jazz-trio.jpg", alt: "The Jazz Trio Session original framed canvas", position: 0 },
      { url: "/images/hero/hero-jazz-trio.jpg", alt: "The Jazz Trio Session displayed in a contemporary living room", position: 1 },
    ],
  },
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
    id: "hero-lagos-jazz-trio",
    slug: "lagos-jazz-trio",
    title: "Lagos Jazz Trio",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
    description:
      "Three jazz musicians frozen in improvisational communion — a double bass, trumpet, and flute — rendered in explosive geometric shapes of cobalt blue, crimson, gold, ivory, and forest green against a richly textured violet-purple ground. Palette-knife impasto technique gives the surface a sculptural quality that vibrates with musical energy. Signed recto and verso. Shipped with certificate of authenticity.",
    medium: "Oil and palette-knife impasto on stretched Belgian linen, black oak float frame",
    materials: "Belgian linen, professional oil pigments, solid black oak frame",
    year: 2026,
    widthCm: 120,
    heightCm: 100,
    depthCm: 5,
    weightKg: 8.2,
    orientation: "LANDSCAPE",
    price: 395000000,
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
      { url: "/images/catalogue/jazz-trio-session.jpg", alt: "Lagos Jazz Trio original oil painting — three musicians in cobalt, crimson and gold", position: 0 },
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
    id: "hero-artist-adebayo-olufemi",
    slug: "adebayo-olufemi",
    name: "Adebayo Olufemi",
    discipline: "Contemporary Painter & Figurative Colorist",
    location: "Lagos, Nigeria",
    shortBio: "Captures the syncopated energy and nocturnal vibrancy of Lagos musical and cultural gatherings.",
    bio: "Adebayo Olufemi is a celebrated contemporary painter whose high-contrast impasto works document West Africa's vibrant live music scenes. Working primarily with heavy oil pigments and palette-knife techniques, Olufemi translates musical syncopation into rich visual rhythms that celebrate communal communion.",
    portraitImage: "/images/hero/artwork-jazz-trio.jpg",
    coverImage: "/images/hero/hero-jazz-trio.jpg",
    products: [
      {
        id: "hero-the-jazz-trio-session",
        slug: "the-jazz-trio-session",
        title: "The Jazz Trio Session",
        department: "ART",
        category: "ORIGINAL_PAINTING",
        productType: "ORIGINAL",
        price: 385000000,
        currency: "NGN",
        stock: 1,
        shippingClass: "FRAGILE",
        artist: { name: "Adebayo Olufemi", slug: "adebayo-olufemi" },
        images: [
          { url: "/images/hero/artwork-jazz-trio.jpg", alt: "The Jazz Trio Session original framed canvas", position: 0 },
        ],
      },
    ],
  },
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
    portraitImage: "/images/catalogue/indigo-tide.jpg",
    coverImage: "/images/catalogue/indigo-tide.jpg",
    products: [
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
        id: "hero-lagos-jazz-trio",
        slug: "lagos-jazz-trio",
        title: "Lagos Jazz Trio",
        department: "ART",
        category: "ORIGINAL_PAINTING",
        productType: "ORIGINAL",
        price: 395000000,
        currency: "NGN",
        stock: 1,
        shippingClass: "FRAGILE",
        artist: { name: "Nkem Agbo", slug: "nkem-agbo" },
        images: [
          { url: "/images/catalogue/jazz-trio-session.jpg", alt: "Lagos Jazz Trio original oil painting by Nkem Agbo", position: 0 },
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

