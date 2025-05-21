import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { MdDeleteSweep } from "react-icons/md";

const MessageList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = Cookies.get('token'); // Get token from cookies
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/contacts/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContacts(response.data);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to fetch contacts.');
    }
  };

  const handleDelete = async (contact_id) => {
    const confirm = window.confirm("Are you sure you want to delete this contact?");
    if (!confirm) return;

    try {
      const token = Cookies.get('token'); // Get token from cookies
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/contacts/${contact_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      setContacts(contacts.filter((contact) => contact.id !== contact_id));
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete contact.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Contact Submissions</h2>
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">First Name</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Subject</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Message</th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-2 border border-gray-300 dark:border-gray-600">{contact.first_name}</td>
                  <td className="p-2 border border-gray-300 dark:border-gray-600">{contact.email}</td>
                  <td className="p-2 border border-gray-300 dark:border-gray-600">{contact.subject}</td>
                  <td className="p-2 border border-gray-300 dark:border-gray-600">{contact.message}</td>
                  <td className="p-2 border border-gray-300 dark:border-gray-600">
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      title="Delete Message"
                    >
                      <MdDeleteSweep size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MessageList;