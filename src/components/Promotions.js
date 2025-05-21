// src/pages/Promotions.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Cookies from "js-cookie";
import { FaFire } from "react-icons/fa";

const Promotions = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          console.error("No token found. User might not be logged in.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/discounts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setDiscounts(res.data || []);
      } catch (err) {
        console.error("Failed to load discounts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

  return (
    <>
      {/* Import Hina Mincho font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Hina+Mincho&display=swap"
        rel="stylesheet"
      />

      <Header />
      <div
        className="px-4 py-8 min-h-screen bg-gray-50 text-[#593825] sm:px-6 lg:px-16"
        style={{ fontFamily: "'Hina Mincho', serif" }}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-orange-600 flex items-center mb-6">
          <FaFire className="mr-2 text-red-500 text-xl sm:text-2xl" />
          Current Discount Codes
        </h2>

        {loading ? (
          <p className="text-lg">Loading discounts...</p>
        ) : discounts.length === 0 ? (
          <p className="text-lg text-gray-600">No discounts available now.</p>
        ) : (
          <ul className="space-y-6">
            {discounts.map((d) => (
              <li
                key={d.discount_id || d.id}
                className="bg-white shadow-md border border-gray-200 p-4 sm:p-6 rounded-lg hover:shadow-lg transition"
              >
                <p className="text-lg">
                  <strong>Code:</strong>{" "}
                  <span className="text-blue-700 font-medium">{d.code}</span>
                </p>
                <p className="mt-2 text-gray-700">{d.description}</p>
                <p className="mt-2 font-semibold text-green-600">
                  {d.discount_type === "percentage"
                    ? `${d.amount}% OFF`
                    : `$${d.amount} OFF`}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Valid from{" "}
                  <strong>
                    {new Date(d.start_date).toLocaleDateString()}
                  </strong>{" "}
                  to{" "}
                  <strong>
                    {new Date(d.end_date).toLocaleDateString()}
                  </strong>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Promotions;
