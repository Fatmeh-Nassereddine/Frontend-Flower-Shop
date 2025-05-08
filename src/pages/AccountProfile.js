





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getFavorites } from '../api/apiFavorite'; 
import { getOrderItemsByUser } from '../api/apiOrders';

const AccountProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    address: '',
  });
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);

  const getUser = async () => {
    try {
      const response = await axios.get('https://backend-flower-shop.onrender.com/api/auth/verify', {
        withCredentials: true,
      });
      if (!response.data.success) {
        console.error('User verification failed');
      }
    } catch (error) {
      console.error('Failed to verify user:', error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUser();

        const profileResponse = await axios.get('https://backend-flower-shop.onrender.com/api/users/me', {
          withCredentials: true,
        });

        const { name, email, address } = profileResponse.data.user;

        setProfile({
          fullName: name,
          email,
          address,
        });

        const favoritesData = await getFavorites();
        setFavorites(favoritesData);

        const ordersData = await getOrderItemsByUser(); // Optional: You can use ordersData if needed
        setOrders(ordersData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        'https://backend-flower-shop.onrender.com/api/users/me',
        {
          name: profile.fullName,
          email: profile.email,
          address: profile.address,
        },
        {
          withCredentials: true,
        }
      );

      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-[#593825]">Personal Information</h2>
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="text-sm px-4 py-1 border rounded hover:bg-gray-100 text-[#593825]"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="text-sm px-4 py-1 border rounded hover:bg-gray-100 text-[#593825]"
                >
                  Edit Profile
                </button>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-800">
              <div>
                <p className="font-semibold text-[#593825]">Full Name</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1"
                  />
                ) : (
                  <p>{profile.fullName}</p>
                )}
              </div>
              <div>
                <p className="font-semibold text-[#593825]">Email Address</p>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1"
                  />
                ) : (
                  <p>{profile.email}</p>
                )}
              </div>
              <div>
                <p className="font-semibold text-[#593825]">Address</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1"
                  />
                ) : (
                  <p>{profile.address}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="bg-white shadow rounded-lg p-6 text-sm text-gray-800">
            <h2 className="text-lg font-medium mb-2 text-[#593825]">My Orders</h2>
            {orders.length > 0 ? (
              <ul>
                {orders.map((order, index) => (
                  <li key={index} className="mb-2">
                    <div>Order ID: {order.orderId}</div>
                    <div>Item: {order.productName}</div>
                    <div>Quantity: {order.quantity}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You have no orders yet.</p>
            )}
          </div>
        );
        case 'favorites':
            return (
              <div className="bg-white shadow rounded-lg p-6 text-sm text-gray-800">
                <h2 className="text-lg font-medium mb-2 text-[#593825]">Favorites</h2>
                {favorites.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {favorites.map((favorite) => (
                      <li key={favorite.product_id} className="border p-3 rounded-lg flex items-center gap-4">
                        <img
                          src={favorite.image_url || "/images/default-product.jpg"}
                          alt={favorite.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold text-[#593825]">{favorite.name}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Your favorite items will appear here.</p>
                )}
              </div>
            );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4 text-[#593825]">My Account</h1>

        <div className="flex flex-wrap gap-2 mb-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-1 border px-4 py-2 rounded-full text-[#593825] ${
              activeTab === 'profile' ? 'bg-gray-200' : 'hover:bg-[#D63384]'
            }`}
          >
            <PersonIcon fontSize="small" /> Profile
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-1 border px-4 py-2 rounded-full text-[#593825] ${
              activeTab === 'orders' ? 'bg-gray-200' : 'hover:bg-[#D63384]'
            }`}
          >
            <ReceiptLongIcon fontSize="small" /> My Orders
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-1 border px-4 py-2 rounded-full text-[#593825] ${
              activeTab === 'favorites' ? 'bg-gray-200' : 'hover:bg-[#D63384]'
            }`}
          >
            <FavoriteBorderIcon fontSize="small" /> Favorites
          </button>
        </div>

        {renderContent()}
      </div>
      <Footer />
    </>
  );
};

export default AccountProfile;
