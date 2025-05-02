import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { 
    id: "bouquets", 
    name: "Bouquets", 
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0f9477de046362e8af266242dcb7e0be31e8e860?placeholderIfAbsent=true",
    description: "Beautiful hand-crafted bouquets for every occasion."
  },
  { 
    id: "arrangements", 
    name: "Arrangements", 
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/2d9afa07e97987bf9d38907185f2b0720fd83abc?placeholderIfAbsent=true",
    description: "Stunning floral arrangements that will brighten any space."
  },
  { 
    id: "plants", 
    name: "Plants", 
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ccc711298e5a5e8fce4117638a89cec4fa957272?placeholderIfAbsent=true",
    description: "Indoor and outdoor plants to bring life to your home."
  },
  { 
    id: "gifts", 
    name: "Gifts", 
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/da7d3fc2ed70f2d2f178309b9413a338e0aa1604?placeholderIfAbsent=true",
    description: "Special gift items to complement your flower selections."
  },
];

export default function CategoryPage() {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-semibold mb-8 text-center text-[#593825] font-hina">Shop by Category</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => (
          <Link 
            to={`/?category=${category.id}`} 
            key={category.id}
            className="group"
          >
            <div className="bg-white rounded-lg shadow overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
              <div className="h-64 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3 text-[#593825] font-hina">{category.name}</h2>
                <p className="text-gray-600 mb-4 font-hina">{category.description}</p>
                <span className="text-[#593825] font-medium group-hover:underline font-hina">
                  Browse Products
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
