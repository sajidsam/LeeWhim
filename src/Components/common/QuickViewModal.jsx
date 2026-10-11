import React, { useState } from "react";
import { useShop } from "../../Context/ShopContext";
import { X, Heart, Star, ShoppingBag, Zap, ShieldCheck, Truck, RefreshCw } from "lucide-react";

const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist, setIsCartOpen } = useShop();
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
    setIsCartOpen(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row border border-rose-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-red-600 shadow-md flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Images */}
        <div className="w-full md:w-1/2 p-4 md:p-6 bg-rose-50/30 flex flex-col justify-between">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-inner bg-white">
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {product.discount && (
              <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold bg-[#be123c] text-white rounded-full">
                {product.discount}
              </span>
            )}
          </div>

          {/* Thumbnail preview list */}
          <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setActiveImage(product.image)}
              className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                displayImage === product.image ? "border-[#be123c] scale-105" : "border-gray-200 opacity-70"
              }`}
            >
              <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover" />
            </button>
            {product.hoverImage && (
              <button
                type="button"
                onClick={() => setActiveImage(product.hoverImage)}
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                  displayImage === product.hoverImage ? "border-[#be123c] scale-105" : "border-gray-200 opacity-70"
                }`}
              >
                <img src={product.hoverImage} alt="Thumbnail 2" className="w-full h-full object-cover" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="w-full md:w-1/2 p-5 md:p-6 overflow-y-auto max-h-[85vh] flex flex-col justify-between">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9f1239]">
                {product.subCategory || product.category}
              </span>
              <div className="flex items-center gap-1.5 text-amber-500 font-semibold text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-gray-400">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h2 id="modal-product-title" className="text-lg md:text-xl font-bold text-gray-900 leading-snug">
              {product.name}
            </h2>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 my-3">
              <span className="text-2xl font-extrabold text-[#be123c]">
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded-md border border-emerald-200">
                In Stock ({product.stockCount} left)
              </span>
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Fabric / Material */}
            {product.fabric && (
              <div className="text-xs text-gray-700 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100 mb-4">
                <span className="font-semibold text-rose-950">Material / Craft: </span>
                <span>{product.fabric}</span>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-800 mb-2">
                  Select Shade / Color: <span className="text-[#be123c]">{currentColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 text-xs rounded-xl font-medium border transition-all ${
                        currentColor === color
                          ? "border-[#be123c] bg-rose-50 text-[#be123c] font-semibold"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-xs font-semibold text-gray-800">Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-200 font-bold transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold text-gray-900 min-w-8 text-center bg-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-200 font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons & Badges */}
          <div className="space-y-3 pt-3 border-t border-rose-100">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="py-2.5 px-3 text-xs md:text-sm font-semibold rounded-xl border border-[#be123c] text-[#be123c] hover:bg-rose-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="py-2.5 px-3 text-xs md:text-sm font-semibold rounded-xl bg-[#be123c] text-white hover:bg-[#9f1239] transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                Buy Now
              </button>
            </div>

            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              className="w-full py-2 text-xs font-medium text-gray-600 hover:text-[#be123c] flex items-center justify-center gap-1.5"
            >
              <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-[#be123c] text-[#be123c]" : ""}`} />
              {wishlisted ? "Saved in your Wishlist" : "Add to Wishlist"}
            </button>

            {/* Trust Micro-badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-gray-500 border-t border-gray-100 text-center">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#be123c]" />
                <span>Cash on Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#be123c]" />
                <span>100% Authentic</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 text-[#be123c]" />
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
