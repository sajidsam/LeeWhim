import React from "react";
import { TESTIMONIALS } from "../../data/mockProducts";
import { Star, CheckCircle, Quote } from "lucide-react";

const CustomerReviews = () => {
  return (
    <section id="reviews-section" className="py-12 sm:py-16 bg-white border-b border-rose-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#be123c]">
            Client Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-gray-900 mt-1">
            Loved by Connoisseurs Across Bangladesh
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Real feedback from women who chose Lee's Whim for their weddings, Eid, and special occasions
          </p>
        </div>

        {/* Reviews 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-3xl bg-rose-50/30 border border-rose-100/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <Quote className="w-8 h-8 text-rose-200/80 absolute top-5 right-5" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic mb-4">
                  "{review.comment}"
                </p>
              </div>

              {/* Client Info */}
              <div className="pt-4 border-t border-rose-100/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
                    {review.name}
                    {review.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline" title="Verified Customer" />
                    )}
                  </h4>
                  <p className="text-[11px] text-gray-500">{review.location}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-rose-100 text-rose-900 font-medium">
                  {review.product.slice(0, 16)}...
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
