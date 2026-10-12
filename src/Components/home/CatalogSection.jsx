import React, { useState, useMemo } from "react";
import ProductCard from "../common/ProductCard";
import { PRODUCTS, CATEGORIES } from "../../data/mockProducts";
import { useShop } from "../../Context/ShopContext";
import { Sparkles, ArrowUpDown } from "lucide-react";

const CatalogSection = () => {
  const { activeCategoryFilter, setActiveCategoryFilter } = useShop();
  const [sortBy, setSortBy] = useState("featured");

  // Filtering products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeCategoryFilter !== "all") {
      result = result.filter(
        (p) =>
          (p.categorySlug && p.categorySlug.toLowerCase() === activeCategoryFilter.toLowerCase()) ||
          p.subCategory.toLowerCase().replace(/[\s&]+/g, '-').includes(activeCategoryFilter.toLowerCase()) ||
          p.subCategory.toLowerCase().includes(activeCategoryFilter.toLowerCase()) ||
          p.category.toLowerCase().includes(activeCategoryFilter.toLowerCase())
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategoryFilter, sortBy]);

  return (
    <section id="catalog-section" className="py-12 sm:py-16 bg-[#EFE9E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#72383D]">
              <Sparkles className="w-3.5 h-3.5 text-[#AC9C8D]" />
              <span>Full Boutique Catalogue</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif-luxury text-[#322D29] mt-1">
              Rongon Women Collection
            </h2>
            <p className="text-xs sm:text-sm text-[#AC9C8D] mt-1 max-w-xl">
              Showing exclusive Salwar Kameez, designer cotton sarees, single kameez, and contemporary fusion wear.
            </p>
          </div>

          {/* Sort & Filter Controls - Borderless */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-xl text-xs text-[#322D29] shadow-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#72383D]" />
              <label htmlFor="sort-select" className="font-medium text-[#AC9C8D]">Sort:</label>
              <select
                id="sort-select"
                aria-label="Sort products"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-semibold text-[#322D29] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills - Borderless, Scrollbar Free */}
        <div
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-3 mb-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <button
            type="button"
            onClick={() => setActiveCategoryFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${activeCategoryFilter === "all"
                ? "bg-[#72383D] text-[#EFE9E1] shadow-xs"
                : "bg-white text-[#322D29] hover:bg-white/80"
              }`}
          >
            All Collections ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategoryFilter === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryFilter(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${isSelected
                    ? "bg-[#72383D] text-[#EFE9E1] shadow-xs"
                    : "bg-white text-[#322D29] hover:bg-white/80"
                  }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* 3-Size Responsive Grid:
            sm: 2 columns (grid-cols-2)
            md: 3 columns (md:grid-cols-3)
            lg: 4 to 5 columns (lg:grid-cols-4 xl:grid-cols-5)
        */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-xs max-w-md mx-auto my-8">
            <h3 className="text-base font-bold text-[#322D29] mb-2">No matching products found</h3>
            <p className="text-xs text-[#AC9C8D] mb-6">
              Try switching your filter or select "All Collections" to see all available sarees and jewellery.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategoryFilter("all")}
              className="px-6 py-2.5 bg-[#72383D] text-[#EFE9E1] text-xs font-bold rounded-xl hover:bg-[#322D29] transition-colors"
            >
              Reset Category Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CatalogSection;
