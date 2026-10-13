import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";
import CartDrawer from "../common/CartDrawer";
import CheckoutModal from "../common/CheckoutModal";
import OrderSuccessModal from "../common/OrderSuccessModal";
import QuickViewModal from "../common/QuickViewModal";
import MobileDrawer from "../common/MobileDrawer";
import Toast from "../common/Toast";
import Home from "../../pages/Home";

const HomeLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#EFE9E1] text-[#322D29] selection:bg-[#72383D] selection:text-[#EFE9E1]">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        <Home />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Fixed Navigation (MorshedMart Style: lg:hidden) */}
      <MobileBottomNav />

      {/* Interactive Drawers & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <QuickViewModal />
      <MobileDrawer />
      <Toast />
    </div>
  );
};

export default HomeLayout;