import React, { useState, useEffect } from "react";
import axios from "axios";

// API client for category-related requests
const apiClient = axios.create({
  baseURL: "https://backend-flower-shop.onrender.com/api/categories",
  withCredentials: true, // Enables sending cookies with requests
});

// CategoryList Component
const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For adding a new category
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // For editing a category
  const [editingCategory, setEditingCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch categories from the API
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/");
      setCategories(response.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create new category
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/", { name: newCategoryName });
      fetchCategories();
      setShowAddModal(false);
      setNewCategoryName("");
    } catch (err) {
      alert("Error creating category: " + err.message);
    }
  };

  // Update existing category
  const handleEditCategory = async (e) => {
    e.preventDefault();
    if (!editingCategory) return;

    try {
      await apiClient.put(`/${editingCategory.id}`, { name: editingCategory.name });
      fetchCategories();
      setShowEditModal(false);
      setEditingCategory(null);
    } catch (err) {
      alert("Error updating category: " + err.message);
    }
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await apiClient.delete(`/${id}`);
      fetchCategories();
    } catch (err) {
      alert("Error deleting category: " + err.message);
    }
  };

  // Effect to fetch categories on load
  useEffect(() => {
    fetchCategories();
  }, []);

  // Loading and error handling
  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-green-800 text-white rounded">
          ADD Category
        </button>
      </div>

      <table className="min-w-full text-left border-collapse mb-8">
        <thead className="border-b">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <tr key={cat.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{cat.id}</td>
                <td className="px-4 py-2">{cat.name}</td>
                <td className="px-4 py-2">
                  <button
                    className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
                    onClick={() => {
                      setEditingCategory(cat);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDeleteCategory(cat.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-4 py-2">No categories available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="modal">
          <form onSubmit={handleCreateCategory}>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category Name"
            />
            <button type="submit">Create Category</button>
            <button onClick={() => setShowAddModal(false)}>Cancel</button>
          </form>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && editingCategory && (
        <div className="modal">
          <form onSubmit={handleEditCategory}>
            <input
              type="text"
              value={editingCategory.name}
              onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
              placeholder="Category Name"
            />
            <button type="submit">Update Category</button>
            <button onClick={() => setShowEditModal(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
