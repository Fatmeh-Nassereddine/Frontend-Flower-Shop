
import React from 'react';
import { useNavigate } from 'react-router-dom'; // import navigation hook
import Home from '../assets/Home.svg';
import '../styles/Hero.css';
import PrimaryButton from '../components/PrimaryButton';

function Hero() {
  const navigate = useNavigate(); // initialize navigation

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
        onClick={() => navigate('/categories')}
        className="font-hina font-semibold text-white rounded-full px-4 py-2 transition duration-300 absolute flex items-center justify-center"
        style={{
          backgroundColor: '#9E9A9C',
          top: '410px',
          left: '760px',
          width: '240px',
          height: '40px',
          whiteSpace: 'nowrap',
          letterSpacing: '1px',
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#7a7678';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#9E9A9C';
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
        className="absolute font-hina"
        style={{
          top: '410px',
          left: '995px',
          width: '175px',
          height: '50px',
          textAlign: 'center',
        }}
      >
        <PrimaryButton text="SHOP NOW" onClick={() => navigate('/shop')} />
      </div>
    </section>
  );
}

export default Hero;



