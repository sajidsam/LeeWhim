import React from "react";
import { useShop } from "../../Context/ShopContext";

const CategoryBar = () => {
  const { activeCategoryFilter, setActiveCategoryFilter, categories = [] } = useShop();

  const handleSelect = (slug) => {
    setActiveCategoryFilter(slug);
    const target = document.getElementById("catalog-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-6 sm:py-8 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subtitle */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-brand tracking-wider text-[#322D29]">
              EXPLORE CURATIONS
            </h2>
            <p className="text-xs text-[#AC9C8D]">
              Hand-picked Rongon women categories and signature styles
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleSelect("all")}
            className="text-xs font-semibold text-[#72383D] hover:underline"
          >
            View All ({categories.reduce((acc, c) => acc + (c.itemCount || 0), 0)}+ items)
          </button>
        </div>

        {/* Categories Horizontal Carousel */}
        <div
          className="flex items-center gap-3 sm:gap-5 overflow-x-auto scrollbar-hide pb-2 pt-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* "All" button - Borderless */}
          <button
            type="button"
            onClick={() => handleSelect("all")}
            className={`group flex flex-col items-center shrink-0 p-2 rounded-2xl transition-all duration-200 ${activeCategoryFilter === "all"
                ? "bg-[#EFE9E1] scale-105"
                : "hover:bg-[#EFE9E1]/60"
              }`}
          >
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform ${activeCategoryFilter === "all" ? "bg-[#72383D] text-[#EFE9E1]" : "bg-[#322D29] text-[#EFE9E1]"
              }`}>
              <span>ALL</span>
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-[#322D29] mt-2">
              All Styles
            </span>
          </button>

          {categories.map((cat) => {
            const isSelected = activeCategoryFilter === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelect(cat.slug)}
                className={`group flex flex-col items-center shrink-0 p-2 rounded-2xl transition-all duration-200 ${isSelected
                    ? "bg-[#EFE9E1] scale-105"
                    : "hover:bg-[#EFE9E1]/60"
                  }`}
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-xs group-hover:scale-105 transition-transform bg-[#EFE9E1]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center"
                  />
                  {cat.badge && (
                    <span className="absolute top-1 right-1 text-[8px] font-bold px-1.5 py-0.2 bg-[#72383D] text-[#EFE9E1] rounded-full">
                      {cat.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-[#322D29] mt-2 text-center max-w-[80px] sm:max-w-[90px] truncate group-hover:text-[#72383D] transition-colors">
                  {cat.name}
                </span>
                <span className="text-[10px] text-[#AC9C8D]">
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
