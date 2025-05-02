import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../api/apiProducts"; // Adjust path if needed
import { getCategoryById } from "../api/apiCategories"; // Adjust path if needed
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 

export default function ProductsByCategoryPage() {
  const { categoryId } = useParams(); // ✅ Fix: Get categoryId from route
  const [categoryName, setCategoryName] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // New state for errors

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products based on categoryId
        const productsData = await getProductsByCategory(categoryId);
        setProducts(productsData);

        // Fetch category details (name) based on categoryId
        const categoryData = await getCategoryById(categoryId);
        if (categoryData && categoryData.name) {
          setCategoryName(categoryData.name); // Set category name from API
        } else {
          setCategoryName("Category"); // Fallback to "Category" if name is not found
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data."); // Set error state
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchProducts();
  }, [categoryId]); // Re-fetch when categoryId changes

  if (loading) {
    return <div className="text-center">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Show error if it occurs
  }

  if (products.length === 0) {
    return <div className="text-center text-gray-500">No products found in this category.</div>;
  }

  return (
    <div>
      <Header /> {/* Assuming you have a Header component */}
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-semibold mb-8 text-center text-[#593825] font-hina">
          Products in {categoryName || "Category"}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.product_id} className="bg-white rounded-lg shadow p-4">
              <img
                src={product.image_url || "/placeholder.jpg"} // Fallback image
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-[#593825]">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <span className="text-[#593825] font-bold">${product.price}</span>
            </div>
          ))}
        </div>
      </div>
      <Footer /> {/* Assuming you have a Footer component */}
    </div>
  );
}
