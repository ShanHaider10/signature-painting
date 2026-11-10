import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { QualityBanner } from './components/QualityBanner';
import { OurWorkSection } from './components/OurWorkSection';
import { ColorVisualizer } from './components/ColorVisualizer';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EstimateModal } from './components/EstimateModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ReviewModal } from './components/ReviewModal';
import { REVIEWS_DATA, COMPANY_INFO } from './data/mockData';
import { ReviewItem } from './types';
import { Phone, Calculator } from 'lucide-react';

export default function App() {
  const [estimateModalOpen, setEstimateModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [detailModalServiceId, setDetailModalServiceId] = useState<string | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS_DATA);

  const handleOpenEstimate = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setEstimateModalOpen(true);
  };

  const handleSelectService = (serviceId: string) => {
    setDetailModalServiceId(serviceId);
  };

  const handleAddReview = (newReview: ReviewItem) => {
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
      {/* Header */}
      <Header
        onOpenEstimate={handleOpenEstimate}
        onSelectService={handleSelectService}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenEstimate={() => handleOpenEstimate()}
          onOpenService={handleSelectService}
        />

        {/* Our Services */}
        <ServicesSection
          onSelectService={handleSelectService}
          onOpenEstimate={handleOpenEstimate}
        />

        {/* About Section */}
        <AboutSection
          onOpenEstimate={() => handleOpenEstimate()}
        />

        {/* QUALITY YOU CAN SEE Marquee Banner */}
        <QualityBanner
          onOpenEstimate={() => handleOpenEstimate()}
        />

        {/* Our Work Section */}
        <OurWorkSection
          onOpenEstimate={() => handleOpenEstimate()}
        />

        {/* Interactive NZ Colour Palette Visualizer */}
        <ColorVisualizer
          onOpenEstimate={() => handleOpenEstimate('colour-consultation')}
        />

        {/* What Our Clients Say (Testimonials) */}
        <TestimonialsSection
          reviews={reviews}
          onOpenReviewModal={() => setReviewModalOpen(true)}
        />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Ready to Transform Your Space? CTA Banner */}
        <CtaBanner
          onOpenEstimate={() => handleOpenEstimate()}
        />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenEstimate={() => handleOpenEstimate()}
        onSelectService={handleSelectService}
      />

      {/* Floating Quick Action Contact Bar (Mobile & Desktop sticky shortcut) */}
      <aside aria-label="Quick Actions" className="fixed bottom-4 right-4 z-40 flex items-center gap-2.5">
        <a
          href={COMPANY_INFO.phoneTel}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0b1a30] text-white shadow-xl hover:bg-slate-800 transition-all font-bold text-xs border border-slate-700"
          title="Direct Call"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">{COMPANY_INFO.phone}</span>
          <span className="sm:hidden">Call</span>
        </a>

        <button
          onClick={() => handleOpenEstimate()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-xl transition-all font-bold text-xs uppercase tracking-wider cursor-pointer border border-amber-300"
        >
          <Calculator className="w-4 h-4" />
          <span>Free Estimate</span>
        </button>
      </aside>

      {/* Modals */}
      <EstimateModal
        isOpen={estimateModalOpen}
        onClose={() => setEstimateModalOpen(false)}
        initialServiceId={selectedServiceId}
      />

      <ServiceDetailModal
        serviceId={detailModalServiceId}
        onClose={() => setDetailModalServiceId(null)}
        onOpenEstimate={handleOpenEstimate}
      />

      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onAddReview={handleAddReview}
      />
    </div>
  );
}
