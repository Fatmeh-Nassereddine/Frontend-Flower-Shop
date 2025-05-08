import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

import {
  addProductToCart,
  getUserCart,
  updateItemQuantity,
  removeProductFromCart,
  clearUserCart,
} from "../../api/apiCart";

import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../../api/apiFavorite";

import { getUser } from "../../api/auth";

export const ShopContext = createContext({
  cartItems: [],
  likedItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  toggleLike: () => {},
  clearCart: () => {},
  updateCartItemQuantity: () => {},
  refreshShopData: () => {},
  loading: false,
});

export function ShopProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Persist cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch user and cart/favorites
  const fetchUserAndData = async () => {
    setLoading(true);
    try {
      const fetchedUser = await getUser();
      if (fetchedUser?.id) {
        setUser(fetchedUser);
        setUserId(fetchedUser.id);

        const [cartData, favoritesData] = await Promise.all([
          getUserCart(fetchedUser.id),
          getFavorites(),
        ]);

        setCartItems(cartData?.items || []);
        setLikedItems(favoritesData.map((f) => f.product_id));
      } else {
        setUser(null);
        setUserId(null);
        setCartItems([]);
        setLikedItems([]);
      }
    } catch (error) {
      toast.error("Failed to load cart or favorites.");
      console.error("ShopProvider error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAndData();
  }, []);

  useEffect(() => {
    if (user?.id) {
      const fetchCart = async () => {
        const cartData = await getUserCart(user.id);
        setCartItems(cartData?.items || []);
      };
      fetchCart();
    }
  }, [user]);

  const refreshShopData = () => {
    fetchUserAndData();
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!userId) {
      toast.error("Please log in to add items.");
      return;
    }
    try {
      await addProductToCart(userId, productId, quantity);
      const cartData = await getUserCart(userId);
      setCartItems(cartData?.items || []);
      toast.success("Added to cart.");
    } catch {
      toast.error("Failed to add to cart.");
    }
  };

  const removeFromCart = async (cart_item_id) => {
    try {
      await removeProductFromCart(cart_item_id);
      const cartData = await getUserCart(userId);
      setCartItems(cartData?.items || []);
      toast.success("Removed from cart.");
    } catch {
      toast.error("Failed to remove from cart.");
    }
  };

  const updateCartItemQuantity = async (cart_item_id, quantity) => {
    try {
      await updateItemQuantity(cart_item_id, quantity);
      const cartData = await getUserCart(userId);
      setCartItems(cartData?.items || []);
      toast.success("Quantity updated.");
    } catch {
      toast.error("Failed to update quantity.");
    }
  };

  const clearCart = async () => {
    try {
      await clearUserCart(userId);
      setCartItems([]);
      toast.success("Cart cleared.");
    } catch {
      toast.error("Failed to clear cart.");
    }
  };

  const toggleLike = async (productId) => {
    if (!userId) {
      toast.error("Please log in to like items.");
      return;
    }

    try {
      const alreadyLiked = likedItems.includes(productId);
      if (alreadyLiked) {
        await removeFavorite(productId);
        setLikedItems((prev) => prev.filter((id) => id !== productId));
        toast.success("Removed from favorites.");
      } else {
        await addFavorite(productId);
        setLikedItems((prev) => [...prev, productId]);
        toast.success("Added to favorites.");
      }
    } catch (error) {
      toast.error("Failed to update favorites.");
      console.error("toggleLike error:", error);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        likedItems,
        addToCart,
        removeFromCart,
        setCartItems,
        toggleLike,
        clearCart,
        updateCartItemQuantity,
        refreshShopData,
        loading,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

// Hook
export const useShop = () => useContext(ShopContext);




