import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.REACT_APP_API_URL;

// Helper to include Authorization header
export const authHeaders = () => {
  const token = Cookies.get('token'); // assuming token is stored in cookies
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};

// Fetch all addresses for the authenticated user
export const getUserAddresses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/address`, authHeaders());
    return response.data.addresses || [];
  } catch (error) {
    console.error('Error fetching user addresses:', error);
    throw error;
  }
};

// Create a new address for the authenticated user
export const createAddress = async (addressData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/address`,
      addressData,
      authHeaders()
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    console.error('Address creation error:', {
      error: error.response?.data || error.message,
      requestData: addressData,
    });

    let message = 'Failed to create address';
    if (error.response?.data?.error) {
      message = error.response.data.error;
      if (error.response.data.details) {
        message += `: ${JSON.stringify(error.response.data.details)}`;
      }
    }

    throw new Error(message);
  }
};

// Get a specific address by ID
export const getAddressById = async (addressId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/address/${addressId}`,
      authHeaders()
    );
    return response.data.address;
  } catch (error) {
    console.error('Error fetching address by ID:', error);
    throw error;
  }
};

// Update an address by ID
export const updateAddress = async (addressId, addressData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/address/${addressId}`,
      addressData,
      authHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
};

// Delete an address by ID
export const deleteAddress = async (addressId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/address/${addressId}`,
      authHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
};
