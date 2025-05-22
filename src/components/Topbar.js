


// import React from 'react';
// import DarkModeToggle from './DarkModeToggle';
// import NotificationBadge from './NotificationBadge';
// import admin from '../assets/admin.png';

// const Topbar = ({ toggleSidebar, toggleDarkMode, darkMode }) => {
//   return (
//     <header className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md py-4 px-6 flex items-center justify-between ml-64`}>
//       {/* Left Section: Sidebar toggle and search bar */}
//       <div className="flex items-center">
//         <button onClick={toggleSidebar} className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none">
//           <i className="fas fa-bars"></i>
//         </button>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search..."
//             className={`pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-green-500 text-sm`}
//           />
//           <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
//         </div>
//       </div>

//       {/* Right Section: Dark mode toggle, notifications, and user info */}
//       <div className="flex items-center space-x-4">
//         <DarkModeToggle toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
//         <NotificationBadge type="bell" count={3} />
//         <NotificationBadge type="envelope" count={5} />
//         <div className="flex items-center cursor-pointer !rounded-button whitespace-nowrap">
//           <img
//             src= {admin}
//             alt="Admin"
//             className="w-8 h-8 rounded-full object-cover"
//           />
//           <span className="ml-2">Admin User</span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Topbar;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import DarkModeToggle from './DarkModeToggle';
// import NotificationBadge from './NotificationBadge';
// import admin from '../assets/admin.png';
// import { IoMdLogOut } from "react-icons/io"; // ✅ Using react-icons
// import { logout } from '../api/auth';

// const Topbar = ({ toggleSidebar, toggleDarkMode, darkMode }) => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       toast.success('Logged out successfully');
//       navigate('/');
//     } catch (error) {
//       toast.error(error.message || 'Logout failed');
//       console.error('Logout failed:', error.message);
//     }
//   };

//   return (
//     <header className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md py-4 px-6 flex items-center justify-between ml-64`}>
//       {/* Left Section */}
//       <div className="flex items-center">
//         <button onClick={toggleSidebar} className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none">
//           <i className="fas fa-bars"></i>
//         </button>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search..."
//             className={`pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-green-500 text-sm`}
//           />
//           <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center space-x-4">
//         <DarkModeToggle toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
//         <NotificationBadge type="bell" count={3} />
//         <NotificationBadge type="envelope" count={5} />
//         <div className="flex items-center cursor-pointer !rounded-button whitespace-nowrap">
//           <img
//             src={admin}
//             alt="Admin"
//             className="w-8 h-8 rounded-full object-cover"
//           />
//           <span className="ml-2 flex items-center gap-2">
//             Admin User
//             <button onClick={handleLogout} className="hover:text-red-500 transition text-xl">
//               <IoMdLogOut />
//             </button>
//           </span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Topbar;




// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { IoMdLogOut } from 'react-icons/io';
// import { HiMenu, HiSearch } from 'react-icons/hi'; // React icons for menu and search
// import DarkModeToggle from './DarkModeToggle';
// import NotificationBadge from './NotificationBadge';
// import admin from '../assets/admin.png';
// import { logout } from '../api/auth';

// const Topbar = ({ toggleSidebar, toggleDarkMode, darkMode, sidebarCollapsed }) => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       toast.success('Logged out successfully');
//       navigate('/');
//     } catch (error) {
//       toast.error(error.message || 'Logout failed');
//       console.error('Logout failed:', error.message);
//     }
//   };

//   return (
//     <header
//       className={`${
//         darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
//       } shadow-md py-4 px-6 flex items-center justify-between transition-all duration-300 ${
//         sidebarCollapsed ? 'ml-20' : 'ml-64'
//       }`}
//       role="banner"
//     >
//       {/* Left Section */}
//       <div className="flex items-center">
//         <button
//           onClick={toggleSidebar}
//           aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
//           className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
//           type="button"
//         >
//           <HiMenu size={24} />
//         </button>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search..."
//             aria-label="Search"
//             className={`pl-10 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
//               darkMode
//                 ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400'
//                 : 'bg-gray-100 text-gray-800 border-gray-200 placeholder-gray-500'
//             }`}
//           />
//           <HiSearch
//             size={20}
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//             aria-hidden="true"
//           />
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center space-x-4">
//         <DarkModeToggle toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
//         <NotificationBadge type="bell" count={3} />
//         <NotificationBadge type="envelope" count={5} />
//         <div className="flex items-center cursor-pointer rounded whitespace-nowrap">
//           <img
//             src={admin}
//             alt="Admin user avatar"
//             className="w-8 h-8 rounded-full object-cover"
//           />
//           <span className="ml-2 flex items-center gap-2">
//             Admin User
//             <button
//               onClick={handleLogout}
//               aria-label="Logout"
//               className="hover:text-red-500 transition text-xl focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
//               type="button"
//             >
//               <IoMdLogOut />
//             </button>
//           </span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Topbar;





// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { IoMdLogOut } from 'react-icons/io';
// import { HiMenu, HiSearch } from 'react-icons/hi';
// import DarkModeToggle from './DarkModeToggle';
// import NotificationBadge from './NotificationBadge';
// import admin from '../assets/admin.png';
// import { logout } from '../api/auth';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const Topbar = ({ toggleSidebar, toggleDarkMode, darkMode, sidebarCollapsed }) => {
//   const navigate = useNavigate();
//   const [orderCount, setOrderCount] = useState(0);
//   const [subscriptionCount, setSubscriptionCount] = useState(0);
//   const [messageCount, setMessageCount] = useState(0);

//   const fetchNotifications = async () => {
//     try {
//       const token = Cookies.get('token');
//       const headers = token ? { Authorization: `Bearer ${token}` } : {};

//       const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/api/notifications/orders-subscriptions`, { headers });
//       setOrderCount(res1.data.orders.length);
//       setSubscriptionCount(res1.data.subscriptions.length);

//       const res2 = await axios.get(`${process.env.REACT_APP_API_URL}api/notifications/messages`, { headers });
//       setMessageCount(res2.data.messages.length);
//     } catch (err) {
//       console.error('Error fetching notifications:', err);
//       toast.error('Failed to fetch notifications');
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const handleOrdersClick = async () => {
//     try {
//       const token = Cookies.get('token');
//       const headers = token ? { Authorization: `Bearer ${token}` } : {};

//       await axios.patch(`${process.env.REACT_APP_API_URL}/api/notifications/orders/viewed`, {}, { headers });
//       await axios.patch(`${process.env.REACT_APP_API_URL}/api/notifications/subscriptions/viewed`, {}, { headers });

//       setOrderCount(0);
//       setSubscriptionCount(0);
//     } catch (err) {
//       console.error('Error marking orders/subscriptions as viewed:', err);
//       toast.error('Failed to mark as viewed');
//     }
//   };

//   const handleMessagesClick = async () => {
//     try {
//       const token = Cookies.get('token');
//       const headers = token ? { Authorization: `Bearer ${token}` } : {};

//       await axios.patch(`${process.env.REACT_APP_API_URL}/api/notifications/messages/viewed`, {}, { headers });
//       setMessageCount(0);
//     } catch (err) {
//       console.error('Error marking messages as viewed:', err);
//       toast.error('Failed to mark as viewed');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       toast.success('Logged out successfully');
//       navigate('/');
//     } catch (error) {
//       toast.error(error.message || 'Logout failed');
//       console.error('Logout failed:', error.message);
//     }
//   };

//   return (
//     <header
//       className={`${
//         darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
//       } shadow-md py-4 px-6 flex items-center justify-between transition-all duration-300 ${
//         sidebarCollapsed ? 'ml-20' : 'ml-64'
//       }`}
//       role="banner"
//     >
//       {/* Left Section */}
//       <div className="flex items-center">
//         <button
//           onClick={toggleSidebar}
//           aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
//           className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
//           type="button"
//         >
//           <HiMenu size={24} />
//         </button>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search..."
//             aria-label="Search"
//             className={`pl-10 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
//               darkMode
//                 ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400'
//                 : 'bg-gray-100 text-gray-800 border-gray-200 placeholder-gray-500'
//             }`}
//           />
//           <HiSearch
//             size={20}
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//             aria-hidden="true"
//           />
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center space-x-4">
//         <DarkModeToggle toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
//         <NotificationBadge
//           type="bell"
//           count={orderCount + subscriptionCount}
//           onClick={handleOrdersClick}
//         />
//         <NotificationBadge
//           type="envelope"
//           count={messageCount}
//           onClick={handleMessagesClick}
//         />
//         <div className="flex items-center cursor-pointer rounded whitespace-nowrap">
//           <img
//             src={admin}
//             alt="Admin user avatar"
//             className="w-8 h-8 rounded-full object-cover"
//           />
//           <span className="ml-2 flex items-center gap-2">
//             Admin User
//             <button
//               onClick={handleLogout}
//               aria-label="Logout"
//               className="hover:text-red-500 transition text-xl focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
//               type="button"
//             >
//               <IoMdLogOut />
//             </button>
//           </span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Topbar;

//old


// ${process.env.REACT_APP_API_URL}





// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { IoMdLogOut } from 'react-icons/io';
// import { HiMenu, HiSearch } from 'react-icons/hi';
// import DarkModeToggle from './DarkModeToggle';
// import NotificationBadge from './NotificationBadge';
// import admin from '../assets/admin.png';
// import { logout } from '../api/auth';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const Topbar = ({ toggleSidebar, toggleDarkMode, darkMode, sidebarCollapsed }) => {
//   const navigate = useNavigate();
//   const [orderCount, setOrderCount] = useState(0);
//   const [subscriptionCount, setSubscriptionCount] = useState(0);
//   const [messageCount, setMessageCount] = useState(0);
//   const [orders, setOrders] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const token = Cookies.get('token');
//         const headers = token ? { Authorization: `Bearer ${token}` } : {};

//         const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/api/notifications/orders-subscriptions`, { headers });
//         setOrderCount(res1.data.orders.length);
//         setSubscriptionCount(res1.data.subscriptions.length);
//         setOrders(res1.data.orders);

//         const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/api/notifications/messages`, { headers });
//         setMessageCount(res2.data.messages.length);
//         setMessages(res2.data.messages);
//       } catch (err) {
//         console.error('Error fetching notifications:', err);
//         toast.error('Failed to fetch notifications');
//       }
//     };

//     fetchNotifications();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpenDropdown(null);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await logout();
//       toast.success('Logged out successfully');
//       navigate('/');
//     } catch (error) {
//       toast.error(error.message || 'Logout failed');
//     }
//   };

//   const toggleDropdown = (type) => {
//     setOpenDropdown((prev) => (prev === type ? null : type));
//   };

//   return (
//     <header className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md py-4 px-6 flex items-center justify-between transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
//       <div className="flex items-center">
//         <button onClick={toggleSidebar} className="mr-4 text-gray-500 hover:text-gray-700">
//           <HiMenu size={24} />
//         </button>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search..."
//             className={`pl-10 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${darkMode ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400' : 'bg-gray-100 text-gray-800 border-gray-200 placeholder-gray-500'}`}
//           />
//           <HiSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//         </div>
//       </div>

//       <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
//         <DarkModeToggle toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

//         <div className="relative">
//           <NotificationBadge type="bell" count={orderCount + subscriptionCount} onClick={() => toggleDropdown('orders')} />
//           {openDropdown === 'orders' && (
//             <div className="absolute right-0 top-10 bg-white text-black shadow-lg rounded-lg w-80 z-50">
//               <div className="p-4 font-bold border-b">Unseen Orders</div>
//               <ul className="max-h-64 overflow-y-auto">
//                 {orders.length === 0 ? (
//                   <li className="p-4 text-sm text-gray-500">No new orders</li>
//                 ) : (
//                   orders.map((order) => (
//                     <li key={order.order_id} className="px-4 py-2 text-sm hover:bg-gray-100">
//                       {order.customer_name || 'Order'} - {order.status || 'Pending'}
//                     </li>
//                   ))
//                 )}
//               </ul>
//               <div className="mt-4 text-center">
//                 <Link to="/dashboard/orders" className="text-green-500 hover:underline text-sm">
//                   View all orders
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="relative">
//           <NotificationBadge type="envelope" count={messageCount} onClick={() => toggleDropdown('messages')} />
//           {openDropdown === 'messages' && (
//             <div className="absolute right-0 top-10 bg-white text-black shadow-lg rounded-lg w-80 z-50">
//               <div className="p-4 font-bold border-b">Unseen Messages</div>
//               <ul className="max-h-64 overflow-y-auto">
//                 {messages.length === 0 ? (
//                   <li className="p-4 text-sm text-gray-500">No new messages</li>
//                 ) : (
//                   messages.map((msg) => (
//                     <li key={msg.contact_id} className="px-4 py-2 text-sm hover:bg-gray-100">
//                       {msg.name || 'User'} - {msg.subject || 'Message'}
//                     </li>
//                   ))
//                 )}
//               </ul>
//               <div className="mt-4 text-center">
//                 <Link to="/dashboard/messages" className="text-green-500 hover:underline text-sm">
//                   View all messages
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex items-center cursor-pointer rounded whitespace-nowrap">
//           <img
//             src={admin}
//             alt="Admin user avatar"
//             className="w-8 h-8 rounded-full object-cover"
//           />
//           <span className="ml-2 flex items-center gap-2">
//             Admin User
//             <button onClick={handleLogout} className="hover:text-red-500 transition text-xl">
//               <IoMdLogOut />
//             </button>
//           </span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Topbar;


//new last
// src/components/Topbar.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { IoMdLogOut } from 'react-icons/io';
// import { HiMenu, HiSearch } from 'react-icons/hi';
// import DarkModeToggle from './DarkModeToggle';
// import NotificationBadge from './NotificationBadge';
// import admin from '../assets/admin.png';
// import { logout } from '../api/auth';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const Topbar = ({ toggleSidebar, toggleDarkMode, darkMode, sidebarCollapsed }) => {
//   const navigate = useNavigate();
//   const [orderCount, setOrderCount] = useState(0);
//   const [subscriptionCount, setSubscriptionCount] = useState(0);
//   const [messageCount, setMessageCount] = useState(0);

//   const fetchNotifications = async () => {
//     try {
//       const token = Cookies.get('token');
//       const headers = token ? { Authorization: `Bearer ${token}` } : {};

//       const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/api/notifications/orders-subscriptions`, { headers });
//       setOrderCount(res1.data.orders.length);
//       setSubscriptionCount(res1.data.subscriptions.length);

//       const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/api/notifications/messages`, { headers });
//       setMessageCount(res2.data.messages.length);
//     } catch (err) {
//       console.error('Error fetching notifications:', err);
//       toast.error('Failed to fetch notifications');
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const handleOrdersClick = async () => {
//     try {
//       const token = Cookies.get('token');
//       const headers = token ? { Authorization: `Bearer ${token}` } : {};

//       await axios.patch(`${process.env.REACT_APP_API_URL}/api/notifications/orders/viewed`, {}, { headers });
//       await axios.patch(`${process.env.REACT_APP_API_URL}/api/notifications/subscriptions/viewed`, {}, { headers });

//       setOrderCount(0);
//       setSubscriptionCount(0);
//     } catch (err) {
//       console.error('Error marking orders/subscriptions as viewed:', err);
//       toast.error('Failed to mark as viewed');
//     }
//   };

//   const handleMessagesClick = async () => {
//     try {
//       const token = Cookies.get('token');
//       const headers = token ? { Authorization: `Bearer ${token}` } : {};

//       await axios.patch(`${process.env.REACT_APP_API_URL}/api/notifications/messages/viewed`, {}, { headers });
//       setMessageCount(0);
//     } catch (err) {
//       console.error('Error marking messages as viewed:', err);
//       toast.error('Failed to mark as viewed');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       toast.success('Logged out successfully');
//       navigate('/');
//     } catch (error) {
//       toast.error(error.message || 'Logout failed');
//       console.error('Logout failed:', error.message);
//     }
//   };

//   return (
//     <header
//       className={`${
//         darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
//       } shadow-md py-4 px-6 flex items-center justify-between transition-all duration-300 ${
//         sidebarCollapsed ? 'ml-20' : 'ml-64'
//       }`}
//       role="banner"
//     >
//       {/* Left Section */}
//       <div className="flex items-center">
//         <button
//           onClick={toggleSidebar}
//           aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
//           className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
//           type="button"
//         >
//           <HiMenu size={24} />
//         </button>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search..."
//             aria-label="Search"
//             className={`pl-10 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
//               darkMode
//                 ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400'
//                 : 'bg-gray-100 text-gray-800 border-gray-200 placeholder-gray-500'
//             }`}
//           />
//           <HiSearch
//             size={20}
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//             aria-hidden="true"
//           />
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center space-x-4">
//         <DarkModeToggle toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
//         <NotificationBadge
//           type="bell"
//           count={orderCount + subscriptionCount}
//           onClick={handleOrdersClick}
//         />
//         <NotificationBadge
//           type="envelope"
//           count={messageCount}
//           onClick={handleMessagesClick}
//         />
//         <div className="flex items-center cursor-pointer rounded whitespace-nowrap">
//           <img
//             src={admin}
//             alt="Admin user avatar"
//             className="w-8 h-8 rounded-full object-cover"
//           />
//           <span className="ml-2 flex items-center gap-2">
//             Admin User
//             <button
//               onClick={handleLogout}
//               aria-label="Logout"
//               className="hover:text-red-500 transition text-xl focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
//               type="button"
//             >
//               <IoMdLogOut />
//             </button>
//           </span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Topbar;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoMdLogOut } from 'react-icons/io';
import { HiMenu, HiSearch } from 'react-icons/hi';
import DarkModeToggle from './DarkModeToggle';
import NotificationBadgeWithDropdown from './NotificationBadge';
import admin from '../assets/admin.png';
import { logout } from '../api/auth';
import axios from 'axios';
import Cookies from 'js-cookie';

const Topbar = ({ toggleSidebar, toggleDarkMode, darkMode, sidebarCollapsed }) => {
  const navigate = useNavigate();
  const [orderCount, setOrderCount] = useState(0);
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  // Store notifications data
  const [orders, setOrders] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [messages, setMessages] = useState([]);

  const fetchNotifications = async () => {
    try {
      const token = Cookies.get('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/api/notifications/orders-subscriptions`, { headers });
      setOrders(res1.data.orders);
      setSubscriptions(res1.data.subscriptions);
      setOrderCount(res1.data.orders.length);
      setSubscriptionCount(res1.data.subscriptions.length);

      const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/api/notifications/messages`, { headers });
      setMessages(res2.data.messages);
      setMessageCount(res2.data.messages.length);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      toast.error('Failed to fetch notifications');
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleOrdersClick = async () => {
    try {
      const token = Cookies.get('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      await axios.patch(`${process.env.REACT_APP_API_URL}/api/notifications/orders/viewed`, {}, { headers });
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/notifications/subscriptions/viewed`, {}, { headers });

      setOrderCount(0);
      setSubscriptionCount(0);
    } catch (err) {
      console.error('Error marking orders/subscriptions as viewed:', err);
      toast.error('Failed to mark as viewed');
    }
  };

  const handleMessagesClick = async () => {
    try {
      const token = Cookies.get('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      await axios.patch(`${process.env.REACT_APP_API_URL}/api/notifications/messages/viewed`, {}, { headers });
      setMessageCount(0);
    } catch (err) {
      console.error('Error marking messages as viewed:', err);
      toast.error('Failed to mark as viewed');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Logout failed');
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <header
      className={`${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } shadow-md py-4 px-6 flex items-center justify-between transition-all duration-300 ${
        sidebarCollapsed ? 'ml-20' : 'ml-64'
      }`}
      role="banner"
    >
      {/* Left Section */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
          type="button"
        >
          <HiMenu size={24} />
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search"
            className={`pl-10 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
              darkMode
                ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400'
                : 'bg-gray-100 text-gray-800 border-gray-200 placeholder-gray-500'
            }`}
          />
          <HiSearch
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <DarkModeToggle toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

        <NotificationBadgeWithDropdown
          type="bell"
          count={orderCount + subscriptionCount}
          onClick={handleOrdersClick}
        >
          <div className="p-2">
            <h4 className="font-semibold px-2">Orders</h4>
            {orders.length === 0 && <p className="px-2 text-sm text-gray-500 dark:text-gray-400">No new orders</p>}
            {orders.map(order => (
              <div key={order.order_id} className="border-b last:border-b-0 py-1 px-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                <p className="text-sm font-medium">Order #{order.order_id}</p>
                <p className="text-xs text-gray-500">{new Date(order.order_date).toLocaleString()}</p>
              </div>
            ))}
            <h4 className="font-semibold px-2 mt-2">Subscriptions</h4>
            {subscriptions.length === 0 && <p className="px-2 text-sm text-gray-500 dark:text-gray-400">No new subscriptions</p>}
            {subscriptions.map(sub => (
              <div key={sub.subscription_id} className="border-b last:border-b-0 py-1 px-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                <p className="text-sm font-medium">Subscription #{sub.subscription_id}</p>
                <p className="text-xs text-gray-500">
                  Created {new Date(sub.created_at).toLocaleString()} | Frequency: {sub.delivery_frequency}
                </p>
              </div>
            ))}
          </div>
        </NotificationBadgeWithDropdown>

        <NotificationBadgeWithDropdown
          type="envelope"
          count={messageCount}
          onClick={handleMessagesClick}
        >
          <div className="p-2">
            <h4 className="font-semibold px-2">Messages</h4>
            {messages.length === 0 && <p className="px-2 text-sm text-gray-500 dark:text-gray-400">No new messages</p>}
            {messages.map(msg => (
              <div key={msg.id} className="border-b last:border-b-0 py-1 px-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                <p className="text-sm font-medium">{msg.first_name}</p>
                <p className="text-xs text-gray-500">{msg.subject}</p>
                <p className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </NotificationBadgeWithDropdown>

        <div className="flex items-center cursor-pointer rounded whitespace-nowrap">
          <img
            src={admin}
            alt="Admin user avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="ml-2 flex items-center gap-2">
            Admin User
            <button
              onClick={handleLogout}
              aria-label="Logout"
              className="hover:text-red-500 transition text-xl focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
              type="button"
            >
              <IoMdLogOut />
            </button>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
