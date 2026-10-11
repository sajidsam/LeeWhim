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
      className="group relative bg-white rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Wrapper */}
      <div
        className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[4/5] overflow-hidden bg-[#EFE9E1]/50 cursor-pointer"
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
            <span className="px-2 py-0.5 text-[10px] sm:text-xs font-bold tracking-wider uppercase bg-[#72383D] text-[#EFE9E1] rounded-full shadow-xs">
              {product.discount}
            </span>
          )}
          {product.badges && product.badges.length > 0 && (
            <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold tracking-wide uppercase bg-[#322D29] text-[#D1C7BD] rounded-full shadow-xs">
              {product.badges[0]}
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) - Borderless */}
        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
            wishlisted
              ? "bg-[#72383D] text-[#EFE9E1] shadow-xs scale-105"
              : "bg-[#EFE9E1]/90 backdrop-blur-sm text-[#322D29] hover:bg-[#72383D] hover:text-[#EFE9E1]"
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? "fill-[#EFE9E1]" : ""}`} />
        </button>

        {/* Quick View Button (Desktop & Tablet Hover overlay) - Borderless */}
        <div className="absolute inset-x-0 bottom-3 px-3 hidden sm:flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-full py-2 bg-[#EFE9E1] hover:bg-[#72383D] hover:text-[#EFE9E1] text-[#322D29] text-xs font-semibold rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5 gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#AC9C8D]">
              {product.subCategory || product.category}
            </span>
            <div className="flex items-center gap-1 text-[#72383D] font-semibold text-[11px]">
              <Star className="w-3 h-3 fill-[#72383D] text-[#72383D]" />
              <span>{product.rating}</span>
              <span className="text-[#AC9C8D] text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="text-xs sm:text-sm font-semibold text-[#322D29] line-clamp-2 hover:text-[#72383D] cursor-pointer transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-3 pt-2.5">
          {/* Price Row */}
          <div className="flex items-baseline gap-2 mb-2.5">
            <span className="text-sm sm:text-base font-bold text-[#72383D]">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] sm:text-xs text-[#AC9C8D] line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Buttons - Solid Borderless */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="py-2 px-1 text-[11px] sm:text-xs font-medium rounded-lg text-[#322D29] bg-[#EFE9E1] hover:bg-[#322D29] hover:text-[#EFE9E1] transition-all duration-200 flex items-center justify-center gap-1 active:scale-95"
            >
              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="truncate">Add to Cart</span>
            </button>
            <button
              type="button"
              onClick={handleOrderNow}
              className="py-2 px-1 text-[11px] sm:text-xs font-semibold rounded-lg bg-[#72383D] text-[#EFE9E1] hover:bg-[#322D29] transition-all duration-200 flex items-center justify-center gap-1 active:scale-95 shadow-xs"
            >
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#EFE9E1]" />
              <span className="truncate">Order Now</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
