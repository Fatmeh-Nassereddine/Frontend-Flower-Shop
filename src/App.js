// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Topbar from './components/Topbar';
// import ProtectedRoute from './components/ProtectedRoute';

// import Dashboard from './pages/Admin/Dashboard';
// import ProductList from './pages/Admin/Products/ProductList';
// import AddProduct from './pages/Admin/Products/AddProduct';
// import EditProduct from './pages/Admin/Products/EditProduct';
// import OrderList from './pages/Admin/Orders/OrderList';
// import CategoryList from './pages/Admin/Categories/CategoryList';
// import UserList from './pages/Admin/Users/UserList';
// import ReviewList from './pages/Admin/Reviews/ReviewList';
// import DiscountList from './pages/Admin/Discounts/DiscountList';
// import MessageList from './pages/Admin/Messages/MessageList';
// import AdminSettings from './pages/Admin/Settings/AdminSettings';

// function App() {
//   return (
//     <Router>
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1">
//           <Topbar />
//           <div className="p-6 mt-4 ml-64">
//             <Routes>
//               <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//               <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
//               <Route path="/products/add" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
//               <Route path="/products/edit/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
//               <Route path="/orders" element={<ProtectedRoute><OrderList /></ProtectedRoute>} />
//               <Route path="/categories" element={<ProtectedRoute><CategoryList /></ProtectedRoute>} />
//               <Route path="/users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
//               <Route path="/reviews" element={<ProtectedRoute><ReviewList /></ProtectedRoute>} />
//               <Route path="/discounts" element={<ProtectedRoute><DiscountList /></ProtectedRoute>} />
//               <Route path="/messages" element={<ProtectedRoute><MessageList /></ProtectedRoute>} />
//               <Route path="/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;




// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Topbar from './components/Topbar';
// import ProtectedRoute from './components/ProtectedRoute';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// // Page Imports
// import Dashboard from './pages/Admin/Dashboard';
// import ProductList from './pages/Admin/Products/ProductList';
// import AddProduct from './pages/Admin/Products/AddProduct';
// import EditProduct from './pages/Admin/Products/EditProduct';
// import OrderList from './pages/Admin/Orders/OrderList';
// import CategoryList from './pages/Admin/Categories/CategoryList';
// import UserList from './pages/Admin/Users/UserList';
// import ReviewList from './pages/Admin/Reviews/ReviewList';
// import DiscountList from './pages/Admin/Discounts/DiscountList';
// import MessageList from './pages/Admin/Messages/MessageList';
// import AdminSettings from './pages/Admin/Settings/AdminSettings';

// const App = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <Router>
//       <div className={`flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
//         {/* Sidebar */}
//         <Sidebar
//           sidebarCollapsed={sidebarCollapsed}
//           setActiveTab={setActiveTab}
//           toggleSidebar={toggleSidebar}
//           darkMode={darkMode}
//           activeTab={activeTab}
//         />
        
//         {/* Main Content */}
//         <div className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
//           <Topbar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

//           {/* Routing and Protected Routes */}
//           <div className="p-6 mt-4">
//             <Routes>
//               <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//               <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
//               <Route path="/products/add" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
//               <Route path="/products/edit/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
//               <Route path="/orders" element={<ProtectedRoute><OrderList /></ProtectedRoute>} />
//               <Route path="/categories" element={<ProtectedRoute><CategoryList /></ProtectedRoute>} />
//               <Route path="/users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
//               <Route path="/reviews" element={<ProtectedRoute><ReviewList /></ProtectedRoute>} />
//               <Route path="/discounts" element={<ProtectedRoute><DiscountList /></ProtectedRoute>} />
//               <Route path="/messages" element={<ProtectedRoute><MessageList /></ProtectedRoute>} />
//               <Route path="/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;



// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ShopProvider } from './components/context/ShopContext'; // Import ShopProvider
// import Sidebar from './components/Sidebar';
// import Topbar from './components/Topbar';
// import ProtectedRoute from './components/ProtectedRoute';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import ProtectedRoute from './components/Route/ProtectedRoute';

// // Admin Page Imports
// import Dashboard from './pages/Admin/Dashboard';
// import ProductList from './pages/Admin/Products/ProductList';
// import AddProduct from './pages/Admin/Products/AddProduct';
// import EditProduct from './pages/Admin/Products/EditProduct';
// import OrderList from './pages/Admin/Orders/OrderList';
// import CategoryList from './pages/Admin/Categories/CategoryList';
// import UserList from './pages/Admin/Users/UserList';
// import ReviewList from './pages/Admin/Reviews/ReviewList';
// import DiscountList from './pages/Admin/Discounts/DiscountList';
// import MessageList from './pages/Admin/Messages/MessageList';
// import AdminSettings from './pages/Admin/Settings/AdminSettings';

// // Public Page Imports
// import Home from './pages/Home';
// import Shop from './pages/Shop';
// import Aboutus from './pages/Aboutus';
// import Seasonal from './pages/Seasonal';
// import Contact from './pages/Contact';
// import CartPage from './pages/CartPage.js';
// import Favorite from './pages/Favorite.js';
// import CategoryPage from "./pages/Category"; 
// import ProductPage from "./pages/ProductPage";
// import LoginUp from "./components/popAuth/LoginUp";

// function App() {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <ShopProvider>  {/* Wrap everything with the ShopProvider */}
//       <Router>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/shop" element={<Shop />} />
//           <Route path="/about" element={<Aboutus />} />
//           <Route path="/seasonal" element={<Seasonal />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/favorite" element={<Favorite />} />
//           <Route path="/categories" element={<CategoryPage />} />
//           <Route path="/product/:id" element={<ProductPage />} />
//           <Route path="/login" element={<LoginUp />} />
//         </Routes>

//         {/* Admin Routes */}
//         <div className={`flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
//           <Sidebar
//             sidebarCollapsed={sidebarCollapsed}
//             setActiveTab={setActiveTab}
//             toggleSidebar={toggleSidebar}
//             darkMode={darkMode}
//             activeTab={activeTab}
//           />

//           <div className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
//             <Topbar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

//             <div className="p-6 mt-4">
//               <Routes>
//                 <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//                 <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
//                 <Route path="/products/add" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
//                 <Route path="/products/edit/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
//                 <Route path="/orders" element={<ProtectedRoute><OrderList /></ProtectedRoute>} />
//                 <Route path="/category" element={<ProtectedRoute><CategoryList /></ProtectedRoute>} />
//                 <Route path="/users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
//                 <Route path="/reviews" element={<ProtectedRoute><ReviewList /></ProtectedRoute>} />
//                 <Route path="/discounts" element={<ProtectedRoute><DiscountList /></ProtectedRoute>} />
//                 <Route path="/messages" element={<ProtectedRoute><MessageList /></ProtectedRoute>} />
//                 <Route path="/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
//               </Routes>
//             </div>
//           </div>
//         </div>
//       </Router>
//     </ShopProvider>
//   );
// }

// export default App;

// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Contexts
import { ShopProvider } from './components/context/ShopContext';
import { AuthProvider } from './hooks/AuthContext';

// Components
import AppRoutes from './AppRoutes'; // we'll split routes into another file for clarity

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <AuthProvider>
        <ShopProvider>
          <AppRoutes
            darkMode={darkMode}
            toggleSidebar={toggleSidebar}
            toggleDarkMode={toggleDarkMode}
            sidebarCollapsed={sidebarCollapsed}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </ShopProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;


