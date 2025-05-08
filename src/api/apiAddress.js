import axios from 'axios';

const API_URL = 'http://localhost:5000/api/address'; // Replace this with your backend URL
axios.defaults.withCredentials = true;

// Helper function to get the authenticated user's addresses
export const getUserAddresses = async () => {
  try {
    const response = await axios.get(`${API_URL}`, { 
      withCredentials: true  // Ensure cookies are sent for authentication
    });
    return response.data; // Return the addresses from the response
  } catch (error) {
    console.error('Error fetching user addresses:', error);
    throw error; // Rethrow the error to handle it in the calling component
  }
};

// Helper function to create a new address
export const createAddress = async (addressData) => {
  try {
    console.log('Sending data to backend:', addressData);  // Log the address data
    const response = await axios.post(`${API_URL}`, addressData, {
      withCredentials: true  // Send cookies to ensure authentication
    });
    console.log('Backend response:', response.data);  // Log the response from backend
    return response.data; // Return the success message or created address
  } catch (error) {
    console.error('Error creating address:', error);
    throw error;
  }
};

// Helper function to get an address by ID
export const getAddressById = async (addressId) => {
  try {
    const response = await axios.get(`${API_URL}/${addressId}`, {
      withCredentials: true
    });
    return response.data; // Return the specific address
  } catch (error) {
    console.error('Error fetching address by ID:', error);
    throw error;
  }
};

// Helper function to update an address by ID
export const updateAddress = async (addressId, addressData) => {
  try {
    const response = await axios.put(`${API_URL}/${addressId}`, addressData, {
      withCredentials: true
    });
    return response.data; // Return the success message or updated address
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
};

// Helper function to delete an address by ID
export const deleteAddress = async (addressId) => {
  try {
    const response = await axios.delete(`${API_URL}/${addressId}`, {
      withCredentials: true
    });
    return response.data; // Return the success message upon successful deletion
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
};
