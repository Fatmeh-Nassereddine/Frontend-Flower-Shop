


// import React, { useState, useEffect } from "react";
// import Table from "../../../components/Table";
// import { getAllProducts, addProduct } from "../../../api/apiProducts";
// import { ProductCard } from "../../../components/ProductCard"; 
// import { updateProduct, deleteProduct } from "../../../api/apiProducts"; // Assuming these are the update and delete functions you provided
// import Modal from "react-modal"; // For modal, if using a library
// import { toast } from "react-toastify"; 
// import { MdOutlineAddBusiness, MdRebaseEdit, MdDeleteSweep } from "react-icons/md";


// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [limit] = useState(10);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [isAdding, setIsAdding] = useState(false);
  
//   // State for modal and product data
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false); // New state for Add Product modal
//   const [currentProduct, setCurrentProduct] = useState(null);
  
//   const [updatedProduct, setUpdatedProduct] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category_id: "",
//     stock_quantity: "",
//     is_seasonal: false,
//     is_featured: false,
//   });
//   const [newProduct, setNewProduct] = useState({ // New state for new product data
//     name: "",
//     description: "",
//     price: "",
//     category_id: "",
//     stock_quantity: "",
//     is_seasonal: false,
//     is_featured: false,
//   });
//   const [imageFiles, setImageFiles] = useState([]);
//   const handleImageFilesChange = (e) => {
//     const files = Array.from(e.target.files); // convert FileList to array
//     setImageFiles(files); // update imageFiles state
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await getAllProducts(currentPage, limit);
//         setProducts(response.data);
//         setTotalPages(response.totalPages || 1);
//       } catch (err) {
//         setError(err.message || "Failed to fetch products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [currentPage, limit]);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   // Function to open the modal and set the current product data
//   const openEditModal = (product) => {
//     setCurrentProduct(product);
//     setUpdatedProduct({
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       category_id: product.category_id,
//       stock_quantity: product.stock_quantity,
//       is_seasonal: product.is_seasonal,
//       is_featured: product.is_featured,
//     });
//     setIsEditModalOpen(true);
//   };

//   // Function to handle product updates
//   const handleUpdateProduct = async () => {
//     if (!window.confirm("Are you sure you want to update this product?")) return;

//     const formData = new FormData();
//     for (let key in updatedProduct) {
//       formData.append(key, updatedProduct[key]);
//     }
//     imageFiles.forEach((file) => formData.append("images", file));

//     try {
//       await updateProduct(currentProduct.product_id, formData);
//       toast.success("Product updated successfully!");
//       setIsEditModalOpen(false);
//       const response = await getAllProducts(currentPage, limit);
//       setProducts(response.data);
//     } catch (error) {
//       toast.error("Failed to update product.");
//       console.error(error);
//     }
//   };

//   // Function to handle product deletion
//   const handleDeleteProduct = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this product?");
//     if (confirmDelete) {
//       try {
//         await deleteProduct(id);
//         toast.success("Product deleted successfully!");
//         // Refresh the product list after deletion
//         const response = await getAllProducts(currentPage, limit);
//         setProducts(response.data);
//       } catch (error) {
//         toast.error("Failed to delete product.");
//         console.error(error);
//       }
//     }
//   };

//   // Function to handle adding a new product
//   const handleAddProduct = async () => {
//     if (!window.confirm("Are you sure you want to add this product?")) return;

//     const formData = new FormData();
//     for (let key in newProduct) {
//       formData.append(key, newProduct[key]);
//     }
//     imageFiles.forEach((file) => formData.append("images", file));

//     try {
//       await addProduct(formData);
//       toast.success("Product added successfully!");
//       setIsAddModalOpen(false);
//       const response = await getAllProducts(currentPage, limit);
//       setProducts(response.data);
//     } catch (error) {
//       toast.error("Failed to add product.");
//       console.error(error);
//     }
//   };

//   const update = (field, e) => {
//     const value = typeof e.target.value === "boolean" ? e.target.checked : e.target.value;
//     if (isEditModalOpen) {
//       setUpdatedProduct({ ...updatedProduct, [field]: value });
//     } else {
//       setNewProduct({ ...newProduct, [field]: value });
//     }
//   };

//   // Columns definition with action buttons
//   const columns = [
//     { Header: "ID", accessor: "product_id" },
//     { Header: "Name", accessor: "name" },
//     { Header: "Description", accessor: "description" },
//     {
//       Header: "Preview",
//       accessor: "product_id",
//       Cell: ({ row }) => {
//         const product = row.original;
//         const imageUrl =
//           product.images?.find((img) => img.is_primary)?.image_url ||
//           product.images?.[0]?.image_url ||
//           "/placeholder.jpg";

//         return (
//           <div className="flex justify-center ">
//             <ProductCard 
//               image={imageUrl} 
//               minimal={true} 
//               style={{ width: "650px", height: "80px", objectFit: "contain" }}
//             />
//           </div>
//         );
//       },
//     },
//     { Header: "Price ($)", accessor: "price" },
//     { Header: "Stock", accessor: "stock_quantity" },
//     { Header: "Category ID", accessor: "category_id" },
//     {
//       Header: "Actions",
//       accessor: "product_id",
//       Cell: ({ row }) => {
//         const product = row.original;
//         return (
//           <div className="flex gap-2">
//             <button
//               onClick={() => openEditModal(product)}
//               className="text-blue-500 hover:text-blue-700"
//               title="Edit"
//             >
//               <MdRebaseEdit size={20} />
//             </button>
//             <button
//               onClick={() => handleDeleteProduct(product.product_id)}
//               className="text-red-500 hover:text-red-700"
//               title="Delete"
//             >
//               <MdDeleteSweep  size={20} />
//             </button>
//           </div>
//         );
//       },
//     },
//   ];

//   if (loading) return <p className="text-center">Loading products...</p>;
//   if (error) return <p className="text-red-600 text-center">Error: {error}</p>;

//   return (
//     <div className="p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
//       {/* Container for the table and button */}
//       <div className="relative">
//         <div className="absolute top-0 right-0 mb-4">
//           {/* Add Product Button positioned at the top right */}
//           <button
//             onClick={() => setIsAddModalOpen(true)}
//             className="bg-green-500 text-white p-2 rounded hover:bg-green-600 text-xl flex items-center"
//             title="Add Product"
//           >
//             <MdOutlineAddBusiness />
//           </button>
//         </div>
        
//         <Table title="Products" columns={columns} data={products} />
//       </div>
      
//       <div className="flex justify-center items-center mt-4 space-x-2">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//         >
//           Previous
//         </button>

//         <span className="px-3 py-1">
//           Page {currentPage} of {totalPages}
//         </span>

//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//         >
//           Next
//         </button>
//       </div>

//       {/* Edit Product Modal */}
//       <Modal isOpen={isEditModalOpen} 
//         onRequestClose={() => setIsEditModalOpen(false)}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay with semi-transparent background
//             zIndex: 1000, // Ensure modal is above other content
//           },
//           content: {
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "50%", // Adjust width
//             maxWidth: "600px", // Optional: max width for modal
//             padding: "20px",
//             background: "#fff",
//             borderRadius: "8px",
//             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//             zIndex: 1001, // Ensure content is above the overlay
//           },
//         }}
//       >
//         <div className="p-4">
//           <h2>Edit Product</h2>
//           {/* Existing Edit Modal Form */}
//           <div>
//             <label>Name</label>
//             <input
//               type="text"
//               value={updatedProduct.name}
//               onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
//               className="border p-2 mt-2 w-full"
//             />
//           </div>
//           <div>
//             <label>Description</label>
//             <input
//               type="text"
//               value={updatedProduct.description}
//               onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
//               className="border p-2 mt-2 w-full"
//             />
//           </div>
//           <div>
//             <label>Price</label>
//             <input
//               type="number"
//               value={updatedProduct.price}
//               onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
//               className="border p-2 mt-2 w-full"
//             />
//           </div>
//           <div>
//             <label>Stock Quantity</label>
//             <input
//               type="number"
//               value={updatedProduct.stock_quantity}
//               onChange={(e) => setUpdatedProduct({ ...updatedProduct, stock_quantity: e.target.value })}
//               className="border p-2 mt-2 w-full"
//             />
//           </div>
//           <div>
//             <label>Category ID</label>
//             <input
//               type="text"
//               value={updatedProduct.category_id}
//               onChange={(e) => setUpdatedProduct({ ...updatedProduct, category_id: e.target.value })}
//               className="border p-2 mt-2 w-full"
//             />
//           </div>
//           <div className="flex items-center gap-4">
//           <label>
//             <input type="checkbox" checked={product.is_seasonal} onChange={e => update("is_seasonal", { target: { value: e.target.checked } })} />
//             Seasonal
//           </label>
//           <label>
//             <input type="checkbox" checked={product.is_featured} onChange={e => update("is_featured", { target: { value: e.target.checked } })} />
//             Featured
//           </label>
//         </div>

//           <div>
//             <label>Images</label>
//             <input
//               type="file"
//               multiple
//               onChange={handleImageFilesChange} 
//               className="border p-2 mt-2 w-full"
//             />
//             {imageFiles && Array.from(imageFiles).map((file, i) => (
//             <img
//               key={i}
//               src={URL.createObjectURL(file)}
//               alt={`preview-${i}`}
//               className="w-20 h-20 object-cover mt-2 mr-2 inline-block"
//             />
//           ))}
//           </div>
//           <button
//           onClick={handleUpdateProduct}
//           disabled={isUpdating}
//           className={`mt-4 p-2 text-white ${isUpdating ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
//         >
//           {isUpdating ? "Updating..." : "Update"}
//         </button>

//         </div>
//       </Modal>

//       {/* Add Product Modal */}
//       <Modal isOpen={isAddModalOpen} 
//         onRequestClose={() => setIsAddModalOpen(false)}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay with semi-transparent background
//             zIndex: 1000, // Ensure modal is above other content
//           },
//           content: {
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "50%", // Adjust width
//             maxWidth: "600px", // Optional: max width for modal
//             padding: "20px",
//             background: "#fff",
//             borderRadius: "8px",
//             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//             zIndex: 1001, // Ensure content is above the overlay
//           },
//         }}
//       >
//         <div className="p-4">
//           <h2>Add Product</h2>
//           <div>
//             <label>Name</label>
//             <input
//               type="text"
//               value={newProduct.name}
//               onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//               className="border p-2 mt-2 w-full"
//             />
//           </div>
//           <div>
//             <label>Description</label>
//             <input
//               type="text"
//               value={newProduct.description}
//               onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//               className="border p-2 mt-2 w-full"
//             />
//           </div>
//           <div>
//             <label>Price</label>
//             <input
//               type="number"
//               value={newProduct.price}
//               onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//               className="border p-2 mt-2 w-full"
//             />
//           </div>
//           <div>
//             <label>Stock Quantity</label>
//             <input
//               type="number"
//               value={updatedProduct.stock_quantity}
//               onChange={(e) => setUpdatedProduct({ ...updatedProduct, stock_quantity: e.target.value })}
//               className="border p-2 mt-2 w-full"
//             />
//           </div>
//           <div>
//             <label>Category ID</label>
//             <input
//               type="text"
//               value={updatedProduct.category_id}
//               onChange={(e) => setUpdatedProduct({ ...updatedProduct, category_id: e.target.value })}
//               className="border p-2 mt-2 w-full"
//             />
//           </div>
//           <div className="flex items-center gap-4">
//             <label>
//               <input type="checkbox" checked={product.is_seasonal} onChange={e => update("is_seasonal", { target: { value: e.target.checked } })} />
//               Seasonal
//             </label>
//             <label>
//               <input type="checkbox" checked={product.is_featured} onChange={e => update("is_featured", { target: { value: e.target.checked } })} />
//               Featured
//             </label>
//           </div>

//           <div>
//             <label>Images</label>
//             <input
//               type="file"
//               multiple
//               onChange={handleImageFilesChange} 
//               className="border p-2 mt-2 w-full"
//             />
//             {imageFiles && Array.from(imageFiles).map((file, i) => (
//             <img
//               key={i}
//               src={URL.createObjectURL(file)}
//               alt={`preview-${i}`}
//               className="w-20 h-20 object-cover mt-2 mr-2 inline-block"
//             />
//           ))}
//           </div>
//           <button
//             onClick={handleAddProduct}
//             disabled={isAdding}
//             className={`mt-4 p-2 text-white ${isAdding ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
//           >
//             {isAdding ? "Adding..." : "Add"}
//           </button>

//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default ProductList;









// import React, { useState, useEffect } from "react";
// import Table from "../../../components/Table";
// import {
//   getAllProducts,
//   addProduct,
//   updateProduct,
//   deleteProduct,
// } from "../../../api/apiProducts";
// import { ProductCard } from "../../../components/ProductCard";
// import Modal from "react-modal";
// import { toast } from "react-toastify";
// import {
//   MdOutlineAddBusiness,
//   MdRebaseEdit,
//   MdDeleteSweep,
// } from "react-icons/md";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [limit] = useState(10);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null);
//   const [imageFiles, setImageFiles] = useState([]);

//   const [updatedProduct, setUpdatedProduct] = useState({
//     name: "",
//     description: "",
//     price: "",
//     is_seasonal: false,
//     is_featured: false,
//     stock_quantity: "",
//     category_id: "",
//     season_id: "",
//   });

//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     description: "",
//     price: "",
//     is_seasonal: false,
//     is_featured: false,
//     stock_quantity: "",
//     category_id: "",
//     season_id: "",
//   });

//   const handleImageFilesChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImageFiles(files);
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await getAllProducts(currentPage, limit);
//         setProducts(response.data);
//         setTotalPages(response.totalPages || 1);
//       } catch (err) {
//         setError(err.message || "Failed to fetch products");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, [currentPage, limit]);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
//   };

//   const openEditModal = (product) => {
//     setCurrentProduct(product);
//     setUpdatedProduct({
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       is_seasonal: product.is_seasonal,
//       is_featured: product.is_featured,
//       stock_quantity: product.stock_quantity,
//       category_id: product.category_id,
//       season_id: product.season_id ,
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleUpdateProduct = async () => {
//     if (!window.confirm("Are you sure you want to update this product?")) return;
  
//     const formData = new FormData();
  
//     for (let key in updatedProduct) {
//       let value = updatedProduct[key];
  
//       if (key === "price" || key === "stock_quantity") {
//         value = Number(value); // Convert to number
//       }
  
//       if (key === "is_seasonal" || key === "is_featured") {
//         value = value ? 1 : 0; // Convert boolean to 0/1
//       }
  
//       if (value !== "" && value != null) {
//         formData.append(key, value);
//       }
//     }
  
//     imageFiles.forEach((file) => formData.append("images", file));
  
//     try {
//       await updateProduct(currentProduct.product_id, formData);
//       toast.success("Product updated successfully!");
//       setIsEditModalOpen(false);
//       const response = await getAllProducts(currentPage, limit);
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Update error:", error);
//       toast.error("Failed to update product.");
//     }
//   };
  

//   const handleDeleteProduct = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;
//     try {
//       await deleteProduct(id);
//       toast.success("Product deleted successfully!");
//       const response = await getAllProducts(currentPage, limit);
//       setProducts(response.data);
//     } catch (error) {
//       toast.error("Failed to delete product.");
//     }
//   };

//   const handleAddProduct = async () => {
//     if (!window.confirm("Are you sure you want to add this product?")) return;

//     // ✅ Simple validation
//   if (!newProduct.name || !newProduct.price || !newProduct.stock_quantity) {
//     toast.error("Please fill in required fields: name, price, and stock quantity.");
//     return;
//   }
  
//     const formData = new FormData();
  
//     for (let key in newProduct) {
//       let value = newProduct[key];
  
//       if (key === "product_id" || value === "" || value == null) continue;
  
//       if (key === "price" || key === "stock_quantity") {
//         value = Number(value); // Numbers
//       }
  
//       if (key === "is_seasonal" || key === "is_featured") {
//         value = value ? 1 : 0; // Convert boolean to 1/0
//       }
  
//       formData.append(key, value);
//     }
  
//     imageFiles.forEach((file) => formData.append("images", file));
  
//     try {
//       await addProduct(formData);
//       toast.success("Product added successfully!");
//       setIsAddModalOpen(false);
//       const response = await getAllProducts(currentPage, limit);
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error adding product:", error);
//       toast.error("Failed to add product.");
//     }
//   };
  
//   const update = (field, e) => {
//     const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
//     if (isEditModalOpen)
//       setUpdatedProduct({ ...updatedProduct, [field]: value });
//     else setNewProduct({ ...newProduct, [field]: value });
//   };

//   const modalStyle = {
//     overlay: {
//       backgroundColor: "rgba(0, 0, 0, 0.5)",
//       zIndex: 1000,
//     },
//     content: {
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       width: "50%",
//       maxWidth: "600px",
//       padding: "20px",
//       background: "#fff",
//       borderRadius: "8px",
//       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//       zIndex: 1001,
//     },
//   };

//   const columns = [
//     { Header: "ID", accessor: "product_id" },
//     { Header: "Name", accessor: "name" },
//     { Header: "Description", accessor: "description" },
//     {
//       Header: "Preview",
//       accessor: "product_id",
//       Cell: ({ row }) => {
//         const product = row.original;
//         const imageUrl =
//           product.images?.find((img) => img.is_primary)?.image_url ||
//           product.images?.[0]?.image_url ||
//           "/placeholder.jpg";
//         return (
//           <div className="flex justify-center">
//             <ProductCard
//               image={imageUrl}
//               minimal={true}
//               style={{ width: "650px", height: "80px" }}
//             />
//           </div>
//         );
//       },
//     },
//     { Header: "Price ($)", accessor: "price" },
//     { Header: "Stock", accessor: "stock_quantity" },
//     { Header: "Category ID", accessor: "category_id" },
//     {
//       Header: "Actions",
//       accessor: "product_id",
//       Cell: ({ row }) => {
//         const product = row.original;
//         return (
//           <div className="flex gap-2">
//             <button
//               onClick={() => openEditModal(product)}
//               className="text-blue-500"
//               title="Edit"
//             >
//               <MdRebaseEdit size={20} />
//             </button>
//             <button
//               onClick={() => handleDeleteProduct(product.product_id)}
//               className="text-red-500"
//               title="Delete"
//             >
//               <MdDeleteSweep size={20} />
//             </button>
//           </div>
//         );
//       },
//     },
//   ];

//   if (loading) return <p className="text-center">Loading products...</p>;
//   if (error) return <p className="text-red-600 text-center">Error: {error}</p>;

//   return (
//     <div className="p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
//       <div className="relative">
//         <div className="absolute top-0 right-0 mb-4">
//           <button
//             onClick={() => setIsAddModalOpen(true)}
//             className="bg-green-500 text-white p-2 rounded"
//           >
//             <MdOutlineAddBusiness />
//           </button>
//         </div>
//         <Table title="Products" columns={columns} data={products} />
//       </div>

//       <div className="flex justify-center mt-4 gap-2">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="bg-gray-200 px-3 py-1 rounded"
//         >
//           Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="bg-gray-200 px-3 py-1 rounded"
//         >
//           Next
//         </button>
//       </div>

//       <Modal
//         isOpen={isEditModalOpen || isAddModalOpen}
//         onRequestClose={() => {
//           setIsEditModalOpen(false);
//           setIsAddModalOpen(false);
//         }}
//         style={modalStyle}
//       >
//         <div className="p-4">
//           <h2>{isEditModalOpen ? "Edit Product" : "Add Product"}</h2>
//           {Object.keys(newProduct).map((key) => (
//             <div key={key} className="mb-2">
//               <label className="block capitalize">
//                 {key.replace(/_/g, " ")}
//               </label>
//               {typeof newProduct[key] === "boolean" ? (
//                 <input
//                   type="checkbox"
//                   checked={
//                     isEditModalOpen ? updatedProduct[key] : newProduct[key]
//                   }
//                   onChange={(e) => update(key, e)}
//                 />
//               ) : (
//                 <input
//                   className="border px-2 py-1 w-full"
//                   type="text"
//                   value={
//                     isEditModalOpen ? updatedProduct[key] : newProduct[key]
//                   }
//                   onChange={(e) => update(key, e)}
//                 />
//               )}
//             </div>
//           ))}

//           <label className="block mt-2">Images</label>
//           <input type="file" multiple onChange={handleImageFilesChange} />

//           <div className="mt-4">
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//               onClick={isEditModalOpen ? handleUpdateProduct : handleAddProduct}
//             >
//               {isEditModalOpen ? "Update" : "Add"}
//             </button>
//             <button
//               className="bg-gray-300 px-4 py-2 rounded"
//               onClick={() => {
//                 setIsEditModalOpen(false);
//                 setIsAddModalOpen(false);
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default ProductList;




import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { getAllProducts, addProduct, updateProduct, deleteProduct } from "../../../api/apiProducts";
import { ProductCard } from "../../../components/ProductCard";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { MdOutlineAddBusiness, MdRebaseEdit, MdDeleteSweep } from "react-icons/md";

Modal.setAppElement('#root');

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);

  const initialProductState = {
    name: "",
    description: "",
    price: "",
    is_seasonal: false,
    is_featured: false,
    stock_quantity: "",
    category_id: "",
    season_id: "",
  };

  const [updatedProduct, setUpdatedProduct] = useState({ ...initialProductState });
  const [newProduct, setNewProduct] = useState({ ...initialProductState });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllProducts(currentPage, limit);
        setProducts(response.data);
        setTotalPages(response.totalPages || 1);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, limit]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setUpdatedProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      is_seasonal: product.is_seasonal,
      is_featured: product.is_featured,
      stock_quantity: product.stock_quantity,
      category_id: product.category_id || "",
      season_id: product.season_id || "",
    });
    setIsEditModalOpen(true);
  };

  const handleImageFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  const validateProduct = (product) => {
    if (!product.name || product.name.length < 3) {
      return "Name must be at least 3 characters";
    }
    if (!product.price || isNaN(product.price) || Number(product.price) <= 0) {
      return "Price must be a positive number";
    }
    if (!product.stock_quantity || isNaN(product.stock_quantity) || Number(product.stock_quantity) < 0) {
      return "Stock quantity must be a non-negative number";
    }
    if (!product.category_id || !/^[0-9a-fA-F\-]{36}$/.test(product.category_id)) {
      return "Category ID must be a valid UUID";
    }
    if (!product.season_id || !/^[A-Za-z0-9]{1,10}$/.test(product.season_id)) {
      return "Season ID must be alphanumeric and up to 10 characters";
    }
    return null;
  };

  const handleUpdateProduct = async () => {
    const validationError = validateProduct(updatedProduct);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    if (!window.confirm("Are you sure you want to update this product?")) return;

    try {
      const formData = new FormData();
      Object.entries(updatedProduct).forEach(([key, value]) => {
        if (typeof value === "boolean") {
          formData.append(key, value ? "1" : "0");
        } else {
          formData.append(key, value);
        }
      });
      imageFiles.forEach(file => {
        formData.append('images', file);
      });

      await updateProduct(currentProduct.product_id, formData);
      toast.success("Product updated successfully!");
      setIsEditModalOpen(false);
      const response = await getAllProducts(currentPage, limit);
      setProducts(response.data);
      setImageFiles([]);
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message || "Failed to update product.");
    }
  };

  const handleAddProduct = async () => {
    const validationError = validateProduct(newProduct);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    if (!window.confirm("Are you sure you want to add this product?")) return;

    try {
      const formData = new FormData();
      Object.entries(newProduct).forEach(([key, value]) => {
        if (typeof value === "boolean") {
          formData.append(key, value ? "1" : "0");
        } else {
          formData.append(key, value);
        }
      });
      imageFiles.forEach(file => {
        formData.append('images', file);
      });

      await addProduct(newProduct, imageFiles);
      toast.success("Product added successfully!");
      setIsAddModalOpen(false);
      const response = await getAllProducts(currentPage, limit);
      setProducts(response.data);
      setNewProduct({ ...initialProductState });
      setImageFiles([]);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.message || "Failed to add product.");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully!");
      const response = await getAllProducts(currentPage, limit);
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed to delete product.");
    }
  };

  const updateField = (field, value) => {
    if (isEditModalOpen) {
      setUpdatedProduct(prev => ({ ...prev, [field]: value }));
    } else {
      setNewProduct(prev => ({ ...prev, [field]: value }));
    }
  };

  const renderInputField = (key) => {
    const value = isEditModalOpen ? updatedProduct[key] : newProduct[key];

    if (key === 'is_seasonal' || key === 'is_featured') {
      return (
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => updateField(key, e.target.checked)}
          className="ml-2"
        />
      );
    } else if (key === 'season_id') {
      return (
        <input
          type="text"
          maxLength={10}
          pattern="[A-Za-z0-9]+"
          value={value}
          onChange={(e) => updateField(key, e.target.value.toUpperCase())}
          className="border px-2 py-1 w-full"
        />
      );
    } else if (key === 'category_id') {
      return (
        <input
          type="text"
          pattern="[0-9a-fA-F\-]{36}"
          value={value}
          onChange={(e) => updateField(key, e.target.value)}
          className="border px-2 py-1 w-full"
        />
      );
    } else if (key === 'price' || key === 'stock_quantity') {
      return (
        <input
          type="number"
          min={key === 'price' ? "0.01" : "0"}
          step={key === 'price' ? "0.01" : "1"}
          value={value}
          onChange={(e) => updateField(key, e.target.value)}
          className="border px-2 py-1 w-full"
        />
      );
    } else {
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => updateField(key, e.target.value)}
          className="border px-2 py-1 w-full"
        />
      );
    }
  };

  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      maxWidth: "600px",
      padding: "20px",
      borderRadius: "8px",
    },
  };

  const columns = [
    { Header: "ID", accessor: "product_id" },
    { Header: "Name", accessor: "name" },
    { Header: "Description", accessor: "description" },
    {
      Header: "Preview",
      accessor: "product_id",
      Cell: ({ row }) => {
        const product = row.original;
        const imageUrl = product.images?.find(img => img.is_primary)?.image_url ||
                         product.images?.[0]?.image_url || "/placeholder.jpg";
        return (
          <div className="flex justify-center">
            <ProductCard image={imageUrl} minimal={true} style={{ width: "650px", height: "80px" }} />
          </div>
        );
      },
    },
    { Header: "Price ($)", accessor: "price" },
    { Header: "Stock", accessor: "stock_quantity" },
    { Header: "Category ID", accessor: "category_id" },
    {
      Header: "Actions",
      accessor: "product_id",
      Cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex gap-2">
            <button onClick={() => openEditModal(product)} className="text-blue-500 hover:text-blue-700">
              <MdRebaseEdit size={20} />
            </button>
            <button onClick={() => handleDeleteProduct(product.product_id)} className="text-red-500 hover:text-red-700">
              <MdDeleteSweep size={20} />
            </button>
          </div>
        );
      },
    },
  ];

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-red-600 text-center">Error: {error}</p>;

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="relative">
        <div className="absolute top-0 right-0 mb-4">
          <button onClick={() => setIsAddModalOpen(true)} className="bg-green-500 hover:bg-green-600 text-white p-2 rounded">
            <MdOutlineAddBusiness size={20} />
          </button>
        </div>
        <Table title="Products" columns={columns} data={products} />
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-1">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <Modal
        isOpen={isEditModalOpen || isAddModalOpen}
        onRequestClose={() => {
          setIsEditModalOpen(false);
          setIsAddModalOpen(false);
          setImageFiles([]);
        }}
        style={modalStyle}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">
            {isEditModalOpen ? "Edit Product" : "Add Product"}
          </h2>

          {Object.keys(initialProductState).map((key) => (
            <div key={key} className="mb-4">
              <label className="block capitalize font-medium mb-1">{key.replace(/_/g, " ")}</label>
              {renderInputField(key)}
            </div>
          ))}

          <div className="mb-4">
            <label className="block font-medium mb-1">Images</label>
            <input type="file" multiple onChange={handleImageFilesChange} className="w-full" />
            {imageFiles.length > 0 && (
              <p className="text-sm text-gray-500 mt-1">{imageFiles.length} file(s) selected</p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              onClick={() => {
                setIsEditModalOpen(false);
                setIsAddModalOpen(false);
                setImageFiles([]);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={isEditModalOpen ? handleUpdateProduct : handleAddProduct}
            >
              {isEditModalOpen ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;
