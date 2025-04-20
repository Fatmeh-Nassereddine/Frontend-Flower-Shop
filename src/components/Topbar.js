// // Topbar.jsx
// const Topbar = () => {
//     return (
//       <div className="ml-64 h-16 bg-white shadow px-6 flex justify-between items-center">
//         <h2 className="text-xl font-semibold">Admin Panel</h2>
//         <button className=" bg-sidebar text-white px-4 py-2 rounded">Logout</button>
//       </div>
//     );
//   };
  
//   export default Topbar;
  

// const Topbar = () => {
//   return (
//     <div className="h-16 bg-white shadow px-6 flex items-center justify-between ml-64">
//       <h2 className="text-xl font-semibold">Admin Dashboard</h2>
//       <div className="flex items-center space-x-4">
//         <span>🔔</span>
//         <span>👤 Admin</span>
//         <button className=" bg-sidebar text-white px-4 py-2 rounded">Logout</button>
//       </div>
//     </div>
//   );
// };

// export default Topbar;


import React from 'react';
import DarkModeToggle from './DarkModeToggle';
import NotificationBadge from './NotificationBadge';

const Topbar = ({ toggleSidebar, toggleDarkMode, darkMode }) => {
  return (
    <header className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md py-4 px-6 flex items-center justify-between ml-64`}>
      {/* Left Section: Sidebar toggle and search bar */}
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none">
          <i className="fas fa-bars"></i>
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className={`pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-green-500 text-sm`}
          />
          <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>
      </div>

      {/* Right Section: Dark mode toggle, notifications, and user info */}
      <div className="flex items-center space-x-4">
        <DarkModeToggle toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <NotificationBadge type="bell" count={3} />
        <NotificationBadge type="envelope" count={5} />
        <div className="flex items-center cursor-pointer !rounded-button whitespace-nowrap">
          <img
            src="https://public.readdy.ai/ai/img_res/0f16cc7ef47cd62cb0388e34c7943cb2.jpg"
            alt="Admin"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="ml-2">Admin User</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
