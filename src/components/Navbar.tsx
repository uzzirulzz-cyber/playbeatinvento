import React from 'react';
import { Currency } from '../utils/currency';
import { ShoppingCart, Calculator, BarChart3, Globe, DollarSign } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  categories: string[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  currency,
  setCurrency,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="h-16 px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-sm flex items-center justify-center text-white shadow-xs">
            <ShoppingCart className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              PLAYBEAT<span className="text-indigo-600">INDEX</span>
            </span>
            <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-600 rounded border border-indigo-100 uppercase tracking-wider">
              Live Index
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex bg-slate-100 rounded p-1">
            <button
              onClick={() => setActiveTab('directory')}
              className={`px-4 py-1 text-sm font-medium rounded transition-colors ${
                activeTab === 'directory'
                  ? 'bg-white shadow-sm text-slate-800'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Market Prices
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-1 text-sm font-medium rounded transition-colors flex items-center space-x-1.5 ${
                activeTab === 'analytics'
                  ? 'bg-white shadow-sm text-slate-800'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Historical Trends</span>
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-1 text-sm font-medium rounded transition-colors flex items-center space-x-1.5 ${
                activeTab === 'calculator'
                  ? 'bg-white shadow-sm text-slate-800'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Calculator</span>
            </button>
          </div>

          {/* Currency Toggle (1 USD = 280 PKR) */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 text-xs font-bold rounded transition-all cursor-pointer ${
                currency === 'USD' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('PKR')}
              className={`px-2.5 py-1 text-xs font-bold rounded transition-all cursor-pointer ${
                currency === 'PKR' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              PKR (₨)
            </button>
          </div>

          <div className="w-10 h-10 bg-indigo-50 border border-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm">
            PB
          </div>
        </div>
      </div>

      {/* Sub-header controls */}
      <div className="w-full bg-slate-50 border-t border-slate-200 py-3 px-8 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:w-80">
          <div className="relative">
            <input
              type="text"
              placeholder="Search services or projectors (e.g. Magcubic, YouTube)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
            />
            <span className="absolute left-3 top-2 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>

        {/* Mobile currency toggle */}
        <div className="flex md:hidden items-center space-x-2 bg-slate-200 p-1 rounded">
          <button
            onClick={() => setCurrency('USD')}
            className={`px-2 py-1 text-xs font-bold rounded ${currency === 'USD' ? 'bg-indigo-600 text-white' : 'text-slate-700'}`}
          >
            USD ($)
          </button>
          <button
            onClick={() => setCurrency('PKR')}
            className={`px-2 py-1 text-xs font-bold rounded ${currency === 'PKR' ? 'bg-indigo-600 text-white' : 'text-slate-700'}`}
          >
            PKR (₨280)
          </button>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors flex items-center gap-2 ${
              selectedCategory === 'All'
                ? 'text-indigo-600 font-bold bg-white border border-indigo-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${selectedCategory === 'All' ? 'bg-indigo-600' : 'bg-transparent border border-slate-300'}`}></div>
            <span>All Products</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors flex items-center gap-2 ${
                selectedCategory === cat
                  ? 'text-indigo-600 font-bold bg-white border border-indigo-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${selectedCategory === cat ? 'bg-indigo-600' : 'bg-transparent border border-slate-300'}`}></div>
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
