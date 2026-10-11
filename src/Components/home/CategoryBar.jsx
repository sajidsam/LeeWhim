import React from "react";
import { CATEGORIES } from "../../data/mockProducts";
import { useShop } from "../../Context/ShopContext";

const CategoryBar = () => {
  const { activeCategoryFilter, setActiveCategoryFilter } = useShop();

  const handleSelect = (slug) => {
    setActiveCategoryFilter(slug);
    const target = document.getElementById("catalog-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white border-b border-rose-100/80 py-6 sm:py-8 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subtitle */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-brand tracking-wider text-gray-900">
              EXPLORE CURATIONS
            </h2>
            <p className="text-xs text-gray-500">
              Hand-picked heritage weaves and royal jewellery collections
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleSelect("all")}
            className="text-xs font-semibold text-[#be123c] hover:underline"
          >
            View All ({CATEGORIES.reduce((acc, c) => acc + c.itemCount, 0)}+ items)
          </button>
        </div>

        {/* Categories Horizontal Carousel */}
        <div className="flex items-center gap-3 sm:gap-5 overflow-x-auto scrollbar-hide pb-2 pt-1">
          {/* "All" button */}
          <button
            type="button"
            onClick={() => handleSelect("all")}
            className={`group flex flex-col items-center shrink-0 p-2 rounded-2xl transition-all duration-200 ${
              activeCategoryFilter === "all"
                ? "bg-rose-50 border-2 border-[#be123c] scale-105"
                : "hover:bg-rose-50/50"
            }`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#9f1239] to-[#f43f5e] flex items-center justify-center text-white font-bold text-xs shadow-md group-hover:scale-105 transition-transform">
              <span>ALL</span>
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-gray-900 mt-2">
              All Styles
            </span>
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = activeCategoryFilter === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelect(cat.slug)}
                className={`group flex flex-col items-center shrink-0 p-2 rounded-2xl transition-all duration-200 ${
                  isSelected
                    ? "bg-rose-50 border-2 border-[#be123c] scale-105"
                    : "hover:bg-rose-50/50"
                }`}
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-sm border border-rose-100 group-hover:scale-105 transition-transform">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center"
                  />
                  {cat.badge && (
                    <span className="absolute top-1 right-1 text-[8px] font-bold px-1.5 py-0.2 bg-[#be123c] text-white rounded-full">
                      {cat.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-gray-800 mt-2 text-center max-w-[80px] sm:max-w-[90px] truncate group-hover:text-[#be123c] transition-colors">
                  {cat.name}
                </span>
                <span className="text-[10px] text-gray-400">
                  {cat.itemCount} Items
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryBar;
