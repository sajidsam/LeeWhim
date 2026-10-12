const mongoose = require("mongoose");

/**
 * Banner Schema for Rongon Luxury Women Collection
 * Supports Hero Slider slides, mobile-responsive typography, promo cards, and category link tags.
 */
const bannerSchema = new mongoose.Schema(
  {
    bannerId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["hero", "promo", "announcement"],
      default: "hero",
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    mobileTitleLine1: {
      type: String,
      trim: true,
    },
    mobileTitleLine2: {
      type: String,
      trim: true,
    },
    mobileButtonText: {
      type: String,
      default: "Shop Now",
    },
    description: {
      type: String,
      trim: true,
    },
    buttonText: {
      type: String,
      default: "Explore Collection",
    },
    categorySlug: {
      type: String,
      default: "all",
    },
    tag: {
      type: String,
      default: "Featured",
    },
    image: {
      type: String,
      required: true,
    },
    accentColor: {
      type: String,
      default: "#85101F",
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
    collection: "rongon_banners", // Explicit collection name
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bannerSchema.virtual("id").get(function () {
  return this.bannerId || this._id.toString();
});

bannerSchema.index({ type: 1, displayOrder: 1 });

module.exports = mongoose.model("Banner", bannerSchema);
