// import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { login, register, logout, getUser } from "../api/auth";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // NEW
//   const navigate = useNavigate();

//   // Fetch user from backend using cookie
//   const fetchUserData = async () => {
//     try {
//       const userData = await getUser(); // calls /api/auth/verify
//       setUser(userData);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       setUser(null);
//     }finally {
//       setLoading(false); // NEW
//     }
//   };

//   // Check user session on initial app load
//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   // Login
//   const loginUser = async (email, password) => {
//     try {
//       await login(email, password);
  
//       const userData = await getUser(); // Fetch role from backend
//       console.log("✅ [Login] Fetched userData:", userData); // Full user object
  
//       // DEBUG: Show raw role
//       console.log("🧠 [Login] Role Detected:", userData?.role);
  
//       setUser(userData);
  
//       if (userData?.role === "admin") {
//         console.log("🚀 [Login] Admin detected. Navigating to /dashboard");
//         navigate("/dashboard", { replace: true });
//       } else {
//         console.log("➡️ [Login] Non-admin user. Navigating to /");
//         navigate("/", { replace: true });
//       }
//     } catch (error) {
//       console.error("❌ [Login] Failed:", error.message);
//       throw error;
//     }
//   };
  
  

//   // Register
//   const registerUser = async (name, email, password, address) => {
//     try {
//       await register(name, email, password, address);
//       navigate("/login");
//     } catch (error) {
//       console.error(error.message || "Registration failed");
//       throw error; // NEW: so the UI can handle it
//     }
//   };

//   // Logout
//   const logoutUser = async () => {
//     try {
//       await logout();
//       setUser(null);
//       navigate("/");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, loginUser, registerUser, logoutUser ,loading}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { getUser } from "../api/auth";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // Axios defaults
//   axios.defaults.withCredentials = true;

//   // Fetch user on load
//   useEffect(() => {
//     const initializeUser = async () => {
//       // Check if user data exists in sessionStorage or localStorage
//       const storedUser = sessionStorage.getItem('user') || localStorage.getItem('user');
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));  // Set user data from storage
//         return; // Skip the API call if user data is found
//       }

//       // If not found in storage, attempt to get from API
//       try {
//         const userData = await getUser();
//         setUser(userData);
//         // Optionally, persist the user in sessionStorage/localStorage
//         sessionStorage.setItem('user', JSON.stringify(userData));
//         localStorage.setItem('user', JSON.stringify(userData));
//       } catch (err) {
//         setUser(null); // Clear if failed
//         console.warn("User session not found or expired.");
//       }
//     };

//     initializeUser();
//   }, []);

//   const loginUser = async (email, password) => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       const { token, user } = response.data;
//       document.cookie = `token=${token}; path=/;`;
//       sessionStorage.setItem("token", token);
//       sessionStorage.setItem("role", user.role || "");
//       sessionStorage.setItem("user", JSON.stringify(user));  // Save user in sessionStorage
//       localStorage.setItem("user", JSON.stringify(user));  // Save user in localStorage
//       setUser(user);

//       // Redirect based on role
//       const lastVisitedPage = sessionStorage.getItem("lastVisitedPage") || "/";
//       user.role === "admin" ? navigate("/dashboard") : navigate(lastVisitedPage);
//     } catch (err) {
//       throw new Error(err.response?.data?.error || "Login failed");
//     }
//   };

//   const registerUser = async (name, email, password, address) => {
//     try {
//       await axios.post("http://localhost:5000/api/auth/register", {
//         name,
//         email,
//         password,
//         address,
//       });
//     } catch (err) {
//       throw new Error(err.response?.data?.error || "Registration failed");
//     }
//   };

//   const logoutUser = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/auth/logout");
//       setUser(null);
//       sessionStorage.clear();
//       localStorage.removeItem('user');  // Remove user from storage
//       navigate("/");
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   const value = {
//     user,
//     loginUser,
//     registerUser,
//     logoutUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => useContext(AuthContext);




import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUser, login, logout, register } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
      } catch (err) {
        console.warn("User session not found or expired.");
        setUser(null);
        sessionStorage.removeItem("user");
      }
    };

    initializeUser();
  }, []);

  const loginUser = async (email, password) => {
    const userData = await login(email, password);
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
    const lastVisitedPage = sessionStorage.getItem("lastVisitedPage") || "/";
    userData.role === "admin" ? navigate("/dashboard") : navigate(lastVisitedPage);
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
    sessionStorage.clear();
    navigate("/");
  };

  const registerUser = async (name, email, password, address) => {
    await register(name, email, password, address);
    navigate("/login");
  };

  const value = { user, loginUser, registerUser, logoutUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
