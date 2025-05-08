

import React from 'react';
import Home from '../assets/Home.svg'; // Ensure this path is correct
import '../styles/Hero.css';
import PrimaryButton from '../components/PrimaryButton'; // Make sure it's default export


function Hero() {
  return (
    
    <section
    
      className="relative bg-cover bg-center h-[85vh] flex flex-col items-end justify-center text-white"
      style={{ backgroundImage: `url(${Home})` }}
    >
      {/* Heading */}
      <h1
        className="font-hina italic text-white absolute sm:text-sm md:text-lg lg:text-xl xl:text-2xl"
        style={{
          fontSize: '28px',
          top: '92px',
          left: '190px',
          width: '949px',
          height: '210px',
          textAlign: 'right',
        }}
      >
        Flowers That Tell Your Story
      </h1>

      {/* Browse Categories Button */}
      <button
      className="font-hina font-semibold text-white rounded-full px-4 py-2 transition duration-300 absolute flex items-center justify-center"
     style={{
    backgroundColor: '#9E9A9C',
    top: '410px',
    left: '760px',
    width: '240px',
    height: '40px',
    whiteSpace: 'nowrap', // prevent word wrap
    letterSpacing: '1px', // optional spacing for better look
  }}

 onMouseOver={(e) => {
    e.target.style.backgroundColor = '#7a7678'; // darker shade on hover
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = '#9E9A9C'; // original color
  }}
  >
  BROWSE CATEGORIES
        
      </button>

      {/* Subheading */}
      <p
        className="text-lg md:text-xl mb-8 font-hina italic absolute sm:text-sm md:text-md lg:text-lg xl:text-xl"
        style={{
          fontSize: '20px',
          top: '140px',
          left: '600px',
          width: '500px',
          height: '21px',
          textAlign: 'right',
        }}
      >
        Decorate your life with flowers
      </p>

      {/* Shop Now Button */}
      <div
        className="absolute font-hina "
        style={{
          top: '410px',
          left: '995px',
          width: '175px',
          height: '50px',
          textAlign: 'center',
        }}
      >
        <PrimaryButton text="SHOP NOW" />
      </div>
    </section>
   
  );
}

export default Hero;


