

// import axios from 'axios';
// import Cookies from 'js-cookie';

// axios.defaults.withCredentials = true;
// const API_BASE_URL = 'https://backend-flower-shop.onrender.com';




// export const checkoutCart = async (address) => {
//     try {
//       const token = Cookies.get('token'); // or however your auth works
  
//       const response = await axios.post(
//         `${API_BASE_URL}/api/checkout/checkouts`,
//         {
//           address, // 👈 we send full address object, backend will handle validation
//           payment_method: 'cash_on_delivery', // or dynamic later
//           delivery_fee: address.delivery_fee || 5, // fallback if not selected
          
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
  
//       return response.data;
//     } catch (error) {
//       console.error('❌ Checkout API error:', error.response?.data || error.message);
//       return {
//         error: true,
//         message: error.response?.data?.message || 'Checkout request failed'
//       };
//     }
//   };