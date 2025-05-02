



import React, { useEffect, useState, useCallback } from "react";
import { ProductCard } from "../components/ProductCard";
import { getAllProducts } from "../api/apiProducts";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SearchInput } from "../components/ui/SearchInput";
import { PriceRange } from "../components/ui/PriceRange";
import { debounce } from "lodash";
import { useShop } from "../components/context/ShopContext";
import { getAllCategories } from "../api/apiCategories";
import apiSeasons from "../api/apiSeasons";
import { Link } from "react-router-dom";

function Shop() {
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart, toggleLike, likedItems } = useShop();
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);

  const [categories, setCategories] = useState([]);
  const [seasons, setSeasons] = useState([]);

  const fetchCategoriesAndSeasons = async () => {
    try {
      const categoriesData = await getAllCategories();
      const seasonsData = await apiSeasons.getAll();

      console.log("📦 Categories Data:", categoriesData);
      console.log("❄️ Seasons Data:", seasonsData);
      setCategories(categoriesData);
      setSeasons(seasonsData);
    } catch (error) {
      console.error("Error fetching categories or seasons:", error.message);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts(
        page,
        limit,
        selectedCategories,
        selectedSeasons,
        searchQuery,
        priceRange
      );
      setProducts(response.data || []);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error("Error loading products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoriesAndSeasons();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, selectedCategories, selectedSeasons, searchQuery, priceRange]);

  const handleCategoryChange = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
    setPage(1);
  };

  const handleSeasonChange = (id) => {
    setSelectedSeasons((prev) =>
      prev.includes(id) ? prev.filter((seasonId) => seasonId !== id) : [...prev, id]
    );
    setPage(1);
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
      setPage(1);
    }, 400),
    []
  );

  const debouncedPrice = useCallback(
    debounce((range) => {
      setPriceRange(range);
      setPage(1);
    }, 400),
    []
  );

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSeasons([]);
    setSearchQuery("");
    setPriceRange([0, 200]);
    setPage(1);
  };

  const onAddToCart = (productId) => addToCart(productId);
  const onLikeToggle = (productId) => toggleLike(productId);

  return (
    <div className="font-sans bg-gray-100">
      <Header />
      <div className="flex">
        <aside className="w-[300px] pr-5 max-sm:w-full hidden lg:block bg-white p-4">
          <SearchInput onChange={debouncedSearch} />
          <PriceRange min={0} max={200} onChange={debouncedPrice} />

          <div className="my-4">
            <button
              onClick={clearFilters}
              className="text-sm text-red-500 underline hover:text-red-700"
            >
              Clear All Filters
            </button>
          </div>

          <h2 className="text-xl font-bold mb-4">Filters</h2>

          {/* Categories Filter */}
          <div>
            <h3 className="font-medium">Categories</h3>
            <ul className="space-y-2">
              {categories.map(({ category_id, name }) => (
                <li key={category_id}>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category_id)}
                      onChange={() => handleCategoryChange(category_id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <span>{name}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Seasons Filter */}
          <div className="mt-6">
            <h3 className="font-medium">Seasons</h3>
            <ul className="space-y-2">
              {seasons.map(({ season_id, name }) => (
                <li key={season_id}>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSeasons.includes(season_id)}
                      onChange={() => handleSeasonChange(season_id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <span>{name}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="flex-1 p-4">
          {loading ? (
            <div className="text-center text-gray-600">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">No products found.</div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {products.map((product) => (
                  <Link to={`/product/${product.product_id}`} key={product.product_id}> {/* Link to the product details page */}
                  <ProductCard
                    key={product.product_id}
                    productId={product.product_id}
                    title={product.name}
                    price={product.price}
                    image={product.images?.[0]?.image_url || "/placeholder.jpg"}
                    liked={likedItems.includes(product.product_id)}
                    cartItems={cartItems.map((item) => item.id)}
                    updateCartItems={onAddToCart}
                    updateFavorites={onLikeToggle}
                  />
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Shop;
