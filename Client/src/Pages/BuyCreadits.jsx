import React, { useContext } from 'react';
import { assets, plans } from '../assets/assets/assets';
import { AppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const BuyCredits = () => {
  const {user,setShowLogin}=useContext(AppContext);
    const navigate=useNavigate();
    const onClickHandler = () => {
      if (user) {
        navigate('/result')
      } else {
        setShowLogin(true)
      }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#f1f5f9] px-6 py-16">
      <button className="mb-6 px-6 py-2 border border-gray-400 rounded-full text-sm text-gray-700 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm">
        Our Plans
      </button>

      <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
        Buy Credits
      </h1>
      <p className="text-gray-500 text-center max-w-lg mb-14">
        Choose a plan that fits your needs and unlock the full power of InkWave.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {plans.map((item, index) => (
          <div
            key={index}
            className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200"
          >
            <div className="flex justify-center mb-6">
              <img
                src={assets.credit_star}
                alt="credits"
                className="w-14 h-14 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{item.id}</h2>
            <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
            <p className="text-lg font-semibold text-gray-700">
              <span className="text-indigo-600 font-bold text-3xl">${item.price}</span> / {item.credits} credits
            </p>
            <button onClick={onClickHandler} className="mt-6 w-full py-2 rounded-xl bg-gray-600 text-white font-semibold hover:bg-indigo-700 transition duration-300">
              {user ?  'Purchase':'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredits;
