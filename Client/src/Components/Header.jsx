// Import React and useContext hook
import React, { useContext } from "react";

// Import assets like images/icons from local assets folder
import { assets } from "../assets/assets/assets";

// Import AppContext to get user state and login modal control
import { AppContext } from "../Context/AppContext";

// Import useNavigate hook from react-router-dom for programmatic navigation
import { useNavigate } from "react-router-dom";

// Functional React component named Header
const Header = () => {
  // Destructure user and setShowLogin from AppContext
  const { user, setShowLogin } = useContext(AppContext);

  // Initialize navigate function for routing
  const navigate = useNavigate();

  // Handler for button click
  const onClickHandler = () => {
    if (user) {
      // If user is logged in, navigate to /result page
      navigate('/result');
    } else {
      // If user is not logged in, show the login modal
      setShowLogin(true);
    }
  }

  // JSX returned by the component
  return (
    // Main container div with flex column layout, centered items, margin
    <div className="flex flex-col items-center justify-center text-center my-20">

      {/* Top info box with text and star icon */}
      <div className="bg-white px-6 py-2 rounded-full shadow-md border border-neutral-500 text-stone-500 flex items-center gap-2">
        <p className="text-sm font-medium">State of the Art Image Gen</p>
        <img src={assets.star_icon} alt="" className="w-5 h-5 object-contain" />
      </div>

      {/* Main heading */}
      <h1 className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center">
        Text to <span className="text-blue-700">Image</span> Generator
      </h1>

      {/* Description paragraph */}
      <p className="text-center max-w-xl mx-auto mt-5">
        Our AI-powered image generator transforms simple text prompts into
        stunning visuals — fast, customizable, and perfect for creators and
        brands.
      </p>

      {/* Button to generate images */}
      <button 
        onClick={onClickHandler} 
        className="cursor-pointer sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full "
      >
        Genrate Image 
        <img className="h-6" src={assets.star_group} alt="" />
      </button>

      {/* Row of sample images */}
      <div className="flex flex-wrap justify-center gap-4 mt-10 max-sm:gap-2">
        {Array(6) // Create 6 sample images
          .fill("")
          .map((item, index) => (
            <img
              src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2} // Alternate images
              alt=""
              key={index}
              width={70}
              className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10" // Hover effect + responsive
            />
          ))}
      </div>

      {/* Footer text for sample images */}
      <p className='mt-2 text-neutral-600'>Genrated Images From InkWave </p>
    </div>
  );
};

// Export the Header component for use in other parts of the app
export default Header;
