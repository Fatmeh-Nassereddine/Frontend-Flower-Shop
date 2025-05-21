





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import PersonIcon from '@mui/icons-material/Person';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { getFavorites } from '../api/apiFavorite'; 
// import { getUserOrders,getOrderItemsByUser } from '../api/apiOrders';

// import SubscriptionsIcon from '@mui/icons-material/Subscriptions';


// const AccountProfile = () => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState({
//     fullName: '',
//     email: '',
//     address: {
//             street: '',
//             city: '',
//             governorate: '',
            
//         }
//   });
//   const [favorites, setFavorites] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [orderItems, setOrderItems] = useState([]);
//   const [subscriptions, setSubscriptions] = useState([]);

//   const getUser = async () => {
//     try {
//       const response = await axios.get('https://backend-flower-shop.onrender.com/api/auth/verify', {
//         withCredentials: true,
//       });
//       if (!response.data.success) {
//         console.error('User verification failed');
//       }
//     } catch (error) {
//       console.error('Failed to verify user:', error.message);
//     }
//   };
//    // Fetch user subscriptions
//    const fetchSubscriptions = async () => {
//     try {
//       const token = Cookies.get('token');
//       const response = await axios.get('/my-subscriptions', {
//         headers: { 
//           Authorization: `Bearer ${token}`
//         },
//         withCredentials: true,
//       });
//       setSubscriptions(response.data);
//     } catch (error) {
//       console.error('Failed to fetch subscriptions:', error);
//     }
//   };
//   const handleCancelSubscription = async (subscriptionId) => {
//     try {
//       const token = Cookies.get('token');
//       await axios.patch(`/cancel/${subscriptionId}`, {}, {
//         headers: { 
//           Authorization: `Bearer ${token}`
//         },
//         withCredentials: true,
//       });
//       await fetchSubscriptions();
//       alert('Subscription cancelled successfully!');
//     } catch (error) {
//       console.error('Failed to cancel subscription:', error);
//       alert(error.response?.data?.message || 'Failed to cancel subscription');
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await getUser();

//         const profileResponse = await axios.get('https://backend-flower-shop.onrender.com/api/users/me', {
//           withCredentials: true,
//         });

//         const { name, email, address } = profileResponse.data.user;
//         // Ensure the address is parsed if it's a JSON string
//         const parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;


//         setProfile({
//           fullName: name,
//           email,
//           address: {
//                         street: parsedAddress.street || '',
//                         city: parsedAddress.city || '',
//                         governorate: parsedAddress.governorate || ''
                       
//                     }
//         });

//         const favoritesData = await getFavorites();
//         setFavorites(favoritesData);

//         const ordersResult = await getUserOrders();
//         if (!ordersResult.error) {
//           console.log("Fetched Orders:", ordersResult.data); // Debug line
//           setOrders(ordersResult.data);
//         }

//         const orderItemsResult = await getOrderItemsByUser();
//         if (!orderItemsResult.error) {
//           console.log("Fetched Order Items:", orderItemsResult.data); // Debug line
//          // Extracting all items from each order
//          setOrderItems(orderItemsResult.data);
//           }
//       } catch (err) {
//         console.error('Failed to fetch data:', err);
//       }
//         // Fetch subscriptions
//         await fetchSubscriptions();
//       } catch (err) {
//         console.error('Failed to fetch data:', err);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//       // Check if the field is part of the address
//       if (name.startsWith("address.")) {
//         const addressField = name.split(".")[1];
//         setProfile((prev) => ({
//             ...prev,
//             address: {
//                 ...prev.address,
//                 [addressField]: value,
//             },
//         }));
//     } else {
//         setProfile((prev) => ({ ...prev, [name]: value }));
//     }
// };

//   const handleEditToggle = () => {
//     setIsEditing((prev) => !prev);
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(
//         'https://backend-flower-shop.onrender.com/api/users/update',
//         {
//           name: profile.fullName,
//           email: profile.email,
//           address: profile.address, // Convert to JSON
//         },
//         {
//           withCredentials: true 
//         }
//       );

//       setIsEditing(false);
//       console.log('Profile updated successfully.');
//     } catch (err) {
//       console.error('Failed to update profile:', err);
//       console.log('Response error:', err.response);
//     }
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'profile':
//         return (
//           <div className="bg-white shadow rounded-lg p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-medium text-[#593825]">Personal Information</h2>
//               {isEditing ? (
//                 <button
//                   onClick={handleSave}
//                   className="text-sm px-4 py-1 border rounded hover:bg-gray-100 text-[#593825]"
//                 >
//                   Save
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleEditToggle}
//                   className="text-sm px-4 py-1 border rounded hover:bg-gray-100 text-[#593825]"
//                 >
//                   Edit Profile
//                 </button>
//               )}
//             </div>
//             <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-800">
//               <div>
//                 <p className="font-semibold text-[#593825]">Full Name</p>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={profile.fullName}
//                     onChange={handleChange}
//                     className="w-full border rounded px-2 py-1"
//                   />
//                 ) : (
//                   <p>{profile.fullName}</p>
//                 )}
//               </div>
//               <div>
//                 <p className="font-semibold text-[#593825]">Email Address</p>
//                 {isEditing ? (
//                   <input
//                     type="email"
//                     name="email"
//                     value={profile.email}
//                     onChange={handleChange}
//                     className="w-full border rounded px-2 py-1"
//                   />
//                 ) : (
//                   <p>{profile.email}</p>
//                 )}
//               </div>
//               <div>
//                 <p className="font-semibold text-[#593825]">Address</p>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="address"
//                     value={profile.address.street}
//                     onChange={handleChange}
//                     className="w-full border rounded px-2 py-1"
//                   />
//                 ) : (
//                   <p>{profile.address.street}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//         case 'orders':
//   return (
//     <div className="bg-white shadow rounded-lg p-6 text-sm text-gray-800">
//       <h2 className="text-lg font-medium mb-4 text-[#593825]">My Orders</h2>

//       {orders.length > 0 ? (
//         <div className="mb-6">
//           <h3 className="text-md font-semibold text-[#593825] mb-2">Order List</h3>
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-left border">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="border px-4 py-2">Order ID</th>
//                   <th className="border px-4 py-2">Total Amount</th>
//                   <th className="border px-4 py-2">Status</th>
//                   <th className="border px-4 py-2">Payment Method</th>
//                   <th className="border px-4 py-2">Placed On</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((order) => (
//                   <tr key={order.order_id}>
//                     <td className="border px-4 py-2">{order.order_id}</td>
//                     <td className="border px-4 py-2">{order.total_amount}</td>
//                     <td className="border px-4 py-2 capitalize">{order.status}</td>
//                     <td className="border px-4 py-2">{order.payment_method}</td>
//                     <td className="border px-4 py-2">{order.order_date}
//                     {new Date(order.order_date || order.created_at).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         <p>No orders found.</p>
//       )}

//       {/* Order Items Table (unchanged) */}
//       {orderItems && orderItems.length > 0 ? (
//         <div>
//           <h3 className="text-md font-semibold text-[#593825] mb-2">Order Items</h3>
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-left border">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="border px-4 py-2">Product ID</th>
//                   <th className="border px-4 py-2">Quantity</th>
//                   <th className="border px-4 py-2">Price</th>
//                   <th className="border px-4 py-2">Subtotal</th>
                  
//                 </tr>
//               </thead>
//               <tbody>
//                 {orderItems.map((item) => (
//                   <tr key={item.order_item_id }>
//                   <td className="border px-4 py-2">{item.product_id}</td>
//                   <td className="border px-4 py-2">{item.quantity}</td>
//                   <td className="border px-4 py-2">${Number(item.unit_price || 0).toFixed(2)}</td>
//                   <td className="border px-4 py-2">
//                 ${(Number(item.subtotal) || (Number(item.quantity || 0) * Number(item.unit_price || 0))).toFixed(2)}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// ) : (
//   <p className="text-gray-500">No order items found.</p>
// )}
//     </div>
//   );

        
//         case 'favorites':
//             return (
//               <div className="bg-white shadow rounded-lg p-6 text-sm text-gray-800">
//                 <h2 className="text-lg font-medium mb-2 text-[#593825]">Favorites</h2>
//                 {favorites.length > 0 ? (
//                   <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                     {favorites.map((favorite) => (
//                       <li key={favorite.product_id} className="border p-3 rounded-lg flex items-center gap-4">
//                         <img
//                           src={favorite.image_url || "/images/default-product.jpg"}
//                           alt={favorite.name}
//                           className="w-16 h-16 object-cover rounded"
//                         />
//                         <div>
//                           <p className="font-semibold text-[#593825]">{favorite.name}</p>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>Your favorite items will appear here.</p>
//                 )}
//               </div>
//             );
//       default:
//         return null;
//     }
//   };

//   case 'subscriptions':
//         return (
//           <div className="bg-white shadow rounded-lg p-6 text-sm text-gray-800">
//             <h2 className="text-lg font-medium mb-4 text-[#593825]">My Subscriptions</h2>
//             {subscriptions.length > 0 ? (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full text-left border">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="border px-4 py-2">Subscription ID</th>
//                       <th className="border px-4 py-2">Start Date</th>
//                       <th className="border px-4 py-2">Frequency</th>
//                       <th className="border px-4 py-2">Status</th>
//                       <th className="border px-4 py-2">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {subscriptions.map((sub) => (
//                       <tr key={sub.subscription_id}>
//                         <td className="border px-4 py-2">{sub.subscription_id}</td>
//                         <td className="border px-4 py-2">
//                           {new Date(sub.start_date).toLocaleDateString()}
//                         </td>
//                         <td className="border px-4 py-2 capitalize">{sub.delivery_frequency}</td>
//                         <td className="border px-4 py-2 capitalize">{sub.status}</td>
//                         <td className="border px-4 py-2">
//                           {sub.status === 'active' && (
//                             <button
//                               onClick={() => {
//                                 if (window.confirm('Are you sure you want to cancel this subscription?')) {
//                                   handleCancelSubscription(sub.subscription_id);
//                                 }
//                               }}
//                               className="text-red-600 hover:text-red-800 text-sm font-medium"
//                             >
//                               Cancel
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <p>No subscriptions found.</p>
//             )}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="max-w-5xl mx-auto px-4 py-8">
//         <h1 className="text-2xl font-semibold mb-4 text-[#593825]">My Account</h1>

//         <div className="flex flex-wrap gap-2 mb-6 text-sm font-medium">
//           <button
//             onClick={() => setActiveTab('profile')}
//             className={`flex items-center gap-1 border px-4 py-2 rounded-full text-[#593825] ${
//               activeTab === 'profile' ? 'bg-gray-200' : 'hover:bg-[#D63384]'
//             }`}
//           >
//             <PersonIcon fontSize="small" /> Profile
//           </button>
//           <button
//             onClick={() => setActiveTab('orders')}
//             className={`flex items-center gap-1 border px-4 py-2 rounded-full text-[#593825] ${
//               activeTab === 'orders' ? 'bg-gray-200' : 'hover:bg-[#D63384]'
//             }`}
//           >
//             <ReceiptLongIcon fontSize="small" /> My Orders
//           </button>
//           <button
//             onClick={() => setActiveTab('favorites')}
//             className={`flex items-center gap-1 border px-4 py-2 rounded-full text-[#593825] ${
//               activeTab === 'favorites' ? 'bg-gray-200' : 'hover:bg-[#D63384]'
//             }`}
//           >
//             <FavoriteBorderIcon fontSize="small" /> Favorites
//           </button>
//           <button
//             onClick={() => setActiveTab('subscriptions')}
//             className={`flex items-center gap-1 border px-4 py-2 rounded-full text-[#593825] ${
//               activeTab === 'subscriptions' ? 'bg-gray-200' : 'hover:bg-[#D63384]'
//             }`}
//           >
//             <SubscriptionsIcon fontSize="small" /> Subscriptions
//           </button>
//         </div>

//         {renderContent()}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default AccountProfile;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import PersonIcon from '@mui/icons-material/Person';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { getFavorites } from '../api/apiFavorite';
// import { getUserOrders, getOrderItemsByUser } from '../api/apiOrders';

// const AccountProfile = () => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState({
//     fullName: '',
//     email: '',
//     address: {
//       street: '',
//       city: '',
//       governorate: '',
//     },
//   });

//   const [favorites, setFavorites] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [orderItems, setOrderItems] = useState([]);
//   const [subscriptions, setSubscriptions] = useState([]);

//   const getUser = async () => {
//     try {
//       const response = await axios.get('https://backend-flower-shop.onrender.com/api/auth/verify', {
//         withCredentials: true,
//       });
//       if (!response.data.success) {
//         console.error('User verification failed');
//       }
//     } catch (error) {
//       console.error('Failed to verify user:', error.message);
//     }
//   };

//   const fetchSubscriptions = async () => {
//     try {
//       const token = Cookies.get('token');
//       const response = await axios.get('/my-subscriptions', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });
//       setSubscriptions(response.data);
//     } catch (error) {
//       console.error('Failed to fetch subscriptions:', error);
//     }
//   };

//   const handleCancelSubscription = async (subscriptionId) => {
//     try {
//       const token = Cookies.get('token');
//       await axios.patch(`/cancel/${subscriptionId}`, {}, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });
//       await fetchSubscriptions();
//       alert('Subscription cancelled successfully!');
//     } catch (error) {
//       console.error('Failed to cancel subscription:', error);
//       alert(error.response?.data?.message || 'Failed to cancel subscription');
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await getUser();

//         const profileResponse = await axios.get('https://backend-flower-shop.onrender.com/api/users/me', {
//           withCredentials: true,
//         });

//         const { name, email, address } = profileResponse.data.user;
//         const parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;

//         setProfile({
//           fullName: name,
//           email,
//           address: {
//             street: parsedAddress.street || '',
//             city: parsedAddress.city || '',
//             governorate: parsedAddress.governorate || '',
//           },
//         });

//         const favoritesData = await getFavorites();
//         setFavorites(favoritesData);

//         const ordersResult = await getUserOrders();
//         if (!ordersResult.error) {
//           setOrders(ordersResult.data);
//         }

//         const orderItemsResult = await getOrderItemsByUser();
//         if (!orderItemsResult.error) {
//           setOrderItems(orderItemsResult.data);
//         }

//         await fetchSubscriptions();
//       } catch (err) {
//         console.error('Failed to fetch data:', err);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith('address.')) {
//       const addressField = name.split('.')[1];
//       setProfile((prev) => ({
//         ...prev,
//         address: {
//           ...prev.address,
//           [addressField]: value,
//         },
//       }));
//     } else {
//       setProfile((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleEditToggle = () => {
//     setIsEditing((prev) => !prev);
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(
//         'https://backend-flower-shop.onrender.com/api/users/update',
//         {
//           name: profile.fullName,
//           email: profile.email,
//           address: profile.address,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       setIsEditing(false);
//       console.log('Profile updated successfully.');
//     } catch (err) {
//       console.error('Failed to update profile:', err);
//     }
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'profile':
//         return (
//           <div className="bg-white shadow rounded-lg p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-medium text-[#593825]">Personal Information</h2>
//               <button
//                 onClick={isEditing ? handleSave : handleEditToggle}
//                 className="text-sm px-4 py-1 border rounded hover:bg-gray-100 text-[#593825]"
//               >
//                 {isEditing ? 'Save' : 'Edit Profile'}
//               </button>
//             </div>
//             <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-800">
//               <div>
//                 <p className="font-semibold text-[#593825]">Full Name</p>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={profile.fullName}
//                     onChange={handleChange}
//                     className="w-full border rounded px-2 py-1"
//                   />
//                 ) : (
//                   <p>{profile.fullName}</p>
//                 )}
//               </div>
//               <div>
//                 <p className="font-semibold text-[#593825]">Email Address</p>
//                 {isEditing ? (
//                   <input
//                     type="email"
//                     name="email"
//                     value={profile.email}
//                     onChange={handleChange}
//                     className="w-full border rounded px-2 py-1"
//                   />
//                 ) : (
//                   <p>{profile.email}</p>
//                 )}
//               </div>
//               <div>
//                 <p className="font-semibold text-[#593825]">Street</p>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="address.street"
//                     value={profile.address.street}
//                     onChange={handleChange}
//                     className="w-full border rounded px-2 py-1"
//                   />
//                 ) : (
//                   <p>{profile.address.street}</p>
//                 )}
//               </div>
//               <div>
//                 <p className="font-semibold text-[#593825]">City</p>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="address.city"
//                     value={profile.address.city}
//                     onChange={handleChange}
//                     className="w-full border rounded px-2 py-1"
//                   />
//                 ) : (
//                   <p>{profile.address.city}</p>
//                 )}
//               </div>
//               <div>
//                 <p className="font-semibold text-[#593825]">Governorate</p>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="address.governorate"
//                     value={profile.address.governorate}
//                     onChange={handleChange}
//                     className="w-full border rounded px-2 py-1"
//                   />
//                 ) : (
//                   <p>{profile.address.governorate}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );

//         case 'orders':
//           return (
//             <div className="bg-white shadow rounded-lg p-6 text-sm text-gray-800">
//               <h2 className="text-lg font-medium mb-4 text-[#593825]">My Orders</h2>
        
//               {orders.length > 0 ? (
//                 <div className="mb-6">
//                   <h3 className="text-md font-semibold text-[#593825] mb-2">Order List</h3>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full text-left border">
//                       <thead className="bg-gray-100">
//                         <tr>
//                           <th className="border px-4 py-2">Order ID</th>
//                           <th className="border px-4 py-2">Total Amount</th>
//                           <th className="border px-4 py-2">Status</th>
//                           <th className="border px-4 py-2">Payment Method</th>
//                           <th className="border px-4 py-2">Placed On</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {orders.map((order) => (
//                           <tr key={order.order_id}>
//                             <td className="border px-4 py-2">{order.order_id}</td>
//                             <td className="border px-4 py-2">{order.total_amount}</td>
//                             <td className="border px-4 py-2 capitalize">{order.status}</td>
//                             <td className="border px-4 py-2">{order.payment_method}</td>
//                             <td className="border px-4 py-2">{order.order_date}
//                             {new Date(order.order_date || order.created_at).toLocaleDateString()}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               ) : (
//                 <p>No orders found.</p>
//               )}
        
//               {/* Order Items Table (unchanged) */}
//               {orderItems && orderItems.length > 0 ? (
//                 <div>
//                   <h3 className="text-md font-semibold text-[#593825] mb-2">Order Items</h3>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full text-left border">
//                       <thead className="bg-gray-100">
//                         <tr>
//                           <th className="border px-4 py-2">Product ID</th>
//                           <th className="border px-4 py-2">Quantity</th>
//                           <th className="border px-4 py-2">Price</th>
//                           <th className="border px-4 py-2">Subtotal</th>
                          
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {orderItems.map((item) => (
//                           <tr key={item.order_item_id }>
//                           <td className="border px-4 py-2">{item.product_id}</td>
//                           <td className="border px-4 py-2">{item.quantity}</td>
//                           <td className="border px-4 py-2">${Number(item.unit_price || 0).toFixed(2)}</td>
//                           <td className="border px-4 py-2">
//                         ${(Number(item.subtotal) || (Number(item.quantity || 0) * Number(item.unit_price || 0))).toFixed(2)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-500">No order items found.</p>
//         )}
//             </div>
//           );
        
                
//                 case 'favorites':
//                     return (
//                       <div className="bg-white shadow rounded-lg p-6 text-sm text-gray-800">
//                         <h2 className="text-lg font-medium mb-2 text-[#593825]">Favorites</h2>
//                         {favorites.length > 0 ? (
//                           <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                             {favorites.map((favorite) => (
//                               <li key={favorite.product_id} className="border p-3 rounded-lg flex items-center gap-4">
//                                 <img
//                                   src={favorite.image_url || "/images/default-product.jpg"}
//                                   alt={favorite.name}
//                                   className="w-16 h-16 object-cover rounded"
//                                 />
//                                 <div>
//                                   <p className="font-semibold text-[#593825]">{favorite.name}</p>
//                                 </div>
//                               </li>
//                             ))}
//                           </ul>
//                         ) : (
//                           <p>Your favorite items will appear here.</p>
//                         )}
//                       </div>
//                     );
//               default:
//                 return null;
//             }
//           };

//       case 'subscriptions':
//         return (
//           <div className="bg-white shadow rounded-lg p-6 text-sm text-gray-800">
//             <h2 className="text-lg font-medium mb-4 text-[#593825]">My Subscriptions</h2>
//             {subscriptions.length > 0 ? (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full text-left border">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="border px-4 py-2">Subscription ID</th>
//                       <th className="border px-4 py-2">Start Date</th>
//                       <th className="border px-4 py-2">Frequency</th>
//                       <th className="border px-4 py-2">Status</th>
//                       <th className="border px-4 py-2">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {subscriptions.map((sub) => (
//                       <tr key={sub.subscription_id}>
//                         <td className="border px-4 py-2">{sub.subscription_id}</td>
//                         <td className="border px-4 py-2">
//                           {new Date(sub.start_date).toLocaleDateString()}
//                         </td>
//                         <td className="border px-4 py-2 capitalize">{sub.delivery_frequency}</td>
//                         <td className="border px-4 py-2 capitalize">{sub.status}</td>
//                         <td className="border px-4 py-2">
//                           {sub.status === 'active' && (
//                             <button
//                               onClick={() => {
//                                 if (window.confirm('Are you sure you want to cancel this subscription?')) {
//                                   handleCancelSubscription(sub.subscription_id);
//                                 }
//                               }}
//                               className="text-red-600 hover:text-red-800 text-sm font-medium"
//                             >
//                               Cancel
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <p>No subscriptions found.</p>
//             )}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="max-w-5xl mx-auto px-4 py-8">
//         <h1 className="text-2xl font-semibold mb-4 text-[#593825]">My Account</h1>

//         <div className="flex flex-wrap gap-2 mb-6 text-sm font-medium">
//           <button
//             onClick={() => setActiveTab('profile')}
//             className={`flex items-center gap-1 border px-4 py-2 rounded-full text-[#593825] ${
//               activeTab === 'profile' ? 'bg-gray-200' : 'hover:bg-[#D63384]'
//             }`}
//           >
//             <PersonIcon fontSize="small" /> Profile
//           </button>
//           <button
//             onClick={() => setActiveTab('orders')}
//             className={`flex items-center gap-1 border px-4 py-2 rounded-full text-[#593825] ${
//               activeTab === 'orders' ? 'bg-gray-200' : 'hover:bg-[#D63384]'
//             }`}
//           >
//             <ReceiptLongIcon fontSize="small" /> My Orders
//           </button>
//           <button
//             onClick={() => setActiveTab('favorites')}
//             className={`flex items-center gap-1 border px-4 py-2 rounded-full text-[#593825] ${
//               activeTab === 'favorites' ? 'bg-gray-200' : 'hover:bg-[#D63384]'
//             }`}
//           >
//             <FavoriteBorderIcon fontSize="small" /> Favorites
//           </button>
//           <button
//             onClick={() => setActiveTab('subscriptions')}
//             className={`flex items-center gap-1 border px-4 py-2 rounded-full text-[#593825] ${
//               activeTab === 'subscriptions' ? 'bg-gray-200' : 'hover:bg-[#D63384]'
//             }`}
//           >
//             <SubscriptionsIcon fontSize="small" /> Subscriptions
//           </button>
//         </div>

//         {renderContent()}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default AccountProfile;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import CancelIcon from '@mui/icons-material/Cancel';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { getFavorites } from '../api/apiFavorite';
import { getUserOrders, getOrderItemsByUser } from '../api/apiOrders';

const AccountProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    address: {
      street: '',
      city: '',
      governorate: '',
    },
  });

  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  const getUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/auth/verify`, {
        withCredentials: true,
      });
      if (!response.data.success) {
        console.error('User verification failed');
      }
    } catch (error) {
      console.error('Failed to verify user:', error.message);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/subscriptions/my-subscriptions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error);
    }
  };

  const handleCancelSubscription = async (subscriptionId) => {
    try {
      const token = Cookies.get('token');
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/subscriptions/cancel/${subscriptionId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      await fetchSubscriptions();
      alert('Subscription cancelled successfully!');
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      alert(error.response?.data?.message || 'Failed to cancel subscription');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUser();

        const profileResponse = await axios.get('https://backend-flower-shop.onrender.com/api/users/me', {
          withCredentials: true,
        });

        const { name, email, address } = profileResponse.data.user;
        const parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;

        setProfile({
          fullName: name,
          email,
          address: {
            street: parsedAddress.street || '',
            city: parsedAddress.city || '',
            governorate: parsedAddress.governorate || '',
          },
        });

        const favoritesData = await getFavorites();
        setFavorites(favoritesData);

        const ordersResult = await getUserOrders();
        if (!ordersResult.error) {
          setOrders(ordersResult.data);
        }

        const orderItemsResult = await getOrderItemsByUser();
        if (!orderItemsResult.error) {
          setOrderItems(orderItemsResult.data);
        }

        await fetchSubscriptions();
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setProfile((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditToggle = () => setIsEditing((prev) => !prev);

  const handleSave = async () => {
    try {
      await axios.put(
        'https://backend-flower-shop.onrender.com/api/users/update',
        {
          name: profile.fullName,
          email: profile.email,
          address: profile.address,
        },
        {
          withCredentials: true,
        }
      );
      setIsEditing(false);
      console.log('Profile updated successfully.');
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-[#593825]">Personal Information</h2>
              <button
                onClick={isEditing ? handleSave : handleEditToggle}
                className="text-sm px-4 py-1 border rounded hover:bg-gray-100 text-[#593825]"
              >
                {isEditing ? 'Save' : 'Edit Profile'}
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-800">
              {['fullName', 'email'].map((field) => (
                <div key={field}>
                  <p className="font-semibold text-[#593825]">{field === 'fullName' ? 'Full Name' : 'Email Address'}</p>
                  {isEditing ? (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      value={profile[field]}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1"
                    />
                  ) : (
                    <p>{profile[field]}</p>
                  )}
                </div>
              ))}
              {['street', 'city', 'governorate'].map((field) => (
                <div key={field}>
                  <p className="font-semibold text-[#593825]">{field.charAt(0).toUpperCase() + field.slice(1)}</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name={`address.${field}`}
                      value={profile.address[field]}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1"
                    />
                  ) : (
                    <p>{profile.address[field]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="bg-white shadow rounded-lg p-6 text-sm text-gray-800">
            <h2 className="text-lg font-medium mb-4 text-[#593825]">My Orders</h2>
            {orders.length > 0 ? (
              <div className="mb-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-4 py-2">Order ID</th>
                        <th className="border px-4 py-2">Total Amount</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Payment Method</th>
                        <th className="border px-4 py-2">Placed On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.order_id}>
                          <td className="border px-4 py-2">{order.order_id}</td>
                          <td className="border px-4 py-2">{order.total_amount}</td>
                          <td className="border px-4 py-2 capitalize">{order.status}</td>
                          <td className="border px-4 py-2">{order.payment_method}</td>
                          <td className="border px-4 py-2">{new Date(order.order_date || order.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p>No orders found.</p>
            )}
            {orderItems.length > 0 && (
              <div>
                <h3 className="text-md font-semibold text-[#593825] mb-2">Order Items</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-4 py-2">Product ID</th>
                        <th className="border px-4 py-2">Quantity</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems.map((item) => (
                        <tr key={item.order_item_id}>
                          <td className="border px-4 py-2">{item.product_id}</td>
                          <td className="border px-4 py-2">{item.quantity}</td>
                          <td className="border px-4 py-2">${Number(item.unit_price).toFixed(2)}</td>
                          <td className="border px-4 py-2">
                          ${(Number(item.subtotal) || (Number(item.quantity || 0) * Number(item.unit_price || 0))).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );

      case 'favorites':
        return (
          <div className="bg-white shadow rounded-lg p-6 text-sm text-gray-800">
            <h2 className="text-lg font-medium mb-2 text-[#593825]">Favorites</h2>
            {favorites.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {favorites.map((fav) => (
                  <li key={fav.product_id} className="border p-3 rounded-lg flex items-center gap-4">
                    <img src={fav.image_url || '/images/default-product.jpg'} alt={fav.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <p className="font-semibold text-[#593825]">{fav.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Your favorite items will appear here.</p>
            )}
          </div>
        );

      case 'subscriptions':
        return (
          <div className="bg-white shadow rounded-lg p-6 text-sm text-gray-800">
            <h2 className="text-lg font-medium mb-4 text-[#593825]">My Subscriptions</h2>
            {subscriptions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-4 py-2">Subscription ID</th>
                      <th className="border px-4 py-2">Start Date</th>
                      <th className="border px-4 py-2">Frequency</th>
                      <th className="border px-4 py-2">Status</th>
                      <th className="border px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((sub) => (
                      <tr key={sub.subscription_id}>
                        <td className="border px-4 py-2">{sub.subscription_id}</td>
                        <td className="border px-4 py-2">{new Date(sub.start_date).toLocaleDateString()}</td>
                        <td className="border px-4 py-2 capitalize">{sub.delivery_frequency}</td>
                        <td className="border px-4 py-2 capitalize">{sub.status}</td>
                        <td className="border px-4 py-2">
                          {sub.status === 'active' && (
                            <button
                              onClick={() =>
                                window.confirm('Are you sure you want to cancel this subscription?') &&
                                handleCancelSubscription(sub.subscription_id)
                              }
                              className= "text-pink-600 hover:text-pink-800 hover:bg-red-100 p-1 rounded-full"
                              title="Cancel Subscription"
                            >
                              <CancelIcon fontSize="small" />
                            </button>

                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No subscriptions found.</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4 text-[#593825]">My Account</h1>
        <div className="flex flex-wrap gap-2 mb-6 text-sm font-medium">
          {[
            { key: 'profile', label: 'Profile', icon: <PersonIcon fontSize="small" /> },
            { key: 'orders', label: 'My Orders', icon: <ReceiptLongIcon fontSize="small" /> },
            { key: 'favorites', label: 'Favorites', icon: <FavoriteBorderIcon fontSize="small" /> },
            { key: 'subscriptions', label: 'Subscriptions', icon: <SubscriptionsIcon fontSize="small" /> },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1 border px-4 py-2 rounded-full text-[#593825] ${
                activeTab === key ? 'bg-gray-200' : 'hover:bg-[#D63384]'
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>
        {renderContent()}
      </div>
      <Footer />
    </>
  );
};

export default AccountProfile;





















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import PersonIcon from '@mui/icons-material/Person';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { getFavorites } from '../api/apiFavorite'; 
// import { getUserOrders, getOrderItemsByUser } from '../api/apiOrders';

// const AccountProfile = () => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState({
//     fullName: '',
//     email: '',
//     address: {
//       street: '',
//       city: '',
//       governorate: '',
//     }
//   });
//   const [favorites, setFavorites] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [orderItems, setOrderItems] = useState([]);

//   const getUser = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/verify`, {
//         withCredentials: true,
//       });
//       if (!response.data.success) {
//         console.error('User verification failed');
//       }
//     } catch (error) {
//       console.error('Failed to verify user:', error.message);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await getUser();

//         const profileResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/me`, {
//           withCredentials: true,
//         });

//         const { name, email, address } = profileResponse.data.user;
//         const parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;

//         setProfile({
//           fullName: name,
//           email,
//           address: {
//             street: parsedAddress?.street || '',
//             city: parsedAddress?.city || '',
//             governorate: parsedAddress?.governorate || ''
//           }
//         });

//         const favoritesData = await getFavorites();
//         setFavorites(favoritesData);

//         const ordersResult = await getUserOrders();
//         if (!ordersResult.error) {
//           setOrders(ordersResult.data);
//         }

//         const orderItemsResult = await getOrderItemsByUser();
//         if (!orderItemsResult.error) {
//           setOrderItems(orderItemsResult.data);

//         }
//       } catch (err) {
//         console.error('Failed to fetch data:', err);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith("address.")) {
//       const addressField = name.split(".")[1];
//       setProfile((prev) => ({
//         ...prev,
//         address: {
//           ...prev.address,
//           [addressField]: value,
//         },
//       }));
//     } else {
//       setProfile((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleEditToggle = () => setIsEditing(prev => !prev);

//   const handleSave = async () => {
//     try {
//       await axios.put(
//         `${process.env.REACT_APP_API_URL}/api/users/update`,
//         {
//           name: profile.fullName,
//           email: profile.email,
//           address: profile.address,
//         },
//         {
//           withCredentials: true 
//         }
//       );

//       setIsEditing(false);
//       console.log('Profile updated successfully.');
//     } catch (err) {
//       console.error('Failed to update profile:', err.response || err);
//     }
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'profile':
//         return (
//           <div className="bg-white shadow rounded-lg p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-medium text-[#593825]">Personal Information</h2>
//               <button
//                 onClick={isEditing ? handleSave : handleEditToggle}
//                 className="text-sm px-4 py-1 border rounded hover:bg-gray-100 text-[#593825]"
//               >
//                 {isEditing ? 'Save' : 'Edit Profile'}
//               </button>
//             </div>
//             <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-800">
//               <div>
//                 <p className="font-semibold text-[#593825]">Full Name</p>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={profile.fullName}
//                     onChange={handleChange}
//                     className="w-full border rounded px-2 py-1"
//                   />
//                 ) : (
//                   <p>{profile.fullName}</p>
//                 )}
//               </div>
//               <div>
//                 <p className="font-semibold text-[#593825]">Email Address</p>
//                 {isEditing ? (
//                   <input
//                     type="email"
//                     name="email"
//                     value={profile.email}
//                     onChange={handleChange}
//                     className="w-full border rounded px-2 py-1"
//                   />
//                 ) : (
//                   <p>{profile.email}</p>
//                 )}
//               </div>
//               {['street', 'city', 'governorate'].map((field) => (
//                 <div key={field}>
//                   <p className="font-semibold text-[#593825] capitalize">{field}</p>
//                   {isEditing ? (
//                     <input
//                       type="text"
//                       name={`address.${field}`}
//                       value={profile.address[field]}
//                       onChange={handleChange}
//                       className="w-full border rounded px-2 py-1"
//                     />
//                   ) : (
//                     <p>{profile.address[field]}</p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 'orders':
//         return (
//           <div className="bg-white shadow rounded-lg p-6 text-sm text-gray-800">
//             <h2 className="text-lg font-medium mb-4 text-[#593825]">My Orders</h2>
//             {orders.length > 0 ? (
//               <div className="mb-6">
//                 <h3 className="text-md font-semibold text-[#593825] mb-2">Order List</h3>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full text-left border">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="border px-4 py-2">Order ID</th>
//                         <th className="border px-4 py-2">Total Amount</th>
//                         <th className="border px-4 py-2">Status</th>
//                         <th className="border px-4 py-2">Payment Method</th>
//                         <th className="border px-4 py-2">Placed On</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {orders.map((order) => (
//                         <tr key={order.order_id}>
//                           <td className="border px-4 py-2">{order.order_id}</td>
//                           <td className="border px-4 py-2">{order.total_amount}</td>
//                           <td className="border px-4 py-2 capitalize">{order.status}</td>
//                           <td className="border px-4 py-2">{order.payment_method}</td>
//                           <td className="border px-4 py-2">
//                             {new Date(order.order_date || order.created_at).toLocaleDateString()}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             ) : (
//               <p>No orders found.</p>
//             )}

//             {orderItems.length > 0 ? (
//               <div>
//                 <h3 className="text-md font-semibold text-[#593825] mb-2">Order Items</h3>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full text-left border">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="border px-4 py-2">Product ID</th>
//                         <th className="border px-4 py-2">Quantity</th>
//                         <th className="border px-4 py-2">Price</th>
//                         <th className="border px-4 py-2">Subtotal</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {orderItems.map((item) => (
//                         <tr key={item.order_item_id}>
//                           <td className="border px-4 py-2">{item.product_id}</td>
//                           <td className="border px-4 py-2">{item.quantity}</td>
//                           <td className="border px-4 py-2">${Number(item.unit_price || 0).toFixed(2)}</td>
//                           <td className="border px-4 py-2">
//                             ${(Number(item.subtotal) || (item.quantity * item.unit_price)).toFixed(2)}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-gray-500">No order items found.</p>
//             )}
//           </div>
//         );

//       case 'favorites':
//         return (
//           <div className="bg-white shadow rounded-lg p-6 text-sm text-gray-800">
//             <h2 className="text-lg font-medium mb-2 text-[#593825]">Favorites</h2>
//             {favorites.length > 0 ? (
//               <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                 {favorites.map((favorite) => (
//                   <li key={favorite.product_id} className="border rounded p-4 shadow-sm">
//                     <p><strong>ID:</strong> {favorite.product_id}</p>
//                     <p><strong>Name:</strong> {favorite.product_name}</p>
//                     {/* You can add more product info here */}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No favorites found.</p>
//             )}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div className="max-w-6xl mx-auto py-10 px-4">
//         <div className="flex space-x-4 mb-6 text-[#593825]">
//           <button onClick={() => setActiveTab('profile')} className="flex items-center gap-2">
//             <PersonIcon /> Profile
//           </button>
//           <button onClick={() => setActiveTab('favorites')} className="flex items-center gap-2">
//             <FavoriteBorderIcon /> Favorites
//           </button>
//           <button onClick={() => setActiveTab('orders')} className="flex items-center gap-2">
//             <ReceiptLongIcon /> Orders
//           </button>
//         </div>
//         {renderContent()}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AccountProfile;








