// import React from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../assets/logo.svg';

// function Header() {
//   return (
//     <header className="flex justify-between items-center px-4 py-4 md:px-10 shadow-md">
//       {/* Logo image instead of text */}
//       <img src={logo} alt="FlowerShop Logo" className="w-32 h-auto" />
//       <nav className="space-x-4 hidden md:flex">
//         <Link to="/" className="hover:text-pink-600">Home</Link>
//         <Link to="/shop" className="hover:text-pink-600">Shop</Link>
//         <Link to="/about" className="hover:text-pink-600">About</Link>
//         <Link to="/contact" className="hover:text-pink-600">Contact</Link>
//       </nav>
//     </header>
//   );
// }

// export default Header;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   FiPhone,
//   FiMapPin,
//   FiShoppingCart,
//   FiUser,
//   FiMenu,
//   FiX,
// } from 'react-icons/fi';
// import logo from '../assets/logo.svg';

// function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="bg-[#9EA0A2] shadow-md px-4 md:px-10 py-4">
//       <div className="flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center space-x-2">
//           <img src={logo} alt="Logo" className="w-10 h-10" />
//           <span className="text-sm md:text-base font-light uppercase text-white">
//             Tomas Elegant Essence
//           </span>
//         </div>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex space-x-6 text-sm text-white">
//           <Link to="/" className="hover:text-pink-200">Home</Link>
//           <Link to="/shop" className="hover:text-pink-200">Shop</Link>
//           <Link to="/about" className="hover:text-pink-200">About us</Link>
//           <Link to="/discounts" className="hover:text-pink-200">Discounts</Link>
//           <Link to="/contact" className="hover:text-pink-200">Contact us</Link>
//         </nav>

//         {/* Desktop Icons */}
//         <div className="hidden md:flex items-center space-x-4 text-white text-lg">
//           <FiPhone className="cursor-pointer hover:text-pink-200" />
//           <FiMapPin className="cursor-pointer hover:text-pink-200" />
//           <FiShoppingCart className="cursor-pointer hover:text-pink-200" />
//           <Link
//             to="/login"
//             className="flex items-center space-x-1 hover:text-pink-200 text-sm"
//           >
//             <FiUser />
//             <span>Login</span>
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
//             {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden mt-4 space-y-4 text-sm text-white">
//           <Link to="/" className="block hover:text-pink-200">Home</Link>
//           <Link to="/shop" className="block hover:text-pink-200">Shop</Link>
//           <Link to="/about" className="block hover:text-pink-200">About us</Link>
//           <Link to="/discounts" className="block hover:text-pink-200">Discounts</Link>
//           <Link to="/contact" className="block hover:text-pink-200">Contact us</Link>
//           <div className="flex space-x-4 mt-2 text-lg">
//             <FiPhone className="hover:text-pink-200" />
//             <FiMapPin className="hover:text-pink-200" />
//             <FiShoppingCart className="hover:text-pink-200" />
//             <Link
//               to="/login"
//               className="flex items-center space-x-1 hover:text-pink-200 text-sm"
//             >
//               <FiUser />
//               <span>Login</span>
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Header;




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPhone,
  FiMapPin,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import logo from '../assets/logo.svg';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#9EA0A2] shadow-md px-4 md:px-10 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-26 h-26" />
          <span className="text-sm md:text-base font-light uppercase text-white font-hina">
            Tima's Elegant Essence
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-sm text-white font-hina">
          <Link to="/" className="hover:text-[#593825]">Home</Link>
          <Link to="/shop" className="hover:text-[#593825]">Shop</Link>
          <Link to="/about" className="hover:text-[#593825]">About us</Link>
          <Link to="/discounts" className="hover:text-[#593825]">Discounts</Link>
          <Link to="/contact" className="hover:text-[#593825]">Contact us</Link>
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-4 text-white text-lg">
          <FiPhone className="cursor-pointer hover:text-[#593825]" />
          <FiMapPin className="cursor-pointer hover:text-[#593825]" />
          <FiShoppingCart className="cursor-pointer hover:text-[#593825]" />
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="flex items-center space-x-2 hover:text-[#593825] text-sm font-hina"
            >
              <FiUser />
              <span>Login | </span>
            </Link>
            <Link
              to="/register"
              className="text-white text-xs px-2 py-1 rounded-full font-hina hover:text-[#593825] "
            >
              Register
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-sm text-white font-hina">
          <Link to="/" className="block hover:text-[#593825]">Home</Link>
          <Link to="/shop" className="block hover:text-[#593825]">Shop</Link>
          <Link to="/about" className="block hover:text-[#593825]">About us</Link>
          <Link to="/discounts" className="block hover:text-[#593825]">Discounts</Link>
          <Link to="/contact" className="block hover:text-[#593825]">Contact us</Link>
          <div className="flex flex-col gap-3 text-lg mt-4">
            <div className="flex items-center space-x-4">
              <FiPhone className="hover:text-[#593825]" />
              <FiMapPin className="hover:text-[#593825]" />
              <FiShoppingCart className="hover:text-[#593825]" />
            </div>
            <div className="flex items-center space-x-3 mt-2">
              <Link
                to="/login"
                className="flex items-center space-x-1 hover:text-[#593825] text-sm font-hina"
              >
                <FiUser />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="text-white text-xs px-3 py-1  font-hina hover:text-[#593825] "
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
