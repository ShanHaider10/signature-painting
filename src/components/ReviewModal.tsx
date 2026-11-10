import React, { useState } from 'react';
import { X, Star, CheckCircle } from 'lucide-react';
import { ReviewItem } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (review: ReviewItem) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onAddReview }) => {
  if (!isOpen) return null;

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(5);
  const [name, setName] = useState('');
  const [suburb, setSuburb] = useState('');
  const [serviceType, setServiceType] = useState('Interior Painting');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      location: suburb ? `${suburb}, Auckland` : 'Auckland',
      rating,
      comment: comment.trim(),
      avatar: '/assets/crops/client_sarah.png',
      date: 'Just now',
      serviceType
    };

    onAddReview(newReview);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl relative p-6 sm:p-8 border border-slate-200">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3 animate-in fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Review Submitted!</h3>
            <p className="text-xs text-slate-600">
              Thank you for sharing your experience with Signature Premium Paint Services.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                Homeowner Feedback
              </span>
              <h3 className="text-xl font-bold text-[#0b1a30]">
                Leave a Verified Review
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Share your rating and thoughts on our painting or plastering work.
              </p>
            </div>

            {/* Star Rating Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(rating)}
                    className="p-1 focus:outline-hidden cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      } transition-colors`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-700 ml-2">
                  {rating} / 5 Stars
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jason Taylor"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Auckland Suburb
                </label>
                <input
                  type="text"
                  value={suburb}
                  onChange={(e) => setSuburb(e.target.value)}
                  placeholder="e.g. Papakura, Remuera"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Service Done
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden bg-white"
              >
                <option value="Interior Painting">Interior Painting</option>
                <option value="Exterior Painting">Exterior Painting</option>
                <option value="Plastering & Gib Stopping">Plastering & Gib Stopping</option>
                <option value="Wall Repairs">Wall Repairs</option>
                <option value="Colour Consultation">Colour Consultation</option>
                <option value="Timber Deck & Fence">Timber Deck & Fence</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Review *
              </label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was our punctuality, prep work, quality of paint finish, and communication?"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-slate-950 cursor-pointer"
              >
                Publish Review
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
