// // src/pages/Orders.jsx
// import React, { useState, useEffect } from "react";

// const OrderList = () => {
//   // =========================
//   // State for Orders
//   // =========================
//   const [orders, setOrders] = useState([]);
//   const [expandedOrderId, setExpandedOrderId] = useState(null); // which order is expanded
//   const [orderItemsMap, setOrderItemsMap] = useState({});       // {orderId: [...items]}
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // =========================
//   // State for Editing an Existing Order
//   // =========================
//   const [editingOrder, setEditingOrder] = useState(null);
//   const [showOrderModal, setShowOrderModal] = useState(false);

//   // =========================
//   // State for Adding a New Order
//   // =========================
//   const [showAddOrderModal, setShowAddOrderModal] = useState(false);
//   const [newOrder, setNewOrder] = useState({
//     user_id: "",
//     total_amount: "",
//     status: "IN_PROGRESS",
//   });

//   // =========================
//   // State for Adding/Editing an Order Item
//   // =========================
//   const [showItemModal, setShowItemModal] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [currentOrderId, setCurrentOrderId] = useState(null);

//   // =========================
//   // 1. Fetch All Orders
//   // =========================
//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/orders");
//       if (!response.ok) {
//         throw new Error(`Request failed with status ${response.status}`);
//       }
//       const data = await response.json();
//       setOrders(data);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // 2. Fetch Items for a Specific Order
//   // =========================
//   const fetchOrderItems = async (orderId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/orderItems/byOrder/${orderId}`);
//       if (!response.ok) {
//         throw new Error(`Failed to fetch items for order ${orderId}`);
//       }
//       const data = await response.json();
//       setOrderItemsMap((prev) => ({
//         ...prev,
//         [orderId]: data,
//       }));
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   // =========================
//   // useEffect to Fetch Orders on Mount
//   // =========================
//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // =========================
//   // 3. Expand/Collapse Items
//   // =========================
//   const handleToggle = (orderId) => {
//     if (expandedOrderId === orderId) {
//       setExpandedOrderId(null);
//     } else {
//       setExpandedOrderId(orderId);
//       if (!orderItemsMap[orderId]) {
//         fetchOrderItems(orderId);
//       }
//     }
//   };

//   // =========================
//   // 4. Order CRUD (Edit, Delete, Add)
//   // =========================

//   // Show the Edit Order modal
//   const handleShowEditOrderModal = (order) => {
//     setEditingOrder(order);
//     setShowOrderModal(true);
//   };

//   // Hide the Edit Order modal
//   const handleHideOrderModal = () => {
//     setShowOrderModal(false);
//     setEditingOrder(null);
//   };

//   // Handle changes in the Edit Order form
//   const handleOrderInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditingOrder((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Submit the Edit Order form
//   const handleUpdateOrder = async (e) => {
//     e.preventDefault();
//     if (!editingOrder) return;
//     try {
//       const response = await fetch(`http://localhost:5000/api/orders/${editingOrder.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editingOrder),
//       });
//       if (!response.ok) {
//         throw new Error(`Update failed with status ${response.status}`);
//       }
//       fetchOrders();
//       handleHideOrderModal();
//     } catch (err) {
//       alert("Error updating order: " + err.message);
//     }
//   };

//   // Delete an Order
//   const handleDeleteOrder = async (orderId) => {
//     if (!window.confirm("Are you sure you want to delete this order?")) return;
//     try {
//       const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
//         method: "DELETE",
//       });
//       if (!response.ok) {
//         throw new Error(`Delete failed with status ${response.status}`);
//       }
//       fetchOrders();
//     } catch (err) {
//       alert("Error deleting order: " + err.message);
//     }
//   };

//   // Show the Add Order modal
//   const handleShowAddOrderModal = () => {
//     setShowAddOrderModal(true);
//   };

//   // Hide the Add Order modal and Reset newOrder
//   const handleHideAddOrderModal = () => {
//     setShowAddOrderModal(false);
//     setNewOrder({
//       user_id: "",
//       total_amount: "",
//       status: "IN_PROGRESS",
//     });
//   };

//   // Handle input changes in the Add Order form
//   const handleNewOrderChange = (e) => {
//     const { name, value } = e.target;
//     setNewOrder((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Submit the Add Order form
//   const handleCreateOrder = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newOrder),
//       });
//       if (!response.ok) {
//         throw new Error(`Create failed with status ${response.status}`);
//       }
//       fetchOrders();
//       handleHideAddOrderModal();
//     } catch (err) {
//       alert("Error creating order: " + err.message);
//     }
//   };

//   // =========================
//   // 5. Order Item CRUD (Add, Edit, Delete)
//   // =========================

//   // Show the Add Item modal
//   const handleShowAddItemModal = (orderId) => {
//     setCurrentOrderId(orderId);
//     setEditingItem(null);
//     setShowItemModal(true);
//   };

//   // Show the Edit Item modal
//   const handleShowEditItemModal = (orderId, item) => {
//     setCurrentOrderId(orderId);
//     setEditingItem(item);
//     setShowItemModal(true);
//   };

//   // Hide the Item modal
//   const handleHideItemModal = () => {
//     setShowItemModal(false);
//     setEditingItem(null);
//   };

//   // Delete an Order Item
//   const handleDeleteItem = async (orderId, itemId) => {
//     if (!window.confirm("Are you sure you want to delete this item?")) return;
//     try {
//       const res = await fetch(`http://localhost:5000/api/orderItems/${itemId}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) {
//         throw new Error("Failed to delete item");
//       }
//       fetchOrderItems(orderId);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   // Submit the Item Form (Create or Update)
//   const handleSubmitItem = async (e) => {
//     e.preventDefault();
//     const method = editingItem ? "PUT" : "POST";
//     const url = editingItem
//       ? `http://localhost:5000/api/orderItems/${editingItem.id}`
//       : "http://localhost:5000/api/orderItems";
//     const body = editingItem
//       ? {
//           order_id: editingItem.order_id,
//           product_id: editingItem.product_id,
//           quantity: editingItem.quantity,
//         }
//       : {
//           order_id: currentOrderId,
//           product_id: e.target.product_id.value,
//           quantity: e.target.quantity.value,
//         };

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });
//       if (!res.ok) {
//         throw new Error(`Failed with status ${res.status}`);
//       }
//       fetchOrderItems(currentOrderId);
//       handleHideItemModal();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   // =========================
//   // 6. Render
//   // =========================
//   if (loading) return <p>Loading orders...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="p-4">
//       {/* Header with inline "ADD Order" button */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-bold">Orders</h2>
//         <button
//           onClick={handleShowAddOrderModal}
//           className="px-4 py-2 bg-green-800 text-white rounded"
//         >
//           ADD Order
//         </button>
//       </div>

//       {/* Orders Table */}
//       <table className="min-w-full text-left border-collapse mb-8">
//         <thead className="border-b">
//           <tr>
//             <th className="px-4 py-2">Order ID</th>
//             <th className="px-4 py-2">User ID</th>
//             <th className="px-4 py-2">User Name</th> {/* from your backend join */}
//             <th className="px-4 py-2">Order Date</th>
//             <th className="px-4 py-2">Total Amount</th>
//             <th className="px-4 py-2">Status</th>
//             <th className="px-4 py-2">Items</th>
//             <th className="px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => {
//             const isExpanded = expandedOrderId === order.id;
//             return (
//               <React.Fragment key={order.id}>
//                 <tr className="border-b hover:bg-gray-50">
//                   <td className="px-4 py-2">{order.id}</td>
//                   <td className="px-4 py-2">{order.user_id}</td>
//                   <td className="px-4 py-2">{order.user_name}</td>
//                   <td className="px-4 py-2">
//                     {new Date(order.order_date).toLocaleString()}
//                   </td>
//                   <td className="px-4 py-2">{order.total_amount}</td>
//                   <td className="px-4 py-2">{order.status}</td>
//                   <td className="px-4 py-2">
//                     <button
//                       className="px-2 py-1 bg-blue-500 text-white rounded"
//                       onClick={() => handleToggle(order.id)}
//                     >
//                       {isExpanded ? "Hide Items" : "Show Items"}
//                     </button>
//                   </td>
//                   <td className="px-4 py-2">
//                     <button
//                       className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
//                       onClick={() => handleShowEditOrderModal(order)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="px-2 py-1 bg-red-500 text-white rounded"
//                       onClick={() => handleDeleteOrder(order.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//                 {/* Expanded row for order items */}
//                 {isExpanded && (
//                   <tr>
//                     <td colSpan={8} className="p-4 bg-gray-100">
//                       <h3 className="font-semibold mb-2">
//                         Items for Order #{order.id}
//                       </h3>
//                       <button
//                         className="mb-2 px-2 py-1 bg-green-800 text-white rounded"
//                         onClick={() => handleShowAddItemModal(order.id)}
//                       >
//                         Add Item
//                       </button>
//                       {orderItemsMap[order.id] && orderItemsMap[order.id].length > 0 ? (
//                         <table className="min-w-full text-left border-collapse">
//                           <thead className="border-b">
//                             <tr>
//                               <th className="px-4 py-2">ID</th>
//                               <th className="px-4 py-2">Product</th>
//                               <th className="px-4 py-2">Quantity</th>
//                               <th className="px-4 py-2">Actions</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {orderItemsMap[order.id].map((item) => (
//                               <tr key={item.id} className="border-b hover:bg-gray-50">
//                                 <td className="px-4 py-2">{item.id}</td>
//                                 <td className="px-4 py-2">
//                                   {item.product_id}
//                                   {item.product_name && ` - ${item.product_name}`}
//                                 </td>
//                                 <td className="px-4 py-2">{item.quantity}</td>
//                                 <td className="px-4 py-2">
//                                   <button
//                                     className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
//                                     onClick={() =>
//                                       handleShowEditItemModal(order.id, {
//                                         id: item.id,
//                                         order_id: item.order_id,
//                                         product_id: item.product_id,
//                                         quantity: item.quantity,
//                                       })
//                                     }
//                                   >
//                                     Edit
//                                   </button>
//                                   <button
//                                     className="px-2 py-1 bg-red-500 text-white rounded"
//                                     onClick={() => handleDeleteItem(order.id, item.id)}
//                                   >
//                                     Delete
//                                   </button>
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       ) : (
//                         <p>No items found for this order.</p>
//                       )}
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             );
//           })}
//         </tbody>
//       </table>

//       {/* =========================
//           Modal for Adding a New Order
//          ========================= */}
//       {showAddOrderModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
//           <div className="bg-white p-6 rounded w-96">
//             <h3 className="text-xl font-bold mb-4">Add New Order</h3>
//             <form onSubmit={handleCreateOrder} className="space-y-4">
//               <div>
//                 <label className="block mb-1">User ID</label>
//                 <input
//                   type="number"
//                   name="user_id"
//                   value={newOrder.user_id}
//                   onChange={handleNewOrderChange}
//                   className="w-full border px-2 py-1"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Total Amount</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   name="total_amount"
//                   value={newOrder.total_amount}
//                   onChange={handleNewOrderChange}
//                   className="w-full border px-2 py-1"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Status</label>
//                 <select
//                   name="status"
//                   value={newOrder.status}
//                   onChange={handleNewOrderChange}
//                   className="w-full border px-2 py-1"
//                   required
//                 >
//                   <option value="IN_PROGRESS">IN_PROGRESS</option>
//                   <option value="DONE">DONE</option>
//                   <option value="DELIVERED">DELIVERED</option>
//                   <option value="CANCELLED">CANCELLED</option>
//                 </select>
//               </div>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   className="px-4 py-2 bg-gray-300 rounded"
//                   onClick={handleHideAddOrderModal}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="px-4 py-2 bg-green-800 text-white rounded">
//                   Add
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* =========================
//           Modal for Editing an Order
//          ========================= */}
//       {showOrderModal && editingOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
//           <div className="bg-white p-6 rounded w-96">
//             <h3 className="text-xl font-bold mb-4">Edit Order #{editingOrder.id}</h3>
//             <form onSubmit={handleUpdateOrder} className="space-y-4">
//               <div>
//                 <label className="block mb-1">User ID</label>
//                 <input
//                   type="number"
//                   name="user_id"
//                   value={editingOrder.user_id}
//                   onChange={handleOrderInputChange}
//                   className="w-full border px-2 py-1"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Order Date</label>
//                 <input
//                   type="datetime-local"
//                   name="order_date"
//                   value={new Date(editingOrder.order_date).toISOString().slice(0, 16)}
//                   onChange={handleOrderInputChange}
//                   className="w-full border px-2 py-1"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Total Amount</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   name="total_amount"
//                   value={editingOrder.total_amount}
//                   onChange={handleOrderInputChange}
//                   className="w-full border px-2 py-1"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Status</label>
//                 <select
//                   name="status"
//                   value={editingOrder.status}
//                   onChange={handleOrderInputChange}
//                   className="w-full border px-2 py-1"
//                   required
//                 >
//                   <option value="IN_PROGRESS">IN_PROGRESS</option>
//                   <option value="DONE">DONE</option>
//                   <option value="DELIVERED">DELIVERED</option>
//                   <option value="CANCELLED">CANCELLED</option>
//                 </select>
//               </div>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   className="px-4 py-2 bg-gray-300 rounded"
//                   onClick={handleHideOrderModal}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="px-4 py-2 bg-green-800 text-white rounded">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* =========================
//           Modal for Adding/Editing an Order Item
//          ========================= */}
//       {showItemModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
//           <div className="bg-white p-6 rounded w-96">
//             <h3 className="text-xl font-bold mb-4">
//               {editingItem ? "Edit Item" : "Add Item"}
//             </h3>
//             <form onSubmit={handleSubmitItem} className="space-y-4">
//               {editingItem ? (
//                 <>
//                   <div>
//                     <label className="block mb-1">Product ID</label>
//                     <input
//                       type="number"
//                       name="product_id"
//                       value={editingItem.product_id}
//                       onChange={(e) =>
//                         setEditingItem((prev) => ({
//                           ...prev,
//                           product_id: e.target.value,
//                         }))
//                       }
//                       className="w-full border px-2 py-1"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block mb-1">Quantity</label>
//                     <input
//                       type="number"
//                       name="quantity"
//                       value={editingItem.quantity}
//                       onChange={(e) =>
//                         setEditingItem((prev) => ({
//                           ...prev,
//                           quantity: e.target.value,
//                         }))
//                       }
//                       className="w-full border px-2 py-1"
//                       required
//                     />
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div>
//                     <label className="block mb-1">Product ID</label>
//                     <input
//                       type="number"
//                       name="product_id"
//                       className="w-full border px-2 py-1"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block mb-1">Quantity</label>
//                     <input
//                       type="number"
//                       name="quantity"
//                       className="w-full border px-2 py-1"
//                       required
//                     />
//                   </div>
//                 </>
//               )}
//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   className="px-4 py-2 bg-gray-300 rounded"
//                   onClick={() => setShowItemModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="px-4 py-2 bg-green-800 text-white rounded">
//                   {editingItem ? "Update" : "Add"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


  
//   export default OrderList;
  