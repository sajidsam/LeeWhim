import React from "react";
import ProductCard from "../common/ProductCard";
import { useShop } from "../../Context/ShopContext";
import { Sparkles, ArrowRight } from "lucide-react";

/**
 * SareeRowSection: 2-Row Curated Showcase for Sarees
 * (5 items x 2 rows on desktop = 10 items; 4 items x 2 rows on tablet = 8 items)
 */
const SareeRowSection = () => {
  const { setActiveCategoryFilter, sareeProducts = [], isLoading } = useShop();

  const handleViewAll = () => {
    setActiveCategoryFilter("saree");
    const target = document.getElementById("catalog-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Limit to exactly 2 rows (10 items on 5-col desktop grid)
  const displaySarees = sareeProducts.slice(0, 10);

  if (!isLoading && displaySarees.length === 0) return null;

  return (
    <section id="saree-showcase" className="py-10 sm:py-14 bg-[#FAF7F2] border-t border-[#E8DFD3]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#72383D]/10 text-[#72383D] text-[11px] font-semibold tracking-wider uppercase mb-1.5">
              <Sparkles className="w-3 h-3 text-[#72383D]" />
              <span>Heritage Drapes</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-brand font-bold text-[#322D29] tracking-tight">
              Exclusive Heritage Sarees
            </h2>
            <p className="text-xs sm:text-sm text-[#7D7063] mt-1 max-w-xl">
              Pure handloom cotton weaves, delicate floral prints, and ceremonial zari drapes crafted for timeless elegance.
            </p>
          </div>

          <button
            type="button"
            onClick={handleViewAll}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#72383D] hover:text-[#55272B] transition-colors self-start sm:self-auto group"
          >
            <span>Explore All Sarees</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 2-Row Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {displaySarees.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SareeRowSection;
