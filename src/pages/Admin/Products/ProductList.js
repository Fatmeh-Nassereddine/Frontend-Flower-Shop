

// import EditProduct from "./EditProduct";

// const ProductList = () => {
//     return (
//       <>
//       <div>
 
//         <h2 className="text-2xl font-semibold mb-4">All Products</h2>
//         <p>Table of all products with actions to edit/delete.</p>
       
//       </div>
//       <div>
//         <EditProduct />
//         <table className="min-w-full">
//           <thead>
//             <tr>
//               <th className="px-4 py-2">Product Name</th>
//           <th className="px-4 py-2">Price</th>
//           <th className="px-4 py-2">Actions</th>
//           </tr>
//           </thead>
//           <tbody>
//             {/* Map through products and render rows */}
//             {products.map(product => (
//               <tr key={product.id}>
//                 <td className="border px-4 py-2">{product.name}</td>
//                 <td className="border px-4 py-2">{product.price}</td>
//                 <td className="border px-4 py-2"></td>
//                 <button className="bg-blue-500 text-white px-2 py-1">Edit</button>
//                 <button className="bg-red-500 text-white px-2 py-1">Delete</button>
//                 </td>
//                 </tr>
//                 ))}
//                 </tr>
//             ))}
//             </tr>

//               </tr>
//               ))}
//               </tbody>
//               </table>
//             </div>
//       </>
//     );
//   };
  
//   export default ProductList;
  


// import EditProduct from "./EditProduct";
// import { useState } from "react";
// import AddProduct from "./AddProduct";

// const ProductList = () => {
//   // Example product list for demonstration
//   const [products, setProducts] = useState([
//     { id: 1, name: "flower", price: "$20" },
//     { id: 2, name: "flower2", price: "$25" },
//   ]);

//   return (
//     <>
//       <div>
//         <h2 className="text-2xl font-semibold mb-4">All Products</h2>
//         <p>Table of all products with actions to edit/delete.</p>
//       </div>

//       <div className="mt-6">
//       <AddProduct/>
//         <EditProduct />

//         <table className="min-w-full border mt-4">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="px-4 py-2 border">Product Name</th>
//               <th className="px-4 py-2 border">Price</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.id}>
//                 <td className="border px-4 py-2">{product.name}</td>
//                 <td className="border px-4 py-2">{product.price}</td>
//                 <td className="border px-4 py-2">
//                   <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
//                     Edit
//                   </button>
//                   <button className="bg-red-500 text-white px-3 py-1 rounded">
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default ProductList;



// src/pages/ManageProducts.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../../components/Table";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // To handle edit state
  const [showModal, setShowModal] = useState(false);

  // Function to fetch products
  // const fetchProducts = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/api/products", {
  //       withCredentials: true,
  //     });
  //     setProducts(response.data);
  //   } catch (err) {
  //     setError(err.response?.data?.message || err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Fetch products on component mount
  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // Function to delete a product
  const handleDelete = async (product_id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${product_id}`, {
        withCredentials: true,
      });
      setProducts((prev) => prev.filter((p) => p.product_id !== product_id));
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product");
    }
  };

  // Columns for the table
  const columns = [
    { Header: "ID", accessor: "product_id" },
    { Header: "Name", accessor: "name" },
    { Header: "Description", accessor: "description" },
    {
      Header: "Image",
      accessor: "image_url",
      Cell: (row) => (
        <img src={row.image_url} alt={row.name} className="w-12 h-12 object-cover rounded" />
      ),
    },
    { Header: "Price", accessor: "price" },
    { Header: "Stock", accessor: "stock_quantity" },
    { Header: "Category ID", accessor: "category_id" },
    { Header: "Season ID", accessor: "season_id" },
    {
      Header: "Actions",
      Cell: (row) => (
        <div className="space-x-2">
          <button
            onClick={() => {
              setSelectedProduct(row);
              setShowModal(true);
            }}
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.product_id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <Table title="Manage Products" columns={columns} data={products} />
      <button
        onClick={() => {
          setSelectedProduct(null);
          setShowModal(true);
        }}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Product
      </button>
      {showModal && (
        <ProductForm
          product={selectedProduct}
          onClose={() => setShowModal(false)}
          // onSubmit={fetchProducts}
        />
      )}
    </div>
  );
};

export default ProductList;
