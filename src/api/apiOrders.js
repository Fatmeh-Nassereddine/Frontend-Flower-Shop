import axios from 'axios';

// Always include cookies in requests
axios.defaults.withCredentials = true;

const API_BASE_URL = 'https://backend-flower-shop.onrender.com/api/orders';

// Centralized error handler
const handleError = (error) => {
  const message = error.response?.data?.message || error.message || 'Something went wrong.';
  console.error("Order API Error:", message);
  return { error: true, message };
};

// 1. Checkout cart (create an order)
export const checkoutCart = async (orderDetails) => {
  try {
    // Validate order details (basic example)
    if (!orderDetails.cartItems || !orderDetails.total || !orderDetails.shippingFee) {
      throw new Error('Invalid order details');
    }

    const response = await axios.post(`${API_BASE_URL}/checkout`, orderDetails);
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// 2. Get all orders (admin only)
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// 3. Get orders for logged-in user
export const getUserOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`);
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// 4. Get order items by order ID
export const getOrderItemsByOrderId = async (order_id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items/${order_id}`);
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// 5. Get order items by user (full order history with products)
export const getOrderItemsByUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items/user`);
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// 6. Cancel order (admin only)
export const cancelOrder = async (order_id) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/cancel/${order_id}`);
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// 7. Delete order (admin only)
export const deleteOrder = async (order_id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${order_id}`);
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// 8. Update order status (admin only)
export const updateOrderStatus = async (order_id, status) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${order_id}`, { status });
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// 9. Update order item quantity
export const updateOrderItemQuantity = async (order_item_id, quantity) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/items/${order_item_id}`, { quantity });
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// 10. Delete order item
export const deleteOrderItem = async (order_item_id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/items/${order_item_id}`);
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// 11. Get best-selling products (admin only)
export const getBestSellingProducts = async (year = 'all', month = 'all', limit = 3) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/best-sellers?year=${year}&month=${month}&limit=${limit}`
    );
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};
