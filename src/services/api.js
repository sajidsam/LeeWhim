// Production Vercel Backend Target
const FALLBACK_BACKEND_URL = "https://rongon-backend.vercel.app/api";

// Resolves Vite environment variables with graceful fallback
const RAW_ENV_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "/api";

const PRIMARY_URL = RAW_ENV_URL.replace(/\/$/, "");

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
 * Robust fetcher with in-memory caching, content-type verification, and secure Vercel backend fallback
 */
const apiRequest = async (pathAndQuery, useCache = true) => {
  const cleanPath = pathAndQuery.startsWith("/") ? pathAndQuery : `/${pathAndQuery}`;

  // 1. Check in-memory client cache
  if (useCache) {
    const cached = getClientCache(cleanPath);
    if (cached) {
      return cached;
    }
  }

  let responseData = null;

  // 2. Try primary route (Vite Proxy /api or VITE_API_URL)
  try {
    const primaryTarget = PRIMARY_URL.startsWith("http")
      ? `${PRIMARY_URL}${cleanPath}`
      : `${PRIMARY_URL}${cleanPath}`;

    const res = await fetch(primaryTarget, {
      headers: {
        Accept: "application/json",
      },
    });

    const contentType = res.headers.get("content-type") || "";
    if (res.ok && contentType.includes("application/json")) {
      responseData = await res.json();
    }
  } catch (err) {
    // Primary failed, will try fallback below
  }

  // 3. Fallback to direct production Vercel backend if primary didn't succeed or returned HTML
  if (!responseData) {
    try {
      const fallbackTarget = `${FALLBACK_BACKEND_URL}${cleanPath}`;
      const resFallback = await fetch(fallbackTarget, {
        headers: {
          Accept: "application/json",
        },
      });

      const contentType = resFallback.headers.get("content-type") || "";
      if (resFallback.ok && contentType.includes("application/json")) {
        responseData = await resFallback.json();
      } else {
        throw new Error(`HTTP ${resFallback.status}: ${resFallback.statusText}`);
      }
    } catch (errFallback) {
      console.warn(`[API] Could not fetch ${cleanPath} from backend:`, errFallback.message);
      throw errFallback;
    }
  }

  // 4. Store in memory cache
  if (useCache && responseData) {
    setClientCache(cleanPath, responseData);
  }

  return responseData;
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
