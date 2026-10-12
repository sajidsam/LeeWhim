import React from "react";
import ProductCard from "../common/ProductCard";
import { PRODUCTS } from "../../data/mockProducts";
import { useShop } from "../../Context/ShopContext";
import { Sparkles, ArrowRight } from "lucide-react";

const CuratedSpotlight = () => {
  const { setActiveCategoryFilter } = useShop();

  // Pick 6 spotlight products (Sarees + Jewellery mix)
  const spotlightProducts = PRODUCTS.slice(0, 6);

  const handleSpotlightCta = () => {
    setActiveCategoryFilter("salwar-kameez");
    const target = document.getElementById("catalog-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#72383D]">
              <Sparkles className="w-3.5 h-3.5 text-[#AC9C8D]" />
              <span>Women Collection Showcase</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold font-serif-luxury text-[#322D29] mt-1">
              Festive Heritage Spotlight
            </h2>
            <p className="text-xs sm:text-sm text-[#AC9C8D] mt-1">
              Signature Rongon Salwar Kameez, luxury sarees and contemporary ethnic drapes
            </p>
          </div>
          <button
            type="button"
            onClick={handleSpotlightCta}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#72383D] hover:text-[#322D29] transition-colors"
          >
            <span>View All Spotlight</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* MorshedMart Grid: 1 Big Card (left) + 6 Product Cards (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Big Spotlight Visual Card (Col 1 on desktop) - Borderless */}
          <div className="lg:col-span-1 relative rounded-3xl overflow-hidden shadow-md min-h-[360px] lg:min-h-full flex flex-col justify-end p-6 bg-[#322D29] group">
            <img
              src="https://www.lerevecraze.com/wp-content/uploads/2026/08/0935b3ac-d2cb-469b-ad55-5ba018c3a85e.jpg"
              alt="Rongon Festive Spotlight"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#322D29] via-[#322D29]/40 to-transparent" />

            <div className="relative z-10 space-y-2 text-[#EFE9E1]">
              <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase bg-[#72383D] text-[#EFE9E1] rounded-full">
                LIMITED EDITION
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury leading-snug">
                Festive Silk & Viscose Suite
              </h3>
              <p className="text-xs text-[#D1C7BD] line-clamp-3">
                Crafted with rich silk blends, karchupi hand embellishments and regal silhouettes designed for unforgettable celebrations.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSpotlightCta}
                  className="w-full py-2.5 bg-[#EFE9E1] text-[#322D29] text-xs font-bold rounded-xl hover:bg-[#72383D] hover:text-[#EFE9E1] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Explore Salwar Kameez</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* 6 Product Cards Grid (3 cols on md, 2 on sm) */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {spotlightProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CuratedSpotlight;
