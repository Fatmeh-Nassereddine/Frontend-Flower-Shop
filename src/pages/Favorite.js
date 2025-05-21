import * as React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useShop } from "../components/context/ShopContext";

// API functions
import {
  getFavorites as fetchApiFavorites,
  removeFavorite as removeApiFavorite,
} from "../api/apiFavorite";

export default function FavoritesPage() {
  const [favorites, setFavorites] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { addToCart } = useShop();
  const [addedToCartIds, setAddedToCartIds] = React.useState([]);

  React.useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await fetchApiFavorites();
        setFavorites(data || []);
      } catch (err) {
        setError("Failed to load favorites. Please try again later.");
        console.error("Error loading favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const removeFromFavorites = async (product_id) => {
    try {
      await removeApiFavorite(product_id);
      setFavorites((items) =>
        items.filter((item) => item.product_id !== product_id)
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
      setError("Failed to remove item from favorites");
    }
  };

  const handleAddToCart = async (product_id) => {
    try {
      await addToCart(product_id, 1);
      setAddedToCartIds([...addedToCartIds, product_id]); // Mark as added
    } catch (error) {
      console.error('Add to cart failed:', error);
    }
  };
  

  const buttonStyles = {
    base:
      "font-hina font-medium px-3 py-1.5 rounded-full transition duration-300 flex items-center justify-center gap-2 text-sm sm:text-sm",
    solid: "bg-[#D63384] text-white hover:bg-[#B03074]",
    outline:
      "border-2 border-[#593825] text-white bg-[#9E9A9C] hover:bg-[#8c888a]",
  };

  const inlineSolidStyle = {
    backgroundColor: "#D63384",
    color: "#FFFFFF",
  };

  const inlineHoverSolidStyle = {
    backgroundColor: "#B03074",
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-5">
        <Header />
        <div className="text-center py-12">
          <p className="text-gray-600">Loading favorites...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-5">
      <Header />

      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-[#593825] font-hina text-center">
        Your Favorites
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl sm:text-2xl mb-4 text-[#593825] font-hina">
            Your favorites list is empty
          </h2>
          <p className="mb-6 text-gray-600 font-hina text-sm sm:text-base">
            Add items to your favorites while shopping and they will appear here.
          </p>
          <Link to="/shop">
            <button
              className="font-hina font-semibold px-6 py-2 rounded-full transition duration-300 text-white text-sm sm:text-base"
              style={inlineSolidStyle}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor =
                  inlineHoverSolidStyle.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor =
                  inlineSolidStyle.backgroundColor)
              }
            >
              Browse Products
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div
              key={item.product_id}
              className="bg-white rounded-lg shadow overflow-hidden transition-transform hover:shadow-lg flex flex-col max-w-sm mx-auto w-full"
            >
              <Link to={`/product/${item.product_id}`} className="block relative">
                {/* Image Container */}
                <div className="w-full h-64 flex justify-center items-center overflow-hidden relative">
                  <img
                    src={item.image_url || "/images/default-product.jpg"}
                    alt={item.name || "Product"}
                    className="object-contain transition-transform duration-300 hover:scale-110"
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      transformOrigin: "center", // Ensures zooming happens from the center
                    }}
                  />
                </div>
              </Link>

              {/* Product Details */}
              <div className="p-4 flex flex-col justify-between h-full">
                <div>
                  <Link to={`/product/${item.product_id}`} className="block">
                    <h2 className="font-semibold text-lg mb-2 text-[#593825] font-hina">
                      {item.name}
                    </h2>
                  </Link>
                  <p className="text-gray-700 mb-4 text-[#593825] font-hina">
                    ${Number(item.price)?.toFixed(2) || "0.00"}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                {addedToCartIds.includes(item.product_id) ? (
                    <button
                      disabled
                      className={`${buttonStyles.base} bg-pink-700 text-white cursor-not-allowed`}
                    >
                       Added to Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(item.product_id)}
                      className={`${buttonStyles.base} ${buttonStyles.solid}`}
                      style={inlineSolidStyle}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor =
                          inlineHoverSolidStyle.backgroundColor)
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor =
                          inlineSolidStyle.backgroundColor)
                      }
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  )}

                  <button
                    onClick={() => removeFromFavorites(item.product_id)}
                    className={`${buttonStyles.base} ${buttonStyles.outline}`}
                  >
                    <Heart size={16} className="text-white" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}
