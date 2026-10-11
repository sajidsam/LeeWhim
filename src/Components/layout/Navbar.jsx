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
  ChevronDown,
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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#1e111d] text-rose-100 text-[11px] sm:text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
            <p className="font-medium truncate">
              ✨ Free Delivery in Bangladesh on orders over ৳2,500 | 100% Authentic Handloom ✨
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-rose-200">
            <a
              href="tel:+8801970085954"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-rose-400" />
              <span>+880 1970 085 954</span>
            </a>
            <span className="text-rose-700">|</span>
            <span className="text-amber-300 font-medium">Cash on Delivery</span>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-2 sm:gap-4">
          {/* Left: Mobile Menu Trigger (lg:hidden) */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-800 hover:bg-rose-50 hover:text-[#be123c] transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2.5 group">
              <img
                src={logo}
                alt="Lee's Whim Logo"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-brand text-lg sm:text-2xl font-bold tracking-wider text-rose-950 group-hover:text-[#be123c] transition-colors">
                  LEE'S WHIM
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-widest text-[#be123c] font-semibold uppercase -mt-1 hidden sm:block">
                  Atelier & Luxury Jewellery
                </span>
              </div>
            </a>
          </div>

          {/* Center: Desktop Search Bar (hidden on mobile) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-xs bg-rose-50/40 hover:bg-rose-50/80 border border-rose-200/70 rounded-full text-gray-400 hover:text-gray-600 transition-all duration-200 shadow-inner group"
            >
              <span className="flex items-center gap-2.5 text-gray-500 font-medium">
                <Search className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
                Search Jamdani, Banarasi, Kundan chokers...
              </span>
              <kbd className="px-2 py-0.5 text-[10px] bg-white border border-rose-200 rounded-md text-gray-400 shadow-xs font-mono">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2.5">
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-rose-50 hover:text-[#be123c] transition-colors"
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
              className="hidden sm:flex relative w-10 h-10 rounded-full items-center justify-center text-gray-700 hover:bg-rose-50 hover:text-[#be123c] transition-colors group"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {wishlistCount > 0 && (
                <span className="absolute 1 top-1 -right-0.5 w-4 h-4 rounded-full bg-[#be123c] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="View shopping bag"
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-50/80 hover:bg-[#be123c] text-rose-950 hover:text-white transition-all duration-300 border border-rose-200/80 group active:scale-95 shadow-xs"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#be123c] group-hover:bg-white text-white group-hover:text-[#be123c] text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[10px] uppercase font-semibold text-rose-700 group-hover:text-rose-100">
                  Cart
                </span>
                <span className="text-xs font-bold leading-none">
                  ৳{cartSubtotal.toLocaleString()}
                </span>
              </div>
            </button>

            {/* Login / WhatsApp Button */}
            <a
              href="https://wa.me/+8801970085954"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#1e111d] hover:bg-[#2e182c] text-rose-100 hover:text-white transition-all duration-200 shadow-sm"
            >
              <User className="w-3.5 h-3.5 text-rose-400" />
              <span>Contact Atelier</span>
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Secondary Category Navigation Bar */}
      <div className="hidden lg:block border-t border-rose-100/70 bg-rose-50/30">
        <div className="max-w-7xl mx-auto px-8">
          <ul className="flex items-center justify-between text-xs font-medium text-gray-700 py-2.5">
            <li>
              <button
                type="button"
                onClick={() => handleCategoryClick("all")}
                className="flex items-center gap-1.5 text-[#be123c] font-bold hover:text-[#9f1239] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                All Collections
              </button>
            </li>
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(cat.slug)}
                  className="hover:text-[#be123c] transition-colors py-1 relative group flex items-center gap-1"
                >
                  <span>{cat.name}</span>
                  {cat.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 bg-rose-100 text-[#be123c] rounded-full font-semibold">
                      {cat.badge}
                    </span>
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#be123c] transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
            <li>
              <a
                href="#reviews-section"
                className="text-gray-500 hover:text-[#be123c] transition-colors"
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