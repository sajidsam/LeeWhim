const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, '../../src/data/mockProducts.js');
let code = fs.readFileSync(mockPath, 'utf8');

// 1. Add Category if not exists
if (!code.includes('"slug": "bags"')) {
  const catSearch = '    "badge": "Essential"\n  }\n];';
  const newCat = '    "badge": "Essential"\n  },\n  {\n    "id": "cat-9",\n    "name": "Luxury Bags",\n    "slug": "bags",\n    "image": "https://cdn.shopify.com/s/files/1/0916/6736/6162/files/d0783770-4668-4b3e-a3b5-2bbc89c2869f.jpg?v=1776151580",\n    "itemCount": 908,\n    "badge": "New Edition"\n  }\n];';
  code = code.replace(catSearch, newCat);
  console.log("Added Luxury Bags category");
}

// 2. Add Top 16 Bags into PRODUCTS array
const bagsPath = path.join(__dirname, '../data/bagsDataset.json');
const bags = JSON.parse(fs.readFileSync(bagsPath, 'utf8')).slice(0, 16);

// Format with id prod-bag-1 .. prod-bag-16
bags.forEach((b, idx) => {
  b.id = `prod-bag-${idx + 1}`;
});

const bagsJsonString = JSON.stringify(bags, null, 2).slice(1, -1).trim();

const target = '    "isFeatured": false\n  }\n];\n\nexport const TESTIMONIALS';
if (code.includes(target) && !code.includes('Croissant Chic Crossbody Bag')) {
  const replacement = '    "isFeatured": false\n  },\n' + bagsJsonString + '\n];\n\nexport const TESTIMONIALS';
  code = code.replace(target, replacement);
  fs.writeFileSync(mockPath, code, 'utf8');
  console.log('✅ Successfully added 16 bags to mockProducts.js!');
} else {
  fs.writeFileSync(mockPath, code, 'utf8');
  console.log('Category updated; checking products status.');
}
