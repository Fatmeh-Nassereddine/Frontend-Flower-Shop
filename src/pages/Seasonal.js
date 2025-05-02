

import * as React from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getProductsBySeason } from "../api/apiProducts"; // ✅ Using centralized API

const seasons = [
  { id: "S001", name: "Spring Collection" },
  { id: "S002", name: "Summer Collection" },
  { id: "S003", name: "Autumn Collection" },
  { id: "S004", name: "Winter Collection" },
  { id: "S005", name: "Valentine's Day" },
];

export default function SeasonalPage() {
  const [activeSeason, setActiveSeason] = React.useState("S002");
  const [likedProducts, setLikedProducts] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const fetchProducts = async (seasonId) => {
    setLoading(true);
    setError("");

    try {
      const data = await getProductsBySeason(seasonId);
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch seasonal products:", err);
      setError("Failed to load products for this season.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProducts(activeSeason);
  }, [activeSeason]);

  const toggleLike = (productId) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId) => {
    if (!cartItems.includes(productId)) {
      setCartItems((prev) => [...prev, productId]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header likedProducts={likedProducts} cartItems={cartItems} />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="font-hina text-2xl sm:text-3xl text-[#593825] font-semibold mb-8 text-center">
          Seasonal Collections
        </h1>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
          {seasons.map((season) => (
            <button
              key={season.id}
              className={`text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-colors ${
                activeSeason === season.id
                  ? "bg-[#D63384] text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setActiveSeason(season.id)}
            >
              {season.name}
            </button>
          ))}
        </div>

        <div className="mb-10 text-center max-w-3xl mx-auto px-2">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            {seasons.find((s) => s.id === activeSeason)?.name}
          </h2>
        </div>

        {loading ? (
          <p className="text-center text-xl text-gray-600">Loading products...</p>
        ) : error ? (
          <p className="text-center text-xl text-red-600">{error}</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                to={`/product/${product.product_id}`}
                key={product.product_id}
                className="block"
              >
                <ProductCard
                  image={product.image_url}
                  title={product.name}
                  price={product.price}
                  liked={likedProducts.includes(product.product_id)}
                  onLikeToggle={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleLike(product.product_id);
                  }}
                  onAddToCart={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(product.product_id);
                  }}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No products available in this collection yet.
            </p>
            <p className="mt-2 text-gray-500">
              Please check back soon or explore other seasonal collections.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
