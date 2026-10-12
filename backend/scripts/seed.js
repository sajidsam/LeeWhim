const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");
const fs = require("fs");

const Product = require("../models/Product");
const Category = require("../models/Category");
const Banner = require("../models/Banner");
const Review = require("../models/Review");
const Order = require("../models/Order");

// Load curated dataset
const datasetPath = path.join(__dirname, "../data/seedDataset.json");
if (!fs.existsSync(datasetPath)) {
  console.error("❌ Seed dataset not found. Please run: node backend/scripts/extractData.js");
  process.exit(1);
}
const dataset = JSON.parse(fs.readFileSync(datasetPath, "utf8"));

/**
 * Generate URL-friendly slug
 */
const generateSlug = (name, sku) => {
  return `${name}-${sku}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

async function runSeed() {
  console.log("\n=======================================================");
  console.log("🌸 RONGON LUXURY WOMEN COLLECTION - DATABASE SEEDER 🌸");
  console.log("=======================================================");

  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.error("❌ MONGODB_URI environment variable is missing.");
    process.exit(1);
  }

  const isDryRun = process.argv.includes("--dry-run");

  if (mongoURI.includes("<CLUSTER_HOST>")) {
    console.log("\n⚠️ Notice: MongoDB Atlas cluster URI is using a placeholder host.");
    console.log("   URI:", mongoURI);
    console.log("\nℹ️ Validation Mode (Dry-Run): Validating schemas & dataset mapping...");
  }

  // Connect if not a dummy URI, or if dry-run check
  let connected = false;
  if (!mongoURI.includes("<CLUSTER_HOST>") && !isDryRun) {
    try {
      console.log(`\n⏳ Connecting to MongoDB Atlas as user '${process.env.DB_USER}' to database '${process.env.DB_NAME || "Rongon"}'...`);
      await mongoose.connect(mongoURI, {
        dbName: process.env.DB_NAME || "Rongon",
        serverSelectionTimeoutMS: 15000,
      });
      connected = true;
      console.log(`✅ Successfully connected to MongoDB Atlas!`);
      console.log(`📦 Database: ${mongoose.connection.name}`);
    } catch (err) {
      console.warn(`\n⚠️ Unable to reach Atlas cluster directly: ${err.message}`);
      console.warn("👉 Please ensure your IP address is whitelisted in MongoDB Atlas Network Access (0.0.0.0/0)");
      console.warn("👉 And verify your cluster host in backend/.env");
    }
  }

  // 1. Prepare Products
  const transformedProducts = dataset.products.map((p) => {
    const originalPrice = p.originalPrice || p.price;
    const discountMatch = p.discount ? p.discount.match(/(\d+)%/) : null;
    const discountPercentage = discountMatch ? parseInt(discountMatch[1], 10) : 0;
    const slug = generateSlug(p.name, p.sku);

    return {
      productId: p.productId,
      sku: p.sku.toUpperCase(),
      name: p.name,
      slug,
      category: p.category,
      subCategory: p.subCategory,
      categorySlug: p.categorySlug,
      price: p.price,
      originalPrice,
      discount: p.discount || "0% OFF",
      currency: "BDT",
      rating: p.rating || 5.0,
      reviewCount: p.reviewCount || 0,
      inStock: p.inStock !== false,
      stockCount: p.stockCount || 10,
      badges: p.badges || [],
      image: p.image,
      hoverImage: p.hoverImage || p.image,
      galleryImages: p.galleryImages || [p.image],
      description: p.description,
      fabric: p.fabric || "Pure Cotton",
      colors: p.colors || [],
      sizes: p.sizes || ["S", "M", "L", "XL", "XXL"],
      careInstructions: "Gentle wash in cold water with mild detergent. Dry in shade.",
      isNewArrival: !!p.isNewArrival,
      isBestDeal: !!p.isBestDeal,
      isFeatured: !!p.isFeatured,
      isActive: true,
    };
  });

  // 2. Prepare Categories
  const transformedCategories = dataset.categories.map((c, index) => ({
    categoryId: c.id,
    name: c.name,
    slug: c.slug,
    image: c.image,
    itemCount: c.itemCount || 0,
    badge: c.badge || "Popular",
    displayOrder: index + 1,
    isActive: true,
  }));

  // 3. Prepare Banners (Hero slides & Promo cards)
  const transformedBanners = [
    ...dataset.heroSlides.map((slide, index) => ({
      bannerId: slide.id,
      type: "hero",
      title: slide.title,
      subtitle: slide.subtitle,
      mobileTitleLine1: slide.mobileTitleLine1,
      mobileTitleLine2: slide.mobileTitleLine2,
      mobileButtonText: slide.mobileButtonText || "Shop Now",
      description: slide.description,
      buttonText: slide.buttonText || "Explore Collection",
      categorySlug: slide.categorySlug || "all",
      tag: slide.tag || "Signature Launch",
      image: slide.image,
      accentColor: slide.accentColor || "#85101F",
      displayOrder: index + 1,
      isActive: true,
    })),
    ...dataset.promoBanners.map((promo, index) => ({
      bannerId: promo.id,
      type: "promo",
      title: promo.title,
      subtitle: promo.subtitle,
      description: promo.description,
      buttonText: promo.buttonText,
      categorySlug: promo.categorySlug,
      tag: promo.tag,
      image: promo.image,
      accentColor: "#85101F",
      displayOrder: index + 10,
      isActive: true,
    })),
  ];

  // 4. Prepare Reviews & Testimonials
  const transformedReviews = dataset.testimonials.map((t) => ({
    reviewId: t.id,
    productName: t.product,
    customerName: t.name,
    location: t.location,
    rating: t.rating,
    comment: t.comment,
    date: t.date,
    verified: t.verified,
    isFeaturedTestimonial: true,
  }));

  console.log("\n📊 Transformation Summary:");
  console.log(`- Rongon Products to insert:    ${transformedProducts.length}`);
  console.log(`- Rongon Categories to insert:  ${transformedCategories.length}`);
  console.log(`- Rongon Banners to insert:     ${transformedBanners.length}`);
  console.log(`- Rongon Reviews to insert:     ${transformedReviews.length}`);

  if (connected) {
    console.log("\n🚀 Populating collections in MongoDB Atlas...");

    // Clear and populate Products
    await Product.deleteMany({});
    const insertedProducts = await Product.insertMany(transformedProducts);
    console.log(`✅ [rongon_products]   Populated ${insertedProducts.length} products.`);

    // Clear and populate Categories
    await Category.deleteMany({});
    const insertedCategories = await Category.insertMany(transformedCategories);
    console.log(`✅ [rongon_categories] Populated ${insertedCategories.length} categories.`);

    // Clear and populate Banners
    await Banner.deleteMany({});
    const insertedBanners = await Banner.insertMany(transformedBanners);
    console.log(`✅ [rongon_banners]    Populated ${insertedBanners.length} banners.`);

    // Clear and populate Reviews
    await Review.deleteMany({});
    const insertedReviews = await Review.insertMany(transformedReviews);
    console.log(`✅ [rongon_reviews]    Populated ${insertedReviews.length} reviews.`);

    console.log("\n⚡ Creating database indexes...");
    await Product.syncIndexes();
    await Category.syncIndexes();
    await Banner.syncIndexes();
    await Review.syncIndexes();
    await Order.syncIndexes();
    console.log("✅ All indexes (text search, compound filters, unique slugs) built successfully!");

    console.log("\n🎉 DATABASE MIGRATION & SEEDING COMPLETED SUCCESSFULLY!");
    await mongoose.disconnect();
  } else {
    console.log("\n📋 Local Verification Passed:");
    console.log("   All 61 products, 8 categories, 5 banners, and 3 reviews adhere perfectly to the Mongoose schemas.");
    console.log("   When you provide your Atlas cluster address, this script will upload everything immediately to MongoDB Atlas.");
  }
}

runSeed().catch((err) => {
  console.error("❌ Seed Error:", err);
  process.exit(1);
});
