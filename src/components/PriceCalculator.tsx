import React, { useState } from 'react';
import { ProductOffer } from '../types';
import { Calculator, Sparkles } from 'lucide-react';

interface PriceCalculatorProps {
  products: ProductOffer[];
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({ products }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [quantity, setQuantity] = useState<number>(12);
  const [markupPercent, setMarkupPercent] = useState<number>(15);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const baseTotal = selectedProduct ? selectedProduct.basePrice * quantity : 0;
  const estimatedProfit = baseTotal * (markupPercent / 100);
  const suggestedRetailTotal = baseTotal + estimatedProfit;

  return (
    <div className="bg-white rounded border border-slate-200 shadow-sm p-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-200">
        <div className="w-10 h-10 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-800">Subscription & Reseller Price Calculator</h3>
          <p className="text-xs text-slate-500">Calculate bulk subscription costs, credit recharges, and reseller profit margins</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Select Product / Service
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} (${p.basePrice.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Quantity / Accounts / Credits ({quantity})
            </label>
            <input
              type="range"
              min="1"
              max="200"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1</span>
              <span>50</span>
              <span>100</span>
              <span>200</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Target Reseller Markup (%)
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="100"
                value={markupPercent}
                onChange={(e) => setMarkupPercent(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <span className="font-extrabold text-slate-900 w-12 text-right">{markupPercent}%</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-slate-50 rounded p-6 border border-slate-200 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Calculation Breakdown</h4>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Selected Base Price:</span>
                <span className="font-bold text-slate-900">${selectedProduct?.basePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Quantity / Units:</span>
                <span className="font-bold text-slate-900">{quantity}</span>
              </div>
              <div className="flex justify-between text-sm pt-3 border-t border-slate-200">
                <span className="text-slate-600">Base Cost Total:</span>
                <span className="font-extrabold text-slate-900">${baseTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Estimated Profit ({markupPercent}%):</span>
                <span className="font-extrabold text-indigo-600">+${estimatedProfit.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 text-white p-4 rounded shadow-sm">
            <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Suggested Total Retail Price</p>
            <div className="text-3xl font-black mt-1">${suggestedRetailTotal.toFixed(2)}</div>
            <p className="text-xs text-indigo-200 mt-1">Average per unit: ${(suggestedRetailTotal / quantity).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
