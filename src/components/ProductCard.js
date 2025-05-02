
import * as React from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { getUser } from "../api/auth";
import axios from "axios";

export function ProductCard({
  image,
  title,
  price,
  liked,
  productId,
  cartItems,
  updateCartItems,
  updateFavorites,
}) {
  const handleLikeToggle = async () => {
    try {
      const user = await getUser();
      if (!user?.id) {
        console.error("User not authenticated");
        return;
      }

      if (liked) {
        await axios.delete(`/api/favorites/${productId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        updateFavorites(productId, false);
      } else {
        await axios.post(
          "/api/favorites",
          { productId },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        updateFavorites(productId, true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const user = await getUser();
      if (!user?.id) {
        console.error("User not authenticated");
        return;
      }

      await axios.post(
        "/api/cart/add",
        {
          user_id: user.id,
          product_id: productId,
          quantity: 1,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      updateCartItems(productId, true);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

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
        >
          <FiHeart />
        </button>

        <button
          onClick={handleAddToCart}
          className={`text-2xl ${cartItems?.includes(productId) ? "text-green-500" : "text-gray-500"}`}
        >
          <FiShoppingCart />
        </button>
      </div>
    </div>
  );
}
