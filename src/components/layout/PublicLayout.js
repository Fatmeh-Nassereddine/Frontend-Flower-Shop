// src/layouts/PublicLayout.js
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import DiscountBanner from '../DiscountBanner';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      <DiscountBanner /> {/* 👈 This appears on top of every public page */}
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;

