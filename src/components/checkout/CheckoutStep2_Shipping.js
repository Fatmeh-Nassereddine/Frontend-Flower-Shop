import React, { useEffect, useState } from 'react';
import { fetchShippingOptions } from '../../api/apiShipping';
import { getUser } from '../../api/auth';
import { getUserCart } from '../../api/apiCart';
import { createAddress } from "../../api/apiAddress"; // Import the createAddress function
import { toast } from 'react-toastify'; // Assuming you're using toast notifications

const Step2 = ({
  nextStep,
  prevStep,
  setShippingFee,
  productPrice,
  shippingCost,
  setShippingCost, // <-- make sure this is here
}) => {
  const [options, setOptions] = useState([]);
  const [address, setAddress] = useState({
    street_address: "",
    city: "",
    governorate: "",
    phone_number: "",
  });
  const [createdAddressId, setCreatedAddressId] = useState(null);
  const [user, setUser] = useState(null); // Store user information
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUser = async () => {
      try {
        const userData = await getUser(); // Fetch user info
        setUser(userData); // Store the user info
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      getUserCart(user.id)
        .then((cart) => {
          setCartItems(cart.items || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load cart:', err);
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    fetchShippingOptions()
      .then((data) => setOptions(data))
      .catch((err) => console.error('Error loading shipping options:', err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Handle creating address
  const handleCreateAddress = async () => {
    if (!user || !address.street_address || !address.city || !address.governorate || !address.phone_number) {
      toast.error("Please fill out all address fields");
      return;
    }

    try {
      // Call the createAddress function with the address and user_id
      const result = await createAddress({
        ...address,
        user_id: user.id, // Pass the user ID here
      });
      console.log('Response from API:', result); // Log the full API response

      // Check the response structure
      if (result && 'insertId' in result) {
        toast.success("Address added successfully");
        setCreatedAddressId(result.insertId); // Store the created address ID
      } else {
        toast.error("Failed to create address");
      }
    } catch (error) {
      console.error("Error creating address:", error);
      toast.error("Failed to create address");
    }
  };

  const handleContinue = async () => {
    setShippingFee(shippingCost);
    nextStep();
  };

  const cartSubtotal = cartItems.reduce((sum, item) => {
    return sum + (item.product_price || 0) * (item.quantity || 0);
  }, 0);

  // Ensure shippingCost is a number and total is correctly calculated
const total = Number(cartSubtotal) + (Number(shippingCost) || 0); // Ensure it's a number

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Shipping Form */}
      <div className="lg:col-span-2 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            name="fullName"
            value={user ? user.name : ''}
            readOnly
            className="p-2 border rounded"
            placeholder="Full Name"
          />
          <input
            name="email"
            value={user ? user.email : ''}
            readOnly
            className="p-2 border rounded"
            placeholder="Email"
          />
        </div>
        <input
          name="street_address"
          value={address.street_address}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border rounded"
          placeholder="Street Address"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            name="city"
            value={address.city}
            onChange={handleInputChange}
            className="p-2 border rounded"
            placeholder="City"
          />
          <input
            name="governorate"
            value={address.governorate}
            onChange={handleInputChange}
            className="p-2 border rounded"
            placeholder="Governorate"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            name="phone_number"
            value={address.phone_number}
            onChange={handleInputChange}
            className="p-2 border rounded"
            placeholder="Phone Number"
          />

          {/* Create Address Button positioned next to the phone number */}
          <button
            onClick={handleCreateAddress}
            className="mt-4 sm:mt-0 w-full sm:w-auto text-white py-2 rounded sm:ml-4 col-span-2 sm:col-span-1"
            style={{ backgroundColor: '#D63384' }}
            onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#B03074'; // Darker pink on hover
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#D63384'; // Reset to original color when not hovering
                }}
            >
            Create Address
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Shipping Method</label>
          <div className="space-y-2">
            {options.map((method, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-4 border rounded cursor-pointer ${
                  shippingCost === Number(method.delivery_fee) ? 'border-black' : 'border-gray-300'
                }`}
                onClick={() => setShippingCost(Number(method.delivery_fee))}
              >
                <div>
                  <div>{method.method}</div>
                  <div className="text-sm text-gray-500">
                    {method.estimated_days} days
                  </div>
                </div>
                <div>${Number(method.delivery_fee).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {loading ? (
          <p>Loading cart...</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.product_id} className="flex justify-between border-b py-2">
                <div>{item.name} (x{item.quantity})</div>
                <div>
                  $ {(Number(item.product_price || 0) * (item.quantity || 0)).toFixed(2)}
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <span>Subtotal:</span>
              <span>${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${(Number(shippingCost) || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t mt-2 pt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleContinue}
              className="mt-4 w-full bg-black text-white py-2 rounded"
            >
              Continue to Payment
            </button>
            <button
              onClick={prevStep}
              className="mt-2 w-full bg-gray-200 py-2 rounded"
            >
              ← Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Step2;

