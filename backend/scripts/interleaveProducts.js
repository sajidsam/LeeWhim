const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");
const Product = require("../models/Product");

async function run() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(process.env.MONGODB_URI);

  const all = await Product.find({ isActive: true }).select("_id categorySlug name").lean();
  console.log("Found", all.length, "active products.");

  // Group by categorySlug
  const groups = {};
  for (const p of all) {
    if (!groups[p.categorySlug]) groups[p.categorySlug] = [];
    groups[p.categorySlug].push(p);
  }

  // Interleave round-robin across all categories
  const interleaved = [];
  let hasMore = true;
  let idx = 0;
  const categories = Object.keys(groups);

  while (hasMore) {
    hasMore = false;
    for (const cat of categories) {
      if (idx < groups[cat].length) {
        interleaved.push(groups[cat][idx]);
        hasMore = true;
      }
    }
    idx++;
  }

  console.log("Calculated interleaved order for", interleaved.length, "items.");

  // Prepare bulk operations
  const bulkOps = interleaved.map((item, order) => ({
    updateOne: {
      filter: { _id: item._id },
      update: { $set: { featuredOrder: order + 1 } },
    },
  }));

  const res = await Product.bulkWrite(bulkOps);
  console.log("✅ Successfully updated featuredOrder on", res.modifiedCount, "products!");

  // Preview first 15 items
  console.log("\n--- Preview of First 15 Mixed Products in Women Collection ---");
  const sample = await Product.find({ isActive: true }).sort({ featuredOrder: 1 }).limit(15).lean();
  sample.forEach((p, i) => {
    console.log(`${i + 1}. [${p.categorySlug.toUpperCase()}] ${p.name} (BDT ${p.price})`);
  });

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
