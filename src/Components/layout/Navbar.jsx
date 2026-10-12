import React, { useRef, useState, useEffect } from "react";
import { useShop } from "../../Context/ShopContext";
import { fetchProducts } from "../../services/api";
import logo from "@/assets/logo.png";
import {
  Menu,
  Search,
  Heart,
  ShoppingBag,
  User,
  Phone,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  X,
  Star,
  Loader2,
} from "lucide-react";

const SHORT_NAMES = {
  "salwar-kameez": "Salwar Kameez",
  "saree": "Sarees",
  "kameez": "Kameez",
  "tunic": "Tunics",
  "tops": "Tops",
  "shirt": "Shirts",
  "shrug": "Shrugs",
  "bottom-wear": "Bottoms",
  "bags": "Bags",
};

const Navbar = () => {
  const {
    cartCount,
    cartSubtotal,
    wishlistCount,
    setIsCartOpen,
    setIsMobileMenuOpen,
    setActiveCategoryFilter,
    showToast,
    searchQuery,
    setSearchQuery,
    setQuickViewProduct,
    categories = [],
  } = useShop();

  const [navSearchInput, setNavSearchInput] = useState(searchQuery || "");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);

  const navScrollRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Sync nav search input when global searchQuery changes (e.g. cleared in catalog)
  useEffect(() => {
    setNavSearchInput(searchQuery || "");
  }, [searchQuery]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounced live search preview for dropdown
  useEffect(() => {
    if (!navSearchInput || navSearchInput.trim().length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetchProducts({
          search: navSearchInput.trim(),
          limit: 5,
        });
        if (res?.products) {
          setSearchResults(res.products);
        }
      } catch (err) {
        console.error("Live search preview error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [navSearchInput]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const query = navSearchInput.trim();
    setSearchQuery(query);
    setIsDropdownOpen(false);
    setIsMobileSearchExpanded(false);

    const catalog = document.getElementById("catalog-section");
    if (catalog) {
      catalog.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClearSearch = () => {
    setNavSearchInput("");
    setSearchResults([]);
    setIsDropdownOpen(false);
    if (searchQuery) {
      setSearchQuery("");
    }
  };

  const handleSelectDropdownProduct = (product) => {
    setQuickViewProduct(product);
    setIsDropdownOpen(false);
  };

  const scrollNav = (offset) => {
    if (navScrollRef.current) {
      navScrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const handleCategoryClick = (slug) => {
    setActiveCategoryFilter(slug);
    const catalog = document.getElementById("catalog-section");
    if (catalog) {
      catalog.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#EFE9E1]/95 backdrop-blur-md shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#322D29] text-[#EFE9E1] text-[11px] sm:text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#AC9C8D] animate-pulse"></span>
            <p className="font-medium truncate tracking-wide">
              Free Nationwide Delivery in Bangladesh on orders over ৳2,500 | Authentic Rongon Luxury Collection
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[#D1C7BD]">
            <a
              href="tel:+8801970085954"
              className="flex items-center gap-1.5 hover:text-[#EFE9E1] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#AC9C8D]" />
              <span>+880 1970 085 954</span>
            </a>
            <span className="text-[#AC9C8D]">|</span>
            <span className="text-[#D1C7BD] font-medium">Cash on Delivery</span>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-3 sm:gap-6">
          {/* Left: Mobile Menu Trigger (lg:hidden) */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-[#322D29] bg-white/70 hover:bg-[#72383D] hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Logo - Authentic Rongon logo */}
          <div className="flex items-center">
            <a href="/" className="inline-block group py-1">
              <img
                src={logo}
                alt="Rongon Logo"
                className="h-16 sm:h-20 max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>

          {/* Center: Desktop Direct Search Bar with Live Dropdown (hidden on mobile) */}
          <div ref={searchContainerRef} className="hidden lg:flex flex-1 max-w-md mx-4 relative">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={navSearchInput}
                onChange={(e) => {
                  setNavSearchInput(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => {
                  if (navSearchInput.trim().length >= 2) {
                    setIsDropdownOpen(true);
                  }
                }}
                placeholder="Search Salwar Kameez, Sarees, Tunics..."
                className="w-full pl-10 pr-9 py-2.5 text-xs bg-white text-[#322D29] rounded-full border border-transparent focus:border-[#72383D]/40 focus:outline-none focus:ring-2 focus:ring-[#72383D]/10 transition-all shadow-xs placeholder-[#AC9C8D]"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#72383D] hover:scale-110 transition-transform cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
              {navSearchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AC9C8D] hover:text-[#322D29] p-0.5 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Live Autocomplete / Matching Results Dropdown */}
            {isDropdownOpen && navSearchInput.trim().length >= 2 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#EFE9E1] z-50 overflow-hidden">
                {isSearching ? (
                  <div className="py-6 px-4 flex items-center justify-center gap-2 text-xs text-[#AC9C8D]">
                    <Loader2 className="w-4 h-4 animate-spin text-[#72383D]" />
                    <span>Searching boutique collection...</span>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="flex flex-col">
                    <div className="px-4 py-2 bg-[#EFE9E1]/40 border-b border-[#EFE9E1] flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#AC9C8D]">
                        Quick Matches
                      </span>
                      <span className="text-[10px] text-[#72383D] font-medium">
                        {searchResults.length} {searchResults.length === 1 ? "piece" : "pieces"}
                      </span>
                    </div>

                    <div className="max-h-72 overflow-y-auto divide-y divide-[#EFE9E1]/60">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleSelectDropdownProduct(product)}
                          className="p-2.5 flex items-center gap-3 hover:bg-[#EFE9E1]/50 cursor-pointer transition-colors group"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-12 object-cover rounded-lg bg-[#EFE9E1] shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-[#AC9C8D]">
                              {product.subCategory || product.category}
                            </span>
                            <h4 className="text-xs font-semibold text-[#322D29] truncate group-hover:text-[#72383D] transition-colors">
                              {product.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-bold text-[#72383D]">
                                ৳{product.price.toLocaleString()}
                              </span>
                              {product.originalPrice && (
                                <span className="text-[10px] text-[#AC9C8D] line-through">
                                  ৳{product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#AC9C8D] group-hover:text-[#72383D] group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="w-full py-2.5 px-3 bg-[#EFE9E1]/70 hover:bg-[#72383D] hover:text-[#EFE9E1] text-[#322D29] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border-t border-[#EFE9E1] cursor-pointer"
                    >
                      <span>Search all in catalogue for "{navSearchInput}"</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="py-6 px-4 text-center text-xs text-[#AC9C8D]">
                    <p className="font-semibold text-[#322D29] mb-1">
                      No products found for "{navSearchInput}"
                    </p>
                    <p>Press Enter to search catalog or try another keyword</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileSearchExpanded((prev) => !prev)}
              aria-label="Toggle search bar"
              className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                isMobileSearchExpanded
                  ? "bg-[#72383D] text-[#EFE9E1]"
                  : "bg-white/70 text-[#322D29] hover:bg-[#72383D] hover:text-white"
              }`}
            >
              {isMobileSearchExpanded ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("catalog-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
                showToast(`Wishlist contains ${wishlistCount} saved pieces`, "wishlist");
              }}
              aria-label="Wishlist"
              className="hidden sm:flex relative w-10 h-10 rounded-full items-center justify-center text-[#322D29] bg-white hover:bg-[#72383D] hover:text-white transition-colors shadow-2xs group"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#72383D] text-[#EFE9E1] text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="View shopping bag"
              className="relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#72383D] text-[#322D29] hover:text-[#EFE9E1] transition-all duration-300 shadow-2xs group active:scale-95"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#72383D] group-hover:text-[#EFE9E1] group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#72383D] group-hover:bg-[#322D29] text-[#EFE9E1] text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[10px] uppercase font-semibold text-[#AC9C8D] group-hover:text-[#D1C7BD]">
                  Cart
                </span>
                <span className="text-xs font-bold leading-none text-[#322D29] group-hover:text-[#EFE9E1]">
                  ৳{cartSubtotal.toLocaleString()}
                </span>
              </div>
            </button>

            {/* Contact Atelier Button */}
            <a
              href="https://wa.me/+8801970085954"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl bg-[#322D29] hover:bg-[#72383D] text-[#EFE9E1] transition-all duration-200 shadow-xs"
            >
              <User className="w-3.5 h-3.5 text-[#AC9C8D]" />
              <span>Contact Atelier</span>
            </a>
          </div>
        </div>

        {/* Mobile Inline Search Bar (Expanded on mobile, directly in navbar - no modal) */}
        {isMobileSearchExpanded && (
          <div className="lg:hidden pb-3 pt-1 border-t border-[#D1C7BD]/20 animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
              <input
                type="text"
                autoFocus
                value={navSearchInput}
                onChange={(e) => setNavSearchInput(e.target.value)}
                placeholder="Search Salwar Kameez, Sarees, Tunics..."
                className="w-full pl-10 pr-9 py-2.5 text-xs bg-white text-[#322D29] rounded-xl outline-none placeholder-[#AC9C8D] shadow-xs focus:ring-2 focus:ring-[#72383D]/20 transition-all border border-[#EFE9E1]"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="absolute left-3 text-[#72383D]"
              >
                <Search className="w-4 h-4" />
              </button>
              {navSearchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  className="absolute right-3 text-[#AC9C8D] hover:text-[#322D29]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </div>
        )}
      </div>

      {/* Desktop Secondary Category Navigation Bar - Clean, Arrow-Navigated & Reduced Text */}
      <div className="hidden lg:block bg-white/85 border-t border-[#EFE9E1]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-3 py-2">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scrollNav(-180)}
            aria-label="Scroll categories left"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#AC9C8D] hover:text-[#72383D] hover:bg-[#EFE9E1] transition-colors shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Categories Nav Container - Scrollbar Free */}
          <div
            ref={navScrollRef}
            className="flex-1 flex items-center justify-center gap-7 overflow-x-auto scrollbar-hide py-1 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <button
              type="button"
              onClick={() => handleCategoryClick("all")}
              className="flex items-center gap-1 text-xs font-bold text-[#72383D] hover:text-[#322D29] transition-colors py-1 shrink-0 group"
            >
              <span>All</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.slug)}
                className="hover:text-[#72383D] text-xs font-medium text-[#322D29] transition-colors py-1 relative group flex items-center gap-1 shrink-0"
              >
                <span>{SHORT_NAMES[cat.slug] || cat.name}</span>
                <ChevronDown className="w-3 h-3 text-[#AC9C8D] group-hover:text-[#72383D] group-hover:translate-y-0.5 transition-all" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#72383D] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => scrollNav(180)}
            aria-label="Scroll categories right"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#AC9C8D] hover:text-[#72383D] hover:bg-[#EFE9E1] transition-colors shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;