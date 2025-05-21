import axios from "axios";
import Cookies from "js-cookie";

// ✅ Global Axios Config
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`;

// ===========================
// 📦 SHIPPING OPTIONS
// ===========================

// In apiShipping.js
export const fetchShippingOptions = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/shippings/shipping-options`);
    // Ensure response data is an array
    return { 
      success: true, 
      data: Array.isArray(res.data) ? res.data : [] 
    };
  } catch (error) {
    console.error('Shipping options error:', error);
    return { 
      success: false, 
      error: error.message,
      data: [] // Return empty array on error
    };
  }
};

// ===========================
// 📋 SHIPPING RECORDS
// ===========================

export const createShipping = async ({ delivery_fee, order_id,address_id  }) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/shippings`, {
      order_id,
      delivery_fee: Number(delivery_fee),
      address_id
    }, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}` // If using CSRF protection
      }
    });
    
    return { 
      success: true, 
      shippingId: res.data.id,
      data: res.data 
    };
    
  } catch (error) {
    console.error('Create shipping error:', {
      error: error.response?.data || error.message,
      payload: { delivery_fee, order_id ,address_id }
    });
    
    // Handle specific error cases
    let errorMessage = 'Failed to create shipping record';
    if (error.response?.status === 401) {
      errorMessage = 'Authentication required';
    } else if (error.response?.status === 404) {
      errorMessage = 'Order not found';
    }
    
    return { 
      success: false, 
      error: error.response?.data?.message || errorMessage 
    };
  }
};

// Enhanced version with retry logic
export const createShippingWithRetry = async (payload, retries = 2) => {
  try {
    return await createShipping(payload);
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying shipping creation... (${retries} left)`);
      return createShippingWithRetry(payload, retries - 1);
    }
    throw error;
  }
};

// ===========================
// 🔐 ADMIN SHIPPING MANAGEMENT
// ===========================

export const getAllShippings = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/shippings`);
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Get all shippings error:', error.response?.data || error.message);
    return { 
      success: false, 
      error: 'Failed to fetch shipping records' 
    };
  }
};

export const getShippingById = async (id) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/shippings/${id}`);
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Get shipping error:', {
      id,
      error: error.response?.data || error.message
    });
    return { 
      success: false, 
      error: `Shipping record ${id} not found` 
    };
  }
};

export const updateShipping = async (id, updates) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/shippings/${id}`,
      updates
    );
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Update shipping error:', {
      id,
      updates,
      error: error.response?.data || error.message
    });
    return { 
      success: false, 
      error: 'Failed to update shipping record' 
    };
  }
};

export const deleteShipping = async (id) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/shippings/${id}`);
    return { success: true };
  } catch (error) {
    console.error('Delete shipping error:', {
      id,
      error: error.response?.data || error.message
    });
    return { 
      success: false, 
      error: 'Failed to delete shipping record' 
    };
  }
};

// Utility function
export const validateShippingData = (data) => {
  if (!data.order_id || !data.delivery_fee) {
    return { isValid: false, error: 'Missing required fields' };
  }
  if (isNaN(parseFloat(data.delivery_fee))) {
    return { isValid: false, error: 'Delivery fee must be a number' };
  }
  return { isValid: true };
};