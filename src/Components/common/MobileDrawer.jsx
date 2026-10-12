import React from "react";
import { useShop } from "../../Context/ShopContext";
import { CATEGORIES } from "../../data/mockProducts";
import { X, Search, Phone, Sparkles, MessageCircle, ChevronRight, MapPin } from "lucide-react";
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
      className="fixed inset-0 z-50 bg-[#322D29]/75 backdrop-blur-xs lg:hidden animate-fade-in"
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <div
        className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white shadow-2xl flex flex-col text-[#322D29]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 flex items-center justify-between bg-[#EFE9E1]">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Rongon" className="h-12 w-auto object-contain" />
          </div>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-8 h-8 rounded-full text-[#322D29] hover:bg-[#72383D] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Bar - Borderless */}
        <div className="p-3 bg-[#EFE9E1]/40">
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsSearchOpen(true);
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs bg-white rounded-xl text-[#AC9C8D] hover:text-[#322D29] shadow-2xs transition-colors"
          >
            <Search className="w-4 h-4 text-[#72383D]" />
            <span>Search Women's Collection...</span>
          </button>
        </div>

        {/* Categories List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#AC9C8D] mb-2 px-1">
              Shop by Category
            </h3>
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => handleSelectCategory("all")}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#322D29] hover:bg-[#EFE9E1] hover:text-[#72383D] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#AC9C8D]" />
                    All Collections
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#AC9C8D]" />
                </button>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectCategory(cat.slug)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#322D29] hover:bg-[#EFE9E1] hover:text-[#72383D] transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <img src={cat.image} alt={cat.name} className="w-6 h-6 rounded-md object-cover bg-[#EFE9E1]" />
                      {cat.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EFE9E1] text-[#322D29] font-medium">
                      {cat.itemCount}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="pt-2 border-t border-[#D1C7BD]/30">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#AC9C8D] mb-2 px-1">
              Customer Support
            </h3>
            <div className="space-y-1 text-xs">
              <a
                href="#order-tracking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-[#322D29] hover:text-[#72383D] rounded-xl hover:bg-[#EFE9E1]"
              >
                <span>📦 Track Your Order</span>
              </a>
              <a
                href="https://wa.me/+8801970085954"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 text-[#322D29] hover:text-[#72383D] rounded-xl hover:bg-[#EFE9E1]"
              >
                <MessageCircle className="w-4 h-4 text-[#72383D]" />
                <span>WhatsApp Live Chat</span>
              </a>
              <a
                href="tel:+8801970085954"
                className="flex items-center gap-2.5 px-3 py-2 text-[#322D29] hover:bg-[#EFE9E1] rounded-xl"
              >
                <Phone className="w-4 h-4 text-[#72383D]" />
                <span>Call: +880 1970 085 954</span>
              </a>
              <div className="flex items-center gap-2.5 px-3 py-2 text-[#AC9C8D]">
                <MapPin className="w-4 h-4 text-[#AC9C8D]" />
                <span>Dhanmondi / Gulshan, Dhaka</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#EFE9E1] text-[11px] text-[#322D29] text-center">
          <p className="font-semibold">© 2026 Rongon Luxury Atelier</p>
          <p className="text-[#72383D] font-medium mt-0.5">Cash on Delivery Across Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
