import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  faLeaf, faBars, faTachometerAlt, faCogs,
  faBox, faList, faUsers, faStar, faPercent, faComment, faSeedling, faNewspaper
} from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.svg';

const Sidebar = ({ sidebarCollapsed, setActiveTab, toggleSidebar, darkMode, activeTab }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path, tab) => {
    setActiveTab(tab);
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const activeClass = 'bg-[#D63384] text-white';
  const inactiveClass = darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100';

  const navItems = [
    { tab: 'dashboard', icon: faTachometerAlt, label: 'Dashboard', path: '/dashboard' },
    { tab: 'products', icon: faLeaf, label: 'Products', path: '/dashboard/products' },
    { tab: 'categories', icon: faList, label: 'Categories', path: '/dashboard/category' },
    { tab: 'seasonal', icon: faSeedling, label: 'Seasonal', path: '/dashboard/seasonal' },
    { tab: 'orders', icon: faBox, label: 'Orders', path: '/dashboard/orders' },
    { tab: 'users', icon: faUsers, label: 'Users', path: '/dashboard/users' },
    { tab: 'reviews', icon: faStar, label: 'Reviews', path: '/dashboard/reviews' },
    { tab: 'discounts', icon: faPercent, label: 'Discounts', path: '/dashboard/discounts' },
    { tab: 'messages', icon: faComment, label: 'Messages', path: '/dashboard/messages' },
    { tab: 'subscriptions', icon: faNewspaper, label: 'Subscriptions', path: '/dashboard/subscriptions' },
    { tab: 'settings', icon: faCogs, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} ${darkMode ? 'bg-gray-800' : 'bg-[#9EA0A2]'} shadow-lg transition-all duration-300 fixed h-full z-10 flex flex-col`}>
      
      {/* Header Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="ml-4 flex items-center max-w-full">
          <img
            src={logo}
            alt="FlowerShop Logo"
            className={`${sidebarCollapsed ? 'w-12 h-12' : 'w-26 h-26'} transition-all`}
          />
          {!sidebarCollapsed && (
            <FontAwesomeIcon
              icon={faBars}
              onClick={toggleSidebar}
              className="ml-8 cursor-pointer text-gray-600 hover:text-gray-800 text-xl"
            />
          )}
        </div>
        {!sidebarCollapsed && (
          <div className="text-center mt-2">
            <span className="font-semibold text-xl">FlowerShop Admin</span>
          </div>
        )}
      </div>

      {/* Navigation Section (Scrollable) */}
      <div className="flex-1 overflow-y-auto">
        <nav className="mt-4 pb-4">
          {navItems.map(({ tab, icon, label, path }) => (
            <Link to={path} key={tab}>
              <div
                title={sidebarCollapsed ? label : ''}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer flex items-center p-4 ${sidebarCollapsed ? 'justify-center' : ''} ${activeTab === tab ? activeClass : inactiveClass}`}
              >
                <FontAwesomeIcon icon={icon} />
                {!sidebarCollapsed && <span className="ml-4">{label}</span>}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
