
// import React, { useState, useEffect } from "react";
// const UserList = () => {
// // src/pages/Users.jsx
//  const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // For adding a new user (delete functionality is kept)
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newUser, setNewUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//   });

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       // For testing, using a hard-coded token; in production, set it after login.
//       // const token =
//       //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJTYW1pQGV4YW1wbGUuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzQyOTUyNDI3LCJleHAiOjE3NDM1NTcyMjd9.dAXhrlOXxZkFOXXQn7FNRqMG20hm4Fo0kn8PO59lN_s";
//       const token = localStorage.setItem("token", token);
//       if (!token) {
//         throw new Error("No token found. Please log in first.");
//       }
//       const response = await fetch("http://localhost:5000/api/user/allusers", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error(`Request failed with status ${response.status}`);
//       }
//       const data = await response.json();
//       setUsers(data.data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Delete User function
//   const handleDeleteUser = async (userId) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("No token found. Please log in first.");
//       }
//       const response = await fetch(`http://localhost:5000/api/user/deleteuser/${userId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error(`Delete failed with status ${response.status}`);
//       }
//       await fetchUsers();
//     } catch (err) {
//       alert("Error deleting user: " + err.message);
//     }
//   };

//   // =========================
//   // Render
//   // =========================
//   if (loading) return <p>Loading users...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-3xl font-bold text-gray-800">Users</h2>
//         <button className="bg-black text-white px-6 py-2 rounded-lg shadow-lg hover:opacity-90">
//           ADD User
//         </button>
//       </div>
//       <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-black">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                 ID
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                 Phone
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                 Role
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                 Created At
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {users.map((user, index) => (
//               <tr key={user.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {user.id}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {user.name}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {user.email}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {user.phone}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {user.role}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {new Date(user.created_at).toLocaleString()}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <button
//                     onClick={() => handleDeleteUser(user.id)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };


  
//   export default UserList;