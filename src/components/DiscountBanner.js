




// src/components/PromoBanner.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaTimes, FaCopy } from "react-icons/fa";

const DiscountBanner = () => {
  const [discount, setDiscount] = useState(null);
  const [visible, setVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          console.warn("User not logged in. Skipping discount fetch.");
          return;
        }

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/discounts`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        // Assuming you only want to show one (e.g., first active) discount
        const activeDiscount = res.data?.find((d) => new Date(d.end_date) > new Date());
        if (activeDiscount) setDiscount(activeDiscount);
      } catch (err) {
        console.error("Error fetching discount data", err);
      }
    };

    fetchDiscounts();
  }, []);

  const handleCopy = () => {
    if (discount?.code) {
      navigator.clipboard.writeText(discount.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  if (!discount || !visible) return null;

  return (
    <div className="bg-pink-100 border border-pink-300 text-pink-900 px-4 py-3 flex justify-between items-center relative">
      <div>
        <span className="font-semibold">Spring Discount!</span> Use code{" "}
        <span className="bg-white px-2 py-1 rounded font-mono font-bold text-[#D63384]">
          {discount.code}
        </span>{" "}
        to get{" "}
        <strong>
          {discount.discount_type === "percentage"
            ? `${discount.amount}%`
            : `$${discount.amount}`}{" "}
          OFF
        </strong>
        , valid until{" "}
        <strong>{new Date(discount.end_date).toLocaleDateString()}</strong>.
      </div>
      <div className="flex items-center gap-3 ml-4">
        <button
          onClick={handleCopy}
          className="text-sm px-3 py-1 bg-[#D63384] text-white rounded hover:bg-[#B03074] transition"
        >
          {copied ? "Copied!" : (
            <span className="flex items-center gap-1">
              <FaCopy /> Copy Code
            </span>
          )}
        </button>
        <button
          onClick={() => setVisible(false)}
          className="text-green-900 hover:text-green-700 transition"
          aria-label="Close banner"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default DiscountBanner;
