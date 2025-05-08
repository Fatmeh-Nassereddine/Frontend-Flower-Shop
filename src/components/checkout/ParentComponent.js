// ParentComponent.jsx
import React, { useState } from 'react';
import Step2 from './Step2'; // Make sure this path is correct

const ParentComponent = () => {
  const [shippingCost, setShippingCost] = useState(0);

  const setShippingFee = (newFee) => {
    setShippingCost(newFee);
  };

  return (
    <Step2
      nextStep={() => console.log('Next Step')}
      prevStep={() => console.log('Previous Step')}
      setShippingFee={setShippingFee}
      productPrice={100}
      shippingCost={shippingCost}
      setShippingCost={setShippingCost} // ✅ This MUST be here
    />
  );
};

export default ParentComponent;
