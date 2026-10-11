import React from "react";
import { useShop } from "../../Context/ShopContext";
import { Home, Heart, ShoppingBag, User } from "lucide-react";

const MobileBottomNav = () => {
  const { cartCount, wishlistCount, setIsCartOpen, showToast } = useShop();

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWishlistClick = () => {
    const el = document.getElementById("catalog-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      showToast(`You have ${wishlistCount} items saved in Wishlist ❤️`, "wishlist");
    }
  };

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md z-40 lg:hidden shadow-[0_-4px_20px_rgba(50,45,41,0.08)]"
    >
      <div className="flex justify-around items-center py-2 px-3 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]">
        {/* Home */}
        <button
          type="button"
          onClick={handleHomeClick}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 text-[#72383D]"
        >
          <div className="p-1 rounded-full bg-[#EFE9E1]">
            <Home className="w-5 h-5 text-[#72383D]" />
          </div>
          <span className="text-[10px] font-bold">Home</span>
        </button>

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 text-[#322D29] hover:text-[#72383D] relative active:scale-95"
        >
          <div className="relative p-1">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#72383D] text-[#EFE9E1] text-[9px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Wishlist</span>
        </button>

        {/* Cart */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 text-[#322D29] hover:text-[#72383D] relative active:scale-95"
        >
          <div className="relative p-1">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#72383D] text-[#EFE9E1] text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Cart</span>
        </button>

        {/* Account / Support */}
        <a
          href="https://wa.me/+8801970085954"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 text-[#322D29] hover:text-[#72383D] active:scale-95"
        >
          <div className="p-1">
            <User className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium">Account</span>
        </a>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
