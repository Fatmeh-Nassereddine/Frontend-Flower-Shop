// import React, { useEffect, useState } from 'react';
// import { getUser } from '../../api/auth';
// import { getUserCart } from '../../api/apiCart';
// import PrimaryButton from '../../components/PrimaryButton'; // Adjust the path as needed

// const Step1 = ({ nextStep, setCart }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getUser()
//       .then(user => {
//         if (user && user.id) {
//           setUserId(user.id);
//         } else {
//           console.error('No user found');
//           setLoading(false);
//         }
//       })
//       .catch(err => {
//         console.error('Error fetching user:', err);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       getUserCart(userId)
//         .then(cart => {
//           setCart(cart);
//           setCartItems(cart.items);
//           setLoading(false);
//         })
//         .catch(err => {
//           console.error('Failed to load cart:', err);
//           setLoading(false);
//         });
//     }
//   }, [userId]);

//   return (
//     <div>
//       <h2>Step 1: Review Your Cart</h2>

//       {loading ? (
//         <div className="text-center text-gray-500">Loading your cart...</div>
//       ) : cartItems.length > 0 ? (
//         <>
//           {cartItems.map(item => (
//             <div key={item.product_id} className="flex justify-between items-center gap-4 p-2 border-b">
//               <img
//                 src={item.product_image || "/placeholder.jpg"}
//                 alt={item.name}
//                 className="w-16 h-16 object-cover rounded"
//               />
//               <div className="flex-1">
//                 <div className="font-semibold">{item.name}</div>
//                 <div>Qty: {item.quantity ?? 0}</div>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm text-gray-600">
//                   ${Number(item.product_price ?? 0).toFixed(2)}
//                 </p>
//                 <p className="font-semibold">
//                   ${item.product_price && item.quantity
//                     ? (Number(item.product_price) * item.quantity).toFixed(2)
//                     : "0.00"}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </>
//       ) : (
//         <p>Your cart is empty.</p>
//       )}

//       {/* Centered Button */}
//       <div className="flex justify-center mt-6">
//         <PrimaryButton text="Next" onClick={nextStep} />
//       </div>
//     </div>
//   );
// };

// export default Step1;



// import React, { useEffect, useState } from 'react';
// import { getUser } from '../../api/auth';
// import { getUserCart } from '../../api/apiCart';
// import PrimaryButton from '../../components/PrimaryButton'; // Adjust the path as needed

// const Step1 = ({ nextStep,  updateCheckoutData  }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getUser()
//       .then(user => {
//         if (user && user.id) {
//           setUserId(user.id);
//         } else {
//           console.error('No user found');
//           setLoading(false);
//         }
//       })
//       .catch(err => {
//         console.error('Error fetching user:', err);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       getUserCart(userId)
//         .then(cart => {
//           updateCheckoutData({ cart }); // Store in central state
//           setCartItems(cart.items);
//           setLoading(false);
//         })
//         // ... error handling
//     }
//   }, [userId]);

//   return (
//     <div>
//       <h2>Step 1: Review Your Cart</h2>

//       {loading ? (
//         <div className="text-center text-gray-500">Loading your cart...</div>
//       ) : cartItems.length > 0 ? (
//         <>
//           {cartItems.map(item => (
//             <div key={item.product_id} className="flex justify-between items-center gap-4 p-2 border-b">
//               <img
//                 src={item.product_image || "/placeholder.jpg"}
//                 alt={item.name}
//                 className="w-16 h-16 object-cover rounded"
//               />
//               <div className="flex-1">
//                 <div className="font-semibold">{item.name}</div>
//                 <div>Qty: {item.quantity ?? 0}</div>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm text-gray-600">
//                   ${Number(item.product_price ?? 0).toFixed(2)}
//                 </p>
//                 <p className="font-semibold">
//                   ${item.product_price && item.quantity
//                     ? (Number(item.product_price) * item.quantity).toFixed(2)
//                     : "0.00"}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </>
//       ) : (
//         <p>Your cart is empty.</p>
//       )}

//       {/* Centered Button */}
//       <div className="flex justify-center mt-6">
//         <PrimaryButton text="Next" onClick={nextStep} />
//       </div>
//     </div>
//   );
// };

// export default Step1;







// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { getUser } from '../../api/auth';
// import { getUserCart } from '../../api/apiCart';
// import PrimaryButton from '../../components/PrimaryButton';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';


// const Step1 = ({ nextStep, updateCheckoutData }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserAndCart = async () => {
//       try {
//         // Fetch user data
//         const user = await getUser();
        
//         if (!user?.id) {
//           throw new Error('No authenticated user found');
//         }
        
//         setUserId(user.id);
        
//         // Fetch cart data
//         const cart = await getUserCart(user.id);
        
//         if (!cart) {
//           throw new Error('Cart not found');
//         }
        
//         updateCheckoutData({ cart });
//         setCartItems(cart.items || []);
        
//       } catch (err) {
//         console.error('Error:', err);
//         setError(err.message);
//         toast.error(`Error loading your cart: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserAndCart();
//   }, [updateCheckoutData]);

//   const handleNextStep = () => {
//     if (cartItems.length === 0) {
//       toast.error('Your cart is empty. Please add items before proceeding.');
//       return;
//     }
//     nextStep();
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-8">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
//         <p className="text-gray-600">Loading your cart...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-8">
//         <div className="text-red-500 mb-4">Error: {error}</div>
//         <button 
//           onClick={() => window.location.reload()}
//           className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Review Your Cart</h2>

//       {cartItems.length > 0 ? (
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           {cartItems.map(item => (
//             <div 
//               key={`${item.product_id}-${item.quantity}`} 
//               className="flex justify-between items-center p-4 border-b last:border-b-0"
//             >
//               <div className="flex items-center space-x-4">
//                 <img
//                   src={item.product_image || "/placeholder.jpg"}
//                   alt={item.name}
//                   className="w-20 h-20 object-cover rounded"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "/placeholder.jpg";
//                   }}
//                 />
//                 <div>
//                   <div className="font-semibold">{item.name}</div>
//                   <div className="text-gray-600">Qty: {item.quantity ?? 0}</div>
//                   {item.stock_quantity < item.quantity && (
//                     <div className="text-red-500 text-sm mt-1">
//                       Only {item.stock_quantity} available
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="text-gray-600 line-through">
//                   {item.original_price && item.original_price !== item.product_price ? 
//                     `$${Number(item.original_price).toFixed(2)}` : ''}
//                 </p>
//                 <p className="font-semibold text-lg">
//                   ${(Number(item.product_price) * (item.quantity || 0)).toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12 bg-white rounded-lg shadow">
//           <p className="text-xl mb-4">Your cart is empty</p>
//           <Link
//             to="/shop"
//             className="inline-block bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       )}

//       {cartItems.length > 0 && (
//         <div className="mt-8 flex justify-between items-center">
//           <Link
//             to="/shop"
//             className="text-pink-600 hover:underline"
//           >
//             ← Continue Shopping
//           </Link>
//           <PrimaryButton 
//             text="Proceed to Shipping" 
//             onClick={handleNextStep} 
//             disabled={cartItems.length === 0}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// Step1.propTypes = {
//   nextStep: PropTypes.func.isRequired,
//   updateCheckoutData: PropTypes.func.isRequired
// };

// export default Step1;





import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api/auth';
import { getUserCart, updateItemQuantity } from '../../api/apiCart';
import PrimaryButton from '../../components/PrimaryButton';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import axios from 'axios';
import throttle from "lodash/throttle";

const Step1 = ({ nextStep, updateCheckoutData }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [discountCode, setDiscountCode] = useState('');
  const { discount, setDiscount, getCartSubtotal, getDiscountedTotal } = useShop();
  const shippingCost = 10;

  useEffect(() => {
    const fetchUserAndCart = async () => {
      try {
        const user = await getUser();
        if (!user?.id) throw new Error('No authenticated user found');
        setUserId(user.id);
        const cart = await getUserCart(user.id);
        if (!cart) throw new Error('Cart not found');
        updateCheckoutData({ cart });
        setCartItems(cart.items || []);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
        toast.error(`Error loading your cart: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndCart();
  }, [updateCheckoutData]);

  const applyDiscount = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/discounts/code/${discountCode}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setDiscount(response.data);
      toast.success('Discount applied successfully!');
    } catch (err) {
      console.error('Apply Discount Error:', err);
      const message = err.response?.data?.message || 'Failed to apply discount.';
      toast.error(message);
    }
  };
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


  const handleNextStep = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Please add items before proceeding.');
      return;
    }
    nextStep();
  };

  const subtotal = getCartSubtotal();
  const discounted = getDiscountedTotal();
  const total = discounted + (Number(shippingCost) || 0);

  if (loading) {
    return <div className="text-center py-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div><p className="text-gray-600">Loading your cart...</p></div>;
  }

  if (error) {
    return <div className="text-center py-8"><div className="text-red-500 mb-4">Error: {error}</div><button onClick={() => window.location.reload()} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Try Again</button></div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Review Your Cart</h2>

      {cartItems.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {cartItems.map(item => (
            <div key={`${item.product_id}-${item.quantity}`} className="flex justify-between items-center p-4 border-b last:border-b-0">
              <div className="flex items-center space-x-4">
                <img src={item.product_image || '/placeholder.jpg'} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-gray-600">Qty: {item.quantity ?? 0}</div>
                </div>
              </div>
              <td className="p-4">
                <div className="flex items-center justify-center">
                  <button
                    className="px-2 border rounded-l"
                    onClick={() => throttledUpdateQuantity(item.cart_item_id, Math.max(1, item.quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                  <button
                    className="px-2 border rounded-r"
                    onClick={() => throttledUpdateQuantity(item.cart_item_id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </td>




              <div className="text-right">
                <p className="text-gray-600 line-through">${item.original_price}</p>
                <p className="font-semibold text-lg">${(Number(item.product_price) * (item.quantity || 0)).toFixed(2)}</p>
              </div>
            </div>
          ))}

          <div className="p-4 border-t">
            <input type="text" placeholder="Enter discount code" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} className="border rounded px-3 py-2 w-full mb-4" />
            <button onClick={applyDiscount} className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition w-full">Apply Discount</button>
            {discount && <p className="text-green-600 mt-2">Discount Applied: {discount.code} ({discount.discount_type === 'percentage' ? `${discount.amount}% OFF` : `$${discount.amount} OFF`})</p>}
          </div>

          <div className="p-4 border-t">
            <p className="font-semibold text-lg">Subtotal: ${subtotal.toFixed(2)}</p>
            {discount && (
              <div className="flex justify-between text-green-700">
                <span>Discount:</span>
                <span>-${(subtotal - discounted).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${(Number(shippingCost) || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t mt-2 pt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link to="/shop" className="inline-block bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors">Continue Shopping</Link>
        </div>
      )}

      {cartItems.length > 0 && <div className="mt-8 flex justify-between items-center"><Link to="/shop" className="text-pink-600 hover:underline">← Continue Shopping</Link><PrimaryButton text="Proceed to Shipping" onClick={handleNextStep} disabled={cartItems.length === 0} /></div>}
    </div>
  );
};

Step1.propTypes = {
  nextStep: PropTypes.func.isRequired,
  updateCheckoutData: PropTypes.func.isRequired
};

export default Step1;
