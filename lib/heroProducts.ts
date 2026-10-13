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
      name: "Adebayo Olufemi",
      slug: "adebayo-olufemi",
      discipline: "Contemporary Painter",
      location: "Lagos, Nigeria",
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
      name: "Tariq Osei",
      slug: "tariq-osei",
      discipline: "Mixed-Media Painter & Printmaker",
      location: "Accra, Ghana & London",
    },
    images: [
      { url: "/images/hero/artwork-abstract-canvas.jpg", alt: "Chromatic Field impasto abstract canvas", position: 0 },
      { url: "/images/hero/hero-abstract-canvas.jpg", alt: "Chromatic Field abstract canvas in a sunlit room", position: 1 },
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
];

export function getHeroArtist(slug: string): HeroArtist | undefined {
  return HERO_ARTISTS.find((a) => a.slug === slug);
}

