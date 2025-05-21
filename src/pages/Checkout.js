







// import React, { useState } from 'react';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import PaymentIcon from '@mui/icons-material/Payment';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// import Step1 from '../components/checkout/CheckoutStep1_CartReview';
// import Step2 from '../components/checkout/CheckoutStep2_Shipping';
// import Step3 from '../components/checkout/CheckoutStep3_Confirm';
// import Step4 from '../components/checkout/CheckoutStep4_Success';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// // CheckoutPage.jsx
// const CheckoutPage = () => {
//   const [step, setStep] = useState(0);
//   const [cart, setCart] = useState(null);
//   const [shippingFee, setShippingFee] = useState(0);
//   const [shippingCost, setShippingCost] = useState(0);  // Add state for shippingCost
//   const [orderId, setOrderId] = useState(null);

//   const steps = [
//     { label: 'Review Cart', icon: <ShoppingCartIcon /> },
//     { label: 'Shipping', icon: <LocalShippingIcon /> },
//     { label: 'Confirm', icon: <PaymentIcon /> },
//     { label: 'Complete', icon: <CheckCircleIcon /> },
//   ];

//   const renderStep = () => {
//     switch (step) {
//       case 0:
//         return <Step1 nextStep={() => setStep(1)} setCart={setCart} />;
//       case 1:
//         return (
//           <Step2
//             nextStep={() => setStep(2)}
//             prevStep={() => setStep(0)}
//             setShippingFee={setShippingFee}
//             setShippingCost={setShippingCost}  // Add this prop
//             shippingCost={shippingCost}  // Pass shippingCost to Step2
//           />
//         );
//       case 2:
//         return (
//           <Step3
//             cart={cart}
//             shippingFee={shippingFee}
//             nextStep={() => setStep(3)}
//             prevStep={() => setStep(1)}
//             setOrderId={setOrderId}
//           />
//         );
//       case 3:
//         return <Step4 orderId={orderId} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <Header />
//       <h1 className="text-2xl font-bold mb-6">Checkout</h1>
//       <div className="grid grid-cols-4 gap-2 mb-4 bg-gray-100 p-2 rounded">
//         {steps.map((s, i) => (
//           <div
//             key={i}
//             onClick={() => step >= i && setStep(i)}
//             className={`flex items-center justify-center p-2 rounded cursor-pointer ${step === i ? 'bg-white shadow font-semibold' : ''} ${step < i ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {s.icon}
//             <span className="ml-2 hidden sm:inline">{s.label}</span>
//           </div>
//         ))}
//       </div>
//       {renderStep()}
//       <Footer />
//     </div>
//   );
// };

// export default CheckoutPage;





import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { toast } from 'react-toastify';
import Step1 from '../components/checkout/CheckoutStep1_CartReview';
import Step2 from '../components/checkout/CheckoutStep2_Shipping';
import Step3 from '../components/checkout/CheckoutStep3_Confirm';
// import Step4 from '../components/checkout/CheckoutStep4_Success';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CheckoutPage = () => {
  const [step, setStep] = useState(0);
  const [checkoutData, setCheckoutData] = useState({
    cart: null,
    shippingCost: 0,
    addressId: null,
    orderId: null
  });

  const steps = [
    { label: 'Review Cart', icon: <ShoppingCartIcon /> },
    { label: 'Shipping', icon: <LocalShippingIcon /> },
    // { label: 'Confirm', icon: <PaymentIcon /> },
    { label: 'Complete', icon: <CheckCircleIcon /> },
  ];

  const updateCheckoutData = (newData) => {
    setCheckoutData(prev => ({ ...prev, ...newData }));
  };

  const handleNextStep = (additionalData = {}) => {
    if (additionalData) {
      updateCheckoutData(additionalData);
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Step1 
            nextStep={(cart) => handleNextStep({ cart })}
            updateCheckoutData={updateCheckoutData}
          />
        );
      case 1:
        return (
          <Step2
            nextStep={(data) => handleNextStep(data)}
            prevStep={handlePrevStep}
            currentShippingCost={checkoutData.shippingCost}
            updateCheckoutData={updateCheckoutData}
          />
        );
      // case 2:
      //   return (
      //     <Step3
      //       shippingFee={checkoutData.shippingCost}
      //       addressId={checkoutData.addressId}
      //       nextStep={handleNextStep}
      //       prevStep={handlePrevStep}
      //       onSuccess={(orderId) => {
      //         updateCheckoutData({ orderId });
      //         handleNextStep();
      //       }}
      //       cart={checkoutData.cart}
      //     />
      //   );
      case 2:
        return <Step3 orderId={checkoutData.orderId} />;
      default:
        return <Step1 nextStep={handleNextStep} />;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Header />
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      {/* Progress Stepper */}
      <div className="grid grid-cols-4 gap-2 mb-4 bg-gray-100 p-2 rounded">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`flex items-center justify-center p-2 rounded ${
              step === i ? 'bg-white shadow font-semibold' : ''
            } ${
              step > i ? 'cursor-pointer hover:bg-gray-200' : 'cursor-not-allowed opacity-50'
            }`}
            onClick={() => step > i && setStep(i)}
          >
            {s.icon}
            <span className="ml-2 hidden sm:inline">{s.label}</span>
          </div>
        ))}
      </div>

      {renderStep()}
      <Footer />
    </div>
  );
};

export default CheckoutPage;