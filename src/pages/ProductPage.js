import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Change useHistory to useNavigate
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Heart, ShoppingCart } from "lucide-react";
import { useShop } from "../components/context/ShopContext";
import PrimaryButton from "../components/PrimaryButton";
import { getProductById } from "../api/apiProducts";
import { toast } from "sonner";
import { getUser } from "../api/auth"; // Import getUser function to check login status

export default function ProductPage() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { cartItems, likedItems, addToCart, toggleLike } = useShop();
  const navigate = useNavigate(); // Use useNavigate to handle redirects

  const isLiked = likedItems.includes(productId);  // Check if product is liked
  const isInCart = cartItems.some(
    (item) => item.id === productId || item.product_id === productId
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (err) {
        setError("Failed to load product details.");
        toast.error(err.message || "Failed to fetch product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Check if the user is logged in before allowing add to cart or like toggle
  const isUserLoggedIn = async () => {
    try {
      const user = await getUser(); // Check if user is logged in
      return user?.id ? true : false; // Return true if user is logged in
    } catch (err) {
      return false; // Return false if getUser fails (user not logged in)
    }
  };

  const handleAddToCart = async () => {
    const loggedIn = await isUserLoggedIn();
    if (!loggedIn) {
      toast.error("Please log in to add items to your cart.");
      navigate("/login"); // Redirect to login page using navigate
      return;
    }

    try {
      for (let i = 0; i < quantity; i++) {
        await addToCart(productId); // ✅ Add product to cart
      }
    } catch {
      toast.error("Failed to add product to cart.");
    }
  };

  const handleLikeToggle = async () => {
    const loggedIn = await isUserLoggedIn();
    if (!loggedIn) {
      toast.error("Please log in to add items to your favorites.");
      navigate("/login"); // Redirect to login page using navigate
      return;
    }

    console.log("Toggling like for productId:", productId);
    toggleLike(productId);  // Toggle like for the product
  };

  if (loading) return <div className="text-center p-10">Loading product...</div>;
  if (error || !product)
    return <div className="text-center text-red-600 p-10">{error}</div>;

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
                onClick={handleLikeToggle}  // Handle the like toggle
                text={
                  <>
                    <Heart
                      className={`h-5 w-5 inline-block mr-2 ${isLiked ? "fill-[#fff]" : ""}`}
                    />
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
