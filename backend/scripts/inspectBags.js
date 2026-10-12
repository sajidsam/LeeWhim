const fs = require('fs');
const path = require('path');

// Read the fetched JSON from the step artifact or fetch live
const filePath = 'C:\\Users\\Sajidul Islam\\.gemini\\antigravity-ide\\brain\\d902677b-e5fc-4a8f-89c8-cee65c79b1fc\\.system_generated\\steps\\934\\content.md';
const raw = fs.readFileSync(filePath, 'utf8');

// The file has frontmatter headers then JSON on line 9
const jsonStart = raw.indexOf('{"products":');
if (jsonStart === -1) {
  console.error("JSON start not found");
  process.exit(1);
}

const data = JSON.parse(raw.slice(jsonStart));
console.log(`Successfully parsed ${data.products.length} products from thepatchee.com!`);

// Inspect first 3 products
data.products.slice(0, 3).forEach((p, idx) => {
  console.log(`\nBag #${idx + 1}: ${p.title}`);
  console.log(`- Type: ${p.product_type}`);
  console.log(`- Images count: ${p.images.length}`);
  console.log(`- Variants: ${p.variants.map(v => v.title).join(', ')}`);
  console.log(`- Price: ৳${p.variants[0]?.price} (Original: ৳${p.variants[0]?.compare_at_price})`);
});
