


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




import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoMdLogOut } from 'react-icons/io';
import { HiMenu, HiSearch } from 'react-icons/hi'; // React icons for menu and search
import DarkModeToggle from './DarkModeToggle';
import NotificationBadge from './NotificationBadge';
import admin from '../assets/admin.png';
import { logout } from '../api/auth';

const Topbar = ({ toggleSidebar, toggleDarkMode, darkMode, sidebarCollapsed }) => {
  const navigate = useNavigate();

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
        <NotificationBadge type="bell" count={3} />
        <NotificationBadge type="envelope" count={5} />
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
