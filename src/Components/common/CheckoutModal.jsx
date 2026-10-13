import React, { useState } from "react";
import { useShop } from "../../Context/ShopContext";
import {
  initiateSSLCommerzPayment,
  createOrder,
} from "../../services/api";
import {
  X,
  ShieldCheck,
  Lock,
  CreditCard,
  Truck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { BkashIcon, NagadIcon, VisaIcon, MastercardIcon } from "./PayWithBadges";

const FREE_SHIPPING_THRESHOLD = 2500;

const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    clearCart,
    setActiveOrderConfirmation,
    showToast,
  } = useShop();

  const [deliveryZone, setDeliveryZone] = useState("inside"); // inside | outside
  const [paymentMethod, setPaymentMethod] = useState("SSLCommerz"); // SSLCommerz | COD
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Dhaka",
    postalCode: "1207",
    notes: "",
  });

  if (!isCheckoutOpen) return null;

  // Delivery fee calculation
  const rawDeliveryFee = deliveryZone === "inside" ? 70 : 130;
  const isFreeDelivery = cartSubtotal >= FREE_SHIPPING_THRESHOLD;
  const deliveryFee = isFreeDelivery ? 0 : rawDeliveryFee;
  const finalTotal = cartSubtotal + deliveryFee;

  const handleInputChange = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    if (field === "city") {
      setDeliveryZone(value.toLowerCase().includes("dhaka") ? "inside" : "outside");
    }
  };

  const handleDeliveryZoneChange = (zone) => {
    setDeliveryZone(zone);
    if (zone === "inside") {
      setCustomer((prev) => ({ ...prev, city: "Dhaka" }));
    } else if (zone === "outside" && customer.city.toLowerCase() === "dhaka") {
      setCustomer((prev) => ({ ...prev, city: "Chittagong" }));
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Basic Validation
    if (!customer.name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    const cleanPhone = customer.phone.replace(/[^0-9]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 11-digit Bangladesh phone number (e.g. 017XXXXXXXX).");
      return;
    }
    if (!customer.address.trim()) {
      setErrorMessage("Please provide your delivery address.");
      return;
    }

    if (cart.length === 0) {
      setErrorMessage("Your cart is empty. Please add items before checkout.");
      return;
    }

    setIsSubmitting(true);

    const formattedItems = cart.map((item) => ({
      productId: item.product.id || item.product.productId,
      sku: item.product.sku || `SKU-${item.product.id}`,
      name: item.product.name,
      image: item.product.image || item.product.images?.[0] || "",
      price: item.product.price,
      quantity: item.quantity,
      size: item.selectedSize || "M",
      color: item.selectedColor || "Default",
      total: item.product.price * item.quantity,
    }));

    const orderPayload = {
      customer: {
        name: customer.name.trim(),
        email: customer.email.trim() || `${cleanPhone}@rongonpatron.com`,
        phone: cleanPhone,
        address: customer.address.trim(),
        city: customer.city.trim() || (deliveryZone === "inside" ? "Dhaka" : "Outside Dhaka"),
        postalCode: customer.postalCode.trim() || "1207",
        notes: customer.notes.trim(),
      },
      items: formattedItems,
      subtotal: cartSubtotal,
      deliveryFee,
      discountAmount: 0,
      totalAmount: finalTotal,
      paymentMethod,
    };

    try {
      if (paymentMethod === "SSLCommerz") {
        // 1. Secure SSLCommerz payment route
        const res = await initiateSSLCommerzPayment(orderPayload);
        if (res.success && res.gatewayUrl) {
          // Keep cart until payment verified; redirect to SSLCommerz secure gateway
          window.location.href = res.gatewayUrl;
        } else {
          throw new Error(res.message || "Failed to establish SSLCommerz payment session.");
        }
      } else {
        // 2. Cash on Delivery (COD) order
        const res = await createOrder(orderPayload);
        if (res.success && res.order) {
          clearCart();
          setIsCheckoutOpen(false);
          setActiveOrderConfirmation(res.order);
          showToast("Order placed successfully! Cash on Delivery confirmed.", "success");
        } else {
          throw new Error(res.message || "Failed to place order.");
        }
      }
    } catch (err) {
      console.error("Checkout submission failed:", err);
      setErrorMessage(err.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl shadow-2xl overflow-hidden my-auto border border-[#E8DFD3]">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#322D29] text-[#EFE9E1] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#72383D] flex items-center justify-center text-[#EFE9E1]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif-luxury text-[#EFE9E1]">
                Rongon Secure Checkout
              </h2>
              <p className="text-[11px] text-[#D1C7BD] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D1C7BD]" />
                <span>SSL 256-Bit Encrypted & Verified by SSLCommerz</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => !isSubmitting && setIsCheckoutOpen(false)}
            disabled={isSubmitting}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#EFE9E1] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-4 sm:p-8">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Column: Customer details & payment method */}
            <div className="lg:col-span-7 space-y-6">
              {/* Delivery Details */}
              <div className="space-y-4">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#72383D] flex items-center gap-1.5">
                  <Truck className="w-4 h-4" />
                  <span>1. Delivery Information</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#322D29] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nusrat Jahan"
                      value={customer.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white text-xs sm:text-sm text-[#322D29] rounded-xl border border-[#E0D5C7] focus:border-[#72383D] focus:outline-none transition-all placeholder-[#AC9C8D]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#322D29] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="017XXXXXXXX"
                        value={customer.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white text-xs sm:text-sm text-[#322D29] rounded-xl border border-[#E0D5C7] focus:border-[#72383D] focus:outline-none transition-all placeholder-[#AC9C8D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#322D29] mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="nusrat@example.com"
                        value={customer.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white text-xs sm:text-sm text-[#322D29] rounded-xl border border-[#E0D5C7] focus:border-[#72383D] focus:outline-none transition-all placeholder-[#AC9C8D]"
                      />
                    </div>
                  </div>

                  {/* Delivery Location Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-[#322D29] mb-1.5">
                      Delivery Location *
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleDeliveryZoneChange("inside")}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          deliveryZone === "inside"
                            ? "bg-[#72383D]/10 border-[#72383D] text-[#72383D]"
                            : "bg-white border-[#E0D5C7] text-[#322D29] hover:bg-[#F2ECE4]"
                        }`}
                      >
                        <div className="text-xs font-bold">Inside Dhaka</div>
                        <div className="text-[11px] text-[#7D7063]">
                          {isFreeDelivery ? "FREE (Orders over ৳2,500)" : "৳70 • 24–48 hours"}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeliveryZoneChange("outside")}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          deliveryZone === "outside"
                            ? "bg-[#72383D]/10 border-[#72383D] text-[#72383D]"
                            : "bg-white border-[#E0D5C7] text-[#322D29] hover:bg-[#F2ECE4]"
                        }`}
                      >
                        <div className="text-xs font-bold">Outside Dhaka</div>
                        <div className="text-[11px] text-[#7D7063]">
                          {isFreeDelivery ? "FREE (Orders over ৳2,500)" : "৳130 • 48–72 hours"}
                        </div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#322D29] mb-1">
                      Detailed Street Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House / Flat no, Road, Area, Landmark..."
                      value={customer.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white text-xs sm:text-sm text-[#322D29] rounded-xl border border-[#E0D5C7] focus:border-[#72383D] focus:outline-none transition-all placeholder-[#AC9C8D] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3 pt-2 border-t border-[#E0D5C7]/70">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#72383D] flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4" />
                  <span>2. Payment Method</span>
                </h3>

                <div className="space-y-2">
                  {/* SSLCommerz Option */}
                  <label
                    className={`block p-3.5 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === "SSLCommerz"
                        ? "bg-white border-[#72383D] ring-2 ring-[#72383D]/15 shadow-xs"
                        : "bg-white/60 border-[#E0D5C7] hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="SSLCommerz"
                          checked={paymentMethod === "SSLCommerz"}
                          onChange={() => setPaymentMethod("SSLCommerz")}
                          className="accent-[#72383D]"
                        />
                        <span className="text-xs sm:text-sm font-bold text-[#322D29]">
                          Pay with SSLCommerz
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="h-6 px-1.5 bg-[#FAF7F2] rounded border border-[#E0D5C7] flex items-center justify-center">
                          <BkashIcon />
                        </span>
                        <span className="h-6 px-1.5 bg-[#FAF7F2] rounded border border-[#E0D5C7] flex items-center justify-center">
                          <NagadIcon />
                        </span>
                        <span className="h-6 px-1.5 bg-[#FAF7F2] rounded border border-[#E0D5C7] flex items-center justify-center">
                          <VisaIcon />
                        </span>
                        <span className="h-6 px-1.5 bg-[#FAF7F2] rounded border border-[#E0D5C7] flex items-center justify-center">
                          <MastercardIcon />
                        </span>
                      </div>
                    </div>
                  </label>

                  {/* Cash on Delivery Option */}
                  <label
                    className={`block p-3.5 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === "COD"
                        ? "bg-white border-[#72383D] ring-2 ring-[#72383D]/15 shadow-xs"
                        : "bg-white/60 border-[#E0D5C7] hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="COD"
                          checked={paymentMethod === "COD"}
                          onChange={() => setPaymentMethod("COD")}
                          className="accent-[#72383D]"
                        />
                        <span className="text-xs sm:text-sm font-bold text-[#322D29]">
                          Cash on Delivery (COD)
                        </span>
                      </div>
                      <span className="text-xs text-[#7D7063] font-medium">Pay at Doorstep</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-[#E0D5C7] space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#322D29] pb-3 border-b border-[#E0D5C7]">
                  Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} items)
                </h3>

                {/* Items List (max 3 visible with scroll) */}
                <div className="divide-y divide-[#F2ECE4] max-h-56 overflow-y-auto pr-1 my-2">
                  {cart.map((item, idx) => (
                    <div key={`${item.product.id}-${idx}`} className="py-2.5 flex items-center gap-3">
                      <img
                        src={item.product.image || item.product.images?.[0]}
                        alt={item.product.name}
                        className="w-12 h-14 object-cover rounded-lg bg-[#EFE9E1] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-[#322D29] truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-[#7D7063]">
                          Qty: {item.quantity} • {item.selectedColor || "Standard"}
                        </p>
                        <span className="text-xs font-bold text-[#72383D]">
                          ৳{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2 pt-3 border-t border-[#E0D5C7] text-xs text-[#322D29]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">৳{cartSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery ({deliveryZone === "inside" ? "Dhaka" : "Outside"})</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <strong className="text-[#72383D] font-bold">FREE</strong>
                      ) : (
                        `৳${deliveryFee}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#322D29] pt-2 border-t border-[#E0D5C7]">
                    <span>Total Payable</span>
                    <span className="text-[#72383D] text-lg font-serif-luxury">
                      ৳{finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons & Trust */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-[#EFE9E1] shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer ${
                    paymentMethod === "SSLCommerz"
                      ? "bg-[#72383D] hover:bg-[#8B454B]"
                      : "bg-[#322D29] hover:bg-[#453E39]"
                  } disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>
                        {paymentMethod === "SSLCommerz"
                          ? "Securing SSLCommerz Gateway..."
                          : "Processing Order..."}
                      </span>
                    </>
                  ) : paymentMethod === "SSLCommerz" ? (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Pay with SSLCommerz — ৳{finalTotal.toLocaleString()}</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Cash on Delivery — ৳{finalTotal.toLocaleString()}</span>
                    </>
                  )}
                </button>

                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E0D5C7] flex items-center justify-center gap-2 text-[11px] text-[#7D7063]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C98A17]" />
                  <span>Guaranteed 100% Authentic Rongon Luxury Fashion</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
