// import React, { useEffect, useState } from 'react';
// import { fetchShippingOptions } from '../../api/apiShipping';
// import { getUser } from '../../api/auth';
// import { getUserCart } from '../../api/apiCart';
// import { createAddress } from "../../api/apiAddress"; // Import the createAddress function
// import { toast } from 'react-toastify'; // Assuming you're using toast notifications

// const Step2 = ({
//   nextStep,
//   prevStep,
//   setShippingFee,
//   productPrice,
//   shippingCost,
//   setShippingCost, // <-- make sure this is here
// }) => {
//   const [options, setOptions] = useState([]);
//   const [address, setAddress] = useState({
//     street_address: "",
//     city: "",
//     governorate: "",
//     phone_number: "",
//   });
//   const [createdAddressId, setCreatedAddressId] = useState(null);
//   const [user, setUser] = useState(null); // Store user information
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch user data when component mounts
//     const fetchUser = async () => {
//       try {
//         const userData = await getUser(); // Fetch user info
//         setUser(userData); // Store the user info
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       getUserCart(user.id)
//         .then((cart) => {
//           setCartItems(cart.items || []);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error('Failed to load cart:', err);
//           setLoading(false);
//         });
//     }
//   }, [user]);

//   useEffect(() => {
//     fetchShippingOptions()
//       .then((data) => setOptions(data))
//       .catch((err) => console.error('Error loading shipping options:', err));
//   }, []);

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
//       // Call the createAddress function with the address and user_id
//       const result = await createAddress({
//         ...address,
//         user_id: user.id, // Pass the user ID here
//       });
//       console.log('Response from API:', result); // Log the full API response

//       // Check the response structure
//       if (result && 'insertId' in result) {
//         toast.success("Address added successfully");
//         setCreatedAddressId(result.insertId); // Store the created address ID
//       } else {
//         toast.error("Failed to create address");
//       }
//     } catch (error) {
//       console.error("Error creating address:", error);
//       toast.error("Failed to create address");
//     }
//   };

//   const handleContinue = async () => {
//     setShippingFee(shippingCost);
//     nextStep();
//   };

//   const cartSubtotal = cartItems.reduce((sum, item) => {
//     return sum + (item.product_price || 0) * (item.quantity || 0);
//   }, 0);

//   // Ensure shippingCost is a number and total is correctly calculated
// const total = Number(cartSubtotal) + (Number(shippingCost) || 0); // Ensure it's a number

//   return (
//     <div className="grid lg:grid-cols-3 gap-6">
//       {/* Shipping Form */}
//       <div className="lg:col-span-2 bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//           <input
//             name="fullName"
//             value={user ? user.name : ''}
//             readOnly
//             className="p-2 border rounded"
//             placeholder="Full Name"
//           />
//           <input
//             name="email"
//             value={user ? user.email : ''}
//             readOnly
//             className="p-2 border rounded"
//             placeholder="Email"
//           />
//         </div>
//         <input
//           name="street_address"
//           value={address.street_address}
//           onChange={handleInputChange}
//           className="w-full mb-4 p-2 border rounded"
//           placeholder="Street Address"
//         />
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//           <input
//             name="city"
//             value={address.city}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//             placeholder="City"
//           />
//           <input
//             name="governorate"
//             value={address.governorate}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//             placeholder="Governorate"
//           />
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//           <input
//             name="phone_number"
//             value={address.phone_number}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//             placeholder="Phone Number"
//           />

//           {/* Create Address Button positioned next to the phone number */}
//           <button
//             onClick={handleCreateAddress}
//             className="mt-4 sm:mt-0 w-full sm:w-auto text-white py-2 rounded sm:ml-4 col-span-2 sm:col-span-1"
//             style={{ backgroundColor: '#D63384' }}
//             onMouseOver={(e) => {
//                     e.target.style.backgroundColor = '#B03074'; // Darker pink on hover
//                 }}
//                 onMouseOut={(e) => {
//                     e.target.style.backgroundColor = '#D63384'; // Reset to original color when not hovering
//                 }}
//             >
//             Create Address
//           </button>
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Shipping Method</label>
//           <div className="space-y-2">
//             {options.map((method, index) => (
//               <div
//                 key={index}
//                 className={`flex justify-between items-center p-4 border rounded cursor-pointer ${
//                   shippingCost === Number(method.delivery_fee) ? 'border-black' : 'border-gray-300'
//                 }`}
//                 onClick={() => setShippingCost(Number(method.delivery_fee))}
//               >
//                 <div>
//                   <div>{method.method}</div>
//                   <div className="text-sm text-gray-500">
//                     {method.estimated_days} days
//                   </div>
//                 </div>
//                 <div>${Number(method.delivery_fee).toFixed(2)}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Order Summary */}
//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//         {loading ? (
//           <p>Loading cart...</p>
//         ) : cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <>
//             {cartItems.map((item) => (
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
//               <span>${(Number(shippingCost) || 0).toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between font-semibold border-t mt-2 pt-2">
//               <span>Total:</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
//             <button
//               onClick={handleContinue}
//               className="mt-4 w-full bg-black text-white py-2 rounded"
//             >
//               Continue to Payment
//             </button>
//             <button
//               onClick={prevStep}
//               className="mt-2 w-full bg-gray-200 py-2 rounded"
//             >
//               ← Back
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Step2;



// import React, { useEffect, useState } from 'react';
// import { fetchShippingOptions } from '../../api/apiShipping';
// import { getUser } from '../../api/auth';
// import { getUserCart } from '../../api/apiCart';
// import { createAddress } from '../../api/apiAddress';
// import { toast } from 'react-toastify';
// import { useShop } from '../../components/context/ShopContext';

// const Step2 = ({
//   nextStep,
//   prevStep,
//   setShippingFee,
//   productPrice,
//   shippingCost,
//   setShippingCost,
// }) => {
//   const [options, setOptions] = useState([]);
//   const [address, setAddress] = useState({
//     street_address: '',
//     city: '',
//     governorate: '',
//     phone_number: '',
//   });
//   const [createdAddressId, setCreatedAddressId] = useState(null);
//   const [user, setUser] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const { discount, getCartSubtotal, getDiscountedTotal } = useShop();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userData = await getUser();
//         setUser(userData);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       getUserCart(user.id)
//         .then((cart) => {
//           setCartItems(cart.items || []);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error('Failed to load cart:', err);
//           setLoading(false);
//         });
//     }
//   }, [user]);

//   useEffect(() => {
//     fetchShippingOptions()
//       .then((data) => setOptions(data))
//       .catch((err) => console.error('Error loading shipping options:', err));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAddress((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCreateAddress = async () => {
//     if (!user || !address.street_address || !address.city || !address.governorate || !address.phone_number) {
//       toast.error('Please fill out all address fields');
//       return;
//     }

//     try {
//       const result = await createAddress({ ...address, user_id: user.id });
//       if (result && result.insertId != null) {
//         toast.success('Address added successfully');
//         setCreatedAddressId(result.insertId);
//       } else {
//         toast.error('Failed to create address');
//       }
//     } catch (error) {
//       console.error('Error creating address:', error);
//       toast.error('Error creating address');
//     }
//   };

//   const handleContinue = () => {
//     if (!shippingCost) {
//       toast.error('Please select a shipping method');
//       return;
//     }
//     setShippingFee(shippingCost);
//     nextStep();
//   };

//   const subtotal = getCartSubtotal();
//   const discounted = getDiscountedTotal();
//   const total = discounted + (Number(shippingCost) || 0);

//   return (
//     <div className="grid lg:grid-cols-3 gap-6">
//       {/* Form */}
//       <div className="lg:col-span-2 bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//           <input
//             name="fullName"
//             value={user ? user.name : ''}
//             readOnly
//             className="p-2 border rounded"
//             placeholder="Full Name"
//           />
//           <input
//             name="email"
//             value={user ? user.email : ''}
//             readOnly
//             className="p-2 border rounded"
//             placeholder="Email"
//           />
//         </div>

//         <input
//           name="street_address"
//           value={address.street_address}
//           onChange={handleInputChange}
//           className="w-full mb-4 p-2 border rounded"
//           placeholder="Street Address"
//         />

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//           <input
//             name="city"
//             value={address.city}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//             placeholder="City"
//           />
//           <input
//             name="governorate"
//             value={address.governorate}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//             placeholder="Governorate"
//           />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//           <input
//             name="phone_number"
//             value={address.phone_number}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//             placeholder="Phone Number"
//           />

//           <button
//             onClick={handleCreateAddress}
//             className="mt-4 sm:mt-0 w-full sm:w-auto text-white py-2 rounded sm:ml-4 col-span-2 sm:col-span-1"
//             style={{ backgroundColor: '#D63384' }}
//             onMouseOver={(e) => {
//               e.target.style.backgroundColor = '#B03074';
//             }}
//             onMouseOut={(e) => {
//               e.target.style.backgroundColor = '#D63384';
//             }}
//           >
//             Create Address
//           </button>
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Shipping Method</label>
//           <div className="space-y-2">
//             {options.map((method, index) => (
//               <div
//                 key={index}
//                 className={`flex justify-between items-center p-4 border rounded cursor-pointer ${
//                   shippingCost === Number(method.delivery_fee) ? 'border-black' : 'border-gray-300'
//                 }`}
//                 onClick={() => setShippingCost(Number(method.delivery_fee))}
//               >
//                 <div>
//                   <div>{method.method}</div>
//                   <div className="text-sm text-gray-500">{method.estimated_days} days</div>
//                 </div>
//                 <div>${Number(method.delivery_fee).toFixed(2)}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Summary */}
//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//         {loading ? (
//           <p>Loading cart...</p>
//         ) : cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <>
//             {cartItems.map((item) => (
//               <div key={item.product_id} className="flex justify-between border-b py-2">
//                 <div>{item.name} (x{item.quantity})</div>
//                 <div>${(Number(item.product_price) * item.quantity).toFixed(2)}</div>
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
//               <span>${(Number(shippingCost) || 0).toFixed(2)}</span>
//             </div>

//             <div className="flex justify-between font-semibold border-t mt-2 pt-2">
//               <span>Total:</span>
//               <span>${total.toFixed(2)}</span>
//             </div>

//             <button
//               onClick={handleContinue}
//               className="mt-4 w-full bg-black text-white py-2 rounded"
//             >
//               Continue to Payment
//             </button>
//             <button
//               onClick={prevStep}
//               className="mt-2 w-full bg-gray-200 py-2 rounded"
//             >
//               ← Back
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Step2;






// import React, { useEffect, useState } from 'react';
// import { fetchShippingOptions } from '../../api/apiShipping';
// import { getUser } from '../../api/auth';
// import { getUserCart } from '../../api/apiCart';
// import { createAddress } from '../../api/apiAddress';
// import { toast } from 'react-toastify';
// import { useShop } from '../../components/context/ShopContext';

// const Step2 = ({
//   nextStep,
//   prevStep,
//   setShippingFee,
//   productPrice,
//   currentShippingCost,
//   updateCheckoutData ,
// }) => {
//   const [shippingCost, setShippingCost] = useState(currentShippingCost || 0);
//   const [options, setOptions] = useState([]);
//   const [address, setAddress] = useState({
//     street_address: '',
//     city: '',
//     governorate: '',
//     phone_number: '',
//   });
//   const [createdAddressId, setCreatedAddressId] = useState(null);
//   const [user, setUser] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const { discount, getCartSubtotal, getDiscountedTotal } = useShop();


//   const handleContinue = () => {
//     if (!shippingCost) {
//       toast.error('Please select a shipping method');
//       return;
//     }
//     if (!createdAddressId) {
//       toast.error('Please create a shipping address');
//       return;
//     }
//     updateCheckoutData({
//       shippingCost,
//       addressId: createdAddressId
//     });
//     nextStep({ shippingCost, addressId: createdAddressId });
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userData = await getUser();
//         setUser(userData);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       getUserCart(user.id)
//         .then((cart) => {
//           setCartItems(cart.items || []);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error('Failed to load cart:', err);
//           setLoading(false);
//         });
//     }
//   }, [user]);

//   useEffect(() => {
//     fetchShippingOptions()
//       .then((data) => setOptions(data))
//       .catch((err) => console.error('Error loading shipping options:', err));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAddress((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCreateAddress = async () => {
//     if (!user || !address.street_address || !address.city || !address.governorate || !address.phone_number) {
//       toast.error('Please fill out all address fields');
//       return;
//     }

//     try {
//       const result = await createAddress({ ...address, user_id: user.id });
//       if (result && result.insertId != null) {
//         toast.success('Address added successfully');
//         setCreatedAddressId(result.insertId);
//       } else {
//         toast.error('Failed to create address');
//       }
//     } catch (error) {
//       console.error('Error creating address:', error);
//       toast.error('Error creating address');
//     }
//   };

//   const handleContinue = () => {
//     if (!shippingCost) {
//       toast.error('Please select a shipping method');
//       return;
//     }
//     setShippingFee(shippingCost);
//     nextStep();
//   };

//   const subtotal = getCartSubtotal();
//   const discounted = getDiscountedTotal();
//   const total = discounted + (Number(shippingCost) || 0);

//   return (
//     <div className="grid lg:grid-cols-3 gap-6">
//       {/* Form */}
//       <div className="lg:col-span-2 bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//           <input
//             name="fullName"
//             value={user ? user.name : ''}
//             readOnly
//             className="p-2 border rounded"
//             placeholder="Full Name"
//           />
//           <input
//             name="email"
//             value={user ? user.email : ''}
//             readOnly
//             className="p-2 border rounded"
//             placeholder="Email"
//           />
//         </div>

//         <input
//           name="street_address"
//           value={address.street_address}
//           onChange={handleInputChange}
//           className="w-full mb-4 p-2 border rounded"
//           placeholder="Street Address"
//         />

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//           <input
//             name="city"
//             value={address.city}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//             placeholder="City"
//           />
//           <input
//             name="governorate"
//             value={address.governorate}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//             placeholder="Governorate"
//           />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//           <input
//             name="phone_number"
//             value={address.phone_number}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//             placeholder="Phone Number"
//           />

//           <button
//             onClick={handleCreateAddress}
//             className="mt-4 sm:mt-0 w-full sm:w-auto text-white py-2 rounded sm:ml-4 col-span-2 sm:col-span-1"
//             style={{ backgroundColor: '#D63384' }}
//             onMouseOver={(e) => {
//               e.target.style.backgroundColor = '#B03074';
//             }}
//             onMouseOut={(e) => {
//               e.target.style.backgroundColor = '#D63384';
//             }}
//           >
//             Create Address
//           </button>
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Shipping Method</label>
//           <div className="space-y-2">
//             {options.map((method, index) => (
//               <div
//                 key={index}
//                 className={`flex justify-between items-center p-4 border rounded cursor-pointer ${
//                   shippingCost === Number(method.delivery_fee) ? 'border-black' : 'border-gray-300'
//                 }`}
//                 onClick={() => setShippingCost(Number(method.delivery_fee))}
//               >
//                 <div>
//                   <div>{method.method}</div>
//                   <div className="text-sm text-gray-500">{method.estimated_days} days</div>
//                 </div>
//                 <div>${Number(method.delivery_fee).toFixed(2)}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Summary */}
//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//         {loading ? (
//           <p>Loading cart...</p>
//         ) : cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <>
//             {cartItems.map((item) => (
//               <div key={item.product_id} className="flex justify-between border-b py-2">
//                 <div>{item.name} (x{item.quantity})</div>
//                 <div>${(Number(item.product_price) * item.quantity).toFixed(2)}</div>
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
//               <span>${(Number(shippingCost) || 0).toFixed(2)}</span>
//             </div>

//             <div className="flex justify-between font-semibold border-t mt-2 pt-2">
//               <span>Total:</span>
//               <span>${total.toFixed(2)}</span>
//             </div>

//             <button
//               onClick={handleContinue}
//               className="mt-4 w-full bg-black text-white py-2 rounded"
//             >
//               Continue to Payment
//             </button>
//             <button
//               onClick={prevStep}
//               className="mt-2 w-full bg-gray-200 py-2 rounded"
//             >
//               ← Back
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Step2;


// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { fetchShippingOptions } from '../../api/apiShipping';
// import { getUser } from '../../api/auth';
// import { getUserCart } from '../../api/apiCart';
// import { createAddress } from '../../api/apiAddress';
// import { toast } from 'react-toastify';
// import { useShop } from '../../components/context/ShopContext';

// const Step2 = ({
//   nextStep,
//   prevStep,
//   currentShippingCost,
//   updateCheckoutData,
// }) => {
//   const [shippingCost, setShippingCost] = useState(currentShippingCost || 0);
//   const [options, setOptions] = useState([]);
//   const [address, setAddress] = useState({
//     street_address: '',
//     city: '',
//     governorate: '',
//     phone_number: '',
//   });
//   const [createdAddressId, setCreatedAddressId] = useState(null);
//   const [user, setUser] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState({
//     user: true,
//     cart: true,
//     shipping: true
//   });
//   const [errors, setErrors] = useState({
//     address: null,
//     shipping: null
//   });

//   const { discount, getCartSubtotal, getDiscountedTotal } = useShop();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch user data
//         const userData = await getUser();
//         if (!userData) throw new Error('User not authenticated');
//         setUser(userData);

//         // Fetch shipping options
//         const shippingResponse = await fetchShippingOptions();
//         const shippingOptions = shippingResponse.success ? shippingResponse.data : [];
//         setOptions(shippingOptions);
//         if (shippingOptions.length > 0) {
//           setShippingCost(Number(shippingOptions[0].delivery_fee));
//         }

//         // Fetch cart data
//         const cartData = await getUserCart(userData.id);
//         setCartItems(cartData.items || []);

//         setLoading({ user: false, cart: false, shipping: false });
//       } catch (error) {
//         console.error('Error in Step2:', error);
//         toast.error(`Error loading data: ${error.message}`);
//         setLoading(prev => ({ ...prev, user: false, cart: false, shipping: false }));
//       }
//     };

//     fetchData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAddress(prev => ({ ...prev, [name]: value }));
//     if (errors.address) setErrors(prev => ({ ...prev, address: null }));
//   };

//   const validateAddress = () => {
//     const requiredFields = ['street_address', 'city', 'governorate', 'phone_number'];
//     const missingFields = requiredFields.filter(field => !address[field]);

//     if (missingFields.length > 0) {
//       setErrors(prev => ({ ...prev, address: 'Please fill all address fields' }));
//       return false;
//     }

//     if (!/^\+961\d{7,8}$/.test(address.phone_number)) {
//       setErrors(prev => ({ ...prev, address: 'Please enter a valid Lebanese phone number (+961XXXXXXXX)' }));
//       return false;
//     }

//     return true;
//   };

//   const handleCreateAddress = async () => {
    
//     if (!validateAddress()) return;

//     try {
//       const result = await createAddress({ 
//         ...address, 
//         user_id: user.id 
//       });
//       console.log("API Response:", result); // Debugging
      
//       if (result && result.address_id) {
//         setCreatedAddressId(result.address_id);
//         return result.address_id;
//       }
//       throw new Error(result?.error || 'Address creation failed');
//     } catch (error) {
//       console.error('Address creation error:', error);
//       toast.error(error.message || 'Failed to save address');
//       return null;
//     }
//   };

//   const handleContinue = () => {
//     if (!shippingCost || shippingCost <= 0) {
//       toast.error('Please select a shipping method');
//       return;
//     }
//     if (!createdAddressId) {
//       toast.error('Please save your address first');
//       return;
//     }

//     try {
//       updateCheckoutData({
//         shippingCost,
//         addressId: createdAddressId
//       });
//       nextStep({ shippingCost, addressId: createdAddressId });
//     } catch (error) {
//       console.error('Continue to payment failed:', {
//         error,
//         shippingCost,
//         addressId: createdAddressId
//       });
//       toast.error('Failed to proceed to payment. Please try again.');
//     }
//   };

//   const subtotal = getCartSubtotal();
//   const discounted = getDiscountedTotal();
//   const total = discounted + (Number(shippingCost) || 0);

//   if (loading.user || loading.cart) {
//     return (
//       <div className="text-center py-12">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
//         <p className="mt-4 text-gray-600">Loading checkout information...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid lg:grid-cols-3 gap-6">
//       {/* Shipping Form */}
//       <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
//         <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>

//         <div className="space-y-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//               <input
//                 name="fullName"
//                 value={user?.name || ''}
//                 readOnly
//                 className="w-full p-3 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//               <input
//                 name="email"
//                 value={user?.email || ''}
//                 readOnly
//                 className="w-full p-3 border border-gray-300 rounded-md"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
//             <input
//               name="street_address"
//               value={address.street_address}
//               onChange={handleInputChange}
//               className="w-full p-3 border border-gray-300 rounded-md"
//               placeholder="123 Main St"
//             />
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//               <input
//                 name="city"
//                 value={address.city}
//                 onChange={handleInputChange}
//                 className="w-full p-3 border border-gray-300 rounded-md"
//                 placeholder="Lebanon"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
//               <input
//                 name="governorate"
//                 value={address.governorate}
//                 onChange={handleInputChange}
//                 className="w-full p-3 border border-gray-300 rounded-md"
//                 placeholder="Lebanon"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//               <input
//                 name="phone_number"
//                 value={address.phone_number}
//                 onChange={handleInputChange}
//                 className="w-full p-3 border border-gray-300 rounded-md"
//                 placeholder="+96170123456"
//                 type="tel"
//               />
//               {errors.address && (
//                 <p className="mt-1 text-sm text-red-600">{errors.address}</p>
//               )}
//             </div>
//             <div className="flex items-end">
//               <button
//                 onClick={handleCreateAddress}
//                 className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-md transition-colors"
//               >
//                 Save Address
//               </button>
//             </div>
//           </div>

//           {!loading.shipping && (
//             <div className="mt-6">
//               <h3 className="text-lg font-medium mb-3">Shipping Method</h3>
//               <div className="space-y-3">
//                 {options.length > 0 ? (
//                   options.map((method) => (
//                     <div
//                       key={method.id || method.method}
//                       className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//                         shippingCost === Number(method.delivery_fee)
//                           ? 'border-pink-500 bg-pink-50'
//                           : 'border-gray-300 hover:border-gray-400'
//                       }`}
//                       onClick={() => setShippingCost(Number(method.delivery_fee))}
//                     >
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <p className="font-medium">{method.method}</p>
//                           <p className="text-sm text-gray-500">
//                             Estimated delivery: {method.estimated_days} business days
//                           </p>
//                         </div>
//                         <p className="font-semibold">
//                           ${Number(method.delivery_fee).toFixed(2)}
//                         </p>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-500">No shipping options available</p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Order Summary */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

//         {loading.cart ? (
//           <div className="flex justify-center py-4">
//             <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
//           </div>
//         ) : cartItems.length === 0 ? (
//           <p className="text-gray-500">Your cart is empty</p>
//         ) : (
//           <div className="space-y-4">
//             <div className="space-y-3">
//               {cartItems.map((item) => (
//                 <div key={`${item.product_id}-${item.quantity}`} className="flex justify-between">
//                   <div className="flex items-start space-x-3">
//                     <img
//                       src={item.product_image || '/placeholder.jpg'}
//                       alt={item.name}
//                       className="w-12 h-12 object-cover rounded"
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

//             <div className="border-t border-gray-200 pt-4 space-y-2">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Subtotal</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>

//               {discount > 0 && (
//                 <div className="flex justify-between text-green-600">
//                   <span>Discount</span>
//                   <span>-${(subtotal - discounted).toFixed(2)}</span>
//                 </div>
//               )}

//               <div className="flex justify-between">
//                 <span className="text-gray-600">Shipping</span>
//                 <span>${shippingCost.toFixed(2)}</span>
//               </div>

//               <div className="flex justify-between font-bold text-lg pt-2">
//                 <span>Total</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//             </div>

//             <div className="space-y-2 pt-4">
//               <button
//                 onClick={handleContinue}
//                 disabled={!createdAddressId || !shippingCost}
//                 className={`w-full py-3 px-4 rounded-md font-medium ${
//                   createdAddressId && shippingCost
//                     ? 'bg-black text-white hover:bg-gray-800'
//                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 }`}
//               >
//                 {!createdAddressId ? 'Complete address first' : 'Continue to Payment'}
//               </button>
//               <button
//                 onClick={prevStep}
//                 className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 rounded-md font-medium"
//               >
//                 Back to Cart
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// Step2.propTypes = {
//   nextStep: PropTypes.func.isRequired,
//   prevStep: PropTypes.func.isRequired,
//   currentShippingCost: PropTypes.number,
//   updateCheckoutData: PropTypes.func.isRequired,
// };

// export default Step2;


// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { fetchShippingOptions } from '../../api/apiShipping';
// import { getUser } from '../../api/auth';
// import { getUserCart } from '../../api/apiCart';
// import { checkoutCart } from '../../api/apiCheckout';
// import { toast } from 'react-toastify';
// import { useShop } from '../../components/context/ShopContext';

// const Step2 = ({ nextStep, prevStep, currentShippingCost, updateCheckoutData }) => {
//   const [shippingCost, setShippingCost] = useState(currentShippingCost || 0);
//   const [options, setOptions] = useState([]);
//   const [address, setAddress] = useState({
//     street_address: '',
//     city: '',
//     governorate: '',
//     phone_number: '',
//   });
//   const [user, setUser] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState({ user: true, cart: true, shipping: true });
//   const [isCheckingOut, setIsCheckingOut] = useState(false);
//   const [errors, setErrors] = useState({ address: null });

//   const { discount, getCartSubtotal, getDiscountedTotal } = useShop();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userData = await getUser();
//         if (!userData) throw new Error('User not authenticated');
//         setUser(userData);

//         const shippingResponse = await fetchShippingOptions();
//         const shippingOptions = shippingResponse.success ? shippingResponse.data : [];
//         setOptions(shippingOptions);
//         if (shippingOptions.length > 0) {
//           setShippingCost(Number(shippingOptions[0].delivery_fee));
//         }

//         const cartData = await getUserCart(userData.id);
//         setCartItems(cartData.items || []);

//         setLoading({ user: false, cart: false, shipping: false });
//       } catch (error) {
//         console.error('Error in Step2:', error);
//         toast.error(`Error loading data: ${error.message}`);
//         setLoading({ user: false, cart: false, shipping: false });
//       }
//     };

//     fetchData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAddress(prev => ({ ...prev, [name]: value }));
//     if (errors.address) setErrors(prev => ({ ...prev, address: null }));
//   };
//   // Pure check: used in render to avoid triggering re-renders
//   const isAddressComplete = () => {
//   const { street_address, city, governorate, phone_number } = address;
//   const hasAllFields = street_address && city && governorate && phone_number;
//   const phoneIsValid = /^\+961\d{7,8}$/.test(phone_number);
//   return hasAllFields && phoneIsValid;
// };

//   const validateAddress = () => {
//     const requiredFields = ['street_address', 'city', 'governorate', 'phone_number'];
//     const missingFields = requiredFields.filter(field => !address[field]);

//     if (missingFields.length > 0) {
//       setErrors(prev => ({ ...prev, address: 'Please fill all address fields' }));
//       return false;
//     }

//     if (!/^\+961\d{7,8}$/.test(address.phone_number)) {
//       setErrors(prev => ({ ...prev, address: 'Please enter a valid Lebanese phone number (+961XXXXXXXX)' }));
//       return false;
//     }

//     return true;
//   };

//   const handleContinue = async () => {
//     if (!shippingCost || shippingCost <= 0) {
//       toast.error('Please select a shipping method');
//       return;
//     }

//     if (!validateAddress()) return;

//     setIsCheckingOut(true);
//     try {
//       const response = await checkoutCart({
//         address,
//         payment_method: 'cash',
//         delivery_fee: shippingCost,
//         items: cartItems
//       });

//       if (response.error) throw new Error(response.message);

//       updateCheckoutData({
//         shippingCost,
//         orderId: response.data.order_id
//       });

//       nextStep({
//         shippingCost,
//         orderId: response.data.order_id
//       });
//     } catch (error) {
//       console.error('Checkout failed:', error);
//       toast.error(error.message || 'Checkout failed. Please try again.');
//     } finally {
//       setIsCheckingOut(false);
//     }
//   };

//   const subtotal = getCartSubtotal();
//   const discounted = getDiscountedTotal();
//   const total = discounted + (Number(shippingCost) || 0);

//   if (loading.user || loading.cart) {
//     return (
//       <div className="text-center py-12">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
//         <p className="mt-4 text-gray-600">Loading checkout information...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid lg:grid-cols-3 gap-6">
//       {/* Shipping Info */}
//       <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
//         <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>

//         <div className="space-y-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//               <input name="fullName" value={user?.name || ''} readOnly className="w-full p-3 border border-gray-300 rounded-md" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//               <input name="email" value={user?.email || ''} readOnly className="w-full p-3 border border-gray-300 rounded-md" />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
//             <input name="street_address" value={address.street_address} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md" />
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//               <input name="city" value={address.city} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Governorate</label>
//               <input name="governorate" value={address.governorate} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md" />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//             <input
//               name="phone_number"
//               value={address.phone_number}
//               onChange={handleInputChange}
//               className="w-full p-3 border border-gray-300 rounded-md"
//               placeholder="+96170123456"
//               type="tel"
//             />
//             {errors.address && (
//               <p className="mt-1 text-sm text-red-600">{errors.address}</p>
//             )}
//           </div>

//           {/* Shipping options */}
//           {!loading.shipping && (
//             <div className="mt-6">
//               <h3 className="text-lg font-medium mb-3">Shipping Method</h3>
//               <div className="space-y-3">
//                 {options.length > 0 ? (
//                   options.map((method) => (
//                     <div
//                       key={method.id || method.method}
//                       className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//                         shippingCost === Number(method.delivery_fee)
//                           ? 'border-pink-500 bg-pink-50'
//                           : 'border-gray-300 hover:border-gray-400'
//                       }`}
//                       onClick={() => setShippingCost(Number(method.delivery_fee))}
//                     >
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <p className="font-medium">{method.method}</p>
//                           <p className="text-sm text-gray-500">
//                             Estimated delivery: {method.estimated_days} business days
//                           </p>
//                         </div>
//                         <p className="font-semibold">
//                           ${Number(method.delivery_fee).toFixed(2)}
//                         </p>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-500">No shipping options available</p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Order Summary */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

//         {cartItems.length === 0 ? (
//           <p className="text-gray-500">Your cart is empty</p>
//         ) : (
//           <div className="space-y-4">
//             <div className="space-y-3">
//               {cartItems.map((item) => (
//                 <div key={`${item.product_id}-${item.quantity}`} className="flex justify-between">
//                   <div className="flex items-start space-x-3">
//                     <img
//                       src={item.product_image || '/placeholder.jpg'}
//                       alt={item.name}
//                       className="w-12 h-12 object-cover rounded"
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

//             <div className="border-t border-gray-200 pt-4 space-y-2">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Subtotal</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>
//               {discount > 0 && (
//                 <div className="flex justify-between text-green-600">
//                   <span>Discount</span>
//                   <span>-${(subtotal - discounted).toFixed(2)}</span>
//                 </div>
//               )}
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Shipping</span>
//                 <span>${shippingCost.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-bold text-lg pt-2">
//                 <span>Total</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//             </div>

//             <div className="space-y-2 pt-4">
//             <button
//               onClick={handleContinue}
//               disabled={!isAddressComplete() || !shippingCost || isCheckingOut}
//               className={`w-full py-3 px-4 rounded-md font-medium ${
//                 isAddressComplete() && shippingCost && !isCheckingOut
//                   ? 'bg-black text-white hover:bg-gray-800'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 }`}
//               >
//                 {isCheckingOut ? 'Processing...' : 'Continue to Payment'}
//               </button>
//               <button
//                 onClick={prevStep}
//                 className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 rounded-md font-medium"
//               >
//                 Back to Cart
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// Step2.propTypes = {
//   nextStep: PropTypes.func.isRequired,
//   prevStep: PropTypes.func.isRequired,
//   currentShippingCost: PropTypes.number,
//   updateCheckoutData: PropTypes.func.isRequired,
// };

// export default Step2;



// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useShop } from '../../components/context/ShopContext';
// import { getUserCart } from '../../api/apiCart';
// import { fetchShippingOptions } from '../../api/apiShipping';
// import { getUser } from '../../api/auth';

// const Step2 = ({ nextStep, prevStep, currentShippingCost, updateCheckoutData }) => {
//   const [shippingCost, setShippingCost] = useState(currentShippingCost || 0);
//   const [options, setOptions] = useState([]);
//   const [address, setAddress] = useState({
//     street_address: '',
//     city: '',
//     governorate: '',
//     phone_number: '',
//   });
//   const [user, setUser] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState({ user: true, cart: true, shipping: true });
//   const [isCheckingOut, setIsCheckingOut] = useState(false);
//   const [errors, setErrors] = useState({ address: null });

//   const { discount, getCartSubtotal, getDiscountedTotal } = useShop();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userData = await getUser();
//         if (!userData) throw new Error('User not authenticated');
//         setUser(userData);

//         const shippingResponse = await fetchShippingOptions();
//         const shippingOptions = shippingResponse.success ? shippingResponse.data : [];
//         setOptions(shippingOptions);
//         if (shippingOptions.length > 0) {
//           setShippingCost(Number(shippingOptions[0].delivery_fee));
//         }

//         const cartData = await getUserCart(userData.id);
//         setCartItems(cartData.items || []);

//         setLoading({ user: false, cart: false, shipping: false });
//       } catch (error) {
//         console.error('Error in Step2:', error);
//         toast.error(`Error loading data: ${error.message}`);
//         setLoading({ user: false, cart: false, shipping: false });
//       }
//     };

//     fetchData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAddress(prev => ({ ...prev, [name]: value }));
//     if (errors.address) setErrors(prev => ({ ...prev, address: null }));
//   };

//   const isAddressComplete = () => {
//     const { street_address, city, governorate, phone_number } = address;
//     const hasAllFields = street_address && city && governorate && phone_number;
//     const phoneIsValid = /^\+961\d{7,8}$/.test(phone_number);
//     return hasAllFields && phoneIsValid;
//   };

//   const validateAddress = () => {
//     const requiredFields = ['street_address', 'city', 'governorate', 'phone_number'];
//     const missingFields = requiredFields.filter(field => !address[field]);

//     if (missingFields.length > 0) {
//       setErrors(prev => ({ ...prev, address: 'Please fill all address fields' }));
//       return false;
//     }

//     if (!/^\+961\d{7,8}$/.test(address.phone_number)) {
//       setErrors(prev => ({ ...prev, address: 'Please enter a valid Lebanese phone number (+961XXXXXXXX)' }));
//       return false;
//     }

//     return true;
//   };

//   const handleContinue = async () => {
//     if (!shippingCost || shippingCost <= 0) {
//       toast.error('Please select a shipping method');
//       return;
//     }

//     if (!validateAddress()) return;

//     setIsCheckingOut(true);

//     try {
//       const response = await axios.post('https://backend-flower-shop.onrender.com/api/orders', {
//         user_id: user.id,
//         shipping_address_id: null, // or handle saving address beforehand and pass its ID
//         total_amount: getDiscountedTotal() + shippingCost,
//         payment_method: 'cash on delivery',
//         delivery_fee: shippingCost,
//         items: cartItems.map(item => ({
//           product_id: item.product_id,
//           quantity: item.quantity,
//           unit_price: item.unit_price,
//         })),
//       });

//       if (response.data.order_id) {
//         toast.success('Order placed successfully');
//         updateCheckoutData({ shippingCost, orderId: response.data.order_id });
//         nextStep({ shippingCost, orderId: response.data.order_id });
//       } else {
//         toast.error('Order placement failed');
//       }
//     } catch (error) {
//       console.error('Order creation failed:', error);
//       toast.error('An error occurred while placing your order');
//     } finally {
//       setIsCheckingOut(false);
//     }
//   };

//   const subtotal = getCartSubtotal();
//   const discountedTotal = getDiscountedTotal();
//   const discountAmount = subtotal - discountedTotal;
//   const total = discountedTotal + (Number(shippingCost) || 0);

//   if (loading.user || loading.cart) {
//     return (
//       <div className="text-center py-12">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
//         <p className="mt-4 text-gray-600">Loading checkout information...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid lg:grid-cols-3 gap-6">
//       {/* LEFT SIDE - Shipping Info */}
//       <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
//         <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
  
//         <div className="space-y-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//               <input
//                 name="fullName"
//                 value={user?.name || ''}
//                 readOnly
//                 className="w-full p-3 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//               <input
//                 name="email"
//                 value={user?.email || ''}
//                 readOnly
//                 className="w-full p-3 border border-gray-300 rounded-md"
//               />
//             </div>
//           </div>
  
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
//             <input
//               name="street_address"
//               value={address.street_address}
//               onChange={handleInputChange}
//               className="w-full p-3 border border-gray-300 rounded-md"
//             />
//           </div>
  
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//               <input
//                 name="city"
//                 value={address.city}
//                 onChange={handleInputChange}
//                 className="w-full p-3 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Governorate</label>
//               <input
//                 name="governorate"
//                 value={address.governorate}
//                 onChange={handleInputChange}
//                 className="w-full p-3 border border-gray-300 rounded-md"
//               />
//             </div>
//           </div>
  
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//             <input
//               name="phone_number"
//               value={address.phone_number}
//               onChange={handleInputChange}
//               className="w-full p-3 border border-gray-300 rounded-md"
//               placeholder="+96170123456"
//               type="tel"
//             />
//             {errors.address && (
//               <p className="mt-1 text-sm text-red-600">{errors.address}</p>
//             )}
//           </div>
  
//           {/* Shipping Options */}
//           {!loading.shipping && (
//             <div className="mt-6">
//               <h3 className="text-lg font-medium mb-3">Shipping Method</h3>
//               <div className="space-y-3">
//                 {options.length > 0 ? (
//                   options.map((method) => (
//                     <div
//                       key={method.id || method.method}
//                       className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//                         shippingCost === Number(method.delivery_fee)
//                           ? 'border-pink-500 bg-pink-50'
//                           : 'border-gray-300 hover:border-gray-400'
//                       }`}
//                       onClick={() => setShippingCost(Number(method.delivery_fee))}
//                     >
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <p className="font-medium">{method.method}</p>
//                           <p className="text-sm text-gray-500">
//                             Estimated delivery: {method.estimated_days} business days
//                           </p>
//                         </div>
//                         <p className="font-semibold">
//                           ${Number(method.delivery_fee).toFixed(2)}
//                         </p>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-500">No shipping options available</p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
  
//       {/* RIGHT SIDE - Order Summary */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
  
//         {cartItems.length === 0 ? (
//           <p className="text-gray-500">Your cart is empty</p>
//         ) : (
//           <div className="space-y-4">
//             {cartItems.map((item) => (
//               <div key={`${item.product_id}-${item.quantity}`} className="flex justify-between">
//                 <div className="flex items-start space-x-3">
//                   <img
//                     src={item.product_image || '/placeholder.jpg'}
//                     alt={item.name}
//                     className="w-12 h-12 object-cover rounded"
//                   />
//                   <div>
//                     <p className="font-medium">{item.name}</p>
//                     <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//                   </div>
//                 </div>
//                 <p className="font-semibold">
//                   ${(item.unit_price * item.quantity).toFixed(2)}
//                 </p>
//               </div>
//             ))}
  
//             <div className="flex justify-between">
//               <span className="font-medium">Subtotal</span>
//               <span className="font-medium">${subtotal.toFixed(2)}</span>
//             </div>
  
//             {discountAmount > 0 && (
//               <div className="flex justify-between text-green-600">
//                 <span className="font-medium">Discount</span>
//                 <span className="font-medium">-${discountAmount.toFixed(2)}</span>
//               </div>
//             )}
  
//             <div className="flex justify-between">
//               <span className="font-medium">Shipping</span>
//               <span className="font-medium">${shippingCost.toFixed(2)}</span>
//             </div>
  
//             <div className="flex justify-between border-t pt-4 mt-4 font-bold text-lg">
//               <span>Total</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
  
//             <button
//               onClick={handleContinue}
//               disabled={isCheckingOut}
//               className="w-full p-4 bg-pink-500 text-white rounded-md mt-6"
//             >
//               {isCheckingOut ? 'Processing...' : 'Place Order'}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
  
// };

// Step2.propTypes = {
//   nextStep: PropTypes.func.isRequired,
//   prevStep: PropTypes.func.isRequired,
//   currentShippingCost: PropTypes.number,
//   updateCheckoutData: PropTypes.func.isRequired,
// };

// export default Step2;




import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useShop } from '../../components/context/ShopContext';
import { getUserCart } from '../../api/apiCart';
import { fetchShippingOptions } from '../../api/apiShipping';
import { getUser } from '../../api/auth';
import { checkoutOrder } from '../../api/apiOrders';

// Card component
export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white shadow-lg rounded-2xl p-4 ${className}`}>
      {children}
    </div>
  );
}
Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// CardContent component
export function CardContent({ children, className = '' }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Button component
export function Button({ children, onClick, className = '', type = 'submit' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-brown-700 hover:bg-brown-800 text-white py-3 px-6 rounded-md transition-all ${className}`}
    >
      {children}
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

function Step2({ nextStep, prevStep, currentShippingCost, updateCheckoutData }) {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    street_address: '',
    city: '',
    governorate: '',
    phone_number: '',
  });

  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getCartSubtotal, getDiscountedTotal, clearCart } = useShop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();
        const shippingData = await fetchShippingOptions();
        const cartData = await getUserCart(userData?.id);

        setUser(userData);
        setForm((prev) => ({
          ...prev,
          fullName: userData?.name || '',
          email: userData?.email || '',
        }));

        setSelectedMethod(shippingData.data?.[0] || null);
        setCartItems(cartData.items || []);
      } catch (err) {
        toast.error('Error loading checkout data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { street_address, city, governorate, phone_number } = form;

    if (!street_address.trim() || !city.trim() || !governorate.trim() || !phone_number.trim()) {
      toast.error('Please fill all address fields.');
      return;
    }

    if (!/^\+961\d{7,8}$/.test(phone_number)) {
      toast.error('Invalid Lebanese phone number. Use +961XXXXXXXX format.');
      return;
    }

    const payload = {
      address: {
        
        city,
        governorate,
        phone_number,
        street_address:street_address.trim(),  
      },
    };
    console.log('Checkout Payload:', payload);
    

    try {
      const data = await checkoutOrder(payload);

      // ✅ Clear the cart from frontend context
      clearCart();

      if (data?.order_id) {
        toast.success('Order placed successfully');

        updateCheckoutData({
          shippingCost: selectedMethod.delivery_fee,
          orderId: data.order_id,
          totalAmount: data.total_amount,
        });

        nextStep({
          shippingCost: selectedMethod.delivery_fee,
          orderId: data.order_id,
          totalAmount: data.total_amount,
        });
      } else {
        toast.error('Order failed');
      }
    } catch (error) {
      const errMsg = error?.response?.data?.error || 'Checkout failed';
      toast.error(errMsg);
      console.error('Checkout error:', error);
    }
  };

  const subtotal = getCartSubtotal();
  const discountedTotal = getDiscountedTotal();
  const total = discountedTotal + (Number(selectedMethod?.delivery_fee) || 0);

  if (isLoading) {
    return <p className="text-center py-12">Loading checkout info...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
      {/* Shipping Info */}
      <Card className="lg:col-span-2 p-8">
        <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-3 rounded-md"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-3 rounded-md"
          />
          <input
            name="street_address"
            value={form.street_address}
            onChange={handleChange}
            placeholder="Street Address"
            className="border p-3 rounded-md sm:col-span-2"
          />
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="border p-3 rounded-md"
          />
          <input
            name="governorate"
            value={form.governorate}
            onChange={handleChange}
            placeholder="Governorate"
            className="border p-3 rounded-md"
          />
          <input
            name="phone_number"
            value={form.phone_number}
            onChange={handleChange}
            placeholder="+96170123456"
            className="border p-3 rounded-md sm:col-span-2"
          />

          {/* Payment Method */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked
                  disabled
                  className="accent-pink-600"
                />
                Cash on Delivery
              </label>
            </div>

        </div>
      </Card>

      {/* Order Summary */}
      <Card className="p-8">
        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.product_id} className="flex items-center gap-4 mb-4">
                <img
                  src={item.product_image || '/placeholder.jpg'}
                  alt={item.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                </div>
                <span className="ml-auto font-semibold">
                ${ (Number(item.unit_price || 0) * Number(item.quantity || 0)).toFixed(2) }
                </span>
              </div>
            ))}

            <hr className="my-4" />
            <div className="flex justify-between text-lg font-semibold">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Shipping</span>
              <span>${Number(selectedMethod?.delivery_fee || 0).toFixed(2)}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-xl font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="font-hina font-semibold px-6 py-2 rounded-full transition duration-300 w-full mt-6"
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
              Place Order
            </button>
          </>
        )}
      </Card>
    </div>
  );
}

Step2.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  currentShippingCost: PropTypes.number,
  updateCheckoutData: PropTypes.func.isRequired,
};

export default Step2;
