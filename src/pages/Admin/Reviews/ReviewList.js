import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { MdDeleteSweep } from "react-icons/md";

const ReviewList = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/testimonial`);
      console.log("📦 API response:", response.data); // ← check for `testimonial_id` here
      setTestimonials(response.data);
    } catch (error) {
      toast.error("Failed to fetch testimonials");
      console.error("Fetch error:", error);
    }
  };

  const handleDelete = async (testimonial_id) => {
    if (!testimonial_id) {
      console.error("❌ testimonial_id is undefined or invalid");
      toast.error("Invalid testimonial ID");
      return;
    }

    const confirm = window.confirm("Are you sure you want to delete this testimonial?");
    if (!confirm) return;

    try {
      const token = Cookies.get("token");
      console.log("Token:", token);

      await axios.delete(`${process.env.REACT_APP_API_URL}/api/testimonial/${testimonial_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      toast.success("Testimonial deleted successfully");

      // Filter out the deleted testimonial
      setTestimonials((prev) =>
        prev.filter((item) => (item.testimonial_id || item.id) !== testimonial_id)
      );
    } catch (error) {
      toast.error("Failed to delete testimonial");
      console.error("Delete error:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
      {testimonials.length === 0 ? (
        <p>No testimonials found.</p>
      ) : (
        <table className="w-full table-auto border-collapse dark:bg-gray-900 text-black dark:text-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">User</th>
              <th className="p-2 border">Quote</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => {
              const id = testimonial.testimonial_id || testimonial.id;
              return (
                <tr key={id} className="text-center hover:bg-gray-50">
                  <td className="p-2 border">{testimonial.name}</td>
                  <td className="p-2 border">{testimonial.quote}</td>
                  <td className="p-2 border">
                    {new Date(testimonial.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleDelete(id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete testimonial"
                    >
                      <MdDeleteSweep size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReviewList;
