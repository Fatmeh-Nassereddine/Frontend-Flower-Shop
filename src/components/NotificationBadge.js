// import React from 'react';

// const NotificationBadge = ({ type, count }) => {
//   return (
//     <div className="relative cursor-pointer !rounded-button whitespace-nowrap">
//       <i className={`fas fa-${type} text-xl`}></i>
//       <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{count}</span>
//     </div>
//   );
// };

// export default NotificationBadge;




// import React, { useState, useRef, useEffect } from 'react';
// import { FaBell, FaEnvelope } from 'react-icons/fa';

// const NotificationBadge = ({ type, count, children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const badgeRef = useRef(null);

//   const icon = type === 'bell' ? <FaBell /> : <FaEnvelope />;

//   const toggleDropdown = () => setIsOpen((prev) => !prev);

//   // Close dropdown if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (badgeRef.current && !badgeRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div ref={badgeRef} className="relative">
//       <button
//         onClick={toggleDropdown}
//         className="relative text-gray-600 hover:text-green-500 focus:outline-none"
//         aria-label={`Open ${type} notifications`}
//       >
//         {icon}
//         {count > 0 && (
//           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
//             {count}
//           </span>
//         )}
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md z-50 p-3 text-sm border">
//           {children ? (
//             children
//           ) : (
//             <p className="text-gray-500 italic">No notifications</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationBadge;







// // src/components/NotificationBadge.jsx
// import React from 'react';

// const NotificationBadge = ({ type, count, onClick }) => {
//   // Font Awesome icons used via classes; adjust if you prefer React Icons
//   return (
//     <div
//       className="relative cursor-pointer rounded whitespace-nowrap"
//       onClick={onClick}
//       aria-label={`${type} notifications`}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => e.key === 'Enter' && onClick()}
//     >
//       <i className={`fas fa-${type} text-xl`}></i>
//       {count > 0 && (
//         <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//           {count}
//         </span>
//       )}
//     </div>
//   );
// };

// export default NotificationBadge;



import React, { useState, useRef, useEffect } from 'react';

const NotificationBadgeWithDropdown = ({ type, count, onClick, children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setOpen(!open);
    if (onClick) onClick(); // mark viewed or reset counts
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={toggleDropdown}
        className="relative focus:outline-none"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Show ${type} notifications`}
      >
        <i className={`fas fa-${type} text-xl`}></i>
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {count}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 max-h-60 overflow-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg z-50">
          {children}
        </div>
      )}
    </div>
  );
};

export default NotificationBadgeWithDropdown;
