import React from 'react';
import { X, Check, Clock, DollarSign, Paintbrush, ArrowRight, ShieldCheck } from 'lucide-react';
import { SERVICES_DATA } from '../data/mockData';

interface ServiceDetailModalProps {
  serviceId: string | null;
  onClose: () => void;
  onOpenEstimate: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ serviceId, onClose, onOpenEstimate }) => {
  if (!serviceId) return null;

  const service = SERVICES_DATA.find((s) => s.id === serviceId) || SERVICES_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl relative my-8 overflow-hidden border border-slate-200">
        
        {/* Header with image */}
        <div className="relative h-48 sm:h-56 w-full bg-slate-900 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">
              Signature Premium Trade Service
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {service.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
              {service.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Service Overview
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              What’s Included:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prep & Trade Process */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Our Prep & Workmanship Process:
            </h4>
            <div className="space-y-1.5 text-xs text-slate-600">
              {service.preparation.map((prep, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{prep}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Paints & Pricing info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Paint System</span>
              <p className="font-bold text-slate-900 mt-1">{service.recommendedPaints.join(', ')}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Turnaround</span>
              <p className="font-bold text-slate-900 mt-1">{service.typicalDuration}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Pricing Guide</span>
              <p className="font-bold text-amber-600 mt-1">{service.startingPrice}</p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>5-Year Written Warranty</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenEstimate(service.id);
              }}
              className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Instant Quote for this</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
