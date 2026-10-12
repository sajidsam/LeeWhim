const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Helper to normalize item IDs (MongoDB ObjectId vs productId vs categoryId vs bannerId)
 */
const normalizeItem = (item) => {
  if (!item) return item;
  return {
    ...item,
    id: item.id || item.productId || item.categoryId || item.bannerId || item.reviewId || item._id,
  };
};

/**
 * Fetch products with optional query filters (categorySlug, search, sort, limit, page)
 */
export const fetchProducts = async (params = {}) => {
  try {
    const query = new URLSearchParams();
    if (params.categorySlug && params.categorySlug !== "all") {
      query.append("categorySlug", params.categorySlug);
    }
    if (params.search) query.append("search", params.search);
    if (params.sort) query.append("sort", params.sort);
    if (params.limit) query.append("limit", params.limit);
    if (params.page) query.append("page", params.page);

    const queryString = query.toString();
    const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ""}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    const items = (json.data || []).map(normalizeItem);
    return {
      products: items,
      total: json.total || items.length,
      count: json.count || items.length,
      totalPages: json.totalPages || 1,
      currentPage: json.currentPage || 1,
    };
  } catch (err) {
    console.error("Failed to fetch products from database API:", err);
    return { products: [], total: 0, count: 0, totalPages: 1, currentPage: 1, error: err.message };
  }
};

/**
 * Fetch single product by numeric productId, sku, or slug
 */
export const fetchProductByIdentifier = async (identifier) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${identifier}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data ? normalizeItem(json.data) : null;
  } catch (err) {
    console.error(`Failed to fetch product ${identifier}:`, err);
    return null;
  }
};

/**
 * Fetch all active categories
 */
export const fetchCategories = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return (json.data || []).map(normalizeItem);
  } catch (err) {
    console.error("Failed to fetch categories from database API:", err);
    return [];
  }
};

/**
 * Fetch banners (hero slides, promo banners)
 */
export const fetchBanners = async (type = null) => {
  try {
    const url = type ? `${API_BASE_URL}/banners?type=${type}` : `${API_BASE_URL}/banners`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return (json.data || []).map(normalizeItem);
  } catch (err) {
    console.error(`Failed to fetch banners (${type}):`, err);
    return [];
  }
};

/**
 * Fetch customer reviews and testimonials
 */
export const fetchReviews = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return (json.data || []).map(normalizeItem);
  } catch (err) {
    console.error("Failed to fetch reviews from database API:", err);
    return [];
  }
};
