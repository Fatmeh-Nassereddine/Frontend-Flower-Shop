// import React, { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/AuthContext';
// import axios from 'axios';

// const ProtectedRoute = ({ children, requiredRole }) => {
//   const { user, setUser } = useAuth();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const verifyUserToken = async () => {
//       try {
//         const response = await axios.get("https://backend-flower-shop.onrender.com/api/auth/verify", { withCredentials: true }); // ✅ Updated to use correct route
//         console.log("🔐 [ProtectedRoute] Verified user from backend:", response.data);
//         setUser(response.data); // response.data = { id, email, role }
//       } catch (error) {
//         console.error("❌ [ProtectedRoute] Failed verification:", error.message);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

   
//   // ✅ only run if user is strictly null
//   if (user === null) {
//     console.log("🔄 [ProtectedRoute] Verifying because user is null");
//     verifyUserToken();
//   } else {
//     console.log("✅ [ProtectedRoute] User already available:", user);
//     setLoading(false);
//   }
// }, [user, setUser]);

//   if (loading) return <div>Loading...</div>;

//   if (!user) {
//     console.log("🚫 [ProtectedRoute] No user. Redirecting to /login"); 
//     return <Navigate to="/login" />;
// }
//   if (requiredRole && user.role !== requiredRole) {
//     console.log("⚠️ [ProtectedRoute] Role mismatch. User:", user.role, "Required:", requiredRole);
//     return <Navigate to="/" />;
//   }
//   return children;
// };

// export default ProtectedRoute;




import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import Cookies from 'js-cookie';  // Import js-cookie
import axios from 'axios';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUserToken = async () => {
      try {
        const token = Cookies.get("token");  // Get token from cookies
        if (token) {
          const response = await axios.get("https://backend-flower-shop.onrender.com/api/auth/verify", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("🔐 [ProtectedRoute] Verified user from backend:", response.data);
          setUser(response.data);  // Set user info if token is valid
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("❌ [ProtectedRoute] Failed verification:", error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (user === null) {
      console.log("🔄 [ProtectedRoute] Verifying because user is null");
      verifyUserToken();
    } else {
      console.log("✅ [ProtectedRoute] User already available:", user);
      setLoading(false);
    }
  }, [user, setUser]);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    console.log("🚫 [ProtectedRoute] No user. Redirecting to /login");
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    console.log("⚠️ [ProtectedRoute] Role mismatch. User:", user.role, "Required:", requiredRole);
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
