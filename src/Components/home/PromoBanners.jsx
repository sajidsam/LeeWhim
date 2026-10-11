import React from "react";
import { PROMO_BANNERS } from "../../data/mockProducts";
import { useShop } from "../../Context/ShopContext";
import { ArrowRight, Sparkles } from "lucide-react";

const PromoBanners = () => {
  const { setActiveCategoryFilter } = useShop();

  const handleBannerClick = (slug) => {
    setActiveCategoryFilter(slug);
    const target = document.getElementById("catalog-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-10 sm:py-14 bg-rose-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {PROMO_BANNERS.map((banner) => (
            <div
              key={banner.id}
              onClick={() => handleBannerClick(banner.categorySlug)}
              className="group relative rounded-3xl overflow-hidden shadow-lg min-h-[260px] sm:min-h-[300px] flex flex-col justify-end p-6 sm:p-8 cursor-pointer bg-black"
            >
              {/* Background Image */}
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Text content */}
              <div className="relative z-10 space-y-2 text-white">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-200">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>{banner.tag}</span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif-luxury leading-tight text-white">
                  {banner.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-200 line-clamp-2">
                  {banner.subtitle} — {banner.description}
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-300 group-hover:text-white transition-colors">
                    <span>{banner.buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
