// import React, { useState, useEffect } from "react";
// import { MdOutlineAddBusiness, MdRebaseEdit, MdDeleteSweep } from "react-icons/md";
// import Modal from "react-modal";
// import { getAllCategories, createCategory, updateCategory, deleteCategory } from "../../../api/apiCategories";

// // Set modal root element (needed for accessibility)
// Modal.setAppElement("#root");

// const CategoryList = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [newCategoryDescription, setNewCategoryDescription] = useState(""); // New description state
//   const [imageFile, setImageFile] = useState(null);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const data = await getAllCategories();
//       setCategories(data || []);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleCreateCategory = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", newCategoryName);
//     formData.append("description", newCategoryDescription);
//     if (imageFile) {
//       formData.append("image", imageFile);
//     }

//     try {
//       await createCategory(formData);
//       fetchCategories();
//       setShowAddModal(false);
//       setNewCategoryName("");
//       setNewCategoryDescription(""); // Clear description after creating
//       setImageFile(null); // Clear the file after creation
//     } catch (err) {
//       alert("Error creating category: " + err.message);
//     }
//   };

//   const handleEditCategory = async (e) => {
//     e.preventDefault();
//     if (!editingCategory) return;

//     const formData = new FormData();
//     formData.append("name", editingCategory.name);
//     formData.append("description", editingCategory.description);
//     if (imageFile) {
//       formData.append("image", imageFile);
//     }

//     try {
//       await updateCategory(editingCategory.id, formData);
//       fetchCategories();
//       setShowEditModal(false);
//       setEditingCategory(null);
//       setImageFile(null); // Clear the file after updating
//     } catch (err) {
//       alert("Error updating category: " + err.message);
//     }
//   };

//   const handleDeleteCategory = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this category?")) return;
//     try {
//       await deleteCategory(id);
//       fetchCategories();
//     } catch (err) {
//       alert("Error deleting category: " + err.message);
//     }
//   };

//   if (loading) return <p>Loading categories...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="p-4">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-bold">Categories</h2>
//         <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2 bg-green-800 text-white rounded">
//           <MdOutlineAddBusiness /> Add Category
//         </button>
//       </div>

//       <table className="min-w-full text-left border-collapse mb-8">
//         <thead className="border-b">
//           <tr>
//             <th className="px-4 py-2">ID</th>
//             <th className="px-4 py-2">Name</th>
//             <th className="px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//   {categories.length > 0 ? (
//     categories.map((cat) => (
//       <tr key={cat.id} className="border-b hover:bg-gray-50">
//         <td className="px-4 py-2">{cat.id}</td>
//         <td className="px-4 py-2">
//           <div className="flex items-center gap-3">
//             {cat.image_url && (
//               <img
//                 src={cat.image_url}
//                 alt={cat.name}
//                 className="w-12 h-12 object-cover rounded-md"
//               />
//             )}
//             {cat.name}
//           </div>
//         </td>
//         <td className="px-4 py-2">
//           <button
//             className="text-blue-500 hover:text-blue-700 mr-4"
//             onClick={() => { setEditingCategory(cat); setShowEditModal(true); }}
//           >
//             <MdRebaseEdit />
//           </button>
//           <button
//             className="text-red-500 hover:text-red-700"
//             onClick={() => handleDeleteCategory(cat.id)}
//           >
//             <MdDeleteSweep />
//           </button>
//         </td>
//       </tr>
//     ))
//   ) : (
//     <tr>
//       <td colSpan="3" className="px-4 py-2">No categories available</td>
//     </tr>
//   )}
// </tbody>

//       </table>

//       {/* Add Category Modal */}
//       <Modal
//         isOpen={showAddModal}
//         onRequestClose={() => setShowAddModal(false)}
//         contentLabel="Add Category"
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.75)",
//             zIndex: 1000,
//             backdropFilter: "blur(4px)",
//           },
//           content: {
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "90%",
//             maxWidth: "500px",
//             padding: "30px 40px",
//             background: "#f9f9f9",
//             borderRadius: "16px",
//             boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
//             zIndex: 1001,
//             overflow: "auto",
//             transition: "all 0.3s ease-in-out",
//           },
//         }}
//       >
//         <form onSubmit={handleCreateCategory}>
//           <input
//             type="text"
//             value={newCategoryName}
//             onChange={(e) => setNewCategoryName(e.target.value)}
//             placeholder="Category Name"
//             className="border p-2 w-full mb-4"
//           />
//           <textarea
//             value={newCategoryDescription}
//             onChange={(e) => setNewCategoryDescription(e.target.value)}
//             placeholder="Category Description"
//             className="border p-2 w-full mb-4"
//           />
//           <input
//             type="file"
//             onChange={(e) => setImageFile(e.target.files[0])}
//             className="border p-2 w-full mb-4"
//           />
//           <button type="submit" className="px-4 py-2 bg-green-800 text-white rounded w-full">
//             Create Category
//           </button>
//         </form>
//       </Modal>

//       {/* Edit Category Modal */}
//       <Modal
//         isOpen={showEditModal}
//         onRequestClose={() => setShowEditModal(false)}
//         contentLabel="Edit Category"
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.75)",
//             zIndex: 1000,
//             backdropFilter: "blur(4px)",
//           },
//           content: {
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "90%",
//             maxWidth: "500px",
//             padding: "30px 40px",
//             background: "#f9f9f9",
//             borderRadius: "16px",
//             boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
//             zIndex: 1001,
//             overflow: "auto",
//             transition: "all 0.3s ease-in-out",
//           },
//         }}
//       >
//         {editingCategory && (
//           <form onSubmit={handleEditCategory}>
//             <input
//               type="text"
//               value={editingCategory.name}
//               onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
//               placeholder="Category Name"
//               className="border p-2 w-full mb-4"
//             />
//             <textarea
//               value={editingCategory.description}
//               onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
//               placeholder="Category Description"
//               className="border p-2 w-full mb-4"
//             />
//             <input
//               type="file"
//               onChange={(e) => setImageFile(e.target.files[0])}
//               className="border p-2 w-full mb-4"
//             />
//             <button type="submit" className="px-4 py-2 bg-blue-800 text-white rounded w-full">
//               Update Category
//               </button>
//               </form>
//               )}
//               </Modal>
//               </div>
//               );
//               };

//               export default CategoryList;


import React, { useState, useEffect } from "react";
import { MdOutlineAddBusiness, MdRebaseEdit, MdDeleteSweep } from "react-icons/md";
import Modal from "react-modal";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "../../../api/apiCategories";

// Set modal root element (needed for accessibility)
Modal.setAppElement("#root");

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState(""); // New description state
  const [imageFile, setImageFile] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getAllCategories();
      console.log(data);
      setCategories(data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newCategoryName);
    formData.append("description", newCategoryDescription);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await createCategory(formData);
      fetchCategories();
      setShowAddModal(false);
      setNewCategoryName("");
      setNewCategoryDescription(""); // Clear description after creating
      setImageFile(null); // Clear the file after creation
    } catch (err) {
      alert("Error creating category: " + err.message);
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    if (!editingCategory) return;

    const formData = new FormData();
    formData.append("name", editingCategory.name);
    formData.append("description", editingCategory.description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await updateCategory(editingCategory.id, formData);
      fetchCategories();
      setShowEditModal(false);
      setEditingCategory(null);
      setImageFile(null); // Clear the file after updating
    } catch (err) {
      alert("Error updating category: " + err.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (err) {
      alert("Error deleting category: " + err.message);
    }
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2 bg-green-800 text-white rounded">
          <MdOutlineAddBusiness /> Add Category
        </button>
      </div>

      <table className="min-w-full text-left border-collapse mb-8">
        <thead className="border-b">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <tr key={cat.id} className="border-b ">
                <td className="px-4 py-2">{cat.id}</td>
                <td className="px-4 py-2">{cat.name}</td>
                <td className="px-4 py-2">{cat.description}</td>
                <td className="px-4 py-2">
                  {cat.image_url ? (
                    <img src={cat.image_url} alt={cat.name} className="w-20 h-20 object-cover" />
                  ) : (
                    <span>No image</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button className="text-blue-500 hover:text-blue-700 mr-4" onClick={() => { setEditingCategory(cat); setShowEditModal(true); }}><MdRebaseEdit /></button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteCategory(cat.id)}><MdDeleteSweep /></button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-2">No categories available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Category Modal */}
      <Modal
        isOpen={showAddModal}
        onRequestClose={() => setShowAddModal(false)}
        contentLabel="Add Category"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "500px",
            padding: "30px 40px",
            background: "#f9f9f9",
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
            zIndex: 1001,
            overflow: "auto",
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        <form onSubmit={handleCreateCategory}>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category Name"
            className="border p-2 w-full mb-4"
          />
          <textarea
            value={newCategoryDescription}
            onChange={(e) => setNewCategoryDescription(e.target.value)}
            placeholder="Category Description"
            className="border p-2 w-full mb-4"
          />
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="border p-2 w-full mb-4"
          />
          <button type="submit" className="px-4 py-2 bg-green-800 text-white rounded w-full">
            Create Category
          </button>
        </form>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
        contentLabel="Edit Category"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "500px",
            padding: "30px 40px",
            background: "#f9f9f9",
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
            zIndex: 1001,
            overflow: "auto",
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        {editingCategory && (
          <form onSubmit={handleEditCategory}>
            <input
              type="text"
              value={editingCategory.name}
              onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
              placeholder="Category Name"
              className="border p-2 w-full mb-4"
            />
            <textarea
              value={editingCategory.description}
              onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
              placeholder="Category Description"
              className="border p-2 w-full mb-4"
            />
            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="border p-2 w-full mb-4"
            />
            <button type="submit" className="px-4 py-2 bg-blue-800 text-white rounded w-full">
              Update Category
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default CategoryList;
