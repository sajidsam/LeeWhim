import React from "react";
import HeroSlider from "../Components/home/HeroSlider";
import CategoryBar from "../Components/home/CategoryBar";
import TrustBadges from "../Components/home/TrustBadges";
import CuratedSpotlight from "../Components/home/CuratedSpotlight";
import PromoBanners from "../Components/home/PromoBanners";
import CatalogSection from "../Components/home/CatalogSection";
import CustomerReviews from "../Components/home/CustomerReviews";
import InstagramShowcase from "../Components/home/InstagramShowcase";

const Home = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Hero Carousel Slider */}
      <HeroSlider />

      {/* Quick Category Bar */}
      <CategoryBar />

      {/* Trust & Guarantee Badges */}
      <TrustBadges />

      {/* Signature MorshedMart Spotlight (1 Large Feature + 6 Products) */}
      <CuratedSpotlight />

      {/* Dual Promotion Banners */}
      <PromoBanners />

      {/* Complete Responsive Product Catalog (sm: 2 cols, md: 3 cols, lg: 4/5 cols) */}
      <CatalogSection />

      {/* Social Proof & Customer Reviews */}
      <CustomerReviews />

      {/* Instagram Community Styling Grid */}
      <InstagramShowcase />
    </div>
  );
};

export default Home;
