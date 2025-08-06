import React from 'react'
import { stepsData } from '../assets/assets/assets'

export const Steps = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center my-20'>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How it Works</h1>
        <p className='text-lg text-gray-600 mb-8'>Follow these simple steps to generate your images</p>
        <div className='space-y-4 max-w-2xl w-full text-sm'>
            {stepsData.map((item, index) => (
                <div key={index} className='flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 rounded-l'>
                    <div key={index} className='flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-blue-600 font-bold text-lg'>
                       <img width={40} src={item.icon} alt="" />
                    </div>
                    <div>
                        <h2 className='text-xl font-medium'>{item.title}</h2>
                        <p className='text-gray-500'>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
export default Steps