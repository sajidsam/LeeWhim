import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS } from "../data/mockProducts";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Cart State (saved to localStorage for real experience)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("leeswhim_cart");
      return saved ? JSON.parse(saved) : [
        { product: PRODUCTS[0], quantity: 1, selectedColor: PRODUCTS[0].colors[0] },
        { product: PRODUCTS[1], quantity: 1, selectedColor: PRODUCTS[1].colors[0] },
      ];
    } catch {
      return [
        { product: PRODUCTS[0], quantity: 1, selectedColor: PRODUCTS[0].colors[0] },
        { product: PRODUCTS[1], quantity: 1, selectedColor: PRODUCTS[1].colors[0] },
      ];
    }
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("leeswhim_wishlist");
      return saved ? JSON.parse(saved) : [PRODUCTS[0].id, PRODUCTS[3].id];
    } catch {
      return [PRODUCTS[0].id, PRODUCTS[3].id];
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

  useEffect(() => {
    try {
      localStorage.setItem("leeswhim_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("leeswhim_wishlist", JSON.stringify(wishlist));
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
