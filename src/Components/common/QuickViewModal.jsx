import React, { useState } from "react";
import { useShop } from "../../Context/ShopContext";
import { X, Heart, Star, ShoppingBag, Zap, ShieldCheck, Truck, RefreshCw } from "lucide-react";

const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist, setIsCartOpen, setIsCheckoutOpen } = useShop();
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(null);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const wishlisted = isInWishlist(product.id);
  const currentColor = selectedColor || (product.colors && product.colors[0]) || "";
  const displayImage = activeImage || product.image;

  const handleClose = () => {
    setQuickViewProduct(null);
    setSelectedColor(null);
    setQuantity(1);
    setActiveImage(null);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, currentColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, currentColor);
    handleClose();
    setIsCheckoutOpen(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#322D29]/75 backdrop-blur-xs animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row text-[#322D29]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Borderless */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#EFE9E1] text-[#322D29] hover:bg-[#72383D] hover:text-white shadow-xs flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Images */}
        <div className="w-full md:w-1/2 p-4 md:p-6 bg-[#EFE9E1]/50 flex flex-col justify-between">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-inner bg-white">
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
          </div>

          {/* Thumbnail preview list */}
          <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            {(product.galleryImages && product.galleryImages.length > 0
              ? product.galleryImages
              : [product.image, product.hoverImage].filter(Boolean)
            ).slice(0, 6).map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(imgUrl)}
                className={`w-14 h-14 rounded-xl shrink-0 overflow-hidden transition-all ${
                  displayImage === imgUrl ? "ring-2 ring-[#72383D] scale-105" : "opacity-70 hover:opacity-100"
                }`}
              >
                <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="w-full md:w-1/2 p-5 md:p-6 overflow-y-auto max-h-[85vh] flex flex-col justify-between">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#AC9C8D]">
                {product.subCategory || product.category}
              </span>
              <div className="flex items-center gap-1.5 text-[#72383D] font-semibold text-xs">
                <Star className="w-3.5 h-3.5 fill-[#72383D] text-[#72383D]" />
                <span>{product.rating}</span>
                <span className="text-[#AC9C8D]">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h2 id="modal-product-title" className="text-lg md:text-xl font-bold text-[#322D29] leading-snug">
              {product.name}
            </h2>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 my-3">
              <span className="text-2xl font-extrabold text-[#72383D]">
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#AC9C8D] line-through">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs px-2.5 py-1 bg-[#EFE9E1] text-[#322D29] font-medium rounded-md">
                In Stock ({product.stockCount} left)
              </span>
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm text-[#322D29]/80 leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Fabric / Material */}
            {product.fabric && (
              <div className="text-xs text-[#322D29] bg-[#EFE9E1] p-2.5 rounded-xl mb-4">
                <span className="font-semibold text-[#322D29]">Material / Craft: </span>
                <span>{product.fabric}</span>
              </div>
            )}

            {/* Color Selection - Borderless */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#322D29] mb-2">
                  Select Shade / Color: <span className="text-[#72383D]">{currentColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all ${currentColor === color
                          ? "bg-[#72383D] text-[#EFE9E1] font-semibold"
                          : "bg-[#EFE9E1] text-[#322D29] hover:bg-[#D1C7BD]"
                        }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Controls - Borderless */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-xs font-semibold text-[#322D29]">Quantity:</span>
              <div className="flex items-center rounded-xl overflow-hidden bg-[#EFE9E1]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-[#322D29] hover:bg-[#D1C7BD] font-bold transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold text-[#322D29] min-w-8 text-center bg-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-[#322D29] hover:bg-[#D1C7BD] font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons - Solid Borderless */}
          <div className="space-y-3 pt-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="py-2.5 px-3 text-xs md:text-sm font-semibold rounded-xl bg-[#EFE9E1] text-[#322D29] hover:bg-[#322D29] hover:text-[#EFE9E1] transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="py-2.5 px-3 text-xs md:text-sm font-semibold rounded-xl bg-[#72383D] text-[#EFE9E1] hover:bg-[#322D29] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Zap className="w-4 h-4 fill-[#EFE9E1]" />
                Buy Now
              </button>
            </div>

            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              className="w-full py-2 text-xs font-medium text-[#322D29] hover:text-[#72383D] flex items-center justify-center gap-1.5"
            >
              <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-[#72383D] text-[#72383D]" : ""}`} />
              {wishlisted ? "Saved in your Wishlist" : "Add to Wishlist"}
            </button>

            {/* Trust Micro-badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-[#AC9C8D] text-center">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#72383D]" />
                <span>Cash on Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#72383D]" />
                <span>100% Authentic</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 text-[#72383D]" />
                <span>7 Days Exchange</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
