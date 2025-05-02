// // import image88 from '../assets/image88.svg';
// import React from 'react';
// import cat2 from '../assets/cat2.png'; 
// import cat3 from '../assets/cat3.png';
// import cat1 from '../assets/cat1.png';
// import cat4 from '../assets/cat4.png';

// const categories = [
//   {
//     title: 'Bouquets',
    
//     image: cat1,
//   },
//   {
//     title: 'Plants',
    
//     image: cat2,
//   },
//   {
//     title: 'Arrangements',
    
//     image: cat3,
//   },
//   {
//     title: 'Gifts',
    
//     image: cat4,
//   },
// ];

// function PopularSection() {
//   return (
//     <section className="py-12 px-6 md:px-20">
//       <h2 className="text-2xl font-hina font-semibold text-center mb-8 text-[#593825]">Shop By Categories</h2>
//       <p className="font-hina  text-xl font italic text-center mb-8 text-[#593825]">Find Find the perfect flowers by category</p>
//       <div className="grid md:grid-cols-3 gap-6">
//         {categories.map((categories, idx) => (
//           <div
//             key={idx}
//             className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center"
//           >
//             <div className="w-full h-80 overflow-hidden rounded-lg mb-4">
//               <img
//                 src={categories.image}
//                 alt={categories.title}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <h3 className="text-lg font-hina font-semibold text-[#593825]">{categories.title}</h3>
           
//           </div>
//         ))}
//       </div>
//       <div className="text-center mt-8">
//         <button className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition duration-300">
//           Shop More
//         </button>
//       </div>
//     </section>
//   );
// }

// export default PopularSection;



import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import cat1 from '../assets/cat1.png';
import cat2 from '../assets/cat2.png';
import cat3 from '../assets/cat3.png';
import cat4 from '../assets/cat4.png';
import cat5 from '../assets/cat5.png';
import CategoryCarousel from './CategoryCarousel'; // adjust the path if needed

const categories = [
  { title: 'Bouquets', image: cat1 },
  { title: 'Plants', image: cat2 },
  { title: 'Arrangements', image: cat3 },
  { title: 'Gifts', image: cat4 },
  { title: 'Ikebana', image: cat5 },
];

function CategorySection() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleViewAllCategories = () => {
    navigate("/categories"); // Navigate to the categories page
  };

  return (
    <section id="category-section" className="py-12 px-6 md:px-20">
      <h2 className="text-2xl font-hina font-semibold text-center mb-4 text-[#593825]">Shop By Categories</h2>
      <p className="font-hina text-xl italic text-center mb-8 text-[#593825]">Find the perfect flowers by category</p>
      <CategoryCarousel categories={categories} />
      <div className="text-center mt-8">
        <button
          onClick={handleViewAllCategories} // Attach the click handler
          className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition duration-300"
        >
          VIEW ALL CATEGORIES
        </button>
      </div>
    </section>
  );
}

export default CategorySection;
