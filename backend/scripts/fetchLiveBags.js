async function fetchBags() {
  try {
    const url = 'https://thepatchee.com/collections/women/products.json?limit=50';
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    const data = await res.json();
    console.log(`Fetched ${data.products.length} products from ${url}`);

    data.products.slice(0, 5).forEach((p, idx) => {
      console.log(`\n[${idx + 1}] ${p.title}`);
      console.log(`  Handle: ${p.handle}`);
      console.log(`  Type: ${p.product_type}`);
      console.log(`  Images: ${p.images?.length || 0}`);
      console.log(`  Price: BDT ${p.variants[0]?.price} (was BDT ${p.variants[0]?.compare_at_price})`);
      console.log(`  Variants: ${p.variants?.map(v => v.title).join(', ')}`);
    });
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

fetchBags();
