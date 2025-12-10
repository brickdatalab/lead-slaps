/**
 * Stripe Price Map Configuration
 * Maps product types and age bands to Stripe Price IDs
 *
 * Products created in Stripe:
 * - Direct Submissions: prod_TZkGTQc16lOLjS
 * - Alpha Data: prod_TZkGEzwPfTRsTY
 * - Pulse Data: prod_TZkGdXoHPJCH8v
 * - FundSense: prod_TZkGQ5QuxNvck3
 * - TrustDial: prod_TZkGZEJ4EMZLwp
 * - StatementSnap: prod_TZkGfdUVmGmlCp
 */

export type AgeBand = 'lt_15' | '15_30' | '30_90' | '90_180' | '180_365' | '1_2y';
export type ProductType = 'direct_submissions' | 'alpha_data' | 'pulse_data';
export type AddOnType = 'fundsense' | 'trustdial' | 'statementsnap';

export interface PriceInfo {
  priceId: string;
  unitAmountCents: number;
  displayPrice: string;
}

// Lead product prices by product type and age band
export const leadPrices: Record<ProductType, Record<AgeBand, PriceInfo>> = {
  direct_submissions: {
    lt_15: { priceId: 'price_1ScanZ5VqJ3KfgO8a28XPsZA', unitAmountCents: 350, displayPrice: '$3.50' },
    '15_30': { priceId: 'price_1ScanZ5VqJ3KfgO8UOw0udnh', unitAmountCents: 275, displayPrice: '$2.75' },
    '30_90': { priceId: 'price_1ScanZ5VqJ3KfgO8FgEn18wc', unitAmountCents: 175, displayPrice: '$1.75' },
    '90_180': { priceId: 'price_1Scana5VqJ3KfgO8D6M4IdZ0', unitAmountCents: 95, displayPrice: '$0.95' },
    '180_365': { priceId: 'price_1Scana5VqJ3KfgO80e55m6BL', unitAmountCents: 55, displayPrice: '$0.55' },
    '1_2y': { priceId: 'price_1Scana5VqJ3KfgO8iox5BGX6', unitAmountCents: 25, displayPrice: '$0.25' },
  },
  alpha_data: {
    lt_15: { priceId: 'price_1Scant5VqJ3KfgO8BaA6ajYt', unitAmountCents: 275, displayPrice: '$2.75' },
    '15_30': { priceId: 'price_1Scant5VqJ3KfgO8DrLVtzhu', unitAmountCents: 195, displayPrice: '$1.95' },
    '30_90': { priceId: 'price_1Scanu5VqJ3KfgO8ewPy102I', unitAmountCents: 125, displayPrice: '$1.25' },
    '90_180': { priceId: 'price_1Scanu5VqJ3KfgO86QmnhwxE', unitAmountCents: 65, displayPrice: '$0.65' },
    '180_365': { priceId: 'price_1Scanu5VqJ3KfgO8XfFD945n', unitAmountCents: 35, displayPrice: '$0.35' },
    '1_2y': { priceId: 'price_1Scanv5VqJ3KfgO8Or2mp2Uh', unitAmountCents: 15, displayPrice: '$0.15' },
  },
  pulse_data: {
    lt_15: { priceId: 'price_1Scap85VqJ3KfgO8jSs2BNB7', unitAmountCents: 225, displayPrice: '$2.25' },
    '15_30': { priceId: 'price_1Scap85VqJ3KfgO8qZ5r4Atn', unitAmountCents: 165, displayPrice: '$1.65' },
    '30_90': { priceId: 'price_1Scap95VqJ3KfgO8MeAn267H', unitAmountCents: 95, displayPrice: '$0.95' },
    '90_180': { priceId: 'price_1Scap95VqJ3KfgO8VjtDOqwT', unitAmountCents: 45, displayPrice: '$0.45' },
    '180_365': { priceId: 'price_1Scap95VqJ3KfgO8p8rVGUDA', unitAmountCents: 25, displayPrice: '$0.25' },
    '1_2y': { priceId: 'price_1ScapA5VqJ3KfgO80Jlk6RNG', unitAmountCents: 10, displayPrice: '$0.10' },
  },
};

// Add-on prices
export const addOnPrices: Record<AddOnType, PriceInfo & { perLead: boolean; description: string }> = {
  fundsense: {
    priceId: 'price_1ScapN5VqJ3KfgO8p35NK4Nl',
    unitAmountCents: 40,
    displayPrice: '$0.40',
    perLead: true,
    description: 'AI-powered funding probability scoring',
  },
  trustdial: {
    priceId: 'price_1ScapN5VqJ3KfgO8jMkmYSi6',
    unitAmountCents: 45,
    displayPrice: '$0.45',
    perLead: true,
    description: 'Phone verification and trust scoring',
  },
  statementsnap: {
    priceId: 'price_1ScapO5VqJ3KfgO83Kex5W32',
    unitAmountCents: 1000,
    displayPrice: '$10.00',
    perLead: false,
    description: 'Bank statement analysis package',
  },
};

// Stripe product IDs for reference
export const productIds = {
  leads: {
    direct_submissions: 'prod_TZkGTQc16lOLjS',
    alpha_data: 'prod_TZkGEzwPfTRsTY',
    pulse_data: 'prod_TZkGdXoHPJCH8v',
  },
  addons: {
    fundsense: 'prod_TZkGQ5QuxNvck3',
    trustdial: 'prod_TZkGZEJ4EMZLwp',
    statementsnap: 'prod_TZkGfdUVmGmlCp',
  },
};

// Helper function to get price ID for a lead product
export function getLeadPriceId(productType: ProductType, ageBand: AgeBand): string {
  return leadPrices[productType][ageBand].priceId;
}

// Helper function to get add-on price ID
export function getAddOnPriceId(addOnType: AddOnType): string {
  return addOnPrices[addOnType].priceId;
}

// Map from product_key (used in inventory_segments) to ProductType
export const productKeyToType: Record<string, ProductType> = {
  'direct-submissions': 'direct_submissions',
  'alpha-data': 'alpha_data',
  'pulse-data': 'pulse_data',
};

// Map from age_band (used in inventory_segments) to AgeBand
export const ageBandMap: Record<string, AgeBand> = {
  'lt_15': 'lt_15',
  '15_30': '15_30',
  '30_90': '30_90',
  '90_180': '90_180',
  '180_365': '180_365',
  '1_2y': '1_2y',
};
