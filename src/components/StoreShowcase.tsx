import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Clock, Flame, Utensils, Star, PlusCircle, Check, X } from 'lucide-react';
import { RESTAURANT_IMAGES } from '../data/menuData';
import { RESTAURANT_COORDS } from '../utils/distance';
import { WhatsAppIcon } from './WhatsAppIcon';

interface CustomerReview {
  name: string;
  area: string;
  comment: string;
  rating: number;
  isVerified?: boolean;
}

const DEFAULT_REVIEWS: CustomerReview[] = [
  {
    name: 'Farhan Siddiqui',
    area: 'North Karachi',
    comment: 'The chicken tikka and double smash burger were extraordinary! Freshly prepared, juicy meat, and super quick delivery.',
    rating: 5,
    isVerified: true,
  },
  {
    name: 'Zubair Ahmed',
    area: 'Surjani Town Sector 4',
    comment: 'Their crispy broast and seekh kababs are the best in the area. Authentic Karachi spices, fresh ingredients, and polite service.',
    rating: 5,
    isVerified: true,
  },
  {
    name: 'Asim Qureshi',
    area: 'Shadman Town',
    comment: 'Ordered the Family BBQ Platter for our gathering. Smokey aroma and tender chicken malai boti were absolute perfection.',
    rating: 5,
    isVerified: true,
  },
];

export const StoreShowcase: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem('alriaz_customer_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_REVIEWS;
  });

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewArea, setReviewArea] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('alriaz_customer_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    const newRev: CustomerReview = {
      name: reviewName.trim(),
      area: reviewArea.trim() || 'Karachi Diner',
      comment: reviewComment.trim(),
      rating: reviewRating,
      isVerified: true,
    };

    setReviews([newRev, ...reviews]);
    setIsSubmittedSuccess(true);
    setTimeout(() => {
      setIsSubmittedSuccess(false);
      setIsReviewModalOpen(false);
      setReviewName('');
      setReviewArea('');
      setReviewComment('');
      setReviewRating(5);
    }, 900);
  };

  return (
    <section id="counter" className="w-full max-w-full overflow-hidden py-14 md:py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-2">
            <Utensils className="w-3.5 h-3.5" />
            <span>Our Kitchen & Counter</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Fresh Live Grills & Open Kitchen
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 font-sans">
            Visit our live counter in Sector 4, Surjani Town, or get your favorite dishes delivered hot
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Photos Showcase */}
          <div className="lg:col-span-6 space-y-4">
            {/* Night storefront photo (Bottom-to-Top Reveal) */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 aspect-[16/10] bg-slate-950 group"
            >
              <img
                src={RESTAURANT_IMAGES.storeFrontNight}
                alt="Al Riaz Foods Kitchen Night View"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                  Open Kitchen & Counter
                </span>
                <h3 className="text-lg font-bold">
                  Al Riaz Foods & Pakwan Center
                </h3>
                <p className="text-xs text-slate-300">
                  Live Cooking Station & Express Fleet
                </p>
              </div>
            </motion.div>

            {/* Uploaded Al Riaz Banner & Daily Grill Badge (Bottom-to-Top Reveal) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 aspect-[7/5] bg-slate-950 group"
              >
                <img
                  src={RESTAURANT_IMAGES.counterSign}
                  alt="Al Riaz Foods BBQ & Fast Food Banner"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col justify-center"
              >
                <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 text-xs font-bold mb-1">
                  <Flame className="w-4 h-4" />
                  <span>Real Charcoal Grills</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                  Open 7 Days a Week
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Hot orders delivered till 3:00 AM late night.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Details & Location Action */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Kitchen Address
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-0.5">
                    {RESTAURANT_COORDS.address}
                  </p>
                  <a
                    href={RESTAURANT_COORDS.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    Open Restaurant in Google Maps &rarr;
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Daily Timings
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-0.5">
                    4:00 PM – 3:00 AM (Dinner, Late Night BBQ & Fast Food)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <Phone className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Hotline & WhatsApp
                  </h4>
                  <p className="text-sm font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                    {RESTAURANT_COORDS.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`tel:${RESTAURANT_COORDS.phone}`}
                className="inline-flex items-center gap-2 py-3 px-5 rounded-xl text-xs font-bold text-slate-800 dark:text-white bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                Direct Call
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_COORDS.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-3 px-5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 shadow-md shadow-orange-500/20 transition-all"
              >
                <WhatsAppIcon variant="mono" className="w-4 h-4 fill-white" />
                Direct WhatsApp Order
              </a>
            </div>
          </motion.div>
        </div>

        {/* Customer Reviews Section (#reviews) */}
        <div id="reviews" className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold">
                Guest Feedback & Reviews
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Loved by Foodies Across Karachi
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 flex items-center gap-1.5 self-start sm:self-auto shadow-md shadow-emerald-600/25 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Write a Food Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  {rev.isVerified && (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      Verified Diner
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  &quot;{rev.comment}&quot;
                </p>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{rev.name}</span>
                  <span className="text-slate-500 font-mono text-[11px]">{rev.area}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Submission Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md max-h-[92dvh] flex flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              <div className="shrink-0 p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="py-1 px-2.5 rounded-lg bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer"
                  >
                    ← Back
                  </button>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
                      Al Riaz Foods Experience
                    </span>
                    <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                      Write Your Review
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-200/70 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                  aria-label="Close review modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 sm:p-6">

              {isSubmittedSuccess ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Review Submitted!
                  </h4>
                  <p className="text-xs text-slate-500">
                    Thank you for sharing your feedback with the Al Riaz kitchen team.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Star Rating Select */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Rating:
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= reviewRating ? 'fill-amber-400' : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Kamran Khan"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Neighborhood / Area in Karachi
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Sector 5B, North Karachi"
                      value={reviewArea}
                      onChange={(e) => setReviewArea(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Comments & Food Quality *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="How was the taste, spices, delivery speed, and packing?"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-md shadow-emerald-600/30 cursor-pointer"
                  >
                    Post Customer Review
                  </button>
                </form>
              )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
