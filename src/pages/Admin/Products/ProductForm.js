// src/components/ProductForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({ product, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    category_id: "",
    season_id: "",
    images: [],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock_quantity: product.stock_quantity || "",
        category_id: product.category_id || "",
        season_id: product.season_id || "",
        images: [],
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "images") {
        form.append(key, formData[key]);
      }
    });

    formData.images.forEach((img) => {
      form.append("images", img);
    });

    try {
      const url = product
        ? `http://localhost:5000/api/products/${product.product_id}`
        : "http://localhost:5000/api/products/create";
      const method = product ? "put" : "post";
      await axios[method](url, form, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      onSubmit();
      onClose(); // Close the modal after submission
    } catch (err) {
      console.error("Error submitting product:", err);
      alert("Error submitting product");
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content bg-white p-6 rounded shadow-md">
        <h3 className="text-xl font-semibold">{product ? "Edit" : "Add"} Product</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Stock Quantity</label>
            <input
              type="number"
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category ID</label>
            <input
              type="text"
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Season ID</label>
            <input
              type="text"
              name="season_id"
              value={formData.season_id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Images</label>
            <input
              type="file"
              name="images"
              onChange={handleFileChange}
              className="w-full p-2 border rounded mt-1"
              multiple
            />
          </div>
          <div className="mt-4 text-right">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
