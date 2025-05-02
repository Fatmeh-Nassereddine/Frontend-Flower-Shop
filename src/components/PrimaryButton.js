


import React from 'react';

function PrimaryButton({ text, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="font-hina font-semibold px-6 py-2 rounded-full transition duration-300"
      style={{
        backgroundColor: '#D63384', // Tailwind's pink-600
        color: '#FFFFFF',
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = '#B03074'; // Tailwind's pink-700
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = '#D63384'; // Tailwind's pink-600
      }}
    >
      {text}
    </button>
  );
}

export default PrimaryButton;
