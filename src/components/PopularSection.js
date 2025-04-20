import React from 'react';

const products = [
  {
    title: 'Spring composition',
    price: '$29',
    image: '/spring.jpg',
  },
  {
    title: 'Summer composition',
    price: '$35',
    image: '/summer.jpg',
  },
  {
    title: 'Autumn composition',
    price: '$31',
    image: '/autumn.jpg',
  },
];

function PopularSection() {
  return (
    <section className="py-12 px-6 md:px-20">
      <h2 className="text-xl font-semibold text-center mb-8">Popular choice</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.title} className="rounded mb-4 w-full h-48 object-cover" />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-pink-600">{product.price}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700">Shop More</button>
      </div>
    </section>
  );
}

export default PopularSection;