const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const connectDB = require("./config/db");
const Product = require("./models/Product");
const Category = require("./models/Category");
const Banner = require("./models/Banner");
const Review = require("./models/Review");
const Order = require("./models/Order");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Attempt Database Connection if configured
if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes("<CLUSTER_HOST>")) {
  connectDB().catch((err) => {
    console.warn("⚠️ Running in offline/fallback mode until database connection is established:", err.message);
  });
}

// ==========================================
// API ROUTES
// ==========================================

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Rongon Luxury Women Backend",
    timestamp: new Date().toISOString(),
    dbState: require("mongoose").connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// GET /api/categories - List all categories
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ displayOrder: 1 });
    res.json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/banners - List hero slides and promos
app.get("/api/banners", async (req, res) => {
  try {
    const { type } = req.query;
    const query = { isActive: true };
    if (type) query.type = type;

    const banners = await Banner.find(query).sort({ displayOrder: 1 });
    res.json({ success: true, count: banners.length, data: banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/products - Search, filter, sort, paginate
app.get("/api/products", async (req, res) => {
  try {
    const {
      category,
      categorySlug,
      subCategory,
      minPrice,
      maxPrice,
      search,
      sort,
      page = 1,
      limit = 200,
    } = req.query;

    const query = { isActive: true };

    if (categorySlug && categorySlug !== "all") {
      query.categorySlug = categorySlug;
    }
    if (subCategory) {
      query.subCategory = new RegExp(subCategory, "i");
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search && search.trim()) {
      const cleanSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const searchRegex = new RegExp(cleanSearch, "i");
      query.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { subCategory: searchRegex },
        { fabric: searchRegex },
        { sku: searchRegex },
      ];
    }

    // Sorting
    let sortOptions = { createdAt: -1 };
    if (sort === "price-asc" || sort === "price-low") sortOptions = { price: 1 };
    else if (sort === "price-desc" || sort === "price-high") sortOptions = { price: -1 };
    else if (sort === "rating") sortOptions = { rating: -1 };
    else if (sort === "newest") sortOptions = { createdAt: -1 };

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = limit === "all" ? 0 : Math.max(0, parseInt(limit, 10) || 200);
    const skip = limitNum > 0 ? (pageNum - 1) * limitNum : 0;

    let queryPromise = Product.find(query).sort(sortOptions);
    if (limitNum > 0) {
      queryPromise = queryPromise.skip(skip).limit(limitNum);
    }

    const [products, total] = await Promise.all([
      queryPromise,
      Product.countDocuments(query),
    ]);

    res.json({
      success: true,
      count: products.length,
      total,
      currentPage: pageNum,
      totalPages: limitNum > 0 ? Math.ceil(total / limitNum) : 1,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/products/:identifier - Single product by SKU or slug or numeric productId
app.get("/api/products/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;
    let query = { slug: identifier };

    if (!isNaN(identifier)) {
      query = { productId: Number(identifier) };
    } else if (identifier.startsWith("skd") || identifier.startsWith("SKD")) {
      query = { sku: identifier.toUpperCase() };
    }

    const product = await Product.findOne(query);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/reviews - Customer reviews & testimonials
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/orders - Create new order (future integration)
app.post("/api/orders", async (req, res) => {
  try {
    const { customer, items, subtotal, deliveryFee, totalAmount, paymentMethod } = req.body;

    const orderNumber = `RNG-${Date.now().toString().slice(-6)}`;

    const newOrder = new Order({
      orderNumber,
      customer,
      items,
      subtotal,
      deliveryFee,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
      orderStatus: "Placed",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Rongon Luxury Backend API running at: http://localhost:${PORT}`);
});
