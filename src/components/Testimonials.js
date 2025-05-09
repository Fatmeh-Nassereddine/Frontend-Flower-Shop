// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify'; // Import toast for notifications

// export default function Testimonials() {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [quote, setQuote] = useState('');
//   const [error, setError] = useState('');

//   // Fetch testimonials on component mount
//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/testimonial`, {
//           withCredentials: true,
//         });
//         setTestimonials(res.data); // Set testimonials in state
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch testimonials');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTestimonials();
//   }, []);

//   // Handle form submission for adding a testimonial
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent page reload
//     try {
//       // Post the testimonial
//       await axios.post(
//         `${process.env.REACT_APP_API_URL}/api/testimonial`,
//         { quote },
//         {
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
  
//       // Clear the input
//       setQuote('');
  
//       // Show success toast
//       toast.success('✅ Testimonial submitted!', {
//         position: "top-right",
//         autoClose: 2000,
//         style: {
//           backgroundColor: 'green',
//           color: 'white',
//           fontSize: '16px',
//         },
//       });
  
//       // Re-fetch testimonials to include the new testimonial with the name
//       const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/testimonial`, {
//         withCredentials: true,
//       });
//       setTestimonials(res.data); // Update the state with the full list of testimonials, including the name
//     } catch (err) {
//       // Show error toast
//       toast.error(`❌ ${err.response?.data?.message || 'Submission failed'}`, {
//         position: "top-left",
//         style: {
//           backgroundColor: 'red',
//           color: 'white',
//           fontSize: '16px',
//         },
//       });
//     }
//   };
  
//   return (
//     <section className="bg-pink-50 py-12 px-6 md:px-20 text-center">
//       <h2 className="font-hina text-[#593825] text-2xl font-semibold mb-8">What Our Customers Say</h2>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="mb-8 max-w-xl mx-auto">
//         <textarea
//           value={quote}
//           onChange={(e) => setQuote(e.target.value)} // Update state with textarea input
//           placeholder="Write your testimonial here..."
//           className="w-full p-4 border rounded-md text-xl"
//           required
//         />
//         <button
//           type="submit"
//           className=" bg-pink-600 text-xl text-white px-6 py-2 rounded-full hover:bg-pink-700 transition duration-300"
//         >
//           Submit Testimonial
//         </button>
//       </form>

//       {/* Testimonials */}
//       {loading ? (
//         <p>Loading testimonials...</p>
//       ) : error ? (
//         <p className="text-red-500">Error: {error}</p>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-8">
//           {testimonials.map((t, idx) => (
//             <div key={idx} className="bg-white shadow-md p-6 rounded-lg">
//               <p className="italic text-gray-700 mb-4">“{t.quote}”</p>
//               <h4 className="font-semibold text-pink-600">- {t.name}</h4>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast for notifications
import Slider from 'react-slick'; // Import the Slider component

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState('');
  const [error, setError] = useState('');

  // Fetch testimonials on component mount
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/testimonial`, {
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
        `${process.env.REACT_APP_API_URL}/api/testimonial`,
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
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/testimonial`, {
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

  // Slick carousel settings with responsiveness
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024, // For medium screens (tablets)
        settings: {
          slidesToShow: 2, // Show 2 slides at once on larger screens
        },
      },
      {
        breakpoint: 768, // For small screens (phones)
        settings: {
          slidesToShow: 1, // Show 1 slide at once on smaller screens
        },
      },
    ],
  };

  return (
    <section className="bg-pink-50 py-10 px-6 md:px-20 text-center">
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
          className="bg-pink-600 text-xl text-white px-6 py-2 rounded-full hover:bg-pink-700 transition duration-300"
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
        <div className="w-full flex justify-center items-center">
        <div className="max-w-6xl w-full px-4">
        <Slider {...carouselSettings}>
      {testimonials.map((t, idx) => (
        <div key={idx} className="px-2">
          <div className="bg-white shadow-md p-4 rounded-lg text-center w-80 mx-auto">
            <p className="italic text-gray-700 mb-3">“{t.quote}”</p>
            <h4 className="font-semibold text-pink-600">- {t.name}</h4>
          </div>
        </div>
      ))}
    </Slider>
  </div>
</div>
)}
    </section>
  );
}
