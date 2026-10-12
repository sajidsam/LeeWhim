import React, { useState, useEffect } from "react";
import { HERO_SLIDES } from "../../data/mockProducts";
import { useShop } from "../../Context/ShopContext";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const { setActiveCategoryFilter } = useShop();

  // Auto advance slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleCtaClick = (categorySlug) => {
    setActiveCategoryFilter(categorySlug || "all");
    const target = document.getElementById("catalog-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative w-full h-[40vh] sm:h-[48vh] md:h-[65vh] lg:h-[75vh] overflow-hidden group bg-[#322D29] select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              }`}
          >
            {/* Background Image with Zoom animation */}
            <div className="absolute inset-0 overflow-hidden bg-[#72383D]">
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover transition-transform duration-7000 ease-out ${
                  slide.isCustomBanner
                    ? "object-[80%_center] sm:object-[75%_center] lg:object-right"
                    : "object-center"
                } ${isActive ? "scale-103" : "scale-100"}`}
              />
              {/* Luxury Gradient Overlay */}
              {slide.isCustomBanner ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#72383D]/95 via-[#72383D]/60 to-transparent sm:from-[#72383D]/90 sm:via-[#72383D]/40 lg:from-[#72383D]/80 lg:via-transparent lg:to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#322D29]/50 via-transparent to-transparent sm:hidden" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#322D29]/95 via-[#322D29]/65 to-transparent sm:from-[#322D29]/90 sm:via-[#322D29]/50 sm:to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#322D29] via-transparent to-transparent opacity-85" />
                </>
              )}
            </div>

            {/* Slide Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center">
              <div className="max-w-[260px] sm:max-w-sm md:max-w-md lg:max-w-xl text-[#EFE9E1] space-y-2.5 sm:space-y-1.5 md:space-y-3 lg:space-y-4">
                {/* Tag - Hidden on mobile */}
                <div className="hidden sm:inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full bg-[#72383D] text-[#EFE9E1] text-[10px] md:text-xs font-semibold tracking-wider uppercase">
                  <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#D1C7BD]" />
                  <span>{slide.tag}</span>
                </div>

                {/* Subtitle - Hidden on mobile */}
                <p className="hidden sm:block text-[10px] md:text-xs lg:text-sm font-medium tracking-wider sm:tracking-widest uppercase text-[#D1C7BD] font-brand">
                  {slide.subtitle}
                </p>

                {/* Title */}
                {/* Mobile: 2 layers / lines */}
                <div className="block sm:hidden">
                  <h1 className="text-xl font-bold font-serif-luxury leading-[1.2] text-[#EFE9E1] drop-shadow-md">
                    <span className="block">{slide.mobileTitleLine1 || slide.title}</span>
                    <span className="block text-[#EFE9E1]">{slide.mobileTitleLine2 || ""}</span>
                  </h1>
                </div>

                {/* Tablet & Desktop: single/fluid title */}
                <h1 className="hidden sm:block text-base md:text-2xl lg:text-5xl xl:text-6xl font-bold font-serif-luxury leading-snug sm:leading-tight text-[#EFE9E1] drop-shadow-md">
                  {slide.title}
                </h1>

                {/* Description - Hidden on mobile */}
                <p className="hidden sm:block text-[11px] md:text-xs lg:text-base text-[#D1C7BD] line-clamp-2 md:line-clamp-3 leading-relaxed max-w-sm md:max-w-md lg:max-w-lg">
                  {slide.description}
                </p>

                {/* CTA Button */}
                <div className="pt-0.5 sm:pt-2 md:pt-3">
                  <button
                    type="button"
                    onClick={() => handleCtaClick(slide.categorySlug)}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-4 sm:py-2 md:px-6 md:py-2.5 lg:px-8 lg:py-3.5 bg-[#72383D] hover:bg-[#322D29] text-[#EFE9E1] text-xs sm:text-xs md:text-sm font-bold rounded-lg sm:rounded-xl transition-all duration-300 shadow-md sm:shadow-lg active:scale-95"
                  >
                    <span className="sm:hidden">{slide.mobileButtonText || "Shop Now"}</span>
                    <span className="hidden sm:inline">{slide.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Prev / Next Navigation Chevrons - Desktop only (hidden on small/mid devices to prevent overlapping text) */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="hidden lg:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#322D29]/50 hover:bg-[#322D29]/90 text-[#EFE9E1] items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95"
      >
        <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next Slide"
        className="hidden lg:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#322D29]/50 hover:bg-[#322D29]/90 text-[#EFE9E1] items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95"
      >
        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-2.5 sm:bottom-4 md:bottom-6 inset-x-0 z-20 flex justify-center gap-1.5 sm:gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "w-6 sm:w-8 bg-[#72383D]" : "w-1.5 sm:w-2 bg-[#D9D9D9]/60 hover:bg-[#EFE9E1]"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
