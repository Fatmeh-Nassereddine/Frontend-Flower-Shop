import axios from 'axios';

// Set the base URL for your API if necessary
const BASE_URL = 'http://localhost:5000/api/cart';  // Change to your actual API URL

// Function to add or update a product in the cart
export const addProductToCart = async (user_id, product_id, quantity) => {
  try {
    const response = await axios.post(`${BASE_URL}/add`, {
      user_id,
      product_id,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error.message);
    throw error;
  }
};

// Function to remove a product from the cart
export const removeProductFromCart = async (cart_item_id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/remove/${cart_item_id}`);
    return response.data;
  } catch (error) {
    console.error("Error removing product from cart:", error.message);
    throw error;
  }
};

// Function to get the user's cart (all products and total price)
export const getUserCart = async (user_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${user_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    throw error;
  }
};

// Function to update the quantity of a cart item
export const updateItemQuantity = async (cart_item_id, quantity) => {
  try {
    const response = await axios.put(`${BASE_URL}/update/${cart_item_id}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating item quantity:", error.message);
    throw error;
  }
};

// Function to clear the entire cart for a user
export const clearUserCart = async (user_id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/clear/${user_id}`);
    return response.data;
  } catch (error) {
    console.error("Error clearing the cart:", error.message);
    throw error;
  }
};
