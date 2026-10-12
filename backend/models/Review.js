const mongoose = require("mongoose");

/**
 * Review Schema for Rongon Luxury E-Commerce
 * Stores verified customer ratings, testimonials, and review feedback.
 */
const reviewSchema = new mongoose.Schema(
  {
    reviewId: {
      type: String,
      unique: true,
      index: true,
    },
    productId: {
      type: Number,
      index: true,
    },
    productName: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      default: "Dhaka, Bangladesh",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: true,
    },
    isFeaturedTestimonial: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "rongon_reviews",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.virtual("id").get(function () {
  return this.reviewId || this._id.toString();
});

module.exports = mongoose.model("Review", reviewSchema);
