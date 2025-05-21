// import axios from "axios";

// // Set up axios to automatically send cookies with requests
// axios.defaults.withCredentials = true; // This allows sending cookies with requests

// // Set up a custom base URL for your backend
// axios.defaults.baseURL = "http://localhost:5000"; // Backend base URL

// const API_URL = '/api'; // You can now use just the path, since the baseURL is set


// // 🔥 Add Authorization token automatically for every request
// const getAuthToken = () => {
//   return localStorage.getItem("token");
// };

// axios.interceptors.request.use(
//   (config) => {
//     const token = getAuthToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Login function
// export const login = async (email, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/auth/login`, { email, password });
//     return response.data; // Return the response data (user object and message)
//   } catch (error) {
//     throw new Error(error.response?.data?.error || 'Login failed');
//   }
// };

// // Register function
// export const register = async (name, email, password, address) => {
//   try {
//     const response = await axios.post(`${API_URL}/auth/register`, { name, email, password, address });
//     return response.data; // Return the response data (success message and user object)
//   } catch (error) {
//     throw new Error(error.response?.data?.error || 'Registration failed');
//   }
// };

// // Logout function
// export const logout = async () => {
//   try {
//     const response = await axios.post(`${API_URL}/auth/logout`);
//     return response.data; // Return the response data (logout success message)
//   } catch (error) {
//     throw new Error(error.response?.data?.error || 'Logout failed');
//   }
// };

// // Fetch the current user data
// export const getUser = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/auth/verify`, {
//       withCredentials: true,
//     });

//     console.log("📦 [getUser] Response from /auth/verify:", response.data);

//     return response.data; // Make sure this includes `role`
//   } catch (error) {
//     const errorMessage = error.response?.data?.error || 'Failed to fetch user data';
//     console.error("❌ [getUser] Error:", errorMessage);
//     throw new Error(errorMessage);
//   }
// };

// src/api/auth.js

// import axios from "axios";

// // ✅ Set base URL and enable cookies globally
// axios.defaults.baseURL = process.env.REACT_APP_API_URL || "https://backend-flower-shop.onrender.com";
// axios.defaults.withCredentials = true;

// // ===========================
// // 🔑 AUTHENTICATION SERVICES
// // ===========================

// // Login
// export const login = async (email, password) => {
//   try {
//     const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { email, password });
//     return response.data.user;
//   } catch (error) {
//     console.error("Error during login:", error);
//     throw new Error(error.response?.data?.error || "Login failed");
//   }
// };

// // Register
// export const register = async (name, email, password, address) => {
//   try {
//     const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, { name, email, password, address });
//     return response.data;
//   } catch (error) {
//     console.error("Error during registration:", error);
//     throw new Error(error.response?.data?.error || "Registration failed");
//   }
// };

// // Logout
// export const logout = async () => {
//   try {
//     const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/logout`);
//     return response.data;
//   } catch (error) {
//     console.error("Error during logout:", error);
//     throw new Error(error.response?.data?.error || "Logout failed");
//   }
// };

// // Get the current logged-in user (based on session cookie)
// export const getUser = async () => {
//   try {
//     const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/verify`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     throw new Error("Failed to authenticate the user");
//   }
// };



// Login
// export const login = async (email, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/auth/login`, { email, password });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.error || "Login failed");
//   }
// };







import axios from "axios";
import Cookies from "js-cookie";  // Import js-cookie

// ✅ Set base URL and enable cookies globally
axios.defaults.baseURL = process.env.REACT_APP_API_URL || "https://backend-flower-shop.onrender.com";

// ===========================
// 🔑 AUTHENTICATION SERVICES
// ===========================

// Login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { email, password });
    // Store token in cookies (instead of setting it globally in axios)
    Cookies.set("token", response.data.token, { expires: 1, path: '/' });  // Expires in 1 day
    return response.data.user;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error(error.response?.data?.error || "Login failed");
  }
};

// Register
export const register = async (name, email, password, address) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, 
      { name, email, password, address });
  // Store the token from the response
  const { token, user } = response.data;
  Cookies.set("token", token, { expires: 1, path: '/' });  // Expires in 1 day

  return user;
} catch (error) {
  console.error("Error during registration:", error);
  const errorMessage = error.response?.data?.error || "Registration failed. Please try again.";
  throw new Error(errorMessage);
}
};

// Logout
export const logout = async () => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/logout`);
    // Remove the token from cookies on logout
    Cookies.remove("token");
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw new Error(error.response?.data?.error || "Logout failed");
  }
};

// Get the current logged-in user (based on session cookie)
export const getUser = async () => {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("No auth token found");
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // this should include user `id`, `name`, etc.

  } catch (error) {
    console.error("Error fetching user:", error?.response?.data || error.message);
    throw new Error("Failed to authenticate the user");
  }
};
