import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, MessageSquare, AlertCircle } from 'lucide-react';
import { COMPANY_INFO, AUCKLAND_SUBURBS } from '../data/mockData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    suburb: 'Papakura',
    serviceNeeded: 'Interior Painting',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setError('Please provide your name, phone number, and email.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact Info & Auckland Service Areas */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1a30] font-display tracking-tight">
                Let’s Discuss Your Next Painting Project
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether you need a quick plastering patch or a full residential exterior repaint, we’re here to provide honest advice and a fast, transparent quote.
              </p>
            </div>

            {/* Direct Contact Cards matching flyer info */}
            <div className="space-y-3 pt-2">
              <a
                href={COMPANY_INFO.phoneTel}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-400 shadow-xs flex items-center gap-4 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center shrink-0 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Phone / Mobile</p>
                  <p className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {COMPANY_INFO.phone}
                  </p>
                  <p className="text-[11px] text-slate-500">Available 7:00 AM - 6:30 PM (Mon - Sat)</p>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-400 shadow-xs flex items-center gap-4 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center shrink-0 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Direct Email</p>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {COMPANY_INFO.email}
                  </p>
                  <p className="text-[11px] text-slate-500">Quotes returned within 24 hours</p>
                </div>
              </a>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Headquarters & Base</p>
                  <p className="text-sm font-bold text-slate-900">
                    {COMPANY_INFO.location}
                  </p>
                  <p className="text-[11px] text-slate-500">Serving South, Central, East, West & North Auckland</p>
                </div>
              </div>
            </div>

            {/* Auckland Suburbs Tag Cloud */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Auckland Suburbs Serviced Daily:
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {AUCKLAND_SUBURBS.map((suburb) => (
                  <span
                    key={suburb}
                    className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                  >
                    {suburb}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl relative">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#0b1a30]">
                    Inquiry Received, {formData.name}!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Signature Premium Paint Services. Our Auckland team has received your message and will call or email you back shortly (typically within 2-4 hours).
                  </p>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-left text-xs space-y-1">
                    <p><strong className="text-slate-800">Phone:</strong> {formData.phone}</p>
                    <p><strong className="text-slate-800">Email:</strong> {formData.email}</p>
                    <p><strong className="text-slate-800">Suburb:</strong> {formData.suburb}</p>
                    <p><strong className="text-slate-800">Service:</strong> {formData.serviceNeeded}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        suburb: 'Papakura',
                        serviceNeeded: 'Interior Painting',
                        message: ''
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0b1a30]">
                      Request Free Call Back or Quote
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Fill out your details below and we will contact you directly.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Smith"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 021 123 4567"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-hidden"
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
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. john@example.co.nz"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Auckland Suburb
                      </label>
                      <select
                        value={formData.suburb}
                        onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-hidden bg-white"
                      >
                        {AUCKLAND_SUBURBS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Service Required
                    </label>
                    <select
                      value={formData.serviceNeeded}
                      onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-hidden bg-white"
                    >
                      <option value="Interior Painting">Interior Painting (Walls & Ceilings)</option>
                      <option value="Exterior Painting">Exterior Painting (Weatherboards / Render / Roof)</option>
                      <option value="Plastering & Skimming">Plastering & Gib Stopping</option>
                      <option value="Wall Repairs">Wall Repairs & Hole Patching</option>
                      <option value="Colour Consultation">Colour Consultation</option>
                      <option value="Timber Deck & Fence">Timber Deck & Fence Staining</option>
                      <option value="Full House Renovation">Full House Interior + Exterior Package</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Project Details or Questions (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the property, rooms, timeline, or any specific concerns..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-hidden"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry to Signature Paint</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-center text-slate-400">
                    🔒 We respect your privacy. No spam. You will be contacted directly by our Auckland painting team.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
