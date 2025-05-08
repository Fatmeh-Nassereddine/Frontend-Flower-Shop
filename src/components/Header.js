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










// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   FiPhone,
//   FiMapPin,
//   FiShoppingCart,
//   FiUser,
//   FiMenu,
//   FiX,
//   FiHeart,
// } from 'react-icons/fi';
// import logo from '../assets/logo.svg';
// import { useShop } from '../components/context/ShopContext'; // Import the useShop hook

// function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { cartItems, likedItems } = useShop(); // Access cart and favorites from ShopContext
//   const navigate = useNavigate();

//   // Temporary login state - replace with your real login logic
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const logout = () => {
//     setIsLoggedIn(false);
//     // Add actual logout logic here (e.g., clearing tokens)
//     navigate('/home');
//   };

//   const handleSignClick = () => {
//     navigate('/login');
//   };

//   return (
//     <header className="bg-[#9EA0A2] shadow-md px-4 md:px-10 py-4">
//       <div className="flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center space-x-2">
//           <img src={logo} alt="Logo" className="w-26 h-26" />
//           <span className="text-sm md:text-base font-light uppercase text-white font-hina">
//             Tima's Elegant Essence
//           </span>
//         </div>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex space-x-6 text-sm text-white font-hina">
//           <Link to="/" className="text-xl hover:text-[#B03074]">Home</Link>
//           <Link to="/shop" className="text-xl hover:text-[#B03074]">Shop</Link>
//           <Link to="/seasonal" className="text-xl hover:text-[#B03074]">Seasonal</Link>
//           <Link to="/about" className="text-xl hover:text-[#B03074]">About us</Link>
//           <Link to="/contact" className="text-xl hover:text-[#B03074]">Contact us</Link>
//         </nav>

//         {/* Desktop Icons */}
//         <div className="hidden md:flex items-center space-x-4 text-white text-lg relative">
//           <FiPhone className="cursor-pointer hover:text-[#B03074]" />
//           <FiMapPin className="cursor-pointer hover:text-[#B03074]" />
//           <Link to="/favorite" className="relative">
//             <FiHeart className="cursor-pointer hover:text-[#B03074]" />
//             {likedItems.length > 0 && (
//               <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
//                 {likedItems.length}
//               </span>
//             )}
//           </Link>
//           <Link to="/cart" className="relative">
//             <FiShoppingCart className="cursor-pointer hover:text-[#B03074]" />
//             {cartItems.length > 0 && (
//               <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
//                 {cartItems.length}
//               </span>
//             )}
//           </Link>
//           <div className="flex items-center space-x-3">
//             {isLoggedIn ? (
//               <p
//                 onClick={logout}
//                 onKeyDown={(e) => e.keyCode === 13 && logout()}
//                 tabIndex="0"
//                 className="cursor-pointer hover:text-[#B03074] focus:outline-none"
//               >
//                 Logout
//               </p>
//             ) : (
//               <p
//                 onClick={handleSignClick}
//                 onKeyDown={(e) => e.keyCode === 13 && handleSignClick()}
//                 tabIndex="0"
//                 className="cursor-pointer hover:text-[#B03074] flex items-center space-x-1 focus:outline-none"
//               >
//                 <FiUser />
//                 <span>Sign-in</span>
//               </p>
//             )}
//           </div>
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
//         <div className="md:hidden mt-4 space-y-4 text-sm text-white font-hina">
//           <Link to="/" className="block hover:text-[#593825]">Home</Link>
//           <Link to="/shop" className="block hover:text-[#593825]">Shop</Link>
//           <Link to="/about" className="block hover:text-[#593825]">About us</Link>
//           <Link to="/contact" className="block hover:text-[#593825]">Contact us</Link>

//           <div className="flex flex-col gap-3 text-lg mt-4">
//             <div className="flex items-center space-x-4">
//               <FiPhone className="hover:text-[#593825]" />
//               <FiMapPin className="hover:text-[#593825]" />
//               <FiHeart className="hover:text-[#593825]" />
//               <FiShoppingCart className="hover:text-[#593825]" />
//             </div>

//             <div className="mt-4 space-y-2">
//               {isLoggedIn ? (
//                 <p
//                   onClick={logout}
//                   onKeyDown={(e) => e.keyCode === 13 && logout()}
//                   tabIndex="0"
//                   className="cursor-pointer hover:text-[#B03074] focus:outline-none"
//                 >
//                   Logout
//                 </p>
//               ) : (
//                 <p
//                   onClick={handleSignClick}
//                   onKeyDown={(e) => e.keyCode === 13 && handleSignClick()}
//                   tabIndex="0"
//                   className="cursor-pointer hover:text-[#B03074] flex items-center space-x-1 focus:outline-none"
//                 >
//                   <i className="ri-user-fill"></i>
//                   <span>Sign-in</span>
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Header;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPhone, FiMapPin, FiShoppingCart, FiUser, FiMenu, FiX, FiHeart } from 'react-icons/fi';
import logo from '../assets/logo.svg';
import { useShop } from '../components/context/ShopContext';
import { useAuth } from '../hooks/AuthContext'; // ✅ Correct import

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems, likedItems } = useShop();
  const { user, logoutUser } = useAuth(); // ✅ Correct usage
  const navigate = useNavigate();

  const logout = () => {
    logoutUser();
    navigate('/');
  };

  const handleSignClick = () => {
    navigate('/login');
  };

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
          <Link to="/" className="text-xl hover:text-[#B03074]">Home</Link>
          <Link to="/shop" className="text-xl hover:text-[#B03074]">Shop</Link>
          <Link to="/seasonal" className="text-xl hover:text-[#B03074]">Seasonal</Link>
          <Link to="/about" className="text-xl hover:text-[#B03074]">About us</Link>
          <Link to="/contact" className="text-xl hover:text-[#B03074]">Contact us</Link>
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-4 text-white text-lg relative">
          <FiPhone className="cursor-pointer hover:text-[#B03074]" />
          <FiMapPin className="cursor-pointer hover:text-[#B03074]" />
          <Link to="/favorite" className="relative">
            <FiHeart className="cursor-pointer hover:text-[#B03074]" />
            {likedItems.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                {likedItems.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative">
            <FiShoppingCart className="cursor-pointer hover:text-[#B03074]" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                {cartItems.length}
              </span>
            )}
          </Link>
          <div className="flex items-center space-x-3">
            {user ? (
              <>
              <p
                onClick={() => navigate('/account')}
                onKeyDown={(e) => e.keyCode === 13 && navigate('/account')}
                tabIndex="0"
                role="button"
                className="text-white cursor-pointer hover:text-[#B03074] focus:outline-none"
              >
                {user.name}
              </p>
                <p
                  onClick={logout}
                  onKeyDown={(e) => e.keyCode === 13 && logout()}
                  tabIndex="0"
                  role="button"
                  aria-label="Logout"
                  className="cursor-pointer hover:text-[#B03074] focus:outline-none"
                >
                  Logout
                </p>
              </>
            ) : (
              <p
                onClick={handleSignClick}
                onKeyDown={(e) => e.keyCode === 13 && handleSignClick()}
                tabIndex="0"
                role="button"
                aria-label="Sign in"
                className="cursor-pointer hover:text-[#B03074] flex items-center space-x-1 focus:outline-none"
              >
                <FiUser />
                <span>Sign-in</span>
              </p>
            )}
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
          <Link to="/contact" className="block hover:text-[#593825]">Contact us</Link>

          <div className="flex flex-col gap-3 text-lg mt-4">
            <div className="flex items-center space-x-4">
              <FiPhone className="hover:text-[#593825]" />
              <FiMapPin className="hover:text-[#593825]" />
              <FiHeart className="hover:text-[#593825]" />
              <FiShoppingCart className="hover:text-[#593825]" />
            </div>

            <div className="mt-4 space-y-2">
              {user ? (
                <p
                  onClick={logout}
                  onKeyDown={(e) => e.keyCode === 13 && logout()}
                  tabIndex="0"
                  role="button"
                  aria-label="Logout"
                  className="cursor-pointer hover:text-[#B03074] focus:outline-none"
                >
                  Logout
                </p>
              ) : (
                <p
                  onClick={handleSignClick}
                  onKeyDown={(e) => e.keyCode === 13 && handleSignClick()}
                  tabIndex="0"
                  role="button"
                  aria-label="Sign in"
                  className="cursor-pointer hover:text-[#B03074] flex items-center space-x-1 focus:outline-none"
                >
                  <FiUser />
                  <span>Sign-in</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
