import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { addProductToCart, getUserCart } from "../../api/apiCart";  // Ensure API methods are imported

export const ShopContext = createContext({
  cartItems: [],
  
  likedItems: [],
  
  addToCart: () => {},
  removeFromCart: () => {},
  toggleLike: () => {},
  clearCart: () => {},
  updateCartItemQuantity: () => {},
});

export function ShopProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);

  const fetchCart = async (userId) => {
    const cartData = await getUserCart(userId);  // Get cart from the API
    setCartItems(cartData.items);
  };

  const addToCart = async (userId, id) => {
    // Add to local cart first
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { id, quantity: 1 }];
      }
    });

    // Now persist the cart changes in the API
    try {
      await addProductToCart(userId, id);  // Add to API
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to update cart on server.");
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartItemQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared!");
  };

  const toggleLike = (id) => {
    setLikedItems((prev) => {
      if (prev.includes(id)) {
        toast.success("Removed from favorites!");
        return prev.filter((item) => item !== id);
      }
      toast.success("Added to favorites!");
      return [...prev, id];
    });
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
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);
