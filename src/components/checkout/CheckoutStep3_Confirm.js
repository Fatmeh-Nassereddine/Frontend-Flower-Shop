// import React, { useState, useEffect } from 'react';
// import { checkoutCart } from '../../api/apiOrders';
// import { getUserCart } from '../../api/apiCart';
// import { getUser } from '../../api/auth';

// const Step3 = ({ shippingFee, nextStep, prevStep, setOrderId, loading }) => {
//   const [userCart, setUserCart] = useState([]);
//   const [user, setUser] = useState(null); // Store user data
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch user data and cart when the component mounts
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userData = await getUser(); // Fetch the current user data
//         setUser(userData);
//         if (userData?.id) {
//           // Once user data is fetched, fetch their cart
//           fetchUserCart(userData.id);
//         } else {
//           console.error("User ID is missing.");
//           setIsLoading(false);
//         }
//       } catch (error) {
//         console.error('Failed to fetch user:', error);
//         setIsLoading(false);
//       }
//     };

//     const fetchUserCart = async (userId) => {
//       try {
//         const cartData = await getUserCart(userId);
//         setUserCart(cartData.items || []); // Assuming cartData contains a list of items
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch user cart:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchUserData(); // Initiate user data fetch
//   }, []);

//   console.log('User:', user);
//   console.log('User Cart:', userCart);
//   console.log('Shipping Fee:', shippingFee);

//   // Safeguard to ensure cart.total is a valid number
//   // Calculate total from cart items
//   const cartSubtotal = (userCart || []).reduce((sum, item) => {
//     return sum + (item.product_price || 0) * (item.quantity || 0);
//   }, 0);

//   // Total = cartSubtotal + shippingFee
//   const total = cartSubtotal;
//   const totalWithShipping = total + (Number(shippingFee) || 0); // Add shippingFee to the total

//   const handleCheckout = async () => {
//     try {
//       const orderDetails = {
//         cartItems: userCart, // Use the fetched user cart
//         total, // Use the sanitized total
//         shippingFee, // Use the shipping fee passed
//         grandTotal: totalWithShipping, // Grand total with shipping fee included
//       };

//       const res = await checkoutCart(orderDetails);
//       setOrderId(res.orderId);
//       nextStep();
//     } catch (err) {
//       console.error('Checkout failed:', err);
//     }
//   };

//   return (
//     <div>
//       <h2>Step 3: Confirm Order</h2>

//       {/* Order Summary */}
//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//         {isLoading ? (
//           <p>Loading cart...</p>
//         ) : !userCart || userCart.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <>
//             {userCart.map((item) => (
//               <div key={item.product_id} className="flex justify-between border-b py-2">
//                 <div>{item.name} (x{item.quantity})</div>
//                 <div>
//                   $ {(Number(item.product_price || 0) * (item.quantity || 0)).toFixed(2)}
//                 </div>
//               </div>
//             ))}
//             <div className="flex justify-between mt-4">
//               <span>Subtotal:</span>
//               <span>${cartSubtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Shipping:</span>
//               <span>${(Number(shippingFee) || 0).toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between font-semibold border-t mt-2 pt-2">
//               <span>Total:</span>
//               <span>${(cartSubtotal + (Number(shippingFee) || 0)).toFixed(2)}</span> {/* Ensure correct total */}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Checkout Buttons */}
      
//       <div className="mt-4 flex gap-12">
//         <button onClick={handleCheckout} className="w-1/2 bg-black text-white py-2 rounded">Place Order</button>
//         <button onClick={prevStep} className="w-1/2 bg-black text-white py-2 rounded">Back</button>
//       </div>

//     </div>
//   );
// };

// export default Step3;



// import React, { useState, useEffect } from 'react';
// import { checkoutCart } from '../../api/apiOrders';
// import { getUserCart } from '../../api/apiCart';
// import { getUser } from '../../api/auth';
// import { useShop } from '../../components/context/ShopContext'; // ✅

// const Step3 = ({ shippingFee, nextStep, prevStep, setOrderId }) => {
//   const [userCart, setUserCart] = useState([]);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const { getCartSubtotal, getDiscountedTotal, discount ,clearCart } = useShop(); // ✅

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userData = await getUser();
//         setUser(userData);
//         if (userData?.id) {
//           const cartData = await getUserCart(userData.id);
//           setUserCart(cartData.items || []);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const subtotal = getCartSubtotal();
//   const discounted = getDiscountedTotal();
//   const totalWithShipping = discounted + (Number(shippingFee) || 0);

//   const handleCheckout = async () => {
//     try {
//       const orderDetails = {
//         cartItems: userCart,
//         total: subtotal,
//         discount: subtotal - discounted,
//         shippingFee,
//         grandTotal: totalWithShipping,
//       };
//       const res = await checkoutCart(orderDetails);


//       clearCart(); // ✅ clear frontend cart
//       setOrderId(res.orderId);
//       nextStep();
//     } catch (err) {
      
//     }
//   };

//   return (
//     <div>
//       <h2>Step 3: Confirm Order</h2>

//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

//         {isLoading ? (
//           <p>Loading cart...</p>
//         ) : (
//           <>
//             {userCart.map((item) => (
//               <div key={item.product_id} className="flex justify-between border-b py-2">
//                 <div>{item.name} (x{item.quantity})</div>
//                 <div>${(item.product_price * item.quantity).toFixed(2)}</div>
//               </div>
//             ))}

//             <div className="flex justify-between mt-4">
//               <span>Subtotal:</span>
//               <span>${subtotal.toFixed(2)}</span>
//             </div>

//             {discount && (
//               <div className="flex justify-between text-green-700">
//                 <span>Discount:</span>
//                 <span>-${(subtotal - discounted).toFixed(2)}</span>
//               </div>
//             )}

//             <div className="flex justify-between">
//               <span>Shipping:</span>
//               <span>${(Number(shippingFee) || 0).toFixed(2)}</span>
//             </div>

//             <div className="flex justify-between font-semibold border-t mt-2 pt-2">
//               <span>Total:</span>
//               <span>${totalWithShipping.toFixed(2)}</span>
//             </div>

//             <button
//               onClick={handleCheckout}
//               className="mt-4 w-full bg-black text-white py-2 rounded"
//             >
//               Confirm & Place Order
//             </button>
//             <button onClick={prevStep} className="mt-2 w-full bg-gray-200 py-2 rounded">
//               ← Back
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Step3;



// import React, { useState, useEffect } from 'react';
// import { checkoutCart } from '../../api/apiOrders';
// import { getUserCart } from '../../api/apiCart';
// import { getUser } from '../../api/auth';
// import { useShop } from '../../components/context/ShopContext'; // ✅

// const Step3 = ({  shippingFee, 
//   addressId,
//   cart,
//   onSuccess,
//   prevStep 
// }) => {
//   // Remove duplicate cart fetching - use prop instead
//   const [userCart, setUserCart] = useState(cart?.items || []);

  

//   const subtotal = getCartSubtotal();
//   const discounted = getDiscountedTotal();
//   const totalWithShipping = discounted + (Number(shippingFee) || 0);

//   const handleCheckout = async () => {
//     try {
//       const orderDetails = {
//         shippingAddressId: addressId, // Pass address to backend
//         cartItems: userCart,
//         total: subtotal,
//         discount: subtotal - discounted,
//         shippingFee,
//         grandTotal: totalWithShipping,
//       };
//       const res = await checkoutCart(orderDetails);
//       if (res.orderId) {
//         toast.success('Order placed successfully!');
//         onSuccess(res.orderId);
//       } else {
//         throw new Error('Checkout failed');
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.error || 'Checkout failed. Please try again.');
//       console.error('Checkout error:', err);
//     }


//       clearCart(); // ✅ clear frontend cart
//       setOrderId(res.orderId);
//       nextStep();
//     } catch (err) {
      
//     }
//   };

//   return (
//     <div>
//       <h2>Step 3: Confirm Order</h2>

//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

//         {isLoading ? (
//           <p>Loading cart...</p>
//         ) : (
//           <>
//             {userCart.map((item) => (
//               <div key={item.product_id} className="flex justify-between border-b py-2">
//                 <div>{item.name} (x{item.quantity})</div>
//                 <div>${(item.product_price * item.quantity).toFixed(2)}</div>
//               </div>
//             ))}

//             <div className="flex justify-between mt-4">
//               <span>Subtotal:</span>
//               <span>${subtotal.toFixed(2)}</span>
//             </div>

//             {discount && (
//               <div className="flex justify-between text-green-700">
//                 <span>Discount:</span>
//                 <span>-${(subtotal - discounted).toFixed(2)}</span>
//               </div>
//             )}

//             <div className="flex justify-between">
//               <span>Shipping:</span>
//               <span>${(Number(shippingFee) || 0).toFixed(2)}</span>
//             </div>

//             <div className="flex justify-between font-semibold border-t mt-2 pt-2">
//               <span>Total:</span>
//               <span>${totalWithShipping.toFixed(2)}</span>
//             </div>

//             <button
//               onClick={handleCheckout}
//               className="mt-4 w-full bg-black text-white py-2 rounded"
//             >
//               Confirm & Place Order
//             </button>
//             <button onClick={prevStep} className="mt-2 w-full bg-gray-200 py-2 rounded">
//               ← Back
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Step3;



// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// import { toast } from 'react-toastify';
// import { useShop } from '../../components/context/ShopContext';
// import Loader from '../../components/loader/Loader';
// import { createShipping } from '../../api/apiShipping';

// const Step3 = ({ 
//   shippingFee, 
//   addressId,
//   cart,
//   onSuccess,
//   prevStep 
// }) => {
//   const { 
//     discount, 
//     getCartSubtotal, 
//     getDiscountedTotal, 
//     clearCart 
//   } = useShop();
  
//   const [isLoading, setIsLoading] = useState(false);
//   const [checkoutError, setCheckoutError] = useState(null);
//   const [userCart, setUserCart] = useState([]);

//   useEffect(() => {
//     if (cart?.items) {
//       setUserCart(cart.items);
//     }
//   }, [cart]);

//   const subtotal = getCartSubtotal();
//   const discounted = getDiscountedTotal();
//   const totalWithShipping = discounted + (Number(shippingFee) || 0);

//   const handleCheckout = async () => {
//     if (!addressId) {
//       toast.error('Please complete shipping information');
//       return;
//     }

//     setIsLoading(true);
//     setCheckoutError(null);

//     try {
//       // 1. Validate we have everything needed
//       if (!userCart.length) {
//         throw new Error('Your cart is empty');
//       }

//       // 2. Prepare order data
//       const orderDetails = {
//         shippingAddressId: addressId,
//         cartItems: userCart,
//         subtotal,
//         discount: subtotal - discounted,
//         shippingFee,
//         grandTotal: totalWithShipping,
//         paymentMethod: 'Cash on Delivery'
//       };

//       // 3. Create the order
//       // const orderResponse = await checkoutCart(orderDetails);
      
//       // if (!orderResponse?.orderId) {
//       //   throw new Error(orderResponse?.error || 'Order creation failed');
//       // }

//       // 4. Create shipping record
//       const shippingResponse = await createShipping({
//         delivery_fee: shippingFee,
//         // order_id: orderResponse.orderId,
//         address_id: addressId
//       });

//       if (!shippingResponse?.success) {
//         // Compensating action - you might want to cancel the order here
//         // console.error('Shipping failed for order:', orderResponse.orderId);
//         throw new Error(shippingResponse.error || 'Failed to create shipping record');
//       }

//       // 5. Success case
//       // toast.success(`Order #${orderResponse.orderId} placed successfully!`);
//       // clearCart();
//       // onSuccess(orderResponse.orderId);

//     } catch (error) {
//       console.error('Checkout error:', {
//         error: error.response?.data || error.message,
//         addressId,
//         shippingFee
//       });
//       setCheckoutError(error.message);
//       toast.error(error.message || 'Checkout failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="flex items-center mb-6">
//         <button 
//           onClick={prevStep}
//           className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
//           disabled={isLoading}
//         >
//           <svg 
//             xmlns="http://www.w3.org/2000/svg" 
//             className="h-5 w-5 mr-1" 
//             viewBox="0 0 20 20" 
//             fill="currentColor"
//           >
//             <path 
//               fillRule="evenodd" 
//               d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
//               clipRule="evenodd" 
//             />
//           </svg>
//           Back
//         </button>
//         <h2 className="text-2xl font-bold">Confirm Your Order</h2>
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <div className="p-6 border-b">
//           <h3 className="text-lg font-medium">Order Summary</h3>
//         </div>

//         {isLoading && !userCart.length ? (
//           <div className="p-8 flex justify-center">
//             <Loader size="lg" />
//           </div>
//         ) : (
//           <>
//             <div className="divide-y">
//               {userCart.map(item => (
//                 <div 
//                   key={`${item.product_id}-${item.quantity}`} 
//                   className="flex justify-between items-center p-4"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <img
//                       src={item.product_image || '/placeholder.jpg'}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = '/placeholder.jpg';
//                       }}
//                     />
//                     <div>
//                       <p className="font-medium">{item.name}</p>
//                       <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//                     </div>
//                   </div>
//                   <p className="font-medium">
//                     ${(item.product_price * item.quantity).toFixed(2)}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <div className="p-6 border-t">
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </div>

//                 {discount > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Discount</span>
//                     <span>-${(subtotal - discounted).toFixed(2)}</span>
//                   </div>
//                 )}

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Shipping</span>
//                   <span>${shippingFee.toFixed(2)}</span>
//                 </div>

//                 <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-lg">
//                   <span>Total</span>
//                   <span>${totalWithShipping.toFixed(2)}</span>
//                 </div>
//               </div>

//               {checkoutError && (
//                 <div className="mt-4 p-3 bg-red-50 text-red-600 rounded text-sm">
//                   {checkoutError}
//                 </div>
//               )}

//               <button
//                 onClick={handleCheckout}
//                 disabled={isLoading || !userCart.length || !addressId}
//                 className={`mt-6 w-full py-3 px-4 rounded-md font-medium flex items-center justify-center ${
//                   isLoading || !userCart.length || !addressId
//                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     : 'bg-black text-white hover:bg-gray-800'
//                 }`}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader size="sm" className="mr-2" />
//                     Processing...
//                   </>
//                 ) : !addressId ? (
//                   'Complete shipping info first'
//                 ) : (
//                   'Confirm & Place Order'
//                 )}
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// Step3.propTypes = {
//   shippingFee: PropTypes.number.isRequired,
//   addressId: PropTypes.number,
//   cart: PropTypes.shape({
//     items: PropTypes.arrayOf(
//       PropTypes.shape({
//         product_id: PropTypes.number.isRequired,
//         name: PropTypes.string.isRequired,
//         product_price: PropTypes.number.isRequired,
//         quantity: PropTypes.number.isRequired,
//         product_image: PropTypes.string,
//       })
//     )
//   }),
//   onSuccess: PropTypes.func.isRequired,
//   prevStep: PropTypes.func.isRequired,
// };

// export default Step3;




// import React from 'react';

// const Step3 = ({ orderId }) => {
//   return (
//     <div className="text-center mt-10">
//       <h2 className="text-2xl font-semibold text-green-600">Step 3: Success 🎉</h2>
//       <p className="mt-4 text-gray-700">
//         Your order (ID: <strong>{orderId}</strong>) has been placed successfully!
//       </p>
//     </div>
//   );
// };

// export default Step3;



import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Step3 = ({ orderId }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-20 p-8 bg-white rounded-2xl shadow-lg max-w-lg mx-auto">
      <CheckCircle className="text-green-600 w-16 h-16 mb-4" />
      <h2 className="text-3xl font-semibold text-green-600 mb-2">Order Successful!</h2>
      <p className="text-gray-700 text-center">
        Your order (ID: <strong>{orderId}</strong>) has been placed successfully.
      </p>
      <button 
        onClick={() => navigate('/shop')}
        className="mt-6 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default Step3;