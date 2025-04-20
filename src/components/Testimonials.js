import React from 'react';

const testimonials = [
  {
    name: 'Emily R.',
    quote: "Absolutely loved the bouquet I ordered! It arrived fresh and beautifully arranged.",
  },
  {
    name: 'James L.',
    quote: "Fast delivery and amazing quality flowers. Will order again!",
  },
  {
    name: 'Sophie M.',
    quote: "Great service and the flowers lasted more than a week. Highly recommend!",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-pink-50 py-12 px-6 md:px-20 text-center">
      <h2 className="text-xl font-semibold mb-8">What Our Customers Say</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-white shadow-md p-6 rounded-lg">
            <p className="italic text-gray-700 mb-4">“{t.quote}”</p>
            <h4 className="font-semibold text-pink-600">- {t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
