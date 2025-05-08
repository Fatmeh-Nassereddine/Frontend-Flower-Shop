// api/apiShipping.js

import axios from "axios";

// ✅ Global Axios Config
axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

// ===========================
// 📦 SHIPPING OPTIONS
// ===========================

// GET /shippings/shipping-options — for customers at checkout
export const fetchShippingOptions = async () => {
    const res = await axios.get("http://localhost:5000/api/shippings/shipping-options", {
      withCredentials: true,
    });
    return res.data;
  };
  

// ===========================
// 📋 ADMIN SHIPPING MANAGEMENT
// ===========================

// GET /shippings — get all shipping records (admin only)
export const getAllShippings = async () => {
  const res = await axios.get("http://localhost:5000/api/shippings");
  return res.data;
};

// GET /shippings/:id — get one shipping record
export const getShippingById = async (id) => {
  const res = await axios.get(`http://localhost:5000/api/shippings/${id}`);
  return res.data;
};

// POST /shippings — create a new shipping record (after order placed)
export const createShipping = async ({ delivery_fee, order_id }) => {
  const res = await axios.post("http://localhost:5000/api/shippings", { delivery_fee, order_id });
  return res.data;
};

// PUT /shippings/:id — update an existing shipping record (admin only)
export const updateShipping = async (id, updates) => {
  const res = await axios.put(`http://localhost:5000/api/shippings/${id}`, updates);
  return res.data;
};

// DELETE /shippings/:id — delete a shipping record (admin only)
export const deleteShipping = async (id) => {
  const res = await axios.delete(`http://localhost:5000/api/shippings/${id}`);
  return res.data;
};
