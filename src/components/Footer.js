

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

import { FaFacebookF, FaVk, FaInstagram, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#9EA0A2] text-white py-8 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {/* Logo */}
        <div className="flex flex-col items-start">
          <img
            src={logo} // Replace with your actual logo path
            alt="Tima's Elegant Essence"
            className="w-32 h-auto mb-4"
          />
        </div>

       {/* Shop Links */}
       <div className="flex flex-col gap-2">
          <h3 className="font-semibold mb-2">Shop</h3>
          <Link to="/categories" className="hover:underline">Categories</Link>
          <Link to="/seasonal" className="hover:underline">Seasonal</Link>
          <Link to="/shop" className="hover:underline">All Products</Link>
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold mb-2">Company</h3>
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
        </div>
        {/* Contact Info + Social */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />
            <span>Lebanon</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt />
            <span>+961-81-888-111</span>
          </div>
          <div className="flex gap-4 mt-2">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaVk /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-xs text-white mt-8">
        © All rights reserved
      </div>
    </footer>
  );
}
