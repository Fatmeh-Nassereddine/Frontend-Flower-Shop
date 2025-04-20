import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true; // Replace with real auth check

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
