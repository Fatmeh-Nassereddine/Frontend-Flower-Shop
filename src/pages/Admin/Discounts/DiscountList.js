import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Modal from "react-modal";
import { MdOutlineAddBusiness, MdRebaseEdit, MdDeleteSweep } from "react-icons/md";

Modal.setAppElement('#root');

const DiscountList = () => {
  const [discounts, setDiscounts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discount_type: '',
    amount: '',
    start_date: '',
    end_date: '',
    max_uses: ''
  });

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/discounts`);
      setDiscounts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (discount = null) => {
    if (discount) {
      setEditingDiscount(discount);
      setFormData({
        code: discount.code || '',
        description: discount.description || '',
        discount_type: discount.discount_type || '',
        amount: discount.amount || '',
        start_date: discount.start_date ? discount.start_date.slice(0, 10) : '',
        end_date: discount.end_date ? discount.end_date.slice(0, 10) : '',
        max_uses: discount.max_uses || ''
      });
    } else {
      setEditingDiscount(null);
      setFormData({
        code: '',
        description: '',
        discount_type: '',
        amount: '',
        start_date: '',
        end_date: '',
        max_uses: ''
      });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingDiscount(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    try {
      if (editingDiscount) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/discounts/${editingDiscount.discount_id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/discounts`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      closeModal();
      fetchDiscounts();
    } catch (error) {
      console.error(error);
      alert("Error saving discount");
    }
  };

  const handleDelete = async (discount_id) => {
    if (!window.confirm("Delete this discount?")) return;
    const token = Cookies.get("token");

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/discounts/${discount_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDiscounts();
    } catch (error) {
      console.error(error);
    }
  };

  const staticDiscounts = [ 
    {
      code: "SPRING15",
      description: "15% off for spring season!",
      discount_type: "percentage",
      amount: 15,
      start_date: "2025-05-14",
      end_date: "2025-06-01",
      max_uses: 50,
      current_uses: 0,
    },
    {
      code: "SUMMER20",
      description: "20% off for summer sale!",
      discount_type: "percentage",
      amount: 20,
      start_date: "2025-06-01",
      end_date: "2025-07-01",
      max_uses: 100,
      current_uses: 0,
    },
    {
      code: "WINTER30",
      description: "30% off for winter discounts!",
      discount_type: "percentage",
      amount: 30,
      start_date: "2025-12-01",
      end_date: "2025-12-31",
      max_uses: 30,
      current_uses: 0,
    },
    {
      code: "BLACKFRIDAY50",
      description: "50% off for Black Friday special!",
      discount_type: "percentage",
      amount: 50,
      start_date: "2025-11-27",
      end_date: "2025-11-30",
      max_uses: 200,
      current_uses: 0,
    },
    {
      code: "NEWYEAR10",
      description: "10% off for New Year celebration!",
      discount_type: "percentage",
      amount: 10,
      start_date: "2025-12-31",
      end_date: "2026-01-05",
      max_uses: 75,
      current_uses: 0,
    },
    {
      code: "WINTERSALE25",
      description: "Flat $25 off on winter items!",
      discount_type: "fixed",
      amount: 25,
      start_date: "2025-12-01",
      end_date: "2025-12-31",
      max_uses: 50,
      current_uses: 0,
    }
  ];

  return (
    <div className="p-6 ">
      <button
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded flex items-center gap-1"
        onClick={() => openModal()}
      >
        <MdOutlineAddBusiness /> Add Discount
      </button>

      <table className="w-full border border-gray-300 rounded dark:bg-gray-900 text-black dark:text-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Code</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Start Date</th>
            <th className="p-2 border">End Date</th>
            <th className="p-2 border">Max Uses</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {discounts.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center p-4">No discounts found.</td>
            </tr>
          ) : (
            discounts.map(d => (
              <tr key={d.discount_id} className="hover:bg-gray-50">
                <td className="border p-2 text-center">{d.code}</td>
                <td className="border p-2 text-center">{d.description}</td>
                <td className="border p-2 text-center">{d.discount_type}</td>
                <td className="border p-2 text-center">{d.amount}</td>
                <td className="border p-2 text-center">{d.start_date ? new Date(d.start_date).toLocaleDateString() : '-'}</td>
                <td className="border p-2 text-center">{d.end_date ? new Date(d.end_date).toLocaleDateString() : '-'}</td>
                <td className="border p-2 text-center">{d.max_uses || '-'}</td>
                <td className="border p-2 flex gap-2 justify-center">
                  <button onClick={() => openModal(d)} title="Edit" className="text-blue-600">
                    <MdRebaseEdit size={20} />
                  </button>
                  <button onClick={() => handleDelete(d.discount_id)} title="Delete" className="text-red-600">
                    <MdDeleteSweep size={20} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
       {/* Static table goes right here */}
    <h3 className="text-lg font-semibold mt-10 mb-2 "> Discount List</h3>
    <table className="w-full border border-gray-300 rounded dark:bg-gray-900 text-black dark:text-white">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Code</th>
          <th className="p-2 border">Description</th>
          <th className="p-2 border">Type</th>
          <th className="p-2 border">Amount</th>
          <th className="p-2 border">Start Date</th>
          <th className="p-2 border">End Date</th>
          <th className="p-2 border">Max Uses</th>
          <th className="p-2 border">Current Uses</th>
        </tr>
      </thead>
      <tbody>
        {staticDiscounts.map((d, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="border p-2 text-center">{d.code}</td>
            <td className="border p-2 text-center">{d.description}</td>
            <td className="border p-2 text-center">{d.discount_type}</td>
            <td className="border p-2 text-center">{d.amount}</td>
            <td className="border p-2 text-center">{new Date(d.start_date).toLocaleDateString()}</td>
            <td className="border p-2 text-center">{new Date(d.end_date).toLocaleDateString()}</td>
            <td className="border p-2 text-center">{d.max_uses}</td>
            <td className="border p-2 text-center">{d.current_uses}</td>
          </tr>
        ))}
      </tbody>
    </table>
    {/* Static table ends here */}


      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Discount Modal"
        className="max-w-lg mx-auto mt-20 bg-white p-6 rounded shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingDiscount ? "Edit Discount" : "Add Discount"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Code *</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1">Discount Type *</label>
            <select
              name="discount_type"
              value={formData.discount_type}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select type</option>
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Amount *</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1">End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1">Max Uses</label>
            <input
              type="number"
              name="max_uses"
              value={formData.max_uses}
              onChange={handleChange}
              min="0"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editingDiscount ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DiscountList;
