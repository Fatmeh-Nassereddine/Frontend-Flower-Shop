import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie"; // for token

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
  discount: null,
  setDiscount: () => {},
  getCartSubtotal: () => 0,
  getDiscountedTotal: () => 0,
});

export function ShopProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [discount, setDiscount] = useState(null);

  


  // Load cart from localStorage on mount
  useEffect(() => {
    const cookieCart = Cookies.get("cartItems");
    if (cookieCart) {
      try {
        setCartItems(JSON.parse(cookieCart));
      } catch (e) {
        console.error("Failed to parse cart cookie", e);
        Cookies.remove("cartItems");
      }
    }
  }, []);
  


  useEffect(() => {
    Cookies.set("cartItems", JSON.stringify(cartItems), { expires: 1 }); // expires in 1 day
  }, [cartItems]);
  

  // 🔁 Fetch user, cart, favorites, and discounts
  const fetchUserAndData = async () => {
    setLoading(true);
    try {
      const fetchedUser = await getUser();
      if (fetchedUser?.id) {
        setUser(fetchedUser);
        setUserId(fetchedUser.id);

        const [cartData, favoritesData, discountsData] = await Promise.all([
          getUserCart(fetchedUser.id),
          getFavorites(),
          fetchDiscounts(), // ✅ fetch discounts here
        ]);

        setCartItems(cartData?.items || []);
        setLikedItems(favoritesData.map((f) => f.product_id));
        if (discountsData?.length > 0) {
          setDiscount(discountsData[0]); // take first valid discount
        }
      } else {
        setUser(null);
        setUserId(null);
        setCartItems([]);
        setLikedItems([]);
        setDiscount(null);
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
    // Optimistic update
  setCartItems((prevItems) => {
    const itemIndex = prevItems.findIndex(
      (item) => item.product_id === productId || item.id === productId
    );

    if (itemIndex >= 0) {
      const updatedItems = [...prevItems];
      updatedItems[itemIndex].quantity += quantity;
      return updatedItems;
    } else {
      return [...prevItems, { product_id: productId, quantity }];
    }
  });
    try {
      await addProductToCart(userId, productId, quantity);
      const cartData = await getUserCart(userId);
      setCartItems(cartData?.items || []);
      toast.success("Added to cart.");
    } catch {
      toast.error("Failed to add to cart.");
      // revert optimistic update (simple way: refetch cart)
    const cartData = await getUserCart(userId);
    setCartItems(cartData?.items || []);
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



  const clearCart = () => {
    Cookies.remove("cartItems");
    setCartItems([]);
    toast.success("Cart cleared (frontend only).");
  };
  

  const toggleLike = async (productId) => {
    if (!userId) {
      toast.error("Please log in to add to favorites.");
      return;
    }
  
    const alreadyLiked = likedItems.includes(productId);
    const updatedLikes = alreadyLiked
      ? likedItems.filter((id) => id !== productId)
      : [...likedItems, productId];
  
    setLikedItems(updatedLikes); // ✅ Optimistic update
  
    try {
      if (alreadyLiked) {
        await removeFavorite(productId);
        toast.success("Removed from favorites.");
      } else {
        await addFavorite(productId);
        toast.success("Added to favorites.");
      }
    } catch (error) {
      // ❌ Revert the state if API fails
      setLikedItems(likedItems); 
      toast.error("Failed to update favorites.");
    }
  };
  

  // 🧮 Get subtotal
  const getCartSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price =
        item?.product?.price ?? // preferred nested structure
        item?.product_price ??  // fallback if flat
        0;
      return total + price * (item.quantity || 0);
    }, 0);
  };
  

  // 💰 Get discounted total
  const getDiscountedTotal = () => {
    const subtotal = getCartSubtotal();
    if (!discount) return subtotal;

    const amount = Number(discount.amount);
    return discount.discount_type === "percentage"
      ? subtotal - subtotal * (amount / 100)
      : Math.max(0, subtotal - amount);
  };

  // 🔄 Fetch active discounts
  const fetchDiscounts = async () => {
    try {
      const token = Cookies.get("token");
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/discounts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data || [];
    } catch (error) {
      console.error("Failed to fetch discount:", error);
      return [];
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
        discount,               // ✅ provided
        setDiscount,            // ✅ provided
        getCartSubtotal,
        getDiscountedTotal,     // ✅ provided
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

// Hook
export const useShop = () => useContext(ShopContext);




  // const clearCart = async () => {
  //   try {
  //     await clearUserCart(userId);
  //     setCartItems([]);
  //     toast.success("Cart cleared.");
  //   } catch {
  //     toast.error("Failed to clear cart.");
  //   }
  // };


    // Persist cart to localStorage on change
  // useEffect(() => {
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // }, [cartItems]);



  // Load cart from localStorage on mount
  // useEffect(() => {
  //   const storedCart = localStorage.getItem("cartItems");
  //   if (storedCart) {
  //     setCartItems(JSON.parse(storedCart));
  //   }
  // }, []);