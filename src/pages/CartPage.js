import React, { useState, useEffect } from "react";
import {
  getUserCart,
  updateItemQuantity,
  removeProductFromCart,
  clearUserCart,
} from "../api/apiCart";
import { getUser } from "../api/auth";
import { Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useShop } from "../components/context/ShopContext";
import throttle from "lodash/throttle";

const CartPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    cartItems,
    setCartItems,
    clearCart,
  } = useShop();

  useEffect(() => {
    const fetchUserAndCart = async () => {
      try {
        const user = await getUser(); // This will check the session automatically
  
        if (!user || !user.id) {
          toast.error("You must be logged in to view your cart.");
          navigate("/login");
          return;
        }
  
        setUserId(user.id);
        const cartData = await getUserCart(user.id);
        console.log("Fetched Cart Data:", cartData);
        setCartItems(cartData.items || []);
      } catch (error) {
        console.error("Error fetching user or cart:", error);
        toast.error("Please log in to access your cart.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserAndCart();
  }, [setCartItems, navigate]);
  

  const throttledUpdateQuantity = throttle(
    async (cart_item_id, newQuantity) => {
      try {
        await updateItemQuantity(cart_item_id, newQuantity);
        setCartItems((prev) =>
          prev.map((item) =>
            item.cart_item_id === cart_item_id
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
        toast.success("Quantity updated");
      } catch {
        toast.error("Failed to update quantity");
      }
    },
    800,
    { trailing: false }
  );

  const handleRemoveFromCart = async (cart_item_id) => {
    try {
      await removeProductFromCart(cart_item_id);
      setCartItems((prev) =>
        prev.filter((item) => item.cart_item_id !== cart_item_id)
      );
      toast.success("Product removed from cart");
    } catch {
      toast.error("Failed to remove product");
    }
  };

  const handleClearCart = async () => {
    try {
      await clearUserCart(userId);
      clearCart();
      toast.success("Cart cleared");
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + (Number(item.product_price) || 0) * (item.quantity || 1),
      0
    );
  };
 

  if (loading) {
    return <div className="text-center mt-10">Loading your cart...</div>;
  }

  if (!userId) {
    return <div className="text-center mt-10">Please log in to view your cart.</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-semibold mb-8">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl mb-4">Your cart is empty</h2>
            <p className="mb-6 text-gray-600">
              Add some products to your cart and they will appear here
            </p>
            <Link to="/">
              <button
                className="font-hina font-semibold px-6 py-2 rounded-full transition duration-300"
                style={{
                  backgroundColor: '#D63384',
                  color: '#FFFFFF',
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#B03074';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#D63384';
                }}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">Product</th>
                      <th className="text-center p-4">Quantity</th>
                      <th className="text-right p-4">Price</th>
                      <th className="text-right p-4">Total</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.cart_item_id} className="border-b">
                        <td className="p-4">
                          <div className="flex items-center">
                            <img
                              src={item.product_image || "/placeholder.jpg"}
                              alt={item.product_name}
                              className="w-16 h-16 object-cover rounded mr-4"
                            />
                            <span>{item.product_name}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center">
                            <button
                              className="px-2 border rounded-l"
                              onClick={() =>
                                throttledUpdateQuantity(
                                  item.cart_item_id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                            >
                              -
                            </button>
                            <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                            <button
                              className="px-2 border rounded-r"
                              onClick={() =>
                                throttledUpdateQuantity(
                                  item.cart_item_id,
                                  item.quantity + 1
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          ${Number(item.product_price).toFixed(2)}
                        </td>
                        <td className="p-4 text-right">
                          ${item.product_price && item.quantity
                            ? (Number(item.product_price) * item.quantity).toFixed(2)
                            : "0.00"}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleRemoveFromCart(item.cart_item_id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>$10.00</span>
                </div>
                <div className="border-t my-4"></div>
                <div className="flex justify-between mb-6 font-semibold">
                  <span>Total</span>
                  <span>${(calculateTotal() + 10).toFixed(2)}</span>
                </div>

                <button
                  onClick={handleClearCart}
                  className="w-full font-hina font-semibold px-6 py-2 rounded-full transition duration-300 mb-3"
                  style={{
                    backgroundColor: '#D63384',
                    color: '#FFFFFF',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#B03074';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#D63384';
                  }}
                >
                  Clear Cart
                </button>

                <Link to="/checkout">
                  <button
                    className="w-full font-hina font-semibold px-6 py-2 rounded-full transition duration-300 mb-3"
                    style={{
                      backgroundColor: '#28a745',
                      color: '#FFFFFF',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#218838';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#28a745';
                    }}
                  >
                    Proceed to Checkout
                  </button>
                </Link>

                <Link to="/" className="block">
                  <button
                    className="w-full font-hina font-semibold px-6 py-2 rounded-full transition duration-300"
                    style={{
                      backgroundColor: '#9E9A9C',
                      color: '#FFFFFF',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#7a7678';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#9E9A9C';
                    }}
                  >
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;




// import React, { useState, useEffect } from "react";
// import {
//   getUserCart,
//   updateItemQuantity,
//   removeProductFromCart,
//   clearUserCart,
// } from "../api/apiCart";
// import { getUser } from "../api/auth";
// import { Trash2 } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { useShop } from "../components/context/ShopContext";
// import throttle from "lodash/throttle";

// const CartPage = () => {
//   const navigate = useNavigate();
//   const [userId, setUserId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const { cartItems, setCartItems, clearCart } = useShop();

//   useEffect(() => {
//     const fetchUserAndCart = async () => {
//       try {
//         const user = await getUser();
//         if (!user || !user.id) {
//           toast.error("You must be logged in to view your cart.");
//           navigate("/login");
//           return;
//         }

//         setUserId(user.id);
//         const cartData = await getUserCart(user.id);
//         setCartItems(cartData.items || []);
//       } catch (error) {
//         toast.error("Please log in to access your cart.");
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserAndCart();
//   }, [setCartItems, navigate]);

//   const throttledUpdateQuantity = throttle(
//     async (cart_item_id, newQuantity) => {
//       try {
//         await updateItemQuantity(cart_item_id, newQuantity);
//         setCartItems((prev) =>
//           prev.map((item) =>
//             item.cart_item_id === cart_item_id
//               ? { ...item, quantity: newQuantity }
//               : item
//           )
//         );
//         toast.success("Quantity updated");
//       } catch {
//         toast.error("Failed to update quantity");
//       }
//     },
//     800,
//     { trailing: true }
//   );

//   const handleRemoveFromCart = async (cart_item_id) => {
//     try {
//       await removeProductFromCart(cart_item_id);
//       setCartItems((prev) =>
//         prev.filter((item) => item.cart_item_id !== cart_item_id)
//       );
//       toast.success("Product removed from cart");
//     } catch {
//       toast.error("Failed to remove product");
//     }
//   };

//   const handleClearCart = async () => {
//     try {
//       await clearUserCart(userId);
//       clearCart();
//       toast.success("Cart cleared");
//     } catch {
//       toast.error("Failed to clear cart");
//     }
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce(
//       (sum, item) =>
//         sum + (parseFloat(item.product_price) || 0) * (item.quantity || 1),
//       0
//     );
//   };

//   if (loading || userId === null) {
//     return <div className="text-center mt-10">Loading your cart...</div>;
//   }

//   return (
//     <>
//       <Header />
//       <div className="container mx-auto p-5">
//         <h1 className="text-3xl font-semibold mb-8">Your Shopping Cart</h1>

//         {cartItems.length === 0 ? (
//           <div className="text-center py-12">
//             <h2 className="text-2xl mb-4">Your cart is empty</h2>
//             <p className="mb-6 text-gray-600">
//               Add some products to your cart and they will appear here.
//             </p>
//             <Link to="/">
//               <button
//                 className="font-hina font-semibold px-6 py-2 rounded-full transition duration-300"
//                 style={{ backgroundColor: "#D63384", color: "#FFFFFF" }}
//                 onMouseOver={(e) => (e.target.style.backgroundColor = "#B03074")}
//                 onMouseOut={(e) => (e.target.style.backgroundColor = "#D63384")}
//               >
//                 Continue Shopping
//               </button>
//             </Link>
//           </div>
//         ) : (
//           <div className="flex flex-col lg:flex-row gap-8">
//             <div className="lg:w-2/3">
//               <div className="bg-white rounded-lg shadow">
//                 <table className="w-full">
//                   <thead className="border-b">
//                     <tr>
//                       <th className="text-left p-4">Product</th>
//                       <th className="text-center p-4">Quantity</th>
//                       <th className="text-right p-4">Price</th>
//                       <th className="text-right p-4">Total</th>
//                       <th className="p-4"></th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {cartItems.map((item) => (
//                       <tr key={item.cart_item_id} className="border-b">
//                         <td className="p-4">
//                           <div className="flex items-center">
//                             <img
//                               src={item.product_image || "/placeholder.jpg"}
//                               alt={item.product_name}
//                               className="w-16 h-16 object-cover rounded mr-4"
//                             />
//                             <span>{item.product_name}</span>
//                           </div>
//                         </td>
//                         <td className="p-4">
//                           <div className="flex items-center justify-center">
//                             <button
//                               className="px-2 border rounded-l"
//                               onClick={() =>
//                                 throttledUpdateQuantity(
//                                   item.cart_item_id,
//                                   Math.max(1, item.quantity - 1)
//                                 )
//                               }
//                             >
//                               -
//                             </button>
//                             <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
//                             <button
//                               className="px-2 border rounded-r"
//                               onClick={() =>
//                                 throttledUpdateQuantity(
//                                   item.cart_item_id,
//                                   item.quantity + 1
//                                 )
//                               }
//                             >
//                               +
//                             </button>
//                           </div>
//                         </td>
//                         <td className="p-4 text-right">
//                           ${parseFloat(item.product_price || 0).toFixed(2)}
//                         </td>
//                         <td className="p-4 text-right">
//                           $
//                           {(parseFloat(item.product_price || 0) * (item.quantity || 1)).toFixed(2)}
//                         </td>
//                         <td className="p-4 text-right">
//                           <button
//                             onClick={() => handleRemoveFromCart(item.cart_item_id)}
//                             className="text-gray-500 hover:text-red-500"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             <div className="lg:w-1/3">
//               <div className="bg-white rounded-lg shadow p-6">
//                 <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//                 <div className="flex justify-between mb-2">
//                   <span>Subtotal</span>
//                   <span>${calculateTotal().toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between mb-2">
//                   <span>Shipping</span>
//                   <span>$10.00</span>
//                 </div>
//                 <div className="border-t my-4"></div>
//                 <div className="flex justify-between mb-6 font-semibold">
//                   <span>Total</span>
//                   <span>${(calculateTotal() + 10).toFixed(2)}</span>
//                 </div>

//                 <button
//                   onClick={handleClearCart}
//                   className="w-full font-hina font-semibold px-6 py-2 rounded-full transition duration-300 mb-3"
//                   style={{ backgroundColor: "#D63384", color: "#FFFFFF" }}
//                   onMouseOver={(e) => (e.target.style.backgroundColor = "#B03074")}
//                   onMouseOut={(e) => (e.target.style.backgroundColor = "#D63384")}
//                 >
//                   Clear Cart
//                 </button>

//                 <Link to="/checkout">
//                   <button
//                     className="w-full font-hina font-semibold px-6 py-2 rounded-full transition duration-300 mb-3"
//                     style={{ backgroundColor: "#28a745", color: "#FFFFFF" }}
//                     onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
//                     onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
//                   >
//                     Proceed to Checkout
//                   </button>
//                 </Link>

//                 <Link to="/" className="block">
//                   <button
//                     className="w-full font-hina font-semibold px-6 py-2 rounded-full transition duration-300"
//                     style={{ backgroundColor: "#9E9A9C", color: "#FFFFFF" }}
//                     onMouseOver={(e) => (e.target.style.backgroundColor = "#7a7678")}
//                     onMouseOut={(e) => (e.target.style.backgroundColor = "#9E9A9C")}
//                   >
//                     Continue Shopping
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CartPage;
