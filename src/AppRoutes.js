import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/AuthContext'; 
import ProtectedRoute from './Route/ProtectedRoute';
import Loader from './components/loader/Loader.js';
import NotFound from './pages/NotFound';

// Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import DashboardHome from './pages/Admin/DashboardHome';
import ProductList from './pages/Admin/Products/ProductList';
import OrderList from './pages/Admin/Orders/OrderList';
import CategoryList from './pages/Admin/Categories/CategoryList';
import UserList from './pages/Admin/Users/UserList';
import ReviewList from './pages/Admin/Reviews/ReviewList';
import DiscountList from './pages/Admin/Discounts/DiscountList';
import MessageList from './pages/Admin/Messages/MessageList';
import AdminSettings from './pages/Admin/Settings/AdminSettings';
import SeasonalList from './pages/Admin/Seasonal/SeasonalList';
import SubscriptionList from './pages/Admin/Subscriptions/SubscriptionList';


// Public Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Aboutus from './pages/Aboutus';
import Seasonal from './pages/Seasonal';
import Contact from './pages/Contact';
import CartPage from './pages/CartPage';
import Favorite from './pages/Favorite';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import LoginUp from './components/popAuth/LoginUp';
import ProductsByCategoryPage from './pages/ProductsByCategoryPage'; 
import CheckoutPage from './pages/Checkout';
import ThankYouPage from './pages/ThankYouPage';
import AccountProfile from './pages/AccountProfile';
import Promotions from './components/Promotions';

function AppRoutes({ darkMode, toggleSidebar, toggleDarkMode, sidebarCollapsed, activeTab, setActiveTab }) {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
        {/* Wrap all public pages in PublicLayout */}
       {/* <Route element={<PublicLayout />}> */}
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
      <Route path="/category/:categoryId" element={<ProductsByCategoryPage />} /> 
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/promotions" element={<Promotions />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route path="/account" element={<AccountProfile />} />
      


     {/* Admin Dashboard Layout */}
      <Route path="/dashboard/*" element={
                <ProtectedRoute requiredRole="admin">
                  <Dashboard toggleSidebar={toggleSidebar} 
                  darkMode={darkMode} 
                  toggleDarkMode={toggleDarkMode} 
                  sidebarCollapsed={sidebarCollapsed}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}

                  />
                </ProtectedRoute>
              }>
      <Route index element={<DashboardHome />} />
      <Route path="products" element={<ProductList />} />
      <Route path="orders" element={<OrderList />} />
      <Route path="category" element={<CategoryList />} />
      <Route path="users" element={<UserList />} />
      <Route path="reviews" element={<ReviewList />} />
      <Route path="discounts" element={<DiscountList />} />
       <Route path="messages" element={<MessageList />} />
      <Route path="settings" element={<AdminSettings />} />
      <Route path="seasonal" element={<SeasonalList />} />
      <Route path="subscriptions" element={<SubscriptionList/>}/>

      <Route path="*" element={<NotFound/>}/>
     </Route>
    </Routes>
  );
}

export default AppRoutes;
