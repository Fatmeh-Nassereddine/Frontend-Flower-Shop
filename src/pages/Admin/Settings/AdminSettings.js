import React, { useState } from 'react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Address: '',
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can integrate the API call to save the settings
    console.log('Settings saved', settings);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Admin Settings</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="storeName"
            value={settings.storeName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter store name"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="storeEmail"
            value={settings.storeEmail}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter store email"
          />
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            name="storePhone"
            value={settings.storePhone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter store phone number"
          />
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <textarea
            name="storeAddress"
            value={settings.storeAddress}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter store address"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
