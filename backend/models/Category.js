const mongoose = require("mongoose");

/**
 * Category Schema for Rongon Luxury Women Collection
 * Supports hierarchical subcategories, custom promo banners, and sorting order.
 */
const categorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    image: {
      type: String,
      required: true,
    },
    itemCount: {
      type: Number,
      default: 0,
    },
    badge: {
      type: String,
      default: "Popular",
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "rongon_categories", // Explicit collection name
  }
);

categorySchema.index({ displayOrder: 1 });

module.exports = mongoose.model("Category", categorySchema);
