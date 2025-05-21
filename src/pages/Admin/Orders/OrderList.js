
  





// import React, { useState, useEffect } from "react";
// import Modal from "react-modal";
// import { toast } from "react-toastify";
// import {
//   MdOutlineAddBusiness,
//   MdRebaseEdit,
//   MdDeleteSweep,
//   MdClose,
// } from "react-icons/md";
// import Table from "../../../components/Table";
// import {
//   getAllOrders,
//   getOrderItemsByOrderId,
//   deleteOrder,
//   deleteOrderItem,
//   updateOrderStatus,
// } from "../../../api/apiOrders";

// const OrderList = () => {
//   const [orders, setOrders] = useState([]);
//   const [expandedOrderId, setExpandedOrderId] = useState(null);
//   const [orderItems, setOrderItems] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [statusInput, setStatusInput] = useState("");

//   // Fetch orders on mount
//   const fetchOrders = async () => {
//     const { error, data } = await getAllOrders();
//     if (!error) setOrders(data);
//     else toast.error("Failed to fetch orders");
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // Delete order handler
//   const handleDeleteOrder = async (order_id) => {
//     if (!window.confirm("Are you sure you want to delete this order?")) return;
//     const { error } = await deleteOrder(order_id);
//     if (!error) {
//       toast.success("Order deleted successfully");
//       fetchOrders();
//     } else toast.error("Failed to delete order");
//   };

//   // Expand/collapse order items
//   const handleToggleExpand = async (order_id) => {
//     if (expandedOrderId === order_id) {
//       setExpandedOrderId(null);
//       return;
//     }
//     const { error, data } = await getOrderItemsByOrderId(order_id);
//     if (!error) {
//       setOrderItems((prev) => ({ ...prev, [order_id]: data }));
//       setExpandedOrderId(order_id);
//     } else toast.error("Failed to fetch order items");
//   };

//   // Delete order item handler
//   const handleDeleteOrderItem = async (order_id, item_id) => {
//     if (!window.confirm("Delete this order item?")) return;
//     const { error } = await deleteOrderItem(order_id, item_id);
//     if (!error) {
//       toast.success("Order item deleted");
//       // Refresh items for this order:
//       handleToggleExpand(order_id);
//     } else toast.error("Failed to delete order item");
//   };

//   // Open modal for editing status
//   const openEditModal = (order) => {
//     setSelectedOrderId(order.order_id);
//     setStatusInput(order.status || "");
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedOrderId(null);
//     setStatusInput("");
//   };

//   // Submit modal (update status)
//   const handleSubmit = async () => {
//     if (!statusInput) {
//       toast.error("Status cannot be empty");
//       return;
//     }

//     const { error } = await updateOrderStatus(selectedOrderId, statusInput);
//     if (!error) {
//       toast.success("Order status updated");
//       fetchOrders();
//       closeModal();
//     } else {
//       toast.error("Failed to update status");
//     }
//   };

//   // Orders table columns
//   const orderColumns = [
//     { Header: "Order ID", accessor: "order_id" },
//     { Header: "User ID", accessor: "user_id" },
//     { Header: "Total", accessor: "total_amount" },
//     { Header: "Status", accessor: "status" },
//     {
//       Header: "Actions",
//       Cell: ({ row }) => (
//         <div className="flex gap-2 items-center">
//           <button
//             onClick={() => handleToggleExpand(row.original.order_id)}
//             className="text-green-600 hover:text-green-800"
//             title="View Items"
//           >
//             <MdOutlineAddBusiness size={20} />
//           </button>
//           <button
//             onClick={() => openEditModal(row.original)}
//             className="text-yellow-600 hover:text-yellow-800"
//             title="Edit Status"
//           >
//             <MdRebaseEdit size={20} />
//           </button>
//           <button
//             onClick={() => handleDeleteOrder(row.original.order_id)}
//             className="text-red-500 hover:text-red-700"
//             title="Delete Order"
//           >
//             <MdDeleteSweep size={20} />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   // Render order items table
//   const renderOrderItems = (order_id) => {
//     if (!orderItems[order_id]) return null;
//     const items = orderItems[order_id];

//     const itemColumns = [
//       { Header: "Item ID", accessor: "order_item_id" },
//       { Header: "Product ID", accessor: "product_id" },
//       { Header: "Quantity", accessor: "quantity" },
//       { Header: "Price", accessor: "subtotal" },
//       {
//         Header: "Actions",
//         Cell: ({ row }) => (
//           <button
//             onClick={() =>
//               handleDeleteOrderItem(order_id, row.original.order_item_id)
//             }
//             className="text-red-500 hover:text-red-700"
//             title="Delete Item"
//           >
//             <MdDeleteSweep size={20} />
//           </button>
//         ),
//       },
//     ];

//     return (
//       <div className="my-4 ml-4">
//         <Table
//           title={`Items for Order ${order_id}`}
//           columns={itemColumns}
//           data={items}
//         />
//       </div>
//     );
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Orders</h1>

//       {orders.length > 0 ? (
//         <Table title="Order List" columns={orderColumns} data={orders} />
//       ) : (
//         <div className="text-gray-500 text-center py-4">No orders found.</div>
//       )}

//       {expandedOrderId && renderOrderItems(expandedOrderId)}

//       {/* Modal for editing status */}
//       {isModalOpen && (
//         <Modal
//           isOpen={isModalOpen}
//           onRequestClose={closeModal}
//           contentLabel="Edit Order Status"
//           className="w-full max-w-md p-6 bg-white rounded shadow-md relative mx-auto mt-20"
//           overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//           ariaHideApp={false}
//         >
//           <div>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Update Order Status</h2>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-500 hover:text-gray-800"
//                 title="Close"
//               >
//                 <MdClose size={22} />
//               </button>
//             </div>

//             <label className="block mb-2 font-medium">Status</label>
//             <input
//               type="text"
//               value={statusInput}
//               onChange={(e) => setStatusInput(e.target.value)}
//               className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
//               placeholder="Enter new status"
//             />

//             <div className="flex justify-end">
//               <button
//                 onClick={handleSubmit}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//               >
//                 Save Status
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default OrderList;




import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import {
  MdOutlineAddBusiness,
  MdRebaseEdit,
  MdDeleteSweep,
  MdClose,
} from "react-icons/md";
import Table from "../../../components/Table";
import {
  getAllOrders,
  getOrderItemsByOrderId,
  deleteOrder,
  deleteOrderItem,
  updateOrderStatus,
} from "../../../api/apiOrders";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orderItems, setOrderItems] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [statusInput, setStatusInput] = useState("");

  const fetchOrders = async () => {
    const { error, data } = await getAllOrders();
    if (!error) setOrders(data);
    else toast.error("Failed to fetch orders");
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDeleteOrder = async (order_id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    const { error } = await deleteOrder(order_id);
    if (!error) {
      toast.success("Order deleted successfully");
      fetchOrders();
    } else toast.error("Failed to delete order");
  };

  const handleToggleExpand = async (order_id) => {
    if (expandedOrderId === order_id) {
      setExpandedOrderId(null);
      return;
    }
    const { error, data } = await getOrderItemsByOrderId(order_id);
    if (!error) {
      setOrderItems((prev) => ({ ...prev, [order_id]: data }));
      setExpandedOrderId(order_id);
    } else toast.error("Failed to fetch order items");
  };

  const handleDeleteOrderItem = async (order_id, item_id) => {
    if (!window.confirm("Delete this order item?")) return;
    const { error } = await deleteOrderItem(order_id, item_id);
    if (!error) {
      toast.success("Order item deleted");
      handleToggleExpand(order_id);
    } else toast.error("Failed to delete order item");
  };

  const openEditModal = (order) => {
    setSelectedOrderId(order.order_id);
    setStatusInput(order.status || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
    setStatusInput("");
  };

  const handleSubmit = async () => {
    if (!statusInput) {
      toast.error("Status cannot be empty");
      return;
    }

    const { error } = await updateOrderStatus(selectedOrderId, statusInput);
    if (!error) {
      toast.success("Order status updated");
      fetchOrders();
      closeModal();
    } else {
      toast.error("Failed to update status");
    }
  };

  const orderColumns = [
    { Header: "Order ID", accessor: "order_id" },
    { Header: "User ID", accessor: "user_id" },
    { Header: "Total", accessor: "total_amount" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => handleToggleExpand(row.original.order_id)}
            className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
            title="View Items"
          >
            <MdOutlineAddBusiness size={20} />
          </button>
          <button
            onClick={() => openEditModal(row.original)}
            className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300"
            title="Edit Status"
          >
            <MdRebaseEdit size={20} />
          </button>
          <button
            onClick={() => handleDeleteOrder(row.original.order_id)}
            className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
            title="Delete Order"
          >
            <MdDeleteSweep size={20} />
          </button>
        </div>
      ),
    },
  ];

  const renderOrderItems = (order_id) => {
    if (!orderItems[order_id]) return null;
    const items = orderItems[order_id];

    const itemColumns = [
      { Header: "Item ID", accessor: "order_item_id" },
      { Header: "Product ID", accessor: "product_id" },
      { Header: "Quantity", accessor: "quantity" },
      { Header: "Price", accessor: "subtotal" },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <button
            onClick={() =>
              handleDeleteOrderItem(order_id, row.original.order_item_id)
            }
            className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
            title="Delete Item"
          >
            <MdDeleteSweep size={20} />
          </button>
        ),
      },
    ];

    return (
      <div className="my-4 ml-4">
        <Table
          title={`Items for Order ${order_id}`}
          columns={itemColumns}
          data={items}
        />
      </div>
    );
  };

  return (
    <div className="p-4 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {orders.length > 0 ? (
        <Table title="Order List" columns={orderColumns} data={orders} />
      ) : (
        <div className="text-gray-500 dark:text-gray-400 text-center py-4">
          No orders found.
        </div>
      )}

      {expandedOrderId && renderOrderItems(expandedOrderId)}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Order Status"
          className="w-full max-w-md p-6 bg-white dark:bg-gray-800 dark:text-white rounded shadow-md relative mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          ariaHideApp={false}
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Update Order Status</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                title="Close"
              >
                <MdClose size={22} />
              </button>
            </div>

            <label className="block mb-2 font-medium">Status</label>
            <input
              type="text"
              value={statusInput}
              onChange={(e) => setStatusInput(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded px-3 py-2 mb-4"
              placeholder="Enter new status"
            />

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white px-4 py-2 rounded transition"
              >
                Save Status
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrderList;
