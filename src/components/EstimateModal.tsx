import React, { useState, useId } from 'react';
import { X, Calculator, Check, ArrowRight, Calendar, MapPin, DollarSign, ShieldCheck, Sparkles } from 'lucide-react';
import { AUCKLAND_SUBURBS, COMPANY_INFO } from '../data/mockData';

interface EstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export const EstimateModal: React.FC<EstimateModalProps> = ({ isOpen, onClose, initialServiceId }) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [serviceType, setServiceType] = useState(initialServiceId || 'interior-painting');
  const [scope, setScope] = useState<'single-room' | 'small-home' | 'standard-home' | 'large-villa'>('standard-home');
  const [wallCondition, setWallCondition] = useState<'good' | 'minor-repairs' | 'heavy-prep'>('minor-repairs');
  const [includeCeilings, setIncludeCeilings] = useState(true);
  const [includeTrims, setIncludeTrims] = useState(true);
  const [suburb, setSuburb] = useState('Papakura');
  const [preferredDate, setPreferredDate] = useState('2026-11-15');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingRef, setBookingRef] = useState('');

  // Calculate realistic NZ price estimate based on inputs
  const calculatePrice = () => {
    let base = 1200;

    if (serviceType === 'interior-painting') {
      if (scope === 'single-room') base = 480;
      else if (scope === 'small-home') base = 1800;
      else if (scope === 'standard-home') base = 3200;
      else if (scope === 'large-villa') base = 4800;
    } else if (serviceType === 'exterior-painting') {
      if (scope === 'single-room') base = 1400; // single facade / deck
      else if (scope === 'small-home') base = 3600;
      else if (scope === 'standard-home') base = 5800;
      else if (scope === 'large-villa') base = 8500;
    } else if (serviceType === 'plastering') {
      if (scope === 'single-room') base = 350;
      else if (scope === 'small-home') base = 950;
      else if (scope === 'standard-home') base = 1600;
      else if (scope === 'large-villa') base = 2800;
    } else if (serviceType === 'wall-repairs') {
      base = scope === 'single-room' ? 220 : 450;
    } else {
      base = 250;
    }

    if (wallCondition === 'minor-repairs') base *= 1.15;
    if (wallCondition === 'heavy-prep') base *= 1.35;

    if (includeCeilings) base += 450;
    if (includeTrims) base += 350;

    const min = Math.round(base * 0.9);
    const max = Math.round(base * 1.15);
    return { min, max };
  };

  const { min, max } = calculatePrice();

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `SP-AKL-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl relative my-8 overflow-hidden border border-slate-200">
        
        {/* Modal Top Bar */}
        <div className="bg-[#0b1a30] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg font-display">
                Instant Auckland Quote Calculator
              </h3>
              <p className="text-xs text-amber-300">
                Transparent pricing with Dulux & Resene paint systems
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress indicator */}
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600">
          <span className={step >= 1 ? 'text-amber-600 font-bold' : ''}>1. Project Scope</span>
          <span>›</span>
          <span className={step >= 2 ? 'text-amber-600 font-bold' : ''}>2. Inspection Details</span>
          <span>›</span>
          <span className={step >= 3 ? 'text-emerald-600 font-bold' : ''}>3. Confirmed</span>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          
          {step === 1 && (
            <div className="space-y-6">
              
              {/* Service Type Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Select Painting Service:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'interior-painting', label: 'Interior Painting' },
                    { id: 'exterior-painting', label: 'Exterior Painting' },
                    { id: 'plastering', label: 'Plastering & Skimming' },
                    { id: 'wall-repairs', label: 'Wall Repairs & Patch' },
                    { id: 'colour-consultation', label: 'Colour Consultation' },
                    { id: 'timber-deck', label: 'Timber Deck & Fence' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setServiceType(s.id)}
                      className={`p-3 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer ${
                        serviceType === s.id
                          ? 'border-amber-400 bg-amber-50 text-slate-900 shadow-xs ring-1 ring-amber-400'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Scope / Size */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Estimated Property Scope:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'single-room', label: 'Single Room', sub: '1 area' },
                    { id: 'small-home', label: 'Small Home', sub: '2 Bed / Unit' },
                    { id: 'standard-home', label: 'Standard Home', sub: '3-4 Bedrooms' },
                    { id: 'large-villa', label: 'Large Villa', sub: '4+ Bed / 2-Storey' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setScope(item.id as any)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        scope === item.id
                          ? 'border-amber-400 bg-amber-50 shadow-xs ring-1 ring-amber-400'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <p className="text-xs font-bold text-slate-900">{item.label}</p>
                      <p className="text-[10px] text-slate-500">{item.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Surface Condition */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Current Surface Condition:
                </label>
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  {[
                    { id: 'good', label: 'Good (Clean repaint)' },
                    { id: 'minor-repairs', label: 'Minor cracks / holes' },
                    { id: 'heavy-prep', label: 'Peeling / Heavy repair' }
                  ].map((cond) => (
                    <button
                      key={cond.id}
                      type="button"
                      onClick={() => setWallCondition(cond.id as any)}
                      className={`p-2.5 rounded-xl border text-center font-medium transition-all cursor-pointer ${
                        wallCondition === cond.id
                          ? 'border-amber-400 bg-amber-50 text-slate-900 font-bold ring-1 ring-amber-400'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {cond.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons Checkboxes */}
              <div className="flex flex-wrap items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={includeCeilings}
                    onChange={(e) => setIncludeCeilings(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                  />
                  <span>Include Ceilings (+ Flat Ceiling White)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={includeTrims}
                    onChange={(e) => setIncludeTrims(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-400 focus:ring-amber-400"
                  />
                  <span>Include Skirting & Doors (+ Enamel Gloss)</span>
                </label>
              </div>

              {/* Live Price Estimation Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0b1a30] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">
                    Estimated Auckland Price Range
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-0.5">
                    ${min.toLocaleString()} – ${max.toLocaleString()} <span className="text-xs font-normal text-slate-400">NZD + GST</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Includes trade prep, gap sealing, 2 top coats & 5-year workmanship warranty.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shrink-0 cursor-pointer flex items-center gap-2 shadow-md"
                >
                  <span>Book Free On-Site Inspection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div>
                <h4 className="text-lg font-bold text-[#0b1a30]">
                  Where & When Should We Inspect?
                </h4>
                <p className="text-xs text-slate-500">
                  We visit your property, verify measurements, discuss colours, and finalize the exact fixed quote.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number (for booking confirmation) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 021 082 57495"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.co.nz"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Auckland Suburb *
                  </label>
                  <select
                    value={suburb}
                    onChange={(e) => setSuburb(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden bg-white"
                  >
                    {AUCKLAND_SUBURBS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 24 Great South Road, Papakura"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Inspection Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden bg-white"
                  >
                    <option>Morning (8:00 AM - 12:00 PM)</option>
                    <option>Afternoon (12:00 PM - 4:00 PM)</option>
                    <option>Late Afternoon (4:00 PM - 6:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Special Notes or Access Instructions
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Weatherboard home, high ceilings, dog on property, ladder access required..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden"
                />
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  ← Back to Calculator
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-md cursor-pointer"
                >
                  Confirm Free Booking →
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="py-6 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                  Booking Confirmed!
                </span>
                <h3 className="text-2xl font-extrabold text-[#0b1a30]">
                  Thank You, {name || 'Valued Customer'}!
                </h3>
                <p className="text-xs text-slate-500">
                  Reference Code: <span className="font-mono font-bold text-amber-600">{bookingRef}</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-slate-800 capitalize">{serviceType.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Suburb:</span>
                  <span className="font-bold text-slate-800">{suburb}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Preferred Date:</span>
                  <span className="font-bold text-slate-800">{preferredDate}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Estimated Price:</span>
                  <span className="font-bold text-amber-600">${min.toLocaleString()} – ${max.toLocaleString()} NZD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact:</span>
                  <span className="font-bold text-slate-800">{phone || COMPANY_INFO.phone}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Our master painter from Signature Premium Paint Services will call you on <strong>{phone || COMPANY_INFO.phone}</strong> shortly to confirm the appointment.
              </p>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
                >
                  Done & Return to Site
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
