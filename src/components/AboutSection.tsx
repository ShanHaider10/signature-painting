import React, { useState } from 'react';
import { Shield, Gem, Clock, Handshake, ArrowRight, Check, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface AboutSectionProps {
  onOpenEstimate: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenEstimate }) => {
  const [showStoryModal, setShowStoryModal] = useState(false);

  const pillars = [
    {
      icon: <Shield className="w-6 h-6 text-[#0b1a30]" />,
      title: '5+ Years of Experience',
      desc: 'Tested across hundreds of residential villas, new subdivisions, and commercial properties in Auckland.'
    },
    {
      icon: <Gem className="w-6 h-6 text-[#0b1a30]" />,
      title: 'Premium Quality Work',
      desc: 'Never cutting corners on sanding, priming, and multi-coat application for durability.'
    },
    {
      icon: <Clock className="w-6 h-6 text-[#0b1a30]" />,
      title: 'On-Time Completion',
      desc: 'Firm schedules, clean daily site handovers, and respect for your family’s home environment.'
    },
    {
      icon: <Handshake className="w-6 h-6 text-[#0b1a30]" />,
      title: 'Competitive & Honest Pricing',
      desc: 'Detailed itemized quotes with zero hidden extras or surprise variation fees.'
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Authentic Photo of Paint Cans, Roller & Ladder */}
          <div className="lg:col-span-4">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white group">
              <div className="h-72 sm:h-80 w-full overflow-hidden">
                <img
                  src="/assets/crops/about_cans.png"
                  alt="Signature Premium paint buckets, roller and ladder setup"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">Trade Certified Equipment</p>
                  <p className="text-[11px] text-slate-500">HEPA dust extraction & drop sheets</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              </div>
            </div>
          </div>

          {/* Center Column: Title, Narrative Prose & Learn More CTA */}
          <div className="lg:col-span-4 space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">
                Papakura & Greater Auckland
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1a30] tracking-tight font-display leading-tight">
                About Signature Premium Paint Services
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              With over 5 years of professional experience, we take pride in delivering high-quality painting and plastering solutions. Whether it's a fresh look, a detailed finish, or wall repairs, our team is committed to enhancing the beauty and value of your property.
            </p>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Based in Papakura, we service homes and commercial properties throughout Auckland. We believe in meticulous prep work, honest communication, and using only New Zealand’s top-tier coatings like Dulux and Resene.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowStoryModal(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Features with Icons matching screenshot */}
          <div className="lg:col-span-4 space-y-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-amber-400 transition-colors flex items-start gap-3.5"
              >
                <div className="p-2.5 rounded-lg bg-amber-50 text-[#0b1a30] shrink-0 mt-0.5">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Learn More Modal Dialog */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowStoryModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">
                Our Story & Standards
              </div>
              <h3 className="text-2xl font-extrabold text-[#0b1a30]">
                Built on Kiwi Craftsmanship and Integrity
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Signature Premium Paint Services was founded with a singular mission: to eliminate the stress and uncertainty homeowners face when renovating. We noticed too many Auckland contractors rushing prep work, skipping primers, and delivering sloppy paint bleed onto architraves.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                We do things the right way. We spend up to 70% of our project time on surface preparation—washing down contaminants, filling holes, securing loose gib, and sanding to perfection. The paint that goes on top will look vibrant and last for years without bubbling or peeling.
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-800 tracking-wider">Our Trade Commitments:</h4>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>$5,000,000 public liability insurance on every job site</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Zero cigarette smoking or swearing on client premises</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Daily vacuuming and tidy drop-sheet removal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Full final walkthrough and touch-up guarantee before final sign-off</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowStoryModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowStoryModal(false);
                    onOpenEstimate();
                  }}
                  className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 hover:bg-amber-500 text-slate-950"
                >
                  Book Free On-Site Inspection →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
