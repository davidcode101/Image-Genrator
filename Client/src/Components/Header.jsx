import React, { useContext } from "react";
import { assets } from "../assets/assets/assets";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
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
    <div className="flex flex-col items-center justify-center text-center my-20">
      {/* Text and icon stacked */}
      <div className="bg-white px-6 py-2 rounded-full shadow-md border border-neutral-500 text-stone-500 flex items-center gap-2">
        <p className="text-sm font-medium">State of the Art Image Gen</p>
        <img src={assets.star_icon} alt="" className="w-5 h-5 object-contain" />
      </div>
      {/* H1 below that */}
      <h1 className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center">
        Text to <span className="text-blue-700">Image</span> Generator
      </h1>
      <p className="text-center max-w-xl mx-auto mt-5">
        Our AI-powered image generator transforms simple text prompts into
        stunning visuals — fast, customizable, and perfect for creators and
        brands.
      </p>
      <button onClick={onClickHandler} className="cursor-pointer sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full ">
        Genrate Image <img className="h-6" src={assets.star_group} alt="" />
      </button>
      <div className="flex flex-wrap justify-center gap-4 mt-10 max-sm:gap-2">
        {Array(6)
          .fill("")
          .map((item, index) => (
            <img
              src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
              alt=""
              key={index}
              width={70}
              className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
            />
          ))}
      </div>
      <p className='mt-2 text-neutral-600'>Genrated Images From InkWave </p>
    </div>
  );
};

export default Header;
