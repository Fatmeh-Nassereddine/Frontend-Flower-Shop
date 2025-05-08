import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast for notifications

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState('');
  const [error, setError] = useState('');

  // Fetch testimonials on component mount
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/testimonial', {
          withCredentials: true,
        });
        setTestimonials(res.data); // Set testimonials in state
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Handle form submission for adding a testimonial
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      // Post the testimonial
      await axios.post(
        'http://localhost:5000/api/testimonial',
        { quote },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Clear the input
      setQuote('');
  
      // Show success toast
      toast.success('✅ Testimonial submitted!', {
        position: "top-right",
        autoClose: 2000,
        style: {
          backgroundColor: 'green',
          color: 'white',
          fontSize: '16px',
        },
      });
  
      // Re-fetch testimonials to include the new testimonial with the name
      const res = await axios.get('http://localhost:5000/api/testimonial', {
        withCredentials: true,
      });
      setTestimonials(res.data); // Update the state with the full list of testimonials, including the name
    } catch (err) {
      // Show error toast
      toast.error(`❌ ${err.response?.data?.message || 'Submission failed'}`, {
        position: "top-left",
        style: {
          backgroundColor: 'red',
          color: 'white',
          fontSize: '16px',
        },
      });
    }
  };
  
  return (
    <section className="bg-pink-50 py-12 px-6 md:px-20 text-center">
      <h2 className="font-hina text-[#593825] text-2xl font-semibold mb-8">What Our Customers Say</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-8 max-w-xl mx-auto">
        <textarea
          value={quote}
          onChange={(e) => setQuote(e.target.value)} // Update state with textarea input
          placeholder="Write your testimonial here..."
          className="w-full p-4 border rounded-md text-xl"
          required
        />
        <button
          type="submit"
          className=" bg-pink-600 text-xl text-white px-6 py-2 rounded-full hover:bg-pink-700 transition duration-300"
        >
          Submit Testimonial
        </button>
      </form>

      {/* Testimonials */}
      {loading ? (
        <p>Loading testimonials...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white shadow-md p-6 rounded-lg">
              <p className="italic text-gray-700 mb-4">“{t.quote}”</p>
              <h4 className="font-semibold text-pink-600">- {t.name}</h4>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
