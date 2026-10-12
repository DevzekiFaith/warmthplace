import { prisma } from "./db";

export interface ShippingCalculationItem {
  shippingClass: string;
  quantity: number;
  price: number;
}

export interface ShippingQuote {
  zoneId: string;
  zoneName: string;
  estimate: string;
  baseRate: number;
  fragileSurcharge: number;
  oversizedSurcharge: number;
  additionalItemsFee: number;
  totalShipping: number;
  isFreeShipping: boolean;
  freeShippingThreshold?: number | null;
}

export async function calculateShipping(
  countryCode: string,
  items: ShippingCalculationItem[]
): Promise<ShippingQuote | null> {
  const upperCountry = countryCode.trim().toUpperCase();

  // Find active zones
  const zones = await prisma.shippingZone.findMany({
    where: { active: true },
    orderBy: { position: "asc" },
  });

  // Find zone matching this country
  let matchedZone = zones.find((zone) => {
    const list = zone.countries.split(",").map((c) => c.trim().toUpperCase());
    return list.includes(upperCountry);
  });

  // If no direct country match, check fallback to zone 4 (North America & Global) if country is international
  if (!matchedZone) {
    if (upperCountry === "NG") {
      matchedZone = zones[0];
    } else {
      matchedZone = zones.find((z) => z.position === 4) || zones[zones.length - 1];
    }
  }

  if (!matchedZone) return null;

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Check free shipping threshold
  if (matchedZone.freeOver && subtotal >= matchedZone.freeOver) {
    return {
      zoneId: matchedZone.id,
      zoneName: matchedZone.name,
      estimate: matchedZone.estimate,
      baseRate: 0,
      fragileSurcharge: 0,
      oversizedSurcharge: 0,
      additionalItemsFee: 0,
      totalShipping: 0,
      isFreeShipping: true,
      freeShippingThreshold: matchedZone.freeOver,
    };
  }

  // Calculate surcharges
  let hasFragile = false;
  let hasOversized = false;
  items.forEach((item) => {
    if (item.shippingClass === "FRAGILE") hasFragile = true;
    if (item.shippingClass === "OVERSIZED") hasOversized = true;
  });

  const additionalCount = Math.max(0, totalItems - 1);
  const additionalItemsFee = additionalCount * matchedZone.additionalItemRate;
  const fragileSurcharge = hasFragile ? matchedZone.fragileSurcharge : 0;
  const oversizedSurcharge = hasOversized ? matchedZone.oversizedSurcharge : 0;

  const totalShipping =
    matchedZone.baseRate + additionalItemsFee + fragileSurcharge + oversizedSurcharge;

  return {
    zoneId: matchedZone.id,
    zoneName: matchedZone.name,
    estimate: matchedZone.estimate,
    baseRate: matchedZone.baseRate,
    fragileSurcharge,
    oversizedSurcharge,
    additionalItemsFee,
    totalShipping,
    isFreeShipping: false,
    freeShippingThreshold: matchedZone.freeOver,
  };
}
