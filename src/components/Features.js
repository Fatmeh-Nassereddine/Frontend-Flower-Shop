import React from 'react';
import { Truck, CreditCard, Flower } from 'lucide-react';

function Features() {
  return (
    <section className="py-12 px-6 md:px-20 text-center">
      <h2 className="text-xl font-semibold mb-6">Why us?</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <CreditCard className="mx-auto mb-2" />
          <p>Easy payments</p>
        </div>
        <div>
          <Truck className="mx-auto mb-2" />
          <p>Delivery on time</p>
        </div>
        <div>
          <Flower className="mx-auto mb-2" />
          <p>Best plants</p>
        </div>
      </div>
    </section>
  );
}

export default Features;