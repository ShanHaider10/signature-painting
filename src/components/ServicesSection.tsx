import React from 'react';
import { Home, Paintbrush, Shield, Wrench, Palette, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
  onOpenEstimate: (serviceId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, onOpenEstimate }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return <Home className="w-5 h-5 text-white" />;
      case 'house':
        return <Shield className="w-5 h-5 text-white" />;
      case 'paint-roller':
        return <Paintbrush className="w-5 h-5 text-white" />;
      case 'wrench':
        return <Wrench className="w-5 h-5 text-white" />;
      case 'palette':
        return <Palette className="w-5 h-5 text-white" />;
      default:
        return <Paintbrush className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching mockup */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-px w-8 bg-amber-400"></span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1a30] tracking-tight font-display">
              Our Services
            </h2>
            <span className="h-px w-8 bg-amber-400"></span>
          </div>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            High-Quality Painting Services for Your Home and Business
          </p>
        </div>

        {/* 5 Service Cards matching the screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 flex flex-col overflow-hidden text-center cursor-pointer transform hover:-translate-y-1"
              onClick={() => onSelectService(service.id)}
            >
              {/* Card Image */}
              <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
              </div>

              {/* Floating Circular Icon Badge Overlapping Image */}
              <div className="relative -mt-6 mx-auto">
                <div className="w-12 h-12 rounded-full bg-[#0b1a30] border-2 border-white shadow-md flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                  {getIcon(service.icon)}
                </div>
              </div>

              {/* Text Body */}
              <div className="p-5 pt-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">
                    {service.subtitle}
                  </p>
                </div>

                {/* View Details affordance */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-700 group-hover:text-amber-600">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Value Callout Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Custom Scope or Multi-Room Renovation?</h4>
              <p className="text-xs text-slate-600">We bundle interior repainting, exterior coatings, and plastering with special Auckland package pricing.</p>
            </div>
          </div>
          <button
            onClick={() => onOpenEstimate()}
            className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white transition-all shrink-0 cursor-pointer"
          >
            Calculate Multi-Service Quote →
          </button>
        </div>

      </div>
    </section>
  );
};
