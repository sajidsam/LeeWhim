import React, { useState, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import { useShop } from "../../Context/ShopContext";
import { fetchProducts } from "../../services/api";
import { Sparkles, ArrowUpDown, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";

const PRODUCTS_PER_PAGE = 15;

const CatalogSection = () => {
  const {
    activeCategoryFilter,
    setActiveCategoryFilter,
    categories = [],
    searchQuery,
    setSearchQuery,
  } = useShop();
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [catalogData, setCatalogData] = useState({
    products: [],
    total: 0,
    totalPages: 1,
  });
  const [isFetching, setIsFetching] = useState(false);

  // Reset to page 1 whenever filter, sort, or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategoryFilter, sortBy, searchQuery]);

  // Fetch paginated products on page/filter/sort/search change
  useEffect(() => {
    let isMounted = true;
    const loadCatalogPage = async () => {
      setIsFetching(true);
      try {
        const res = await fetchProducts({
          page: currentPage,
          limit: PRODUCTS_PER_PAGE,
          categorySlug: activeCategoryFilter,
          sort: sortBy,
          search: searchQuery,
        });

        if (isMounted && res) {
          setCatalogData({
            products: res.products || [],
            total: res.total || 0,
            totalPages: res.totalPages || 1,
          });
        }
      } catch (err) {
        console.error("Failed to load catalog page:", err);
      } finally {
        if (isMounted) setIsFetching(false);
      }
    };

    loadCatalogPage();
    return () => {
      isMounted = false;
    };
  }, [activeCategoryFilter, sortBy, currentPage, searchQuery]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > catalogData.totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    const target = document.getElementById("catalog-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Generate visible page numbers with ellipsis window
  const getPageNumbers = () => {
    const total = catalogData.totalPages;
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", total];
    }
    if (currentPage >= total - 2) {
      return [1, "...", total - 3, total - 2, total - 1, total];
    }
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", total];
  };

  const startIdx = catalogData.total === 0 ? 0 : (currentPage - 1) * PRODUCTS_PER_PAGE + 1;
  const endIdx = Math.min(currentPage * PRODUCTS_PER_PAGE, catalogData.total);

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

          {/* Sort Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-xl text-xs text-[#322D29] shadow-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#72383D]" />
              <label htmlFor="sort-select" className="font-medium text-[#AC9C8D]">
                Sort:
              </label>
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
                <option value="newest">Newest Arrival</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-3 mb-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <button
            type="button"
            onClick={() => setActiveCategoryFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
              activeCategoryFilter === "all"
                ? "bg-[#72383D] text-[#EFE9E1] shadow-xs"
                : "bg-white text-[#322D29] hover:bg-white/80"
            }`}
          >
            All Collections
          </button>
          {categories.map((cat) => {
            const isSelected = activeCategoryFilter === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryFilter(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isSelected
                    ? "bg-[#72383D] text-[#EFE9E1] shadow-xs"
                    : "bg-white text-[#322D29] hover:bg-white/80"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Active Search Filter Chip Banner */}
        {searchQuery && (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 sm:px-5 rounded-2xl mb-8 shadow-xs border border-[#EFE9E1]">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#AC9C8D]">Search results for:</span>
              <span className="text-xs font-bold text-[#72383D] bg-[#EFE9E1] px-2.5 py-1 rounded-lg">
                "{searchQuery}"
              </span>
              <span className="text-xs text-[#322D29] font-medium ml-1">
                ({catalogData.total} {catalogData.total === 1 ? "piece" : "pieces"} found)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="flex items-center gap-1.5 text-xs text-[#72383D] hover:text-[#322D29] font-semibold bg-[#EFE9E1]/70 hover:bg-[#EFE9E1] px-3 py-1.5 rounded-xl transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear search</span>
            </button>
          </div>
        )}

        {/* Product Grid / Loading / Empty States */}
        {isFetching ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-[#72383D]">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs font-semibold text-[#7D7063]">Loading boutique products...</span>
          </div>
        ) : catalogData.products.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-12 text-center shadow-xs max-w-md mx-auto my-8 border border-[#EFE9E1]">
            <h3 className="text-base font-bold text-[#322D29] mb-2">
              {searchQuery ? `No products found for "${searchQuery}"` : "No matching products found"}
            </h3>
            <p className="text-xs text-[#AC9C8D] mb-6">
              {searchQuery
                ? "Try checking your keywords or reset your search to explore the entire Rongon catalog."
                : "Try switching your category filter or select 'All Collections' to explore all available items."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="px-5 py-2.5 bg-[#72383D] text-[#EFE9E1] text-xs font-bold rounded-xl hover:bg-[#322D29] transition-colors"
                >
                  Clear Search
                </button>
              )}
              {activeCategoryFilter !== "all" && (
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter("all")}
                  className="px-5 py-2.5 bg-[#EFE9E1] text-[#322D29] text-xs font-bold rounded-xl hover:bg-[#72383D] hover:text-white transition-colors"
                >
                  Reset Category Filter
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
              {catalogData.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            {catalogData.totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#D1C7BD]/50">
                <span className="text-xs text-[#7D7063] font-medium order-2 sm:order-1">
                  Showing <strong className="text-[#322D29]">{startIdx}</strong>–
                  <strong className="text-[#322D29]">{endIdx}</strong> of{" "}
                  <strong className="text-[#322D29]">{catalogData.total}</strong> products
                </span>

                <div className="flex items-center gap-1.5 order-1 sm:order-2">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl bg-white text-[#322D29] hover:bg-[#72383D] hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#322D29] transition-colors shadow-2xs"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {getPageNumbers().map((pageNum, idx) =>
                    pageNum === "..." ? (
                      <span key={`dots-${idx}`} className="px-2 text-xs text-[#AC9C8D]">
                        ...
                      </span>
                    ) : (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                          currentPage === pageNum
                            ? "bg-[#72383D] text-white scale-105"
                            : "bg-white text-[#322D29] hover:bg-[#EFE9E1]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === catalogData.totalPages}
                    className="p-2 rounded-xl bg-white text-[#322D29] hover:bg-[#72383D] hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#322D29] transition-colors shadow-2xs"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CatalogSection;
