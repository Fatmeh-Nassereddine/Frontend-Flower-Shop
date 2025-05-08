import * as React from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { getUser } from "../api/auth";
import { useShop } from "../components/context/ShopContext";
import { toast } from "react-toastify";

export function ProductCard({
  image,
  title,
  price,
  liked,
  productId,
}) {
  const { addToCart, cartItems } = useShop();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // Fetch the logged-in user once when the card mounts
    const fetchUser = async () => {
      try {
        const res = await getUser();
        setUser(res);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLikeToggle = async () => {
    if (!user?.id) {
      toast.error("Please log in to like items.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      if (liked) {
        await fetch(`/api/favorites/${productId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Removed from favorites");
      } else {
        await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        });
        toast.success("Added to favorites");
      }
    } catch (error) {
      toast.error("Failed to update favorites.");
      console.error("Favorite error:", error);
    }
  };

  const handleAddToCart = async () => {
    if (!user?.id) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    try {
      await addToCart(productId);
    } catch (error) {
      toast.error("Failed to add item to cart.");
      console.error("Cart error:", error);
    }
  };

  const isInCart = cartItems?.some(
    (item) => item.product_id === productId || item.id === productId
  );

  return (
    <div className="flex flex-col items-center text-center border p-4 rounded-lg shadow-lg">
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <span className="mt-2.5 text-lg font-semibold">{title}</span>
      <span className="mt-2.5 text-xl text-[#D63384]">${price}</span>

      <div className="flex gap-4 mt-3">
        <button
          onClick={handleLikeToggle}
          className={`text-2xl ${liked ? "text-red-500" : "text-gray-500"}`}
          title={!user ? "Log in to like items" : "Add to favorites"}
        >
          <FiHeart />
        </button>

        <button
          onClick={handleAddToCart}
          className={`text-2xl ${
            isInCart ? "text-green-500" : "text-gray-500"
          }`}
          title={!user ? "Log in to add to cart" : "Add to cart"}
        >
          <FiShoppingCart />
        </button>
      </div>
    </div>
  );
}
