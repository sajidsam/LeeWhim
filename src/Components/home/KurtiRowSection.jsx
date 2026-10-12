import React from "react";
import ProductCard from "../common/ProductCard";
import { useShop } from "../../Context/ShopContext";
import { Sparkles, ArrowRight } from "lucide-react";

/**
 * KurtiRowSection: 2-Row Curated Showcase for Kurtis & Salwar Kameez
 * (5 items x 2 rows on desktop = 10 items; 4 items x 2 rows on tablet = 8 items)
 */
const KurtiRowSection = () => {
  const { setActiveCategoryFilter, kurtiProducts = [], isLoading } = useShop();

  const handleViewAll = () => {
    setActiveCategoryFilter("salwar-kameez");
    const target = document.getElementById("catalog-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Limit to exactly 2 rows (10 items on 5-col desktop grid)
  const displayKurtis = kurtiProducts.slice(0, 10);

  if (!isLoading && displayKurtis.length === 0) return null;

  return (
    <section id="kurti-showcase" className="py-10 sm:py-14 bg-white border-t border-[#E8DFD3]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#72383D]/10 text-[#72383D] text-[11px] font-semibold tracking-wider uppercase mb-1.5">
              <Sparkles className="w-3 h-3 text-[#72383D]" />
              <span>Kurtis & Tunics</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-brand font-bold text-[#322D29] tracking-tight">
              Festive Kurti & Salwar Kameez
            </h2>
            <p className="text-xs sm:text-sm text-[#7D7063] mt-1 max-w-xl">
              Signature Joom, Crepe and Cotton A-line silhouettes tailored with intricate karchupi embroidery and comfortable cuts.
            </p>
          </div>

          <button
            type="button"
            onClick={handleViewAll}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#72383D] hover:text-[#55272B] transition-colors self-start sm:self-auto group"
          >
            <span>Explore All Kurtis</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 2-Row Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {displayKurtis.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KurtiRowSection;
