import React, { useState } from "react";
import { useShop } from "../../Context/ShopContext";
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, Check } from "lucide-react";

const FREE_SHIPPING_THRESHOLD = 2500;

const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    cartSubtotal,
    removeFromCart,
    updateQuantity,
    showToast,
  } = useShop();

  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartCount === 0 ? 0 : 70;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const clean = coupon.trim().toUpperCase();
    if (clean === "LEESWHIM" || clean === "EID2026" || clean === "WELCOME10") {
      setDiscountPercent(10);
      setCouponApplied(true);
      showToast("Coupon applied! 10% discount added 🎉", "info");
    } else {
      showToast("Invalid coupon code. Try: LEESWHIM", "info");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right border-l border-rose-100">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-rose-50/30">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#be123c]" />
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                Your Shopping Bag ({cartCount})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-amber-50/80 border-b border-amber-100">
            {remainingForFreeShipping > 0 ? (
              <p className="text-xs text-amber-900 font-medium flex items-center gap-1.5 mb-2">
                <Truck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                Add <span className="font-bold text-[#be123c]">৳{remainingForFreeShipping.toLocaleString()}</span> more for <span className="font-bold">FREE Nationwide Delivery!</span>
              </p>
            ) : (
              <p className="text-xs text-emerald-800 font-semibold flex items-center gap-1.5 mb-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                🎉 You have unlocked FREE Nationwide Delivery!
              </p>
            )}
            <div className="w-full bg-amber-200/60 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#be123c] h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center text-[#be123c] mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Your bag is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mb-6">
                  Explore our exclusive collection of Dhakai Jamdanis, Banarasi Silks and royal Kundan jewellery!
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#be123c] text-white text-xs font-semibold rounded-xl hover:bg-[#9f1239] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}`} className="py-3.5 flex gap-3 sm:gap-4">
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-22 sm:w-20 sm:h-24 object-cover rounded-xl bg-gray-50 border border-gray-100 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Shade: <span className="font-medium text-gray-700">{item.selectedColor}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, -1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-200 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-semibold text-gray-900 bg-white min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, 1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-200 font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Total for item */}
                      <span className="text-xs sm:text-sm font-bold text-[#be123c]">
                        ৳{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer (Checkout Form & Totals) */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/60 space-y-3">
              {/* Promo code form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon (try: LEESWHIM)"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#be123c] uppercase"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium rounded-lg transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-200/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">৳{cartSubtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Coupon Discount (10%)</span>
                    <span>-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Nationwide Delivery</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-600 font-semibold">FREE</strong> : `৳${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-[#be123c]">৳{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => {
                  alert(`Thank you for choosing Lee's Whim! Your demo order of ৳${finalTotal.toLocaleString()} has been received for Cash on Delivery.`);
                  setIsCartOpen(false);
                }}
                className="w-full py-3 bg-[#be123c] hover:bg-[#9f1239] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2 active:scale-98"
              >
                Proceed to Checkout (Cash on Delivery)
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Safe & Secure Cash on Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
