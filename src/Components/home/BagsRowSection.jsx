import React, { useRef } from "react";
import ProductCard from "../common/ProductCard";
import { useShop } from "../../Context/ShopContext";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";

/**
 * BagsRowSection: Dedicated single-row showcase for Women Bags collection.
 * Powered by live MongoDB database collection.
 */
const BagsRowSection = () => {
  const scrollRef = useRef(null);
  const { setActiveCategoryFilter, products = [] } = useShop();

  // Filter bag products from live database
  const bagProducts = products.filter(
    (p) => p.categorySlug === "bags" || (p.subCategory && p.subCategory.toLowerCase().includes("bag"))
  );

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleViewAllBags = () => {
    setActiveCategoryFilter("bags");
    const target = document.getElementById("catalog-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!bagProducts || bagProducts.length === 0) return null;

  return (
    <section className="bg-[#FAF7F2] py-10 sm:py-14 border-y border-[#E8DFD3]/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#72383D]/10 text-[#72383D] text-[11px] font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Women's Bag Collection</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-brand font-bold text-[#322D29] tracking-tight">
              Artisanal Handbags & Crossbody
            </h2>
            <p className="text-xs sm:text-sm text-[#7D7063] mt-1 max-w-xl">
              Trendy commuter shoulder bags, croissant chic crossbodies, and premium retro totes curated for modern elegance.
            </p>
          </div>

          {/* Controls: Prev/Next and View All */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              type="button"
              onClick={handleViewAllBags}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#72383D] hover:text-[#55272B] transition-colors mr-2 group"
            >
              <span>View All Bags</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Previous bags"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#E8DFD3] text-[#322D29] flex items-center justify-center hover:bg-[#72383D] hover:text-white hover:border-[#72383D] transition-all shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Next bags"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#E8DFD3] text-[#322D29] flex items-center justify-center hover:bg-[#72383D] hover:text-white hover:border-[#72383D] transition-all shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 1 Row Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {bagProducts.map((bag) => (
            <div
              key={bag.id}
              className="w-[200px] sm:w-[240px] md:w-[260px] lg:w-[275px] shrink-0"
            >
              <ProductCard product={bag} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BagsRowSection;
