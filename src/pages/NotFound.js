import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import PrimaryButton from "../components/PrimaryButton"; // Assuming PrimaryButton is in this location

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-[#593825] font-hina">404</h1>
        <p className="text-xl text-gray-600 mb-4 font-hina">Oops! Page not found</p>
        <PrimaryButton 
          href="/" 
          className="text-[#593825] hover:bg-[#472c1d] font-hina"
        >
          Return to Home
        </PrimaryButton>
      </div>
    </div>
  );
};

export default NotFound;
