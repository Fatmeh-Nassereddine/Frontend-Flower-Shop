import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';

const Dashboard = ({ darkMode, toggleSidebar, sidebarCollapsed, setActiveTab, activeTab, toggleDarkMode }) => {
  return (
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
          <Outlet /> {/* This renders the current page, no need for Sidebar or Topbar here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

