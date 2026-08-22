import React, { useState } from 'react';
import { ProductOffer } from '../types';
import { Currency, formatPrice, calculateSellingCost } from '../utils/currency';
import { ExternalLink, ArrowUpDown, Globe, Sparkles } from 'lucide-react';

interface ProductTableProps {
  products: ProductOffer[];
  currency: Currency;
}

export const ProductTable: React.FC<ProductTableProps> = ({ products, currency }) => {
  const [sortField, setSortField] = useState<'title' | 'basePrice'>('basePrice');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: 'title' | 'basePrice') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];
    if (typeof valA === 'string') {
      return sortDirection === 'asc'
        ? (valA as string).localeCompare(valB as string)
        : (valB as string).localeCompare(valA as string);
    }
    return sortDirection === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
  });

  const groupedProducts = sortedProducts.reduce((acc, p) => {
    if (!acc[p.category]) {
      acc[p.category] = [];
    }
    acc[p.category].push(p);
    return acc;
  }, {} as Record<string, ProductOffer[]>);

  return (
    <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h3 className="font-bold text-slate-800 text-base">Product Price & Offer Directory</h3>
          <p className="text-xs text-slate-500">Showing base retail price (without promotional markup) — Categorized by Section</p>
        </div>
        <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded font-medium">
          {products.length} products listed
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <th className="py-3.5 px-6 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('title')}>
                <div className="flex items-center space-x-1">
                  <span>Product / Service Name</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Region</th>
              <th className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('basePrice')}>
                <div className="flex items-center space-x-1">
                  <span>Buying Cost (Avg Base)</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-4">
                <div className="flex items-center space-x-1">
                  <span>Selling Cost</span>
                </div>
              </th>
              <th className="py-3.5 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
            {Object.entries(groupedProducts).map(([category, rawItems]) => {
              const items = rawItems as ProductOffer[];
              const isProjectorCategory = category === 'Smart Projectors';
              return (
              <React.Fragment key={category}>
                <tr className="bg-slate-100/80 border-t border-b border-slate-200">
                  <td colSpan={6} className="py-2.5 px-6 font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center justify-between">
                    <span>📁 {category} {isProjectorCategory && '(Via Playbeat Store)'}</span>
                    <span className="text-[10px] font-medium bg-white px-2 py-0.5 rounded text-slate-500 border border-slate-200">{items.length} items</span>
                  </td>
                </tr>
                {items.map((p) => {
                  const sellingCost = calculateSellingCost(p);
                  const isProjector = p.category === 'Smart Projectors' || p.url.includes('playbeat.digital');
                  const targetUrl = isProjector ? 'https://www.playbeat.digital/' : 'https://playbeat.digital';

                  return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900 max-w-xs">
                      <div className="flex items-start space-x-2">
                        <span className="mt-0.5 p-1 rounded bg-indigo-50 text-indigo-600 shrink-0 border border-indigo-100">
                          <Sparkles className="w-3.5 h-3.5" />
                        </span>
                        <div>
                          <span>{p.title}</span>
                          <div className="flex items-center space-x-2 mt-0.5">
                            {isProjector && (
                              <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-800 rounded border border-amber-200">
                                Playbeat Stock (+12%)
                              </span>
                            )}
                            {p.isPrivateAccount && (
                              <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-700 rounded border border-indigo-100">
                                Private Account
                              </span>
                            )}
                            {p.isSharedAccount && (
                              <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-700 rounded border border-amber-100">
                                Shared Slot
                              </span>
                            )}
                            {p.isResellerPanel && (
                              <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold bg-purple-50 text-purple-700 rounded border border-purple-100">
                                Reseller Panel
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-slate-600">
                      <span className="px-2.5 py-1 text-xs bg-slate-100 rounded font-medium text-slate-700 border border-slate-200">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1.5">
                        {p.regionFlag ? (
                          <img src={p.regionFlag} alt={p.region} className="w-5 h-3.5 object-cover rounded-xs shadow-xs" />
                        ) : (
                          <Globe className="w-3.5 h-3.5 text-slate-400" />
                        )}
                        <span className="text-xs font-bold text-slate-700">{p.region}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap font-black text-slate-900">
                      {formatPrice(p.basePrice, currency)}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap font-black text-emerald-600">
                      {formatPrice(sellingCost, currency)} <span className="text-[10px] font-normal text-slate-400">({isProjector ? '+12%' : '+35%'})</span>
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-bold rounded transition-colors shadow-xs ${
                          isProjector ? 'bg-amber-500 hover:bg-amber-600 text-slate-950' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                      >
                        <span>{isProjector ? 'playbeat.digital' : 'playbeat.digital'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                );
                })}
              </React.Fragment>
            );
            })}
            {sortedProducts.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-500">
                  No products found matching your search or category filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
