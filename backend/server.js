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

// Root URL Health & Info Route (Prevents 'Cannot GET /' in browser)
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Rongon Luxury Women Backend API is running smoothly",
    timestamp: new Date().toISOString(),
  });
});

// Serverless Database Connection Middleware:
// Guarantees DB connection is active before processing any query, preventing 10s operation buffering timeouts
app.use(async (req, res, next) => {
  try {
    if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes("<CLUSTER_HOST>")) {
      await connectDB();
    }
    next();
  } catch (err) {
    console.error("Database connection middleware error:", err.message);
    res.status(500).json({
      success: false,
      message: "Database connection failed: " + err.message,
    });
  }
});

// ==========================================
// HIGH-SPEED IN-MEMORY CACHING LAYER
// ==========================================
const cache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 Minutes TTL

const getFromCache = (key) => {
  const cached = cache.get(key);
  if (!cached) return null;
  if (Date.now() > cached.expiresAt) {
    cache.delete(key);
    return null;
  }
  return cached.data;
};

const setInCache = (key, data, ttlMs = CACHE_TTL_MS) => {
  if (cache.size > 500) {
    const oldestKey = cache.keys().next().value;
    cache.delete(oldestKey);
  }
  cache.set(key, { data, expiresAt: Date.now() + ttlMs });
};

// ==========================================
// API ROUTES
// ==========================================

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Rongon Luxury Women Backend",
    cacheKeysCount: cache.size,
    timestamp: new Date().toISOString(),
    dbState: require("mongoose").connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// GET /api/categories - List all categories (Cached)
app.get("/api/categories", async (req, res) => {
  const cacheKey = "categories:all";
  const cachedData = getFromCache(cacheKey);
  if (cachedData) {
    res.setHeader("X-Cache", "HIT");
    return res.json(cachedData);
  }

  try {
    const rawCategories = await Category.find({ isActive: true }).sort({ displayOrder: 1 }).lean();
    const categories = rawCategories.map((c) => ({
      ...c,
      id: c.categoryId || c.slug || c._id,
    }));
    const responsePayload = { success: true, count: categories.length, data: categories };
    setInCache(cacheKey, responsePayload);
    res.setHeader("X-Cache", "MISS");
    res.json(responsePayload);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/banners - List hero slides and promos (Cached)
app.get("/api/banners", async (req, res) => {
  const { type } = req.query;
  const cacheKey = `banners:${type || "all"}`;
  const cachedData = getFromCache(cacheKey);
  if (cachedData) {
    res.setHeader("X-Cache", "HIT");
    return res.json(cachedData);
  }

  try {
    const query = { isActive: true };
    if (type) query.type = type;

    const rawBanners = await Banner.find(query).sort({ displayOrder: 1 }).lean();
    const banners = rawBanners.map((b) => ({
      ...b,
      id: b.bannerId || b._id,
    }));
    const responsePayload = { success: true, count: banners.length, data: banners };
    setInCache(cacheKey, responsePayload);
    res.setHeader("X-Cache", "MISS");
    res.json(responsePayload);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/products - Search, filter, sort, paginate (Optimized & Cached)
app.get("/api/products", async (req, res) => {
  const cacheKey = `products:${req.originalUrl}`;
  const cachedData = getFromCache(cacheKey);
  if (cachedData) {
    res.setHeader("X-Cache", "HIT");
    return res.json(cachedData);
  }

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
      limit = 20,
    } = req.query;

    const query = { isActive: true };

    if (categorySlug && categorySlug !== "all") {
      if (categorySlug === "kurti" || categorySlug === "kurtis") {
        query.categorySlug = { $in: ["salwar-kameez", "kameez", "tunic"] };
      } else {
        query.categorySlug = categorySlug;
      }
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

    // Sorting: default to mixed curated round-robin order
    let sortOptions = { featuredOrder: 1 };
    if (sort === "price-asc" || sort === "price-low") sortOptions = { price: 1 };
    else if (sort === "price-desc" || sort === "price-high") sortOptions = { price: -1 };
    else if (sort === "rating") sortOptions = { rating: -1 };
    else if (sort === "newest") sortOptions = { createdAt: -1 };
    else if (sort === "featured") sortOptions = { featuredOrder: 1 };

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = limit === "all" ? 0 : Math.max(0, parseInt(limit, 10) || 20);
    const skip = limitNum > 0 ? (pageNum - 1) * limitNum : 0;

    let queryPromise = Product.find(query).sort(sortOptions).lean();
    if (limitNum > 0) {
      queryPromise = queryPromise.skip(skip).limit(limitNum);
    }

    const [rawProducts, total] = await Promise.all([
      queryPromise,
      Product.countDocuments(query),
    ]);

    const products = rawProducts.map((p) => ({
      ...p,
      id: p.productId != null ? p.productId : p._id,
    }));

    const responsePayload = {
      success: true,
      count: products.length,
      total,
      currentPage: pageNum,
      totalPages: limitNum > 0 ? Math.ceil(total / limitNum) : 1,
      data: products,
    };

    setInCache(cacheKey, responsePayload);
    res.setHeader("X-Cache", "MISS");
    res.json(responsePayload);
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

// GET /api/reviews - Customer reviews & testimonials (Cached)
app.get("/api/reviews", async (req, res) => {
  const cacheKey = "reviews:all";
  const cachedData = getFromCache(cacheKey);
  if (cachedData) {
    res.setHeader("X-Cache", "HIT");
    return res.json(cachedData);
  }

  try {
    const rawReviews = await Review.find().sort({ createdAt: -1 }).lean();
    const reviews = rawReviews.map((r) => ({
      ...r,
      id: r.reviewId || r._id,
    }));
    const responsePayload = { success: true, count: reviews.length, data: reviews };
    setInCache(cacheKey, responsePayload);
    res.setHeader("X-Cache", "MISS");
    res.json(responsePayload);
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

// Start server when run directly (local development), or export app for Vercel Serverless
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Rongon Luxury Backend API running at: http://localhost:${PORT}`);
  });
}

module.exports = app;

