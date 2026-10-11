import React from "react";
import { useShop } from "../../Context/ShopContext";
import { CheckCircle2, Heart, ShoppingBag, Info } from "lucide-react";

const Toast = () => {
  const { toast } = useShop();

  if (!toast.visible) return null;

  return (
    <aside
      aria-label="Notification"
      className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-[100] animate-fade-in flex items-center gap-3 px-4 py-3 bg-[#1e111d] text-white rounded-2xl shadow-2xl border border-rose-900/40 backdrop-blur-md max-w-sm"
    >
      <div className="w-8 h-8 rounded-full bg-rose-600/20 text-rose-400 flex items-center justify-center shrink-0">
        {toast.type === "cart" && <ShoppingBag className="w-4 h-4 text-rose-400" />}
        {toast.type === "wishlist" && <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />}
        {toast.type === "info" && <Info className="w-4 h-4 text-amber-400" />}
      </div>
      <p className="text-sm font-medium text-gray-100 flex-1">{toast.message}</p>
    </aside>
  );
};

export default Toast;
