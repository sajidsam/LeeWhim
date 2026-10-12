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

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartCount === 0 ? 0 : 70;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const clean = coupon.trim().toUpperCase();
    if (clean === "RONGON" || clean === "EID2026" || clean === "WELCOME10") {
      setDiscountPercent(10);
      showToast("Coupon applied! 10% discount added 🎉", "info");
    } else {
      showToast("Invalid coupon code. Try: RONGON", "info");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
      className="fixed inset-0 z-50 overflow-hidden bg-[#322D29]/75 backdrop-blur-xs animate-fade-in"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right text-[#322D29]">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 flex items-center justify-between bg-[#EFE9E1]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#72383D]" />
              <h2 className="text-base sm:text-lg font-bold text-[#322D29]">
                Your Shopping Bag ({cartCount})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-white text-[#322D29] hover:bg-[#72383D] hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3.5 bg-[#EFE9E1]/60">
            {remainingForFreeShipping > 0 ? (
              <p className="text-xs text-[#322D29] font-medium flex items-center gap-1.5 mb-2">
                <Truck className="w-3.5 h-3.5 text-[#72383D] shrink-0" />
                Add <span className="font-bold text-[#72383D]">৳{remainingForFreeShipping.toLocaleString()}</span> more for <span className="font-bold">FREE Nationwide Delivery!</span>
              </p>
            ) : (
              <p className="text-xs text-[#72383D] font-semibold flex items-center gap-1.5 mb-2">
                <Check className="w-4 h-4 text-[#72383D] shrink-0" />
                You have unlocked FREE Nationwide Delivery!
              </p>
            )}
            <div className="w-full bg-[#D1C7BD] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#72383D] h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-[#EFE9E1]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-20 h-20 rounded-full bg-[#EFE9E1] flex items-center justify-center text-[#72383D] mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-base font-bold text-[#322D29] mb-1">Your bag is empty</h3>
                <p className="text-xs text-[#AC9C8D] max-w-xs mb-6">
                  Explore our exclusive Rongon collection of Salwar Kameez, Sarees, Kameez, and contemporary fusion wear!
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#72383D] text-[#EFE9E1] text-xs font-semibold rounded-xl hover:bg-[#322D29] transition-colors"
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
                    className="w-18 h-22 sm:w-20 sm:h-24 object-cover rounded-xl bg-[#EFE9E1] shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs sm:text-sm font-semibold text-[#322D29] line-clamp-2">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                          className="text-[#AC9C8D] hover:text-[#72383D] transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#AC9C8D] mt-0.5">
                        Shade: <span className="font-medium text-[#322D29]">{item.selectedColor}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls - Borderless */}
                      <div className="flex items-center rounded-lg bg-[#EFE9E1] overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, -1)}
                          className="px-2.5 py-0.5 text-xs text-[#322D29] hover:bg-[#D1C7BD] font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-semibold text-[#322D29] bg-white min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, 1)}
                          className="px-2.5 py-0.5 text-xs text-[#322D29] hover:bg-[#D1C7BD] font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Total for item */}
                      <span className="text-xs sm:text-sm font-bold text-[#72383D]">
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
            <div className="p-4 sm:p-5 bg-[#EFE9E1]/50 space-y-3">
              {/* Promo code form - Borderless */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon (try: RONGON)"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-white rounded-lg focus:outline-none text-[#322D29] placeholder-[#AC9C8D] uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#322D29] hover:bg-[#72383D] text-[#EFE9E1] text-xs font-medium rounded-lg transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs text-[#322D29] pt-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#322D29]">৳{cartSubtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#72383D] font-medium">
                    <span>Coupon Discount (10%)</span>
                    <span>-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Nationwide Delivery</span>
                  <span>{shippingFee === 0 ? <strong className="text-[#72383D] font-semibold">FREE</strong> : `৳${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-[#322D29] pt-2 border-t border-[#D1C7BD]/40">
                  <span>Total Amount</span>
                  <span className="text-[#72383D]">৳{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button - Borderless */}
              <button
                type="button"
                onClick={() => {
                  alert(`Thank you for choosing Rongon! Your demo order of ৳${finalTotal.toLocaleString()} has been received for Cash on Delivery.`);
                  setIsCartOpen(false);
                }}
                className="w-full py-3 bg-[#72383D] hover:bg-[#322D29] text-[#EFE9E1] font-semibold text-xs sm:text-sm rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2 active:scale-98"
              >
                Proceed to Checkout (Cash on Delivery)
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#AC9C8D]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#72383D]" />
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
