import React, { useState, useEffect } from 'react';
import { checkoutCart } from '../../api/apiOrders';
import { getUserCart } from '../../api/apiCart';
import { getUser } from '../../api/auth';

const Step3 = ({ shippingFee, nextStep, prevStep, setOrderId, loading }) => {
  const [userCart, setUserCart] = useState([]);
  const [user, setUser] = useState(null); // Store user data
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data and cart when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser(); // Fetch the current user data
        setUser(userData);
        if (userData?.id) {
          // Once user data is fetched, fetch their cart
          fetchUserCart(userData.id);
        } else {
          console.error("User ID is missing.");
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setIsLoading(false);
      }
    };

    const fetchUserCart = async (userId) => {
      try {
        const cartData = await getUserCart(userId);
        setUserCart(cartData.items || []); // Assuming cartData contains a list of items
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch user cart:', error);
        setIsLoading(false);
      }
    };

    fetchUserData(); // Initiate user data fetch
  }, []);

  console.log('User:', user);
  console.log('User Cart:', userCart);
  console.log('Shipping Fee:', shippingFee);

  // Safeguard to ensure cart.total is a valid number
  // Calculate total from cart items
  const cartSubtotal = (userCart || []).reduce((sum, item) => {
    return sum + (item.product_price || 0) * (item.quantity || 0);
  }, 0);

  // Total = cartSubtotal + shippingFee
  const total = cartSubtotal;
  const totalWithShipping = total + (Number(shippingFee) || 0); // Add shippingFee to the total

  const handleCheckout = async () => {
    try {
      const orderDetails = {
        cartItems: userCart, // Use the fetched user cart
        total, // Use the sanitized total
        shippingFee, // Use the shipping fee passed
        grandTotal: totalWithShipping, // Grand total with shipping fee included
      };

      const res = await checkoutCart(orderDetails);
      setOrderId(res.orderId);
      nextStep();
    } catch (err) {
      console.error('Checkout failed:', err);
    }
  };

  return (
    <div>
      <h2>Step 3: Confirm Order</h2>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {isLoading ? (
          <p>Loading cart...</p>
        ) : !userCart || userCart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {userCart.map((item) => (
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
              <span>${(Number(shippingFee) || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t mt-2 pt-2">
              <span>Total:</span>
              <span>${(cartSubtotal + (Number(shippingFee) || 0)).toFixed(2)}</span> {/* Ensure correct total */}
            </div>
          </>
        )}
      </div>

      {/* Checkout Buttons */}
      
      <div className="mt-4 flex gap-12">
        <button onClick={handleCheckout} className="w-1/2 bg-black text-white py-2 rounded">Place Order</button>
        <button onClick={prevStep} className="w-1/2 bg-black text-white py-2 rounded">Back</button>
      </div>

    </div>
  );
};

export default Step3;
