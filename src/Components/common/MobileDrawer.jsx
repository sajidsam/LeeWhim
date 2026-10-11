import React from "react";
import { useShop } from "../../Context/ShopContext";
import { CATEGORIES } from "../../data/mockProducts";
import { X, Search, Phone, Heart, Sparkles, MessageCircle, ChevronRight, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const MobileDrawer = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setIsSearchOpen,
    setActiveCategoryFilter,
  } = useShop();

  if (!isMobileMenuOpen) return null;

  const handleSelectCategory = (slug) => {
    setActiveCategoryFilter(slug);
    setIsMobileMenuOpen(false);
    const target = document.getElementById("catalog-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in"
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <div
        className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white shadow-2xl flex flex-col animate-slide-in-right duration-300"
        style={{ animationDirection: "normal" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-rose-50/40">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Lee's Whim" className="h-10 w-auto object-contain" />
            <span className="font-brand font-bold text-sm tracking-wider text-rose-950">
              LEE'S WHIM
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-8 h-8 rounded-full text-gray-500 hover:text-red-500 hover:bg-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Bar */}
        <div className="p-3 border-b border-gray-100">
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsSearchOpen(true);
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-500 hover:bg-rose-50/40 transition-colors"
          >
            <Search className="w-4 h-4 text-rose-600" />
            <span>Search Sarees & Jewellery...</span>
          </button>
        </div>

        {/* Categories List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 px-1">
              Shop by Category
            </h3>
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => handleSelectCategory("all")}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-gray-800 hover:bg-rose-50 hover:text-[#be123c] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    All Collections
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectCategory(cat.slug)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-rose-50 hover:text-[#be123c] transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <img src={cat.image} alt={cat.name} className="w-6 h-6 rounded-md object-cover" />
                      {cat.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
                      {cat.itemCount}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="pt-2 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 px-1">
              Customer Support
            </h3>
            <div className="space-y-1 text-xs">
              <a
                href="#order-tracking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-gray-700 hover:text-[#be123c] rounded-xl hover:bg-rose-50"
              >
                <span>📦 Track Your Order</span>
              </a>
              <a
                href="https://wa.me/+8801970085954"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 text-emerald-700 font-medium hover:bg-emerald-50 rounded-xl"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Live Chat</span>
              </a>
              <a
                href="tel:+8801970085954"
                className="flex items-center gap-2.5 px-3 py-2 text-gray-700 hover:bg-rose-50 rounded-xl"
              >
                <Phone className="w-4 h-4 text-rose-600" />
                <span>Call: +880 1970 085 954</span>
              </a>
              <div className="flex items-center gap-2.5 px-3 py-2 text-gray-500">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>Dhanmondi / Gulshan, Dhaka</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/80 text-[11px] text-gray-500 text-center">
          <p>© 2026 Lee's Whim Luxury Atelier</p>
          <p className="text-[#be123c] font-medium mt-0.5">Cash on Delivery Across Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
