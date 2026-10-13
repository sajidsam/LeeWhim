// Resolves API base URL strictly from environment variable or relative /api
const PRIMARY_URL = (
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "/api"
).replace(/\/$/, "");

// ==========================================
// CLIENT-SIDE IN-MEMORY CACHE
// ==========================================
const clientCache = new Map();
const CLIENT_CACHE_TTL_MS = 3 * 60 * 1000; // 3 minutes TTL

const getClientCache = (key) => {
  const cached = clientCache.get(key);
  if (!cached) return null;
  if (Date.now() > cached.expiresAt) {
    clientCache.delete(key);
    return null;
  }
  return cached.data;
};

const setClientCache = (key, data, ttlMs = CLIENT_CACHE_TTL_MS) => {
  if (clientCache.size > 200) {
    const oldestKey = clientCache.keys().next().value;
    clientCache.delete(oldestKey);
  }
  clientCache.set(key, { data, expiresAt: Date.now() + ttlMs });
};

/**
 * Robust fetcher with in-memory caching, content-type verification, and retry on serverless cold starts
 */
const apiRequest = async (pathAndQuery, useCache = true, retries = 1) => {
  const cleanPath = pathAndQuery.startsWith("/") ? pathAndQuery : `/${pathAndQuery}`;

  // 1. Check in-memory client cache
  if (useCache) {
    const cached = getClientCache(cleanPath);
    if (cached) {
      return cached;
    }
  }

  // 2. Fetch using configured PRIMARY_URL with automatic retry for cold starts
  const targetUrl = `${PRIMARY_URL}${cleanPath}`;
  try {
    const res = await fetch(targetUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error(`Expected JSON response but received ${contentType}`);
    }

    const responseData = await res.json();

    // Store in memory cache
    if (useCache && responseData) {
      setClientCache(cleanPath, responseData);
    }

    return responseData;
  } catch (err) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return apiRequest(pathAndQuery, useCache, retries - 1);
    }
    throw err;
  }
};

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
export const fetchProducts = async (params = {}, useCache = true) => {
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
    const endpoint = `/products${queryString ? `?${queryString}` : ""}`;
    const json = await apiRequest(endpoint, useCache);
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
    const json = await apiRequest(`/products/${identifier}`);
    return json.data ? normalizeItem(json.data) : null;
  } catch (err) {
    console.error(`Failed to fetch product ${identifier}:`, err);
    return null;
  }
};

/**
 * Fetch all active categories
 */
export const fetchCategories = async (useCache = true) => {
  try {
    const json = await apiRequest(`/categories`, useCache);
    return (json.data || []).map(normalizeItem);
  } catch (err) {
    console.error("Failed to fetch categories from database API:", err);
    return [];
  }
};

/**
 * Fetch banners (hero slides, promo banners)
 */
export const fetchBanners = async (type = null, useCache = true) => {
  try {
    const endpoint = type ? `/banners?type=${type}` : `/banners`;
    const json = await apiRequest(endpoint, useCache);
    return (json.data || []).map(normalizeItem);
  } catch (err) {
    console.error(`Failed to fetch banners (${type}):`, err);
    return [];
  }
};

/**
 * Fetch customer reviews and testimonials
 */
export const fetchReviews = async (useCache = true) => {
  try {
    const json = await apiRequest(`/reviews`, useCache);
    return (json.data || []).map(normalizeItem);
  } catch (err) {
    console.error("Failed to fetch reviews from database API:", err);
    return [];
  }
};

/**
 * Create Cash on Delivery Order
 */
export const createOrder = async (orderData) => {
  const targetUrl = `${PRIMARY_URL}/orders`;
  const res = await fetch(targetUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || `Failed to create order (HTTP ${res.status})`);
  }
  return await res.json();
};

/**
 * Initiate SSLCommerz Secure Payment Session
 */
export const initiateSSLCommerzPayment = async (orderData) => {
  const targetUrl = `${PRIMARY_URL}/payment/sslcommerz/init`;
  const res = await fetch(targetUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || `Payment initialization failed (HTTP ${res.status})`);
  }
  return await res.json();
};

/**
 * Fetch Order Details by Order Number
 */
export const fetchOrderDetails = async (orderNumber) => {
  const targetUrl = `${PRIMARY_URL}/orders/${orderNumber}`;
  const res = await fetch(targetUrl, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    return null;
  }
  return await res.json();
};
