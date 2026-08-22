import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_PRODUCTS } from './data/mockProducts';
import { ProductOffer } from './types';
import { Currency } from './utils/currency';
import { Navbar } from './components/Navbar';
import { OverviewStats } from './components/OverviewStats';
import { ProductTable } from './components/ProductTable';
import { ProductCardGrid } from './components/ProductCardGrid';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { PriceCalculator } from './components/PriceCalculator';
import { Sparkles, ShieldCheck, Bot, RefreshCw, LayoutGrid, Table, Film, Lock } from 'lucide-react';

const LANDING_PIN = '0112233';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<'directory' | 'analytics' | 'calculator'>('directory');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState<ProductOffer[]>(INITIAL_PRODUCTS);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [secondsAgo, setSecondsAgo] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      triggerPriceUpdate();
    }, 60000);

    const counterTimer = setInterval(() => {
      setSecondsAgo((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(counterTimer);
    };
  }, []);

  const triggerPriceUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setProducts((prev) =>
        prev.map((p) => {
          if (Math.random() < 0.4) {
            const factor = 1 + (Math.random() * 0.06 - 0.025);
            const newBase = Number((p.basePrice * factor).toFixed(2));
            return {
              ...p,
              basePrice: newBase,
            };
          }
          return p;
        })
      );
      setLastUpdated(new Date());
      setSecondsAgo(0);
      setIsUpdating(false);
    }, 600);
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.region.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleUnlock = (event: React.FormEvent) => {
    event.preventDefault();
    if (pin === LANDING_PIN) {
      setIsUnlocked(true);
      setPinError('');
      return;
    }
    setPinError('Incorrect access code. Please try again.');
    setPin('');
  };

  if (!isUnlocked) {
    return (
      <div className="unlock-shell">
        <div className="unlock-backdrop" />
        <div className="unlock-overlay" />

        <div className="unlock-panel">
          <div className="unlock-brand">
            <div className="unlock-icon"><Lock size={18} /></div>
            <span>PlayBeat Digital</span>
          </div>

          <h1>Private storefront access</h1>
          <p>Enter the access code to unlock the premium catalog.</p>

          <form onSubmit={handleUnlock} className="unlock-form">
            <input
              type="password"
              inputMode="numeric"
              maxLength={7}
              value={pin}
              onChange={(event) => setPin(event.target.value.replace(/\D/g, '').slice(0, 7))}
              className="pin-input"
              placeholder="•••••••"
              aria-label="Landing page access code"
            />

            <button type="submit" className="unlock-button">Unlock storefront</button>
          </form>

          {pinError && <div className="unlock-error">{pinError}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-16">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        currency={currency}
        setCurrency={setCurrency}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-indigo-900 text-white rounded p-3 shadow-sm flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <Bot className="w-4 h-4 text-indigo-300" />
              <div>
                <p className="font-bold text-indigo-100">PLAYBEAT MARKET BOT ACTIVE</p>
                <p className="text-[10px] text-indigo-300">Syncing digital subscriptions every 60s</p>
              </div>
            </div>
            <button
              onClick={triggerPriceUpdate}
              disabled={isUpdating}
              className="inline-flex items-center space-x-1 bg-indigo-800 hover:bg-indigo-700 text-white px-2.5 py-1 rounded font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isUpdating ? 'animate-spin' : ''}`} />
              <span>Sync</span>
            </button>
          </div>

          <div className="bg-slate-900 text-white rounded p-3 shadow-sm flex items-center justify-between text-xs border border-amber-500/30">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
              <Film className="w-4 h-4 text-amber-400" />
              <div>
                <p className="font-bold text-amber-200">PLAYBEAT PROJECTOR BOT ACTIVE</p>
                <p className="text-[10px] text-amber-400/80">Live sync playbeat.digital (+12% markup)</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded text-[10px] font-bold border border-amber-500/30">
              1 USD = 280 PKR
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 text-slate-900 rounded p-6 md:p-8 mb-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-indigo-50 text-indigo-600 text-xs font-bold mb-3 border border-indigo-100 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PLAYBEAT STOCK & HARDWARE DIRECTORY</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">Smart Projectors & Digital Subscriptions</h1>
            <p className="text-slate-500 text-sm mt-1 max-w-2xl">
              Real-time pricing in USD and PKR (1 USD = 280 PKR). Smart projectors sourced directly from <a href="https://www.playbeat.digital/" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold underline">playbeat.digital</a> with 12% markup.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded p-4 text-xs space-y-1.5 shrink-0">
            <div className="flex items-center space-x-2 text-indigo-600 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Exchange Rate Active</span>
            </div>
            <p className="text-slate-500">1 USD = 280 PKR conversion applied instantly across all views.</p>
          </div>
        </div>

        <OverviewStats products={products} currency={currency} />

        {activeTab === 'directory' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white px-6 py-3 rounded border border-slate-200 shadow-xs">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Catalog View Mode ({filteredProducts.length} items) • Currency: {currency}
              </div>
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Premium Cards</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'table'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>Table View</span>
                </button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <ProductCardGrid products={filteredProducts} currency={currency} />
            ) : (
              <ProductTable products={filteredProducts} currency={currency} />
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <AnalyticsCharts products={products} />
        )}

        {activeTab === 'calculator' && (
          <PriceCalculator products={products} />
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-200 text-center text-xs text-slate-400 font-medium">
        <p>MARKET REFRESHED: {lastUpdated.toLocaleTimeString()} • Playbeat & Playbeat Bots Active (60s interval) • 1 USD = 280 PKR</p>
      </footer>
    </div>
  );
}
