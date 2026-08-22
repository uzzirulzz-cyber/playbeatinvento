import { ProductOffer } from '../types';

export type Currency = 'USD' | 'PKR';
export const USD_TO_PKR = 280;

export function formatPrice(amountUSD: number, currency: Currency): string {
  if (currency === 'PKR') {
    const pkr = amountUSD * USD_TO_PKR;
    return `₨${pkr.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }
  return `$${amountUSD.toFixed(2)}`;
}

export function calculateSellingCost(p: ProductOffer): number {
  if (p.category === 'Smart Projectors') {
    return p.basePrice * 1.12; // 12% markup for projectors
  }
  return p.basePrice * 1.35; // 35% markup for digital subscriptions
}
