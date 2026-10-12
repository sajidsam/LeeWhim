import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  fetchProducts,
  fetchCategories,
  fetchBanners,
  fetchReviews,
} from "../services/api";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Live Database States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [promoBanners, setPromoBanners] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cart State (loaded from localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("rongon_cart") || localStorage.getItem("leeswhim_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
      return [];
    } catch {
      return [];
    }
  });

  // Wishlist State (loaded from localStorage)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("rongon_wishlist") || localStorage.getItem("leeswhim_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("all");

  // Floating Toast alert
  const [toast, setToast] = useState({ visible: false, message: "", type: "info" });

  // Fetch all initial data from MongoDB API
  const loadDatabaseData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [productsRes, categoriesRes, heroBannersRes, promosRes, reviewsRes] = await Promise.all([
        fetchProducts({ limit: 500 }), // retrieve catalogue from database
        fetchCategories(),
        fetchBanners("hero"),
        fetchBanners("promo"),
        fetchReviews(),
      ]);

      if (productsRes && productsRes.products) {
        setProducts(productsRes.products);
      }
      if (categoriesRes) setCategories(categoriesRes);
      if (heroBannersRes) setHeroSlides(heroBannersRes);
      if (promosRes) setPromoBanners(promosRes);
      if (reviewsRes) setReviews(reviewsRes);
    } catch (err) {
      console.error("Failed to fetch data from database:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDatabaseData();
  }, [loadDatabaseData]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem("rongon_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem("rongon_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (message, type = "info") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  const addToCart = (product, quantity = 1, selectedColor = null) => {
    const color = selectedColor || (product.colors && product.colors[0]) || "Default";
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedColor: color }];
      }
    });
    showToast(`Added "${product.name.slice(0, 24)}..." to cart!`, "cart");
  };

  const removeFromCart = (productId, selectedColor) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor))
      )
    );
    showToast("Item removed from cart", "info");
  };

  const updateQuantity = (productId, selectedColor, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor)) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.includes(product.id);
      if (exists) {
        showToast("Removed from Wishlist", "info");
        return prevWishlist.filter((id) => id !== product.id);
      } else {
        showToast("Saved to Wishlist ❤️", "wishlist");
        return [...prevWishlist, product.id];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const wishlistCount = wishlist.length;

  return (
    <ShopContext.Provider
      value={{
        products,
        setProducts,
        categories,
        heroSlides,
        promoBanners,
        reviews,
        isLoading,
        loadDatabaseData,
        cart,
        cartCount,
        cartSubtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        wishlistCount,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        searchQuery,
        setSearchQuery,
        activeCategoryFilter,
        setActiveCategoryFilter,
        toast,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
