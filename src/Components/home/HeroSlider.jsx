import React, { useState, useEffect } from "react";
import { HERO_SLIDES } from "../../data/mockProducts";
import { useShop } from "../../Context/ShopContext";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  const handleCtaClick = (categorySlug) => {
    setActiveCategoryFilter(categorySlug || "all");
    const target = document.getElementById("catalog-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-[45vh] sm:h-[55vh] md:h-[75vh] overflow-hidden group bg-[#1a0e19]">
      {/* Slides Container */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image with Zoom animation */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover object-center transition-transform duration-7000 ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              />
              {/* Luxury Gradient Overlay tailored for women's boutique */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent sm:from-black/75 sm:via-black/40 sm:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140a14] via-transparent to-transparent opacity-80" />
            </div>

            {/* Slide Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-xl text-white space-y-2.5 sm:space-y-4">
                {/* Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-rose-200 text-xs font-semibold tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{slide.tag}</span>
                </div>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm font-medium tracking-widest uppercase text-amber-200 font-brand">
                  {slide.subtitle}
                </p>

                {/* Title */}
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif-luxury leading-tight text-white drop-shadow-md">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="text-xs sm:text-sm md:text-base text-gray-200 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-lg">
                  {slide.description}
                </p>

                {/* CTA Button */}
                <div className="pt-2 sm:pt-4">
                  <button
                    type="button"
                    onClick={() => handleCtaClick(slide.categorySlug)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3.5 bg-[#be123c] hover:bg-[#9f1239] text-white text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 shadow-xl hover:shadow-rose-900/50 hover:scale-105 active:scale-95"
                  >
                    <span>{slide.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Prev / Next Navigation Chevrons */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 inset-x-0 z-20 flex justify-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentSlide ? "w-8 bg-[#be123c]" : "w-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
