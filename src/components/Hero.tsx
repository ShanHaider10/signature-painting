import React from 'react';
import { Check, Phone, ArrowRight, ShieldCheck, Sparkles, Clock, Award } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface HeroProps {
  onOpenEstimate: () => void;
  onOpenService: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEstimate, onOpenService }) => {
  return (
    <section className="relative bg-[#081528] text-white overflow-hidden pt-8 pb-20 sm:pb-28 lg:pb-36">
      {/* Background architectural glow & subtle texture */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#061122] via-[#091a33] to-[#0d2242] opacity-95"></div>
      
      {/* Subtle geometric grid */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline, copy, bullet checklist, and action buttons */}
          <div className="lg:col-span-7 z-10 space-y-6 pt-2 pb-6">
            
            {/* Trust Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-amber-400 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auckland’s Trusted Residential & Commercial Painters</span>
            </div>

            {/* Main Brand Title matching screenshot typography */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] font-display">
                <span className="block text-white">Signature Premium</span>
                <span className="block text-amber-400 drop-shadow-xs">Paint Services</span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-100 italic tracking-tight font-serif pt-1">
                Transform Your Space with Professional Painting
              </p>
            </div>

            {/* Descriptive subhead */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Expert painting, plastering and wall repairs for homes and businesses across Auckland. High-durability coatings, clean craftsmanship, and guaranteed lasting impressions.
            </p>

            {/* 4 Feature Checklist Items with Yellow Circular Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                { label: 'Interior & Exterior Painting', id: 'interior-painting' },
                { label: 'Plastering', id: 'plastering' },
                { label: 'Wall Repairs', id: 'wall-repairs' },
                { label: 'Colour Consultation', id: 'colour-consultation' }
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onOpenService(item.id)}
                  className="flex items-center gap-2.5 text-left text-sm font-semibold text-slate-200 hover:text-amber-300 transition-colors group cursor-pointer"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 text-slate-950 shrink-0 group-hover:scale-110 transition-transform">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Hero CTAs matching exact layout */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {/* Button 1: Golden Yellow "Get a Free Estimate ➔" */}
              <button
                type="button"
                onClick={onOpenEstimate}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span>Get a Free Estimate</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Button 2: Dark Pill "Call Us: 021 082 57495" */}
              <a
                href={COMPANY_INFO.phoneTel}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-sm bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 shadow-md transition-all duration-200 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Us: {COMPANY_INFO.phone}</span>
              </a>
            </div>

            {/* Adjacency Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>On-Time Guarantee</span>
              </div>
              <span className="text-slate-700">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>$5M Public Liability Insured</span>
              </div>
              <span className="text-slate-700">·</span>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>5-Year Written Warranty</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase (Modern Villa Exterior + Painter with roller) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main composite card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700/60 bg-slate-900 group">
                {/* Background image of the modern illuminated house */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-800">
                  <img
                    src="/assets/crops/hero_house.png"
                    alt="Signature Premium modern house painting exterior in Auckland"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                </div>

                {/* Painter cutout floating in the foreground */}
                <div className="absolute right-0 bottom-0 w-44 sm:w-52 h-64 sm:h-72 pointer-events-none drop-shadow-2xl">
                  <img
                    src="/assets/crops/painter.png"
                    alt="Professional Auckland painter with paint roller in Signature uniform"
                    className="w-full h-full object-contain object-bottom"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Floating badge inside visual */}
                <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md border border-amber-400/40 rounded-xl px-3.5 py-2.5 shadow-xl max-w-[210px]">
                  <p className="text-[10px] font-bold tracking-wider text-amber-400 uppercase">Auckland Specialist</p>
                  <p className="text-xs font-bold text-white leading-tight">Master Painters & Plasterers</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">Dulux & Resene Certified</p>
                </div>
              </div>

              {/* Decorative Paint Splatter / Glow Accent */}
              <div className="absolute -top-8 -right-8 w-44 h-44 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>

      {/* Yellow Wave Bottom Divider (exact match to the flyer design!) */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-10 sm:h-16 text-white fill-current"
        >
          {/* Yellow sweep wave */}
          <path d="M0,0 C300,90 800,120 1200,40 L1200,120 L0,120 Z" fill="#fbbf24" opacity="0.9" />
          <path d="M0,20 C350,110 850,110 1200,60 L1200,120 L0,120 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
};
