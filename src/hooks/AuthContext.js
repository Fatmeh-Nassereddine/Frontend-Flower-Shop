




// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { getUser, login, logout, register } from "../api/auth";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const initializeUser = async () => {
//       try {
//         const userData = await getUser();
//         setUser(userData);
//         sessionStorage.setItem("user", JSON.stringify(userData));
//       } catch (err) {
//         console.warn("User session not found or expired.");
//         setUser(null);
//         sessionStorage.removeItem("user");
//       }
//     };

//     initializeUser();
//   }, []);

//   const loginUser = async (email, password) => {
//     const userData = await login(email, password);
//     setUser(userData);
//     sessionStorage.setItem("user", JSON.stringify(userData));
//     const lastVisitedPage = sessionStorage.getItem("lastVisitedPage") || "/";
//     userData.role === "admin" ? navigate("/dashboard") : navigate(lastVisitedPage);
//   };

//   const logoutUser = async () => {
//     await logout();
//     setUser(null);
//     sessionStorage.clear();
//     navigate("/");
//   };

//   const registerUser = async (name, email, password, address) => {
//     await register(name, email, password, address);
//     navigate("/login");
//   };

//   const value = { user, loginUser, registerUser, logoutUser };
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => useContext(AuthContext);





import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";  // Import js-cookie
import { getUser, login, logout, register } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const token = Cookies.get("token");  // Get token from cookies
        if (token) {
          const userData = await getUser();  // If token exists, fetch the user
          setUser(userData);
          sessionStorage.setItem("user", JSON.stringify(userData));
        }
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
