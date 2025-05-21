


import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from "../../../api/apiUsers"; // Admin API functions
import { toast } from 'react-toastify';
import { MdDeleteSweep } from "react-icons/md";



const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers(); // Fetch all users
        setUsers(fetchedUsers);
      } catch (error) {
        toast.error("Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);  // Delete user via API
      setUsers(users.filter(user => user.id !== userId)); // Remove from list
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 bg-white dark:bg-gray-900 text-black dark:text-white">User List</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-900  text-black dark:text-white">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">
                <button onClick={() => handleDeleteUser(user.id)}
                 className="text-red-600 hover:text-red-800"
                 title="Delete testimonial"
                    >
                <MdDeleteSweep size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
