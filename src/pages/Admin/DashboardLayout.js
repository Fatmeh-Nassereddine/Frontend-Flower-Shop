import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet, useLocation } from 'react-router-dom';

const DashboardLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const location = useLocation();

  // Function to toggle dark mode
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Function to toggle sidebar collapse
  const toggleSidebar = () => setSidebarCollapsed(prev => !prev);

  // Auto update activeTab based on route
  useEffect(() => {
    const pathToTab = {
      '/dashboard': 'dashboard',
      '/dashboard/products': 'products',
      '/dashboard/category': 'categories',
      '/dashboard/seasonal': 'seasonal',
      '/dashboard/orders': 'orders',
      '/dashboard/users': 'users',
      '/dashboard/reviews': 'reviews',
      '/dashboard/discounts': 'discounts',
      '/dashboard/messages': 'messages',
      '/dashboard/settings': 'settings',
    };
    const tab = pathToTab[location.pathname];
    if (tab) setActiveTab(tab);
  }, [location.pathname]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
        darkMode={darkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className={`ml-${sidebarCollapsed ? '20' : '64'} transition-all duration-300`}>
        <Topbar
          toggleSidebar={toggleSidebar}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          sidebarCollapsed={sidebarCollapsed}
        />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
