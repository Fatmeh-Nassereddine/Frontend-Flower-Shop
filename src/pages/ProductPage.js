import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Heart, ShoppingCart } from "lucide-react";
import { useShop } from "../components/context/ShopContext"; // Corrected import
import PrimaryButton from "../components/PrimaryButton";
import { getProductById } from "../api/apiProducts"; // ✅ New dynamic import

export default function ProductPage() {
  const { id } = useParams();
  const productId = id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const { cartItems, likedItems, addToCart, toggleLike } = useShop();

  const isLiked = likedItems.includes(productId);
  const isInCart = cartItems.some((item) => item.id === productId); // Check if product is in cart

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(productId); // Add product to cart with specified quantity
    }
  };

  const handleLikeToggle = () => {
    toggleLike(productId); // Toggle like status for the product
  };

  if (loading) {
    return <div className="text-center p-10">Loading product...</div>;
  }

  if (error || !product) {
    return <div className="text-center text-red-600 p-10">{error}</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-5">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-80 h-90 object-cover rounded-lg"
            />
          </div>

          <div className="md:w-1/2">
            <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
            <p className="text-2xl font-bold mb-4">$ {product.price}</p>
            <p className="mb-6 text-gray-700">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <span>Quantity:</span>
              <div className="flex items-center border rounded-md">
                <button
                  className="px-3 py-1 border-r"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  className="px-3 py-1 border-l"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <PrimaryButton
                onClick={handleAddToCart}
                text={
                  <>
                    <ShoppingCart className="h-5 w-5 inline-block mr-2" />
                    {isInCart ? "Added to Cart" : "Add to Cart"}
                  </>
                }
              />
              <PrimaryButton
                onClick={handleLikeToggle}
                text={
                  <>
                    <Heart className={`h-5 w-5 inline-block mr-2 ${isLiked ? "fill-[#fff]" : ""}`} />
                    {isLiked ? "Liked" : "Add to Favorites"}
                  </>
                }
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
