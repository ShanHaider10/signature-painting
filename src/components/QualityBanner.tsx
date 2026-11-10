import React, { useState } from 'react';
import { Star, ArrowRight, Check, SlidersHorizontal, Eye } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface QualityBannerProps {
  onOpenEstimate: () => void;
}

export const QualityBanner: React.FC<QualityBannerProps> = ({ onOpenEstimate }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activePhoto, setActivePhoto] = useState<'hallway' | 'deck'>('deck');

  return (
    <section className="relative bg-[#07162c] text-white py-14 sm:py-20 overflow-hidden border-t-4 border-amber-400">
      
      {/* Decorative Gold & Navy background patterns */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(45deg, #fbbf24 25%, transparent 25%), linear-gradient(-45deg, #fbbf24 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fbbf24 75%), linear-gradient(-45deg, transparent 75%, #fbbf24 75%)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Founder / Master Painter Portrait & 5 Stars */}
          <div className="lg:col-span-3 flex flex-col items-center text-center">
            <div className="relative">
              {/* Outer Golden Glow Ring */}
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1.5 bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 shadow-xl">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-900 bg-slate-800">
                  <img
                    src="/assets/crops/founder_avatar.png"
                    alt="Master Painter and Founder of Signature Premium Paint Services"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                <span className="px-3 py-0.5 rounded-full bg-slate-900 border border-amber-400/50 text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                  Lead Painter
                </span>
              </div>
            </div>

            {/* 5 Golden Stars matching flyer */}
            <div className="flex items-center gap-1.5 mt-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs font-semibold text-slate-300 mt-1">100+ Auckland Homes Transformed</p>
          </div>

          {/* Center Column: Typography & Button */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-4">
            <div>
              <p className="font-serif italic text-3xl sm:text-4xl text-amber-300 tracking-wide font-bold">
                QUALITY
              </p>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display uppercase">
                YOU CAN SEE
              </h2>
            </div>

            {/* Sub-label */}
            <p className="text-sm sm:text-base font-semibold tracking-wider text-slate-200 uppercase">
              Painting • Plastering • Property Care
            </p>

            {/* Pill matching flyer */}
            <div className="inline-block">
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-slate-900 border border-amber-400/80 text-amber-400 font-bold text-xs tracking-widest uppercase">
                5+ YEARS' EXPERIENCE
              </span>
            </div>

            {/* Big Yellow CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenEstimate}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-wider bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-xl shadow-amber-400/20 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span>GET YOUR FREE ESTIMATE</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            <p className="text-xs font-medium text-slate-400 italic">
              Signature Premium Paint Services · Papakura & Greater Auckland
            </p>
          </div>

          {/* Right Column: Two Featured Transformation Photos (Hallway & Deck) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-amber-300 font-semibold mb-1">
              <span>Verified Local Auckland Finishes</span>
              <span className="text-slate-400">Click to inspect</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Photo 1: Interior Hallway */}
              <div 
                className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer group bg-slate-800 ${activePhoto === 'hallway' ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-700 opacity-90'}`}
                onClick={() => setActivePhoto('hallway')}
              >
                <div className="h-40 sm:h-44 w-full overflow-hidden">
                  <img
                    src="/assets/crops/hallway.png"
                    alt="Polished timber hallway interior painting in Auckland home"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-slate-950/85 p-2 backdrop-blur-xs">
                  <p className="text-[11px] font-bold text-white truncate">Hallway & Architraves</p>
                  <p className="text-[10px] text-amber-300 font-medium">Dulux Low Sheen White</p>
                </div>
              </div>

              {/* Photo 2: Stained Deck & Fence */}
              <div 
                className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer group bg-slate-800 ${activePhoto === 'deck' ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-700 opacity-90'}`}
                onClick={() => setActivePhoto('deck')}
              >
                <div className="h-40 sm:h-44 w-full overflow-hidden">
                  <img
                    src="/assets/crops/deck.png"
                    alt="Restored and stained wooden timber deck and boundary fence in Auckland"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-slate-950/85 p-2 backdrop-blur-xs">
                  <p className="text-[11px] font-bold text-white truncate">Timber Deck & Fence</p>
                  <p className="text-[10px] text-amber-300 font-medium">UV Protective Stain</p>
                </div>
              </div>
            </div>

            {/* Interactive Before & After transformation note */}
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 flex items-center justify-between">
              <span>{activePhoto === 'hallway' ? '✨ Plaster skimmed & high-scuff resistant interior' : '🛡️ Anti-fungal wash + 2 coats penetrating timber oil'}</span>
              <button 
                onClick={onOpenEstimate}
                className="text-[11px] font-bold text-amber-400 hover:underline shrink-0 ml-2"
              >
                Quote this finish →
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative paint roller illustration on bottom right */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 pointer-events-none opacity-40 lg:opacity-80">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-amber-400">
          <path d="M70 20 C60 20 40 10 30 25 C20 40 40 50 50 60 L60 80 L70 75 L60 55 C70 45 80 30 70 20 Z" opacity="0.3" />
          <rect x="25" y="10" width="45" height="18" rx="5" fill="#fbbf24" />
          <path d="M47 28 L47 48 L65 58" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  );
};
