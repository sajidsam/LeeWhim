import React, { useState, useMemo } from "react";
import { useShop } from "../../Context/ShopContext";
import { Search, X, Star, ShoppingBag, ArrowRight } from "lucide-react";

const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct, addToCart, products = [] } = useShop();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        (p.name && p.name.toLowerCase().includes(term)) ||
        (p.category && p.category.toLowerCase().includes(term)) ||
        (p.subCategory && p.subCategory.toLowerCase().includes(term)) ||
        (p.fabric && p.fabric.toLowerCase().includes(term)) ||
        (p.sku && p.sku.toLowerCase().includes(term))
    );
  }, [searchTerm, products]);

  if (!isSearchOpen) return null;

  const popularSearches = ["Salwar Kameez", "Cotton Saree", "Crepe Kameez", "Joom A-line", "Tunics", "Printed Saree"];

  const handleSelectProduct = (product) => {
    setQuickViewProduct(product);
    setIsSearchOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Products"
      className="fixed inset-0 z-50 bg-[#322D29]/75 backdrop-blur-xs animate-fade-in flex flex-col items-center justify-start pt-8 sm:pt-16 px-4"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-[#322D29]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar - Borderless */}
        <div className="p-4 sm:p-6 flex items-center gap-3 bg-[#EFE9E1]">
          <Search className="w-5 h-5 text-[#72383D] shrink-0" />
          <input
            type="text"
            placeholder="Search Salwar Kameez, Cotton Sarees, Kameez, Tunics..."
            value={searchTerm}
            autoFocus
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 text-sm sm:text-base font-medium text-[#322D29] bg-transparent border-none outline-none placeholder-[#AC9C8D]"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="text-xs text-[#AC9C8D] hover:text-[#322D29] px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="w-8 h-8 rounded-full bg-white text-[#322D29] hover:bg-[#72383D] hover:text-white shadow-2xs flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags - Borderless, Scrollbar Free */}
        <div
          className="px-5 py-3 bg-[#EFE9E1]/50 flex items-center gap-2 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <span className="text-[11px] font-semibold text-[#AC9C8D] uppercase tracking-wider shrink-0">
            Popular:
          </span>
          <div className="flex gap-1.5 shrink-0">
            {popularSearches.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchTerm(tag)}
                className="px-3 py-1 text-xs bg-white rounded-full text-[#322D29] hover:bg-[#72383D] hover:text-[#EFE9E1] transition-colors shadow-2xs"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {searchTerm.trim() === "" ? (
            <div className="py-12 text-center text-[#AC9C8D] text-xs sm:text-sm">
              <Search className="w-8 h-8 mx-auto mb-2 text-[#AC9C8D]" />
              <p>Type keywords to discover Jamdani, Katan, and Kundan jewellery</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-[#322D29] text-xs sm:text-sm">
              <p className="font-semibold mb-1">No products found for "{searchTerm}"</p>
              <p className="text-[#AC9C8D]">Try searching for "Jamdani", "Silk", "Choker", or "Jhumka"</p>
            </div>
          ) : (
            <div className="divide-y divide-[#EFE9E1]">
              <p className="text-xs font-semibold text-[#AC9C8D] mb-2 uppercase tracking-wider">
                Matching Products ({filteredProducts.length})
              </p>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="py-3 flex items-center gap-3.5 hover:bg-[#EFE9E1]/50 p-2 rounded-2xl cursor-pointer transition-colors group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-16 object-cover rounded-xl bg-[#EFE9E1] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#AC9C8D]">
                      {product.subCategory}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#322D29] truncate group-hover:text-[#72383D] transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs sm:text-sm font-bold text-[#72383D]">
                        ৳{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[11px] text-[#AC9C8D] line-through">
                          ৳{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <div className="flex items-center text-[10px] text-[#72383D] font-semibold gap-0.5 ml-2">
                        <Star className="w-3 h-3 fill-[#72383D] text-[#72383D]" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                      className="p-2 rounded-xl bg-[#EFE9E1] text-[#322D29] hover:bg-[#72383D] hover:text-[#EFE9E1] transition-colors"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <ArrowRight className="w-4 h-4 text-[#AC9C8D] group-hover:text-[#72383D] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
