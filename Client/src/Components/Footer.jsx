// Import React library for building components
import React from 'react'

// Import assets (images/icons) from local assets folder
import { assets } from '../assets/assets/assets'

// Functional React component named Footer
const Footer = () => {
  // Component returns JSX defining the footer UI
  return (
    // Main footer container with flex layout, space between items, padding, and margin-top
    <div className='flex items-center justify-between gap-4 py-3 mt-20' >

        {/* Logo image on the left */}
        <img src={assets.logo} alt="" width={150} />

        {/* Copyright text in the center */}
        <p className='flex-1 border-l border-gray-400 outline-none pl-4 text-sm text-gray-500 max-sm:hidden'>
          Copyright @Lastgroup.jcc | All right resevered. 
        </p>

        {/* Social media icons container on the right */}
        <div className='flex items-center gap-4'> 
            {/* Facebook icon */}
            <img src={assets.facebook_icon} alt="" width={35} />
            {/* Instagram icon */}
            <img src={assets.instagram_icon} alt="" width={35} />
            {/* Twitter icon */}
            <img src={assets.twitter_icon} alt="" width={35} />
        </div>
    </div>
  )
}

// Export the Footer component to use it in other parts of the app
export default Footer
