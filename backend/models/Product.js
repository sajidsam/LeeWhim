const mongoose = require("mongoose");

/**
 * Product Schema for Rongon Luxury Women Collection
 * Enterprise-grade e-commerce schema with inventory, multi-tier pricing,
 * SEO slugs, attributes, indexing, and full-text search capability.
 */
const productSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [200, "Product name cannot exceed 200 characters"],
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    subCategory: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    categorySlug: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
      index: true,
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
      default: function () {
        return this.price;
      },
    },
    discount: {
      type: String,
      default: "0% OFF",
    },
    currency: {
      type: String,
      default: "BDT",
      uppercase: true,
    },
    rating: {
      type: Number,
      default: 5.0,
      min: [1, "Rating cannot be lower than 1"],
      max: [5, "Rating cannot exceed 5"],
      index: true,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
      index: true,
    },
    stockCount: {
      type: Number,
      default: 10,
      min: [0, "Stock cannot be negative"],
    },
    lowStockThreshold: {
      type: Number,
      default: 3,
    },
    badges: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      required: [true, "Primary product image URL is required"],
    },
    hoverImage: {
      type: String,
      default: function () {
        return this.image;
      },
    },
    galleryImages: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    fabric: {
      type: String,
      default: "Pure Cotton",
      index: true,
    },
    workType: {
      type: String,
      default: "Contemporary",
    },
    colors: {
      type: [String],
      default: [],
    },
    sizes: {
      type: [String],
      default: ["S", "M", "L", "XL", "XXL"],
    },
    careInstructions: {
      type: String,
      default: "Dry clean or gentle hand wash in cold water with mild detergent. Do not bleach.",
    },
    isNewArrival: {
      type: Boolean,
      default: false,
      index: true,
    },
    isBestDeal: {
      type: Boolean,
      default: false,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "rongon_products", // Explicit collection name for Rongon brand
  }
);

// Compound indexes for optimal querying performance
productSchema.index({ categorySlug: 1, price: 1 });
productSchema.index({ isFeatured: 1, createdAt: -1 });
productSchema.index({ isNewArrival: 1, createdAt: -1 });
productSchema.index({ inStock: 1, rating: -1 });

// Full-text search index for fast instant search
productSchema.index(
  {
    name: "text",
    description: "text",
    fabric: "text",
    subCategory: "text",
    sku: "text",
  },
  {
    weights: {
      name: 10,
      subCategory: 5,
      fabric: 3,
      sku: 5,
      description: 1,
    },
    name: "rongon_product_text_search",
  }
);

module.exports = mongoose.model("Product", productSchema);
