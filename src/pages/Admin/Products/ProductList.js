



// // src/pages/ManageProducts.jsx
// import React, { useState, useEffect } from "react";
// import Table from "../../../components/Table";
// import { getAllProducts } from "../../../api/apiProducts"; // Make sure this exists and is exported

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Define columns for the products table
//   const columns = [
//     { Header: "ID", accessor: "product_id" },
//     { Header: "Name", accessor: "name" },
//     { Header: "Description", accessor: "description" },
//     {
//       Header: "Image",
//       accessor: "images", // backend returns images array
//       Cell: ({ row }) => {
//         const image =
//           row.original.images?.find(img => img.is_primary) ||
//           row.original.images?.[0];
//         return image ? (
//           <img
//             src={image.image_url}
//             alt={row.original.name}
//             className="w-12 h-12 object-cover rounded"
//           />
//         ) : (
//           <span className="text-gray-400">No image</span>
//         );
//       },
//     },
//     { Header: "Price", accessor: "price" },
//     { Header: "Stock", accessor: "stock_quantity" },
//     { Header: "Category ID", accessor: "category_id" },
//   ];

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await getAllProducts(); // Make sure this returns { data: [...] }
//         setProducts(data.data); // `data.data` is the array of products
//       } catch (err) {
//         setError(err.message || "Failed to fetch products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) return <p>Loading products...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return <Table title="Products" columns={columns} data={products} />;
// };

// export default ProductList;



// import React, { useState, useEffect } from "react";
// import Table from "../../../components/Table"; // Your table component
// import { getAllProducts } from "../../../api/apiProducts"; // Must support page & limit query

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [limit] = useState(10); // Items per page
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Define columns for the products table
//   const columns = [
//     { Header: "ID", accessor: "product_id" },
//     { Header: "Name", accessor: "name" },
//     { Header: "Description", accessor: "description" },
//     {
//       Header: "Image",
//       accessor: "images", // This comes as an array from backend
//       Cell: ({ value, row }) => {
//         const images = value;
//         const product = row?.original || {};
//         const image = images?.find(img => img.is_primary) || images?.[0];
//         const imageUrl = image?.image_url || "/placeholder.jpg";  // Fallback to placeholder

//         return image ? (
//           <img
//             src={imageUrl}
//             alt={product.name || "Product image"}
//             className="w-12 h-12 object-cover rounded"
//           />
//         ) : (
//           <span className="text-gray-400">No image</span>
//         );
//       },
//     },
//     { Header: "Price", accessor: "price" },
//     { Header: "Stock", accessor: "stock_quantity" },
//     { Header: "Category ID", accessor: "category_id" },
//   ];

//   // Fetch products
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

//   // Pagination controls
//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   // UI Rendering
//   if (loading) return <p className="text-center">Loading products...</p>;
//   if (error) return <p className="text-red-600 text-center">Error: {error}</p>;

//   return (
//     <div className="p-4">
//       <Table title="Products" columns={columns} data={products} />

//       {/* Pagination */}
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
//     </div>
//   );
// };

// export default ProductList;

import React, { useState, useEffect } from "react";
import Table from "../../../components/Table"; // Your table component
import { getAllProducts } from "../../../api/apiProducts"; // Must support page & limit query

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10); // Items per page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define columns for the products table
  const columns = [
    { Header: "ID", accessor: "product_id" },
    { Header: "Name", accessor: "name" },
    { Header: "Description", accessor: "description" },
    {
      Header: "Image",
      accessor: "images", // This comes as an array from backend
      Cell: ({ value, row }) => {
        const images = value;
        const product = row?.original || {};

        // Find the primary image, or fallback to the first image if no primary
        const image = images?.find(img => img.is_primary) || images?.[0];

        // Ensure it's a Cloudinary URL or fallback to placeholder if not
        const imageUrl = image?.image_url
          ? image.image_url // Assuming Cloudinary URL is directly returned
          : "/placeholder.jpg"; // Placeholder image URL

        return image ? (
          <img
            src={imageUrl}
            alt={product.name || "Product image"}
            className="w-12 h-12 object-cover rounded"
          />
        ) : (
          <span className="text-gray-400">No image</span>
        );
      },
    },
    { Header: "Price", accessor: "price" },
    { Header: "Stock", accessor: "stock_quantity" },
    { Header: "Category ID", accessor: "category_id" },
  ];

  // Fetch products
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

  // Pagination controls
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // UI Rendering
  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-red-600 text-center">Error: {error}</p>;

  return (
    <div className="p-4">
      <Table title="Products" columns={columns} data={products} />

      {/* Pagination */}
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
    </div>
  );
};

export default ProductList;
