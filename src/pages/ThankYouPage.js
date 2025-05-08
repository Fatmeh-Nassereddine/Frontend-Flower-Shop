import React from "react";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#faf6f2] text-[#593825] text-center px-4">
      <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg">Your order has been placed successfully. We’ll deliver it to you soon.</p>
      <p className="mt-6 text-sm text-gray-500">Need help? <a href="/contact" className="underline">Contact us</a></p>
    </div>
  );
};

export default ThankYouPage;
