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
      setCategories(categoriesData);
      setSeasons(seasonsData);
    } catch (error) {
      console.error("Error fetching categories or seasons:", error.message);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const result = await getAllProducts(
        page,
        limit,
        selectedCategories,
        selectedSeasons,
        searchQuery,
        priceRange
      );
      setProducts(result.data || []);
      setTotalPages(result.totalPages || 1);
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
    setSelectedCategories((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((catId) => catId !== id)
        : [...prev, id];
      return updated;
    });
    setPage(1);
  };

  const handleSeasonChange = (id) => {
    setSelectedSeasons((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((seasonId) => seasonId !== id)
        : [...prev, id];
      return updated;
    });
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
      <div className="flex flex-wrap md:flex-nowrap">
        {/* Sidebar */}
        <aside className="w-full md:w-[300px] lg:w-[300px] xl:w-[300px] pr-5 bg-white p-4 md:block md:h-auto">
          <SearchInput onChange={debouncedSearch} />
          <PriceRange min={0} max={200} onChange={debouncedPrice} />

          <div className="my-4">
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-pink-600 bg-pink-50 rounded-xl hover:bg-pink-100 hover:text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
          >
            Clear All Filters
          </button>
        </div>

          <h2 className="text-xl font-bold mb-4">Filters</h2>

          {/* Categories Filter */}
          <div>
            <h3 className="font-medium">Categories</h3>
            <ul className="space-y-2">
              {categories.map(({ id, name }) => (
                <li key={id}>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(id)}
                      onChange={() => handleCategoryChange(id)}
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
              {seasons.map(({ id, name }) => (
                <li key={id}>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSeasons.includes(id)}
                      onChange={() => handleSeasonChange(id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <span>{name}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Listings */}
        <main className="flex-1 p-4">
          {loading ? (
            <div className="text-center text-gray-600">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">No products found.</div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {products.map((product) => (
                  <Link to={`/product/${product.product_id}`} key={product.product_id}>
                    <ProductCard
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
