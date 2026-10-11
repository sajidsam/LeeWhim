import React from "react";
import { useShop } from "../../Context/ShopContext";
import { Heart, ShoppingBag, Info } from "lucide-react";

const Toast = () => {
  const { toast } = useShop();

  if (!toast.visible) return null;

  return (
    <aside
      aria-label="Notification"
      className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-[100] animate-fade-in flex items-center gap-3 px-4 py-3 bg-[#322D29] text-[#EFE9E1] rounded-2xl shadow-2xl max-w-sm"
    >
      <div className="w-8 h-8 rounded-full bg-[#72383D] text-[#EFE9E1] flex items-center justify-center shrink-0">
        {toast.type === "cart" && <ShoppingBag className="w-4 h-4 text-[#EFE9E1]" />}
        {toast.type === "wishlist" && <Heart className="w-4 h-4 fill-[#EFE9E1] text-[#EFE9E1]" />}
        {toast.type === "info" && <Info className="w-4 h-4 text-[#D1C7BD]" />}
      </div>
      <p className="text-sm font-medium text-[#EFE9E1] flex-1">{toast.message}</p>
    </aside>
  );
};

export default Toast;
