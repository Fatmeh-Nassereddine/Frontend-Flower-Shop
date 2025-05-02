import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/seasons';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Ensures cookies are sent with requests
});

// Automatically add Authorization header if token is present
apiClient.interceptors.request.use(
  (config) => {

    // Skip auth for public endpoints
    if (!config.skipAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);


//     const token = localStorage.getItem('token'); // Retrieve token from local storage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`; // Attach token if available
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Global error handling for API responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Season API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const apiSeasons = {
  // 🔹 For customers (authenticated)
  getAll: async () => {
    try {
      const res = await apiClient.get('/', { skipAuth: true });
      console.log("Seasons Data:", res.data);  // Log response data
      return res.data; // Return the list of all seasons
    } catch (error) {
      console.error("Season API Error:", error.response || error.message);
      throw new Error('Failed to fetch all seasons');
    }
  },

  getById: async (id) => {
    try {
      const res = await apiClient.get(`/${id}`); // Fetch season by ID
      return res.data;
    } catch (error) {
      console.error(`Error fetching season with ID ${id}:`, error);
      throw new Error('Failed to fetch season');
    }
  },

  // 🔹 For admins (authenticated with admin privileges)
  admin: {
    // Admin: Create a new season
    create: async (seasonData) => {
      try {
        const res = await apiClient.post('/', seasonData); // Create a new season
        return res.data;
      } catch (error) {
        console.error('Error creating season:', error);
        throw new Error('Failed to create season');
      }
    },

    // Admin: Update a season by ID
    update: async (id, seasonData) => {
      try {
        const res = await apiClient.put(`/${id}`, seasonData); // Update season by ID
        return res.data;
      } catch (error) {
        console.error(`Error updating season with ID ${id}:`, error);
        throw new Error('Failed to update season');
      }
    },

    // Admin: Delete a season by ID
    delete: async (id) => {
      try {
        const res = await apiClient.delete(`/${id}`); // Delete season by ID
        return res.data;
      } catch (error) {
        console.error(`Error deleting season with ID ${id}:`, error);
        throw new Error('Failed to delete season');
      }
    },
  },
};

export default apiSeasons;
