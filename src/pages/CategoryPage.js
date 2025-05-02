import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../api/apiCategories"; // Make sure the path is correct
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state for better UX

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();  // Fetch categories from the API
        setCategories(data);  // Update state with fetched categories
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);  // Handle error by setting an empty array
      } finally {
        setLoading(false);  // Stop loading spinner when done
      }
    };
    
    fetchCategories();
  }, []);  // Only run on mount

  if (loading) {
    return <div className="text-center">Loading categories...</div>;
  }

  if (categories.length === 0) {
    return <div className="text-center text-gray-500">No categories available.</div>;
  }

  return (
    <div>
      <Header /> {/* Assuming you have a Header component */}
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-semibold mb-8 text-center text-[#593825] font-hina">Shop by Category</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              to={`/category/${category.id}`} // Navigate to a new page with category products
              key={category.id}
              className="group"
            >
              <div className="bg-white rounded-lg shadow overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                <div className="h-64 overflow-hidden">
                  {/* Ensure image_url is present, otherwise use a placeholder */}
                  <img 
                    src={category.image_url || "/placeholder.jpg"} 
                    alt={category.name || "Category image"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-3 text-[#593825] font-hina">{category.name || "Category Name"}</h2>
                  <p className="text-gray-600 mb-4 font-hina">{category.description || "No description available"}</p>
                  <span className="text-[#593825] font-medium group-hover:underline font-hina">
                    Browse Products
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer /> {/* Assuming you have a Footer component */}
    </div>
  );
}
