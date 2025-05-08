

// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
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
      {/* This is where the global toast container is placed */}
      <ToastContainer
        position="top-center" // Position of the toast on the screen
        autoClose={5000} // Time in milliseconds before toast disappears
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} // Newest toasts will appear at the bottom
        closeButton={true} // Toast will have a close button
        rtl={false} // Set true if you want the toast to show in right-to-left languages
        pauseOnFocusLoss={true} // Pause toast on window focus loss
        draggable={true} // Allow dragging of toast
        theme="colored" // Choose between light, dark, or colored themes
      />
    </Router>
  );
}

export default App;


