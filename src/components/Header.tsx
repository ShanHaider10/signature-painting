import React, { useState } from 'react';
import { Phone, Mail, MapPin, Menu, X, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/mockData';

interface HeaderProps {
  onOpenEstimate: (serviceId?: string) => void;
  onSelectService: (serviceId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEstimate, onSelectService }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs">
      {/* Top Bar - Exact details from flyer */}
      <div className="bg-[#0b1a30] text-slate-200 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2">
          {/* Left contact info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href={COMPANY_INFO.phoneTel}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-medium"
              title="Call Signature Paint Services"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              title="Email Signature Paint Services"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{COMPANY_INFO.email}</span>
            </a>
            <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{COMPANY_INFO.location}</span>
            </div>
          </div>

          {/* Right value badges */}
          <div className="hidden md:flex items-center gap-4 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Quality Work
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              On Time
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Affordable Price
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo brand lockup matching mockup */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            {/* Custom SVG / Graphic matching the yellow house and paint roller */}
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900 to-[#0b1a30] text-amber-400 shadow-md border border-slate-800">
              {/* Paint roller inside house icon */}
              <svg viewBox="0 0 40 40" className="w-8 h-8 fill-current">
                <path d="M20 5 L6 16 L10 16 L10 32 L30 32 L30 16 L34 16 Z" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Paint roller handle & spool */}
                <rect x="14" y="14" width="12" height="6" rx="2" fill="#fbbf24" />
                <path d="M20 20 L20 26 M18 26 L22 26" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0b1a30] leading-tight font-display">
                SIGNATURE
              </span>
              <span className="text-[11px] font-bold tracking-widest text-slate-600 uppercase">
                PREMIUM PAINT SERVICES
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <a href="#" className="text-slate-900 hover:text-amber-500 transition-colors">
              Home
            </a>

            {/* Services Dropdown */}
            <div className="relative" onMouseLeave={() => setServicesDropdownOpen(false)}>
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className="flex items-center gap-1 hover:text-amber-500 transition-colors focus:outline-hidden"
              >
                <span>Our Services</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-200" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  {SERVICES_DATA.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        onSelectService(service.id);
                        setServicesDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-600 flex items-center justify-between transition-colors"
                    >
                      <span>{service.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">View Info</span>
                    </button>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1 px-3">
                    <button
                      onClick={() => {
                        onOpenEstimate();
                        setServicesDropdownOpen(false);
                      }}
                      className="w-full text-center py-2 text-xs font-bold text-amber-600 hover:underline"
                    >
                      Instant Cost Calculator →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <a href="#work" className="hover:text-amber-500 transition-colors">
              Our Work
            </a>
            <a href="#about" className="hover:text-amber-500 transition-colors">
              About Us
            </a>
            <a href="#testimonials" className="hover:text-amber-500 transition-colors">
              Testimonials
            </a>
            <a href="#faq" className="hover:text-amber-500 transition-colors">
              FAQ
            </a>
            <a href="#contact" className="hover:text-amber-500 transition-colors">
              Contact
            </a>
          </nav>

          {/* Primary CTA Button - Golden Yellow matching flyer */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenEstimate()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <span>Get a Free Estimate</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenEstimate()}
              className="sm:hidden px-3 py-1.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950"
            >
              Estimate
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-800">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Home
            </a>
            <div className="px-3 py-2 font-medium text-xs text-slate-500 uppercase tracking-wider">
              Our Services
            </div>
            <div className="pl-4 space-y-1">
              {SERVICES_DATA.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    onSelectService(service.id);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:text-amber-600 block"
                >
                  {service.title}
                </button>
              ))}
            </div>
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Our Work
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              About Us
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Testimonials
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Contact
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                onOpenEstimate();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-full font-bold text-center text-xs uppercase tracking-wider bg-amber-400 hover:bg-amber-500 text-slate-950"
            >
              Get a Free Estimate →
            </button>
            <a
              href={COMPANY_INFO.phoneTel}
              className="w-full py-2.5 rounded-full font-semibold text-center text-xs bg-slate-900 text-white flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call: {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
