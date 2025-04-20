import React from 'react';

const DarkModeToggle = ({ toggleDarkMode, darkMode }) => {
  console.log("Dark Mode State:", darkMode); // Check if the state is correct

  return (
    <button onClick={toggleDarkMode} className="cursor-pointer rounded-full p-2">
      <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
    </button>
  );
};

export default DarkModeToggle;

