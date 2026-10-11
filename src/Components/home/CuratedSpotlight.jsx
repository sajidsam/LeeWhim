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
    setActiveCategoryFilter("jamdani");
    const target = document.getElementById("catalog-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-rose-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#be123c]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Artisan Showcase</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold font-serif-luxury text-gray-900 mt-1">
              Festive Heritage Spotlight
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Pure handwoven masterpieces and royal polki jewellery crafted for celebration
            </p>
          </div>
          <button
            type="button"
            onClick={handleSpotlightCta}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#be123c] hover:text-[#9f1239] transition-colors"
          >
            <span>View All Spotlight</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* MorshedMart Grid: 1 Big Card (left) + 6 Product Cards (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Big Spotlight Visual Card (Col 1 on desktop) */}
          <div className="lg:col-span-1 relative rounded-3xl overflow-hidden shadow-lg min-h-[360px] lg:min-h-full flex flex-col justify-end p-6 bg-rose-950 group">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85"
              alt="Artisan Saree Spotlight"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10 space-y-2 text-white">
              <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase bg-[#be123c] text-white rounded-full">
                LIMITED EDITION
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury leading-snug">
                The Royal Jamdani Heirloom
              </h3>
              <p className="text-xs text-rose-100 line-clamp-3">
                Woven over 90 days with 100-count fine muslin cotton and pure gilded zari. A true family treasure.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSpotlightCta}
                  className="w-full py-2.5 bg-white text-rose-950 text-xs font-bold rounded-xl hover:bg-rose-100 transition-colors flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Explore Jamdani</span>
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
