const fs = require('fs');
const path = require('path');

const mockProductsPath = path.join(__dirname, '../../src/data/mockProducts.js');
const content = fs.readFileSync(mockProductsPath, 'utf8');

const parseArray = (str) => {
  const clean = str
    .replace(/\bbannerImg\b/g, '"/src/assets/banner.png"')
    .replace(/\bbanner2Img\b/g, '"/src/assets/banner2.png"')
    .replace(/\bbanner3Img\b/g, '"/src/assets/banner3.png"');
  return JSON.parse(clean);
};

const categories = parseArray(content.match(/export const CATEGORIES = (\[[\s\S]*?\]);/)[1]);
const heroSlides = parseArray(content.match(/export const HERO_SLIDES = (\[[\s\S]*?\]);/)[1]);
const products = parseArray(content.match(/export const PRODUCTS = (\[[\s\S]*?\]);/)[1]);
const testimonials = parseArray(content.match(/export const TESTIMONIALS = (\[[\s\S]*?\]);/)[1]);
const promoBanners = parseArray(content.match(/export const PROMO_BANNERS = (\[[\s\S]*?\]);/)[1]);

const dataset = {
  categories,
  heroSlides,
  products,
  testimonials,
  promoBanners
};

const outputDir = path.join(__dirname, '../data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(path.join(outputDir, 'seedDataset.json'), JSON.stringify(dataset, null, 2), 'utf8');

console.log('✅ Created backend/data/seedDataset.json successfully:');
console.log(`- Categories: ${categories.length}`);
console.log(`- Hero Slides: ${heroSlides.length}`);
console.log(`- Products: ${products.length}`);
console.log(`- Testimonials: ${testimonials.length}`);
console.log(`- Promo Banners: ${promoBanners.length}`);
