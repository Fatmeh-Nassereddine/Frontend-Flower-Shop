import React from 'react';

const NotificationBadge = ({ type, count }) => {
  return (
    <div className="relative cursor-pointer !rounded-button whitespace-nowrap">
      <i className={`fas fa-${type} text-xl`}></i>
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{count}</span>
    </div>
  );
};

export default NotificationBadge;
