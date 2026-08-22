import React from 'react';
import { ProductOffer } from '../types';
import { Currency, formatPrice, calculateSellingCost } from '../utils/currency';
import { ExternalLink, Globe, ShieldCheck, Sparkles, TrendingUp, Users, Film } from 'lucide-react';

interface ProductCardGridProps {
  products: ProductOffer[];
  currency: Currency;
}

// Helper to get matching premium imagery based on product title/category
const getProductImage = (p: ProductOffer) => {
  if (p.imageUrl) return p.imageUrl;
  const title = p.title.toLowerCase();
  const cat = p.category.toLowerCase();

  if (title.includes('projector') || title.includes('magcubic') || title.includes('byintek') || title.includes('wanbo') || title.includes('xgimi') || title.includes('epson')) {
    return 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80';
  }
  if (title.includes('netflix')) return 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=600&q=80';
  if (title.includes('spotify') || title.includes('music') || title.includes('tidal') || title.includes('deezer')) return 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=600&q=80';
  if (title.includes('youtube') || title.includes('stream') || title.includes('video')) return 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80';
  if (title.includes('disney') || title.includes('crunchyroll') || title.includes('hbo') || title.includes('prime')) return 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80';
  if (title.includes('discord') || title.includes('server boost') || title.includes('nitro')) return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80';
  if (title.includes('instagram') || title.includes('followers') || title.includes('tiktok') || title.includes('social')) return 'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=600&q=80';
  if (title.includes('telegram') || title.includes('stars') || title.includes('reddit') || title.includes('karma')) return 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80';
  if (title.includes('duolingo') || title.includes('coursera') || title.includes('udemy') || title.includes('learning') || title.includes('datacamp')) return 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80';
  if (cat.includes('streaming') || cat.includes('video')) return 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=600&q=80';
  return 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80';
};

export const ProductCardGrid: React.FC<ProductCardGridProps> = ({ products, currency }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => {
        const sellingCost = calculateSellingCost(p);
        const imageUrl = getProductImage(p);
        const isProjector = p.category === 'Smart Projectors' || p.url.includes('playbeat.digital');
        const targetUrl = p.url.includes('playbeat.digital') ? 'https://www.playbeat.digital/' : 'https://playbeat.digital';

        return (
          <div
            key={p.id}
            className="bg-white rounded-xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
          >
            {/* Card Banner Image */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-900">
              <img
                src={imageUrl}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Category & Region Header */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className={`px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md shadow-xs ${
                  isProjector ? 'bg-amber-400 text-slate-950' : 'bg-white/90 backdrop-blur-md text-slate-900'
                }`}>
                  {p.category}
                </span>
                <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                  {p.regionFlag ? (
                    <img src={p.regionFlag} alt={p.region} className="w-4 h-3 object-cover rounded-xs" />
                  ) : (
                    <Globe className="w-3 h-3 text-indigo-400" />
                  )}
                  <span>{p.region}</span>
                </div>
              </div>

              {/* Title on Image */}
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="text-white font-bold text-base leading-snug drop-shadow-sm line-clamp-2">
                  {p.title}
                </h4>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              {/* Account Badges */}
              <div className="flex flex-wrap gap-1.5">
                {isProjector && (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-800 rounded border border-amber-200">
                    <Film className="w-3 h-3 text-amber-600" />
                    <span>Playbeat Stock</span>
                  </span>
                )}
                {p.isPrivateAccount && (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-700 rounded border border-indigo-100">
                    <ShieldCheck className="w-3 h-3 text-indigo-500" />
                    <span>Private Account</span>
                  </span>
                )}
                {p.isSharedAccount && (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-700 rounded border border-amber-100">
                    <Users className="w-3 h-3 text-amber-500" />
                    <span>Shared Slot</span>
                  </span>
                )}
                {p.isResellerPanel && (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 text-[10px] font-bold bg-purple-50 text-purple-700 rounded border border-purple-100">
                    <Sparkles className="w-3 h-3 text-purple-500" />
                    <span>Reseller Panel</span>
                  </span>
                )}
                {p.soldCount > 0 && (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded border border-emerald-100 ml-auto">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    <span>{p.soldCount.toLocaleString()} Sold</span>
                  </span>
                )}
              </div>

              {/* Pricing Box */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Buying Cost</p>
                  <p className="text-lg font-black text-slate-900 mt-0.5">{formatPrice(p.basePrice, currency)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                    Selling Cost ({isProjector ? '+12%' : '+35%'})
                  </p>
                  <p className="text-lg font-black text-emerald-600 mt-0.5">{formatPrice(sellingCost, currency)}</p>
                </div>
              </div>

              {/* Action Button */}
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-2.5 px-4 font-bold text-xs rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-sm cursor-pointer ${
                  isProjector
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                <span>View on {isProjector ? 'playbeat.digital' : 'playbeat.digital'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
