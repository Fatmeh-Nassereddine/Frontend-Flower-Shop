// AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/AuthContext'; 
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ProtectedRoute from './Route/ProtectedRoute';
import Loader from './components/Loader/Loader';
import NotFound from './pages/NotFound';

// Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import ProductList from './pages/Admin/Products/ProductList';
import AddProduct from './pages/Admin/Products/AddProduct';
import EditProduct from './pages/Admin/Products/EditProduct';
import OrderList from './pages/Admin/Orders/OrderList';
import CategoryList from './pages/Admin/Categories/CategoryList';
import UserList from './pages/Admin/Users/UserList';
import ReviewList from './pages/Admin/Reviews/ReviewList';
import DiscountList from './pages/Admin/Discounts/DiscountList';
import MessageList from './pages/Admin/Messages/MessageList';
import AdminSettings from './pages/Admin/Settings/AdminSettings';

// Public Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Aboutus from './pages/Aboutus';
import Seasonal from './pages/Seasonal';
import Contact from './pages/Contact';
import CartPage from './pages/CartPage';
import Favorite from './pages/Favorite';
import CategoryPage from './pages/Category';
import ProductPage from './pages/ProductPage';
import LoginUp from './components/popAuth/LoginUp';


function AppRoutes({ darkMode, toggleSidebar, toggleDarkMode, sidebarCollapsed, activeTab, setActiveTab }) {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/about" element={<Aboutus />} />
      <Route path="/seasonal" element={<Seasonal />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/categories" element={<CategoryPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/login" element={<LoginUp />} />

      {/* Admin Dashboard Layout */}
      <Route path="/dashboard/*" element={
        <div className={`flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
          <Sidebar
            sidebarCollapsed={sidebarCollapsed}
            setActiveTab={setActiveTab}
            toggleSidebar={toggleSidebar}
            darkMode={darkMode}
            activeTab={activeTab}
          />
          <div className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
            <Topbar
              toggleSidebar={toggleSidebar}
              toggleDarkMode={toggleDarkMode}
              darkMode={darkMode}
            />
            <div className="p-6 mt-4">
              <Routes>
                <Route path="" element={<ProtectedRoute requiredRole="admin"><Dashboard /></ProtectedRoute>} />
                <Route path="products" element={<ProtectedRoute requiredRole="admin"><ProductList /></ProtectedRoute>} />
                <Route path="products/add" element={<ProtectedRoute requiredRole="admin"><AddProduct /></ProtectedRoute>} />
                <Route path="products/edit/:id" element={<ProtectedRoute requiredRole="admin"><EditProduct /></ProtectedRoute>} />
                <Route path="orders" element={<ProtectedRoute requiredRole="admin"><OrderList /></ProtectedRoute>} />
                <Route path="category" element={<ProtectedRoute requiredRole="admin"><CategoryList /></ProtectedRoute>} />
                <Route path="users" element={<ProtectedRoute requiredRole="admin"><UserList /></ProtectedRoute>} />
                <Route path="reviews" element={<ProtectedRoute requiredRole="admin"><ReviewList /></ProtectedRoute>} />
                <Route path="discounts" element={<ProtectedRoute requiredRole="admin"><DiscountList /></ProtectedRoute>} />
                <Route path="messages" element={<ProtectedRoute requiredRole="admin"><MessageList /></ProtectedRoute>} />
                <Route path="settings" element={<ProtectedRoute requiredRole="admin"><AdminSettings /></ProtectedRoute>} />
              
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      } />
    </Routes>
  );
}

export default AppRoutes;
