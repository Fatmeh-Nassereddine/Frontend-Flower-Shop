


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiPhone,
  FiMapPin,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiHeart,
} from 'react-icons/fi';
import logo from '../assets/logo.svg';
import { useShop } from '../components/context/ShopContext';
import { useAuth } from '../hooks/AuthContext';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems, likedItems } = useShop();
  const { user, logoutUser } = useAuth();
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
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-26 h-26 cursor-pointer" />
          <span className="text-sm md:text-base font-light uppercase text-white font-hina">
            Tima's Elegant Essence
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-sm text-white font-hina">
          <Link to="/" className="text-xl hover:text-[#B03074]">Home</Link>
          <Link to="/shop" className="text-xl hover:text-[#B03074]">Shop</Link>
          <Link to="/seasonal" className="text-xl hover:text-[#B03074]">Seasonal</Link>
          <Link to="/promotions" className="text-xl hover:text-[#B03074]">Promotions</Link>
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
