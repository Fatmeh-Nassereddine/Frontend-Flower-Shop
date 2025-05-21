



import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;
const API_BASE_URL = 'https://backend-flower-shop.onrender.com/api/orders';

const authHeaders = () => {
  const token = Cookies.get('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

const handleError = (error) => {
  const message = error.response?.data?.message || 
                 error.response?.data?.error || 
                 error.message || 
                 'Something went wrong. Please try again.';
  console.error('Order API Error:', message);
  return { error: true, message };
};

// src/api/apiOrders.js

export const checkoutOrder = async (address) => {
  try {
    const token = Cookies.get('token');  // Get the token from cookies

    // Send the payload with the address
    const response = await axios.post(
      `${API_BASE_URL}/checkout`,
       address ,  // Wrap the address in a payload object
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
};


// Get user's orders
export const getUserOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/my-orders`, authHeaders());
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Get order items for user
export const getOrderItemsByUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/my-orderItems`, authHeaders());
    // Return the correct part of the response
    return { error: false, data: response.data };
  } catch (error) {
    console.error('Error fetching order items:', error);
    return { error: true, message: error.message };
  }
};

// Admin-only functions
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, authHeaders());
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const cancelOrder = async (order_id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/${order_id}/cancel`,
      authHeaders()
    );
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteOrder = async (order_id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/${order_id}/delete`,
      authHeaders()
    );
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const updateOrderStatus = async (order_id, status) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${order_id}`,
      { status },
      authHeaders()
    );
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const getOrderItemsByOrderId = async (order_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${order_id}/items`,
      authHeaders()
    );
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const updateOrderItemQuantity = async (order_item_id, quantity) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/item/${order_item_id}`,
      { quantity },
      authHeaders()
    );
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteOrderItem = async (order_id, order_item_id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/${order_id}/item/${order_item_id}`,
      authHeaders()
    );
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const getBestSellingProducts = async (year = 'all', month = 'all', limit = 3) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/best-sellers?year=${year}&month=${month}&limit=${limit}`,
      authHeaders()
    );
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};