export interface ProductOffer {
  id: string;
  title: string;
  category: string;
  region: string;
  regionFlag?: string;
  imageUrl?: string;
  soldCount: number;
  offerCount: number;
  basePrice: number; // Buying cost (Actual cost on G2G & Zerobyte/Playbeat)
  sellingPrice?: number; // Regular price / selling price
  minPrice: number;
  maxPrice: number;
  url: string;
  isPrivateAccount: boolean;
  isSharedAccount: boolean;
  isResellerPanel: boolean;
}
a
export interface CategoryStat {
  category: string;
  productCount: number;
  averagePrice: number;
  minPrice: number;
  maxPrice: number;
  totalSold: number;
}
