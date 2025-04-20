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
import Home from '../assets/Home.svg'; // Assuming the image is in the assets folder
import '../styles/Hero.css';

function Hero() {
  return (
    <section
      className="bg-cover bg-center h-[85vh] flex flex-col justify-center items-center text-white text-center relative"
      style={{ backgroundImage: `url(${Home})` }}
    >
      {/* Heading */}
      <h1
        className="font-hina italic text-white absolute sm:text-sm md:text-lg lg:text-xl xl:text-2xl"
        style={{
          fontSize: '28px', // Font size as per Figma design
          top: '92px', // Y coordinate from Figma
          left: '190px', // X coordinate from Figma
          width: '949px', // Width as per Figma design
          height: '210px', // Height as per Figma design
          textAlign: 'right', // Center-align the text
        }}
      >
        Flowers That Tell Your Story
      </h1>

      {/* Subheading */}
      <p
        className="text-lg md:text-xl mb-8 font-hina italic absolute sm:text-sm md:text-md lg:text-lg xl:text-xl"
        style={{
          fontSize: '20px', // Font size as per Figma design
          top: '140px', // Y coordinate from Figma
          left: '600px', // X coordinate from Figma
          width: '500px', // Width as per Figma design
          height: '21px', // Height as per Figma design
          textAlign: 'right', // Center-align the text
        }}
      >
        Decorate your life with flowers
      </p>

      {/* Shop Now Button */}
      <button
        className="font-hina text-[#593825] border-2 border-[#593825] py-3 px-6 absolute sm:text-sm md:text-base lg:text-lg xl:text-xl"
        style={{
          fontSize: '20px', // Font size as per Figma design
          top: '340px', // Y coordinate from Figma
          left: '860px', // X coordinate from Figma
          width: '175px', // Width as per Figma design
          height: '50px', // Height as per Figma design
          textAlign: 'center', // Center-align the text
        }}
      >
        SHOP NOW
      </button>
    </section>
  );
}

export default Hero;
