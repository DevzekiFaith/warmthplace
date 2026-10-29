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
    id: "hero-meadow-symphony-panoramic-impasto",
    slug: "meadow-symphony-panoramic-impasto",
    title: "Meadow Symphony: Panoramic Chromatic Impasto",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
    description:
      "A commanding wide-format abstract expressionist canvas bursting with sculptural palette-knife blooms of electric cobalt blue, sunlit cadmium yellow, lush viridian green, burnt tangerine, and titanium white across a deep obsidian ground. Every cluster of pigment stands in three-dimensional relief, catching ambient daylight and casting dynamic micro-shadows across the surface. Conceived as a panoramic statement work for grand living rooms and architectural feature walls, hand-signed by Nkem Agbo and presented in a slim matte black floater frame.",
    medium:
      "Sculptural palette-knife acrylic impasto and high-relief modelling paste on wide-format stretched canvas, matte black floating frame",
    materials:
      "Heavy cotton-linen canvas, high-density acrylic impasto, mineral pigments, matte black hardwood floater frame",
    year: 2026,
    widthCm: 160,
    heightCm: 90,
    depthCm: 5.0,
    weightKg: 8.4,
    orientation: "LANDSCAPE",
    price: 31000000, // ₦310,000 NGN
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
      {
        url: "/images/catalogue/meadow-symphony-panoramic-impasto-room.jpg",
        alt: "Meadow Symphony: Panoramic Chromatic Impasto displayed in sunlit contemporary living room",
        position: 0,
      },
    ],
  },
  {
    id: "hero-white-stags-twilight-glade",
    slug: "white-stags-twilight-glade",
    title: "White Stags of the Moonlit Glade",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
    description:
      "A mystical nocturnal wilderness canvas where two luminous ivory-white antlered stags emerge inside an enchanted twilight forest. Against a deep indigo-obsidian ground alive with cascading golden-yellow and crimson impasto drips, sculpted emerald willow boughs frame a glowing full moon whose reflection shimmers across still midnight waters. On the left, a stag stands sentinel upon a stone outcrop; on the right, its companion strides gracefully through emerald reeds. Signed recto and verso by Nkem Agbo with studio certificate of authenticity.",
    medium:
      "Heavy-body acrylic impasto, dimensional botanical relief, and titanium-white silhouette work on stretched Belgian linen",
    materials:
      "Belgian linen canvas, heavy-body acrylics & modelling paste, cadmium yellow & emerald glazes, solid timber stretcher",
    year: 2026,
    widthCm: 145,
    heightCm: 95,
    depthCm: 5.0,
    weightKg: 7.9,
    orientation: "LANDSCAPE",
    price: 29000000, // ₦290,000 NGN
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
      {
        url: "/images/catalogue/white-stags-twilight-glade-room.jpg",
        alt: "White Stags of the Moonlit Glade displayed above modern bouclé sectional sofa",
        position: 0,
      },
    ],
  },
  {
    id: "hero-royal-accord-ankara-couple",
    slug: "royal-accord-ankara-couple",
    title: "Royal Accord: Sovereign Couple on Olive Burlap",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
    description:
      "An intimate figurative portrait celebrating partnership, regal composure, and West African sartorial heritage on raw olive-gold woven burlap. Rendered in stylized sculptural charcoal and warm bronze-gold highlights, a poised couple leans together in quiet communion—he in a tall botanical-patterned fila cap, she crowned in a sweeping floral gele headwrap and matching crimson, emerald, and turquoise Ankara wrappers. The raw textile grain of the ground lends an earthy, timeless monumentality to the work. Framed in matte obsidian and signed by Nkem Agbo.",
    medium:
      "Charcoal-black impasto, metallic gold dry-brush, and vibrant botanical acrylics on woven olive-ochre burlap, matte black floating frame",
    materials:
      "Hand-loomed olive-ochre burlap linen, heavy-body acrylics, bronze-gold pigment, matte black hardwood floater frame",
    year: 2026,
    widthCm: 90,
    heightCm: 130,
    depthCm: 5.0,
    weightKg: 6.8,
    orientation: "PORTRAIT",
    price: 26500000, // ₦265,000 NGN
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
      {
        url: "/images/catalogue/royal-accord-ankara-couple-room.jpg",
        alt: "Royal Accord: Sovereign Couple on Olive Burlap displayed in contemporary living room",
        position: 0,
      },
    ],
  },
  {
    id: "hero-savannah-strata-azure-horizon",
    slug: "savannah-strata-azure-horizon",
    title: "Savannah Strata: Azure Sky & Ochre Ridges",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
    description:
      "A serene, architectural landscape composition that reimagines West African plateau horizons through tactile material strata. Beneath a sweeping cerulean and cloud-washed sky, undulating ridges of crumpled gold-ochre parchment, deep royal violet, emerald valleys, and woven celadon-mint linen are divided by crisp chalk-white geological fault lines. The interplay between smooth atmospheric brushwork and dimensional earth-toned relief creates a meditative focal point for sunlit interiors. Hand-signed by Nkem Agbo with studio certificate of provenance.",
    medium:
      "Mixed-media textile collage, sculpted mineral ochre relief, and cerulean acrylic wash on square gallery canvas",
    materials:
      "Stretched cotton-linen canvas, textured ochre fiber relief, woven celadon textile inlay, artist acrylics, timber stretcher",
    year: 2026,
    widthCm: 110,
    heightCm: 110,
    depthCm: 4.5,
    weightKg: 6.9,
    orientation: "SQUARE",
    price: 24000000, // ₦240,000 NGN
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
      {
        url: "/images/catalogue/savannah-strata-azure-horizon-room.jpg",
        alt: "Savannah Strata: Azure Sky & Ochre Ridges displayed above cream sofa in living room",
        position: 0,
      },
    ],
  },
  {
    id: "hero-tufted-companion-on-olive-jute",
    slug: "tufted-companion-on-olive-jute",
    title: "The Dapper Companion: Tactile Study on Olive Jute",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
    description:
      "A joyful, high-relief mixed-media portrait executed on coarsely woven olive-moss jute hessian. At its center sits a sculptural, cream-gold curly-coated puppy rendered in thick, touchable tufted impasto, sporting a hand-painted botanical bow tie and perched atop a vibrant floral mat finished with real hanging cotton-yarn fringe tassels. Blending contemporary pop playfulness with artisanal West African fiber and relief craft, this work brings warmth, charm, and tactile dimension to modern living spaces. Signed recto and verso by Nkem Agbo with studio certificate of provenance.",
    medium:
      "Sculptural relief impasto, botanical acrylics, and hand-knotted cotton fringe on woven olive-moss raw jute, matte black floating frame",
    materials:
      "Hand-loomed olive jute hessian, high-build acrylic impasto paste, braided cotton fringe yarn, obsidian hardwood floater frame",
    year: 2026,
    widthCm: 85,
    heightCm: 130,
    depthCm: 5.0,
    weightKg: 6.6,
    orientation: "PORTRAIT",
    price: 21400000, // ₦214,000 NGN
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
      {
        url: "/images/catalogue/tufted-companion-on-olive-jute-room.jpg",
        alt: "The Dapper Companion: Tactile Study on Olive Jute displayed in sunlit contemporary living room",
        position: 0,
      },
    ],
  },
  {
    id: "hero-courtyard-tambourine-celebration",
    slug: "courtyard-tambourine-celebration",
    title: "Moonlit Tambourine: Village Courtyard Celebration",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
    description:
      "A panoramic narrative canvas capturing the warmth and communal joy of an evening courtyard gathering. On the left, a matriarch in a turquoise bodice, crimson headwrap, and fiery palette-knife impasto skirt strikes a luminous golden tambourine that glows like a harvest moon. Across the stone-dotted earthen courtyard, two dancers in monochrome geometric wrappers and ankle rattles move in spirited dialogue beside a thatched homestead nestled beneath a fruiting citrus tree. Signed by Nkem Agbo and delivered in a custom matte black floater frame.",
    medium:
      "Oil, palette-knife impasto, and natural earth pigments on wide-format stretched linen, matte black floating frame",
    materials:
      "Stretched linen canvas, oil & acrylic impasto, raw umber and ochre pigments, matte black hardwood floater frame",
    year: 2026,
    widthCm: 150,
    heightCm: 95,
    depthCm: 5.0,
    weightKg: 8.2,
    orientation: "LANDSCAPE",
    price: 31000000, // ₦310,000 NGN
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
      {
        url: "/images/catalogue/courtyard-tambourine-celebration-room.jpg",
        alt: "Moonlit Tambourine: Village Courtyard Celebration displayed in living room interior",
        position: 0,
      },
    ],
  },
  {
    id: "hero-midnight-afrobeat-saxophonist",
    slug: "midnight-afrobeat-saxophonist",
    title: "Midnight Afrobeat: The Polychrome Saxophonist",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
    description:
      "An electrifying tribute to Lagos night-life and the spiritual pulse of Afrobeat jazz. Against a nocturnal obsidian-black ground energized by spontaneous Pollock-style colour splatters, a lone saxophonist stands in profile wearing a botanical-patterned white bucket hat and fringed ceremonial tunic. His golden-orange horn is inlaid with stained-glass mosaic geometry, flanked by an ancestral thatched dwelling on the left and a jewel-toned tropical palm on the right—bridging rural memory with urban musical improvisation. Signed recto and verso with studio certificate of authenticity.",
    medium:
      "Acrylic, gestural enamel splatter, and chalk-white textile linework on obsidian-primed Belgian linen",
    materials:
      "Belgian linen, jet-black gesso ground, artist acrylics & gloss enamel, timber stretcher",
    year: 2026,
    widthCm: 100,
    heightCm: 135,
    depthCm: 5.0,
    weightKg: 7.4,
    orientation: "PORTRAIT",
    price: 28500000, // ₦285,000 NGN
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
      {
        url: "/images/catalogue/midnight-afrobeat-saxophonist-room.jpg",
        alt: "Midnight Afrobeat: The Polychrome Saxophonist displayed above cream bouclé sofa",
        position: 0,
      },
    ],
  },
  {
    id: "hero-harvest-canopy-tree-of-vitality",
    slug: "harvest-canopy-tree-of-vitality",
    title: "Harvest Canopy: Tree of Vitality",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
    description:
      "A vertical celebration of organic growth, rootedness, and seasonal abundance. Rising from a warm terracotta-ochre ground, a dark, textured trunk branches into a lush canopy of oversized leaves sculpted with thick palette-knife impasto in emerald green, cadmium yellow, burnt tangerine, and deep plum-burgundy. Each leaf catches natural daylight with three-dimensional relief highlights. Framed in warm walnut and signed recto and verso by Nkem Agbo with an embossed studio certificate of provenance.",
    medium:
      "Sculptural palette-knife oil and acrylic impasto on raw sienna-ochre linen board, walnut floating frame",
    materials:
      "Stretched linen over rigid gallery board, heavy impasto oils, natural ochre ground, solid walnut floater frame",
    year: 2026,
    widthCm: 75,
    heightCm: 130,
    depthCm: 4.5,
    weightKg: 6.4,
    orientation: "PORTRAIT",
    price: 26000000, // ₦260,000 NGN
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
      {
        url: "/images/catalogue/harvest-canopy-tree-of-vitality-room.jpg",
        alt: "Harvest Canopy: Tree of Vitality displayed in warm contemporary living room",
        position: 0,
      },
    ],
  },
  {
    id: "hero-rain-on-ochre-pop-duck",
    slug: "rain-on-ochre-pop-duck",
    title: "Downpour & Whimsy: Neo-Pop Study on Ochre Burlap",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
    description:
      "A playful yet arresting Neo-Pop figurative canvas that pairs nostalgic animation iconography with raw West African textile materiality. Set against a warm, earth-toned woven ochre burlap ground streaked with vertical silver-white rain showers, a wide-eyed black duck figure gazes upward with an exaggerated vermilion-orange bill while sculpted emerald-green vine leaves trail along the left margin. Balancing contemporary street-pop wit with tactile gallery craftsmanship, this statement vertical piece brings personality and conversation to modern living spaces. Signed with studio certificate of provenance.",
    medium:
      "Acrylic, charcoal oil stick, and dimensional botanical relief on textured ochre burlap linen, obsidian floating frame",
    materials:
      "Textured ochre burlap linen, heavy-body acrylics, vermilion pigment, sculpted relief leaves, matte black floater frame",
    year: 2026,
    widthCm: 85,
    heightCm: 135,
    depthCm: 5.0,
    weightKg: 6.8,
    orientation: "PORTRAIT",
    price: 24500000, // ₦245,000 NGN
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
      {
        url: "/images/catalogue/rain-on-ochre-pop-duck-room.jpg",
        alt: "Downpour & Whimsy: Neo-Pop Study on Ochre Burlap displayed in arched living room niche",
        position: 0,
      },
    ],
  },
  {
    id: "hero-trinity-blossoms-on-raw-jute",
    slug: "trinity-blossoms-on-raw-jute",
    title: "Trinity Blossoms on Raw Jute",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
    description:
      "An expressive botanical study rendered directly upon coarsely woven golden-brown raw jute. Three radiant blossoms—a sunlit lemon-yellow flower, an emerald-viridian bloom, and a vibrant crimson floret—spring from a single organic stem with terracotta leaves. Each petal is sculpted in tactile pigment and outlined with gestural titanium-white impasto brushwork that contrasts boldly against the earthy woven grain of the burlap ground. Hand-signed by Nkem Agbo and presented in a minimalist matte black floater frame with studio certificate of provenance.",
    medium:
      "Heavy-body acrylic impasto and titanium white contour relief on woven golden-brown raw jute canvas, matte black floating frame",
    materials:
      "Hand-loomed raw jute hessian, heavy-body artist acrylics, titanium white impasto paste, obsidian hardwood floater frame",
    year: 2026,
    widthCm: 100,
    heightCm: 100,
    depthCm: 4.5,
    weightKg: 6.2,
    orientation: "SQUARE",
    price: 21400000, // ₦214,000 NGN
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
      {
        url: "/images/catalogue/trinity-blossoms-on-raw-jute-room.jpg",
        alt: "Trinity Blossoms on Raw Jute displayed in sunlit contemporary living room",
        position: 0,
      },
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
      { url: "/images/hero/hero-african-drummers.jpg", alt: "Ceremonial African Drummers & Dancers pure canvas by Nkem Agbo", position: 0 },
    ],
  },
  {
    id: "hero-chromatic-field-impasto",
    slug: "chromatic-field-impasto",
    title: "Canopy & Grace: Royal Gazelles at Twilight",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
    description:
      "A monumental African wildlife and landscape masterpiece capturing two statuesque royal gazelles bathed in twilight serenity. Set beneath the grand spreading canopy of an ancient baobab tree with delicate hanging golden-yellow blossoms, a radiant full moon reflects across tranquil waters into the savannah distance. Rendered in rich sculptural palette-knife impasto with deep twilight indigo, radiant cadmium yellows, warm mineral ochre, and luminescent gazelle figures. Hand-signed recto and verso by Nkem Agbo, delivered with an embossed studio certificate of provenance.",
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
      { url: "/images/catalogue/canopy-and-grace-room.jpg", alt: "Canopy & Grace: Royal Gazelles at Twilight displayed in contemporary living room", position: 0 },
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
      { url: "/images/catalogue/obsidian-storm.jpg", alt: "Obsidian Storm pure sculptural impasto canvas by Nkem Agbo", position: 0 },
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
      { url: "/images/catalogue/flora-genesis.jpg", alt: "Flora Genesis pure oil impasto canvas by Nkem Agbo", position: 0 },
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
      { url: "/images/catalogue/chromatic-bloom.jpg", alt: "Chromatic Bloom pure oil impasto canvas by Nkem Agbo", position: 0 },
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
    price: 60000000, // ₦600,000 NGN (~$400 USD)
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
      { url: "/images/catalogue/oya-the-dancer.jpg", alt: "Oya, the Dancer pure oil impasto canvas by Nkem Agbo", position: 0 },
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
    price: 60000000, // ₦600,000 NGN (~$400 USD)
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
    ],
  },
  {
    id: "hero-emerald-solitude",
    slug: "emerald-solitude",
    title: "Sovereign Grace: The Indigo Queen",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
    description:
      "A breathtaking museum-grade portrait celebrating regal African matriarchy, ancestral sovereignty, and sacred adornment. Rendered in exquisite profile, an African queen is adorned in an elaborate sculptural indigo-dyed adire headwrap interwoven with cowrie shells and delicate molten gold filigree. Her royal garments flow in layered cobalt, deep violet, and burnt sienna with thick, sculpted palette-knife impasto and shimmering gold leaf accents against an amber ground etched with ancient geometric glyphs. Hand-signed recto and verso by Nkem Agbo with studio provenance certificate.",
    medium: "Oil, heavy-body impasto, natural mineral indigo, and 24k gold leaf on stretched Belgian linen, natural oak floating frame",
    materials: "Belgian linen, artist oils & acrylics, 24k gold leaf foil, natural oak floater frame",
    year: 2026,
    widthCm: 75,
    heightCm: 140,
    depthCm: 5,
    weightKg: 6.5,
    orientation: "PORTRAIT",
    price: 50000000, // ₦500,000 NGN (~$333 USD)
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
      { url: "/images/catalogue/emerald-solitude.jpg", alt: "Sovereign Grace: The Indigo Queen pure oil impasto canvas by Nkem Agbo", position: 0 },
    ],
  },
  {
    id: "hero-canopy-and-grace",
    slug: "canopy-and-grace",
    title: "Canopy & Grace: Royal Gazelles at Twilight",
    department: "ART",
    category: "ORIGINAL_PAINTING",
    productType: "ORIGINAL",
    editionSize: null,
    description:
      "A monumental African wildlife and landscape masterpiece capturing two statuesque royal gazelles bathed in twilight serenity. Set beneath the grand spreading canopy of an ancient baobab tree with delicate hanging golden-yellow blossoms, a radiant full moon reflects across tranquil waters into the savannah distance. Rendered in rich sculptural palette-knife impasto with deep twilight indigo, radiant cadmium yellows, warm mineral ochre, and luminescent gazelle figures. Hand-signed recto and verso by Nkem Agbo, delivered with an embossed studio certificate of provenance.",
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
      { url: "/images/catalogue/canopy-and-grace-room.jpg", alt: "Canopy & Grace: Royal Gazelles at Twilight displayed in contemporary living room", position: 0 },
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
    ],
  },
];

export function getHeroProduct(slug: string): HeroProduct | undefined {
  return HERO_PRODUCTS.find(
    (p) =>
      p.slug === slug ||
      (slug === "indigo-tide" && p.slug === "indigo-tide-evening-lantern") ||
      (slug === "canopy-and-grace" && (p.slug === "canopy-and-grace" || p.slug === "chromatic-field-impasto")) ||
      (slug === "chromatic-field-impasto" && p.slug === "chromatic-field-impasto") ||
      ((slug === "sovereign-grace" || slug === "sovereign-grace-indigo-queen" || slug === "the-indigo-queen") && p.slug === "emerald-solitude")
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
    products: HERO_PRODUCTS.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      department: p.department,
      category: p.category,
      productType: p.productType,
      price: p.price,
      currency: p.currency,
      stock: p.stock,
      shippingClass: p.shippingClass,
      artist: { name: p.artist.name, slug: p.artist.slug },
      images: p.images,
    })),
  },
];

export function getHeroArtist(slug: string): HeroArtist | undefined {
  return (
    HERO_ARTISTS.find((a) => a.slug === slug) ||
    HERO_ARTISTS.find((a) => a.slug === "nkem-agbo") ||
    HERO_ARTISTS[0]
  );
}

