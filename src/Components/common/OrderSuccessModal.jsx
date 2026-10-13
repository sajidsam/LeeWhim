import React, { useEffect, useState } from "react";
import { useShop } from "../../Context/ShopContext";
import {
  CheckCircle,
  Package,
  Calendar,
  Phone,
  ShieldCheck,
  ShoppingBag,
  X,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

const OrderSuccessModal = () => {
  const {
    activeOrderConfirmation,
    setActiveOrderConfirmation,
    clearCart,
    setIsCheckoutOpen,
  } = useShop();

  const [urlStatus, setUrlStatus] = useState(null); // 'success' | 'failed' | 'cancelled' | null
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Parse URL search parameters on mount
    const params = new URLSearchParams(window.location.search);
    const isSuccess = params.get("order_success") === "true";
    const isFailed = params.get("order_failed") === "true";
    const isCancelled = params.get("order_cancelled") === "true";

    if (isSuccess) {
      clearCart();
      setUrlStatus("success");
      setOrderDetails({
        orderNumber: params.get("order_id") || "RNG-ONLINE",
        transactionId: params.get("tran_id") || "SSL-VERIFIED",
        amount: params.get("amount") || null,
        paymentMethod: "SSLCommerz Online Payment",
      });
      // Clean up URL parameters cleanly without refreshing page
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (isFailed) {
      setUrlStatus("failed");
      setOrderDetails({
        orderNumber: params.get("order_id"),
        error: params.get("error") || "Transaction could not be completed.",
      });
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (isCancelled) {
      setUrlStatus("cancelled");
      setOrderDetails({
        orderNumber: params.get("order_id"),
      });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [clearCart]);

  // Combine URL details or context state (e.g. from COD)
  const isVisible = Boolean(urlStatus || activeOrderConfirmation);

  if (!isVisible) return null;

  const currentOrder = activeOrderConfirmation || orderDetails || {};
  const isFailedState = urlStatus === "failed" || urlStatus === "cancelled";

  const handleClose = () => {
    setUrlStatus(null);
    setActiveOrderConfirmation(null);
  };

  const handleRetryCheckout = () => {
    handleClose();
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl shadow-2xl overflow-hidden border border-[#E8DFD3] text-[#322D29]">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#EFE9E1] hover:bg-[#D1C7BD] text-[#322D29] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isFailedState ? (
          /* ========================================= */
          /* FAILED OR CANCELLED STATE                 */
          /* ========================================= */
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#322D29]">
                {urlStatus === "cancelled" ? "Payment Cancelled" : "Payment Incomplete"}
              </h2>
              <p className="text-xs sm:text-sm text-[#7D7063] mt-1 max-w-sm mx-auto leading-relaxed">
                {urlStatus === "cancelled"
                  ? "You cancelled the SSLCommerz payment process. Your bag items have been preserved."
                  : currentOrder.error || "The gateway was unable to verify the transaction."}
              </p>
            </div>

            {currentOrder.orderNumber && (
              <div className="p-3 bg-white rounded-xl border border-[#E0D5C7] text-xs text-[#7D7063]">
                Order Reference: <strong className="text-[#322D29] font-mono">{currentOrder.orderNumber}</strong>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleRetryCheckout}
                className="flex-1 py-3 px-4 bg-[#72383D] hover:bg-[#8B454B] text-[#EFE9E1] text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Payment or Choose COD</span>
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="py-3 px-4 bg-white hover:bg-[#EFE9E1] text-[#322D29] text-xs font-semibold rounded-xl border border-[#E0D5C7] transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* ========================================= */
          /* SUCCESS STATE (SSLCOMMERZ OR COD)         */
          /* ========================================= */
          <div>
            {/* Top Celebration Banner */}
            <div className="bg-[#72383D] text-[#EFE9E1] p-6 sm:p-8 text-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-white/10 mx-auto flex items-center justify-center mb-3">
                <CheckCircle className="w-10 h-10 text-[#EFE9E1]" />
              </div>
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/20 text-[#EFE9E1] mb-2">
                Order Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#EFE9E1]">
                Thank You For Your Order!
              </h2>
              <p className="text-xs sm:text-sm text-[#D1C7BD] mt-1">
                Your luxury Rongon piece is being carefully curated and prepared for delivery.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="p-4 bg-white rounded-2xl border border-[#E0D5C7] space-y-3">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-[#F2ECE4]">
                  <span className="text-[#7D7063]">Order Number</span>
                  <span className="font-mono font-bold text-[#72383D]">
                    {currentOrder.orderNumber}
                  </span>
                </div>

                {currentOrder.paymentTransactionId || currentOrder.transactionId ? (
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-[#F2ECE4]">
                    <span className="text-[#7D7063]">Payment Gateway Ref</span>
                    <span className="font-mono text-[11px] text-[#322D29]">
                      {currentOrder.paymentTransactionId || currentOrder.transactionId}
                    </span>
                  </div>
                ) : null}

                <div className="flex justify-between items-center text-xs pb-2 border-b border-[#F2ECE4]">
                  <span className="text-[#7D7063]">Payment Mode</span>
                  <span className="font-semibold text-[#16A34A] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>
                      {currentOrder.paymentMethod === "SSLCommerz" || currentOrder.paymentMethod === "SSLCommerz Online Payment"
                        ? "Paid via SSLCommerz (Verified)"
                        : "Cash on Delivery (Pending Delivery)"}
                    </span>
                  </span>
                </div>

                {currentOrder.totalAmount || currentOrder.amount ? (
                  <div className="flex justify-between items-center text-sm font-bold pt-1">
                    <span>Total Amount</span>
                    <span className="text-[#72383D]">
                      ৳{Number(currentOrder.totalAmount || currentOrder.amount).toLocaleString()}
                    </span>
                  </div>
                ) : null}
              </div>

              {/* Delivery Timeline Notice */}
              <div className="p-4 rounded-2xl bg-[#EFE9E1]/60 border border-[#E0D5C7] space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-[#322D29]">
                  <Package className="w-4 h-4 text-[#72383D]" />
                  <span>Delivery Information:</span>
                </div>
                <div className="text-[11px] text-[#7D7063] leading-relaxed pl-6 space-y-1">
                  <p>• <strong>Dhaka City:</strong> Delivery within 24 to 48 hours.</p>
                  <p>• <strong>Nationwide Bangladesh:</strong> Delivery within 48 to 72 hours via premium courier.</p>
                  <p>• Our atelier representative will contact you via phone prior to dispatch.</p>
                </div>
              </div>

              {/* Help & Support hotline */}
              <div className="flex items-center justify-between text-xs text-[#7D7063] pt-1">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#72383D]" />
                  <span>Questions? Call: +880 1970 085 954</span>
                </span>
                <span className="text-[11px] font-medium text-[#16A34A]">24/7 Support</span>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-3.5 bg-[#72383D] hover:bg-[#322D29] text-[#EFE9E1] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Continue Exploring Collection</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSuccessModal;
