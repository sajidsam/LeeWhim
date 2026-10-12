import React from "react";
import HeroSlider from "../Components/home/HeroSlider";
import CategoryBar from "../Components/home/CategoryBar";
import TrustBadges from "../Components/home/TrustBadges";
import SareeRowSection from "../Components/home/SareeRowSection";
import KurtiRowSection from "../Components/home/KurtiRowSection";
import PromoBanners from "../Components/home/PromoBanners";
import BagsRowSection from "../Components/home/BagsRowSection";
import CatalogSection from "../Components/home/CatalogSection";
import CustomerReviews from "../Components/home/CustomerReviews";
import InstagramShowcase from "../Components/home/InstagramShowcase";

const Home = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* 1. Hero Carousel Slider */}
      <HeroSlider />

      {/* 2. Quick Category Bar */}
      <CategoryBar />

      {/* 3. Trust & Guarantee Badges */}
      <TrustBadges />

      {/* 4. Saree 2-Row Showcase */}
      <SareeRowSection />

      {/* 5. Kurti & Salwar Kameez 2-Row Showcase */}
      <KurtiRowSection />

      {/* 6. Dual Promotion Banners */}
      <PromoBanners />

      {/* 7. Women Bags & Crossbody (Only 2 Rows) */}
      <BagsRowSection />

      {/* 8. Full Product Catalog with Pagination & Caching */}
      <CatalogSection />

      {/* 9. Social Proof & Customer Reviews */}
      <CustomerReviews />

      {/* 10. Instagram Community Styling Grid */}
      <InstagramShowcase />
    </div>
  );
};

export default Home;
