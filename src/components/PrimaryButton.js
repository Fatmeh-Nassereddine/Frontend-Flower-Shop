// components/PrimaryButton.jsx

import React from 'react';

function PrimaryButton({ text, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-block border-2 font-hina font-semibold py-2 px-6 transition duration-300"
      style={{
        borderColor: '#593825',
        color: '#593825',
        backgroundColor: 'white',
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = '#593825';
        e.target.style.color = '#fff';
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = 'white';
        e.target.style.color = '#593825';
      }}
    >
      {text}
    </button>
  );
}

export default PrimaryButton;
