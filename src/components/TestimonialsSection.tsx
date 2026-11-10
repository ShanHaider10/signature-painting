import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Plus, MessageSquare } from 'lucide-react';
import { REVIEWS_DATA } from '../data/mockData';
import { ReviewItem } from '../types';

interface TestimonialsSectionProps {
  onOpenReviewModal: () => void;
  reviews: ReviewItem[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOpenReviewModal, reviews }) => {
  const [startIndex, setStartIndex] = useState(0);

  // We display 3 reviews at a time on desktop, 1 on mobile
  const maxIndex = Math.max(0, reviews.length - 3);

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1a30] tracking-tight font-display">
            What Our Clients Say
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium mt-1">
            Satisfied Homeowners and Businesses Across Auckland
          </p>
        </div>

        {/* Carousel Container with Left & Right Nav Buttons */}
        <div className="relative flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Left Arrow Button matching flyer circular arrow icon */}
          <button
            onClick={handlePrev}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm hover:bg-slate-50 hover:border-amber-400 hover:text-amber-600 flex items-center justify-center shrink-0 transition-all cursor-pointer z-10"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Cards Display Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(startIndex, startIndex + 3).map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between relative group"
              >
                {/* Quotation mark */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400">{review.date}</span>
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>

                {/* Author row with round avatar, name, and Auckland location */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 border border-slate-200 shrink-0">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      {review.name}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {review.location} · <span className="text-amber-600">{review.serviceType}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button matching flyer circular arrow icon */}
          <button
            onClick={handleNext}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm hover:bg-slate-50 hover:border-amber-400 hover:text-amber-600 flex items-center justify-center shrink-0 transition-all cursor-pointer z-10"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

        </div>

        {/* Bottom review actions & dots */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 max-w-2xl mx-auto">
          {/* Rating Summary */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-800">4.9 / 5.0 Average Rating</span>
            <span className="text-xs text-slate-500">({reviews.length} Verified Kiwi Reviews)</span>
          </div>

          {/* Leave a review button */}
          <button
            onClick={onOpenReviewModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-xs transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
            <span>Leave a Review</span>
          </button>
        </div>

      </div>
    </section>
  );
};
