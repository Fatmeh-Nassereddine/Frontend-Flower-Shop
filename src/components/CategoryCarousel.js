import React from 'react';
import Slider from 'react-slick';

const CategoryCarousel = ({ categories }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {categories.map((cat, idx) => (
        <div key={idx} className="px-4">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
            <div className="w-full h-80 overflow-hidden rounded-lg mb-4">
              <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-hina font-semibold text-[#593825]">{cat.title}</h3>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CategoryCarousel;
