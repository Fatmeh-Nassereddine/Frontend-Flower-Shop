import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/favorites'; // Change to match your actual backend URL

// ✅ Get all favorites for the logged-in user
export const getFavorites = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      withCredentials: true, // if using cookies for auth
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error.message);
    throw error;
  }
};

// ✅ Add a product to favorites
export const addFavorite = async (product_id) => {
  try {
    const response = await axios.post(
      BASE_URL,
      { product_id },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to favorites:", error.message);
    throw error;
  }
};

// ✅ Remove a product from favorites
export const removeFavorite = async (product_id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${product_id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error removing from favorites:", error.message);
    throw error;
  }
};
