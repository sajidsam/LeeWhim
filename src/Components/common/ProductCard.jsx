import React, { useState } from "react";
import { useShop } from "../../Context/ShopContext";
import { Heart, Eye, ShoppingBag, Star, Zap } from "lucide-react";

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, setIsCartOpen } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const wishlisted = isInWishlist(product.id);

  const handleOrderNow = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <article
      className="group relative bg-white rounded-2xl border border-rose-100/70 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Wrapper */}
      <div
        className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[4/5] overflow-hidden bg-rose-50/30 cursor-pointer"
        onClick={() => setQuickViewProduct(product)}
      >
        {/* Main & Hover Image Switch */}
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges (Top Left) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.discount && (
            <span className="px-2 py-0.5 text-[10px] sm:text-xs font-bold tracking-wider uppercase bg-[#be123c] text-white rounded-full shadow-sm">
              {product.discount}
            </span>
          )}
          {product.badges && product.badges.length > 0 && (
            <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold tracking-wide uppercase bg-[#1e111d]/80 backdrop-blur-sm text-amber-200 rounded-full shadow-sm border border-amber-300/20">
              {product.badges[0]}
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
            wishlisted
              ? "bg-[#be123c] text-white shadow-md scale-105"
              : "bg-white/90 backdrop-blur-sm text-gray-700 hover:text-[#be123c] hover:bg-white shadow-sm"
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? "fill-white" : ""}`} />
        </button>

        {/* Quick View Button (Desktop & Tablet Hover overlay) */}
        <div className="absolute inset-x-0 bottom-3 px-3 hidden sm:flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-full py-2 bg-white/95 hover:bg-white backdrop-blur-md text-[#1e111d] text-xs font-semibold rounded-xl shadow-lg flex items-center justify-center gap-1.5 border border-rose-100 hover:text-[#be123c] transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5 gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9f1239]">
              {product.subCategory || product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 hover:text-[#be123c] cursor-pointer transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-3 pt-2.5 border-t border-rose-50">
          {/* Price Row */}
          <div className="flex items-baseline gap-2 mb-2.5">
            <span className="text-sm sm:text-base font-bold text-[#be123c]">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] sm:text-xs text-gray-400 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Buttons (Add to Cart & Order Now - MorshedMart Style) */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="py-1.5 sm:py-2 px-1 text-[11px] sm:text-xs font-medium rounded-lg border border-rose-200 text-rose-900 bg-rose-50/50 hover:bg-[#be123c] hover:text-white hover:border-[#be123c] transition-all duration-200 flex items-center justify-center gap-1 active:scale-95"
            >
              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="truncate">Add to Cart</span>
            </button>
            <button
              type="button"
              onClick={handleOrderNow}
              className="py-1.5 sm:py-2 px-1 text-[11px] sm:text-xs font-semibold rounded-lg bg-[#be123c] text-white hover:bg-[#9f1239] transition-all duration-200 flex items-center justify-center gap-1 shadow-sm active:scale-95"
            >
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-300 text-amber-300" />
              <span className="truncate">Order Now</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
