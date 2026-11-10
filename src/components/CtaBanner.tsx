import React from 'react';
import { ArrowRight, Phone, Calendar } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface CtaBannerProps {
  onOpenEstimate: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenEstimate }) => {
  return (
    <section className="relative bg-[#07162b] text-white py-12 sm:py-16 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#061122] via-[#091a33] to-[#0c2240]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left: Headline & Copy matching flyer */}
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-400 font-display tracking-tight">
              Ready to Transform Your Space?
            </h2>
            <p className="text-sm sm:text-base text-slate-200 font-medium">
              Contact us today for a free estimate and let us bring your vision to life!
            </p>
          </div>

          {/* Right: CTA Button & Paint Roller Art matching flyer */}
          <div className="flex items-center gap-6 shrink-0 relative">
            <button
              onClick={onOpenEstimate}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-xl shadow-amber-400/20 transition-all duration-200 active:scale-95 cursor-pointer z-10"
            >
              <span>Get a Free Estimate</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>

            {/* Paint roller with wet paint stroke */}
            <div className="hidden sm:block w-24 h-20 relative pointer-events-none opacity-90">
              <svg viewBox="0 0 100 80" className="w-full h-full">
                {/* Yellow paint trail */}
                <path d="M0,45 Q40,40 60,30 Q80,20 100,25 L100,50 Q75,40 40,60 L0,60 Z" fill="#fbbf24" opacity="0.8" />
                {/* Roller head */}
                <rect x="55" y="10" width="35" height="16" rx="4" fill="#f59e0b" />
                <path d="M72 26 L72 45 L50 55" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
