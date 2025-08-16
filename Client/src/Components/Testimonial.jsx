import React from 'react'; // Import React
import { testimonialsData, assets } from '../assets/assets/assets.js'; // Import testimonial data and assets

const Testimonial = () => {
  return (
    // Main container for the testimonial section
    <div className="flex flex-col items-center justify-center text-center my-20 py-12 px-4">

      {/* Section heading */}
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Customer Testimonials
      </h1>

      {/* Section subheading */}
      <p className="text-gray-500 mb-12">What our users are saying</p>

      {/* Container for all testimonial cards */}
      <div className="flex flex-wrap justify-center gap-8">

        {/* Map through each testimonial in the data */}
        {testimonialsData.map((item, index) => (
          <div
            key={index} // Unique key for each element
            className="w-full sm:w-[300px] p-6  rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            {/* User image */}
            <img
              src={item.image} // Testimonial user image
              alt={item.name} // Alt text for accessibility
              className="w-16 h-16 rounded-full mx-auto mb-4" // Circular image with margin
            />

            {/* User name */}
            <h2 className="text-xl font-semibold mb-1">{item.name}</h2>

            {/* User role */}
            <p className="text-sm text-gray-400 mb-1">{item.role}</p>

            {/* Rating stars */}
            <div className="mb-2">
              {Array(item.stars).fill().map((_, starIndex) => (
                <img
                  key={starIndex} // Unique key for each star
                  src={assets.rating_star} // Star icon
                  alt="Star" // Alt text
                  className="inline-block w-5 h-5" // Star size
                />
              ))}
            </div>

            {/* Testimonial text */}
            <p className="text-gray-600 text-sm italic">"{item.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial; // Export Testimonial component
