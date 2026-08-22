import React from 'react';
import { ProductOffer } from '../types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface AnalyticsChartsProps {
  products: ProductOffer[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ products }) => {
  const categoryMap: { [key: string]: { total: number; count: number; sold: number } } = {};
  products.forEach((p) => {
    if (!categoryMap[p.category]) {
      categoryMap[p.category] = { total: 0, count: 0, sold: 0 };
    }
    categoryMap[p.category].total += p.basePrice;
    categoryMap[p.category].count += 1;
    categoryMap[p.category].sold += p.soldCount;
  });

  const categoryData = Object.keys(categoryMap).map((cat) => ({
    category: cat,
    avgPrice: Number((categoryMap[cat].total / categoryMap[cat].count).toFixed(2)),
    productCount: categoryMap[cat].count,
    totalSold: categoryMap[cat].sold,
  }));

  const topSoldProducts = [...products]
    .sort((a, b) => b.soldCount - a.soldCount)
    .slice(0, 8)
    .map((p) => ({
      name: p.title.length > 25 ? p.title.substring(0, 25) + '...' : p.title,
      sold: p.soldCount,
      price: p.basePrice,
    }));

  const COLORS = ['#4f46e5', '#2563eb', '#7c3aed', '#d97706', '#db2777', '#0d9488'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-1">Average Base Price by Category</h3>
          <p className="text-xs text-slate-500 mb-6">Comparing mean pricing across marketplace categories</p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="category"
                  angle={-25}
                  textAnchor="end"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  interval={0}
                />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} unit="$" />
                <Tooltip
                  formatter={(value: any) => [`$${value}`, 'Avg Base Price']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Bar dataKey="avgPrice" fill="#4f46e5" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-1">Top Selling Products by Volume</h3>
          <p className="text-xs text-slate-500 mb-6">Units sold across marketplace listings</p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSoldProducts} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#64748b' }} width={120} />
                <Tooltip
                  formatter={(value: any) => [value.toLocaleString(), 'Units Sold']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Bar dataKey="sold" fill="#2563eb" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="font-bold text-slate-800 text-base">Category Statistical Summary</h3>
          <p className="text-xs text-slate-500">Overview of product counts and cumulative sales volume by sector</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-4">Products Listed</th>
                <th className="py-3 px-4">Average Base Price</th>
                <th className="py-3 px-4">Total Sold Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
              {categoryData.map((cat, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-slate-900 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                    <span>{cat.category}</span>
                  </td>
                  <td className="py-3.5 px-4">{cat.productCount} items</td>
                  <td className="py-3.5 px-4 font-black text-slate-900">${cat.avgPrice.toFixed(2)}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{cat.totalSold.toLocaleString()} units</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
