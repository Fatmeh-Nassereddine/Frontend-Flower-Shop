// import React from 'react';

// export default function Newsletter() {
//   return (
//     <section className="py-12 px-6 md:px-20 text-center bg-white">
//       <h2 className="text-xl font-semibold mb-4">Stay in Bloom</h2>
//       <p className="text-gray-600 mb-6">Subscribe to our newsletter for fresh floral inspiration and exclusive deals.</p>
//       <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
//         <input
//           type="email"
//           placeholder="Enter your email"
//           className="w-full px-4 py-2 border rounded-full focus:outline-none"
//         />
//         <button className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700">
//           Subscribe
//         </button>
//       </form>
//     </section>
//   );
// }



import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';

export default function Newsletter() {
  const [startDate, setStartDate] = useState('');
  const [deliveryFrequency, setDeliveryFrequency] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !deliveryFrequency) {
      toast.error('Please fill in both start date and delivery frequency.');
      return;
    }

    setLoading(true);

    try {
      const token = Cookies.get('token');

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/subscriptions/add`, 
        { start_date: startDate, delivery_frequency: deliveryFrequency },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || 'Subscription created successfully!');

      setStartDate('');
      setDeliveryFrequency('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create subscription.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 px-6 md:px-20 text-center bg-white">
      <h2 className="text-2xl font-semibold mb-4 font-hina text-[#593825]">Stay in Bloom</h2>
      <p className="text-gray-600 mb-6 font-hina text-[#593825]">
        Subscribe to our newsletter for fresh floral inspiration and exclusive deals.
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-full focus:outline-none"
          placeholder="Start Date"
        />
        <select
          value={deliveryFrequency}
          onChange={(e) => setDeliveryFrequency(e.target.value)}
          className="w-full px-4 py-2 border rounded-full focus:outline-none"
          required
        >
          <option value="" disabled>Select delivery frequency</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="seasonal">Seasonal</option>
        </select>
        <button
          type="submit"
          className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700"
          disabled={loading}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
}
