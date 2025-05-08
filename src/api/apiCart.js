import axios from 'axios';

// Ensure cookies are sent with every request
axios.defaults.withCredentials = true;

// Base API endpoint
// const BASE_URL = 'https://backend-flower-shop.onrender.com/api/carts';

// Centralized error handler
const handleError = (error) => {
  const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred.';
  console.error("Cart API Error:", errorMessage);
  throw new Error(errorMessage);
};

// Add or update product in the cart
export const addProductToCart = async (user_id, product_id, quantity = 1) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/carts/add`, {
      user_id,
      product_id,
      quantity,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Remove product from cart
export const removeProductFromCart = async (cart_item_id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/carts/remove/${cart_item_id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Get all cart items for a user
export const getUserCart = async (user_id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/carts/${user_id}`);
    return response.data;
  } catch (error) {
    console.error("Cart API Error:", error.response?.data || error.message);
    handleError(error);
  }
};

// Update quantity for a specific cart item
export const updateItemQuantity = async (cart_item_id, quantity) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/carts/update/${cart_item_id}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Clear all items in a user's cart
export const clearUserCart = async (user_id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/carts/clear/${user_id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
