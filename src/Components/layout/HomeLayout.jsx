import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";
import CartDrawer from "../common/CartDrawer";
import QuickViewModal from "../common/QuickViewModal";
import MobileDrawer from "../common/MobileDrawer";
import SearchModal from "../common/SearchModal";
import Toast from "../common/Toast";
import Home from "../../pages/Home";

const HomeLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#faf7f7] selection:bg-[#be123c] selection:text-white">
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
      <QuickViewModal />
      <MobileDrawer />
      <SearchModal />
      <Toast />
    </div>
  );
};

export default HomeLayout;