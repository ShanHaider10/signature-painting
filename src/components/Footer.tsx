import React from 'react';
import { Phone, Mail, MapPin, ArrowRight, Heart } from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/mockData';

interface FooterProps {
  onOpenEstimate: () => void;
  onSelectService: (serviceId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEstimate, onSelectService }) => {
  return (
    <footer className="bg-[#05101f] text-slate-300 pt-16 pb-8 border-t border-slate-800 relative overflow-hidden">
      
      {/* Decorative Auckland Skyline Silhouette overlay in the background matching flyer! */}
      <div className="absolute right-0 bottom-12 w-64 sm:w-80 h-36 opacity-20 pointer-events-none flex items-end justify-end pr-4">
        {/* Sky Tower & Skyline vector silhouette */}
        <svg viewBox="0 0 300 150" className="w-full h-full fill-amber-400">
          {/* Sky tower */}
          <rect x="240" y="20" width="4" height="110" />
          <polygon points="234,40 250,40 246,55 238,55" />
          <polygon points="236,25 248,25 244,35 240,35" />
          <rect x="241" y="5" width="2" height="20" />
          {/* City buildings */}
          <rect x="180" y="60" width="20" height="70" />
          <rect x="205" y="45" width="25" height="85" />
          <rect x="150" y="75" width="25" height="55" />
          <rect x="110" y="85" width="35" height="45" />
          <rect x="70" y="95" width="35" height="35" />
          <polygon points="215,35 220,45 210,45" />
          {/* Harbour bridge arch */}
          <path d="M10,130 Q50,90 90,130" stroke="#fbbf24" strokeWidth="3" fill="none" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Tagline matching flyer */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-amber-400 border border-slate-700 shadow-md">
                <svg viewBox="0 0 40 40" className="w-8 h-8 fill-current">
                  <path d="M20 5 L6 16 L10 16 L10 32 L30 32 L30 16 L34 16 Z" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="14" y="14" width="12" height="6" rx="2" fill="#fbbf24" />
                  <path d="M20 20 L20 26 M18 26 L22 26" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white block leading-tight font-display">
                  SIGNATURE
                </span>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block">
                  PREMIUM PAINT SERVICES
                </span>
              </div>
            </div>

            {/* Tagline matching flyer: "Quality Paint. Lasting Impression." */}
            <p className="font-serif italic text-lg text-amber-300 font-semibold tracking-wide">
              Quality Paint. Lasting Impression.
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Professional residential & commercial painting, master plastering, and property care across Auckland. Built on honesty, punctuality, and flawless trade finishes.
            </p>

            <div className="pt-1">
              <button
                onClick={onOpenEstimate}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors"
              >
                <span>Free On-Site Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Links matching flyer */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400">›</span>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400">›</span>
                  <span>Our Services</span>
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400">›</span>
                  <span>Our Work</span>
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400">›</span>
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400">›</span>
                  <span>Testimonials</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400">›</span>
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Services List */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Trade Services
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES_DATA.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onSelectService(s.id)}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left text-slate-300"
                  >
                    <span className="text-amber-400">›</span>
                    <span>{s.title}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenEstimate}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left text-slate-300"
                >
                  <span className="text-amber-400">›</span>
                  <span>Timber Deck & Fence Staining</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Us matching flyer */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Contact Us
            </h4>
            
            <div className="space-y-2.5 text-xs">
              <a
                href={COMPANY_INFO.phoneTel}
                className="flex items-center gap-2.5 text-slate-200 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{COMPANY_INFO.phone}</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2.5 text-slate-200 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="break-all">{COMPANY_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.location} (Servicing All Greater Auckland)</span>
              </div>
            </div>

            {/* Social Icons matching flyer: Facebook, Instagram, Google, YouTube */}
            <div className="pt-2">
              <p className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                Follow Us
              </p>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="#contact"
                  className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  title="Facebook"
                >
                  <span className="text-xs font-black">f</span>
                </a>
                {/* Instagram */}
                <a
                  href="#contact"
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  title="Instagram"
                >
                  <span className="text-xs font-black">ig</span>
                </a>
                {/* Google Maps / Reviews */}
                <a
                  href="#contact"
                  className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center hover:opacity-90 transition-opacity"
                  title="Google Business Profile"
                >
                  <span className="text-xs font-bold text-blue-600">G</span>
                </a>
                {/* YouTube */}
                <a
                  href="#contact"
                  className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  title="YouTube"
                >
                  <span className="text-xs font-bold">▶</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom bar matching flyer: Copyright & Designed with ❤️ for a more beautiful New Zealand */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2025-2026 Signature Premium Paint Services. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5 text-slate-400">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>for a more beautiful New Zealand</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
