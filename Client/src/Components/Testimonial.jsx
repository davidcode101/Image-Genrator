import React from 'react';
import { testimonialsData, assets } from '../assets/assets/assets.js';

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center my-20 py-12 px-4">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Customer Testimonials
      </h1>
      <p className="text-gray-500 mb-12">What our users are saying</p>
      <div className="flex flex-wrap justify-center gap-8">
        {testimonialsData.map((item, index) => (
          <div
            key={index}
            className="w-full sm:w-[300px] p-6  rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
            <p className="text-sm text-gray-400 mb-1">{item.role}</p>
            <div className="mb-2">
              {Array(item.stars).fill().map((_, starIndex) => (
                <img
                  key={starIndex}
                  src={assets.rating_star}
                  alt="Star"
                  className="inline-block w-5 h-5"
                />
              ))}
            </div>
            <p className="text-gray-600 text-sm italic">"{item.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
