import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import CategorySection from '../components/CategorySection';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';



function Home() {


  return (
    <>
      <Header />
      <Hero />
      <About />
      <Features />
      
      {/* Categories with Button Scroll Target */}
      <CategorySection />
      
      <Testimonials />
      <Newsletter />

 

      <Footer />
    </>
  );
}

export default Home;





