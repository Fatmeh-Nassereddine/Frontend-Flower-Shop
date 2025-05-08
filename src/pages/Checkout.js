// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { checkoutCart } from "../api/apiOrders";
// import { createAddress } from "../api/apiAddress";
// import { getUser } from "../api/auth"; // Import the getUser function
// import { useShop } from "../components/context/ShopContext"; // Context for cart
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { throttle } from "lodash";

// function CheckoutPage() {
//   const { cartItems, updateQuantity, clearCart, loading } = useShop(); // Use context
//   const [address, setAddress] = useState({
//     street_address: "",
//     city: "",
//     governorate: "",
//     phone_number: "",
//   });
//   const [createdAddressId, setCreatedAddressId] = useState(null);
//   const [user, setUser] = useState(null); // Store user information
//   const [isAgreed, setIsAgreed] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const shippingFee = 10;

//   // Quantity updates and real-time total
//   const subtotal = cartItems.reduce((total, item) => {
//     const price = Number(item.product_price || item.price || 0);
//     return total + price * item.quantity;
//   }, 0);
//   const total = subtotal + shippingFee;

//   // Fetch user info when the component mounts
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userData = await getUser(); // Fetch user info
//         setUser(userData); // Store the user info
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   // Handle input change for address
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAddress((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle creating address
//   const handleCreateAddress = async () => {
//     if (!user || !address.street_address || !address.city || !address.governorate || !address.phone_number) {
//       toast.error("Please fill out all address fields");
//       return;
//     }
  
//     try {
//       const result = await createAddress({
//         ...address,
//         user_id: user.id, // Pass the user ID here
//       });
//       console.log('Response from API:', result); // Log the full API response
  
//       // Check the response structure
//       if (result && 'insertId' in result) {
//         toast.success("Address added successfully");
//         setCreatedAddressId(result.insertId);
//       } else {
//         toast.error("Failed to create address");
//       }
      
//     } catch (error) {
//       console.error("Error creating address:", error);
//       toast.error("Failed to create address");
//     }
//   };
  
//   // Handle placing order
//   const handlePlaceOrder = async () => {
//     if (!createdAddressId) {
//       toast.error("Please create and select a shipping address");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const res = await checkoutCart({
//         address_id: createdAddressId,
//         payment_method: "Cash on Delivery",
//       });
//       toast.success(res.message);
//       await clearCart();
//       navigate("/thank-you");
//     } catch (err) {
//       console.error("Checkout failed:", err);
//       toast.error("Something went wrong. Please try again");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Throttled update for cart item quantity
//   const throttledUpdateQuantity = throttle((cartItemId, quantity) => {
//     updateQuantity(cartItemId, quantity);
//   }, 300);

//   return (
//     <>
//       <Header />
//       <div className="container mx-auto p-4 max-w-3xl">
//         <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

//         {/* Shipping Address Section */}
//         <div className="mb-6">
//           <h3 className="text-lg font-medium mb-2">Enter Shipping Address</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="street_address"
//               value={address.street_address}
//               onChange={handleInputChange}
//               placeholder="Street Address"
//               className="border p-2 rounded"
//             />
//             <input
//               type="text"
//               name="city"
//               value={address.city}
//               onChange={handleInputChange}
//               placeholder="City"
//               className="border p-2 rounded"
//             />
//             <input
//               type="text"
//               name="governorate"
//               value={address.governorate}
//               onChange={handleInputChange}
//               placeholder="Governorate"
//               className="border p-2 rounded"
//             />
//             <input
//               type="text"
//               name="phone_number"
//               value={address.phone_number}
//               onChange={handleInputChange}
//               placeholder="Phone Number"
//               className="border p-2 rounded"
//             />
//           </div>
//           <button
//             onClick={handleCreateAddress}
//             className="mt-4 bg-green-600 text-white py-2 px-4 rounded"
//           >
//             Save Address
//           </button>
//           {createdAddressId && (
//             <div className="mt-4 text-green-700">
//               Address saved. You can now place your order.
//             </div>
//           )}
//         </div>

//         {/* Order Summary */}
//         <div className="mb-6">
//           <h3 className="text-lg font-medium mb-2">Order Summary</h3>
//           <div className="border rounded p-4 space-y-4">
//             {loading ? (
//               <div className="text-center text-gray-500">Loading your cart...</div>
//             ) : cartItems.length > 0 ? (
//               <>
//                 {cartItems.map((item) => (
//                   <div
//                     key={item.product_id}
//                     className="flex justify-between items-center gap-4"
//                   >
//                     <img
//                       src={item.product_image || "/placeholder.jpg"}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                     <div className="flex-1">
//                       <h4 className="font-semibold">{item.name}</h4>
//                       <div className="flex items-center mt-1">
//                         <button
//                           className="px-2 border rounded-l"
//                           onClick={() =>
//                             throttledUpdateQuantity(
//                               item.cart_item_id,
//                               Math.max(1, item.quantity - 1)
//                             )
//                           }
//                         >
//                           -
//                         </button>
//                         <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
//                         <button
//                           className="px-2 border rounded-r"
//                           onClick={() =>
//                             throttledUpdateQuantity(
//                               item.cart_item_id,
//                               item.quantity + 1
//                             )
//                           }
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-sm text-gray-600">
//                         ${Number(item.product_price).toFixed(2)}
//                       </p>
//                       <p className="font-semibold">
//                         ${item.product_price && item.quantity
//                           ? (Number(item.product_price) * item.quantity).toFixed(2)
//                           : "0.00"}
//                       </p>
//                     </div>
//                   </div>
//                 ))}

//                 <div className="flex justify-between font-semibold pt-2 border-t mt-2">
//                   <span>Subtotal:</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between font-semibold">
//                   <span>Shipping Fee:</span>
//                   <span>${shippingFee.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between font-bold text-lg border-t pt-2">
//                   <span>Total:</span>
//                   <span>${total.toFixed(2)}</span>
//                 </div>
//               </>
//             ) : (
//               <p className="text-gray-500">Your cart is empty</p>
//             )}
//           </div>
//         </div>

//         {/* Agreement */}
//         <div className="mb-4 flex items-start gap-2">
//           <input
//             type="checkbox"
//             checked={isAgreed}
//             onChange={() => {
//             setIsAgreed(!isAgreed);
//             console.log("Agreed state:", !isAgreed); // Log state change
//              }}
            
//             className="mt-1"
//           />
//           <label className="text-sm text-gray-700">
//             I agree to the terms and conditions, and confirm my order.
//           </label>
//         </div>

//         {/* Place Order Button */}
//         <button
//           onClick={handlePlaceOrder}
//           disabled={!isAgreed || !createdAddressId || isLoading || cartItems.length === 0}
//           className={`w-full py-2 rounded font-semibold flex items-center justify-center ${isAgreed && createdAddressId && !isLoading && cartItems.length > 0 ? "bg-[#4B2E19] text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
//         >
//           {isLoading ? (
//             <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
//           ) : (
//             <>Place Order (${total.toFixed(2)})</>
//           )}
//         </button>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default CheckoutPage;







import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Step1 from '../components/checkout/CheckoutStep1_CartReview';
import Step2 from '../components/checkout/CheckoutStep2_Shipping';
import Step3 from '../components/checkout/CheckoutStep3_Confirm';
import Step4 from '../components/checkout/CheckoutStep4_Success';
import Header from '../components/Header';
import Footer from '../components/Footer';

// CheckoutPage.jsx
const CheckoutPage = () => {
  const [step, setStep] = useState(0);
  const [cart, setCart] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);  // Add state for shippingCost
  const [orderId, setOrderId] = useState(null);

  const steps = [
    { label: 'Review Cart', icon: <ShoppingCartIcon /> },
    { label: 'Shipping', icon: <LocalShippingIcon /> },
    { label: 'Confirm', icon: <PaymentIcon /> },
    { label: 'Complete', icon: <CheckCircleIcon /> },
  ];

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Step1 nextStep={() => setStep(1)} setCart={setCart} />;
      case 1:
        return (
          <Step2
            nextStep={() => setStep(2)}
            prevStep={() => setStep(0)}
            setShippingFee={setShippingFee}
            setShippingCost={setShippingCost}  // Add this prop
            shippingCost={shippingCost}  // Pass shippingCost to Step2
          />
        );
      case 2:
        return (
          <Step3
            cart={cart}
            shippingFee={shippingFee}
            nextStep={() => setStep(3)}
            prevStep={() => setStep(1)}
            setOrderId={setOrderId}
          />
        );
      case 3:
        return <Step4 orderId={orderId} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Header />
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-4 gap-2 mb-4 bg-gray-100 p-2 rounded">
        {steps.map((s, i) => (
          <div
            key={i}
            onClick={() => step >= i && setStep(i)}
            className={`flex items-center justify-center p-2 rounded cursor-pointer ${step === i ? 'bg-white shadow font-semibold' : ''} ${step < i ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {s.icon}
            <span className="ml-2 hidden sm:inline">{s.label}</span>
          </div>
        ))}
      </div>
      {renderStep()}
      <Footer />
    </div>
  );
};

export default CheckoutPage;
