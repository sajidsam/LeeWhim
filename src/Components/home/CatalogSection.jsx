import React, { useState, useMemo } from "react";
import ProductCard from "../common/ProductCard";
import { PRODUCTS, CATEGORIES } from "../../data/mockProducts";
import { useShop } from "../../Context/ShopContext";
import { Sparkles, SlidersHorizontal, ArrowUpDown } from "lucide-react";

const CatalogSection = () => {
  const { activeCategoryFilter, setActiveCategoryFilter } = useShop();
  const [sortBy, setSortBy] = useState("featured");

  // Filtering products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeCategoryFilter !== "all") {
      result = result.filter(
        (p) =>
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
    <section id="catalog-section" className="py-12 sm:py-16 bg-[#faf7f7] border-b border-rose-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#be123c]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Full Boutique Catalogue</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-luxury text-gray-900 mt-1">
              Curated Sarees & Royal Jewellery
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
              Showing authentic Dhakai Jamdanis, Katan silk and 22K gold-plated Kundan jewellery.
              <span className="block text-[11px] text-rose-800 font-medium mt-0.5">
                (Temporary preview data — seamlessly syncs with your database later)
              </span>
            </p>
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-gray-200 text-xs text-gray-700 shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#be123c]" />
              <label htmlFor="sort-select" className="font-medium text-gray-500">Sort:</label>
              <select
                id="sort-select"
                aria-label="Sort products"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-semibold text-gray-900 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills (Responsive scroll on sm, flex on lg) */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-3 mb-8">
          <button
            type="button"
            onClick={() => setActiveCategoryFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
              activeCategoryFilter === "all"
                ? "bg-[#be123c] text-white shadow-md shadow-rose-900/20"
                : "bg-white text-gray-700 border border-gray-200 hover:border-rose-300"
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
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isSelected
                    ? "bg-[#be123c] text-white shadow-md shadow-rose-900/20"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-rose-300"
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
          <div className="bg-white rounded-3xl p-12 text-center border border-rose-100 shadow-sm max-w-md mx-auto my-8">
            <h3 className="text-base font-bold text-gray-900 mb-2">No matching products found</h3>
            <p className="text-xs text-gray-500 mb-6">
              Try switching your filter or select "All Collections" to see all available sarees and jewellery.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategoryFilter("all")}
              className="px-6 py-2.5 bg-[#be123c] text-white text-xs font-bold rounded-xl hover:bg-[#9f1239] transition-colors"
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
