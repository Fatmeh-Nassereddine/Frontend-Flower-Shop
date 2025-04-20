import React from 'react';

export default function Newsletter() {
  return (
    <section className="py-12 px-6 md:px-20 text-center bg-white">
      <h2 className="text-xl font-semibold mb-4">Stay in Bloom</h2>
      <p className="text-gray-600 mb-6">Subscribe to our newsletter for fresh floral inspiration and exclusive deals.</p>
      <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-full focus:outline-none"
        />
        <button className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700">
          Subscribe
        </button>
      </form>
    </section>
  );
}
