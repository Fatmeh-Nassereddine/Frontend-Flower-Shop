import React, { useEffect, useState } from 'react';
import { getUser } from '../../api/auth';
import { getUserCart } from '../../api/apiCart';
import PrimaryButton from '../../components/PrimaryButton'; // Adjust the path as needed

const Step1 = ({ nextStep, setCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser()
      .then(user => {
        if (user && user.id) {
          setUserId(user.id);
        } else {
          console.error('No user found');
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error fetching user:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (userId) {
      getUserCart(userId)
        .then(cart => {
          setCart(cart);
          setCartItems(cart.items);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to load cart:', err);
          setLoading(false);
        });
    }
  }, [userId]);

  return (
    <div>
      <h2>Step 1: Review Your Cart</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading your cart...</div>
      ) : cartItems.length > 0 ? (
        <>
          {cartItems.map(item => (
            <div key={item.product_id} className="flex justify-between items-center gap-4 p-2 border-b">
              <img
                src={item.product_image || "/placeholder.jpg"}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
                <div>Qty: {item.quantity ?? 0}</div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  ${Number(item.product_price ?? 0).toFixed(2)}
                </p>
                <p className="font-semibold">
                  ${item.product_price && item.quantity
                    ? (Number(item.product_price) * item.quantity).toFixed(2)
                    : "0.00"}
                </p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* Centered Button */}
      <div className="flex justify-center mt-6">
        <PrimaryButton text="Next" onClick={nextStep} />
      </div>
    </div>
  );
};

export default Step1;

