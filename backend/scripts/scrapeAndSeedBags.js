const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Product = require('../models/Product');
const Category = require('../models/Category');

// Helper to strip HTML tags from body_html
function cleanHtml(html) {
  if (!html) return "Premium handcrafted luxury bag designed for everyday elegance and durability.";
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > 20 ? text.slice(0, 300) : "Premium handcrafted luxury bag designed for everyday elegance and durability.";
}

// Clean SubCategory
function formatSubCategory(type) {
  if (!type) return "Shoulder Bag";
  const cleaned = type.replace(/^Women_Everyday Bags_|^Women_|^Women's /i, '').trim();
  return cleaned || "Shoulder Bag";
}

// Generate URL slug
function generateSlug(title, id) {
  return `${title}-${id}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

async function scrapeAllBags() {
  console.log("=================================================");
  console.log("👜 SCRAPING WOMEN'S BAGS FROM THEPATCHEE.COM 👜");
  console.log("=================================================");

  let allProducts = [];
  let page = 1;

  while (true) {
    console.log(`⏳ Fetching page ${page}...`);
    try {
      const res = await fetch(`https://thepatchee.com/collections/women/products.json?limit=50&page=${page}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      const data = await res.json();
      if (!data.products || data.products.length === 0) {
        console.log(`✅ Completed fetching all pages at page ${page - 1}!`);
        break;
      }
      allProducts.push(...data.products);
      console.log(`   Fetched ${data.products.length} products. (Running total: ${allProducts.length})`);
      page++;
      // Polite delay between requests
      await new Promise(r => setTimeout(r, 400));
    } catch (err) {
      console.error(`❌ Error on page ${page}:`, err.message);
      break;
    }
  }

  console.log(`\n🎉 Total bags fetched: ${allProducts.length}`);

  // Transform into Rongon Product schema
  const transformedBags = allProducts.map((p, index) => {
    const variant = p.variants && p.variants[0] ? p.variants[0] : {};
    const price = Math.round(parseFloat(variant.price) || 1500);
    const originalPrice = Math.round(parseFloat(variant.compare_at_price) || Math.round(price * 1.35));
    const discountPercent = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
    const discount = discountPercent > 0 ? `${discountPercent}% OFF` : "0% OFF";

    const images = (p.images || []).map(img => img.src);
    const primaryImage = images[0] || "https://thepatchee.com/cdn/shop/collections/5_2.webp";
    const hoverImage = images[1] || primaryImage;

    // Badges
    const badges = [];
    if (index % 3 === 0) badges.push("BESTSELLER");
    else if (index % 5 === 0) badges.push("TRENDING");
    else if (index % 4 === 0) badges.push("NEW");

    // Colors from variants
    const colors = p.variants ? [...new Set(p.variants.map(v => v.title).filter(t => t && t !== 'Default Title'))] : [];

    const subCategory = formatSubCategory(p.product_type);
    const slug = generateSlug(p.title, p.id);

    return {
      productId: Number(p.id) || (900000 + index),
      sku: variant.sku ? `BAG-${variant.sku}` : `BAG-${p.id}`,
      name: p.title,
      slug,
      category: "Bags & Handbags",
      subCategory: subCategory,
      categorySlug: "bags",
      price,
      originalPrice,
      discount,
      currency: "BDT",
      rating: +(4.6 + (index % 5) * 0.1).toFixed(1),
      reviewCount: 15 + (index % 40),
      inStock: p.variants ? p.variants.some(v => v.available) : true,
      stockCount: 12,
      lowStockThreshold: 3,
      badges,
      image: primaryImage,
      hoverImage,
      galleryImages: images.length > 0 ? images : [primaryImage],
      description: cleanHtml(p.body_html),
      shortDescription: `Authentic Rongon Luxury ${p.title}. Crafted with high-grade leatherette, durable hardware, and functional compartments.`,
      fabric: "Premium PU Leather",
      workType: "Embossed / Handcrafted",
      colors: colors.length > 0 ? colors : ["Brown", "Black"],
      sizes: ["Standard"],
      careInstructions: "Wipe clean with a soft dry cloth. Store in dust bag away from direct sunlight.",
      isNewArrival: index < 20,
      isBestDeal: discountPercent >= 40,
      isFeatured: index < 15,
      isActive: true,
    };
  });

  // Save to JSON
  const outputPath = path.join(__dirname, '../data/bagsDataset.json');
  fs.writeFileSync(outputPath, JSON.stringify(transformedBags, null, 2), 'utf8');
  console.log(`💾 Saved ${transformedBags.length} structured bags to: ${outputPath}`);

  // Seed into live MongoDB Atlas database
  if (process.env.MONGODB_URI) {
    try {
      console.log(`\n⏳ Connecting to live MongoDB Atlas database 'Rongon'...`);
      await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || "Rongon" });
      console.log(`✅ Connected to MongoDB Atlas!`);

      // Upsert or insert bags into rongon_products
      console.log(`⏳ Seeding bags into collection 'rongon_products'...`);
      
      // Delete existing bags to avoid duplicate sku error if re-running
      const deleteResult = await Product.deleteMany({ categorySlug: "bags" });
      console.log(`   Removed ${deleteResult.deletedCount} previous bag entries.`);

      const insertResult = await Product.insertMany(transformedBags);
      console.log(`✅ Successfully seeded ${insertResult.length} bags into 'rongon_products' collection!`);

      // Update or add "Luxury Bags" category in rongon_categories
      const bagCategory = {
        categoryId: "cat-bags",
        name: "Luxury Bags",
        slug: "bags",
        image: transformedBags[0]?.image || "https://thepatchee.com/cdn/shop/collections/5_2.webp",
        itemCount: transformedBags.length,
        badge: "New Edition",
        displayOrder: 9,
        isActive: true,
      };

      await Category.findOneAndUpdate({ slug: "bags" }, bagCategory, { upsert: true, new: true });
      console.log(`✅ Added/Updated 'Luxury Bags' category in 'rongon_categories' collection!`);

      const totalProductsCount = await Product.countDocuments();
      console.log(`\n🎉 Total products now in live 'rongon_products': ${totalProductsCount}`);

      await mongoose.disconnect();
    } catch (dbErr) {
      console.error("❌ Database seeding error:", dbErr);
    }
  }

  return transformedBags;
}

scrapeAllBags();
