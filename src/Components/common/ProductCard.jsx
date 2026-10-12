import React, { useState } from "react";
import { useShop } from "../../Context/ShopContext";
import { Heart, ShoppingBag, Star, Zap } from "lucide-react";

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
      className="group relative bg-white rounded-xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Wrapper - Compact & Minimalist */}
      <div
        className="relative w-full aspect-[4/4.5] overflow-hidden bg-[#F7F4EE] cursor-pointer"
        onClick={() => setQuickViewProduct(product)}
      >
        {/* Main & Hover Image Switch */}
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-103"
        />

        {/* Minimalist Wishlist Button (Top Right) */}
        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            wishlisted
              ? "bg-[#72383D] text-[#EFE9E1] shadow-xs scale-105"
              : "bg-white/85 backdrop-blur-xs text-[#322D29] hover:bg-[#72383D] hover:text-[#EFE9E1]"
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-[#EFE9E1]" : ""}`} />
        </button>
      </div>

      {/* Product Content Details - Compact & Clean */}
      <div className="p-2.5 sm:p-3 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] mb-1 gap-1">
            <span className="font-semibold uppercase tracking-wider text-[#AC9C8D] truncate">
              {product.subCategory || product.category}
            </span>
            <div className="flex items-center gap-0.5 text-[#72383D] font-semibold text-[10px] shrink-0">
              <Star className="w-2.5 h-2.5 fill-[#72383D] text-[#72383D]" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="text-xs sm:text-[13px] font-medium text-[#322D29] line-clamp-1 hover:text-[#72383D] cursor-pointer transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-2 pt-1.5">
          {/* Price Row */}
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-xs sm:text-sm font-bold text-[#72383D]">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-[11px] text-[#AC9C8D] line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Compact Minimalist Action Buttons */}
          <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={handleAddToCart}
              className="py-1.5 px-1 text-[10px] sm:text-[11px] font-medium rounded-md text-[#322D29] bg-[#EFE9E1] hover:bg-[#322D29] hover:text-[#EFE9E1] transition-all duration-200 flex items-center justify-center gap-1 active:scale-95"
            >
              <ShoppingBag className="w-3 h-3 shrink-0" />
              <span className="truncate">Add to Cart</span>
            </button>
            <button
              type="button"
              onClick={handleOrderNow}
              className="py-1.5 px-1 text-[10px] sm:text-[11px] font-semibold rounded-md bg-[#72383D] text-[#EFE9E1] hover:bg-[#322D29] transition-all duration-200 flex items-center justify-center gap-1 active:scale-95 shadow-2xs"
            >
              <Zap className="w-3 h-3 shrink-0 fill-current" />
              <span className="truncate">Order Now</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
