import { CURRENCY_CONFIG, BASE_CURRENCY } from "./constants";

/**
 * Format a price in minor units (e.g. kobo) to a localized currency string.
 * @param amountInKobo Price in minor units (NGN kobo, 1 NGN = 100 kobo)
 * @param targetCurrency Currency code (NGN, USD, GBP, EUR)
 * @returns e.g. "₦2,850,000" or "$1,900"
 */
export function formatPrice(
  amountInKobo: number,
  targetCurrency: string = BASE_CURRENCY
): string {
  const config = CURRENCY_CONFIG[targetCurrency] || CURRENCY_CONFIG[BASE_CURRENCY];
  const ngnAmount = amountInKobo / 100;
  const converted = ngnAmount * config.rateFromNGN;

  // Format with thousands separator
  const rounded = Math.round(converted);
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(rounded);

  return `${config.symbol}${formatted}`;
}

export function convertPrice(
  amountInKobo: number,
  targetCurrency: string = BASE_CURRENCY
): number {
  const config = CURRENCY_CONFIG[targetCurrency] || CURRENCY_CONFIG[BASE_CURRENCY];
  const ngnAmount = amountInKobo / 100;
  return Math.round(ngnAmount * config.rateFromNGN);
}

/**
 * Helper to display both the base NGN checkout amount and the indicative foreign currency.
 */
export function getIndicativePrice(
  amountInKobo: number,
  targetCurrency: string
): { formatted: string; isConverted: boolean; baseFormatted: string } {
  const baseFormatted = formatPrice(amountInKobo, BASE_CURRENCY);
  if (targetCurrency === BASE_CURRENCY) {
    return { formatted: baseFormatted, isConverted: false, baseFormatted };
  }
  return {
    formatted: formatPrice(amountInKobo, targetCurrency),
    isConverted: true,
    baseFormatted,
  };
}
