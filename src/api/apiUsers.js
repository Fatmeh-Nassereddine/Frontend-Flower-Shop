import axios from 'axios';
import Cookies from 'js-cookie';

// Set up the Axios instance to include the base URL and token from cookies
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Ensure this is in your .env file
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Cookies.get('token')}` // Token fetched from cookies
  }
});

// Admin: Get all users
export const getAllUsers = async () => {
    try {
      const response = await api.get('/api/users/all');
      return response.data.users;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw new Error(error.response?.data?.error || "Failed to fetch users");
    }
  };
  
  // Admin: Delete user
  export const deleteUser = async (userId) => {
    try {
      await api.delete(`/api/users/${userId}`);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error(error.response?.data?.error || "Failed to delete user");
    }
  };