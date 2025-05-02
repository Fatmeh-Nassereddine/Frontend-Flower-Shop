import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import abt1 from "../assets/abt1.png";
import abt2 from "../assets/abt2.png";

export default function Aboutus() {
  return (
    <div>
      <Header />
      <section id="about-us" className="bg-white text-gray-800 py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <img
                src= {abt1}                
                alt="Bouquet in hand"
                className="rounded-lg shadow-lg w-80"
              />
              <p className="font-hina text-[#593825] mt-4 text-lg">Flower bouquet</p>
            </div>

            {/* Right Column */}
            <div>
              <h2 className="font-hina text-[#593825] text-3xl font-semibold mb-6">The history of our company</h2>
              <p className=" font-hina text-[#593825] text-xl mb-4">
                Our flower shop was created with a heartfelt vision: to bring the beauty and warmth
                of flowers into every home. Their vibrant colors, delicate textures, and ability to
                transform a space have always inspired me to share their joy with others.
              </p>
              <p className=" font-hina text-xl text-[#593825] mb-4">
                As a landscape architect and designer, I’ve always believed in the power of natural
                beauty and thoughtful design.
              </p>
              <p className=" text-xl font-hina text-[#593825] mb-4">
                This belief led to the founding of our company—with this mission to deliver
                elegance, joy, and a personal touch through every bouquet we create.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
            {/* Left Column */}
            <div>
              <h2 className="font-hina text-[#593825] text-3xl font-semibold mb-6">Our charm</h2>
              <p className=" font-hina text-xl text-[#593825] mb-4">
                Our charm has a refined sense of beauty, and we truly value that. That’s why we’ve
                made it our mission to bring our blooms straight to your doorstep—no matter where
                you are in Lebanon!
              </p>
              <p className=" font-hina text-xl text-[#593825] mb-4">
                Your unique vision inspires us, and we’re here to turn it into reality. Share your
                order—we can’t wait to create something beautiful for you!
              </p>
            </div>

            {/* Right Column */}
            <div>
              <img
                src= {abt2}
                alt="Bouquet on table"
                className="rounded-lg shadow-lg w-90"
              />
              <p className=" font-hina text-[#593825] mt-4 text-lg">Fresh floral design</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
