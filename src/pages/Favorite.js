import * as React from "react";
import PrimaryButton from "../components/PrimaryButton";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";


// Sample favorites - in a real app would come from context or state management
const initialFavorites = [
  { id: 2, image: "", title: "Bird's Nest Fern", price: 25 },
  { id: 8, image: "", title: "Bride's bouquet", price: 40 },
  { id: 11, image: "", title: "Peperomia Ginny", price: 25 },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = React.useState(initialFavorites);
  
  const removeFromFavorites = (id) => {
    setFavorites((items) => items.filter((item) => item.id !== id));
  };
  
  const addToCart = (id) => {
    // In a real app, would dispatch to cart context or state
    console.log(`Added item ${id} to cart`);
  };
  
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-semibold mb-8 text-[#593825] font-hina">Your Favorites</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl mb-4 text-[#593825] font-hina">Your favorites list is empty</h2>
          <p className="mb-6 text-gray-600 font-hina">Add items to your favorites while shopping and they will appear here</p>
          <Link to="/">
            <PrimaryButton className="bg-[#593825] hover:bg-[#472c1d] text-white">
              Browse Products
            </PrimaryButton>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
              <Link to={`/product/${item.id}`}>
                <img 
                  src={item.image || "/path/to/default-image.jpg"}  // Fallback image
                  alt={item.title || "Product"}  // Fallback alt text
                  className="w-full h-64 object-cover"
                />
              </Link>
              
              <div className="p-4">
                <Link to={`/product/${item.id}`}>
                  <h2 className="font-semibold text-lg mb-2 text-[#593825] font-hina">{item.title}</h2>
                </Link>
                <p className="text-gray-700 mb-4 text-[#593825] font-hina">${item.price.toFixed(2)}</p>
                
                <div className="flex gap-2">
                  <PrimaryButton 
                    onClick={() => addToCart(item.id)}
                    className="flex-1 bg-[#593825] hover:bg-[#472c1d] flex items-center justify-center gap-2 text-white"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </PrimaryButton>
                  
                  <PrimaryButton 
                    variant="outline" 
                    onClick={() => removeFromFavorites(item.id)}
                    className="flex items-center justify-center text-[#593825] border-[#593825] border-2"
                  >
                    <Heart size={18} className="fill-[#593825] text-[#593825]" />
                  </PrimaryButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

