// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/products';


// const apiClient = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, // For cookie-based auth, if used
// });

// // Add Authorization token to every request if available
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token'); // Or use cookies/context/etc.
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Optional global response error handler
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// // 🔹 Get all products (Requires user token)
// // 🔹 Get all products with optional filters (category_id, season_id) and pagination (page, limit)
// export const getAllProducts = async (
//   page = 1,
//   limit = 10,
//   categories = [],
//   seasons = [],
//   search = '',
//   priceRange = [0, 200]
// ) => {
//   try {
//     const params = {
//       page,
//       limit,
//       search,
//       minPrice: priceRange[0],
//       maxPrice: priceRange[1],
//     };

//     if (categories.length > 0) {
//       params.categories = categories.join(',');
//     }

//     if (seasons.length > 0){
//       params.seasons = seasons.join(',');
//     }

//     const response = await apiClient.get('/', { params });
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch products:', error);
//     throw error;
//   }
// };



// // 🔹 Get product by ID
// export const getProductById = async (productId) => {
//   try {
//     const response = await apiClient.get(`/${productId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching product with ID ${productId}:`, error);
//     throw new Error("Failed to fetch product details");
//   }
// };

// // 🔹 Add a new product
// export const addProduct = async (productData, imageFiles) => {
//   try {
//     const formData = new FormData();
//     for (const key in productData) {
//       if (productData[key] !== undefined && productData[key] !== null) {
//         formData.append(key, productData[key]);
//       }
//     }
//     if (imageFiles?.length) {
//       imageFiles.forEach((file) => formData.append('images', file));
//     }

//     const response = await apiClient.post('/create', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error adding product:", error);
//     throw new Error(error.response?.data?.message || 'Failed to add product');
//   }
// };

// // 🔹 Update product
// export const updateProduct = async (id, productData, imageFiles) => {
//   try {
//     const formData = new FormData();
//     for (const key in productData) {
//       if (productData[key] !== undefined && productData[key] !== null) {
//         formData.append(key, productData[key]);
//       }
//     }
//     if (imageFiles?.length) {
//       imageFiles.forEach((file) => formData.append('images', file));
//     }

//     const response = await apiClient.put(`/${id}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });

//     return response.data;
//   } catch (error) {
//     console.error(`Error updating product with ID ${id}:`, error);
//     throw new Error(error.response?.data?.message || 'Failed to update product');
//   }
// };

// // 🔹 Delete product
// export const deleteProduct = async (id) => {
//   try {
//     const response = await apiClient.delete(`/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error deleting product with ID ${id}:`, error);
//     throw new Error('Failed to delete product');
//   }
// };

// // 🔹 Get products by season
// export const getProductsBySeason = async (seasonId) => {
//   try {
//     const response = await apiClient.get(`/season/${seasonId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching products for season ID ${seasonId}:`, error);
//     throw new Error('Failed to fetch products by season');
//   }
// };


// // 🔹 Get products by category ID
// export const getProductsByCategory = async (categoryId) => {
//   try {
//     const response = await apiClient.get(`/category/${categoryId}`);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error fetching products by category:", error);
//     throw error;
//   }
// };



import axios from 'axios';

// ✅ Set direct backend URL
const API_URL = 'https://backend-flower-shop.onrender.com/api/products';

// Create Axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For cookie-based auth, if used
});

// Add Authorization token to every request if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Or use cookies/context/etc.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional global response error handler
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ===============================
// 🔹 PRODUCT APIs
// ===============================

// 🔹 Get all products (Requires user token)
export const getAllProducts = async (
  page = 1,
  limit = 10,
  categories = [],
  seasons = [],
  search = '',
  priceRange = [0, 200]
) => {
  try {
    const params = {
      page,
      limit,
      search,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    };

    if (categories.length > 0) {
      params.categories = categories.join(',');
    }

    if (seasons.length > 0) {
      params.seasons = seasons.join(',');
    }

    const response = await apiClient.get('https://backend-flower-shop.onrender.com/api/products', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

// 🔹 Get product by ID
export const getProductById = async (productId) => {
  try {
    const response = await apiClient.get(`https://backend-flower-shop.onrender.com/api/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw new Error("Failed to fetch product details");
  }
};

// 🔹 Add a new product
export const addProduct = async (productData, imageFiles) => {
  try {
    const formData = new FormData();
    for (const key in productData) {
      if (productData[key] !== undefined && productData[key] !== null) {
        formData.append(key, productData[key]);
      }
    }
    if (imageFiles?.length) {
      imageFiles.forEach((file) => formData.append('images', file));
    }

    const response = await apiClient.post('https://backend-flower-shop.onrender.com/api/products/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error(error.response?.data?.message || 'Failed to add product');
  }
};

// 🔹 Update product
export const updateProduct = async (id, productData, imageFiles) => {
  try {
    const formData = new FormData();
    for (const key in productData) {
      if (productData[key] !== undefined && productData[key] !== null) {
        formData.append(key, productData[key]);
      }
    }
    if (imageFiles?.length) {
      imageFiles.forEach((file) => formData.append('images', file));
    }

    const response = await apiClient.put(`https://backend-flower-shop.onrender.com/api/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw new Error(error.response?.data?.message || 'Failed to update product');
  }
};

// 🔹 Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await apiClient.delete(`https://backend-flower-shop.onrender.com/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw new Error('Failed to delete product');
  }
};

// 🔹 Get products by season
export const getProductsBySeason = async (seasonId) => {
  try {
    const response = await apiClient.get(`https://backend-flower-shop.onrender.com/api/products/season/${seasonId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for season ID ${seasonId}:`, error);
    throw new Error('Failed to fetch products by season');
  }
};

// 🔹 Get products by category ID
export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await apiClient.get(`/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching products by category:", error);
    throw error;
  }
};

export default apiClient;
