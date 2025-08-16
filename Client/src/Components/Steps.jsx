import React from 'react' // Import React
import { stepsData } from '../assets/assets/assets' // Import steps data containing icons, titles, and descriptions

export const Steps = () => {
  return (
    // Main container for the Steps section, centered with spacing
    <div className='flex flex-col items-center justify-center text-center my-20'>

        {/* Section heading */}
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How it Works</h1>

        {/* Section subheading/description */}
        <p className='text-lg text-gray-600 mb-8'>Follow these simple steps to generate your images</p>

        {/* Container for all steps */}
        <div className='space-y-4 max-w-2xl w-full text-sm'>

            {/* Loop through each step in stepsData */}
            {stepsData.map((item, index) => (
                // Individual step container with flex layout, padding, background, rounded corners, shadow, and hover effect
                <div key={index} className='flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 rounded-l'>

                    {/* Step icon container */}
                    <div key={index} className='flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-blue-600 font-bold text-lg'>
                       <img width={40} src={item.icon} alt="" /> {/* Step icon image */}
                    </div>

                    {/* Step title and description */}
                    <div>
                        <h2 className='text-xl font-medium'>{item.title}</h2> {/* Step title */}
                        <p className='text-gray-500'>{item.description}</p> {/* Step description */}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Steps // Export Steps component
