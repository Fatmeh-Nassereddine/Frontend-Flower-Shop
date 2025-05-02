// import React from 'react';
// import AboutImage from '../assets/About.svg';
// import PrimaryButton from '../components/PrimaryButton'; // Reusable button

// function About() {
//   return (
//     <div className="relative bg-gray-50 py-16">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 items-center">
//           {/* Text Content Section */}
//           <div
//             className="relative z-20 shadow-lg p-6 md:p-8 border-l-4 border-b-4 font-hina max-w-xl"
//             style={{ borderColor: '#593825' }}
//           >
//             <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
//               Welcome to Tima's Elegant Essence!
//             </h2>
//             <p className="text-gray-700 mb-4">
//               We specialize in creating stunning, diverse, and handcrafted bouquets for every occasion.
//               My team and I are passionate about bringing your vision to life and would be delighted to work with you.
//             </p>
//             <p className="text-gray-700 mb-6">
//               Learn more about who we are and what we do by clicking the link below.
//             </p>
//             <a href="/aboutus">
//               <PrimaryButton text="Learn More" />
//             </a>
//           </div>

//           {/* Image Section */}
//           <div className="relative w-full h-[300px] md:h-[400px] lg:absolute lg:top-[88px] lg:left-[700px] lg:w-[452px] lg:h-[454px] z-10 shadow-lg overflow-hidden">
//             <img
//               src={AboutImage}
//               alt="Elegant Flower Arrangement"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default About;



// src/pages/About.js
// import React from 'react';
// import AboutImage from '../assets/About.svg';
// import PrimaryButton from '../components/PrimaryButton'; // Reusable button

// function About() {
//   return (
//     <div className="bg-gray-50 py-12 md:py-16 font-hina">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
//           {/* Text Content Section */}
//           <div className="mx-10 flex flex-col justify-center text-left p-4 sm:p-6 lg:p-8  shadow-lg h-full">
//             <h2 className="text-2xl sm:text-3xl font-semibold text-[#593825] mb-4">
//               Welcome to Tima's Elegant Essence!
//             </h2>
//             <p className="text-[#593825] mb-4 text-base sm:text-lg leading-relaxed">
//               We specialize in creating stunning, diverse, and handcrafted bouquets for every occasion.
//               My team and I are passionate about bringing your vision to life and would be delighted to work with you.
//             </p>
//             <p className="text-[#593825] mb-6 text-base sm:text-lg leading-relaxed">
//               Learn more about who we are and what we do by clicking the link below.
//             </p>
//             <a href="/aboutus">
//               <PrimaryButton text="LEARN MORE" />
//             </a>
//           </div>

//           {/* Image Section */}
//           <div className="mx-10 flex justify-center items-center h-full">
//             <img
//               src={AboutImage}
//               alt="Elegant Flower Arrangement"
//               className="w-full max-w-md sm:max-w-full h-auto shadow-lg"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default About;





// import React from 'react';
// import AboutImage from '../assets/About.svg';
// import PrimaryButton from '../components/PrimaryButton'; // Reusable button

// function About() {
//   const handleLearnMoreClick = () => {
//     const aboutSection = document.getElementById("about-us");
//     if (aboutSection) {
//       aboutSection.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="bg-gray-50 py-12 md:py-16 font-hina">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
//           {/* Text Content Section */}
//           <div className="mx-10 flex flex-col justify-center text-left p-4 sm:p-6 lg:p-8 shadow-lg h-full">
//             <h2 className="text-2xl sm:text-3xl font-semibold text-[#593825] mb-4">
//               Welcome to Tima's Elegant Essence!
//             </h2>
//             <p className="text-[#593825] mb-4 text-base sm:text-lg leading-relaxed">
//               We specialize in creating stunning, diverse, and handcrafted bouquets for every occasion.
//               My team and I are passionate about bringing your vision to life and would be delighted to work with you.
//             </p>
//             <p className="text-[#593825] mb-6 text-base sm:text-lg leading-relaxed">
//               Learn more about who we are and what we do by clicking the button below.
//             </p>
//             {/* PrimaryButton component, now with the scroll function */}
//             <PrimaryButton 
//               text="Learn More" 
//               onClick={handleLearnMoreClick} // Pass the scroll function here
//             />
//           </div>

//           {/* Image Section */}
//           <div className="mx-10 flex justify-center items-center h-full">
//             <img
//               src={AboutImage}
//               alt="Elegant Flower Arrangement"
//               className="w-full max-w-md sm:max-w-full h-auto shadow-lg"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default About;




import React from 'react';
import AboutImage from '../assets/About.svg';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    navigate('/about'); // 👈 this navigates to the full page
  };

  return (
    <div className="bg-gray-50 py-12 md:py-16 font-hina">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="mx-10 flex flex-col justify-center text-left p-4 sm:p-6 lg:p-8 shadow-lg h-full">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#593825] mb-4">
              Welcome to Tima's Elegant Essence!
            </h2>
            <p className="text-[#593825] mb-4 text-base sm:text-lg leading-relaxed">
              We specialize in creating stunning, diverse, and handcrafted bouquets for every occasion.
            </p>
            <p className="text-[#593825] mb-6 text-base sm:text-lg leading-relaxed">
              Learn more about who we are and what we do by clicking the button below.
            </p>

            <div className="mt-4">
            <PrimaryButton text="Learn More" onClick={handleLearnMoreClick} />
            </div>

          </div>

          <div className="mx-10 flex justify-center items-center h-full">
            <img
              src={AboutImage}
              alt="Elegant Flower Arrangement"
              className="w-full max-w-md sm:max-w-full h-auto shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
