import axios from "axios";

// Base URL for the categories API
const API_URL = 'https://backend-flower-shop.onrender.com/api/categories';

// Create category-specific Axios instance with the correct base URL
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Global error handling
apiClient.interceptors.response.use(
  (response) => response, // Simply return the response if it's successful
  (error) => {
    console.error("❌ Category API error:", error.response?.data || error.message);
    return Promise.reject(error); // Reject the promise with the error
  }
);

// 🔹 Get all categories
export const getAllCategories = async () => {
  try {
    const response = await apiClient.get('/');
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// 🔹 Get category by ID
export const getCategoryById = async (categoryId) => {
  try {
    const response = await apiClient.get(`/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category with ID ${categoryId}:`, error);
    throw error;
  }
};
// Create a new category
export const createCategory = async (categoryData) => {
  try {
    const formData = new FormData();
    formData.append("name", categoryData.name);
    formData.append("description", categoryData.description || "");
    formData.append("parent_category_id", categoryData.parent_category_id || "");

    if (categoryData.image) {
      formData.append("image", categoryData.image);
    }

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/categories`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create category");
  }
};

// Update an existing category
export const updateCategory = async (categoryId, categoryData) => {
  try {
    const formData = new FormData();
    formData.append("name", categoryData.name);
    formData.append("description", categoryData.description || "");
    formData.append("parent_category_id", categoryData.parent_category_id || "");

    if (categoryData.image) {
      formData.append("image", categoryData.image);
    }

    const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/categories/${categoryId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update category");
  }
};

// Delete a category
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete category");
  }
};

// 🔹 Create a new category (Admin only, with optional image)
// export const createCategory = async (categoryData, imageFile) => {
//   const formData = new FormData();

//   // Append category data to formData
//   for (const key in categoryData) {
//     if (categoryData[key]) {
//       formData.append(key, categoryData[key]);
//     }
//   }

//   // If there's an image, append it to formData
//   if (imageFile) {
//     formData.append("image", imageFile); // Ensure the field name matches your backend
//   }

//   try {
//     const response = await apiClient.post('/', formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error creating category:", error);
//     throw error;
//   }
// };

// // 🔹 Update existing category (Admin only, with optional image)
// export const updateCategory = async (categoryId, categoryData, imageFile) => {
//   const formData = new FormData();

//   // Append category data to formData
//   for (const key in categoryData) {
//     if (categoryData[key]) {
//       formData.append(key, categoryData[key]);
//     }
//   }

//   // If there's an image, append it to formData
//   if (imageFile) {
//     formData.append("image", imageFile);
//   }

//   try {
//     const response = await apiClient.put(`/${categoryId}`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating category with ID ${categoryId}:`, error);
//     throw error;
//   }
// };

// // 🔹 Delete category by ID (Admin only)
// export const deleteCategory = async (categoryId) => {
//   try {
//     const response = await apiClient.delete(`/${categoryId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error deleting category with ID ${categoryId}:`, error);
//     throw error;
//   }
// };



