// import React from 'react';

// function Footer() {
//   return (
//     <footer className="bg-gray-900 text-white text-center py-8 mt-12">
//       <div className="text-sm">&copy; 2025 FlowerShop. All rights reserved.</div>
//       <div className="flex justify-center space-x-4 mt-4">
//         <a href="#" className="hover:underline">Instagram</a>
//         <a href="#" className="hover:underline">Facebook</a>
//         <a href="#" className="hover:underline">Twitter</a>
//       </div>
//     </footer>
//   );
// }

// export default Footer;


import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-8 mt-12">
      <div className="text-sm">&copy; 2025 FlowerShop. All rights reserved.</div>

      <div className="flex justify-center space-x-6 mt-4">
        {/* Internal Links */}
        <Link to="/shop" className="hover:underline">Shop</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
      </div>

      <div className="flex justify-center space-x-6 mt-4">
        {/* External Social Media Links */}
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
          Instagram
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
          Facebook
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
          Twitter
        </a>
      </div>
    </footer>
  );
}

export default Footer;

