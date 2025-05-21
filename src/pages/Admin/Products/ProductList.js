


import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { getAllProducts, addProduct } from "../../../api/apiProducts";
import { ProductCard } from "../../../components/ProductCard"; 
import { updateProduct, deleteProduct } from "../../../api/apiProducts"; // Assuming these are the update and delete functions you provided
import Modal from "react-modal"; // For modal, if using a library
import { toast } from "react-toastify"; 
import { MdOutlineAddBusiness, MdRebaseEdit, MdDeleteSweep } from "react-icons/md";


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  // State for modal and product data
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // New state for Add Product modal
  const [currentProduct, setCurrentProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [newProduct, setNewProduct] = useState({ // New state for new product data
    name: "",
    description: "",
    price: "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const handleImageFilesChange = (e) => {
    const files = Array.from(e.target.files); // convert FileList to array
    setImageFiles(files); // update imageFiles state
  };

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
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Function to open the modal and set the current product data
  const openEditModal = (product) => {
    setCurrentProduct(product);
    setUpdatedProduct({
      name: product.name,
      description: product.description,
      price: product.price,
    });
    setIsEditModalOpen(true);
  };

  // Function to handle product updates
  const handleUpdateProduct = async () => {
    const confirm = window.confirm("Are you sure you want to update this product?");
  if (!confirm) return;
  setIsUpdating(true); // Start loading
    try {
      await updateProduct(currentProduct.product_id, updatedProduct, imageFiles);
      toast.success("Product updated successfully!");
      setIsEditModalOpen(false);
      // Refresh the product list after update
      const response = await getAllProducts(currentPage, limit);
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed to update product.");
      console.error(error);
    }
  };

  // Function to handle product deletion
  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully!");
        // Refresh the product list after deletion
        const response = await getAllProducts(currentPage, limit);
        setProducts(response.data);
      } catch (error) {
        toast.error("Failed to delete product.");
        console.error(error);
      }
    }
  };

  // Function to handle adding a new product
  const handleAddProduct = async () => {
    const confirm = window.confirm("Are you sure you want to add this product?");
  if (!confirm) return;
  setIsAdding(true); // Start loading
    try {
      await addProduct(newProduct, imageFiles);
      toast.success("Product added successfully!");
      setIsAddModalOpen(false);
      // Refresh the product list after adding
      const response = await getAllProducts(currentPage, limit);
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed to add product.");
      console.error(error);
    }
  };

  // Columns definition with action buttons
  const columns = [
    { Header: "ID", accessor: "product_id" },
    { Header: "Name", accessor: "name" },
    { Header: "Description", accessor: "description" },
    {
      Header: "Preview",
      accessor: "product_id",
      Cell: ({ row }) => {
        const product = row.original;
        const imageUrl =
          product.images?.find((img) => img.is_primary)?.image_url ||
          product.images?.[0]?.image_url ||
          "/placeholder.jpg";

        return (
          <div className="flex justify-center ">
            <ProductCard 
              image={imageUrl} 
              minimal={true} 
              style={{ width: "650px", height: "80px", objectFit: "contain" }}
            />
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
            <button
              onClick={() => openEditModal(product)}
              className="text-blue-500 hover:text-blue-700"
              title="Edit"
            >
              <MdRebaseEdit size={20} />
            </button>
            <button
              onClick={() => handleDeleteProduct(product.product_id)}
              className="text-red-500 hover:text-red-700"
              title="Delete"
            >
              <MdDeleteSweep  size={20} />
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
      {/* Container for the table and button */}
      <div className="relative">
        <div className="absolute top-0 right-0 mb-4">
          {/* Add Product Button positioned at the top right */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 text-xl flex items-center"
            title="Add Product"
          >
            <MdOutlineAddBusiness />
          </button>
        </div>
        
        <Table title="Products" columns={columns} data={products} />
      </div>
      
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Previous
        </button>

        <span className="px-3 py-1">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Edit Product Modal */}
      <Modal isOpen={isEditModalOpen} 
        onRequestClose={() => setIsEditModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay with semi-transparent background
            zIndex: 1000, // Ensure modal is above other content
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%", // Adjust width
            maxWidth: "600px", // Optional: max width for modal
            padding: "20px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1001, // Ensure content is above the overlay
          },
        }}
      >
        <div className="p-4">
          <h2>Edit Product</h2>
          {/* Existing Edit Modal Form */}
          <div>
            <label>Name</label>
            <input
              type="text"
              value={updatedProduct.name}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              className="border p-2 mt-2 w-full"
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              value={updatedProduct.description}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
              className="border p-2 mt-2 w-full"
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              value={updatedProduct.price}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              className="border p-2 mt-2 w-full"
            />
          </div>
          <div>
            <label>Stock Quantity</label>
            <input
              type="number"
              value={updatedProduct.stock_quantity}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, stock_quantity: e.target.value })}
              className="border p-2 mt-2 w-full"
            />
          </div>
          <div>
            <label>Category ID</label>
            <input
              type="text"
              value={updatedProduct.category_id}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, category_id: e.target.value })}
              className="border p-2 mt-2 w-full"
            />
          </div>

          <div>
            <label>Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageFilesChange} 
              className="border p-2 mt-2 w-full"
            />
            {imageFiles && Array.from(imageFiles).map((file, i) => (
            <img
              key={i}
              src={URL.createObjectURL(file)}
              alt={`preview-${i}`}
              className="w-20 h-20 object-cover mt-2 mr-2 inline-block"
            />
          ))}
          </div>
          <button
          onClick={handleUpdateProduct}
          disabled={isUpdating}
          className={`mt-4 p-2 text-white ${isUpdating ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {isUpdating ? "Updating..." : "Update"}
        </button>

        </div>
      </Modal>

      {/* Add Product Modal */}
      <Modal isOpen={isAddModalOpen} 
        onRequestClose={() => setIsAddModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay with semi-transparent background
            zIndex: 1000, // Ensure modal is above other content
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%", // Adjust width
            maxWidth: "600px", // Optional: max width for modal
            padding: "20px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1001, // Ensure content is above the overlay
          },
        }}
      >
        <div className="p-4">
          <h2>Add Product</h2>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="border p-2 mt-2 w-full"
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="border p-2 mt-2 w-full"
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="border p-2 mt-2 w-full"
            />
          </div>
          <div>
            <label>Stock Quantity</label>
            <input
              type="number"
              value={updatedProduct.stock_quantity}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, stock_quantity: e.target.value })}
              className="border p-2 mt-2 w-full"
            />
          </div>
          <div>
            <label>Category ID</label>
            <input
              type="text"
              value={updatedProduct.category_id}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, category_id: e.target.value })}
              className="border p-2 mt-2 w-full"
            />
          </div>

          <div>
            <label>Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageFilesChange} 
              className="border p-2 mt-2 w-full"
            />
            {imageFiles && Array.from(imageFiles).map((file, i) => (
            <img
              key={i}
              src={URL.createObjectURL(file)}
              alt={`preview-${i}`}
              className="w-20 h-20 object-cover mt-2 mr-2 inline-block"
            />
          ))}
          </div>
          <button
            onClick={handleAddProduct}
            disabled={isAdding}
            className={`mt-4 p-2 text-white ${isAdding ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {isAdding ? "Adding..." : "Add"}
          </button>

        </div>
      </Modal>
    </div>
  );
};

export default ProductList;
