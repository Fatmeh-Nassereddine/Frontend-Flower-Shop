// import React from 'react';
// import Home from '../assets/Home.svg';


// function Hero() {
//   return (
//     <section
//       className="bg-cover bg-center h-[70vh] flex flex-col justify-center items-center text-white text-center relative"
//       style={{ backgroundImage: `url(${Home})` }}
//     >
//       {/* Removed logo img */}
//       <h1 className="text-4xl md:text-6xl font-bold mb-4">Flowers That Tell Your Story</h1>
//       <button className="bg-white text-gray-900 px-6 py-2 mt-4 rounded-full hover:bg-pink-100 transition">
//         Shop Now
//       </button>
//     </section>
//   );
// }

// export default Hero;


// src/components/Hero.js
// import React from 'react';
// import Home from '../assets/Home.svg'; // Assuming the image is in the assets folder

// function Hero() {
//   return (
//     <section
//       className="bg-cover bg-center h-[70vh] flex flex-col justify-center items-center text-white text-center relative"
//       style={{ backgroundImage: `url(${Home})` }}
//     >
//       <h1 className="text-3xl md:text-5xl font-bold mb-4 font-hina ">
//         Decorate Your Life With Flowers
//       </h1>
//       <p className="text-lg md:text-xl mb-8 font-hina italic">
//         Discover our unique and beautiful floral arrangements.
//       </p>
//       <button className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-6 rounded-full text-lg font-hina">
//         Shop Now
//       </button>
//     </section>
//   );
// }

// export default Hero;



// import React from 'react';
// import Home from '../assets/Home.svg'; // Assuming the image is in the assets folder

// function Hero() {
//   return (
//     <section
//       className="bg-cover bg-center h-[70vh] flex flex-col justify-center items-center text-white text-center relative"
//       style={{ backgroundImage: `url(${Home})` }}
//     >
//       {/* Adjusting position and size of h1 to match Figma design */}
//       <h1
//         className="font-hina italic text-white"
//         style={{
//           fontSize: '28px', // Font size as per Figma design
//           position: 'absolute', // Use absolute positioning
//           top: '52px', // Y coordinate from Figma
//           left: '190px', // X coordinate from Figma
//           width: '949px', // Width as per Figma design
//           height: '210px', // Height as per Figma design
//           textAlign: 'right', // Center-align the text
//         }}
//       >
//         Flowers That Tell Your Story
//       </h1>
      
//       <p className="text-lg md:text-xl mb-8 font-hina italic"
//         style={{
//           fontSize: '20px', // Font size as per Figma design
//           position: 'absolute', // Use absolute positioning
//           top: '92px', // Y coordinate from Figma
//           left: '600px', // X coordinate from Figma
//           width: '500px', // Width as per Figma design
//           height: '21px', // Height as per Figma design
//           textAlign: 'right', // Center-align the text
//         }}
//       >
//         Decorate your life with flowers
//       </p>

//       {/* Shop Now Button */}
//       <button
//         className="font-hina  text-[#593825] border-2 border-[#593825] py-3 px-6 "
//         style={{
//           fontSize: '20px', // Font size as per Figma design
//           position: 'absolute', // Use absolute positioning
//           top: '311px', // Y coordinate from Figma
//           left: '860px', // X coordinate from Figma
//           width: '175px', // Width as per Figma design
//           height: '50px', // Height as per Figma design
//           textAlign: 'center', // Center-align the text
//         }}
//       >
//         SHOP NOW
//       </button>
//     </section>
//   );
// }

// export default Hero;

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


//import React from 'react';
// import Home from '../assets/Home.svg';
// import '../styles/Hero.css';
// import PrimaryButton from '../components/PrimaryButton';
// import { Layout } from '../components/layout/layout';

// function Hero() {
//   return (
//     <Layout>
//       <section
//         className="relative bg-cover bg-center h-[85vh] flex items-center justify-end text-white"
//         style={{ backgroundImage: `url(${Home})` }}
//       >
//         {/* Container for content */}
//         <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-right">
//           {/* Heading */}
//           <h1 className="font-hina italic text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4">
//             Flowers That Tell Your Story
//           </h1>

//           {/* Subheading */}
//           <p className="text-lg sm:text-xl md:text-2xl text-white font-hina italic mb-8">
//             Decorate your life with flowers
//           </p>

//           {/* Button Group */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-end">
//             <button
//               className="font-hina font-semibold text-white bg-[#9E9A9C] hover:bg-[#7a7678] px-6 py-3 rounded-full transition"
//             >
//               BROWSE CATEGORIES
//             </button>

//             <div>
//               <PrimaryButton text="SHOP NOW" />
//             </div>
//           </div>
//         </div>

//         {/* Overlay (optional for better text contrast) */}
//         <div className="absolute inset-0 bg-black bg-opacity-30"></div>
//       </section>
//     </Layout>
//   );
// }

// export default Hero;
// //