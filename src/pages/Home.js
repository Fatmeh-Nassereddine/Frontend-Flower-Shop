import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import PopularSection from '../components/PopularSection';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Features />
      <PopularSection />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;




