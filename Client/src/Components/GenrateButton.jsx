// Import React library
import React from 'react'

// Import assets like images from local assets folder
import { assets } from '../assets/assets/assets'

// Import useContext hook to access React context
import { useContext } from 'react'

// Import the AppContext to get user state and login modal control
import { AppContext } from '../Context/AppContext'

// Import useNavigate hook from react-router-dom to programmatically navigate
import { useNavigate } from 'react-router-dom'

// Functional React component named GenrateButton
const GenrateButton = () => {

  // Destructure user and setShowLogin function from AppContext
  const { user, setShowLogin } = useContext(AppContext);

  // Initialize navigate function for routing
  const navigate = useNavigate();

  // Handler for button click
  const onClickHandler = () => {
    if (user) {
      // If user is logged in, navigate to /result page
      navigate('/result')
    } else {
      // If user is not logged in, show the login modal
      setShowLogin(true)
    }
  }

  // JSX returned by the component
  return (
    // Container div with bottom padding and centered text
    <div className='pb-16 text-center'>

        {/* Heading encouraging user to try */}
        <h1 className='text-3xl md:text-3xl:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>
          See the magic Try now
        </h1>

        {/* Button that triggers onClickHandler */}
        <button 
          onClick={onClickHandler} 
          className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500'
        >
          Genrate images
          {/* Star icon image inside button */}
          <img src={assets.star_group} className='h-6' alt="" />
        </button>
    </div>
  )
}

// Export the GenrateButton component for use in other parts of the app
export default GenrateButton
