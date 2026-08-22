import React from 'react';
import { ProductOffer } from '../types';
import { Currency, formatPrice } from '../utils/currency';
import { DollarSign, Package, TrendingUp, Award } from 'lucide-react';

interface OverviewStatsProps {
  products: ProductOffer[];
  currency: Currency;
}

export const OverviewStats: React.FC<OverviewStatsProps> = ({ products, currency }) => {
  const retailProducts = products.filter((p) => p.basePrice < 40);
  const avgRetailPrice = retailProducts.reduce((acc, p) => acc + p.basePrice, 0) / (retailProducts.length || 1);
  const totalSold = products.reduce((acc, p) => acc + p.soldCount, 0);
  const totalOffers = products.reduce((acc, p) => acc + p.offerCount, 0);
  const lowestPrice = Math.min(...products.map((p) => p.minPrice));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-5 rounded border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Avg. Retail Price</p>
          <h4 className="text-2xl font-extrabold text-slate-900 mt-1">{formatPrice(avgRetailPrice, currency)}</h4>
          <span className="text-xs text-indigo-600 font-medium mt-1 inline-block">Excl. reseller panels</span>
        </div>
        <div className="w-12 h-12 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
          <DollarSign className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white p-5 rounded border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lowest Entry Price</p>
          <h4 className="text-2xl font-extrabold text-slate-900 mt-1">{formatPrice(lowestPrice, currency)}</h4>
          <span className="text-xs text-indigo-600 font-medium mt-1 inline-block">Shared/Promo slot baseline</span>
        </div>
        <div className="w-12 h-12 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
          <TrendingUp className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white p-5 rounded border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Products Tracked</p>
          <h4 className="text-2xl font-extrabold text-slate-900 mt-1">{products.length} Items</h4>
          <span className="text-xs text-indigo-600 font-medium mt-1 inline-block">{totalOffers} active seller offers</span>
        </div>
        <div className="w-12 h-12 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
          <Package className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white p-5 rounded border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Units Sold</p>
          <h4 className="text-2xl font-extrabold text-slate-900 mt-1">{totalSold.toLocaleString()}</h4>
          <span className="text-xs text-indigo-600 font-medium mt-1 inline-block">Verified platform volume</span>
        </div>
        <div className="w-12 h-12 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
          <Award className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
