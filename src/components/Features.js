import React from 'react';
import { Truck, CreditCard, Flower,Camera } from 'lucide-react';

function Features() { 
  return (
    <section className="py-12 px-6 md:px-20 text-center">
      <h2 className=" font-hina text-[#593825]  text-2xl font-semibold mb-6">Why us?</h2>
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <CreditCard size={40} className="font-hina text-[#593825]   mx-auto mb-2"  />
          <p className="font-hina text-[#593825]  text-xl">Easy payments</p>
        </div>
        <div>
          <Truck size={40} className="font-hina text-[#593825]  mx-auto mb-2" />
          <p className="font-hina text-[#593825]  text-xl">Delivery on time</p>
        </div>
        <div>
          <Flower size={40} className="font-hina text-[#593825]  mx-auto mb-2" />
          <p className="font-hina text-[#593825]  text-xl">Best plants</p>
        </div>
        <div>
        <Camera size={40} className="text-[#593825] mx-auto mb-2" />
        <p className="font-hina text-[#593825]  text-xl">Real Photos</p>
        </div>
      </div>
    </section>
  );
}

export default Features;