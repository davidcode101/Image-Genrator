import React from 'react'; // Import React
import Header from '../Components/Header'; // Import Header component
import Steps from '../Components/Steps'; // Import Steps component
import Description from '../Components/Description'; // Import Description component
import Testimonial from '../Components/Testimonial'; // Import Testimonial component
import GenrateButton from '../Components/GenrateButton'; // Import GenrateButton component
import Login from '../Components/Login'; // Import Login component (not used here but can be rendered via context)

const Home = () => {
  return (
    <div>
      {/* Hero section with main heading and sample images */}
      <Header />

      {/* Step-by-step guide section */}
      <Steps />

      {/* Description section about the platform */}
      <Description />

      {/* Customer testimonials section */}
      <Testimonial />

      {/* Call-to-action button to generate images */}
      <GenrateButton />
      
      {/* Login component is likely triggered via context/modal, not rendered here directly */}
    </div>
  );
};

export default Home; // Export Home component
