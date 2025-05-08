// import { Link } from 'react-router-dom';
// import logo from '../assets/logo.svg';

// const Sidebar = () => {
//   return (
//     <div className="w-64 h-screen bg-sidebar text-white fixed flex flex-col items-center">
//       {/* Centered Logo */}
//       <div className="py-6 ">
//         <img src={logo} alt="FlowerShop Logo" className="w-26 h-24" />
//         <h1 className="text-xl font-bold">FlowerShop Admin</h1>
//       </div>

//       {/* Nav Menu */}
//       <nav className="flex flex-col space-y-4 w-full px-6">
//         <Link to="/dashboard">Dashboard</Link>
//         <Link to="/products">Products</Link>
//         <Link to="/orders">Orders</Link>
//         <Link to="/categories">Categories</Link>
//         <Link to="/users">Users</Link>
//         <Link to="/reviews">Reviews</Link>
//         <Link to="/discounts">Discounts</Link>
//         <Link to="/messages">Messages</Link>
//         <Link to="/settings">Settings</Link>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../assets/logo.svg';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLeaf, faBars, faTachometerAlt, faCogs, faBox, faList, faUsers, faStar, faPercent, faComment } from '@fortawesome/free-solid-svg-icons';

// const Sidebar = ({ sidebarCollapsed, setActiveTab, toggleSidebar, darkMode, activeTab }) => {
//   const activeClass = 'bg-[#D63384] text-White'; // Use the custom color for active state
//   const inactiveClass = `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`; // Inactive state styling

//   return (
//     <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-[#9EA0A2] shadow-lg transition-all duration-300 fixed h-full z-10`}>
//       {/* Sidebar Header with Logo and Icon */}
//       <div className="flex items-center justify-between p-4 border-b border-gray-200">
//         <div className="flex items-center w-full">
//           <img
//             src={logo}
//             alt="FlowerShop Logo"
//             className={`${sidebarCollapsed ? 'w-16 h-16' : 'w-24 h-24'}`}
//           />
          
//           {/* Show the 'faBars' icon next to the logo when sidebar is expanded */}
//           {!sidebarCollapsed && (
//             <FontAwesomeIcon
//               icon={faBars}
//               onClick={toggleSidebar}
//               className="ml-3 cursor-pointer text-gray-500 hover:text-gray-700"
//             />
//           )}
//         </div>

//         {/* Show text below logo only if the sidebar is expanded */}
//         {!sidebarCollapsed && (
//           <div className="flex flex-col items-center mt-2">
//             <span className="font-semibold text-xl">FlowerShop Admin</span>
//           </div>
//         )}
//       </div>

//       {/* Sidebar Navigation Menu */}
//       <nav className="mt-6">
//         <Link
//           to="/dashboard"
//           onClick={() => setActiveTab('dashboard')}
//           className={`cursor-pointer flex items-center p-4 ${sidebarCollapsed ? 'justify-center' : ''} ${activeTab === 'dashboard' ? `${activeClass}` : `${inactiveClass}`}`}
//         >
//           <FontAwesomeIcon icon={faTachometerAlt} />
//           {!sidebarCollapsed && <span className="ml-4">Dashboard</span>}
//         </Link>

//         <Link
//           to="/products"
//           onClick={() => setActiveTab('products')}
//           className={`cursor-pointer flex items-center p-4 ${sidebarCollapsed ? 'justify-center' : ''} ${activeTab === 'products' ? `${activeClass}` : `${inactiveClass}`}`}
//         >
//           <FontAwesomeIcon icon={faLeaf} />
//           {!sidebarCollapsed && <span className="ml-4">Products</span>}
//         </Link>

//         <Link
//           to="/orders"
//           onClick={() => setActiveTab('orders')}
//           className={`cursor-pointer flex items-center p-4 ${sidebarCollapsed ? 'justify-center' : ''} ${activeTab === 'orders' ? `${activeClass}` : `${inactiveClass}`}`}
//         >
//           <FontAwesomeIcon icon={faBox} />
//           {!sidebarCollapsed && <span className="ml-4">Orders</span>}
//         </Link>

//         <Link
//           to="/category"
//           onClick={() => setActiveTab('category')}
//           className={`cursor-pointer flex items-center p-4 ${sidebarCollapsed ? 'justify-center' : ''} ${activeTab === 'categories' ? `${activeClass}` : `${inactiveClass}`}`}
//         >
//           <FontAwesomeIcon icon={faList} />
//           {!sidebarCollapsed && <span className="ml-4">Categories</span>}
//         </Link>

//         <Link
//           to="/users"
//           onClick={() => setActiveTab('users')}
//           className={`cursor-pointer flex items-center p-4 ${sidebarCollapsed ? 'justify-center' : ''} ${activeTab === 'users' ? `${activeClass}` : `${inactiveClass}`}`}
//         >
//           <FontAwesomeIcon icon={faUsers} />
//           {!sidebarCollapsed && <span className="ml-4">Users</span>}
//         </Link>

//         <Link
//           to="/reviews"
//           onClick={() => setActiveTab('reviews')}
//           className={`cursor-pointer flex items-center p-4 ${sidebarCollapsed ? 'justify-center' : ''} ${activeTab === 'reviews' ? `${activeClass}` : `${inactiveClass}`}`}
//         >
//           <FontAwesomeIcon icon={faStar} />
//           {!sidebarCollapsed && <span className="ml-4">Reviews</span>}
//         </Link>

//         <Link
//           to="/discounts"
//           onClick={() => setActiveTab('discounts')}
//           className={`cursor-pointer flex items-center p-4 ${sidebarCollapsed ? 'justify-center' : ''} ${activeTab === 'discounts' ? `${activeClass}` : `${inactiveClass}`}`}
//         >
//           <FontAwesomeIcon icon={faPercent} />
//           {!sidebarCollapsed && <span className="ml-4">Discounts</span>}
//         </Link>

//         <Link
//           to="/messages"
//           onClick={() => setActiveTab('messages')}
//           className={`cursor-pointer flex items-center p-4 ${sidebarCollapsed ? 'justify-center' : ''} ${activeTab === 'messages' ? `${activeClass}` : `${inactiveClass}`}`}
//         >
//           <FontAwesomeIcon icon={faComment} />
//           {!sidebarCollapsed && <span className="ml-4">Messages</span>}
//         </Link>

//         <Link
//           to="/settings"
//           onClick={() => setActiveTab('settings')}
//           className={`cursor-pointer flex items-center p-4 ${sidebarCollapsed ? 'justify-center' : ''} ${activeTab === 'settings' ? `${activeClass}` : `${inactiveClass}`}`}
//         >
//           <FontAwesomeIcon icon={faCogs} />
//           {!sidebarCollapsed && <span className="ml-4">Settings</span>}
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;



import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation for checking current path
import {
  faLeaf, faBars, faTachometerAlt, faCogs,
  faBox, faList, faUsers, faStar, faPercent, faComment
} from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.svg';

const Sidebar = ({ sidebarCollapsed, setActiveTab, toggleSidebar, darkMode, activeTab }) => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Correct usage

  const handleNavigation = (path, tab) => {
    setActiveTab(tab);
    if (location.pathname !== path) {
      navigate(path);
    }
  };
  const activeClass = 'bg-[#D63384] text-white'; // Active tab styles
  const inactiveClass = darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'; // Inactive tab styles

  const navItems = [
    { tab: 'dashboard', icon: faTachometerAlt, label: 'Dashboard', path: '/dashboard' },
    { tab: 'products', icon: faLeaf, label: 'Products', path: '/dashboard/products' },
    { tab: 'orders', icon: faBox, label: 'Orders', path: '/dashboard/orders' },
    { tab: 'categories', icon: faList, label: 'Categories', path: '/dashboard/category' },
    { tab: 'users', icon: faUsers, label: 'Users', path: '/dashboard/users' },
    { tab: 'reviews', icon: faStar, label: 'Reviews', path: '/dashboard/reviews' },
    { tab: 'discounts', icon: faPercent, label: 'Discounts', path: '/dashboard/discounts' },
    { tab: 'messages', icon: faComment, label: 'Messages', path: '/dashboard/messages' },
    { tab: 'settings', icon: faCogs, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-[#9EA0A2] shadow-lg transition-all duration-300 fixed h-full z-10`}>
      {/* Logo and sidebar toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center w-full">
          <img
            src={logo}
            alt="FlowerShop Logo"
            className={`${sidebarCollapsed ? 'w-16 h-16' : 'w-24 h-24'} transition-all`}
          />
          {/* Toggle sidebar button */}
          {!sidebarCollapsed && (
            <FontAwesomeIcon
              icon={faBars}
              onClick={toggleSidebar}
              className="ml-3 cursor-pointer text-gray-500 hover:text-gray-700"
            />
          )}
        </div>
        {/* Sidebar text on expanded mode */}
        {!sidebarCollapsed && (
          <div className="flex flex-col items-center mt-2">
            <span className="font-semibold text-xl">FlowerShop Admin</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        {navItems.map(({ tab, icon, label, path }) => (
          <Link to={path} key={tab}> {/* Using Link for navigation */}
            {/* Only allow navigation if the path is different from the current location */}
            <div
              onClick={() => setActiveTab(tab)} // Set active tab
              className={`cursor-pointer flex items-center p-4 ${sidebarCollapsed ? 'justify-center' : ''} ${activeTab === tab ? activeClass : inactiveClass}`}
            >
              <FontAwesomeIcon icon={icon} />
              {/* Show label only if the sidebar is expanded */}
              {!sidebarCollapsed && <span className="ml-4">{label}</span>}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
