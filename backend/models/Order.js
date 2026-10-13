const mongoose = require("mongoose");

/**
 * Order Schema for Rongon Luxury E-Commerce
 * Future-proof schema supporting checkout, payment gateways (bKash/Nagad/Cards/COD),
 * multi-item carts, delivery addresses, and fulfillment tracking.
 */
const orderItemSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
  },
  size: {
    type: String,
    default: "M",
  },
  color: {
    type: String,
    default: "Default",
  },
  total: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true, lowercase: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true, default: "Dhaka" },
      postalCode: { type: String },
      notes: { type: String },
    },
    items: [orderItemSchema],
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryFee: {
      type: Number,
      default: 70, // Standard delivery within Dhaka
      min: 0,
    },
    discountAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "BDT",
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "bKash", "Nagad", "SSLCommerz", "Card"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
      index: true,
    },
    paymentTransactionId: {
      type: String,
    },
    sslcommerzSessionKey: {
      type: String,
    },
    paymentDetails: {
      type: mongoose.Schema.Types.Mixed,
    },
    orderStatus: {
      type: String,
      enum: ["Placed", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Placed",
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "rongon_orders",
  }
);

orderSchema.index({ "customer.email": 1, createdAt: -1 });
orderSchema.index({ "customer.phone": 1 });
orderSchema.index({ orderStatus: 1, createdAt: -1 });

module.exports = mongoose.model("Order", orderSchema);
