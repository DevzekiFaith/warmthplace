export const SITE_NAME = "Warmthplace Art Studio";
export const SITE_TAGLINE = "African Art. Contemporary Living. Enduring Stories.";
export const SITE_DESCRIPTION =
  "Warmthplace Art Studio is a balanced contemporary African art house and lifestyle studio based in Lagos. We curate museum-calibre original artworks, limited editions, and handcrafted homeware for collectors and distinctive living spaces worldwide.";

export const BASE_CURRENCY = "NGN";

// Indicative rates for international visitors.
// Base price in database is in minor units (kobo) for NGN (1 NGN = 100 kobo).
// For instance: ₦1,500 = 150,000 kobo.
// Indicative rates per 1 NGN:
export const CURRENCY_CONFIG: Record<
  string,
  { code: string; symbol: string; label: string; rateFromNGN: number; decimals: number }
> = {
  NGN: {
    code: "NGN",
    symbol: "₦",
    label: "NGN (₦)",
    rateFromNGN: 1.0,
    decimals: 0,
  },
  USD: {
    code: "USD",
    symbol: "$",
    label: "USD ($)",
    rateFromNGN: 1 / 1500, // ₦1,500 ≈ $1.00
    decimals: 0,
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    label: "GBP (£)",
    rateFromNGN: 1 / 1950, // ₦1,950 ≈ £1.00
    decimals: 0,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    label: "EUR (€)",
    rateFromNGN: 1 / 1650, // ₦1,650 ≈ €1.00
    decimals: 0,
  },
};

export const DEPARTMENTS = [
  { id: "ART", label: "Art", path: "/shop/art" },
  { id: "DECOR", label: "Home Décor", path: "/shop/decor" },
] as const;

export const ART_CATEGORIES = [
  { id: "ORIGINAL_PAINTING", label: "Original Paintings" },
  { id: "WORK_ON_PAPER", label: "Works on Paper" },
  { id: "SCULPTURE", label: "Sculpture & Castings" },
  { id: "PHOTOGRAPHY", label: "Fine Art Photography" },
  { id: "PRINT_EDITION", label: "Limited Edition Prints" },
] as const;

export const DECOR_CATEGORIES = [
  { id: "CERAMICS", label: "Ceramics & Vessels" },
  { id: "TEXTILES", label: "Handwoven Textiles & Throws" },
  { id: "TABLETOP", label: "Carved Woodware & Tabletop" },
  { id: "DECORATIVE_OBJECTS", label: "Brass & Decorative Accents" },
  { id: "CUSHIONS", label: "Indigo & Adire Cushions" },
] as const;

export const PRODUCT_TYPES = [
  { id: "ORIGINAL", label: "Original Artwork" },
  { id: "EDITION", label: "Limited Edition" },
  { id: "PRINT", label: "Fine Art Print" },
  { id: "DECOR", label: "Artisan Homeware" },
  { id: "MADE_TO_ORDER", label: "Made to Order" },
] as const;

export const SHIPPING_CLASSES = [
  { id: "STANDARD", label: "Standard Parcel" },
  { id: "FRAGILE", label: "Fragile (Crated Art)" },
  { id: "OVERSIZED", label: "Oversized / Heavy Freight" },
] as const;

export const ORDER_STATUSES = [
  { id: "PENDING_PAYMENT", label: "Pending Payment", badge: "warning" },
  { id: "PAID", label: "Paid", badge: "success" },
  { id: "FAILED", label: "Failed", badge: "danger" },
  { id: "CANCELLED", label: "Cancelled", badge: "muted" },
  { id: "REFUNDED", label: "Refunded", badge: "muted" },
  { id: "NEEDS_REVIEW", label: "Needs Review", badge: "warning" },
] as const;

export const FULFILMENT_STATUSES = [
  { id: "UNFULFILLED", label: "Unfulfilled", badge: "muted" },
  { id: "PROCESSING", label: "Processing & Crating", badge: "warning" },
  { id: "SHIPPED", label: "Dispatched", badge: "info" },
  { id: "DELIVERED", label: "Delivered", badge: "success" },
] as const;
