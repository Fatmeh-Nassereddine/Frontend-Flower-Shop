// import axios from 'axios';
// import { toast } from 'sonner'; // Toast notification library

// const BASE_URL = 'http://localhost:5000/api/favorites'; // Adjust for your backend deployment

// // Create a reusable axios instance
// // Add token from localStorage/sessionStorage if needed
// const token = localStorage.getItem('token');
// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

// // Utility to extract and show error messages
// const handleApiError = (error, defaultMessage) => {
//   const message = error?.response?.data?.message || defaultMessage;
//   console.error(`${defaultMessage}:`, error);
//   toast.error(message);
//   throw error;
// };

// // ✅ Get all favorites for the logged-in user
// export const getFavorites = async () => {
//   try {
//     const response = await api.get('/');
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'Failed to load favorites');
//   }
// };

// // ✅ Add a product to favorites
// export const addFavorite = async (product_id) => {
//   try {
//     const response = await api.post('/', { product_id });
//     toast.success('Added to favorites');
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'Failed to add to favorites');
//   }
// };

// // ✅ Remove a product from favorites
// export const removeFavorite = async (product_id) => {
//   try {
//     const response = await api.delete(`/${product_id}`);
//     toast.success('Removed from favorites');
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'Failed to remove from favorites');
//   }
// };



import axios from 'axios';
import { toast } from 'sonner'; // Toast notification library

const BASE_URL = 'https://backend-flower-shop.onrender.com/api/favorites';

// ✅ Create a reusable axios instance that includes cookies
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 🔥 Crucial for sending cookies
});

// Utility to extract and show error messages
const handleApiError = (error, defaultMessage) => {
  const message = error?.response?.data?.message || defaultMessage;
  console.error(`${defaultMessage}:`, error);
  toast.error(message);
  throw error;
};

// ✅ Get all favorites for the logged-in user
export const getFavorites = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to load favorites');
  }
};

// ✅ Add a product to favorites
export const addFavorite = async (product_id) => {
  try {
    const response = await api.post('/', { product_id });
    toast.success('Added to favorites');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to add to favorites');
  }
};

// ✅ Remove a product from favorites
export const removeFavorite = async (product_id) => {
  try {
    const response = await api.delete(`/${product_id}`);
    toast.success('Removed from favorites');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to remove from favorites');
  }
};
