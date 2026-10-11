import React from "react";
import { useShop } from "../../Context/ShopContext";
import { CATEGORIES } from "../../data/mockProducts";
import logo from "@/assets/logo.png";
import {
  Menu,
  Search,
  Heart,
  ShoppingBag,
  User,
  Phone,
  Sparkles,
} from "lucide-react";

const Navbar = () => {
  const {
    cartCount,
    cartSubtotal,
    wishlistCount,
    setIsCartOpen,
    setIsMobileMenuOpen,
    setIsSearchOpen,
    setActiveCategoryFilter,
    showToast,
  } = useShop();

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
              Free Nationwide Delivery in Bangladesh on orders over ৳2,500 | 100% Authentic Handloom
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

          {/* Logo - User's authentic Lee's Whim logo */}
          <div className="flex items-center">
            <a href="/" className="inline-block group py-1">
              <img
                src={logo}
                alt="Lee's Whim Logo"
                className="h-16 sm:h-20 max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>

          {/* Center: Desktop Search Bar (hidden on mobile) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-5 py-2.5 text-xs bg-white text-[#322D29] rounded-full hover:bg-white/80 transition-all duration-200 shadow-xs group"
            >
              <span className="flex items-center gap-2.5 text-[#AC9C8D] font-medium">
                <Search className="w-4 h-4 text-[#72383D]" />
                Search Jamdani, Banarasi, Kundan chokers...
              </span>
              <kbd className="px-2 py-0.5 text-[10px] bg-[#EFE9E1] rounded-md text-[#322D29] font-mono">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#322D29] bg-white/70 hover:bg-[#72383D] hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
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
      </div>

      {/* Desktop Secondary Category Navigation Bar */}
      <div className="hidden lg:block bg-white/70">
        <div className="max-w-7xl mx-auto px-8">
          <ul className="flex items-center justify-between text-xs font-medium text-[#322D29] py-2.5">
            <li>
              <button
                type="button"
                onClick={() => handleCategoryClick("all")}
                className="flex items-center gap-1.5 text-[#72383D] font-bold hover:text-[#322D29] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#AC9C8D]" />
                All Collections
              </button>
            </li>
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(cat.slug)}
                  className="hover:text-[#72383D] transition-colors py-1 relative group flex items-center gap-1"
                >
                  <span>{cat.name}</span>
                  {cat.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 bg-[#EFE9E1] text-[#72383D] rounded-full font-semibold">
                      {cat.badge}
                    </span>
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#72383D] transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
            <li>
              <a
                href="#reviews-section"
                className="text-[#AC9C8D] hover:text-[#72383D] transition-colors"
              >
                Client Reviews
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;