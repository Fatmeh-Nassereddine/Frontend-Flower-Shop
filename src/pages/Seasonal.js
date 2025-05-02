// // import { Layout } from "@/components/layout/Layout";
// import * as React from "react";
// import { Link } from "react-router-dom";
// import { ProductCard } from "../components/ProductCard";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import Inspiration from "../assets/Inspiration.png";
// import Minimalism from "../assets/Minimalism.png";
// import SummerF from "../assets/SummerF.png";
// import winter from "../assets/winter.png";
// import lovestory from "../assets/lovestory.png";
// import p1 from "../assets/p1.png";

// const seasons = [
//   { id: "spring", name: "Spring Collection", active: false },
//   { id: "summer", name: "Summer Collection", active: true },
//   { id: "fall", name: "Fall Collection", active: false },
//   { id: "winter", name: "Winter Collection", active: false },
//   { id: "valentines", name: "Valentine's Day", active: false },
// ];

// const seasonalProducts = [
//   { id: 5, image: SummerF, title: "Summer field", price: 14, season: "summer" },
//   { id: 6, image: Minimalism, title: "Minimalism", price: 18, season: "summer" },
//   { id: 7, image: Inspiration, title: "Inspiration", price: 20, season: "summer" },
//   { id: 9, image: winter, title: "Winter bouquet", price: 25, season: "winter" },
//   { id: 1, image: p1, title: "Wedding Flower", price: 20, season: "spring" },
//   { id: 4, image: lovestory, title: "Love story", price: 35, season: "valentines" },
// ];

// export default function SeasonalPage() {
//   const [activeSeason, setActiveSeason] = React.useState("summer");
//   const [likedProducts, setLikedProducts] = React.useState([]);
//   const [cartItems, setCartItems] = React.useState([]);

//   const filteredProducts = seasonalProducts.filter(
//     (product) => product.season === activeSeason
//   );

//   const toggleLike = (productId) => {
//     setLikedProducts((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId]
//     );
//   };

//   const addToCart = (productId) => {
//     setCartItems((prev) => [...prev, productId]);
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />

//       <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
//         <h1 className="font-hina text-2xl sm:text-3xl text-[#593825] font-semibold mb-8 text-center">
//           Seasonal Collections
//         </h1>

//         {/* Season Tabs */}
//         <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
//           {seasons.map((season) => (
//             <button
//               key={season.id}
//               className={`text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-colors ${
//                 activeSeason === season.id
//                   ? "bg-[#D63384] text-white"
//                   : "bg-gray-100 hover:bg-gray-200"
//               }`}
//               onClick={() => setActiveSeason(season.id)}
//             >
//               {season.name}
//               {season.active && (
//                 <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
//                   Active
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>

//         {/* Description */}
//         <div className="mb-10 text-center max-w-3xl mx-auto px-2">
//           <h2 className="text-xl sm:text-2xl font-semibold mb-4">
//             {seasons.find((s) => s.id === activeSeason)?.name}
//           </h2>
//           <p className="text-sm sm:text-base text-gray-600">
//             {activeSeason === "summer" &&
//               "Bright, vibrant arrangements featuring the best blooms of the summer season. Perfect for adding a splash of color to your home or as a gift."}
//             {activeSeason === "spring" &&
//               "Fresh and delicate arrangements celebrating new beginnings. Our spring collection features tulips, daffodils, and other seasonal favorites."}
//             {activeSeason === "fall" &&
//               "Warm, rich colors inspired by autumn foliage. These arrangements bring the cozy feeling of fall into any space."}
//             {activeSeason === "winter" &&
//               "Elegant arrangements with evergreens, berries, and seasonal accents that capture the magic of winter."}
//             {activeSeason === "valentines" &&
//               "Express your love with our specially curated Valentine's Day collection. Romantic roses and thoughtful arrangements for your special someone."}
//           </p>
//         </div>

//         {/* Product Grid */}
//         {filteredProducts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProducts.map((product) => (
//               <Link to={`/product/${product.id}`} key={product.id} className="block">
//                 <ProductCard
//                   image={product.image}
//                   title={product.title}
//                   price={product.price}
//                   liked={likedProducts.includes(product.id)}
//                   onLikeToggle={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     toggleLike(product.id);
//                   }}
//                   onAddToCart={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     addToCart(product.id);
//                   }}
//                 />
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-xl text-gray-600">
//               No products available in this collection yet.
//             </p>
//             <p className="mt-2 text-gray-500">
//               Please check back soon or explore other seasonal collections.
//             </p>
//           </div>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// }



// import * as React from "react";
// import { Link } from "react-router-dom";
// import { ProductCard } from "../components/ProductCard";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import axios from "axios";

// const seasons = [
//   { id: "Spring", name: "Spring Collection", active: false },
//   { id: "Summer", name: "Summer Collection", active: true },
//   { id: "Autumn", name: "Autumn Collection", active: false },
//   { id: "Winter", name: "Winter Collection", active: false },
//   { id: "Valentines", name: "Valentine's Day", active: false },
// ];

// export default function SeasonalPage() {
//   const [activeSeason, setActiveSeason] = React.useState("Summer");
//   const [likedProducts, setLikedProducts] = React.useState([]);
//   const [cartItems, setCartItems] = React.useState([]);
//   const [products, setProducts] = React.useState([]);
//   const [loading, setLoading] = React.useState(false);
//   const [error, setError] = React.useState("");

//   // Fetch products based on active season
//   const fetchProductsBySeason = async (season_name) => {
//     setLoading(true);
//     setError(""); // Reset any previous errors
//     try {
//       const response = await axios.get(`/api/products/season/${season_name}`);
//       setProducts(response.data); // Assuming the response is an array of products
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setError("Failed to load products. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Trigger product fetch when the active season changes
//   React.useEffect(() => {
//     fetchProductsBySeason(activeSeason);
//   }, [activeSeason]);

//   const toggleLike = (productId) => {
//     setLikedProducts((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId]
//     );
//   };

//   const addToCart = (productId) => {
//     setCartItems((prev) => [...prev, productId]);
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />

//       <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
//         <h1 className="font-hina text-2xl sm:text-3xl text-[#593825] font-semibold mb-8 text-center">
//           Seasonal Collections
//         </h1>

//         {/* Season Tabs */}
//         <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
//           {seasons.map((season) => (
//             <button
//               key={season.id}
//               className={`text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-colors ${
//                 activeSeason === season.id
//                   ? "bg-[#D63384] text-white"
//                   : "bg-gray-100 hover:bg-gray-200"
//               }`}
//               onClick={() => setActiveSeason(season.id)}
//             >
//               {season.name}
//               {season.active && (
//                 <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
//                   Active
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>

//         {/* Description */}
//         <div className="mb-10 text-center max-w-3xl mx-auto px-2">
//           <h2 className="text-xl sm:text-2xl font-semibold mb-4">
//             {seasons.find((s) => s.id === activeSeason)?.name}
//           </h2>
//           <p className="text-sm sm:text-base text-gray-600">
//             {activeSeason === "summer" &&
//               "Bright, vibrant arrangements featuring the best blooms of the summer season. Perfect for adding a splash of color to your home or as a gift."}
//             {activeSeason === "spring" &&
//               "Fresh and delicate arrangements celebrating new beginnings. Our spring collection features tulips, daffodils, and other seasonal favorites."}
//             {activeSeason === "fall" &&
//               "Warm, rich colors inspired by autumn foliage. These arrangements bring the cozy feeling of fall into any space."}
//             {activeSeason === "winter" &&
//               "Elegant arrangements with evergreens, berries, and seasonal accents that capture the magic of winter."}
//             {activeSeason === "valentines" &&
//               "Express your love with our specially curated Valentine's Day collection. Romantic roses and thoughtful arrangements for your special someone."}
//           </p>
//         </div>

//         {/* Loading or Error State */}
//         {loading && <p className="text-center text-xl text-gray-600">Loading products...</p>}
//         {error && <p className="text-center text-xl text-red-600">{error}</p>}

//         {/* Product Grid */}
//         {products.length > 0 && !loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {products.map((product) => (
//               <Link to={`/product/${product.id}`} key={product.id} className="block">
//                 <ProductCard
//                   image={product.image_url}
//                   title={product.name}
//                   price={product.price}
//                   liked={likedProducts.includes(product.product_id)}
//                   onLikeToggle={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     toggleLike(product.product_id);
//                   }}
//                   onAddToCart={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     addToCart(product.product_id);
//                   }}
//                 />
//               </Link>
//             ))}
//           </div>
//         ) : (
//           !loading && (
//             <div className="text-center py-12">
//               <p className="text-xl text-gray-600">
//                 No products available in this collection yet.
//               </p>
//               <p className="mt-2 text-gray-500">
//                 Please check back soon or explore other seasonal collections.
//               </p>
//             </div>
//           )
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// }

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
