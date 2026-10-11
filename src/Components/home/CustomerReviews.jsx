import React from "react";
import { TESTIMONIALS } from "../../data/mockProducts";
import { Star, CheckCircle, Quote } from "lucide-react";

const CustomerReviews = () => {
  return (
    <section id="reviews-section" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#72383D]">
            Client Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#322D29] mt-1">
            Loved by Connoisseurs Across Bangladesh
          </h2>
          <p className="text-xs sm:text-sm text-[#AC9C8D] mt-2">
            Real feedback from women who chose Lee's Whim for their weddings, Eid, and special occasions
          </p>
        </div>

        {/* Reviews 3-Card Grid - Borderless */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-3xl bg-[#EFE9E1]/60 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <Quote className="w-8 h-8 text-[#D1C7BD] absolute top-5 right-5" />

              <div>
                {/* Rating Stars in #72383D */}
                <div className="flex items-center gap-1 text-[#72383D] mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#72383D]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#322D29] leading-relaxed italic mb-4">
                  "{review.comment}"
                </p>
              </div>

              {/* Client Info */}
              <div className="pt-4 border-t border-[#D1C7BD]/50 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#322D29] flex items-center gap-1.5">
                    {review.name}
                    {review.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-[#72383D] inline" title="Verified Customer" />
                    )}
                  </h4>
                  <p className="text-[11px] text-[#AC9C8D]">{review.location}</p>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white text-[#72383D] font-medium shadow-2xs">
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
